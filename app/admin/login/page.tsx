import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ActionForm, SubmitButton } from '@/components/admin/ActionForm';
import { Logo } from '@/components/Logo';
import { SetupNotice } from '@/components/SiteChrome';
import { isAdmin, isAuthConfigured } from '@/lib/auth';
import { login } from './actions';

export const metadata: Metadata = { title: 'Entrar · Higss Hub', robots: { index: false } };

export default async function LoginPage() {
  if (await isAdmin()) redirect('/admin');
  return (
    <main className="blueprint relative isolate flex min-h-dvh items-center justify-center overflow-hidden px-4">
      <div className="reveal relative w-full max-w-sm rounded-2xl border border-border bg-surface/85 p-8 shadow-2xl backdrop-blur">
        {/* Crop marks, as on the cards */}
        <span aria-hidden className="absolute -left-2 -top-2 size-4 border-l border-t border-accent" />
        <span aria-hidden className="absolute -right-2 -top-2 size-4 border-r border-t border-accent" />
        <span aria-hidden className="absolute -bottom-2 -left-2 size-4 border-b border-l border-accent" />
        <span aria-hidden className="absolute -bottom-2 -right-2 size-4 border-b border-r border-accent" />
        <a href="/" className="inline-block">
          <Logo />
        </a>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Painel · acesso restrito</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Entrar</h1>
        {isAuthConfigured() ? (
          <ActionForm action={login} className="mt-6 flex flex-col gap-3">
            <label className="text-sm font-medium text-muted" htmlFor="password">
              Senha
            </label>
            <input id="password" name="password" type="password" required autoFocus autoComplete="current-password" className="field min-h-11" />
            <SubmitButton className="btn-primary min-h-11">Entrar →</SubmitButton>
          </ActionForm>
        ) : (
          <div className="mt-6">
            <SetupNotice />
          </div>
        )}
      </div>
    </main>
  );
}
