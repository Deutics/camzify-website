import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { InteractiveChecklistDemo } from '@/components/motion/interactive-checklist-demo';

export function ChecklistDemoSection() {
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-prose text-center">
            <span className="font-mono text-mono-sm uppercase text-primary">Try It Yourself</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Run a patrol round in 20 seconds
            </h2>
            <p className="mt-4 text-body text-muted-foreground">
              Step through three cameras, answer each checklist item, and see the compliance
              report Camzify generates automatically after every round.
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-12">
          <InteractiveChecklistDemo />
        </div>
      </div>
    </section>
  );
}
