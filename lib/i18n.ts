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
  homeTitle: string;
  homeIntro: string;
  accessLabel: string;
  accessPlaceholder: string;
  accessButton: string;
  accessNotFound: string;
  save: string;
  saveTitle: string;
  installApp: string;
  saveDesktop: string;
  saveIos: string;
  saveAndroid: string;
  close: string;
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
    homeTitle: "Your projects, in one place.",
    homeIntro: "Websites, systems and catalogs built by Higss Hub. Enter your project name to open your page.",
    accessLabel: "Project name",
    accessPlaceholder: "e.g. crea",
    accessButton: "Open",
    accessNotFound: "We couldn't find a project with that name. Check the spelling.",
    save: "Save",
    saveTitle: "Keep this page at hand",
    installApp: "Install as app",
    saveDesktop: "Press ⌘ + D (Mac) or Ctrl + D (Windows) to add this page to your bookmarks.",
    saveIos: "On iPhone or iPad: tap Share, then “Add to Home Screen”.",
    saveAndroid: "On Android: open the browser menu ⋮ and tap “Add to Home screen”.",
    close: "Close",
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
    homeTitle: "Seus projetos, em um só lugar.",
    homeIntro: "Sites, sistemas e catálogos feitos pela Higss Hub. Digite o nome do seu projeto para abrir a sua página.",
    accessLabel: "Nome do projeto",
    accessPlaceholder: "ex.: crea",
    accessButton: "Abrir",
    accessNotFound: "Não encontramos um projeto com esse nome. Confira a escrita.",
    save: "Salvar",
    saveTitle: "Deixe esta página sempre à mão",
    installApp: "Instalar como app",
    saveDesktop: "Pressione ⌘ + D (Mac) ou Ctrl + D (Windows) para salvar esta página nos favoritos.",
    saveIos: "No iPhone ou iPad: toque em Compartilhar e depois em “Adicionar à Tela de Início”.",
    saveAndroid: "No Android: abra o menu ⋮ do navegador e toque em “Adicionar à tela inicial”.",
    close: "Fechar",
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
    homeTitle: "Ihre Projekte an einem Ort.",
    homeIntro: "Websites, Systeme und Kataloge von Higss Hub. Geben Sie den Namen Ihres Projekts ein, um Ihre Seite zu öffnen.",
    accessLabel: "Projektname",
    accessPlaceholder: "z. B. crea",
    accessButton: "Öffnen",
    accessNotFound: "Kein Projekt mit diesem Namen gefunden. Bitte Schreibweise prüfen.",
    save: "Speichern",
    saveTitle: "Diese Seite immer griffbereit",
    installApp: "Als App installieren",
    saveDesktop: "Drücken Sie ⌘ + D (Mac) oder Strg + D (Windows), um diese Seite als Lesezeichen zu speichern.",
    saveIos: "Auf iPhone oder iPad: Teilen antippen, dann „Zum Home-Bildschirm“.",
    saveAndroid: "Auf Android: Browsermenü ⋮ öffnen und „Zum Startbildschirm hinzufügen“ antippen.",
    close: "Schließen",
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
    homeTitle: "Vos projets, au même endroit.",
    homeIntro: "Sites, systèmes et catalogues réalisés par Higss Hub. Saisissez le nom de votre projet pour ouvrir votre page.",
    accessLabel: "Nom du projet",
    accessPlaceholder: "ex. : crea",
    accessButton: "Ouvrir",
    accessNotFound: "Aucun projet trouvé avec ce nom. Vérifiez l’orthographe.",
    save: "Enregistrer",
    saveTitle: "Gardez cette page à portée de main",
    installApp: "Installer comme app",
    saveDesktop: "Appuyez sur ⌘ + D (Mac) ou Ctrl + D (Windows) pour ajouter cette page aux favoris.",
    saveIos: "Sur iPhone ou iPad : touchez Partager, puis « Sur l’écran d’accueil ».",
    saveAndroid: "Sur Android : ouvrez le menu ⋮ du navigateur et touchez « Ajouter à l’écran d’accueil ».",
    close: "Fermer",
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
    homeTitle: "Tus proyectos, en un solo lugar.",
    homeIntro: "Sitios, sistemas y catálogos hechos por Higss Hub. Escribe el nombre de tu proyecto para abrir tu página.",
    accessLabel: "Nombre del proyecto",
    accessPlaceholder: "ej.: crea",
    accessButton: "Abrir",
    accessNotFound: "No encontramos un proyecto con ese nombre. Revisa cómo está escrito.",
    save: "Guardar",
    saveTitle: "Ten esta página siempre a mano",
    installApp: "Instalar como app",
    saveDesktop: "Pulsa ⌘ + D (Mac) o Ctrl + D (Windows) para guardar esta página en favoritos.",
    saveIos: "En iPhone o iPad: toca Compartir y luego “Añadir a pantalla de inicio”.",
    saveAndroid: "En Android: abre el menú ⋮ del navegador y toca “Añadir a pantalla de inicio”.",
    close: "Cerrar",
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
    homeTitle: "I tuoi progetti, in un unico posto.",
    homeIntro: "Siti, sistemi e cataloghi realizzati da Higss Hub. Inserisci il nome del tuo progetto per aprire la tua pagina.",
    accessLabel: "Nome del progetto",
    accessPlaceholder: "es. crea",
    accessButton: "Apri",
    accessNotFound: "Nessun progetto trovato con questo nome. Controlla come è scritto.",
    save: "Salva",
    saveTitle: "Tieni questa pagina sempre a portata di mano",
    installApp: "Installa come app",
    saveDesktop: "Premi ⌘ + D (Mac) o Ctrl + D (Windows) per aggiungere questa pagina ai preferiti.",
    saveIos: "Su iPhone o iPad: tocca Condividi, poi “Aggiungi alla schermata Home”.",
    saveAndroid: "Su Android: apri il menu ⋮ del browser e tocca “Aggiungi a schermata Home”.",
    close: "Chiudi",
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
