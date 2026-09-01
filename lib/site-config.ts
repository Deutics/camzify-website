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
  legalName: 'Deutics Global Pte Ltd',
  /** Consumer-facing parent brand. */
  company: 'Camzify Global',
  /** Engineering arm, credited in the footer. */
  engineering: 'Deutics Global',

  tagline: 'Smart Surveillance, Safer Spaces',
  description:
    'AI-powered virtual patrolling and video analytics platform. Scheduled AI patrol rounds on the cameras you already own.',

  /** Canonical origin. No trailing slash. */
  url: 'https://camzify.com',
  /** Authenticated product app (external). */
  appUrl: 'https://app.camzify.live/',

  locale: 'en_SG',
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
  email: 'support@camzify.com',
  salesEmail: 'support@camzify.com',

  /** Founded/served geography — used for LocalBusiness areaServed. */
  areaServed: ['Singapore', 'Southeast Asia', 'Middle East', 'United Kingdom', 'United States', 'Australia'],

  /** Generated 1200x630 card (app/opengraph-image.tsx), not a static file. */
  ogImage: '/opengraph-image',
  /** Black wordmark. Used for schema.org, where consumers render on light grounds. */
  logo: '/camzify-logo-light.png',

  /** Populate as profiles go live — schema.org sameAs strengthens entity disambiguation. */
  sameAs: [] as string[],
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


