'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ActionResult } from '@/components/admin/ActionForm';
import { env } from '@/lib/env';
import { getSupabase } from '@/lib/supabase/server';

const SENT = 'Se este e-mail tiver acesso, o link de entrada chega em instantes. Confira sua caixa de entrada.';

export async function sendMagicLink(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: 'Digite um e-mail válido.' };

  const supabase = await getSupabase();
  if (!supabase) return { error: 'Supabase ainda não configurado.' };

  // Only allow-listed e-mails get a link; everyone else sees the same neutral message.
  if (!env.adminEmails.includes(email)) return { ok: SENT };

  const h = await headers();
  const origin = `${h.get('x-forwarded-proto') ?? 'http'}://${h.get('host')}`;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${origin}/auth/callback`, shouldCreateUser: true },
  });
  if (error) return { error: `Não foi possível enviar o link: ${error.message}` };
  return { ok: SENT };
}

export async function signOut() {
  const supabase = await getSupabase();
  await supabase?.auth.signOut();
  redirect('/admin/login');
}
