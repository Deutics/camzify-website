import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { EyeOff, Video, Bell } from 'lucide-react';

const problems = [
  {
    icon: EyeOff,
    title: 'Guards can\'t be everywhere',
    desc: 'A single guard covers one location. Your sites run 24/7 across multiple zones — and fatigue sets in after the first hour.',
  },
  {
    icon: Video,
    title: 'Cameras record but don\'t check',
    desc: 'Traditional CCTV captures footage. Nobody reviews it until something goes wrong. By then the damage is done.',
  },
  {
    icon: Bell,
    title: 'Alerts arrive with no owner',
    desc: 'Motion alerts flood the inbox with no context, no assignment, and no way to prove someone acted on them.',
  },
];

export function ProblemBand() {
  return (
    <section className="border-y border-border bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-site px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {(problems ?? []).map((p: any, i: number) => {
            const Icon = p?.icon ?? EyeOff;
            return (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{p?.title ?? ''}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p?.desc ?? ''}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
