import { Logo } from '@/components/Logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import type { Locale } from '@/lib/i18n';

export function SiteHeader({
  locale,
  languageLabel,
  panelLabel,
  showPanel,
  homeHref = '/',
}: {
  locale: Locale;
  languageLabel: string;
  panelLabel: string;
  showPanel: boolean;
  homeHref?: string;
}) {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
      <a href={homeHref} aria-label="Higss Hub">
        <Logo />
      </a>
      <div className="flex items-center gap-2">
        {showPanel && (
          <a href="/admin" className="btn-ghost">
            {panelLabel}
          </a>
        )}
        <LanguageSwitcher current={locale} label={languageLabel} />
      </div>
    </header>
  );
}

export function SiteFooter({ children }: { children?: React.ReactNode }) {
  return (
    <footer className="mx-auto mt-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-6 text-sm text-muted sm:px-6">
      <span>© {new Date().getFullYear()} Higss Hub</span>
      {children ?? (
        <a href="mailto:contact@higsshub.com" className="hover:text-text">
          contact@higsshub.com
        </a>
      )}
    </footer>
  );
}

export function SetupNotice() {
  return (
    <div className="rounded-xl border border-accent/40 bg-accent/10 p-6 text-sm leading-relaxed text-text">
      <p className="font-display font-bold">Higss Hub ainda não configurado</p>
      <p className="mt-2 text-muted">
        Na Vercel, conecte um <strong>Blob privado</strong> ao projeto (Storage → Create → Blob) e defina a variável{' '}
        <code>ADMIN_PASSWORD</code>. Depois, publique de novo.
      </p>
    </div>
  );
}
