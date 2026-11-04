import { CountUp } from '@/components/home/CountUp';
import { SketchToSystem } from '@/components/home/SketchToSystem';
import { ProjectAccess } from '@/components/ProjectAccess';
import { SetupNotice } from '@/components/SiteChrome';
import { env } from '@/lib/env';
import { SOURCE_LINKS, getHomeCopy } from '@/lib/home-copy';
import { getDictionary, type Locale } from '@/lib/i18n';
import { DEFAULT_STATS, readHub, storageMode } from '@/lib/store';

const WHATSAPP = '41782439213';
const EMAIL = 'contact@higsshub.com';

/** The public home: a story from sketch to system. It never lists a client or a project. */
export async function Landing({ locale, header }: { locale: Locale; header: React.ReactNode }) {
  const t = getDictionary(locale);
  const c = getHomeCopy(locale);
  const access = { label: t.accessLabel, placeholder: t.accessPlaceholder, button: t.accessButton };

  // Only aggregate numbers leave the store here.
  const data = storageMode ? await readHub() : null;
  const stats = { ...DEFAULT_STATS, ...data?.stats };
  const numbers = [
    { value: stats.clients ?? data?.clients.length ?? null, label: c.numbers.clients },
    { value: stats.projects, label: c.numbers.projects },
    { value: stats.countries, label: c.numbers.countries, note: stats.countries_list },
    { value: stats.languages, label: c.numbers.languages },
  ].filter((n): n is { value: number; label: string; note?: string | null } => typeof n.value === 'number' && n.value > 0);

  return (
    <main className="flex-1">
      {/* 0 — Opening: the drafting table */}
      <section className="blueprint relative isolate overflow-hidden">
        {header}
        <div className="mx-auto flex min-h-[calc(100dvh-5rem)] max-w-6xl flex-col justify-center px-4 pb-16 pt-10 sm:px-6">
          <p className="reveal font-mono text-xs uppercase tracking-[0.25em] text-accent" style={{ animationDelay: '0ms' }}>
            {c.heroEyebrow}
          </p>
          <h1 className="mt-5 font-display text-[clamp(3rem,10vw,8.5rem)] font-extrabold leading-[0.92] tracking-[-0.04em]">
            <span className="reveal block" style={{ animationDelay: '60ms' }}>
              {c.heroTitle[0]}
            </span>
            <span className="reveal block text-stroke" style={{ animationDelay: '140ms' }}>
              {c.heroTitle[1]}
            </span>
          </h1>
          <p className="reveal mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={{ animationDelay: '220ms' }}>
            {c.heroText}
          </p>
          <div className="reveal mt-10 w-full max-w-xl" style={{ animationDelay: '300ms' }}>
            <p className="text-sm font-medium text-text/80">{c.clientHint}</p>
            {storageMode ? <ProjectAccess locale={locale} labels={access} suffix={`.${env.rootDomain}`} compact /> : <SetupNotice />}
          </div>
          <p className="reveal mt-16 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted" style={{ animationDelay: '500ms' }}>
            <span className="scroll-cue inline-block h-8 w-px bg-gradient-to-b from-accent to-transparent" />
            {c.scroll}
          </p>
        </div>
      </section>

      {/* 1–3 — Sketch → structure → system */}
      <SketchToSystem steps={c.steps} kpis={c.kpis} />

      {/* 4 — Track record */}
      {numbers.length > 0 && (
        <section className="border-y border-border bg-surface/60">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">04 — {c.numbersTitle}</p>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
              {numbers.map((n) => (
                <div key={n.label} className="border-l border-border pl-5">
                  <dt className="sr-only">{n.label}</dt>
                  <dd>
                    <CountUp value={n.value} className="block font-display text-6xl font-extrabold tracking-tight tabular-nums sm:text-7xl" />
                    <span className="mt-2 block text-muted">{n.label}</span>
                    {n.note && <span className="mt-1 block font-mono text-xs tracking-widest text-accent">{n.note}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* 5 — Close: open your page, or start a project */}
      <section className="mx-auto grid max-w-6xl gap-16 px-4 py-24 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{c.finalTitle}</h2>
          <p className="mt-3 text-muted">{c.finalText}</p>
          {storageMode && <ProjectAccess locale={locale} labels={access} suffix={`.${env.rootDomain}`} compact inputId="project-final" />}
        </div>
        <div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{c.startTitle}</h2>
          <p className="mt-3 text-muted">{c.startText}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="btn-primary min-h-12 rounded-xl px-6 text-base">
              {c.whatsapp} →
            </a>
            <a href={`mailto:${EMAIL}`} className="btn-ghost min-h-12 rounded-xl px-6 text-base">
              {c.email}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{c.sourcesTitle}</h2>
        <ol className="mt-3 flex flex-col gap-1 text-xs text-muted">
          {SOURCE_LINKS.map((s, i) => (
            <li key={s.url}>
              {i + 1}.{' '}
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-2 hover:text-text">
                {s.label}
              </a>
            </li>
          ))}
        </ol>
        <p className="mt-3 max-w-2xl text-xs text-muted/80">{c.sourcesNote}</p>
      </section>
    </main>
  );
}
