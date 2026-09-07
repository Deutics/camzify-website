import Link from 'next/link';
import { SiteLogo } from '@/components/layout/site-logo';
import { NewsletterForm } from '@/components/layout/newsletter-form';
import { Mail, Phone, MapPin, ArrowUpRight, ArrowRight } from 'lucide-react';
import { siteConfig, formattedAddress } from '@/lib/site-config';

/*
 * The footer, rebuilt.
 *
 * The previous footer was eight equal columns of five links each, with the brand, the
 * address and the copyright squeezed into one bottom row. It read as a sitemap
 * dumped at the foot of every page and gave a reader who had reached the end nothing
 * to do next. This one has three layers: a brand band with the definition sentence,
 * the two actions that matter and the newsletter; five link columns grouped the way
 * the navigation groups them, with the partner track (the primary audience per the
 * lead files) given its own column; and a bottom bar with the company identity, the
 * NAP block and the legal links.
 *
 * Identity, address, phone and email all read from siteConfig so they cannot disagree
 * with the Organization schema or /llms.txt.
 */
const columns: { title: string; links: { label: string; href: string }[]; all?: { label: string; href: string } }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Virtual patrolling', href: '/virtual-patrolling' },
      { label: 'Virtual guard', href: '/virtual-guard' },
      { label: 'How a round works', href: '/virtual-patrolling/how-it-works' },
      { label: 'Platform', href: '/platform' },
      { label: 'Cloud video surveillance', href: '/cloud-video-surveillance' },
      { label: 'AI detections', href: '/ai-features' },
      { label: 'Camera connectivity', href: '/camera-connectivity' },
      { label: 'Supported cameras', href: '/supported-cameras' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
  },
  {
    title: 'Solutions for',
    links: [
      { label: 'Security agencies', href: '/partners/for-security-agencies' },
      { label: 'Monitoring companies', href: '/partners/for-monitoring-centers' },
      { label: 'CCTV & alarm installers', href: '/partners/for-security-integrators' },
      { label: 'Managed service providers', href: '/partners/for-managed-service-providers' },
      { label: 'Resellers', href: '/partners/become-a-reseller' },
      { label: 'ROI calculator', href: '/roi-calculator' },
    ],
  },
  {
    title: 'Use cases',
    links: [
      { label: 'Perimeter security', href: '/use-cases/perimeter-security' },
      { label: 'After-hours monitoring', href: '/use-cases/after-hours-monitoring' },
      { label: 'Lock-up and closing checks', href: '/use-cases/lock-up-and-closing-checks' },
      { label: 'Alarm verification', href: '/use-cases/alarm-verification' },
      { label: 'Guard tour verification', href: '/use-cases/guard-tour-verification' },
      { label: 'Fire and smoke monitoring', href: '/use-cases/fire-and-smoke-monitoring' },
    ],
    all: { label: 'All 22 use cases', href: '/use-cases' },
  },
  {
    title: 'Industries',
    links: [
      { label: 'Warehouses', href: '/industries/warehouses' },
      { label: 'Construction sites', href: '/industries/construction-sites' },
      { label: 'Manufacturing', href: '/industries/manufacturing' },
      { label: 'Retail', href: '/industries/retail' },
      { label: 'Property management', href: '/industries/property-management' },
      { label: 'Energy', href: '/industries/energy' },
    ],
    all: { label: 'All industries', href: '/industries' },
  },
  {
    title: 'Resources',
    links: [
      { label: 'Guides', href: '/guides' },
      { label: 'Comparisons', href: '/compare' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Trust', href: '/trust' },
      { label: 'Security & compliance', href: '/security-and-compliance' },
      { label: 'About', href: '/about' },
    ],
  },
];

const legal = [
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms-of-service' },
  { label: 'Cookies', href: '/cookie-policy' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Sitemap', href: '/sitemap-page' },
];

/**
 * Evaluated once, at module load. The footer is a server component inside a statically
 * prerendered tree, so this is baked into the HTML at build time and never re-evaluated
 * on the client. Kept out of JSX so the SSR lint's blanket rule against `new Date()` in
 * render still holds.
 */
const COPYRIGHT_YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      {/* Brand band */}
      <div className="mx-auto max-w-site px-6 pt-14 pb-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Link href="/" className="inline-flex items-center" aria-label={`${siteConfig.name} home`}>
              <SiteLogo className="h-9 w-auto" />
            </Link>
            <p className="mt-5 max-w-lg text-body text-muted-foreground">
              <strong className="font-semibold text-foreground">{siteConfig.name} is an AI-powered cloud video management system for the cameras you already own,</strong>{' '}
              with scheduled virtual patrol rounds that check every site, notify the guard when something fails, and file a report with the frame behind every result.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/book-a-demo" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                Book a demo <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/30 hover:bg-accent">
                Ask for a quote
              </Link>
              <a href={siteConfig.appUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                Sign in to the console <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="lg:pt-2 lg:justify-self-end">
            <h3 className="font-mono text-mono-sm uppercase tracking-wider text-muted-foreground">Head office</h3>
            <address className="mt-4 grid gap-2 text-sm not-italic text-muted-foreground">
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{siteConfig.legalName}<br />{formattedAddress}</span>
              </span>
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 rounded transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />{siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 rounded transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />{siteConfig.email}
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* Newsletter band */}
      <div className="border-t border-border bg-muted/20">
        <div className="mx-auto max-w-site px-6 py-14">
          <NewsletterForm />
        </div>
      </div>

      {/* Link columns */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-site px-6 py-12">
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-mono-sm uppercase tracking-wider text-muted-foreground">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-foreground/75 transition-colors hover:text-primary">{l.label}</Link>
                    </li>
                  ))}
                  {col.all && (
                    <li className="pt-1">
                      <Link href={col.all.href} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                        {col.all.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-site flex-col gap-4 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {COPYRIGHT_YEAR} {siteConfig.legalName}. All rights reserved. Registered in Singapore.</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-primary">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
