import { LogoMark } from '@/components/Logo';

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
      <LogoMark className="size-10" />
      <h1 className="font-display text-2xl font-bold">404</h1>
      <a href="/" className="btn-ghost">
        Higss Hub
      </a>
    </main>
  );
}
