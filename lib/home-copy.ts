import type { Locale } from '@/lib/i18n';

/** One stage of the "from sketch to system" story; `stat` is the figure the counter runs up to. */
export type Step = {
  eyebrow: string;
  title: string;
  text: string;
  stat: number;
  statSuffix: string;
  statText: string;
  source: string;
};

export type HomeCopy = {
  heroEyebrow: string;
  heroTitle: [string, string];
  heroText: string;
  clientHint: string;
  scroll: string;
  steps: [Step, Step, Step];
  /** Labels on the KPI cards inside the drawing. */
  kpis: [string, string, string];
  numbersTitle: string;
  numbers: { clients: string; projects: string; countries: string; languages: string };
  finalTitle: string;
  finalText: string;
  startTitle: string;
  startText: string;
  email: string;
  whatsapp: string;
  sourcesTitle: string;
  sourcesNote: string;
};

// Figures and sources: Zapier 2021 (US SMB knowledge workers), Google "The Need for Mobile Speed" 2016,
// Deloitte for Google "Connected Small Businesses in the US" (Jan 2018). Correlational — copy says "grew", never "will grow".
const SOURCES = {
  zapier: 'Zapier, 2021 · EUA/USA',
  google: 'Google, The Need for Mobile Speed, 2016',
  deloitte: 'Deloitte × Google, Connected Small Businesses in the US, 2018',
};

