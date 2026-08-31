import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ArrowRight, BookOpen } from 'lucide-react';

const guides = [
  {
    title: 'What Is Virtual Patrolling?',
    desc: 'A complete guide to how AI-driven patrol rounds replace physical guard tours.',
    href: '/guides/what-is-virtual-patrolling',
  },
  {
    title: 'Security Guard Cost Per Hour',
    desc: 'Real numbers on what manned guarding costs across regions and contract types.',
    href: '/guides/security-guard-cost-per-hour',
  },
  {
    title: 'How to Reduce False Alarms',
    desc: 'Why legacy motion detection floods your team with noise — and how object-tracking fixes it.',
    href: '/guides/how-to-reduce-false-alarms',
  },
];

export function GuidesPreview() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono text-mono-sm uppercase text-primary">Buyer Guides</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Make an informed decision
              </h2>
            </div>
            <Link
              href="/guides"
              className="hidden items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 sm:inline-flex"
            >
              All guides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {(guides ?? []).map((g: any, i: number) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <Link
                href={g?.href ?? '/'}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
              >
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-display text-lg font-bold group-hover:text-primary">
                  {g?.title ?? ''}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{g?.desc ?? ''}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Read guide <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