export const navItems = [
  {
    label: 'Virtual Patrolling',
    href: '/virtual-patrolling',
    children: [
      { label: 'Overview', href: '/virtual-patrolling', description: 'Automated AI patrol rounds on your cameras' },
      { label: 'How It Works', href: '/virtual-patrolling/how-it-works', description: 'Step-by-step patrol system walkthrough' },
      { label: 'Patrol Sequences', href: '/virtual-patrolling/patrol-sequences', description: 'Ordered camera routes across sites' },
      { label: 'Patrol Checklists', href: '/virtual-patrolling/patrol-checklists', description: 'Per-camera compliance checks' },
      { label: 'Automated Scheduling', href: '/virtual-patrolling/automated-patrol-scheduling', description: 'Set frequency, hours, and days' },
      { label: 'Patrol Reports', href: '/virtual-patrolling/patrol-reports', description: 'PDF reports for every round' },
      { label: 'Guard Notifications', href: '/virtual-patrolling/guard-notifications', description: 'Automatic alerts to assigned guards' },
      { label: 'Compliance Tracking', href: '/virtual-patrolling/patrol-compliance-tracking', description: 'Rounds completed vs scheduled' },
      { label: 'vs Security Guards', href: '/virtual-patrolling/vs-security-guards', description: 'Compare AI patrols to manned guarding' },
      { label: 'Multi-Site Operations', href: '/virtual-patrolling/for-multi-site-operations', description: 'Patrol across distributed locations' },
    ],
  },
  {
    label: 'Platform',
    href: '/platform',
    children: [
      { label: 'Overview', href: '/platform', description: 'Unified video management platform' },
      { label: 'Dashboard', href: '/platform/dashboard', description: 'Real-time operations overview' },
      { label: 'Live Streaming', href: '/platform/live-streaming', description: 'Multi-camera live view' },
      { label: 'Video Backup', href: '/platform/video-backup-and-retention', description: 'Retention and playback management' },
      { label: 'Notifications', href: '/platform/notifications-and-alerts', description: 'Alert management and escalation' },
      { label: 'Analytics', href: '/platform/analytics-and-reporting', description: 'Detection trends and insights' },
      { label: 'User Management', href: '/platform/user-management', description: 'Roles and access control' },
      { label: 'Multi-Site', href: '/platform/multi-site-management', description: 'Centralized multi-location control' },
      { label: 'AI Architecture', href: '/platform/ai-architecture', description: 'Six-layer AI processing pipeline' },
    ],
  },
  {
    label: 'AI Features',
    href: '/ai-features',
    groups: [
      {
        label: 'Perimeter & Access',
        items: [
          { label: 'Line Intrusion Detection', href: '/ai-features/line-intrusion-detection' },
          { label: 'Zone Intrusion Detection', href: '/ai-features/zone-intrusion-detection' },
          { label: 'Motion Detection', href: '/ai-features/motion-detection' },
          { label: 'Tailgating Detection', href: '/ai-features/tailgating-detection' },
        ],
      },
      {
        label: 'Threat & Incident',
        items: [
          { label: 'Behavioral Anomaly Detection', href: '/ai-features/behavioral-anomaly-detection' },
          { label: 'Weapons Detection', href: '/ai-features/weapons-detection' },
          { label: 'Aggression & Fight Detection', href: '/ai-features/aggression-and-fight-detection' },
          { label: 'Slip & Fall Detection', href: '/ai-features/slip-and-fall-detection' },
          { label: 'Fire & Smoke Detection', href: '/ai-features/fire-and-smoke-detection' },
        ],
      },
      {
        label: 'Site Compliance',
        items: [
          { label: 'PPE Violation Detection', href: '/ai-features/ppe-violation-detection' },
          { label: 'Abandoned Object Detection', href: '/ai-features/abandoned-object-detection' },
          { label: 'Littering Detection', href: '/ai-features/littering-detection' },
          { label: 'Camera Tampering Detection', href: '/ai-features/camera-tampering-detection' },
        ],
      },
      {
        label: 'Vehicle & Parking',
        items: [
          { label: 'Illegal Parking Detection', href: '/ai-features/illegal-parking-detection' },
          { label: 'Wrong-Way Vehicle Detection', href: '/ai-features/wrong-way-vehicle-detection' },
          { label: 'Vehicle Damage Report', href: '/ai-features/vehicle-damage-report' },
        ],
      },
      {
        label: 'Investigation & Tracking',
        items: [
          { label: 'AI Suspect Search', href: '/ai-features/forensic-video-search' },
          { label: 'Cross-Camera Journey Map', href: '/ai-features/cross-camera-journey-map' },
          { label: 'Multi-Object Tracking', href: '/ai-features/multi-object-tracking' },
          { label: 'AI Attribute Extraction', href: '/ai-features/ai-attribute-extraction' },
        ],
      },
      {
        label: 'Analytics & Insights',
        items: [
          { label: 'Heatmap Anomalies', href: '/ai-features/heatmap-anomalies' },
          { label: 'Occupancy & Peak Hour Trends', href: '/ai-features/occupancy-and-peak-hour-trends' },
        ],
      },
      {
        label: 'Coming Soon',
        items: [
          { label: 'Loitering Detection', href: '/ai-features/loitering-detection' },
        ],
      },
    ],
  },
  {
    label: 'Use Cases',
    href: '/use-cases',
    children: [
      { label: 'All Use Cases', href: '/use-cases', description: 'Security scenarios we address' },
      { label: 'Perimeter Security', href: '/use-cases/perimeter-security', description: 'Fence-line and boundary protection' },
      { label: 'After-Hours Monitoring', href: '/use-cases/after-hours-monitoring', description: 'Night and off-hours coverage' },
      { label: 'Guard Tour Verification', href: '/use-cases/guard-tour-verification', description: 'Verify guard rounds remotely' },
      { label: 'Theft Prevention', href: '/use-cases/theft-prevention', description: 'Shrinkage and loss reduction' },
      { label: 'Loading Dock Monitoring', href: '/use-cases/loading-dock-monitoring', description: 'Dock and logistics security' },
      { label: 'Remote Site Monitoring', href: '/use-cases/remote-site-monitoring', description: 'Unmanned location oversight' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    groups: [
      {
        label: 'Industrial & Logistics',
        items: [
          { label: 'Warehouses', href: '/industries/warehouses' },
          { label: 'Manufacturing', href: '/industries/manufacturing' },
          { label: 'Construction Sites', href: '/industries/construction-sites' },
          { label: 'Energy', href: '/industries/energy' },
          { label: 'Automotive', href: '/industries/automotive' },
        ],
      },
      {
        label: 'Retail & Commercial',
        items: [
          { label: 'Retail', href: '/industries/retail' },
          { label: 'Restaurants', href: '/industries/restaurants' },
          { label: 'Financial Services', href: '/industries/financial-services' },
        ],
      },
      {
        label: 'Healthcare & Education',
        items: [
          { label: 'Healthcare', href: '/industries/healthcare' },
          { label: 'Education Facilities', href: '/industries/education-facilities' },
        ],
      },
      {
        label: 'Property & Community',
        items: [
          { label: 'Property Management', href: '/industries/property-management' },
          { label: 'Residential', href: '/industries/residential' },
          { label: 'Self-Storage', href: '/industries/self-storage' },
          { label: 'Waste Management', href: '/industries/waste-management' },
        ],
      },
      {
        label: 'Multi-Site Operations',
        items: [
          { label: 'Multiple Sites', href: '/industries/multiple-sites' },
          { label: 'Remote Sites', href: '/industries/remote-sites' },
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
      { label: 'Supported Cameras', href: '/supported-cameras', description: 'Compatible camera database' },
      { label: 'Camera Connectivity', href: '/camera-connectivity', description: 'Setup guides by protocol' },
      { label: 'FAQs', href: '/faqs', description: 'Common questions answered' },
      { label: 'Blog', href: '/blog', description: 'Latest insights and updates' },
      { label: 'Roadmap', href: '/roadmap', description: 'What we are building next' },
    ],
  },
] as const;
