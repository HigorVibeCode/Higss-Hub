import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { SetupNotice } from '@/components/SiteChrome';
import { getViewer } from '@/lib/data';
import { getSupabase } from '@/lib/supabase/server';
import { signOut } from '../login/actions';

export const metadata: Metadata = { title: 'Painel · Higss Hub', robots: { index: false } };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const supabase = await getSupabase();
  if (!supabase) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16">
        <SetupNotice />
      </main>
    );
  }
  const viewer = await getViewer(supabase);
  if (!viewer.email) redirect('/admin/login');

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-10 border-b border-border bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="/admin" className="flex items-center gap-3">
            <Logo />
            <span className="hidden rounded-full border border-border px-2 py-0.5 text-xs text-muted sm:inline">Painel</span>
          </a>
          <div className="flex items-center gap-2">
            <a href="/" className="btn-ghost">
              Ver hub
            </a>
            <form action={signOut}>
              <button type="submit" className="btn-ghost" title={viewer.email ?? undefined}>
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>
      {viewer.isAdmin ? (
        children
      ) : (
        <main className="mx-auto max-w-xl px-4 py-16 text-center">
          <h1 className="font-display text-xl font-bold">Sem acesso</h1>
          <p className="mt-2 text-muted">
            {viewer.email} não está na lista de administradores (tabela <code>public.admins</code>).
          </p>
        </main>
      )}
    </div>
  );
}
