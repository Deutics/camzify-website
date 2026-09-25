import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ArrowRight } from 'lucide-react';
import { SiteImage } from '@/components/content/site-image';

const guides = [
  {
    title: 'What Is Virtual Patrolling?',
    desc: 'A complete guide to how AI-driven patrol rounds replace physical guard tours.',
    href: '/guides/what-is-virtual-patrolling',
    thumb: '/guide-thumb-what-is-virtual-patrolling.webp',
  },
  {
    title: 'Security Guard Cost Per Hour',
    desc: 'Real numbers on what manned guarding costs across regions and contract types.',
    href: '/guides/security-guard-cost-per-hour',
    thumb: '/guide-thumb-security-guard-cost-per-hour.webp',
  },
  {
    title: 'How to Reduce False Alarms',
    desc: 'Why legacy motion detection floods your team with noise, and how object-tracking fixes it.',
    href: '/guides/how-to-reduce-false-alarms',
    thumb: '/guide-thumb-how-to-reduce-false-alarms.webp',
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
          {guides.map((g, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <Link
                href={g.href}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="aspect-video w-full overflow-hidden border-b border-border bg-muted/30">
                  <SiteImage src={g.thumb} alt={`Cover illustration for the guide ${g.title}`} width={821} height={462} sizes="(max-width: 640px) 100vw, 33vw" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold group-hover:text-primary">
                    {g?.title ?? ''}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{g?.desc ?? ''}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Read guide <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
