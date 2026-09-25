/**
 * Single source of truth for all identity, NAP (name/address/phone) and brand data.
 *
 * NEVER hardcode the address, phone, email, legal name or canonical URL anywhere else.
 * Search engines and LLM crawlers cross-reference these across the Organization schema,
 * the footer, the contact page and /llms.txt — any drift between them weakens entity
 * resolution and local-SEO trust. Everything derives from here.
 */
export const siteConfig = {
  /** Brand / trading name — what users and search engines should call us. */
  name: 'Camzify',
  /** Registered legal entity. Used for schema.org legalName and the copyright line. */
  legalName: 'Camzify Global Pte Ltd',
  /**
   * Short form of the legal entity, emitted as an Organization alternateName.
   *
   * Deutics Global LLP used to be credited here and in the footer as the engineering
   * arm. It was removed rather than corrected: it is a separate Pakistan-registered
   * consulting and development company, and naming two organizations behind one
   * product is the same entity-resolution problem as publishing two addresses — a
   * search engine cannot tell which one the reviews, links and citations belong to.
   * The relationship is real and is stated where it is unambiguous: on the author
   * page, as a fact about a person rather than about this business.
   */
  company: 'Camzify Global',

  tagline: 'Smart Surveillance, Safer Spaces',
  description:
    'AI-powered cloud video management system: live streaming, cloud backup, 22 real-time detections and scheduled virtual patrol rounds on the cameras you already own.',

  /** Canonical origin. No trailing slash. */
  url: 'https://camzify.com',
  /** Authenticated product app (external). */
  appUrl: 'https://app.camzify.live/',

  locale: 'en_US',
  language: 'en',

  /**
   * Structured postal address. `formatted` is the only string that should ever be
   * rendered in UI — keep it derived so the parts and the display can never diverge.
   */
  address: {
    street: '89 Kaki Bukit Avenue 1, #02-00, Shun Li Industrial Park',
    locality: 'Singapore',
    region: 'Singapore',
    postalCode: '417957',
    country: 'SG',
    countryName: 'Singapore',
  },

  phone: '+65 6901 8738',
  /**
   * The single public address for the business. Sales and support both land here.
   *
   * There used to be a separate `salesEmail`; it held the same value, and two fields
   * for one address is how they end up disagreeing after somebody changes one of them.
   * The author's own address lives under `author.email` and is a different thing —
   * that one reaches a person, this one reaches the business.
   */
  email: 'contact@camzify.com',

  /**
   * The five markets the business named on 2026-09-08, in its own priority order.
   * Used for the Organization and Service `areaServed` nodes; keep this list and the
   * ROI calculator's currency list in step.
   */
  areaServed: ['United States', 'Singapore', 'United Arab Emirates', 'Middle East', 'Europe', 'Pakistan'],

  /** Generated 1200x630 card (app/opengraph-image.tsx), not a static file. */
  ogImage: '/opengraph-image',
  /** Black wordmark. Used for schema.org, where consumers render on light grounds. */
  logo: '/camzify-logo-light.png',

  /**
   * The company's public profiles, supplied by the business on 2026-09-09. Rendered in
   * the footer, emitted as schema.org sameAs on the Organization node (which is how
   * search and answer engines tie the site, the LinkedIn page and the channel to one
   * entity) and listed in /llms.txt.
   */
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/camzify-global/', icon: 'linkedin' },
    { label: 'X', href: 'https://x.com/camzifyglobal', icon: 'x' },
    { label: 'YouTube', href: 'https://www.youtube.com/@camzifyglobal', icon: 'youtube' },
    { label: 'Facebook', href: 'https://www.facebook.com/camzifyglobal/', icon: 'facebook' },
    { label: 'Instagram', href: 'https://www.instagram.com/camzifyglobal/', icon: 'instagram' },
  ] as const,
  get sameAs(): string[] {
    return this.social.map((s) => s.href);
  },

  /**
   * The named author behind the guides.
   *
   * Guides were Organization-attributed until a real person could be credited, because
   * an invented byline on a site whose whole position is not publishing unverifiable
   * claims would be the worst possible thing to fake. Everything here is supplied by
   * the business and is publicly checkable against the LinkedIn profile.
   *
   * Consumed by lib/seo.ts (the Person node that articleSchema points its author at),
   * the author page, and the byline on every guide. Do not restate it anywhere else.
   */
  author: {
    name: 'Muhammad Talha',
    /** Slug for the author page under /about. */
    slug: 'muhammad-talha',
    role: 'Product Manager and CTO',
    /** One line, used as the schema jobTitle description and under the byline. */
    credential: 'Nine years building computer vision and automated surveillance systems',
    email: 'talha@camzify.com',
    linkedin: 'https://www.linkedin.com/in/its-talha/',
    /**
     * A second company he leads. It sits on the Person rather than on the
     * Organization deliberately: Deutics Global LLP is a separate Pakistan-registered
     * consulting and development firm, and crediting it alongside Camzify at the
     * organization level made it ambiguous which entity actually operates the
     * product. As a fact about a person it is unambiguous, and it is the kind of
     * track record that makes a byline worth having.
     */
    alsoLeads: {
      name: 'Deutics Global LLP',
      role: 'CEO',
      url: 'https://deutics.com',
      note: 'a Pakistan-based consulting and software development firm',
    },
  },
} as const;

