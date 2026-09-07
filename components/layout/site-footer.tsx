import Link from 'next/link';
import { NewsletterForm } from '@/components/layout/newsletter-form';
import { Mail, Phone, MapPin, ArrowUpRight, ArrowRight } from 'lucide-react';
import { siteConfig, formattedAddress } from '@/lib/site-config';

/*
 * The footer. Three layers: the newsletter band (the one thing a reader who has reached
 * the end of a page can still do here that they could not do above), the link columns
 * grouped the way the navigation groups them with the partner track given its own
 * column, and a bottom block with the head-office NAP, the console sign-in, the legal
 * links and the copyright. There is no brand blurb and no repeated call to action: the
 * CTA band above every footer already carries "Book a demo", and the definition
 * sentence lives in the hero and llms.txt.
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

      {/* Bottom: head office, legal links, copyright */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-site px-6 py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <address className="grid gap-2 text-sm not-italic text-muted-foreground">
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{siteConfig.legalName} · {formattedAddress}</span>
              </span>
              <span className="flex flex-wrap gap-x-6 gap-y-2">
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 rounded transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />{siteConfig.phone}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 rounded transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />{siteConfig.email}
                </a>
              </span>
            </address>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <li>
                <a href={siteConfig.appUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                  Sign in to the console <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-primary">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">© {COPYRIGHT_YEAR} {siteConfig.legalName}. All rights reserved. Registered in Singapore.</p>
        </div>
      </div>
    </footer>
  );
}
