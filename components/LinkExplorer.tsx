'use client';

import { useMemo, useState } from 'react';
import type { LinkView } from '@/lib/data';
import { LinkCard, type CardLabels } from '@/components/LinkCard';

export type LinkGroup = { id: string; title: string | null; href?: string; links: LinkView[] };

type Labels = CardLabels & { search: string; noResults: string };

function normalize(text: string) {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

export function LinkExplorer({ groups, labels, searchable }: { groups: LinkGroup[]; labels: Labels; searchable: boolean }) {
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return groups;
    return groups
      .map((g) => {
        const groupHit = g.title ? normalize(g.title).includes(q) : false;
        const links = groupHit
          ? g.links
          : g.links.filter((l) => normalize(`${l.title} ${l.url} ${l.summary ?? ''}`).includes(q));
        return { ...g, links };
      })
      .filter((g) => g.links.length > 0);
  }, [groups, query]);

  return (
    <div className="flex flex-col gap-14">
      {searchable && (
        <label className="relative block">
          <span className="sr-only">{labels.search}</span>
          <svg viewBox="0 0 20 20" aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted">
            <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="m14 14 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.search}
            className="min-h-12 w-full rounded-xl border border-border bg-surface/80 py-3 pl-11 pr-4 text-text backdrop-blur placeholder:text-muted/70 focus:border-(--brand) focus:outline-none"
          />
        </label>
      )}

      {visible.length === 0 && <p className="py-10 text-center text-muted">{labels.noResults}</p>}

      {visible.map((group, gi) => (
        <section key={group.id} className="flex flex-col gap-6">
          {group.title && (
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
              <div className="flex min-w-0 items-baseline gap-4">
                <span className="font-mono text-xs tracking-[0.2em] text-accent">{String(gi + 1).padStart(2, '0')}</span>
                <h2 className="truncate font-display text-2xl font-extrabold tracking-tight">{group.title}</h2>
                <span className="font-mono text-xs text-muted">{group.links.length}</span>
              </div>
              {group.href && (
                <a href={group.href} className="shrink-0 font-mono text-xs text-accent hover:text-accent-hover">
                  {group.href.replace(/^https?:\/\//, '')} ↗
                </a>
              )}
              {/* Dimension line under the group title */}
              <span aria-hidden className="relative block h-px w-full basis-full bg-border">
                <span className="absolute -top-1 left-0 h-2 w-px bg-border" />
                <span className="absolute -top-1 right-0 h-2 w-px bg-border" />
              </span>
            </div>
          )}
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.links.map((link, i) => (
              <li key={link.id}>
                <LinkCard link={link} labels={labels} index={i} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
