import { Landing } from '@/components/home/Landing';
import { LinkExplorer, type LinkGroup } from '@/components/LinkExplorer';
import { SetupNotice, SiteFooter, SiteHeader } from '@/components/SiteChrome';
import { isAdmin } from '@/lib/auth';
import { getHubView } from '@/lib/data';
import { clientUrl } from '@/lib/domain';
import { env } from '@/lib/env';
import { getDictionary, type Locale } from '@/lib/i18n';
import { getLocale } from '@/lib/locale';
import { storageMode } from '@/lib/store';

export default async function HomePage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const admin = await isAdmin();

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader locale={locale} languageLabel={t.language} panelLabel={t.panel} showPanel={admin} />
      {admin ? <AdminHub locale={locale} /> : <Landing locale={locale} />}
      <SiteFooter />
    </div>
  );
}

/** Logged in, the home is Higor's own hub with every link. */
async function AdminHub({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const data = storageMode ? await getHubView(true) : null;
  const groups: LinkGroup[] = data
    ? [
        ...data.clients.map((client) => ({
          id: client.id,
          title: client.name,
          href: clientUrl(client.slug, env.rootDomain),
          links: data.links.filter((l) => l.client_id === client.id),
        })),
        { id: 'personal', title: t.personal, links: data.links.filter((l) => !l.client_id) },
      ].filter((g) => g.links.length > 0)
    : [];
  const total = groups.reduce((n, g) => n + g.links.length, 0);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          Higss <span className="text-accent">Hub</span>
        </h1>
        <p className="mt-1 text-sm text-muted">Só você vê esta lista. Visitantes veem apenas o campo de acesso.</p>
      </div>
      {!data ? (
        <SetupNotice />
      ) : total === 0 ? (
        <p className="rounded-xl border border-dashed border-border py-14 text-center text-muted">{t.empty}</p>
      ) : (
        <LinkExplorer
          groups={groups}
          searchable={total > 6}
          labels={{ search: t.search, noResults: t.noResults, private: t.private, kinds: t.kinds }}
        />
      )}
    </main>
  );
}
