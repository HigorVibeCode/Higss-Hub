'use client';

import { useEffect, useRef, useState } from 'react';
import type { Link } from '@/lib/data';

export type CardLabels = { private: string; kinds: Record<Link['kind'], string> };

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function LinkCard({ link, labels }: { link: Link; labels: CardLabels }) {
  const host = hostOf(link.url);
  const [iconFailed, setIconFailed] = useState(false);
  const iconRef = useRef<HTMLImageElement>(null);

  // The icon may finish loading before hydration, when onLoad/onError never fire.
  useEffect(() => {
    const img = iconRef.current;
    if (img?.complete && img.naturalWidth <= 16) setIconFailed(true);
  }, []);

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-(--brand) hover:bg-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
    >
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface font-display text-base font-bold text-muted">
          {iconFailed ? (
            host.charAt(0).toUpperCase()
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={iconRef}
              src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`}
              alt=""
              width={24}
              height={24}
              loading="lazy"
              onError={() => setIconFailed(true)}
              // Google answers unknown domains with a generic 16px globe; show the initial instead.
              onLoad={(e) => e.currentTarget.naturalWidth <= 16 && setIconFailed(true)}
            />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display font-semibold text-text">{link.title}</h3>
          <p className="truncate text-xs text-muted">{host}</p>
        </div>
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-(--brand)"
        >
          <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {link.description && <p className="line-clamp-2 text-sm text-muted">{link.description}</p>}
      <div className="mt-auto flex flex-wrap gap-1.5">
        <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted">
          {labels.kinds[link.kind]}
        </span>
        {!link.is_public && (
          <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
            {labels.private}
          </span>
        )}
      </div>
    </a>
  );
}
