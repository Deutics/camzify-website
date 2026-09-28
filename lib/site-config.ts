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
 * Primary navigation: six top-level entries. Product, Solutions, Industries, Use Cases
 * and Resources open a mega-menu; Pricing is a plain link. German pages use `navItemsDe`
 * below instead, which links only pages that exist in German.
 *
 * A menu is a row of columns. A column's `href` makes its heading a real link (the hub
 * page, e.g. /virtual-patrolling), which keeps those hubs linked from every page with
 * their own name as anchor text. `span: 2` or `3` gives a long column that many sub-columns. Each
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
/**
 * `hideHeading`: for a column that is the menu's only one, where a heading would just
 * repeat the menu's name. The hub link then belongs in `more`, at the foot of the panel.
 */
export type NavColumn = { label: string; href?: string; span?: 1 | 2 | 3; hideHeading?: boolean; sections: NavSection[]; more?: NavLink };
export type NavFeature = { label: string; href: string; description: string; icon: 'demo' | 'calculator' | 'roadmap' };
/**
 * `compact`: the menu is a catalog (Product, Use Cases): 35-plus links scanned by name,
 * so item descriptions are not shown there. Short menus, where a line helps someone
 * choose (Solutions, Industries, Resources), show them. Headings, rows and the footer
 * strip are the same either way; the descriptions stay in the data for the pages and
 * the mobile menu to use later.
 *
 * `all`: the menu's "see everything" link (e.g. "All 35 use cases"). It always renders
 * in the panel's footer strip, beside the feature card if there is one, so every menu
 * puts it in the same place. Column-level `more` is for a link that belongs to one
 * column only, such as the AI Features column inside Product.
 */
export type NavMenu = { label: string; href: string; columns: NavColumn[]; feature?: NavFeature; all?: NavLink; compact?: boolean; mobileFlat?: boolean };
export type NavEntry = NavMenu | NavLink;

export const isNavMenu = (entry: NavEntry): entry is NavMenu => 'columns' in entry;

