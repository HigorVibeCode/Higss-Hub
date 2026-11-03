'use client';

import { useEffect, useRef, useState } from 'react';
import type { Link, LinkView } from '@/lib/data';

export type CardLabels = { private: string; kinds: Record<Link['kind'], string> };

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/** An <img> that reports failure even when it finished loading before hydration. */
function useImageStatus(minWidth: number) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth <= minWidth) setFailed(true);
  }, [minWidth]);
  return {
    failed,
    props: {
      ref,
      onError: () => setFailed(true),
      onLoad: (e: React.SyntheticEvent<HTMLImageElement>) => e.currentTarget.naturalWidth <= minWidth && setFailed(true),
    },
  };
}

function SiteIcon({ src, host, className }: { src: string; host: string; className: string }) {
  // Google answers unknown domains with a generic 16px globe; show the initial instead.
  const { failed, props } = useImageStatus(16);
  return (
    <span className={`flex shrink-0 items-center justify-center overflow-hidden bg-surface font-display font-bold text-muted ${className}`}>
      {failed ? (
        host.charAt(0).toUpperCase()
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" loading="lazy" className="size-full object-contain p-[18%]" {...props} />
      )}
    </span>
  );
}

function Cover({ link, iconSrc, host }: { link: LinkView; iconSrc: string; host: string }) {
  const { failed, props } = useImageStatus(0);
  const showImage = link.cover && !failed;
  return (
    <div className="relative aspect-[1.91/1] overflow-hidden border-b border-border bg-surface">
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={link.cover!}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          {...props}
        />
      ) : (
        // No share image: the site's icon on a soft brand-coloured backdrop.
        <div className="flex size-full items-center justify-center bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--brand)_22%,transparent),transparent_70%)]">
          <SiteIcon src={iconSrc} host={host} className="size-16 rounded-2xl text-2xl shadow-lg ring-1 ring-border" />
        </div>
      )}
    </div>
  );
}

export function LinkCard({ link, labels }: { link: LinkView; labels: CardLabels }) {
  const host = hostOf(link.url);
  const iconSrc = link.icon ?? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=128`;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-(--brand) hover:bg-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand)"
    >
      <Cover link={link} iconSrc={iconSrc} host={host} />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start gap-3">
          <SiteIcon src={iconSrc} host={host} className="size-8 rounded-lg text-sm" />
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
        {link.summary && <p className="line-clamp-2 text-sm text-muted">{link.summary}</p>}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted">
            {labels.kinds[link.kind]}
          </span>
          {!link.is_public && (
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
              {labels.private}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
