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
    <div className="flex flex-col gap-10">
      {searchable && (
        <label className="relative block">
          <span className="sr-only">{labels.search}</span>
          <svg viewBox="0 0 20 20" aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted">
            <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="m14 14 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.search}
            className="w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-4 text-text placeholder:text-muted/70 focus:border-(--brand) focus:outline-none"
          />
        </label>
      )}

      {visible.length === 0 && <p className="py-10 text-center text-muted">{labels.noResults}</p>}

      {visible.map((group) => (
        <section key={group.id} className="flex flex-col gap-4">
          {group.title && (
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border pb-2">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-muted">
                {group.title} <span className="whitespace-nowrap font-medium text-muted/60">· {group.links.length}</span>
              </h2>
              {group.href && (
                <a href={group.href} className="shrink-0 text-xs font-medium text-accent hover:text-accent-hover">
                  {group.href.replace(/^https?:\/\//, '')} ↗
                </a>
              )}
            </div>
          )}
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.links.map((link) => (
              <li key={link.id}>
                <LinkCard link={link} labels={labels} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
