/**
 * The closing call to action, matched to what the reader came for.
 *
 * Every page used to end with "Ready to patrol your site 24/7?". Search Console (October
 * 2026, docs/seo/GSC-2026-10-17.md) shows most search visitors arrive on pages about cloud
 * video management, AI detections, camera setup and pricing, not patrols, so a patrol
 * pitch was the wrong last thing for them to read. PageShell asks this file for the band
 * on English pages that do not pass their own `ctaProps`; patrol, guarding, industry and
 * use-case pages keep the default patrol band, which is the one written for them.
 *
 * Copy rules: say only what the demo page and the pricing page already say (a 15-minute
 * live demo, a quote per site, the two public price figures), and never promise the demo
 * runs on the visitor's own cameras. The two price figures are typed here rather than
 * imported: lib/pricing-estimates.ts also holds the list rates, which must stay out of
 * anything a page renders (CLAUDE.md rule 2).
 */
export type CtaCopy = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

const from = 'from $5 per camera per month';

const CLOUD_VMS: CtaCopy = {
  title: 'See your cameras in a cloud VMS',
  description: `A 15-minute demo of the live console: cloud recording with retention per camera, live view and AI detections on the cameras you already have. Pricing starts ${from}.`,
  primaryLabel: 'Book a Demo',
  primaryHref: '/book-a-demo',
  secondaryLabel: 'See Pricing',
  secondaryHref: '/pricing',
};

const DETECTIONS: CtaCopy = {
  title: 'See the detections on live cameras',
  description: 'A 15-minute demo of the live product: the detections your site needs, running on real camera feeds, and a quote per camera for your sites.',
  primaryLabel: 'Book a Demo',
  primaryHref: '/book-a-demo',
  secondaryLabel: 'See Pricing',
  secondaryHref: '/pricing',
};

const CAMERA_SETUP: CtaCopy = {
  title: 'Put these cameras on cloud recording',
  description: 'Camzify records RTSP, ONVIF, RTMP and HTTPS streams from the cameras you already own, with alerts and AI detections on top and nothing new on the wall.',
  primaryLabel: 'Book a Demo',
  primaryHref: '/book-a-demo',
  secondaryLabel: 'See Pricing',
  secondaryHref: '/pricing',
};

const PRICING: CtaCopy = {
  title: 'Get a quote for your camera count',
  description: 'Camzify starts from $5 per camera per month, and most cameras land between $20 and $90. Enter your counts for a quote within one business day, or see it live first.',
  primaryLabel: 'Build Your Estimate',
  primaryHref: '/pricing#quote',
  secondaryLabel: 'Book a Demo',
  secondaryHref: '/book-a-demo',
};

/** First match wins, so the more specific rules come first. */
const RULES: [RegExp, CtaCopy][] = [
  // Blog posts, by subject (lib/blog-posts.ts).
  [/^\/blog\/what-is-cctv$/, CLOUD_VMS],
  [/^\/blog\/people-counters-sensors-vs-cameras$/, DETECTIONS],
  // Cost and pricing guides: the reader is pricing a purchase.
  [/^\/guides\/[a-z-]*-cost(-[a-z-]*)?$/, PRICING],
  // Camera setup: connection guides, brand guides, the connector, protocol explainers.
  [/^\/(camera-connectivity|supported-cameras|camzify-connector)(\/|$)/, CAMERA_SETUP],
  [/^\/guides\/(onvif-and-rtsp-explained|using-existing-cameras-with-a-cloud-vms|how-to-set-up-sites-and-cameras)$/, CAMERA_SETUP],
  [/^\/glossary\/(onvif|rtsp|ip-camera|power-over-ethernet|ptz-camera)$/, CAMERA_SETUP],
  // AI detections and analytics.
  [/^\/ai-features(\/|$)/, DETECTIONS],
  [/^\/guides\/(what-is-intelligent-video-analytics|how-to-choose-video-analytics-software|how-to-reduce-false-alarms)$/, DETECTIONS],
  [/^\/compare\/ai-video-analytics-vs-motion-detection$/, DETECTIONS],
  [/^\/glossary\/(intrusion-detection|line-crossing-detection|zone-intrusion-detection|loitering-detection|tailgating|motion-detection|camera-tampering|multi-object-tracking|false-alarm|video-verification)$/, DETECTIONS],
  // Cloud video management: the category pages, platform modules, VMS guides and comparisons.
  [/^\/(cloud-video-surveillance|business-security-cameras|platform)(\/|$)/, CLOUD_VMS],
  [/^\/guides\/(best-cloud-vms|what-is-a-cloud-vms|what-is-a-cloud-nvr|what-is-a-video-management-system|what-is-vsaas|cloud-vms-[a-z-]+|hybrid-cloud-video-surveillance|how-to-configure-cloud-video-backup|video-retention-requirements|how-to-monitor-live-camera-feeds|how-to-manage-sub-users-and-quotas)$/, CLOUD_VMS],
  [/^\/glossary\/(cloud-vms|cloud-video-surveillance|video-surveillance-as-a-service|cctv|video-retention|cloud-video-backup)$/, CLOUD_VMS],
  [/^\/compare\/(cloud-vms-vs-on-premise|camzify-vs-traditional-vms|camzify-vs-[a-z-]+)$/, CLOUD_VMS],
  [/^\/alternatives(\/|$)/, CLOUD_VMS],
];

/** The band for an English page, or undefined to keep the default patrol band. */
export function ctaForPath(path: string | undefined): CtaCopy | undefined {
  if (!path) return undefined;
  return RULES.find(([rx]) => rx.test(path))?.[1];
}
