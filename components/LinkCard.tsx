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
    <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface">
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={link.cover!}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          {...props}
        />
      ) : (
        // No share image: the site's icon centred on a drafting grid in the client's colour.
        <div className="card-grid flex size-full items-center justify-center bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--brand)_20%,transparent),transparent_70%)]">
          <SiteIcon src={iconSrc} host={host} className="size-16 rounded-2xl text-2xl shadow-lg ring-1 ring-border" />
        </div>
      )}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent" />
    </div>
  );
}

/** Corner ticks like the crop marks on a technical drawing; light up in the client's colour on hover. */
function CropMarks() {
  const tick = 'pointer-events-none absolute size-3 border-(--brand) opacity-0 transition-opacity duration-300 group-hover:opacity-100';
  return (
    <>
      <span aria-hidden className={`${tick} -left-1.5 -top-1.5 border-l border-t`} />
      <span aria-hidden className={`${tick} -right-1.5 -top-1.5 border-r border-t`} />
      <span aria-hidden className={`${tick} -bottom-1.5 -left-1.5 border-b border-l`} />
      <span aria-hidden className={`${tick} -bottom-1.5 -right-1.5 border-b border-r`} />
    </>
  );
}

export function LinkCard({ link, labels, index }: { link: LinkView; labels: CardLabels; index?: number }) {
  const host = hostOf(link.url);
  const iconSrc = link.icon ?? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=128`;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col rounded-2xl border border-border bg-card transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-(--brand)/60 hover:bg-card-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--brand)"
    >
      <CropMarks />
      <div className="overflow-hidden rounded-t-2xl">
        <Cover link={link} iconSrc={iconSrc} host={host} />
      </div>
      {index !== undefined && (
        <span className="absolute left-3 top-3 rounded-md border border-border/80 bg-bg/80 px-1.5 py-0.5 font-mono text-[10px] tracking-widest text-muted backdrop-blur">
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start gap-3">
          <SiteIcon src={iconSrc} host={host} className="size-9 rounded-lg text-sm ring-1 ring-border" />
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-display text-lg font-bold leading-tight text-text">{link.title}</h3>
            <p className="truncate font-mono text-[11px] text-muted">{host}</p>
          </div>
        </div>
        {link.summary && <p className="line-clamp-2 text-sm leading-relaxed text-muted">{link.summary}</p>}
        <div className="mt-auto flex items-center gap-2 pt-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{labels.kinds[link.kind]}</span>
          {!link.is_public && (
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">{labels.private}</span>
          )}
          <span className="ml-auto flex size-8 items-center justify-center rounded-full border border-border text-muted transition-colors group-hover:border-(--brand) group-hover:bg-(--brand) group-hover:text-bg">
            <svg viewBox="0 0 16 16" aria-hidden className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px">
              <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
