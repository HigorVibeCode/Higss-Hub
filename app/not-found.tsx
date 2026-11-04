import { Logo } from '@/components/Logo';

export default function NotFound() {
  return (
    <main className="blueprint relative isolate flex min-h-dvh flex-col items-center justify-center gap-6 overflow-hidden px-4 text-center">
      <a href="/" aria-label="Higss Hub">
        <Logo />
      </a>
      <p className="text-stroke font-display text-[clamp(7rem,28vw,16rem)] font-extrabold leading-none tracking-[-0.05em]">404</p>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Página não encontrada · Page not found</p>
      <a href="/" className="btn-primary min-h-11 rounded-xl px-6">
        Higss Hub →
      </a>
    </main>
  );
}
