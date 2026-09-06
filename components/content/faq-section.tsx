import type { ReactNode } from 'react';
import { FAQAccordion, type FAQItem } from '@/components/content/faq-accordion';

/*
 * The one FAQ treatment for the whole site.
 *
 * Before this, FAQs were rendered five different ways: a bordered card with an eyebrow,
 * a centered heading over a narrow column, a homepage-only block, the use-case
 * renderer's own copy of the card, and two pages with the eyebrow left empty. Every
 * page now renders this. The heading is the same everywhere unless a page has a reason
 * to ask a different question of its reader, and the schema is still emitted once by
 * PageShell from the same array, so the visible answers and the FAQPage node cannot
 * drift.
 */
export function FaqSection({
  items,
  heading = 'Frequently asked questions',
  eyebrow = 'FAQ',
  id = 'faq',
  inline = false,
  lede,
  className = '',
}: {
  items: FAQItem[];
  heading?: string;
  eyebrow?: string;
  id?: string;
  /** Render only the card, for placement inside a page's own container. */
  inline?: boolean;
  /** One short paragraph under the heading, e.g. where to go if the question is not here. */
  lede?: ReactNode;
  className?: string;
}) {
  if (!items?.length) return null;
  const card = (
    <div id={inline ? id : undefined} className="rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10">
      <span className="font-mono text-mono-sm uppercase text-primary">{eyebrow}</span>
      <h2 id={`${id}-heading`} className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">{heading}</h2>
      {lede && <p className="mt-4 max-w-prose text-body text-muted-foreground">{lede}</p>}
      <div className="mt-6">
        <FAQAccordion items={items} />
      </div>
    </div>
  );
  if (inline) return <div className={`mt-16 ${className}`}>{card}</div>;
  return (
    <section id={id} className={`pb-16 ${className}`} aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-site px-6">{card}</div>
    </section>
  );
}
