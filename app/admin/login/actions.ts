'use server';

import { redirect } from 'next/navigation';
import type { ActionResult } from '@/components/admin/ActionForm';
import { checkPassword, endSession, isAuthConfigured, startSession } from '@/lib/auth';

export async function login(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  if (!isAuthConfigured()) return { error: 'Defina ADMIN_PASSWORD nas variáveis de ambiente da Vercel.' };
  if (!checkPassword(String(formData.get('password') ?? ''))) {
    await new Promise((r) => setTimeout(r, 800)); // slows down guessing
    return { error: 'Senha incorreta.' };
  }
  await startSession();
  redirect('/admin');
}

export async function logout() {
  await endSession();
  redirect('/admin/login');
}
