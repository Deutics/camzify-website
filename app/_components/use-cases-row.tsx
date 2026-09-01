import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

/**
 * Use-case row.
 *
 * The homepage previously linked to no use-case pages at all, despite thirteen of them
 * existing and matching some of the highest-intent search terms in the category. These
 * six are the ones with the clearest commercial intent.
 */
const useCases = [
  {
    title: 'Perimeter security',
    href: '/use-cases/perimeter-security',
    desc: 'Fence lines and gates checked every round, with directional rules so passing traffic stays quiet.',
  },
  {
    title: 'After-hours monitoring',
    href: '/use-cases/after-hours-monitoring',
    desc: 'The hours nobody is rostered — patrolled on a schedule you set, with a report each morning.',
  },
  {
    title: 'Guard tour verification',
    href: '/use-cases/guard-tour-verification',
    desc: 'Evidence the round happened, per checkpoint, without relying on a signed sheet.',
  },
  {
    title: 'Theft prevention',
    href: '/use-cases/theft-prevention',
    desc: 'Stockrooms, docks and high-value areas verified clear at close and intact at open.',
  },
  {
    title: 'Remote site monitoring',
    href: '/use-cases/remote-site-monitoring',
    desc: 'Unmanned locations where the nearest responder is an hour away and early detection is everything.',
  },
  {
    title: 'Loading dock monitoring',
    href: '/use-cases/loading-dock-monitoring',
    desc: 'Doors left open outside a delivery window, and vehicle movement when the bay should be closed.',
  },
];

export function UseCasesRow() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Use Cases</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                What teams actually run it for
              </h2>
            </div>
            <Link
              href="/use-cases"
              className="rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              All use cases <span aria-hidden="true">→</span>
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u, i) => (
            <ScrollReveal key={u.href} delay={i * 0.04}>
              <Link
                href={u.href}
                className="group flex h-full flex-col bg-card p-7 transition-colors duration-normal hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <h3 className="font-display text-lg font-bold transition-colors group-hover:text-primary">
                  {u.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{u.desc}</p>
                <span
                  aria-hidden="true"
                  className="mt-4 text-muted-foreground transition-transform duration-fast group-hover:translate-x-1 group-hover:text-primary"
                >
                  →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
