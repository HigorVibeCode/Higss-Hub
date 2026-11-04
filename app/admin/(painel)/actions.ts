'use server';

import { randomUUID } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { PREVIEW_TAG, getPreview } from '@/lib/preview';
import { redirect } from 'next/navigation';
import type { ActionResult } from '@/components/admin/ActionForm';
import { isAdmin } from '@/lib/auth';
import { SLUG_RE } from '@/lib/domain';
import type { Kind } from '@/lib/i18n';
import { updateHub, type HubData, type Link, type Stats } from '@/lib/store';

const KINDS: Kind[] = ['site', 'app', 'admin', 'staging', 'docs', 'other'];
const RESERVED_SLUGS = ['www', 'admin', 'app', 'api'];

function text(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === 'string' ? v.trim() : '';
}

/** Checks the session, applies the change and turns a returned message into an error result. */
async function save(mutate: (data: HubData) => string | void, ok?: string): Promise<ActionResult> {
  if (!(await isAdmin())) return { error: 'Sessão expirada. Entre de novo.' };
  try {
    const error = await updateHub(mutate);
    return error ? { error } : ok ? { ok } : null;
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Erro inesperado ao salvar.' };
  }
}

const nextOrder = (items: { sort_order: number }[]) => Math.max(0, ...items.map((i) => i.sort_order)) + 10;

// ---------- Clientes ----------

export async function saveClient(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
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

  const result = await save(
    (data) => {
      if (data.clients.some((c) => c.slug === slug && c.id !== id)) return 'Esse endereço já está em uso por outro cliente.';
      const fields = { name, slug, tagline, logo_url, accent_color };
      if (id) {
        const client = data.clients.find((c) => c.id === id);
        if (!client) return 'Cliente não encontrado.';
        Object.assign(client, fields);
      } else {
        data.clients.push({ id: randomUUID(), ...fields, sort_order: nextOrder(data.clients) });
      }
    },
    `Cliente ${name} criado.`,
  );
  if (id && !result?.error) redirect('/admin');
  return result;
}

export async function deleteClient(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  const id = text(fd, 'id');
  return save((data) => {
    data.clients = data.clients.filter((c) => c.id !== id);
    // Links stay, moved to "Sem cliente".
    data.links.forEach((l) => l.client_id === id && (l.client_id = null));
  }, 'Cliente excluído.');
}

// ---------- Links ----------

export async function saveLink(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  const id = text(fd, 'id');
  const rawUrl = text(fd, 'url');
  const url = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
  const kind = text(fd, 'kind') as Kind;
  const client_id = text(fd, 'client_id') || null;

  let host: string;
  try {
    host = new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return { error: 'Endereço inválido.' };
  }
  // Paste just the address: the name comes from the site itself.
  const title = text(fd, 'title') || (await getPreview(url)).title?.slice(0, 80) || host;

  const fields = {
    title,
    url,
    kind: KINDS.includes(kind) ? kind : 'site',
    client_id,
    description: text(fd, 'description') || null,
    image_url: text(fd, 'image_url') || null,
    is_public: fd.get('is_public') === 'on',
  } satisfies Partial<Link>;
  if (fields.image_url && !/^https?:\/\//i.test(fields.image_url)) return { error: 'A capa precisa ser um link começando com https://' };

  const result = await save(
    (data) => {
      if (client_id && !data.clients.some((c) => c.id === client_id)) return 'Cliente não encontrado.';
      const group = data.links.filter((l) => l.client_id === client_id && l.id !== id);
      if (id) {
        const link = data.links.find((l) => l.id === id);
        if (!link) return 'Link não encontrado.';
        const moved = link.client_id !== client_id;
        Object.assign(link, fields, moved ? { sort_order: nextOrder(group) } : {});
      } else {
        data.links.push({ id: randomUUID(), ...fields, sort_order: nextOrder(group) });
      }
    },
    `Link ${title} adicionado.`,
  );
  if (id && !result?.error) redirect('/admin');
  return result;
}

export async function deleteLink(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  const id = text(fd, 'id');
  return save((data) => {
    data.links = data.links.filter((l) => l.id !== id);
  });
}

export async function toggleLinkPublic(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  const id = text(fd, 'id');
  return save((data) => {
    const link = data.links.find((l) => l.id === id);
    if (!link) return 'Link não encontrado.';
    link.is_public = fd.get('is_public') === 'true';
  });
}

/** Track record numbers on the public home; empty fields hide that number. */
export async function saveStats(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  const num = (key: string) => {
    const v = text(fd, key);
    return v === '' ? null : Math.max(0, Math.round(Number(v))) || null;
  };
  const stats: Stats = {
    clients: num('clients'),
    projects: num('projects'),
    countries: num('countries'),
    countries_list: text(fd, 'countries_list') || null,
    languages: num('languages'),
  };
  return save((data) => {
    data.stats = stats;
  }, 'Números salvos.');
}

/** Forgets every cached share image/icon so the next visit fetches them again. */
export async function refreshPreviews(): Promise<ActionResult> {
  if (!(await isAdmin())) return { error: 'Sessão expirada. Entre de novo.' };
  revalidateTag(PREVIEW_TAG, { expire: 0 });
  return { ok: 'Miniaturas atualizadas.' };
}

// ---------- Ordem ----------

/** Swaps an item with its neighbour and rewrites the group's order as 10, 20, 30… */
function reorder<T extends { id: string; sort_order: number }>(items: T[], id: string, dir: string) {
  const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order);
  const i = sorted.findIndex((x) => x.id === id);
  const j = dir === 'up' ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= sorted.length) return;
  [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
  sorted.forEach((x, n) => (x.sort_order = (n + 1) * 10));
}

export async function moveClient(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  return save((data) => reorder(data.clients, text(fd, 'id'), text(fd, 'dir')));
}

export async function moveLink(_prev: ActionResult, fd: FormData): Promise<ActionResult> {
  const id = text(fd, 'id');
  return save((data) => {
    const link = data.links.find((l) => l.id === id);
    if (!link) return 'Link não encontrado.';
    reorder(
      data.links.filter((l) => l.client_id === link.client_id),
      id,
      text(fd, 'dir'),
    );
  });
}
