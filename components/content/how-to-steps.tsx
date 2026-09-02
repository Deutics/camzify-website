import { ScrollReveal } from '@/components/motion/scroll-reveal';

/**
 * Numbered steps for a how-to guide.
 *
 * The same `steps` array is passed here and to `howToSchema`, which is the point of
 * splitting this out: the visible instructions and the HowTo structured data are
 * rendered from one source, so they cannot drift apart as a guide is edited. A HowTo
 * whose schema describes different steps from the page is worse than no schema.
 */
export interface HowToStep {
  name: string;
  text: string;
}

export function HowToSteps({ steps }: { steps: HowToStep[] }) {
  return (
    <ol className="mt-12 max-w-prose space-y-10">
      {steps.map((step, i) => (
        <ScrollReveal key={step.name} delay={i * 0.06}>
          <li className="flex gap-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
              {i + 1}
            </span>
            <div>
              <h2 className="font-display text-xl font-bold">{step.name}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          </li>
        </ScrollReveal>
      ))}
    </ol>
  );
}

/** A single practical warning or tip, set apart from the steps. */
export function HowToNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-12 max-w-prose rounded-xl border border-border bg-card p-6">
      <p className="leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}