/** Full one-line postal address, e.g. for the footer and contact page. */
export const formattedAddress = [
  siteConfig.address.street,
  siteConfig.address.locality,
  siteConfig.address.postalCode,
].join(', ');

/** Absolute URL for any site-relative path. Schema.org and canonicals require absolute URLs. */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}


/*
 * Primary navigation: five top-level entries. Product, Solutions, Industries and
 * Resources open a mega-menu; Pricing is a plain link. German pages use `navItemsDe`
 * below instead, which links only pages that exist in German.
 *
 * A menu is a row of columns. A column's `href` makes its heading a real link (the hub
 * page, e.g. /virtual-patrolling), which keeps those hubs linked from every page with
 * their own name as anchor text. `span: 2` gives a long column two sub-columns. Each
 * menu can carry one `feature` card, rendered in the panel's footer row.
 *
 * COVERAGE RULE. The header is the site's main internal-link path from the homepage to
 * the deep pages: 36 referring domains, all to the homepage, per
 * docs/seo/AUDIT-2026-09-18.md. Every page linked here before the mega-menu redesign is
 * still linked here. Removing an entry means that page loses a link from every page on
 * the site, so do it deliberately, never to tidy a column.
 */
export type NavLink = { label: string; href: string; description?: string };
export type NavSection = { label?: string; items: NavLink[] };
export type NavColumn = { label: string; href?: string; span?: 1 | 2; sections: NavSection[]; more?: NavLink };
export type NavFeature = { label: string; href: string; description: string; icon: 'demo' | 'calculator' | 'roadmap' };
export type NavMenu = { label: string; href: string; columns: NavColumn[]; feature?: NavFeature; mobileFlat?: boolean };
export type NavEntry = NavMenu | NavLink;

export const isNavMenu = (entry: NavEntry): entry is NavMenu => 'columns' in entry;

