'use server';

import { revalidatePath } from 'next/cache';
import { redirect, unstable_rethrow } from 'next/navigation';
import type { ActionResult } from '@/components/admin/ActionForm';
import { getViewer } from '@/lib/data';
import { SLUG_RE } from '@/lib/domain';
import { getSupabase } from '@/lib/supabase/server';

const KINDS = ['site', 'app', 'admin', 'staging', 'docs', 'other'];
const RESERVED_SLUGS = ['www', 'admin', 'app', 'api'];

async function adminClient() {
  const supabase = await getSupabase();
  if (!supabase) throw new Error('Supabase ainda não configurado.');
  const viewer = await getViewer(supabase);
  if (!viewer.isAdmin) throw new Error('Sem permissão.');
  return supabase;
}

function text(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === 'string' ? v.trim() : '';
}

function dbError(error: { code?: string; message: string }): ActionResult {
  if (error.code === '23505') return { error: 'Esse endereço já está em uso por outro cliente.' };
  if (error.code === '23514') return { error: 'Algum campo está em formato inválido.' };
  return { error: error.message };
}

function done() {
  revalidatePath('/', 'layout');
}

async function guard<T>(fn: () => Promise<T>): Promise<T | ActionResult> {
  try {
    return await fn();
  } catch (e) {
    unstable_rethrow(e); // let redirect() through
    return { error: e instanceof Error ? e.message : 'Erro inesperado.' };
  }
}

// ---------- Clientes ----------

export async function saveClient(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  return guard(async () => {
    const supabase = await adminClient();
    const id = text(fd, 'id');
    const name = text(fd, 'name');
    const slug = text(fd, 'slug').toLowerCase();
    const tagline = text(fd, 'tagline') || null;
    const logo_url = text(fd, 'logo_url') || null;
    const accent_color = text(fd, 'accent_color') || null;

    if (!name) return { error: 'Dê um nome ao cliente.' };
    if (!SLUG_RE.test(slug) || RESERVED_SLUGS.includes(slug))
      return { error: 'Endereço inválido: use letras minúsculas, números e hífen (ex.: orla).' };
    if (logo_url && !/^https?:\/\//i.test(logo_url)) return { error: 'A logo precisa ser um link começando com https://' };
    if (accent_color && !/^#[0-9a-f]{6}$/i.test(accent_color)) return { error: 'Cor no formato #RRGGBB (ex.: #D87445).' };

    const row = { name, slug, tagline, logo_url, accent_color };
    if (id) {
      const { error } = await supabase.from('clients').update(row).eq('id', id);
      if (error) return dbError(error);
      done();
      redirect('/admin');
    }
    const { data: last } = await supabase.from('clients').select('sort_order').order('sort_order', { ascending: false }).limit(1);
    const { error } = await supabase.from('clients').insert({ ...row, sort_order: (last?.[0]?.sort_order ?? 0) + 10 });
    if (error) return dbError(error);
    done();
    return { ok: `Cliente ${name} criado.` };
  });
}

export async function deleteClient(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  return guard(async () => {
    const supabase = await adminClient();
    const { error } = await supabase.from('clients').delete().eq('id', text(fd, 'id'));
    if (error) return dbError(error);
    done();
    return { ok: 'Cliente excluído.' };
  });
}

// ---------- Links ----------

function normalizeUrl(raw: string) {
  if (!raw) return '';
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}

async function nextLinkOrder(supabase: Awaited<ReturnType<typeof adminClient>>, clientId: string | null) {
  const q = supabase.from('links').select('sort_order').order('sort_order', { ascending: false }).limit(1);
  const { data } = await (clientId ? q.eq('client_id', clientId) : q.is('client_id', null));
  return (data?.[0]?.sort_order ?? 0) + 10;
}

export async function saveLink(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  return guard(async () => {
    const supabase = await adminClient();
    const id = text(fd, 'id');
    const title = text(fd, 'title');
    const url = normalizeUrl(text(fd, 'url'));
    const kind = text(fd, 'kind');
    const client_id = text(fd, 'client_id') || null;
    const row = {
      title,
      url,
      kind: KINDS.includes(kind) ? kind : 'site',
      client_id,
      description: text(fd, 'description') || null,
      is_public: fd.get('is_public') === 'on',
    };

    if (!title) return { error: 'Dê um nome ao link.' };
    try {
      new URL(url);
    } catch {
      return { error: 'Endereço inválido.' };
    }

    if (id) {
      const { data: current } = await supabase.from('links').select('client_id').eq('id', id).single();
      const moved = current && current.client_id !== client_id;
      const { error } = await supabase
        .from('links')
        .update(moved ? { ...row, sort_order: await nextLinkOrder(supabase, client_id) } : row)
        .eq('id', id);
      if (error) return dbError(error);
      done();
      redirect('/admin');
    }
    const { error } = await supabase.from('links').insert({ ...row, sort_order: await nextLinkOrder(supabase, client_id) });
    if (error) return dbError(error);
    done();
    return { ok: `Link ${title} adicionado.` };
  });
}

export async function deleteLink(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  return guard(async () => {
    const supabase = await adminClient();
    const { error } = await supabase.from('links').delete().eq('id', text(fd, 'id'));
    if (error) return dbError(error);
    done();
    return null;
  });
}

export async function toggleLinkPublic(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  return guard(async () => {
    const supabase = await adminClient();
    const { error } = await supabase
      .from('links')
      .update({ is_public: fd.get('is_public') === 'true' })
      .eq('id', text(fd, 'id'));
    if (error) return dbError(error);
    done();
    return null;
  });
}

// ---------- Ordem ----------

/** Swaps an item with its neighbour and rewrites the group's order as 10, 20, 30… */
async function reorder(table: 'clients' | 'links', ids: string[], id: string, dir: string) {
  const supabase = await adminClient();
  const i = ids.indexOf(id);
  const j = dir === 'up' ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= ids.length) return null;
  [ids[i], ids[j]] = [ids[j], ids[i]];
  const results = await Promise.all(ids.map((rowId, n) => supabase.from(table).update({ sort_order: (n + 1) * 10 }).eq('id', rowId)));
  const failed = results.find((r) => r.error)?.error;
  if (failed) return dbError(failed);
  done();
  return null;
}

export async function moveClient(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  return guard(async () => {
    const supabase = await adminClient();
    const { data, error } = await supabase.from('clients').select('id').order('sort_order').order('name');
    if (error) return dbError(error);
    return reorder('clients', data.map((r) => r.id), text(fd, 'id'), text(fd, 'dir'));
  });
}

export async function moveLink(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  return guard(async () => {
    const supabase = await adminClient();
    const id = text(fd, 'id');
    const { data: link } = await supabase.from('links').select('client_id').eq('id', id).single();
    if (!link) return { error: 'Link não encontrado.' };
    const q = supabase.from('links').select('id').order('sort_order').order('created_at');
    const { data, error } = await (link.client_id ? q.eq('client_id', link.client_id) : q.is('client_id', null));
    if (error) return dbError(error);
    return reorder('links', data.map((r) => r.id), id, text(fd, 'dir'));
  });
}
