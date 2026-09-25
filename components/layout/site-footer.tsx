import Link from 'next/link';
import { SiteLogo } from '@/components/layout/site-logo';
import { NewsletterForm } from '@/components/layout/newsletter-form';
import { Mail, Phone, MapPin, ArrowUpRight, ArrowRight, Linkedin, Youtube, Facebook, Instagram } from 'lucide-react';

/* The icon set has no glyph for X, so it is drawn here in the same 24-unit box. */
function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M17.53 3h3.03l-6.62 7.57L21.7 21h-6.1l-4.78-6.25L5.35 21H2.32l7.08-8.1L1.94 3h6.26l4.32 5.71L17.53 3Zm-1.06 16.2h1.68L7.6 4.7H5.8l10.67 14.5Z" />
    </svg>
  );
}

const SOCIAL_ICON = { linkedin: Linkedin, x: XLogo, youtube: Youtube, facebook: Facebook, instagram: Instagram } as const;
import { siteConfig, formattedAddress } from '@/lib/site-config';
import { LOCALES, type Locale } from '@/lib/i18n';

/*
 * The footer. It follows the theme like the rest of the page (a deeper neutral than
 * the page in light mode, the card surface in dark), because the end of a page is
 * where a product site turns from reading into orientation: the brand, how to reach
 * the company, the newsletter, and every section of the site laid out in one place.
 * Three layers, all on one twelve-column grid:
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
type FooterColumn = { title: string; links: { label: string; href: string }[]; all?: { label: string; href: string } };

const columnsEn: FooterColumn[] = [
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
    all: { label: 'All 35 use cases', href: '/use-cases' },
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
      { label: 'Glossary', href: '/glossary' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Trust', href: '/trust' },
      { label: 'Security & compliance', href: '/security-and-compliance' },
      { label: 'About', href: '/about' },
    ],
  },
];

/*
 * German pages get German columns that link German pages only, plus one way back to
 * the English site. The legal pages exist in English only, and the German footer says so.
 */
const columnsDe: FooterColumn[] = [
  {
    title: 'Produkt',
    links: [
      { label: 'KI-Wächterrundgang', href: '/de/ki-waechterrundgang' },
      { label: 'Virtueller Wächterrundgang', href: '/de/virtueller-waechterrundgang' },
      { label: 'So funktioniert ein Rundgang', href: '/de/ki-waechterrundgang/so-funktioniert-es' },
      { label: 'Plattform', href: '/de/plattform' },
      { label: 'Cloud-Videomanagementsystem', href: '/de/cloud-videomanagementsystem' },
      { label: 'KI-Funktionen', href: '/de/ki-funktionen' },
      { label: 'Unterstützte Kameras', href: '/de/unterstuetzte-kameras' },
      { label: 'Camzify Connector', href: '/de/camzify-connector' },
    ],
  },
  {
    title: 'Lösungen für',
    links: [
      { label: 'Sicherheitsdienste', href: '/de/fuer-sicherheitsdienste' },
      { label: 'Leitstellen', href: '/de/fuer-leitstellen' },
      { label: 'Errichter und Installateure', href: '/de/fuer-installateure' },
      { label: 'Managed Service Provider', href: '/de/fuer-managed-service-provider' },
      { label: 'Reseller', href: '/de/reseller-werden' },
    ],
  },
  {
    title: 'Plattform',
    links: [
      { label: 'Live-Streaming', href: '/de/plattform/live-streaming' },
      { label: 'Videospeicherung', href: '/de/plattform/videospeicherung' },
      { label: 'Alarme und Benachrichtigungen', href: '/de/plattform/alarme-und-benachrichtigungen' },
      { label: 'Benutzerverwaltung', href: '/de/plattform/benutzerverwaltung' },
      { label: 'Mehrere Standorte', href: '/de/plattform/mehrere-standorte' },
    ],
  },
  {
    title: 'Branchen',
    links: [
      { label: 'Industrie und Produktion', href: '/de/branchen/industrie-und-produktion' },
      { label: 'Lager und Logistik', href: '/de/branchen/lager-und-logistik' },
      { label: 'Baustellen', href: '/de/branchen/baustellen' },
    ],
    all: { label: 'Alle Branchen', href: '/de/branchen' },
  },
  {
    title: 'Unternehmen',
    links: [
      { label: 'Preise', href: '/de/preise' },
      { label: 'Sicherheit und Datenschutz', href: '/de/sicherheit-und-datenschutz' },
      { label: 'KI-Videoanalyse', href: '/de/ki-videoanalyse' },
      { label: 'Partnerprogramm', href: '/de/partner' },
    ],
    all: { label: 'English website', href: '/' },
  },
];

