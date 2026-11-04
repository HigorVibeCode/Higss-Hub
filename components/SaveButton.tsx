'use client';

import { useEffect, useRef, useState } from 'react';

type Labels = { save: string; title: string; install: string; desktop: string; ios: string; android: string; close: string };
type InstallPrompt = Event & { prompt: () => Promise<void> };

/**
 * Browsers no longer let a page add itself to bookmarks, so this offers the next best thing:
 * the native "install app" prompt where it exists (Chrome, Edge, Android), and otherwise
 * the right shortcut for the visitor's device.
 */
export function SaveButton({ labels, prominent = false }: { labels: Labels; prominent?: boolean }) {
  const [installPrompt, setInstallPrompt] = useState<InstallPrompt | null>(null);
  const [installed, setInstalled] = useState(false);
  const [device, setDevice] = useState<'ios' | 'android' | 'desktop'>('desktop');
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    setDevice(/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) ? 'ios' : /Android/.test(ua) ? 'android' : 'desktop');
    setInstalled(window.matchMedia('(display-mode: standalone)').matches);
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as InstallPrompt);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  if (installed) return null;

  return (
    <>
      <button
        type="button"
        className={prominent ? 'btn min-h-11 shrink-0 rounded-xl bg-(--brand) px-5 text-bg hover:opacity-90' : 'btn-ghost'}
        onClick={() => dialog.current?.showModal()}
      >
        <svg viewBox="0 0 20 20" aria-hidden className="size-4">
          <path d="M5 3h10v14l-5-3.5L5 17z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
        {labels.save}
      </button>
      <dialog
        ref={dialog}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto w-[min(92vw,26rem)] rounded-2xl border border-border bg-surface p-0 text-text backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex flex-col gap-4 p-6">
          <h2 className="font-display text-lg font-bold">{labels.title}</h2>
          {installPrompt && (
            <button
              type="button"
              className="btn-primary"
              onClick={async () => {
                await installPrompt.prompt();
                setInstallPrompt(null);
                dialog.current?.close();
              }}
            >
              {labels.install}
            </button>
          )}
          <p className="text-sm leading-relaxed text-muted">
            {device === 'ios' ? labels.ios : device === 'android' ? labels.android : labels.desktop}
          </p>
          <button type="button" className="btn-ghost self-end" onClick={() => dialog.current?.close()}>
            {labels.close}
          </button>
        </div>
      </dialog>
    </>
  );
}
