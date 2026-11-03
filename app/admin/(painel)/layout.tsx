import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { SetupNotice } from '@/components/SiteChrome';
import { isAdmin, isAuthConfigured } from '@/lib/auth';
import { storageMode } from '@/lib/store';
import { logout } from '../login/actions';

export const metadata: Metadata = { title: 'Painel · Higss Hub', robots: { index: false } };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!storageMode || !isAuthConfigured()) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16">
        <SetupNotice />
      </main>
    );
  }
  if (!(await isAdmin())) redirect('/admin/login');

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
            <form action={logout}>
              <button type="submit" className="btn-ghost">
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>
      {storageMode === 'local' && (
        <p className="mx-auto max-w-4xl px-4 pt-4 text-xs text-muted sm:px-6">
          Modo local: os dados ficam em <code>.data/hub.json</code> (sem Vercel Blob).
        </p>
      )}
      {children}
    </div>
  );
}
