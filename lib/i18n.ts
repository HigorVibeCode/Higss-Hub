export const locales = ['en', 'pt', 'de', 'fr', 'es', 'it'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const LOCALE_COOKIE = 'locale';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  pt: 'Português',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export type Kind = 'site' | 'app' | 'admin' | 'staging' | 'docs' | 'other';

type Dictionary = {
  hubIntro: string;
  search: string;
  noResults: string;
  empty: string;
  personal: string;
  private: string;
  panel: string;
  language: string;
  clientProjects: string;
  clientEmpty: string;
  madeBy: string;
  kinds: Record<Kind, string>;
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    hubIntro: 'Projects, systems and sites — all in one place.',
    search: 'Search projects…',
    noResults: 'Nothing matches your search.',
    empty: 'No public projects yet.',
    personal: 'Other projects',
    private: 'Private',
    panel: 'Panel',
    language: 'Language',
    clientProjects: 'Your projects',
    clientEmpty: 'Your projects will appear here soon.',
    madeBy: 'Built by Higss Hub',
    kinds: { site: 'Website', app: 'App', admin: 'Admin', staging: 'Staging', docs: 'Docs', other: 'Link' },
  },
  pt: {
    hubIntro: 'Projetos, sistemas e sites — tudo em um só lugar.',
    search: 'Buscar projetos…',
    noResults: 'Nada encontrado para essa busca.',
    empty: 'Nenhum projeto público ainda.',
    personal: 'Outros projetos',
    private: 'Privado',
    panel: 'Painel',
    language: 'Idioma',
    clientProjects: 'Seus projetos',
    clientEmpty: 'Seus projetos aparecerão aqui em breve.',
    madeBy: 'Feito por Higss Hub',
    kinds: { site: 'Site', app: 'App', admin: 'Painel', staging: 'Teste', docs: 'Documentos', other: 'Link' },
  },
  de: {
    hubIntro: 'Projekte, Systeme und Websites — alles an einem Ort.',
    search: 'Projekte suchen…',
    noResults: 'Keine Treffer für diese Suche.',
    empty: 'Noch keine öffentlichen Projekte.',
    personal: 'Weitere Projekte',
    private: 'Privat',
    panel: 'Verwaltung',
    language: 'Sprache',
    clientProjects: 'Ihre Projekte',
    clientEmpty: 'Ihre Projekte erscheinen hier in Kürze.',
    madeBy: 'Erstellt von Higss Hub',
    kinds: { site: 'Website', app: 'App', admin: 'Verwaltung', staging: 'Test', docs: 'Dokumente', other: 'Link' },
  },
  fr: {
    hubIntro: 'Projets, systèmes et sites — tout au même endroit.',
    search: 'Rechercher des projets…',
    noResults: 'Aucun résultat pour cette recherche.',
    empty: 'Aucun projet public pour le moment.',
    personal: 'Autres projets',
    private: 'Privé',
    panel: 'Panneau',
    language: 'Langue',
    clientProjects: 'Vos projets',
    clientEmpty: 'Vos projets apparaîtront ici bientôt.',
    madeBy: 'Réalisé par Higss Hub',
    kinds: { site: 'Site', app: 'App', admin: 'Admin', staging: 'Test', docs: 'Documents', other: 'Lien' },
  },
  es: {
    hubIntro: 'Proyectos, sistemas y sitios — todo en un solo lugar.',
    search: 'Buscar proyectos…',
    noResults: 'No hay resultados para esta búsqueda.',
    empty: 'Aún no hay proyectos públicos.',
    personal: 'Otros proyectos',
    private: 'Privado',
    panel: 'Panel',
    language: 'Idioma',
    clientProjects: 'Tus proyectos',
    clientEmpty: 'Tus proyectos aparecerán aquí pronto.',
    madeBy: 'Hecho por Higss Hub',
    kinds: { site: 'Sitio', app: 'App', admin: 'Panel', staging: 'Pruebas', docs: 'Documentos', other: 'Enlace' },
  },
  it: {
    hubIntro: 'Progetti, sistemi e siti — tutto in un unico posto.',
    search: 'Cerca progetti…',
    noResults: 'Nessun risultato per questa ricerca.',
    empty: 'Ancora nessun progetto pubblico.',
    personal: 'Altri progetti',
    private: 'Privato',
    panel: 'Pannello',
    language: 'Lingua',
    clientProjects: 'I tuoi progetti',
    clientEmpty: 'I tuoi progetti appariranno qui a breve.',
    madeBy: 'Realizzato da Higss Hub',
    kinds: { site: 'Sito', app: 'App', admin: 'Admin', staging: 'Test', docs: 'Documenti', other: 'Link' },
  },
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

/** Picks the best supported locale from an Accept-Language header. */
export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  const ranked = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { lang: tag.toLowerCase().split('-')[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.find((r) => isLocale(r.lang))?.lang as Locale | undefined ?? defaultLocale;
}
