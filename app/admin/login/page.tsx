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
    <main className="flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <a href="/" className="mb-8 inline-block">
          <Logo />
        </a>
        <h1 className="font-display text-2xl font-bold">Entrar no painel</h1>
        {isAuthConfigured() ? (
          <ActionForm action={login} className="mt-6 flex flex-col gap-3">
            <label className="text-sm font-medium" htmlFor="password">
              Senha
            </label>
            <input id="password" name="password" type="password" required autoFocus autoComplete="current-password" className="field" />
            <SubmitButton>Entrar</SubmitButton>
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