const legalEn = [
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms-of-service' },
  { label: 'Cookies', href: '/cookie-policy' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Sitemap', href: '/sitemap-page' },
];

const legalDe = [
  { label: 'Datenschutz', href: '/privacy-policy' },
  { label: 'Nutzungsbedingungen', href: '/terms-of-service' },
  { label: 'Cookies', href: '/cookie-policy' },
  { label: 'Barrierefreiheit', href: '/accessibility' },
];

const COPY = {
  en: {
    tagline: 'Cloud VMS with virtual patrolling, for the cameras you already own.',
    office: 'Head office',
    phone: 'Phone',
    email: 'Email',
    signIn: 'Sign in to the console',
    footerNav: 'Footer',
    rights: 'All rights reserved. Registered in Singapore.',
    legalNote: '',
    social: 'Camzify on social media',
    on: 'on',
  },
  de: {
    tagline: 'Cloud-VMS mit KI-gestütztem Wächterrundgang, für die Kameras, die Sie bereits haben.',
    office: 'Hauptsitz',
    phone: 'Telefon',
    email: 'E-Mail',
    signIn: 'In der Konsole anmelden',
    footerNav: 'Fußzeile',
    rights: 'Alle Rechte vorbehalten. Eingetragen in Singapur.',
    legalNote: 'Rechtstexte auf Englisch:',
    social: 'Camzify in sozialen Medien',
    on: 'auf',
  },
} as const;

/**
 * Evaluated once, at module load. The footer is a server component inside a statically
 * prerendered tree, so this is baked into the HTML at build time and never re-evaluated
 * on the client. Kept out of JSX so the SSR lint's blanket rule against `new Date()` in
 * render still holds.
 */
const COPYRIGHT_YEAR = new Date().getFullYear();

export function SiteFooter({ locale = 'en' }: { locale?: Locale }) {
  const c = COPY[locale];
  const columns = locale === 'de' ? columnsDe : columnsEn;
  const legal = locale === 'de' ? legalDe : legalEn;
  return (
    <footer lang={LOCALES[locale].htmlLang} className="border-t border-border bg-muted/40 dark:bg-card">
      {/* Brand row */}
      <div className="mx-auto max-w-site px-6 pt-16 pb-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link href={LOCALES[locale].home} className="inline-flex items-center" aria-label={`${siteConfig.name} ${locale === 'de' ? 'Startseite' : 'home'}`}>
              <SiteLogo className="h-9 w-auto" />
            </Link>
            <p className="mt-6 max-w-sm text-body leading-relaxed text-muted-foreground">
              {c.tagline}
            </p>
            <dl className="mt-8 grid gap-4 text-sm">
              <div className="flex gap-3">
                <dt className="sr-only">{c.office}</dt>
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <dd className="text-muted-foreground"><span className="text-foreground">{siteConfig.legalName}</span><br />{formattedAddress}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">{c.phone}</dt>
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <dd><a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{siteConfig.phone}</a></dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">{c.email}</dt>
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <dd><a href={`mailto:${siteConfig.email}`} className="rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{siteConfig.email}</a></dd>
              </div>
            </dl>
            <a href={siteConfig.appUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {c.signIn} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <NewsletterForm locale={locale} />
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-site px-6 py-14">
          <nav aria-label={c.footerNav} className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
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
        <div className="mx-auto flex max-w-site flex-col gap-5 px-6 py-6 text-xs text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
          <p>© {COPYRIGHT_YEAR} {siteConfig.legalName}. {c.rights}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {c.legalNote && <li className="text-muted-foreground/80">{c.legalNote}</li>}
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} hrefLang={locale === 'de' ? 'en-US' : undefined} className="transition-colors hover:text-foreground">{l.label}</Link>
                </li>
              ))}
            </ul>
            <ul className="flex items-center gap-1 sm:border-l sm:border-border sm:pl-6" aria-label={c.social}>
              {siteConfig.social.map((p) => {
                const Icon = SOCIAL_ICON[p.icon];
                return (
                  <li key={p.href}>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${siteConfig.name} ${c.on} ${p.label}`}
                      title={p.label}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
