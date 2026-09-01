import Link from 'next/link';
import { SiteLogo } from '@/components/layout/site-logo';
import { Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig, formattedAddress } from '@/lib/site-config';

const footerLinks = {
  'Virtual Patrolling': [
    { label: 'Overview', href: '/virtual-patrolling' },
    { label: 'How It Works', href: '/virtual-patrolling/how-it-works' },
    { label: 'Patrol Checklists', href: '/virtual-patrolling/patrol-checklists' },
    { label: 'Patrol Reports', href: '/virtual-patrolling/patrol-reports' },
    { label: 'vs Security Guards', href: '/virtual-patrolling/vs-security-guards' },
  ],
  'Platform': [
    { label: 'Dashboard', href: '/platform/dashboard' },
    { label: 'Live Streaming', href: '/platform/live-streaming' },
    { label: 'Video Backup', href: '/platform/video-backup-and-retention' },
    { label: 'Notifications', href: '/platform/notifications-and-alerts' },
    { label: 'AI Architecture', href: '/platform/ai-architecture' },
  ],
  'AI Features': [
    { label: 'Line Intrusion', href: '/ai-features/line-intrusion-detection' },
    { label: 'Zone Intrusion', href: '/ai-features/zone-intrusion-detection' },
    { label: 'Motion Detection', href: '/ai-features/motion-detection' },
    { label: 'Camera Tampering', href: '/ai-features/camera-tampering-detection' },
    { label: 'Multi-Object Tracking', href: '/ai-features/multi-object-tracking' },
  ],
  'Use Cases': [
    { label: 'Perimeter Security', href: '/use-cases/perimeter-security' },
    { label: 'After-Hours Monitoring', href: '/use-cases/after-hours-monitoring' },
    { label: 'Guard Tour Verification', href: '/use-cases/guard-tour-verification' },
    { label: 'Theft Prevention', href: '/use-cases/theft-prevention' },
    { label: 'Remote Site Monitoring', href: '/use-cases/remote-site-monitoring' },
  ],
  'Industries': [
    { label: 'Warehouses', href: '/industries/warehouses' },
    { label: 'Retail', href: '/industries/retail' },
    { label: 'Manufacturing', href: '/industries/manufacturing' },
    { label: 'Construction Sites', href: '/industries/construction-sites' },
    { label: 'Healthcare', href: '/industries/healthcare' },
  ],
  'Company': [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Book a Demo', href: '/book-a-demo' },
    { label: 'Partners', href: '/partners' },
  ],
  'Resources': [
    { label: 'FAQs', href: '/faqs' },
    { label: 'Blog', href: '/blog' },
    { label: 'Roadmap', href: '/roadmap' },
    { label: 'Trust', href: '/trust' },
    { label: 'Security & Compliance', href: '/security-and-compliance' },
    { label: 'Sitemap', href: '/sitemap-page' },
  ],
};

/**
 * Evaluated once, at module load. The footer is a server component inside a statically
 * prerendered tree, so this is baked into the HTML at build time and never re-evaluated
 * on the client — there is no server/client value to mismatch. Kept out of JSX so the
 * SSR lint's (correct) blanket rule against `new Date()` in render still holds.
 */
const COPYRIGHT_YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-site px-6 py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-7">
          {Object.entries(footerLinks ?? {}).map(([category, links]: [string, any[]]) => (
            <div key={category}>
              <h3 className="font-mono text-mono-sm uppercase text-muted-foreground">
                {category}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {(links ?? []).map((link: any) => (
                  <li key={link?.href ?? ''}>
                    <Link
                      href={link?.href ?? '/'}
                      className="text-sm text-foreground/70 transition-colors hover:text-primary"
                    >
                      {link?.label ?? ''}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start gap-6 border-t border-border pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <SiteLogo className="h-8 w-auto" />
            </Link>
            <span className="text-xs text-muted-foreground">
              Powered by {siteConfig.engineering}
            </span>
          </div>

          {/*
            NAP block. These three values must match the Organization schema and
            /llms.txt exactly — all three read from siteConfig so they cannot drift.
            Phone and email are real links: tappable on mobile, and a machine-readable
            contact signal for crawlers.
          */}
          <address className="flex flex-wrap items-center gap-4 text-xs not-italic text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
              {formattedAddress}
            </span>
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 rounded transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Phone className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-1 rounded transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Mail className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
              {siteConfig.email}
            </a>
          </address>

          <div className="text-xs text-muted-foreground">
            © {COPYRIGHT_YEAR} {siteConfig.legalName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
