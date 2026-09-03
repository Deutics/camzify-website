import Image from 'next/image';
import Link from 'next/link';

/**
 * Customer logo strip.
 *
 * Populated 2026-09-03 from artwork supplied by the business. It stayed empty until
 * then on purpose: a logo strip is the strongest trust claim a B2B page makes, and
 * inventing one would have contradicted /trust on the element a buyer scrutinises
 * hardest.
 *
 * Rendering: every mark sits on a white plate, in both themes. The supplied files are
 * colour marks, most of them JPEGs on white — Lum Chang's red, Starville's blue block,
 * Kensington Park's gold — and the earlier `dark:invert` treatment would have turned
 * each into a wrong logo. On a white plate each renders exactly as the customer
 * publishes it. Same rule, same class, as the camera brand strip.
 *
 * Marks are capped on both axes. A height cap alone crushes the square crests (PSCA,
 * Starville) while the wide lockups (Secura, Soverus) are width-bound anyway; the two
 * constraints together make different shapes read as one size.
 *
 * The supplied set had one duplicate — Kandis Residence in a brown-card colourway and
 * a white one; the white one is used. One further crest (a heart, a cross and the
 * letters CH) is in public/customers/ch-crest.webp but is not listed here until the
 * business confirms the company name: a logo published under a guessed name is worse
 * than one held back.
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
  /** Optional — only when the customer has approved a linked case study. */
  href?: string;
}

export const customerLogos: CustomerLogo[] = [
  { name: 'Lum Chang Holdings', logo: '/customers/lum-chang-holdings.webp' },
  { name: 'Secura Group', logo: '/customers/secura-group.webp' },
  { name: 'Soverus Security Solutions', logo: '/customers/soverus.webp' },
  { name: 'PSCA', logo: '/customers/psca.webp' },
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
        <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {customerLogos.map((c) => {
            const mark = (
              <span className="brand-plate flex h-20 items-center justify-center rounded-lg px-5 transition-transform duration-normal group-hover:-translate-y-0.5">
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={180}
                  height={48}
                  className="max-h-12 w-auto max-w-[150px] object-contain"
                />
              </span>
            );
            return (
              <li key={c.name} className="group">
                {c.href ? (
                  <Link href={c.href} className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {mark}
                  </Link>
                ) : (
                  mark
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-center text-xs text-muted-foreground">
          Customer names and logos are trademarks of their respective owners and are shown with permission.
        </p>
      </div>
    </section>
  );
}
