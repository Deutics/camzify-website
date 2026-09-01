import { ScrollReveal } from '@/components/motion/scroll-reveal';

/**
 * The problem statement.
 *
 * Previously three icon-in-a-box cards — the first of five consecutive sections using
 * that same device, which gave the page one flat texture from hero to footer. A problem
 * statement is prose, not a feature list, so it is set as prose: large type, a left
 * rule, no cards, no icons.
 */
const problems = [
  {
    lead: 'A guard covers one place at a time.',
    body: 'Your sites run around the clock across multiple zones. One person walking a route reaches any given point for a few minutes an hour, and attention measurably degrades after the first.',
  },
  {
    lead: 'Cameras record. They do not check.',
    body: 'Conventional CCTV captures everything and reviews nothing. The footage is only consulted once an incident has already been reported, by which point it is evidence rather than prevention.',
  },
  {
    lead: 'Alerts arrive with nobody attached.',
    body: 'Pixel-based motion floods an inbox with events that carry no context, no assigned owner, and no record that anyone acted. Teams either stop reading them or turn the sensitivity down until real events are missed too.',
  },
];

export function ProblemBand() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="font-mono text-mono-sm uppercase text-primary">The gap</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Cameras everywhere. Nobody watching.
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-12">
          {problems.map((p, i) => (
            <ScrollReveal key={p.lead} delay={i * 0.08}>
              <div className="border-l-2 border-critical/50 pl-6">
                <p className="font-display text-xl font-bold leading-snug sm:text-2xl">{p.lead}</p>
                <p className="mt-4 text-body leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
