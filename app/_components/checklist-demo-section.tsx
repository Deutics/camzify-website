import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { SectionAtmosphere } from '@/components/motion/section-atmosphere';
import { InteractiveChecklistDemo } from '@/components/motion/interactive-checklist-demo';

/**
 * The interactive demo.
 *
 * Previously a centered heading with the demo card floating alone in a wide empty band,
 * which made the most distinctive thing on the page look like an afterthought. Now a
 * two-column layout: the argument on the left, the working demo on the right, with the
 * section's atmosphere glow sitting behind the demo so it reads as the focal point.
 */
export function ChecklistDemoSection() {
  return (
    <section className="relative overflow-hidden bg-muted/20 py-20 sm:py-24">
      <SectionAtmosphere variant="right" />

      <div className="relative z-10 mx-auto max-w-site px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <ScrollReveal>
            <div>
              <span className="font-mono text-mono-sm uppercase text-primary">Try it yourself</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Run a patrol round in 20 seconds
              </h2>
              <p className="mt-5 max-w-prose text-body leading-relaxed text-muted-foreground">
                This is the actual loop. Step through three cameras and mark each checklist item.
                Fail one and you will be asked whether to message the guard — and then the round
                will not let you move on until the item is either fixed and re-checked or held as
                pending with a reason.
              </p>

              <ul className="mt-8 space-y-3.5">
                {[
                  ['01', 'Every camera on the route gets its own checklist'],
                  ['02', 'A failed item offers a message to the guard responsible for that camera'],
                  ['03', 'No item can be left failing — it is fixed and re-checked, or marked pending with a reason'],
                  ['04', 'A fixed item is filed with both frames: as found, and after the fix'],
                  ['05', 'The round is scored and archived as a web report and a PDF'],
                ].map(([n, label]) => (
                  <li key={n} className="flex items-start gap-3.5">
                    <span className="mt-0.5 font-mono text-mono-sm text-primary tabular-nums">
                      {n}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{label}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/guides/how-to-run-a-virtual-patrol-round"
                className="mt-8 inline-flex items-center gap-2 rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Read the full walkthrough <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="relative">
              {/* Focal bloom behind the demo card. */}
              <div
                aria-hidden="true"
                className="absolute -inset-8 -z-10 rounded-full blur-3xl motion-safe:animate-hero-glow-drift-b"
                style={{
                  background:
                    'radial-gradient(circle, hsl(var(--primary)/0.18) 0%, transparent 65%)',
                }}
              />
              <InteractiveChecklistDemo />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
