import type { Metadata } from 'next';
import { ActionForm, SubmitButton } from '@/components/admin/ActionForm';
import { Logo } from '@/components/Logo';
import { SetupNotice } from '@/components/SiteChrome';
import { isSupabaseConfigured } from '@/lib/env';
import { sendMagicLink } from './actions';

export const metadata: Metadata = { title: 'Entrar · Higss Hub', robots: { index: false } };

const ERRORS: Record<string, string> = {
  link: 'O link expirou ou já foi usado. Peça um novo abaixo.',
  config: 'Supabase ainda não configurado.',
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;
  return (
    <main className="flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <a href="/" className="mb-8 inline-block">
          <Logo />
        </a>
        <h1 className="font-display text-2xl font-bold">Entrar no painel</h1>
        <p className="mt-1 text-sm text-muted">Enviamos um link de acesso para o seu e-mail. Sem senha.</p>
        {erro && ERRORS[erro] && <p className="mt-4 text-sm text-danger">{ERRORS[erro]}</p>}
        {isSupabaseConfigured ? (
          <ActionForm action={sendMagicLink} className="mt-6 flex flex-col gap-3">
            <label className="text-sm font-medium" htmlFor="email">
              E-mail
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" className="field" placeholder="voce@exemplo.com" />
            <SubmitButton>Enviar link de acesso</SubmitButton>
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
