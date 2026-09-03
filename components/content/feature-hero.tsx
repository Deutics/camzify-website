import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

/**
 * Opening section for a feature sub-page.
 *
 * Every virtual patrolling sub-page opened the same way: eyebrow, h1, one paragraph,
 * then straight into body sections with no visual at all above the fold. Against the
 * homepage — which now leads with a camera wall — the sub-pages looked like they
 * belonged to a different, plainer site.
 *
 * This gives each one the same two-column opening: definition on the left, a visual on
 * the right, and an optional pair of actions. The `lede` should be written to be
 * extracted whole — open with the definition, bold the sentence an answer engine
 * should quote, and let the rest of the paragraph elaborate.
 *
 * `visual` is any node. Pass a `<SiteImage>` once a real photograph exists, and a
 * `<HeroPlaceholder>` until then; the layout does not change when the swap happens.
 */
export function FeatureHero({
  eyebrow,
  title,
  lede,
  visual,
  primary,
  secondary,
  facts,
}: {
  eyebrow: string;
  title: string;
  lede: ReactNode;
  visual: ReactNode;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  /** Up to three short, checkable facts shown as a mono strip under the lede. */
  facts?: string[];
}) {
  return (
    <section className="pb-16">
      <div className="mx-auto max-w-site px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <span className="font-mono text-mono-sm uppercase text-primary">{eyebrow}</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 max-w-prose text-body leading-relaxed text-muted-foreground">{lede}</p>

            {(primary || secondary) && (
              <div className="mt-8 flex flex-wrap gap-4">
                {primary && (
                  <Link
                    href={primary.href}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-fast hover:bg-primary/90 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {primary.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
                {secondary && (
                  <Link
                    href={secondary.href}
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {secondary.label}
                  </Link>
                )}
              </div>
            )}

            {facts && facts.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {facts.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-center gap-2 font-mono text-mono-sm uppercase text-muted-foreground">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-live" />
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ScrollReveal delay={0.1}>{visual}</ScrollReveal>
        </div>
      </div>
    </section>
  );
}
