import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

/**
 * Static sitemap, generated at build time.
 *
 * Previously this read `headers()` to derive the host, which forced the route (and by
 * extension every crawl of it) to render dynamically. Canonical host now comes from
 * `siteConfig.url`, matching the canonical tags — a sitemap whose URLs disagree with
 * the page canonicals is a self-inflicted duplicate-content signal.
 *
 * Priority and changeFrequency are set per silo rather than by path depth: a money page
 * like /pricing sits two segments deep but matters far more than a third-level guide.
 */

type Entry = { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] };

const group = (
  paths: string[],
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
): Entry[] => paths.map((path) => ({ path, priority, changeFrequency }));

// Tier 1 — homepage and primary conversion paths.
const core = group(['/'], 1.0, 'weekly');

const conversion = group(
  ['/pricing', '/book-a-demo', '/free-trial', '/roi-calculator', '/contact'],
  0.9,
  'monthly'
);

// Tier 2 — silo hubs. These carry the internal-link equity to their children.
const hubs = group(
  [
    '/virtual-patrolling',
    '/platform',
    '/ai-features',
    '/use-cases',
    '/industries',
    '/guides',
    '/compare',
    '/camera-connectivity',
    '/supported-cameras',
    '/partners',
  ],
  0.9,
  'weekly'
);

// Tier 3 — the flagship cluster. Highest-intent commercial content after the hubs.
const virtualPatrolling = group(
  [
    '/virtual-patrolling/how-it-works',
    '/virtual-patrolling/patrol-sequences',
    '/virtual-patrolling/patrol-checklists',
    '/virtual-patrolling/automated-patrol-scheduling',
    '/virtual-patrolling/patrol-reports',
    '/virtual-patrolling/guard-notifications',
    '/virtual-patrolling/risk-detection',
    '/virtual-patrolling/patrol-compliance-tracking',
    '/virtual-patrolling/vs-security-guards',
    '/virtual-patrolling/for-multi-site-operations',
  ],
  0.8,
  'monthly'
);

const platform = group(
  [
    '/platform/dashboard',
    '/platform/live-streaming',
    '/platform/video-backup-and-retention',
    '/platform/notifications-and-alerts',
    '/platform/analytics-and-reporting',
    '/platform/user-management',
    '/platform/permission-groups',
    '/platform/license-and-instance-management',
    '/platform/multi-site-management',
    '/platform/mobile-access',
    '/platform/ai-architecture',
  ],
  0.7,
  'monthly'
);

const aiFeatures = group(
  [
    '/ai-features/line-intrusion-detection',
    '/ai-features/zone-intrusion-detection',
    '/ai-features/motion-detection',
    '/ai-features/camera-tampering-detection',
    '/ai-features/multi-object-tracking',
    '/ai-features/ai-attribute-extraction',
    '/ai-features/forensic-video-search',
    '/ai-features/cross-camera-journey-map',
    '/ai-features/tailgating-detection',
    '/ai-features/weapons-detection',
    '/ai-features/aggression-and-fight-detection',
    '/ai-features/ppe-violation-detection',
    '/ai-features/fire-and-smoke-detection',
    '/ai-features/slip-and-fall-detection',
    '/ai-features/abandoned-object-detection',
    '/ai-features/littering-detection',
    '/ai-features/illegal-parking-detection',
    '/ai-features/wrong-way-vehicle-detection',
    '/ai-features/vehicle-damage-report',
    '/ai-features/heatmap-anomalies',
    '/ai-features/occupancy-and-peak-hour-trends',
    '/ai-features/loitering-detection',
    '/ai-features/behavioral-anomaly-detection',
  ],
  0.7,
  'monthly'
);

const useCases = group(
  [
    '/use-cases/perimeter-security',
    '/use-cases/after-hours-monitoring',
    '/use-cases/unauthorized-access-detection',
    '/use-cases/trespassing-detection',
    '/use-cases/vandalism-prevention',
    '/use-cases/theft-prevention',
    '/use-cases/loading-dock-monitoring',
    '/use-cases/parking-lot-surveillance',
    '/use-cases/remote-site-monitoring',
    '/use-cases/vehicle-monitoring',
    '/use-cases/night-security',
    '/use-cases/guard-tour-verification',
    '/use-cases/incident-investigation',
  ],
  0.7,
  'monthly'
);

const industries = group(
  [
    '/industries/warehouses',
    '/industries/retail',
    '/industries/manufacturing',
    '/industries/construction-sites',
    '/industries/healthcare',
    '/industries/education-facilities',
    '/industries/financial-services',
    '/industries/automotive',
    '/industries/energy',
    '/industries/property-management',
    '/industries/residential',
    '/industries/restaurants',
    '/industries/self-storage',
    '/industries/waste-management',
    '/industries/remote-sites',
    '/industries/multiple-sites',
  ],
  0.7,
  'monthly'
);

// Comparison pages punch above their weight on bottom-funnel queries.
const compare = group(
  [
    '/compare/virtual-patrolling-vs-security-guards',
    '/compare/virtual-patrolling-vs-guard-tour-systems',
    '/compare/camzify-vs-traditional-vms',
    '/compare/ai-video-analytics-vs-motion-detection',
    '/compare/cloud-vms-vs-on-premise',
    '/compare/camzify-vs-eagle-eye-networks',
  ],
  0.8,
  'monthly'
);

const guides = group(
  [
    '/guides/what-is-virtual-patrolling',
    '/guides/how-to-run-a-virtual-patrol-round',
    '/guides/how-to-set-up-sites-and-cameras',
    '/guides/how-to-monitor-live-camera-feeds',
    '/guides/how-to-configure-cloud-video-backup',
    '/guides/how-to-manage-sub-users-and-quotas',
    '/guides/how-to-manage-security-alerts',
    '/guides/virtual-patrolling-cost',
    '/guides/security-guard-cost-per-hour',
    '/guides/ai-video-analytics-cost',
    '/guides/remote-guarding-cost',
    '/guides/how-to-choose-video-analytics-software',
    '/guides/how-to-reduce-false-alarms',
    '/guides/onvif-and-rtsp-explained',
    '/guides/guard-tour-systems-explained',
    '/guides/security-audit-checklist',
    '/guides/video-retention-requirements',
  ],
  0.7,
  'monthly'
);

const connectivity = group(
  [
    '/camera-connectivity/rtsp-setup',
    '/camera-connectivity/rtmp-setup',
    '/camera-connectivity/https-setup',
    '/camera-connectivity/hls-setup',
    '/camera-connectivity/webrtc-setup',
    '/camzify-connector',
  ],
  0.6,
  'monthly'
);

const partners = group(
  [
    '/partners/become-a-reseller',
    '/partners/for-security-integrators',
    '/partners/for-security-agencies',
    '/partners/for-monitoring-centres',
    '/partners/for-managed-service-providers',
  ],
  0.6,
  'monthly'
);

// Trust and company pages: low crawl priority, high conversion-assist value.
const company = group(
  ['/about', '/about/muhammad-talha', '/faqs', '/trust', '/security-and-compliance', '/roadmap', '/blog', '/sitemap-page'],
  0.5,
  'monthly'
);

const allEntries: Entry[] = [
  ...core,
  ...conversion,
  ...hubs,
  ...virtualPatrolling,
  ...platform,
  ...aiFeatures,
  ...useCases,
  ...industries,
  ...compare,
  ...guides,
  ...connectivity,
  ...partners,
  ...company,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return allEntries.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
