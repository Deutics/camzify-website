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
 * `section` on a child groups it under a column heading in the desktop menu. Menus with
 * more than eight children render as a columned panel instead of one tall list, so they
 * fit a laptop viewport; children without a section (the hub link) sit in the panel's
 * footer row. The mobile accordion ignores sections and lists children in order.
 */
export const navItems = [
  {
    label: 'Virtual Patrolling',
    href: '/virtual-patrolling',
    children: [
      { label: 'Overview', href: '/virtual-patrolling', description: 'Automated AI patrol rounds on your cameras' },
      { label: 'How It Works', href: '/virtual-patrolling/how-it-works', section: 'How it works', description: 'Step-by-step patrol system walkthrough' },
      { label: 'Patrol Sequences', href: '/virtual-patrolling/patrol-sequences', section: 'How it works', description: 'Ordered camera routes across sites' },
      { label: 'Patrol Checklists', href: '/virtual-patrolling/patrol-checklists', section: 'How it works', description: 'Per-camera compliance checks' },
      { label: 'Automated Scheduling', href: '/virtual-patrolling/automated-patrol-scheduling', section: 'How it works', description: 'Set frequency, hours, and days' },
      { label: 'Patrol Reports', href: '/virtual-patrolling/patrol-reports', section: 'What a round produces', description: 'PDF reports for every round' },
      { label: 'Guard Notifications', href: '/virtual-patrolling/guard-notifications', section: 'What a round produces', description: 'Automatic alerts to assigned guards' },
      { label: 'Risk Detection', href: '/virtual-patrolling/risk-detection', section: 'What a round produces', description: 'Hazards flagged beyond the checklist' },
      { label: 'Compliance Tracking', href: '/virtual-patrolling/patrol-compliance-tracking', section: 'What a round produces', description: 'Rounds completed vs scheduled' },
      { label: 'vs Security Guards', href: '/virtual-patrolling/vs-security-guards', section: 'In context', description: 'Compare AI patrols to manned guarding' },
      { label: 'Virtual Guard', href: '/virtual-guard', section: 'In context', description: 'The service model, in the market\'s words' },
      { label: 'Multi-Site Operations', href: '/virtual-patrolling/for-multi-site-operations', section: 'In context', description: 'Patrol across distributed locations' },
    ],
  },
  {
    label: 'Solutions',
    href: '/partners',
    children: [
      { label: 'For Security Agencies', href: '/partners/for-security-agencies', description: 'Sell overnight coverage you cannot staff' },
      { label: 'For Monitoring Companies', href: '/partners/for-monitoring-centers', description: 'Run rounds for the agencies you monitor for' },
      { label: 'For CCTV & Alarm Installers', href: '/partners/for-security-integrators', description: 'A monthly service on cameras you install' },
      { label: 'For Managed Service Providers', href: '/partners/for-managed-service-providers', description: 'One account, a login per customer' },
      { label: 'Become a Reseller', href: '/partners/become-a-reseller', description: 'Software only, quote-based pricing' },
      { label: 'ROI Calculator', href: '/roi-calculator', description: 'Your guard cost, or your partner revenue' },
    ],
  },
  {
    label: 'Platform',
    href: '/platform',
    children: [
      { label: 'Overview', href: '/platform', description: 'Unified video management platform' },
      { label: 'Cloud Video Surveillance', href: '/cloud-video-surveillance', section: 'Video', description: 'Cloud VMS, no recorder on site' },
      { label: 'Dashboard', href: '/platform/dashboard', section: 'Operations', description: 'Real-time operations overview' },
      { label: 'Live Streaming', href: '/platform/live-streaming', section: 'Video', description: 'Multi-camera live view' },
      { label: 'Video Backup', href: '/platform/video-backup-and-retention', section: 'Video', description: 'Retention and playback management' },
      { label: 'Notifications', href: '/platform/notifications-and-alerts', section: 'Operations', description: 'Alert management and escalation' },
      { label: 'Analytics', href: '/platform/analytics-and-reporting', section: 'Operations', description: 'Detection trends and insights' },
      { label: 'User Management', href: '/platform/user-management', section: 'Scale and control', description: 'Roles and access control' },
      { label: 'Multi-Site', href: '/platform/multi-site-management', section: 'Scale and control', description: 'Centralized multi-location control' },
      { label: 'AI Architecture', href: '/platform/ai-architecture', section: 'Scale and control', description: 'Six-layer AI processing pipeline' },
    ],
  },
  {
    label: 'AI Features',
    href: '/ai-features',
    groups: [
      {
        label: 'Perimeter & Access',
        items: [
          { label: 'Line Intrusion Detection', href: '/ai-features/line-intrusion-detection', description: 'Directional tripwire, confirmed tracks' },
          { label: 'Zone Intrusion Detection', href: '/ai-features/zone-intrusion-detection', description: 'Polygonal restricted areas, any entry' },
          { label: 'Loitering Detection', href: '/ai-features/loitering-detection', description: 'Lingering past a set dwell time' },
          { label: 'Motion Detection', href: '/ai-features/motion-detection', description: 'Track-based motion, not pixel change' },
          { label: 'Tailgating Detection', href: '/ai-features/tailgating-detection', description: 'Two people in on one badge' },
        ],
      },
      {
        label: 'Threat & Incident',
        items: [
          { label: 'Behavioral Anomaly Detection', href: '/ai-features/behavioral-anomaly-detection', description: 'Describe the behavior to watch for' },
          { label: 'Weapons Detection', href: '/ai-features/weapons-detection', description: 'A visible weapon flagged as seen' },
          { label: 'Aggression & Fight Detection', href: '/ai-features/aggression-and-fight-detection', description: 'Altercations flagged as they start' },
          { label: 'Slip & Fall Detection', href: '/ai-features/slip-and-fall-detection', description: 'A person down, raised in real time' },
          { label: 'Fire & Smoke Detection', href: '/ai-features/fire-and-smoke-detection', description: 'Visual flame and smoke on camera' },
        ],
      },
      {
        label: 'Site Compliance',
        items: [
          { label: 'PPE Violation Detection', href: '/ai-features/ppe-violation-detection', description: 'Missing helmets, vests or gloves' },
          { label: 'Abandoned Object Detection', href: '/ai-features/abandoned-object-detection', description: 'Bags and packages left unattended' },
          { label: 'Littering Detection', href: '/ai-features/littering-detection', description: 'Items dropped outside the bins' },
          { label: 'Camera Tampering Detection', href: '/ai-features/camera-tampering-detection', description: 'Covered, moved, defocused or frozen' },
        ],
      },
      {
        label: 'Vehicle & Parking',
        items: [
          { label: 'Illegal Parking Detection', href: '/ai-features/illegal-parking-detection', description: 'Fire lanes, loading zones, bays' },
          { label: 'Wrong-Way Vehicle Detection', href: '/ai-features/wrong-way-vehicle-detection', description: 'Vehicles against the defined direction' },
          { label: 'Vehicle Damage Report', href: '/ai-features/vehicle-damage-report', description: 'Dents and scratches logged at the gate' },
        ],
      },
      {
        label: 'Investigation & Tracking',
        items: [
          { label: 'AI Suspect Search', href: '/ai-features/forensic-video-search', description: 'Find a person from a description' },
          { label: 'Cross-Camera Journey Map', href: '/ai-features/cross-camera-journey-map', description: 'One subject, one cross-camera path' },
          { label: 'Multi-Object Tracking', href: '/ai-features/multi-object-tracking', description: 'Persistent identity per subject' },
          { label: 'AI Attribute Extraction', href: '/ai-features/ai-attribute-extraction', description: 'Structured attributes from the scene' },
        ],
      },
      {
        label: 'Analytics & Insights',
        items: [
          { label: 'Heatmap Anomalies', href: '/ai-features/heatmap-anomalies', description: 'Foot-traffic patterns flagged as unusual' },
          { label: 'Occupancy & Peak Hour Trends', href: '/ai-features/occupancy-and-peak-hour-trends', description: 'Busiest hours and zones by count' },
        ],
      },
    ],
  },
  {
    label: 'Use Cases',
    href: '/use-cases',
    children: [
      { label: 'All Use Cases', href: '/use-cases', description: 'Security scenarios we address' },
      { label: 'Perimeter Security', href: '/use-cases/perimeter-security', section: 'Sites and perimeters', description: 'Fence-line and boundary protection' },
      { label: 'After-Hours Monitoring', href: '/use-cases/after-hours-monitoring', section: 'Sites and perimeters', description: 'Night and off-hours coverage' },
      { label: 'Guard Tour Verification', href: '/use-cases/guard-tour-verification', section: 'Assets and operations', description: 'Verify guard rounds remotely' },
      { label: 'Theft Prevention', href: '/use-cases/theft-prevention', section: 'Assets and operations', description: 'Shrinkage and loss reduction' },
      { label: 'Loading Dock Monitoring', href: '/use-cases/loading-dock-monitoring', section: 'Assets and operations', description: 'Dock and logistics security' },
      { label: 'Remote Site Monitoring', href: '/use-cases/remote-site-monitoring', section: 'Sites and perimeters', description: 'Unmanned location oversight' },
      { label: 'Remote Video Monitoring', href: '/use-cases/remote-video-monitoring', section: 'Assets and operations', description: 'Rounds and detections from a monitoring room' },
      { label: 'Lock-Up & Closing Checks', href: '/use-cases/lock-up-and-closing-checks', section: 'Sites and perimeters', description: 'A closing round from the cameras' },
      { label: 'Fire & Smoke Monitoring', href: '/use-cases/fire-and-smoke-monitoring', section: 'Life safety', description: 'Visual early warning on any camera' },
      { label: 'Fall Detection in Care Settings', href: '/use-cases/fall-detection-for-hospitals-and-care-homes', section: 'Life safety', description: 'A person on the floor, raised in seconds' },
      { label: 'Weapons Detection for Schools', href: '/use-cases/weapons-detection-for-schools-and-public-buildings', section: 'Life safety', description: 'A visible weapon raised as critical' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    groups: [
      {
        label: 'Industrial & Logistics',
        items: [
          { label: 'Warehouses', href: '/industries/warehouses', description: 'Docks, aisles and yards after hours' },
          { label: 'Manufacturing', href: '/industries/manufacturing', description: 'Plant floors, PPE zones and perimeters' },
          { label: 'Construction Sites', href: '/industries/construction-sites', description: 'Open sites, plant and material theft' },
          { label: 'Energy', href: '/industries/energy', description: 'Substations, plants and remote assets' },
          { label: 'Automotive', href: '/industries/automotive', description: 'Repair shops, service bays and lots' },
        ],
      },
      {
        label: 'Retail & Commercial',
        items: [
          { label: 'Retail', href: '/industries/retail', description: 'Stores, stockrooms and closing checks' },
          { label: 'Restaurants', href: '/industries/restaurants', description: 'Kitchens, back doors and closing' },
          { label: 'Financial Services', href: '/industries/financial-services', description: 'Branches, ATMs and after hours' },
        ],
      },
      {
        label: 'Healthcare & Education',
        items: [
          { label: 'Healthcare', href: '/industries/healthcare', description: 'Corridors, entrances and fall detection' },
          { label: 'Education Facilities', href: '/industries/education-facilities', description: 'Campuses, gates and after hours' },
        ],
      },
      {
        label: 'Property & Community',
        items: [
          { label: 'Property Management', href: '/industries/property-management', description: 'Lobbies, parking and common areas' },
          { label: 'Residential', href: '/industries/residential', description: 'Gates, parking and shared spaces' },
          { label: 'Self-Storage', href: '/industries/self-storage', description: 'Gates, corridors and unit access' },
          { label: 'Waste Management', href: '/industries/waste-management', description: 'Yards, plant and after-hours access' },
        ],
      },
      {
        label: 'Multi-Site Operations',
        items: [
          { label: 'Multiple Sites', href: '/industries/multiple-sites', description: 'One console, every location' },
          { label: 'Remote Sites', href: '/industries/remote-sites', description: 'Unmanned sites on the same rounds' },
        ],
      },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  {
    label: 'Resources',
    href: '/guides',
    children: [
      { label: 'Buyer Guides', href: '/guides', description: 'In-depth security guides' },
      { label: 'ROI Calculator', href: '/roi-calculator', description: 'Calculate your savings' },
      { label: 'Compare', href: '/compare', description: 'Side-by-side comparisons' },
      { label: 'Alternatives', href: '/alternatives', description: 'Switching from ADT or Verkada' },
      { label: 'Supported Cameras', href: '/supported-cameras', description: 'Compatible camera database' },
      { label: 'Camera Connectivity', href: '/camera-connectivity', description: 'Setup guides by protocol' },
      { label: 'FAQs', href: '/faqs', description: 'Common questions answered' },
      { label: 'Glossary', href: '/glossary', description: 'Security video terms, defined' },
      { label: 'Blog', href: '/blog', description: 'Latest insights and updates' },
      { label: 'Roadmap', href: '/roadmap', description: 'What we are building next' },
    ],
  },
] as const;