export const navItems: NavEntry[] = [
  {
    label: 'Product',
    href: '/platform',
    compact: true,
    columns: [
      {
        label: 'Virtual Patrolling',
        href: '/virtual-patrolling',
        sections: [
          { label: 'How it works', items: [
            { label: 'How It Works', href: '/virtual-patrolling/how-it-works', description: 'From cameras to a scored round' },
            { label: 'Patrol Sequences', href: '/virtual-patrolling/patrol-sequences', description: 'The camera route a round follows' },
            { label: 'Patrol Checklists', href: '/virtual-patrolling/patrol-checklists', description: 'What each camera is checked for' },
            { label: 'Automated Scheduling', href: '/virtual-patrolling/automated-patrol-scheduling', description: 'Rounds by frequency, hours, days' },
          ] },
          { label: 'What a round produces', items: [
            { label: 'Patrol Reports', href: '/virtual-patrolling/patrol-reports', description: 'A PDF per round, frame per check' },
            { label: 'Guard Notifications', href: '/virtual-patrolling/guard-notifications', description: 'Failures go to the assigned guard' },
            { label: 'Risk Detection', href: '/virtual-patrolling/risk-detection', description: 'Risks flagged at every stop' },
            { label: 'Compliance Tracking', href: '/virtual-patrolling/patrol-compliance-tracking', description: 'Completion rates across sites' },
          ] },
          { label: 'In context', items: [
            { label: 'vs Security Guards', href: '/virtual-patrolling/vs-security-guards', description: 'Cost, coverage and audit trail' },
            { label: 'Virtual Guard', href: '/virtual-guard', description: 'Guarding through the cameras' },
            { label: 'Multi-Site Operations', href: '/virtual-patrolling/for-multi-site-operations', description: 'Rounds across every location' },
          ] },
        ],
      },
      {
        label: 'Platform',
        href: '/platform',
        sections: [
          { label: 'Video', items: [
            { label: 'Cloud Video Surveillance', href: '/cloud-video-surveillance', description: 'Cloud recording and live view' },
            { label: 'Live Streaming', href: '/platform/live-streaming', description: 'A camera wall grouped by site' },
            { label: 'Video Backup', href: '/platform/video-backup-and-retention', description: 'Retention per camera, off site' },
          ] },
          { label: 'Operations', items: [
            { label: 'Dashboard', href: '/platform/dashboard', description: 'Sites, uptime and alerts' },
            { label: 'Notifications', href: '/platform/notifications-and-alerts', description: 'Every alert in one queue' },
            { label: 'Analytics', href: '/platform/analytics-and-reporting', description: 'Detection trends and reports' },
          ] },
          { label: 'Scale and control', items: [
            { label: 'User Management', href: '/platform/user-management', description: 'Permission groups, site access' },
            { label: 'Multi-Site', href: '/platform/multi-site-management', description: 'Every location in one console' },
            { label: 'AI Architecture', href: '/platform/ai-architecture', description: 'Six processing layers explained' },
            { label: 'Deployment Options', href: '/platform/deployment-options', description: 'Cloud, on premises or hybrid' },
          ] },
        ],
      },
      {
        label: 'AI Features',
        href: '/ai-features',
        span: 2,
        sections: [
          { label: 'Perimeter & Access', items: [
            { label: 'Line Intrusion Detection', href: '/ai-features/line-intrusion-detection', description: 'A virtual tripwire with direction' },
            { label: 'Zone Intrusion Detection', href: '/ai-features/zone-intrusion-detection', description: 'Entry into restricted areas' },
            { label: 'Loitering Detection', href: '/ai-features/loitering-detection', description: 'Stays past a dwell time you set' },
            { label: 'Motion Detection', href: '/ai-features/motion-detection', description: 'Motion that filters out noise' },
            { label: 'Tailgating Detection', href: '/ai-features/tailgating-detection', description: 'One badge, one person' },
          ] },
          { label: 'Threat & Incident', items: [
            { label: 'Behavioral Anomaly Detection', href: '/ai-features/behavioral-anomaly-detection', description: 'Describe the behavior to watch' },
            { label: 'Weapons Detection', href: '/ai-features/weapons-detection', description: 'Visible weapons flagged on sight' },
            { label: 'Aggression & Fight Detection', href: '/ai-features/aggression-and-fight-detection', description: 'Fights flagged as they start' },
            { label: 'Slip & Fall Detection', href: '/ai-features/slip-and-fall-detection', description: 'Falls raised in real time' },
            { label: 'Fire & Smoke Detection', href: '/ai-features/fire-and-smoke-detection', description: 'Visual smoke and flame' },
          ] },
          { label: 'Analytics & Insights', items: [
            { label: 'Heatmap Anomalies', href: '/ai-features/heatmap-anomalies', description: 'Unusual foot-traffic patterns' },
            { label: 'Occupancy & Peak Hour Trends', href: '/ai-features/occupancy-and-peak-hour-trends', description: 'Busiest hours and zones' },
          ] },
          { label: 'Site Compliance', items: [
            { label: 'PPE Violation Detection', href: '/ai-features/ppe-violation-detection', description: 'Missing helmets, vests or gloves' },
            { label: 'Abandoned Object Detection', href: '/ai-features/abandoned-object-detection', description: 'Bags left behind, unclaimed' },
            { label: 'Littering Detection', href: '/ai-features/littering-detection', description: 'Items dropped outside bins' },
            { label: 'Camera Tampering Detection', href: '/ai-features/camera-tampering-detection', description: 'Defocus, coverage, frozen frames' },
          ] },
          { label: 'Vehicle & Parking', items: [
            { label: 'Illegal Parking Detection', href: '/ai-features/illegal-parking-detection', description: 'Fire lanes and reserved bays' },
            { label: 'Wrong-Way Vehicle Detection', href: '/ai-features/wrong-way-vehicle-detection', description: 'Vehicles against the traffic flow' },
            { label: 'Vehicle Damage Report', href: '/ai-features/vehicle-damage-report', description: 'Dents and scratches, logged' },
          ] },
          { label: 'Investigation & Tracking', items: [
            { label: 'AI Suspect Search', href: '/ai-features/forensic-video-search', description: 'Find a person by description' },
            { label: 'Cross-Camera Journey Map', href: '/ai-features/cross-camera-journey-map', description: 'One path across every camera' },
            { label: 'Multi-Object Tracking', href: '/ai-features/multi-object-tracking', description: 'Persistent identity per subject' },
            { label: 'AI Attribute Extraction', href: '/ai-features/ai-attribute-extraction', description: 'Clothing, objects and behavior' },
          ] },
          { label: 'Beyond the catalog', items: [
            { label: 'Custom Detections', href: '/ai-features/custom-detections', description: 'Built to order beyond the 23' },
            { label: 'License Plate Recognition', href: '/ai-features/license-plate-recognition', description: 'US and Singapore plates' },
          ] },
        ],
      },
    ],
    feature: { label: 'Interactive demo', href: '/#patrol-demo', description: 'Run a patrol round in your browser, no login', icon: 'demo' },
    all: { label: 'Platform overview', href: '/platform' },
  },
  {
    label: 'Solutions',
    href: '/partners',
    columns: [
      {
        label: 'By Role',
        href: '/partners',
        span: 2,
        hideHeading: true,
        sections: [
          { items: [
            { label: 'Security Agencies', href: '/partners/for-security-agencies', description: 'Sell overnight coverage you cannot staff' },
            { label: 'Monitoring Companies', href: '/partners/for-monitoring-centers', description: 'Run rounds for the agencies you monitor for' },
            { label: 'CCTV & Alarm Installers', href: '/partners/for-security-integrators', description: 'A monthly service on cameras you install' },
            { label: 'Managed Service Providers', href: '/partners/for-managed-service-providers', description: 'One account, a login per customer' },
          ] },
          { label: 'Partners', items: [
            { label: 'Become a Reseller', href: '/partners/become-a-reseller', description: 'Resell with no hardware to stock' },
          ] },
        ],
      },
    ],
    feature: { label: 'ROI calculator', href: '/roi-calculator', description: 'Your guard cost, or your partner revenue', icon: 'calculator' },
    all: { label: 'Partner program', href: '/partners' },
  },
  {
    label: 'Industries',
    href: '/industries',
    columns: [
      {
        label: 'By Industry',
        href: '/industries',
        span: 3,
        hideHeading: true,
        sections: [
          { label: 'Industrial & Logistics', items: [
            { label: 'Warehouses', href: '/industries/warehouses', description: 'Docks, fence lines and cages' },
            { label: 'Manufacturing', href: '/industries/manufacturing', description: 'Machinery, yards and stock' },
            { label: 'Construction Sites', href: '/industries/construction-sites', description: 'Fencing, equipment, trailers' },
            { label: 'Energy', href: '/industries/energy', description: 'Substations, solar and wind' },
            { label: 'Automotive', href: '/industries/automotive', description: 'Bays, yards and lots after close' },
          ] },
          { label: 'Retail & Commercial', items: [
            { label: 'Retail', href: '/industries/retail', description: 'Stockrooms and back doors' },
            { label: 'Restaurants', href: '/industries/restaurants', description: 'Back doors and closing checks' },
            { label: 'Financial Services', href: '/industries/financial-services', description: 'Vaults, ATMs and branches' },
          ] },
          { label: 'Healthcare & Education', items: [
            { label: 'Healthcare', href: '/industries/healthcare', description: 'Pharmacies, wings and exits' },
            { label: 'Education Facilities', href: '/industries/education-facilities', description: 'Entrances, labs and parking' },
          ] },
          { label: 'Property & Community', items: [
            { label: 'Property Management', href: '/industries/property-management', description: 'Common areas and garages' },
            { label: 'Residential', href: '/industries/residential', description: 'Gates, pools and amenities' },
            { label: 'Self-Storage', href: '/industries/self-storage', description: 'Gates, hallways and units' },
            { label: 'Waste Management', href: '/industries/waste-management', description: 'Dumping and unmanned gates' },
          ] },
          { label: 'Multi-Site Operations', items: [
            { label: 'Multiple Sites', href: '/industries/multiple-sites', description: 'The same rounds everywhere' },
            { label: 'Remote Sites', href: '/industries/remote-sites', description: 'Stations, towers, fence lines' },
          ] },
        ],
      },
    ],
    all: { label: 'All 16 industries', href: '/industries' },
  },
  {
    label: 'Use Cases',
    href: '/use-cases',
    compact: true,
    columns: [
      {
        label: 'By Goal',
        span: 2,
        sections: [
          { label: 'Keep people out', items: [
            { label: 'Perimeter Security', href: '/use-cases/perimeter-security', description: 'Fence lines and gates each round' },
            { label: 'Trespassing Detection', href: '/use-cases/trespassing-detection', description: 'People where nobody should be' },
            { label: 'Unauthorized Access', href: '/use-cases/unauthorized-access-detection', description: 'Restricted zones and tailgating' },
            { label: 'After-Hours Monitoring', href: '/use-cases/after-hours-monitoring', description: 'Rounds through the empty building' },
            { label: 'Night Security', href: '/use-cases/night-security', description: 'Overnight rounds, every night' },
          ] },
          { label: 'Protect what is inside', items: [
            { label: 'Theft Prevention', href: '/use-cases/theft-prevention', description: 'Stockrooms, cages and cash areas' },
            { label: 'Loading Dock Monitoring', href: '/use-cases/loading-dock-monitoring', description: 'Doors checked against deliveries' },
            { label: 'Vandalism Prevention', href: '/use-cases/vandalism-prevention', description: 'Presence near walls, off-hours' },
            { label: 'Parking Lot Surveillance', href: '/use-cases/parking-lot-surveillance', description: 'After hours, fire lanes, bays' },
            { label: 'Vehicle Monitoring', href: '/use-cases/vehicle-monitoring', description: 'Vehicles at gates, yards, bays' },
          ] },
          { label: 'Prove it and reconstruct it', items: [
            { label: 'Guard Tour Verification', href: '/use-cases/guard-tour-verification', description: 'Proof of condition, not a tap' },
            { label: 'Remote Site Monitoring', href: '/use-cases/remote-site-monitoring', description: 'Substations and rural sites' },
            { label: 'Remote Video Monitoring', href: '/use-cases/remote-video-monitoring', description: 'Watched from a monitoring room' },
            { label: 'Incident Investigation', href: '/use-cases/incident-investigation', description: 'Records that already exist' },
            { label: 'Lock-Up & Closing Checks', href: '/use-cases/lock-up-and-closing-checks', description: 'Doors and shutters at close' },
            { label: 'Alarm Verification', href: '/use-cases/alarm-verification', description: 'The view when an alarm comes in' },
            { label: 'Camera Health Monitoring', href: '/use-cases/camera-health-monitoring', description: 'Tampering and offline cameras' },
          ] },
          { label: 'Keep people safe', items: [
            { label: 'Fire & Smoke Monitoring', href: '/use-cases/fire-and-smoke-monitoring', description: 'Early visual warning, clear exits' },
            { label: 'Workplace Safety', href: '/use-cases/workplace-safety-monitoring', description: 'Falls, exits and exclusion zones' },
            { label: 'PPE Compliance', href: '/use-cases/ppe-compliance-monitoring', description: 'Gear checked per zone policy' },
            { label: 'Violence & Weapons Detection', href: '/use-cases/violence-and-weapons-detection', description: 'Weapons and fights, with a clip' },
            { label: 'Occupancy Monitoring', href: '/use-cases/occupancy-monitoring', description: 'Live counts per zone' },
          ] },
        ],
      },
      {
        label: 'By Setting',
        span: 2,
        sections: [
          { label: 'Hospitals, schools & venues', items: [
            { label: 'Fall Detection in Care Settings', href: '/use-cases/fall-detection-for-hospitals-and-care-homes', description: 'A person on the floor, in seconds' },
            { label: 'Weapons Detection for Schools', href: '/use-cases/weapons-detection-for-schools-and-public-buildings', description: 'Visible weapons at the entrance' },
            { label: 'Violence in the ER', href: '/use-cases/violence-detection-in-emergency-departments', description: 'Assaults on staff, in seconds' },
            { label: 'Fire & Smoke in High-Rises', href: '/use-cases/fire-and-smoke-detection-for-high-rise-buildings', description: 'An early layer beside the alarm' },
            { label: 'Fire Exits & Escape Routes', href: '/use-cases/fire-exit-and-escape-route-monitoring', description: 'Blocked exits caught each round' },
            { label: 'Occupancy Limits for Venues', href: '/use-cases/occupancy-limits-for-venues-and-public-spaces', description: 'Live count against occupant load' },
          ] },
          { label: 'Parking & vehicles', items: [
            { label: 'Car Theft in Parking Facilities', href: '/use-cases/car-theft-and-vandalism-in-parking-facilities', description: 'Garages, dealer lots, car parks' },
            { label: 'Fire Lanes & Emergency Access', href: '/use-cases/fire-lane-and-emergency-access-enforcement', description: 'Stopped past the grace period' },
          ] },
          { label: 'Evidence & multi-site', items: [
            { label: 'Backup Against DVR Theft', href: '/use-cases/cloud-video-backup-against-dvr-theft', description: 'Footage kept off site' },
            { label: 'One Live Wall for Every Brand', href: '/use-cases/one-live-wall-for-every-brand-and-location', description: 'Every brand and site, one wall' },
            { label: 'Tracking One Person', href: '/use-cases/tracking-one-person-across-cameras', description: 'Every appearance, one timeline' },
            { label: 'Compliance Evidence', href: '/use-cases/virtual-patrolling-for-compliance-evidence', description: 'Proof for regulators, insurers' },
            { label: 'Tailgating at Secure Entrances', href: '/use-cases/tailgating-detection-for-data-centers-and-secure-entrances', description: 'Two through on one badge' },
          ] },
        ],
      },
    ],
    all: { label: 'All 35 use cases', href: '/use-cases' },
  },
  { label: 'Pricing', href: '/pricing' },
  {
    label: 'Resources',
    href: '/guides',
    mobileFlat: true,
    columns: [
      { label: 'Learn', sections: [{ items: [
        { label: 'Buyer Guides', href: '/guides', description: 'Costs, how-tos and explainers' },
        { label: 'Glossary', href: '/glossary', description: 'Plain definitions of the terms' },
        { label: 'FAQs', href: '/faqs', description: 'Common questions, answered' },
        { label: 'Blog', href: '/blog', description: 'Articles from the Camzify team' },
      ] }] },
      { label: 'Decide', sections: [{ items: [
        { label: 'Compare', href: '/compare', description: 'Side-by-side comparisons' },
        { label: 'Alternatives', href: '/alternatives', description: 'Switching from ADT or Verkada' },
        { label: 'ROI Calculator', href: '/roi-calculator', description: 'Your numbers, two calculators' },
      ] }] },
      { label: 'Set Up', sections: [{ items: [
        { label: 'Supported Cameras', href: '/supported-cameras', description: 'ONVIF and RTSP camera brands' },
        { label: 'Camera Connectivity', href: '/camera-connectivity', description: 'RTSP, RTMP and HTTPS setup' },
      ] }] },
    ],
    feature: { label: 'Roadmap', href: '/roadmap', description: 'What we are building next', icon: 'roadmap' },
    all: { label: 'Full site map', href: '/sitemap-page' },
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
    compact: true,
    columns: [
      {
        label: 'KI-Wächterrundgang',
        href: '/de/ki-waechterrundgang',
        sections: [
          { label: 'So läuft ein Rundgang', items: [
            { label: 'So funktioniert es', href: '/de/ki-waechterrundgang/so-funktioniert-es', description: 'Von der Kamera zum Protokoll' },
            { label: 'Checklisten', href: '/de/ki-waechterrundgang/checklisten', description: 'Worauf jede Kamera geprüft wird' },
            { label: 'Automatische Planung', href: '/de/ki-waechterrundgang/automatische-planung', description: 'Rundgänge nach Zeitplan' },
          ] },
          { label: 'Was ein Rundgang liefert', items: [
            { label: 'Kontrollprotokolle', href: '/de/ki-waechterrundgang/kontrollprotokolle', description: 'Ein PDF pro Rundgang, mit Bild' },
            { label: 'Benachrichtigungen', href: '/de/ki-waechterrundgang/benachrichtigungen', description: 'Fehler an die zuständige Wache' },
            { label: 'Risikoerkennung', href: '/de/ki-waechterrundgang/risikoerkennung', description: 'Risiken an jedem Kontrollpunkt' },
            { label: 'Digitales Wachbuch', href: '/de/ki-waechterrundgang/digitales-wachbuch', description: 'Erfüllungsquote aller Standorte' },
          ] },
          { label: 'Im Vergleich', items: [
            { label: 'Vergleich mit Wachpersonal', href: '/de/ki-waechterrundgang/vergleich-wachpersonal', description: 'Kosten, Abdeckung, Nachweis' },
            { label: 'Virtueller Wächterrundgang', href: '/de/virtueller-waechterrundgang', description: 'Bewachung über die Kameras' },
          ] },
        ],
      },
      {
        label: 'Plattform',
        href: '/de/plattform',
        sections: [
          { label: 'Video', items: [
            { label: 'Cloud-Videomanagementsystem', href: '/de/cloud-videomanagementsystem', description: 'Aufzeichnung und Live-Bild' },
            { label: 'Live-Streaming', href: '/de/plattform/live-streaming', description: 'Kamerawand nach Standort' },
            { label: 'Videospeicherung', href: '/de/plattform/videospeicherung', description: 'Aufbewahrung pro Kamera' },
          ] },
          { label: 'Betrieb', items: [
            { label: 'Alarme und Benachrichtigungen', href: '/de/plattform/alarme-und-benachrichtigungen', description: 'Eine Warteschlange, quittierbar' },
            { label: 'Benutzerverwaltung', href: '/de/plattform/benutzerverwaltung', description: 'Berechtigungen, Standortzugriff' },
            { label: 'Mehrere Standorte', href: '/de/plattform/mehrere-standorte', description: 'Alle Standorte in einer Konsole' },
            { label: 'Bereitstellung', href: '/de/plattform/bereitstellung', description: 'Cloud, vor Ort oder hybrid' },
          ] },
        ],
      },
      {
        label: 'KI-Funktionen',
        href: '/de/ki-funktionen',
        sections: [
          { label: 'Erkennungen', items: [
            { label: 'Bereichsüberwachung', href: '/de/ki-funktionen/bereichsueberwachung', description: 'Betreten gesperrter Bereiche' },
            { label: 'Linienüberschreitung', href: '/de/ki-funktionen/linienueberschreitung', description: 'Virtueller Stolperdraht' },
            { label: 'Verweilerkennung', href: '/de/ki-funktionen/verweilerkennung', description: 'Verweilen über die Dauer hinaus' },
            { label: 'Feuer- und Raucherkennung', href: '/de/ki-funktionen/feuer-und-rauch-erkennung', description: 'Sichtbarer Rauch und Flammen' },
            { label: 'PSA-Erkennung', href: '/de/ki-funktionen/psa-erkennung', description: 'Fehlender Helm, Weste, Handschuh' },
            { label: 'Kamerasabotage', href: '/de/ki-funktionen/sabotageerkennung', description: 'Defokus, Abdeckung, Standbild' },
          ] },
          { label: 'Grundlagen', items: [
            { label: 'KI-Videoanalyse', href: '/de/ki-videoanalyse', description: 'Die Grundlagen erklärt' },
            { label: 'Individuelle Erkennungen', href: '/de/ki-funktionen/individuelle-erkennungen', description: 'Auf Bestellung entwickelt' },
          ] },
        ],
      },
    ],
    all: { label: 'Plattform-Übersicht', href: '/de/plattform' },
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
            { label: 'Reseller werden', href: '/de/reseller-werden', description: 'Ohne Hardware auf Lager' },
          ] },
        ],
      },
      {
        label: 'Nach Branche',
        href: '/de/branchen',
        sections: [
          { items: [
            { label: 'Industrie und Produktion', href: '/de/branchen/industrie-und-produktion', description: 'Werkschutz und Produktion' },
            { label: 'Lager und Logistik', href: '/de/branchen/lager-und-logistik', description: 'Rampentore, Perimeter, Lager' },
            { label: 'Baustellen', href: '/de/branchen/baustellen', description: 'Bauzaun, Geräte, Container' },
          ] },
        ],
      },
    ],
    all: { label: 'Partnerprogramm', href: '/de/partner' },
  },
  { label: 'Preise', href: '/de/preise' },
  {
    label: 'Ressourcen',
    href: '/de/unterstuetzte-kameras',
    mobileFlat: true,
    columns: [
      { label: 'Einrichten', sections: [{ items: [
        { label: 'Unterstützte Kameras', href: '/de/unterstuetzte-kameras', description: 'ONVIF- und RTSP-Hersteller' },
        { label: 'Camzify Connector', href: '/de/camzify-connector', description: 'Kameras im lokalen Netz' },
      ] }] },
      { label: 'Vertrauen', sections: [{ items: [
        { label: 'Sicherheit und Datenschutz', href: '/de/sicherheit-und-datenschutz', description: 'DSGVO, Verschlüsselung, Speicherort' },
        { label: 'KI-Videoanalyse erklärt', href: '/de/ki-videoanalyse', description: 'Die Grundlagen erklärt' },
      ] }] },
    ],
    all: { label: 'Deutsche Übersicht', href: '/de' },
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
