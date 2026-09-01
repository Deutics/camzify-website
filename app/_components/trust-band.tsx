import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

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
 */
const facts = [
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
];

export function TrustBand() {
  return (
    <section aria-label="Company and platform credentials" className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-site px-6">
        <ul className="grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {facts.map((f) => (
            <li key={f.label} className="py-6 lg:px-7 lg:first:pl-0 lg:last:pr-0">
              <Link
                href={f.href}
                className="group block rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="font-mono text-mono-sm uppercase text-muted-foreground">
                  {f.label}
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
