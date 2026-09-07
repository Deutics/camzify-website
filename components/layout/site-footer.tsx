import Link from 'next/link';
import { SiteImage } from '@/components/content/site-image';
import { NewsletterForm } from '@/components/layout/newsletter-form';
import { Mail, Phone, MapPin, ArrowUpRight, ArrowRight } from 'lucide-react';
import { siteConfig, formattedAddress } from '@/lib/site-config';

/*
 * The footer. Dark in both themes (see `.footer-dark` in globals.css), because the
 * end of a page is where a product site turns from reading into orientation: the
 * brand, how to reach the company, the newsletter, and every section of the site laid
 * out in one place. Four layers, all on one twelve-column grid:
 *
 *   1. Brand row: wordmark, the one-line positioning, the head office, the console
 *      sign-in; and the newsletter on the right.
 *   2. Link columns, grouped the way the navigation groups them, with the partner
 *      track (the primary audience per the lead files) given its own column.
 *   3. Bottom bar: copyright, registration, legal links.
 *
 * No repeated call to action: the CTA band above every footer carries "Book a demo".
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
    <footer className="footer-dark border-t border-border">
      {/* Brand row */}
      <div className="mx-auto max-w-site px-6 pt-16 pb-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center" aria-label={`${siteConfig.name} home`}>
              <SiteImage src="/camzify-logo-dark.png" alt={siteConfig.name} width={825} height={192} sizes="165px" className="h-9 w-auto" />
            </Link>
            <p className="mt-6 max-w-sm text-body leading-relaxed text-muted-foreground">
              Cloud VMS with virtual patrolling, for the cameras you already own.
            </p>
            <dl className="mt-8 grid gap-4 text-sm">
              <div className="flex gap-3">
                <dt className="sr-only">Head office</dt>
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <dd className="text-muted-foreground"><span className="text-foreground">{siteConfig.legalName}</span><br />{formattedAddress}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">Phone</dt>
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <dd><a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{siteConfig.phone}</a></dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">Email</dt>
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <dd><a href={`mailto:${siteConfig.email}`} className="rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{siteConfig.email}</a></dd>
              </div>
            </dl>
            <a href={siteConfig.appUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Sign in to the console <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-site px-6 py-14">
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-mono-sm uppercase tracking-wider text-muted-foreground">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[13px] leading-snug text-foreground/75 transition-colors hover:text-foreground sm:text-sm">{l.label}</Link>
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
                <Link href={l.href} className="transition-colors hover:text-foreground">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
