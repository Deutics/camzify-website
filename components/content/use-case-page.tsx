import type { ReactNode } from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { SiteImage } from '@/components/content/site-image';
import { SectionVisual, type ChecklistRow } from '@/components/content/section-visual';
import { FAQAccordion, type FAQItem } from '@/components/content/faq-accordion';
import { ArrowRight } from 'lucide-react';

/**
 * The body of a use-case page. Each page.tsx keeps its own pageMeta, schema and FAQ
 * array (the things PageShell and the crawlers need per route) and hands the content
 * here, so thirteen pages share one layout and none of them shares a sentence.
 *
 * The order is the order a buyer asks the questions in: what the problem is, what the
 * platform does about it, what the patrol round for it actually checks, what it will
 * not do, and where it applies. The checklist illustration takes the page's own rows,
 * so the visual matches the copy beside it.
 */
export interface UseCaseContent {
  eyebrow: string;
  title: string;
  lede: ReactNode;
  facts: [string, string, string];
  image: { src: string; alt: string };
  secondary: { href: string; label: string };
  problem: {
    heading: string;
    paras: ReactNode[];
    visual: 'notification' | 'route' | 'report' | 'schedule' | 'compliance' | 'sites' | 'flow';
    caption: string;
    alt: string;
    steps?: string[];
  };
  handles: {
    heading: string;
    paras: ReactNode[];
    detections: { href: string; name: string; role: string }[];
  };
  round: {
    heading: string;
    label: string;
    guard: string;
    items: ChecklistRow[];
    caption: string;
    paras: ReactNode[];
  };
  limits: { heading: string; paras: ReactNode[] };
  industries: { href: string; name: string }[];
  faqs: FAQItem[];
}

export function UseCasePage({ c }: { c: UseCaseContent }) {
  return (
    <>
      <FeatureHero
        eyebrow={c.eyebrow}
        title={c.title}
        lede={c.lede}
        facts={c.facts}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={c.secondary}
        visual={
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <SiteImage src={c.image.src} alt={c.image.alt} className="w-full" width={1229} height={692} priority sizes="(max-width: 1024px) 100vw, 45vw" />
          </div>
        }
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">The problem</span>
              <h2 className="mt-2 font-display text-2xl font-bold">{c.problem.heading}</h2>
              {c.problem.paras.map((p, i) => (
                <p key={i} className="mt-4 max-w-prose text-muted-foreground">{p}</p>
              ))}
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionVisual variant={c.problem.visual} steps={c.problem.steps} caption={c.problem.caption} alt={c.problem.alt} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">How Camzify handles it</span>
              <h2 className="mt-2 font-display text-2xl font-bold">{c.handles.heading}</h2>
              {c.handles.paras.map((p, i) => (
                <p key={i} className="mt-4 max-w-prose text-muted-foreground">{p}</p>
              ))}
            </ScrollReveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.handles.detections.map((d) => (
                <Link key={d.href} href={d.href} className="group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
                  <span className="font-mono text-mono-sm uppercase text-primary">Detection</span>
                  <h3 className="mt-2 font-display text-base font-bold group-hover:text-primary">{d.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.role}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-[2fr_3fr]">
            <ScrollReveal>
              <SectionVisual variant="checklist" items={c.round.items} label={c.round.label} guard={c.round.guard} caption={c.round.caption} alt={`Patrol checklist for ${c.round.label}: ${c.round.items.map((r) => r[0]).join(', ')}`} />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <span className="font-mono text-mono-sm uppercase text-primary">The patrol round</span>
              <h2 className="mt-2 font-display text-2xl font-bold">{c.round.heading}</h2>
              {c.round.paras.map((p, i) => (
                <p key={i} className="mt-4 max-w-prose text-muted-foreground">{p}</p>
              ))}
              <p className="mt-4 max-w-prose text-muted-foreground">
                A check found Not Compliant captures a snapshot and messages the guard designated for
                that camera; on a manual round the operator chooses to send it, on an automated round
                it goes on its own. The item stays Pending until it is marked Fixed, which captures the
                after frame, and the{' '}
                <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link>{' '}
                shows both.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">{c.limits.heading}</h2>
              {c.limits.paras.map((p, i) => (
                <p key={i} className="mt-4 max-w-prose text-muted-foreground">{p}</p>
              ))}
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Industries where this applies</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {c.industries.map((ind) => (
                  <Link key={ind.href} href={ind.href} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/30 hover:text-primary">
                    {ind.name} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
            <span className="font-mono text-mono-sm uppercase text-primary">FAQ</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-6">
              <FAQAccordion items={c.faqs} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
