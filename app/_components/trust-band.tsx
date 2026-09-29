import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { hrefFor, isForeignFor, type Locale } from '@/lib/i18n';

/**
 * Trust band, directly under the hero.
 *
 * Enterprise buyers look for provenance before they read features, and the page had
 * none. Every claim here is verifiable: a registered legal entity, encryption the
 * security page documents, protocol compatibility the connectivity pages document,
 * and compliance work stated as **in progress** rather than as certification held.
 *
 * Deliberately not here: customer counts, logos, uptime figures. Nothing on this band
 * may be added unless it can be substantiated — see /trust.
 *
 * The words switch by `locale`; the legal name and locality come from siteConfig on
 * both sides. A German card that links to an English-only page is marked "(EN)".
 */
type Fact = { label: string; value: string; detail: string; href: string };

const COPY: Record<Locale, { ariaLabel: string; facts: Fact[] }> = {
  en: {
    ariaLabel: 'Company and platform credentials',
    facts: [
      {
        label: 'Built by',
        value: siteConfig.legalName,
        detail: `${siteConfig.address.locality} · registered entity`,
        href: '/about',
      },
      {
        label: 'Compliance',
        value: 'PDPA · GDPR · SOC 2 · ISO 27001',
        detail: 'Alignment in progress — none yet held',
        href: '/security-and-compliance',
      },
      {
        label: 'Encryption',
        value: 'TLS 1.2+ · AES-256',
        detail: 'In transit and at rest',
        href: '/security-and-compliance',
      },
      {
        label: 'Camera support',
        value: 'ONVIF · RTSP · RTMP · HLS · WebRTC',
        detail: 'No proprietary hardware',
        href: '/supported-cameras',
      },
      {
        label: 'Deployment',
        value: 'Cloud · On premises · Hybrid',
        detail: 'On-site installs set up by Camzify',
        href: '/platform/deployment-options',
      },
    ],
  },
  de: {
    ariaLabel: 'Nachweise zu Unternehmen und Plattform',
    facts: [
      {
        label: 'Entwickelt von',
        value: siteConfig.legalName,
        detail: `${siteConfig.address.locality} · eingetragenes Unternehmen`,
        href: '/about',
      },
      {
        label: 'Compliance',
        value: 'PDPA · DSGVO · SOC 2 · ISO 27001',
        detail: 'In Vorbereitung – noch keine erteilt',
        href: '/security-and-compliance',
      },
      {
        label: 'Verschlüsselung',
        value: 'TLS 1.2+ · AES-256',
        detail: 'Bei Übertragung und Speicherung',
        href: '/security-and-compliance',
      },
      {
        label: 'Kameras',
        value: 'ONVIF · RTSP · RTMP · HLS · WebRTC',
        detail: 'Keine proprietäre Hardware',
        href: '/supported-cameras',
      },
      {
        label: 'Bereitstellung',
        value: 'Cloud · On-Premises · Hybrid',
        detail: 'Installationen vor Ort richtet Camzify ein',
        href: '/platform/deployment-options',
      },
    ],
  },
};

export function TrustBand({ locale = 'en' }: { locale?: Locale }) {
  const { ariaLabel, facts } = COPY[locale];
  return (
    <section aria-label={ariaLabel} className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-site px-6">
        <ul className="grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
          {facts.map((f) => (
            <li key={f.label} className="py-6 lg:px-5 lg:first:pl-0 lg:last:pr-0">
              <Link
                href={hrefFor(f.href, locale)}
                hrefLang={isForeignFor(f.href, locale) ? 'en-US' : undefined}
                className="group block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="font-mono text-mono-sm uppercase text-muted-foreground">
                  {f.label}
                  {isForeignFor(f.href, locale) && ' (EN)'}
                </span>
                <span className="mt-2 block text-sm font-semibold leading-snug transition-colors group-hover:text-primary">
                  {f.value}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">{f.detail}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
