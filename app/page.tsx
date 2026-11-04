import { ProjectAccess } from '@/components/ProjectAccess';
import { LinkExplorer, type LinkGroup } from '@/components/LinkExplorer';
import { LogoMark } from '@/components/Logo';
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

/** What everyone sees: no project or client is ever listed, only the field to open your own page. */
function Landing({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <main className="relative flex flex-1 items-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--color-accent)_18%,transparent),transparent_65%)]"
      />
      <div className="relative mx-auto w-full max-w-xl px-4 py-16 text-center sm:px-6">
        <LogoMark className="mx-auto size-14" />
        <h1 className="mt-8 text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{t.homeTitle}</h1>
        <p className="mx-auto mt-4 max-w-md text-balance text-lg text-muted">{t.homeIntro}</p>
        {storageMode ? (
          <ProjectAccess
            locale={locale}
            labels={{ label: t.accessLabel, placeholder: t.accessPlaceholder, button: t.accessButton }}
            suffix={`.${env.rootDomain}`}
          />
        ) : (
          <div className="mt-10 text-left">
            <SetupNotice />
          </div>
        )}
      </div>
    </main>
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
