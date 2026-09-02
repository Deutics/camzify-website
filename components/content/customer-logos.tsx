import Image from 'next/image';

/**
 * Customer logo strip.
 *
 * DELIBERATELY EMPTY. The component is built and wired; the data is not populated,
 * and it renders nothing at all while `customerLogos` is empty.
 *
 * That is not an oversight. A logo strip is the single strongest trust claim a B2B
 * page can make — "these companies chose us" — and filling it with invented or
 * placeholder companies is fabricated social proof. The /trust page publicly commits
 * to not publishing claims the business cannot substantiate, and /llms.txt repeats
 * that commitment to AI crawlers. Shipping dummy logos would contradict both, on the
 * one element a sceptical buyer scrutinises hardest.
 *
 * TO ACTIVATE, once real customers have given written permission to be named:
 *   1. Drop each logo in public/customers/ (SVG preferred, or PNG on transparency)
 *   2. Add an entry below
 *   3. Add <CustomerLogos /> to the homepage, under the hero
 *
 * Permission matters as much as the artwork: many enterprise contracts prohibit a
 * vendor naming the customer publicly without sign-off, and security customers are
 * more sensitive about it than most — being publicly identified as running a
 * particular surveillance stack is itself information about their site.
 */
export interface CustomerLogo {
  name: string;
  /** Path under /public, e.g. '/customers/acme.svg' */
  logo: string;
  /** Optional — only when the customer has approved a linked case study. */
  href?: string;
}

export const customerLogos: CustomerLogo[] = [];

export function CustomerLogos({
  heading = 'Operations teams running Camzify',
  className = '',
}: {
  heading?: string;
  className?: string;
}) {
  if (customerLogos.length === 0) return null;

  return (
    <section aria-label="Customers" className={`border-y border-border bg-card/30 py-10 ${className}`}>
      <div className="mx-auto max-w-site px-6">
        <p className="text-center font-mono text-mono-sm uppercase text-muted-foreground">{heading}</p>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {customerLogos.map((c) => {
            const mark = (
              <Image
                src={c.logo}
                alt={c.name}
                width={160}
                height={44}
                className="h-8 w-auto opacity-60 transition-opacity duration-normal hover:opacity-100 dark:invert dark:brightness-0 dark:contrast-200"
              />
            );
            return (
              <li key={c.name}>
                {c.href ? (
                  <a
                    href={c.href}
                    className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {mark}
                  </a>
                ) : (
                  mark
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