export const navItems: NavEntry[] = [
  {
    label: 'Product',
    href: '/platform',
    columns: [
      {
        label: 'Virtual Patrolling',
        href: '/virtual-patrolling',
        sections: [
          { label: 'How it works', items: [
            { label: 'How It Works', href: '/virtual-patrolling/how-it-works' },
            { label: 'Patrol Sequences', href: '/virtual-patrolling/patrol-sequences' },
            { label: 'Patrol Checklists', href: '/virtual-patrolling/patrol-checklists' },
            { label: 'Automated Scheduling', href: '/virtual-patrolling/automated-patrol-scheduling' },
          ] },
          { label: 'What a round produces', items: [
            { label: 'Patrol Reports', href: '/virtual-patrolling/patrol-reports' },
            { label: 'Guard Notifications', href: '/virtual-patrolling/guard-notifications' },
            { label: 'Risk Detection', href: '/virtual-patrolling/risk-detection' },
            { label: 'Compliance Tracking', href: '/virtual-patrolling/patrol-compliance-tracking' },
          ] },
          { label: 'In context', items: [
            { label: 'vs Security Guards', href: '/virtual-patrolling/vs-security-guards' },
            { label: 'Virtual Guard', href: '/virtual-guard' },
            { label: 'Multi-Site Operations', href: '/virtual-patrolling/for-multi-site-operations' },
          ] },
        ],
      },
      {
        label: 'Platform',
        href: '/platform',
        sections: [
          { label: 'Video', items: [
            { label: 'Cloud Video Surveillance', href: '/cloud-video-surveillance' },
            { label: 'Live Streaming', href: '/platform/live-streaming' },
            { label: 'Video Backup', href: '/platform/video-backup-and-retention' },
          ] },
          { label: 'Operations', items: [
            { label: 'Dashboard', href: '/platform/dashboard' },
            { label: 'Notifications', href: '/platform/notifications-and-alerts' },
            { label: 'Analytics', href: '/platform/analytics-and-reporting' },
          ] },
          { label: 'Scale and control', items: [
            { label: 'User Management', href: '/platform/user-management' },
            { label: 'Multi-Site', href: '/platform/multi-site-management' },
            { label: 'AI Architecture', href: '/platform/ai-architecture' },
          ] },
        ],
      },
      {
        label: 'AI Features',
        href: '/ai-features',
        span: 2,
        sections: [
          { label: 'Perimeter & Access', items: [
            { label: 'Line Intrusion Detection', href: '/ai-features/line-intrusion-detection' },
            { label: 'Zone Intrusion Detection', href: '/ai-features/zone-intrusion-detection' },
            { label: 'Loitering Detection', href: '/ai-features/loitering-detection' },
            { label: 'Motion Detection', href: '/ai-features/motion-detection' },
            { label: 'Tailgating Detection', href: '/ai-features/tailgating-detection' },
          ] },
          { label: 'Threat & Incident', items: [
            { label: 'Behavioral Anomaly Detection', href: '/ai-features/behavioral-anomaly-detection' },
            { label: 'Weapons Detection', href: '/ai-features/weapons-detection' },
            { label: 'Aggression & Fight Detection', href: '/ai-features/aggression-and-fight-detection' },
            { label: 'Slip & Fall Detection', href: '/ai-features/slip-and-fall-detection' },
            { label: 'Fire & Smoke Detection', href: '/ai-features/fire-and-smoke-detection' },
          ] },
          { label: 'Analytics & Insights', items: [
            { label: 'Heatmap Anomalies', href: '/ai-features/heatmap-anomalies' },
            { label: 'Occupancy & Peak Hour Trends', href: '/ai-features/occupancy-and-peak-hour-trends' },
          ] },
          { label: 'Site Compliance', items: [
            { label: 'PPE Violation Detection', href: '/ai-features/ppe-violation-detection' },
            { label: 'Abandoned Object Detection', href: '/ai-features/abandoned-object-detection' },
            { label: 'Littering Detection', href: '/ai-features/littering-detection' },
            { label: 'Camera Tampering Detection', href: '/ai-features/camera-tampering-detection' },
          ] },
          { label: 'Vehicle & Parking', items: [
            { label: 'Illegal Parking Detection', href: '/ai-features/illegal-parking-detection' },
            { label: 'Wrong-Way Vehicle Detection', href: '/ai-features/wrong-way-vehicle-detection' },
            { label: 'Vehicle Damage Report', href: '/ai-features/vehicle-damage-report' },
          ] },
          { label: 'Investigation & Tracking', items: [
            { label: 'AI Suspect Search', href: '/ai-features/forensic-video-search' },
            { label: 'Cross-Camera Journey Map', href: '/ai-features/cross-camera-journey-map' },
            { label: 'Multi-Object Tracking', href: '/ai-features/multi-object-tracking' },
            { label: 'AI Attribute Extraction', href: '/ai-features/ai-attribute-extraction' },
          ] },
        ],
      },
    ],
    feature: { label: 'Interactive demo', href: '/#patrol-demo', description: 'Run a patrol round in your browser, no login', icon: 'demo' },
  },
  {
    label: 'Solutions',
    href: '/partners',
    columns: [
      {
        label: 'By Role',
        href: '/partners',
        sections: [
          { items: [
            { label: 'Security Agencies', href: '/partners/for-security-agencies', description: 'Sell overnight coverage you cannot staff' },
            { label: 'Monitoring Companies', href: '/partners/for-monitoring-centers', description: 'Run rounds for the agencies you monitor for' },
            { label: 'CCTV & Alarm Installers', href: '/partners/for-security-integrators', description: 'A monthly service on cameras you install' },
            { label: 'Managed Service Providers', href: '/partners/for-managed-service-providers', description: 'One account, a login per customer' },
          ] },
          { label: 'Partners', items: [
            { label: 'Become a Reseller', href: '/partners/become-a-reseller' },
          ] },
        ],
      },
    ],
    feature: { label: 'ROI calculator', href: '/roi-calculator', description: 'Your guard cost, or your partner revenue', icon: 'calculator' },
  },
  {
    label: 'Industries',
    href: '/industries',
    columns: [
      {
        label: 'By Industry',
        href: '/industries',
        span: 2,
        sections: [
          { label: 'Industrial & Logistics', items: [
            { label: 'Warehouses', href: '/industries/warehouses' },
            { label: 'Manufacturing', href: '/industries/manufacturing' },
            { label: 'Construction Sites', href: '/industries/construction-sites' },
            { label: 'Energy', href: '/industries/energy' },
            { label: 'Automotive', href: '/industries/automotive' },
          ] },
          { label: 'Retail & Commercial', items: [
            { label: 'Retail', href: '/industries/retail' },
            { label: 'Restaurants', href: '/industries/restaurants' },
            { label: 'Financial Services', href: '/industries/financial-services' },
          ] },
          { label: 'Healthcare & Education', items: [
            { label: 'Healthcare', href: '/industries/healthcare' },
            { label: 'Education Facilities', href: '/industries/education-facilities' },
          ] },
          { label: 'Property & Community', items: [
            { label: 'Property Management', href: '/industries/property-management' },
            { label: 'Residential', href: '/industries/residential' },
            { label: 'Self-Storage', href: '/industries/self-storage' },
            { label: 'Waste Management', href: '/industries/waste-management' },
          ] },
          { label: 'Multi-Site Operations', items: [
            { label: 'Multiple Sites', href: '/industries/multiple-sites' },
            { label: 'Remote Sites', href: '/industries/remote-sites' },
          ] },
        ],
      },
      {
        label: 'By Use Case',
        href: '/use-cases',
        sections: [
          { label: 'Sites and perimeters', items: [
            { label: 'Perimeter Security', href: '/use-cases/perimeter-security' },
            { label: 'After-Hours Monitoring', href: '/use-cases/after-hours-monitoring' },
            { label: 'Remote Site Monitoring', href: '/use-cases/remote-site-monitoring' },
            { label: 'Lock-Up & Closing Checks', href: '/use-cases/lock-up-and-closing-checks' },
          ] },
          { label: 'Assets and operations', items: [
            { label: 'Guard Tour Verification', href: '/use-cases/guard-tour-verification' },
            { label: 'Theft Prevention', href: '/use-cases/theft-prevention' },
            { label: 'Loading Dock Monitoring', href: '/use-cases/loading-dock-monitoring' },
            { label: 'Remote Video Monitoring', href: '/use-cases/remote-video-monitoring' },
          ] },
          { label: 'Life safety', items: [
            { label: 'Fire & Smoke Monitoring', href: '/use-cases/fire-and-smoke-monitoring' },
            { label: 'Fall Detection in Care Settings', href: '/use-cases/fall-detection-for-hospitals-and-care-homes' },
            { label: 'Weapons Detection for Schools', href: '/use-cases/weapons-detection-for-schools-and-public-buildings' },
          ] },
        ],
        more: { label: 'All 35 use cases', href: '/use-cases' },
      },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  {
    label: 'Resources',
    href: '/guides',
    mobileFlat: true,
    columns: [
      { label: 'Learn', sections: [{ items: [
        { label: 'Buyer Guides', href: '/guides' },
        { label: 'Glossary', href: '/glossary' },
        { label: 'FAQs', href: '/faqs' },
        { label: 'Blog', href: '/blog' },
      ] }] },
      { label: 'Decide', sections: [{ items: [
        { label: 'Compare', href: '/compare' },
        { label: 'Alternatives', href: '/alternatives' },
        { label: 'ROI Calculator', href: '/roi-calculator' },
      ] }] },
      { label: 'Set Up', sections: [{ items: [
        { label: 'Supported Cameras', href: '/supported-cameras' },
        { label: 'Camera Connectivity', href: '/camera-connectivity' },
      ] }] },
    ],
    feature: { label: 'Roadmap', href: '/roadmap', description: 'What we are building next', icon: 'roadmap' },
  },
];

/*
 * Navigation on German pages. Only pages that exist in German are linked (see the
 * registry in lib/i18n.ts), so a German reader is never dropped onto an English page
 * from the header without knowing it; the language menu in the top bar is the way back
 * to the English site.
 */
export const navItemsDe: NavEntry[] = [
  {
    label: 'Produkt',
    href: '/de/plattform',
    columns: [
      {
        label: 'KI-Wächterrundgang',
        href: '/de/ki-waechterrundgang',
        sections: [
          { label: 'So läuft ein Rundgang', items: [
            { label: 'So funktioniert es', href: '/de/ki-waechterrundgang/so-funktioniert-es' },
            { label: 'Checklisten', href: '/de/ki-waechterrundgang/checklisten' },
            { label: 'Automatische Planung', href: '/de/ki-waechterrundgang/automatische-planung' },
          ] },
          { label: 'Was ein Rundgang liefert', items: [
            { label: 'Kontrollprotokolle', href: '/de/ki-waechterrundgang/kontrollprotokolle' },
            { label: 'Benachrichtigungen', href: '/de/ki-waechterrundgang/benachrichtigungen' },
            { label: 'Risikoerkennung', href: '/de/ki-waechterrundgang/risikoerkennung' },
            { label: 'Digitales Wachbuch', href: '/de/ki-waechterrundgang/digitales-wachbuch' },
          ] },
          { label: 'Im Vergleich', items: [
            { label: 'Vergleich mit Wachpersonal', href: '/de/ki-waechterrundgang/vergleich-wachpersonal' },
            { label: 'Virtueller Wächterrundgang', href: '/de/virtueller-waechterrundgang' },
          ] },
        ],
      },
      {
        label: 'Plattform',
        href: '/de/plattform',
        sections: [
          { label: 'Video', items: [
            { label: 'Cloud-Videomanagementsystem', href: '/de/cloud-videomanagementsystem' },
            { label: 'Live-Streaming', href: '/de/plattform/live-streaming' },
            { label: 'Videospeicherung', href: '/de/plattform/videospeicherung' },
          ] },
          { label: 'Betrieb', items: [
            { label: 'Alarme und Benachrichtigungen', href: '/de/plattform/alarme-und-benachrichtigungen' },
            { label: 'Benutzerverwaltung', href: '/de/plattform/benutzerverwaltung' },
            { label: 'Mehrere Standorte', href: '/de/plattform/mehrere-standorte' },
          ] },
        ],
      },
      {
        label: 'KI-Funktionen',
        href: '/de/ki-funktionen',
        sections: [
          { label: 'Erkennungen', items: [
            { label: 'Bereichsüberwachung', href: '/de/ki-funktionen/bereichsueberwachung' },
            { label: 'Linienüberschreitung', href: '/de/ki-funktionen/linienueberschreitung' },
            { label: 'Verweilerkennung', href: '/de/ki-funktionen/verweilerkennung' },
            { label: 'Feuer- und Raucherkennung', href: '/de/ki-funktionen/feuer-und-rauch-erkennung' },
            { label: 'PSA-Erkennung', href: '/de/ki-funktionen/psa-erkennung' },
            { label: 'Kamerasabotage', href: '/de/ki-funktionen/sabotageerkennung' },
          ] },
          { label: 'Grundlagen', items: [
            { label: 'KI-Videoanalyse', href: '/de/ki-videoanalyse' },
          ] },
        ],
        more: { label: 'Alle 23 Erkennungen', href: '/de/ki-funktionen' },
      },
    ],
  },
  {
    label: 'Lösungen',
    href: '/de/partner',
    columns: [
      {
        label: 'Nach Rolle',
        href: '/de/partner',
        sections: [
          { items: [
            { label: 'Sicherheitsdienste', href: '/de/fuer-sicherheitsdienste', description: 'Nachtabdeckung, die sich nicht besetzen lässt' },
            { label: 'Leitstellen', href: '/de/fuer-leitstellen', description: 'Rundgänge für die Sicherheitsdienste, die Sie betreuen' },
            { label: 'Errichter und Installateure', href: '/de/fuer-installateure', description: 'Ein Monatsdienst auf den Kameras, die Sie verbauen' },
            { label: 'Managed Service Provider', href: '/de/fuer-managed-service-provider', description: 'Ein Konto, ein Zugang pro Kunde' },
          ] },
          { label: 'Partner', items: [
            { label: 'Reseller werden', href: '/de/reseller-werden' },
          ] },
        ],
      },
      {
        label: 'Nach Branche',
        href: '/de/branchen',
        sections: [
          { items: [
            { label: 'Industrie und Produktion', href: '/de/branchen/industrie-und-produktion' },
            { label: 'Lager und Logistik', href: '/de/branchen/lager-und-logistik' },
            { label: 'Baustellen', href: '/de/branchen/baustellen' },
          ] },
        ],
        more: { label: 'Alle Branchen', href: '/de/branchen' },
      },
    ],
  },
  { label: 'Preise', href: '/de/preise' },
  {
    label: 'Ressourcen',
    href: '/de/unterstuetzte-kameras',
    mobileFlat: true,
    columns: [
      { label: 'Einrichten', sections: [{ items: [
        { label: 'Unterstützte Kameras', href: '/de/unterstuetzte-kameras' },
        { label: 'Camzify Connector', href: '/de/camzify-connector' },
      ] }] },
      { label: 'Vertrauen', sections: [{ items: [
        { label: 'Sicherheit und Datenschutz', href: '/de/sicherheit-und-datenschutz' },
        { label: 'KI-Videoanalyse erklärt', href: '/de/ki-videoanalyse' },
      ] }] },
    ],
  },
];

/*
 * The announcement in the header's top bar, per language. Set a locale to null to show
 * none. `id` is what a visitor's dismissal is remembered against, so give a new
 * announcement a new id or it will stay hidden for everyone who closed the last one.
 * `until` (optional, YYYY-MM-DD) hides it after that day; the check runs in the
 * browser after hydration, so no rebuild is needed when it lapses.
 *
 * Only put facts here the business has confirmed (CLAUDE.md rule 2): an offer needs its
 * real terms and end date before it goes in.
 */
export type Announcement = {
  id: string;
  tag: string;
  text: string;
  /** Shorter wording for phones, where the full line would be cut off. */
  shortText?: string;
  linkLabel: string;
  href: string;
  /** Set when the link goes to a page in another language. */
  hrefLang?: string;
  until?: string;
};

export const announcements: Record<'en' | 'de', Announcement | null> = {
  en: {
    id: 'german-launch-2026-09',
    tag: 'New',
    text: 'Camzify is now available in German',
    shortText: 'Now in German',
    linkLabel: 'Auf Deutsch',
    href: '/de',
    hrefLang: 'de-DE',
  },
  de: {
    id: 'german-launch-2026-09-de',
    tag: 'Neu',
    text: 'Camzify gibt es jetzt auf Deutsch',
    shortText: 'Jetzt auf Deutsch',
    linkLabel: 'Zur Übersicht',
    href: '/de',
  },
};
