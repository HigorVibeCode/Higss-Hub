import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { LinkExplorer } from '@/components/LinkExplorer';
import { LogoMark } from '@/components/Logo';
import { SetupNotice, SiteFooter, SiteHeader } from '@/components/SiteChrome';
import { getClientPage, getViewer } from '@/lib/data';
import { SLUG_RE } from '@/lib/domain';
import { env } from '@/lib/env';
import { getDictionary } from '@/lib/i18n';
import { getLocale } from '@/lib/locale';
import { getSupabase } from '@/lib/supabase/server';

type Props = { params: Promise<{ slug: string }> };

const load = cache(async (slug: string) => {
  if (!SLUG_RE.test(slug)) notFound();
  const supabase = await getSupabase();
  if (!supabase) return null;
  const page = await getClientPage(supabase, slug);
  if (!page) notFound();
  return { supabase, ...page };
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await load((await params).slug);
  return {
    title: page ? `${page.client.name} · Higss Hub` : 'Higss Hub',
    robots: { index: false, follow: false },
  };
}

export default async function ClientPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = getDictionary(locale);
  const page = await load(slug);
  const viewer = page ? await getViewer(page.supabase) : { email: null, isAdmin: false };
  const brand = page?.client.accent_color ?? undefined;
  const hubHref = `https://${env.rootDomain}`;

  return (
    <div className="flex min-h-dvh flex-col" style={brand ? ({ '--brand': brand } as React.CSSProperties) : undefined}>
      <SiteHeader
        locale={locale}
        languageLabel={t.language}
        panelLabel={t.panel}
        showPanel={viewer.isAdmin}
        homeHref={hubHref}
      />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-8 sm:px-6 sm:pt-14">
        {!page ? (
          <SetupNotice />
        ) : (
          <>
            <div className="mb-10 flex items-center gap-5">
              {page.client.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={page.client.logo_url}
                  alt=""
                  className="size-16 shrink-0 rounded-2xl bg-white/5 object-contain p-2 sm:size-20"
                />
              ) : (
                <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface font-display text-2xl font-extrabold text-(--brand) sm:size-20">
                  {page.client.name.charAt(0)}
                </span>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-(--brand)">{t.clientProjects}</p>
                <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{page.client.name}</h1>
                {page.client.tagline && <p className="mt-1 text-muted">{page.client.tagline}</p>}
              </div>
            </div>
            {page.links.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border py-14 text-center text-muted">{t.clientEmpty}</p>
            ) : (
              <LinkExplorer
                groups={[{ id: page.client.id, title: null, links: page.links }]}
                searchable={page.links.length > 6}
                labels={{ search: t.search, noResults: t.noResults, private: t.private, kinds: t.kinds }}
              />
            )}
          </>
        )}
      </main>
      <SiteFooter>
        <a href={hubHref} className="inline-flex items-center gap-1.5 hover:text-text">
          <LogoMark className="size-4" />
          {t.madeBy}
        </a>
      </SiteFooter>
    </div>
  );
}
