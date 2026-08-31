import { ScrollReveal } from '@/components/motion/scroll-reveal';

export interface DeploymentPhase {
  title: string;
  body: string;
}

/**
 * "What a first deployment looks like" — the block that replaced the empty case-study
 * placeholders on the industry pages.
 *
 * Deliberately describes Camzify's own rollout process rather than customer outcomes:
 * it is verifiable, it answers the question a buyer actually has at this point on the
 * page ("what would this take at my site?"), and it does not require publishing
 * customer results we cannot substantiate. Copy is written per industry — sixteen
 * pages sharing one generic block would read as boilerplate to both buyers and
 * search engines.
 */
export function DeploymentPlan({
  phases,
  heading = 'What a first deployment looks like',
}: {
  phases: DeploymentPhase[];
  heading?: string;
}) {
  return (
    <div className="mt-12">
      <ScrollReveal>
        <h2 className="font-display text-2xl font-bold">{heading}</h2>
        <ol className="mt-6 grid gap-5 sm:grid-cols-3">
          {(phases ?? []).map((phase, i) => (
            <li key={i} className="rounded-xl border border-border bg-card p-6">
              <span className="font-mono text-mono-sm uppercase text-primary">
                Step {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-base font-bold">{phase?.title ?? ''}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{phase?.body ?? ''}</p>
            </li>
          ))}
        </ol>
      </ScrollReveal>
    </div>
  );
}