const copy: Record<Locale, HomeCopy> = {
  pt: {
    heroEyebrow: 'Estratégia, design e código',
    heroTitle: ['Do traço', 'ao sistema.'],
    heroText: 'A Higss Hub transforma a rotina de pequenas empresas em sites, sistemas e catálogos que trabalham por elas.',
    clientHint: 'Já é cliente? Digite o nome do seu projeto.',
    scroll: 'Role para ver como',
    steps: [
      {
        eyebrow: '01 — Esboço',
        title: 'Toda empresa começa no papel.',
        text: 'Planilhas, WhatsApp, cadernos. Funciona — até o dia em que a equipe passa mais tempo copiando dados do que atendendo clientes.',
        stat: 76,
        statSuffix: '%',
        statText: 'dos profissionais de pequenas e médias empresas gastam de 1 a 3 horas por dia só passando dados de um lugar para outro.',
        source: SOURCES.zapier,
      },
      {
        eyebrow: '02 — Estrutura',
        title: 'Antes do código, a estrutura.',
        text: 'Mapeamos processos, desenhamos as telas e definimos o que vale medir. Base sólida deixa o sistema rápido e simples de usar.',
        stat: 53,
        statSuffix: '%',
        statText: 'das visitas no celular são abandonadas quando a página leva mais de 3 segundos para abrir.',
        source: SOURCES.google,
      },
      {
        eyebrow: '03 — Sistema',
        title: 'Então o traço vira sistema.',
        text: 'Dados num só lugar, decisões com números na mão e um site que vende enquanto você trabalha.',
        stat: 45,
        statSuffix: '%',
        statText: 'foi o crescimento de receita das pequenas empresas digitalmente avançadas — contra 12% das de nível básico.',
        source: SOURCES.deloitte,
      },
    ],
    kpis: ['Pedidos', 'Receita', 'Carga'],
    numbersTitle: 'Feito na prática',
    numbers: { clients: 'clientes atendidos', projects: 'projetos entregues', countries: 'países', languages: 'idiomas' },
    finalTitle: 'Já é cliente?',
    finalText: 'Digite o nome do seu projeto e abra a sua página.',
    startTitle: 'Quer tirar uma ideia do papel?',
    startText: 'Conte o que hoje toma tempo demais na sua empresa.',
    email: 'E-mail',
    whatsapp: 'WhatsApp',
    sourcesTitle: 'Fontes',
    sourcesNote: 'Os estudos mostram relação, não garantia: empresas digitalmente avançadas cresceram mais.',
  },
  en: {
    heroEyebrow: 'Strategy, design and code',
    heroTitle: ['From sketch', 'to system.'],
    heroText: 'Higss Hub turns the daily routine of small businesses into websites, systems and catalogs that work for them.',
    clientHint: 'Already a client? Type your project name.',
    scroll: 'Scroll to see how',
    steps: [
      {
        eyebrow: '01 — Sketch',
        title: 'Every business starts on paper.',
        text: 'Spreadsheets, WhatsApp, notebooks. It works — until the team spends more time copying data than serving customers.',
        stat: 76,
        statSuffix: '%',
        statText: 'of small and mid-sized business workers spend 1 to 3 hours a day just moving data from one place to another.',
        source: SOURCES.zapier,
      },
      {
        eyebrow: '02 — Structure',
        title: 'Before code, structure.',
        text: 'We map processes, design the screens and decide what is worth measuring. A solid base keeps the system fast and simple to use.',
        stat: 53,
        statSuffix: '%',
        statText: 'of mobile visits are abandoned when a page takes longer than 3 seconds to load.',
        source: SOURCES.google,
      },
      {
        eyebrow: '03 — System',
        title: 'Then the sketch becomes a system.',
        text: 'Data in one place, decisions backed by numbers and a website that sells while you work.',
        stat: 45,
        statSuffix: '%',
        statText: 'revenue growth at digitally advanced small businesses — versus 12% at basic ones.',
        source: SOURCES.deloitte,
      },
    ],
    kpis: ['Orders', 'Revenue', 'Load'],
    numbersTitle: 'Done in practice',
    numbers: { clients: 'clients served', projects: 'projects delivered', countries: 'countries', languages: 'languages' },
    finalTitle: 'Already a client?',
    finalText: 'Type your project name to open your page.',
    startTitle: 'Want to take an idea off paper?',
    startText: 'Tell me what takes too much time in your business today.',
    email: 'Email',
    whatsapp: 'WhatsApp',
    sourcesTitle: 'Sources',
    sourcesNote: 'These studies show correlation, not a guarantee: digitally advanced businesses grew more.',
  },
  de: {
    heroEyebrow: 'Strategie, Design und Code',
    heroTitle: ['Von der Skizze', 'zum System.'],
    heroText: 'Higss Hub macht aus dem Alltag kleiner Unternehmen Websites, Systeme und Kataloge, die für sie arbeiten.',
    clientHint: 'Bereits Kunde? Geben Sie Ihren Projektnamen ein.',
    scroll: 'Scrollen Sie, um zu sehen wie',
    steps: [
      {
        eyebrow: '01 — Skizze',
        title: 'Jedes Unternehmen beginnt auf Papier.',
        text: 'Tabellen, WhatsApp, Notizbücher. Es funktioniert — bis das Team mehr Zeit mit Daten­kopieren verbringt als mit Kunden.',
        stat: 76,
        statSuffix: '%',
        statText: 'der Mitarbeitenden in KMU verbringen 1 bis 3 Stunden täglich nur damit, Daten von einem Ort zum anderen zu übertragen.',
        source: SOURCES.zapier,
      },
      {
        eyebrow: '02 — Struktur',
        title: 'Vor dem Code die Struktur.',
        text: 'Wir erfassen Abläufe, gestalten die Oberflächen und legen fest, was sich zu messen lohnt. Eine solide Basis hält das System schnell und einfach.',
        stat: 53,
        statSuffix: '%',
        statText: 'der mobilen Besuche werden abgebrochen, wenn eine Seite länger als 3 Sekunden lädt.',
        source: SOURCES.google,
      },
      {
        eyebrow: '03 — System',
        title: 'Dann wird die Skizze zum System.',
        text: 'Daten an einem Ort, Entscheidungen mit Zahlen und eine Website, die verkauft, während Sie arbeiten.',
        stat: 45,
        statSuffix: '%',
        statText: 'Umsatzwachstum bei digital fortgeschrittenen Kleinunternehmen — gegenüber 12 % bei einfachen.',
        source: SOURCES.deloitte,
      },
    ],
    kpis: ['Aufträge', 'Umsatz', 'Ladezeit'],
    numbersTitle: 'In der Praxis umgesetzt',
    numbers: { clients: 'betreute Kunden', projects: 'gelieferte Projekte', countries: 'Länder', languages: 'Sprachen' },
    finalTitle: 'Bereits Kunde?',
    finalText: 'Geben Sie Ihren Projektnamen ein und öffnen Sie Ihre Seite.',
    startTitle: 'Eine Idee umsetzen?',
    startText: 'Erzählen Sie, was in Ihrem Unternehmen heute zu viel Zeit kostet.',
    email: 'E-Mail',
    whatsapp: 'WhatsApp',
    sourcesTitle: 'Quellen',
    sourcesNote: 'Die Studien zeigen einen Zusammenhang, keine Garantie: digital fortgeschrittene Unternehmen wuchsen stärker.',
  },
  fr: {
    heroEyebrow: 'Stratégie, design et code',
    heroTitle: ['Du croquis', 'au système.'],
    heroText: 'Higss Hub transforme le quotidien des petites entreprises en sites, systèmes et catalogues qui travaillent pour elles.',
    clientHint: 'Déjà client ? Saisissez le nom de votre projet.',
    scroll: 'Faites défiler pour voir comment',
    steps: [
      {
        eyebrow: '01 — Croquis',
        title: 'Toute entreprise commence sur papier.',
        text: 'Tableurs, WhatsApp, carnets. Ça marche — jusqu’au jour où l’équipe passe plus de temps à copier des données qu’à servir ses clients.',
        stat: 76,
        statSuffix: ' %',
        statText: 'des employés de PME passent 1 à 3 heures par jour à déplacer des données d’un endroit à un autre.',
        source: SOURCES.zapier,
      },
      {
        eyebrow: '02 — Structure',
        title: 'Avant le code, la structure.',
        text: 'Nous cartographions les processus, dessinons les écrans et définissons ce qui mérite d’être mesuré. Une base solide garde le système rapide et simple.',
        stat: 53,
        statSuffix: ' %',
        statText: 'des visites mobiles sont abandonnées quand une page met plus de 3 secondes à s’afficher.',
        source: SOURCES.google,
      },
      {
        eyebrow: '03 — Système',
        title: 'Puis le croquis devient système.',
        text: 'Des données au même endroit, des décisions appuyées sur des chiffres et un site qui vend pendant que vous travaillez.',
        stat: 45,
        statSuffix: ' %',
        statText: 'de croissance du chiffre d’affaires dans les petites entreprises numériquement avancées — contre 12 % pour les basiques.',
        source: SOURCES.deloitte,
      },
    ],
    kpis: ['Commandes', 'Revenu', 'Chargement'],
    numbersTitle: 'Fait sur le terrain',
    numbers: { clients: 'clients accompagnés', projects: 'projets livrés', countries: 'pays', languages: 'langues' },
    finalTitle: 'Déjà client ?',
    finalText: 'Saisissez le nom de votre projet pour ouvrir votre page.',
    startTitle: 'Envie de concrétiser une idée ?',
    startText: 'Dites-moi ce qui prend trop de temps dans votre entreprise.',
    email: 'E-mail',
    whatsapp: 'WhatsApp',
    sourcesTitle: 'Sources',
    sourcesNote: 'Ces études montrent une corrélation, pas une garantie : les entreprises avancées ont davantage progressé.',
  },
  es: {
    heroEyebrow: 'Estrategia, diseño y código',
    heroTitle: ['Del trazo', 'al sistema.'],
    heroText: 'Higss Hub convierte la rutina de las pequeñas empresas en sitios, sistemas y catálogos que trabajan por ellas.',
    clientHint: '¿Ya eres cliente? Escribe el nombre de tu proyecto.',
    scroll: 'Desliza para ver cómo',
    steps: [
      {
        eyebrow: '01 — Boceto',
        title: 'Toda empresa empieza en papel.',
        text: 'Hojas de cálculo, WhatsApp, cuadernos. Funciona — hasta que el equipo pasa más tiempo copiando datos que atendiendo clientes.',
        stat: 76,
        statSuffix: '%',
        statText: 'de los profesionales de pymes dedican de 1 a 3 horas al día solo a pasar datos de un lugar a otro.',
        source: SOURCES.zapier,
      },
      {
        eyebrow: '02 — Estructura',
        title: 'Antes del código, la estructura.',
        text: 'Mapeamos procesos, diseñamos las pantallas y definimos qué vale la pena medir. Una base sólida mantiene el sistema rápido y simple.',
        stat: 53,
        statSuffix: '%',
        statText: 'de las visitas en el móvil se abandonan cuando la página tarda más de 3 segundos en cargar.',
        source: SOURCES.google,
      },
      {
        eyebrow: '03 — Sistema',
        title: 'Entonces el trazo se vuelve sistema.',
        text: 'Datos en un solo lugar, decisiones con números y un sitio que vende mientras trabajas.',
        stat: 45,
        statSuffix: '%',
        statText: 'creció la facturación de las pequeñas empresas digitalmente avanzadas — frente al 12% de las básicas.',
        source: SOURCES.deloitte,
      },
    ],
    kpis: ['Pedidos', 'Ingresos', 'Carga'],
    numbersTitle: 'Hecho en la práctica',
    numbers: { clients: 'clientes atendidos', projects: 'proyectos entregados', countries: 'países', languages: 'idiomas' },
    finalTitle: '¿Ya eres cliente?',
    finalText: 'Escribe el nombre de tu proyecto y abre tu página.',
    startTitle: '¿Quieres sacar una idea del papel?',
    startText: 'Cuéntame qué le quita demasiado tiempo a tu empresa.',
    email: 'Correo',
    whatsapp: 'WhatsApp',
    sourcesTitle: 'Fuentes',
    sourcesNote: 'Los estudios muestran relación, no garantía: las empresas digitalmente avanzadas crecieron más.',
  },
  it: {
    heroEyebrow: 'Strategia, design e codice',
    heroTitle: ['Dal tratto', 'al sistema.'],
    heroText: 'Higss Hub trasforma la routine delle piccole imprese in siti, sistemi e cataloghi che lavorano per loro.',
    clientHint: 'Sei già cliente? Scrivi il nome del tuo progetto.',
    scroll: 'Scorri per vedere come',
    steps: [
      {
        eyebrow: '01 — Schizzo',
        title: 'Ogni impresa nasce su carta.',
        text: 'Fogli di calcolo, WhatsApp, quaderni. Funziona — finché il team passa più tempo a copiare dati che a servire i clienti.',
        stat: 76,
        statSuffix: '%',
        statText: 'dei lavoratori delle PMI passa da 1 a 3 ore al giorno solo a spostare dati da un posto all’altro.',
        source: SOURCES.zapier,
      },
      {
        eyebrow: '02 — Struttura',
        title: 'Prima del codice, la struttura.',
        text: 'Mappiamo i processi, disegniamo le schermate e decidiamo cosa vale la pena misurare. Una base solida rende il sistema veloce e semplice.',
        stat: 53,
        statSuffix: '%',
        statText: 'delle visite da mobile viene abbandonato se la pagina impiega più di 3 secondi a caricarsi.',
        source: SOURCES.google,
      },
      {
        eyebrow: '03 — Sistema',
        title: 'Poi il tratto diventa sistema.',
        text: 'Dati in un unico posto, decisioni basate sui numeri e un sito che vende mentre lavori.',
        stat: 45,
        statSuffix: '%',
        statText: 'di crescita del fatturato nelle piccole imprese digitalmente avanzate — contro il 12% di quelle di base.',
        source: SOURCES.deloitte,
      },
    ],
    kpis: ['Ordini', 'Ricavi', 'Caricamento'],
    numbersTitle: 'Fatto sul campo',
    numbers: { clients: 'clienti seguiti', projects: 'progetti consegnati', countries: 'paesi', languages: 'lingue' },
    finalTitle: 'Sei già cliente?',
    finalText: 'Scrivi il nome del tuo progetto e apri la tua pagina.',
    startTitle: 'Vuoi realizzare un’idea?',
    startText: 'Raccontami cosa oggi porta via troppo tempo alla tua azienda.',
    email: 'E-mail',
    whatsapp: 'WhatsApp',
    sourcesTitle: 'Fonti',
    sourcesNote: 'Gli studi mostrano una correlazione, non una garanzia: le imprese digitalmente avanzate sono cresciute di più.',
  },
};

export const SOURCE_LINKS = [
  { label: 'Zapier — How office workers spend their time (2021)', url: 'https://zapier.com/blog/report-how-office-workers-spend-time' },
  {
    label: 'Google — The Need for Mobile Speed (2016)',
    url: 'https://www.marketingdive.com/news/google-53-of-mobile-users-abandon-sites-that-take-over-3-seconds-to-load/426070/',
  },
  {
    label: 'Deloitte × Google — Connected Small Businesses in the US',
    url: 'https://www2.deloitte.com/content/dam/Deloitte/us/Documents/technology-media-telecommunications/us-tmt-connected-small-businesses-Jan2018.pdf',
  },
];

export function getHomeCopy(locale: Locale) {
  return copy[locale];
}
