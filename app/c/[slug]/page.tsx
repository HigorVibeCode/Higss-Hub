import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { LinkExplorer } from '@/components/LinkExplorer';
import { LogoMark } from '@/components/Logo';
import { SetupNotice, SiteFooter, SiteHeader } from '@/components/SiteChrome';
import { getClientPage } from '@/lib/data';
import { SaveButton } from '@/components/SaveButton';
import { SLUG_RE, clientSlugFromHost } from '@/lib/domain';
import { env } from '@/lib/env';
import { getDictionary } from '@/lib/i18n';
import { getLocale } from '@/lib/locale';
import { storageMode } from '@/lib/store';

type Props = { params: Promise<{ slug: string }> };

const load = cache(async (slug: string) => {
  if (!SLUG_RE.test(slug)) notFound();
  if (!storageMode) return null;
  const page = await getClientPage(slug);
  if (!page) notFound();
  return page;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await load((await params).slug);
  const title = page ? `${page.client.name} · Higss Hub` : 'Higss Hub';
  const description = page?.client.tagline || (page ? page.links.map((l) => l.title).join(' · ') : undefined);
  return {
    title,
    description,
    openGraph: { title, description },
    robots: { index: false, follow: false },
    // Lets the client install the page as an app named after them (see manifest.webmanifest/route.ts).
    manifest: (await onClientSubdomain()) ? '/manifest.webmanifest' : `/c/${(await params).slug}/manifest.webmanifest`,
    appleWebApp: { capable: true, title: page?.client.name ?? 'Higss Hub', statusBarStyle: 'black-translucent' },
  };
}

async function onClientSubdomain() {
  return clientSlugFromHost((await headers()).get('host'), env.rootDomain) !== null;
}

export default async function ClientPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = getDictionary(locale);
  const page = await load(slug);
  const brand = page?.client.accent_color ?? undefined;
  const hubHref = `https://${env.rootDomain}`;

  const saveLabels = {
    save: t.save,
    title: t.saveTitle,
    install: t.installApp,
    desktop: t.saveDesktop,
    ios: t.saveIos,
    android: t.saveAndroid,
    close: t.close,
  };

  return (
    <div className="relative isolate flex min-h-dvh flex-col" style={brand ? ({ '--brand': brand } as React.CSSProperties) : undefined}>
      {/* Header and title share one drafting-table background, tinted in the client's colour */}
      <div className="blueprint relative isolate border-b border-border/60">
        <SiteHeader locale={locale} languageLabel={t.language} panelLabel={t.panel} showPanel={false} homeHref={hubHref} />
        {page && (
          <section className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-14">
            <p className="reveal flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-(--brand)">
              <span className="inline-block h-px w-8 bg-(--brand)" />
              {t.clientProjects} · {String(page.links.length).padStart(2, '0')} {t.projects}
            </p>
            <div className="reveal mt-6 flex flex-col gap-6 sm:flex-row sm:items-end" style={{ animationDelay: '80ms' }}>
              <span className="relative shrink-0">
                {page.client.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={page.client.logo_url}
                    alt=""
                    className="size-20 rounded-2xl border border-border bg-white/5 object-contain p-2.5 sm:size-24"
                  />
                ) : (
                  <span className="flex size-20 items-center justify-center rounded-2xl border border-border bg-surface font-display text-4xl font-extrabold text-(--brand) sm:size-24">
                    {page.client.name.charAt(0)}
                  </span>
                )}
              </span>
              <h1 className="min-w-0 text-balance break-words font-display text-[clamp(2.5rem,7vw,5.75rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
                {page.client.name}
              </h1>
            </div>
            <div className="reveal mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-end [&>p]:sm:mr-auto" style={{ animationDelay: '160ms' }}>
              {page.client.tagline && <p className="max-w-xl text-lg text-muted">{page.client.tagline}</p>}
              <SaveButton labels={saveLabels} prominent />
            </div>
          </section>
        )}
      </div>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-20 pt-12 sm:px-6">
        {!page ? (
          <SetupNotice />
        ) : page.links.length === 0 ? (
          <p className="card-grid rounded-2xl border border-dashed border-border py-20 text-center text-muted">{t.clientEmpty}</p>
        ) : (
          <LinkExplorer
            groups={[{ id: page.client.id, title: null, links: page.links }]}
            searchable={page.links.length > 6}
            labels={{ search: t.search, noResults: t.noResults, private: t.private, kinds: t.kinds }}
          />
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
