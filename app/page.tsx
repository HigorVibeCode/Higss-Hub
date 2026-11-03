import { LinkExplorer, type LinkGroup } from '@/components/LinkExplorer';
import { SetupNotice, SiteFooter, SiteHeader } from '@/components/SiteChrome';
import { isAdmin } from '@/lib/auth';
import { getHubData } from '@/lib/data';
import { clientUrl } from '@/lib/domain';
import { env } from '@/lib/env';
import { getDictionary } from '@/lib/i18n';
import { getLocale } from '@/lib/locale';
import { storageMode } from '@/lib/store';

export default async function HubPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const admin = await isAdmin();
  const data = storageMode ? await getHubData(admin) : null;

  const groups: LinkGroup[] = [];
  if (data) {
    for (const client of data.clients) {
      groups.push({
        id: client.id,
        title: client.name,
        href: admin ? clientUrl(client.slug, env.rootDomain) : undefined,
        links: data.links.filter((l) => l.client_id === client.id),
      });
    }
    groups.push({ id: 'personal', title: t.personal, links: data.links.filter((l) => !l.client_id) });
  }
  const filled = groups.filter((g) => g.links.length > 0);
  const total = filled.reduce((n, g) => n + g.links.length, 0);

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader locale={locale} languageLabel={t.language} panelLabel={t.panel} showPanel={admin} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-8 sm:px-6 sm:pt-14">
        <div className="mb-10 max-w-2xl">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Higss <span className="text-accent">Hub</span>
          </h1>
          <p className="mt-3 text-lg text-muted">{t.hubIntro}</p>
        </div>
        {!data ? (
          <SetupNotice />
        ) : total === 0 ? (
          <p className="rounded-xl border border-dashed border-border py-14 text-center text-muted">{t.empty}</p>
        ) : (
          <LinkExplorer
            groups={filled}
            searchable={total > 6}
            labels={{ search: t.search, noResults: t.noResults, private: t.private, kinds: t.kinds }}
          />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
