import { LogoMarquee } from '@/components/motion/logo-marquee';

/**
 * Customer logo strip.
 *
 * Populated 2026-09-03 from artwork supplied by the business. It stayed empty until
 * then on purpose: a logo strip is the strongest trust claim a B2B page makes, and
 * inventing one would have contradicted /trust on the element a buyer scrutinizes
 * hardest.
 *
 * Rendered as a rolling strip, the same device as the camera-brand strip further down
 * the page and for the same reason: this is recognition, not reference. It runs the
 * opposite direction to that one so the page does not repeat itself.
 *
 * The supplied set had one duplicate — Kandis Residence in a brown-card colourway and
 * a white one; the white one is used.
 *
 * Permission: the artwork was supplied by the business for this use. Security
 * customers are sensitive about being named — being identified as running a
 * particular surveillance stack is itself information about a site — so keep the list
 * to customers who have agreed to appear.
 */
export interface CustomerLogo {
  name: string;
  /** Path under /public. */
  logo: string;
}

export const customerLogos: CustomerLogo[] = [
  { name: 'Lum Chang Holdings', logo: '/customers/lum-chang-holdings.webp' },
  { name: 'Secura Group', logo: '/customers/secura-group.webp' },
  { name: 'Soverus Security Solutions', logo: '/customers/soverus.webp' },
  { name: 'PSCA', logo: '/customers/psca.webp' },
  { name: 'Ju Eng Home', logo: '/customers/ju-eng-home.webp' },
  { name: 'Kandis Residence', logo: '/customers/kandis-residence.webp' },
  { name: 'Kensington Park', logo: '/customers/kensington-park.webp' },
  { name: 'Starville', logo: '/customers/starville.webp' },
  { name: 'LIV on Wilkie', logo: '/customers/liv-on-wilkie.webp' },
  { name: 'Carros', logo: '/customers/carros.webp' },
  { name: '10 Evelyn', logo: '/customers/10-evelyn.webp' },
];

export function CustomerLogos({
  heading = 'Sites and operations teams running Camzify',
  className = '',
}: {
  heading?: string;
  className?: string;
}) {
  if (customerLogos.length === 0) return null;

  return (
    <section aria-label="Customers" className={`border-y border-border bg-card/30 py-12 ${className}`}>
      <div className="mx-auto max-w-site px-6">
        <p className="text-center font-mono text-mono-sm uppercase text-muted-foreground">{heading}</p>
        <LogoMarquee items={customerLogos} direction="right" className="mt-7" />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Customer names and logos are trademarks of their respective owners and are shown with permission.
        </p>
      </div>
    </section>
  );
}
