import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Sitemap",
  description: "Complete list of all pages on the Camzify website.",
  path: "/sitemap-page",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sections = [
  { title: 'Virtual Patrolling', links: [
    { href: '/virtual-patrolling', label: 'Virtual Patrolling' },
    { href: '/virtual-patrolling/how-it-works', label: 'How It Works' },
    { href: '/virtual-patrolling/patrol-sequences', label: 'Patrol Sequences' },
    { href: '/virtual-patrolling/patrol-checklists', label: 'Patrol Checklists' },
    { href: '/virtual-patrolling/automated-patrol-scheduling', label: 'Automated Scheduling' },
    { href: '/virtual-patrolling/patrol-reports', label: 'Patrol Reports' },
    { href: '/virtual-patrolling/guard-notifications', label: 'Guard Notifications' },
    { href: '/virtual-patrolling/patrol-compliance-tracking', label: 'Compliance Tracking' },
    { href: '/virtual-patrolling/vs-security-guards', label: 'VS Security Guards' },
    { href: '/virtual-patrolling/for-multi-site-operations', label: 'Multi-Site Operations' },
  ]},
  { title: 'Platform', links: [
    { href: '/platform', label: 'Platform Overview' },
    { href: '/platform/dashboard', label: 'Dashboard' },
    { href: '/platform/live-streaming', label: 'Live Streaming' },
    { href: '/platform/video-backup-and-retention', label: 'Video Backup' },
    { href: '/platform/notifications-and-alerts', label: 'Notifications' },
    { href: '/platform/analytics-and-reporting', label: 'Analytics' },
    { href: '/platform/user-management', label: 'User Management' },
    { href: '/platform/permission-groups', label: 'Permission Groups' },
    { href: '/platform/multi-site-management', label: 'Multi-Site' },
    { href: '/platform/mobile-access', label: 'Mobile Access' },
    { href: '/platform/ai-architecture', label: 'AI Architecture' },
  ]},
  { title: 'AI Features', links: [
    { href: '/ai-features', label: 'AI Features Overview' },
    { href: '/ai-features/line-intrusion-detection', label: 'Line Intrusion' },
    { href: '/ai-features/zone-intrusion-detection', label: 'Zone Intrusion' },
    { href: '/ai-features/motion-detection', label: 'Motion Detection' },
    { href: '/ai-features/camera-tampering-detection', label: 'Camera Tampering' },
    { href: '/ai-features/multi-object-tracking', label: 'Multi-Object Tracking' },
    { href: '/ai-features/ai-attribute-extraction', label: 'AI Attribute Extraction' },
    { href: '/ai-features/forensic-video-search', label: 'AI Suspect Search' },
    { href: '/ai-features/cross-camera-journey-map', label: 'Cross-Camera Journey Map' },
    { href: '/ai-features/tailgating-detection', label: 'Tailgating Detection' },
    { href: '/ai-features/weapons-detection', label: 'Weapons Detection' },
    { href: '/ai-features/aggression-and-fight-detection', label: 'Aggression & Fight Detection' },
    { href: '/ai-features/ppe-violation-detection', label: 'PPE Violation Detection' },
    { href: '/ai-features/fire-and-smoke-detection', label: 'Fire & Smoke Detection' },
    { href: '/ai-features/slip-and-fall-detection', label: 'Slip & Fall Detection' },
    { href: '/ai-features/abandoned-object-detection', label: 'Abandoned Object Detection' },
    { href: '/ai-features/littering-detection', label: 'Littering Detection' },
    { href: '/ai-features/illegal-parking-detection', label: 'Illegal Parking Detection' },
    { href: '/ai-features/wrong-way-vehicle-detection', label: 'Wrong-Way Vehicle Detection' },
    { href: '/ai-features/vehicle-damage-report', label: 'Vehicle Damage Report' },
    { href: '/ai-features/heatmap-anomalies', label: 'Heatmap Anomalies' },
    { href: '/ai-features/occupancy-and-peak-hour-trends', label: 'Occupancy & Peak Hour Trends' },
  ]},
  { title: 'Company', links: [
    { href: '/about', label: 'About' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'Contact' },
    { href: '/book-a-demo', label: 'Book a Demo' },
    { href: '/free-trial', label: 'Free Trial' },
    { href: '/faqs', label: 'FAQs' },
    { href: '/blog', label: 'Blog' },
    { href: '/roadmap', label: 'Roadmap' },
    { href: '/partners', label: 'Partners' },
    { href: '/trust', label: 'Trust' },
    { href: '/guides', label: 'Guides' },
  ]},
];

export default function SitemapPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Sitemap' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Sitemap</h1>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map(s => (
              <div key={s.title}>
                <h2 className="font-display text-lg font-bold">{s.title}</h2>
                <ul className="mt-3 space-y-2">
                  {s.links.map(l => (
                    <li key={l.href}><Link href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
