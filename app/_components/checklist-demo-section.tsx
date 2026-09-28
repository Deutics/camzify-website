import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { SectionAtmosphere } from '@/components/motion/section-atmosphere';
import { InteractiveChecklistDemo } from '@/components/motion/interactive-checklist-demo';
import { DemoFrame } from '@/components/motion/demo-frame';
import { hrefFor, isForeignFor, type Locale } from '@/lib/i18n';

/**
 * The interactive demo.
 *
 * Previously a centered heading with the demo card floating alone in a wide empty band,
 * which made the most distinctive thing on the page look like an afterthought. Now a
 * two-column layout: the argument on the left, the working demo on the right, with the
 * section's atmosphere glow sitting behind the demo so it reads as the focal point.
 *
 * Renders on the English home and the German home (`locale="de"`). The demo itself is
 * faux console UI and stays English, as the console is; the German prose says so once.
 * `id="patrol-demo"` is the in-page anchor on both pages.
 */
const WALKTHROUGH_HREF = '/guides/how-to-run-a-virtual-patrol-round';

const COPY = {
  en: {
    eyebrow: 'Interactive demo · not a screenshot',
    heading: 'Run a patrol round in 20 seconds',
    body: 'The card on the right is a working demo: click it. Step through three cameras and mark each checklist item. Fail one and you will be asked whether to message the guard, and then the round will not let you move on until the item is either fixed and re-checked or held as pending with a reason.',
    points: [
      ['01', 'Every camera on the route gets its own checklist'],
      ['02', 'A failed item offers a message to the guard responsible for that camera'],
      ['03', 'No item can be left failing — it is fixed and re-checked, or marked pending with a reason'],
      ['04', 'A fixed item is filed with both frames: as found, and after the fix'],
      ['05', 'The round is scored and archived as a web report and a PDF'],
    ],
    link: 'Read the full walkthrough',
  },
  de: {
    eyebrow: 'Interaktive Demo · kein Screenshot',
    heading: 'Einen Rundgang in 20 Sekunden durchführen',
    body: 'Die Karte rechts ist eine funktionierende Demo: Klicken Sie hinein. Gehen Sie drei Kameras durch und bewerten Sie jeden Checklistenpunkt. Ist ein Punkt nicht erfüllt, werden Sie gefragt, ob die Wachperson benachrichtigt werden soll, und der Rundgang lässt Sie erst weiter, wenn der Punkt entweder behoben und erneut geprüft oder mit Begründung als ausstehend vermerkt ist. Die Demo ist, wie die Konsole, auf Englisch.',
    points: [
      ['01', 'Jede Kamera auf der Route hat ihre eigene Checkliste'],
      ['02', 'Ein nicht erfüllter Punkt bietet eine Nachricht an die Wachperson an, die für diese Kamera zuständig ist'],
      ['03', 'Kein Punkt bleibt einfach nicht erfüllt – er wird behoben und erneut geprüft oder mit Begründung als ausstehend vermerkt'],
      ['04', 'Ein behobener Punkt wird mit beiden Bildern abgelegt: wie vorgefunden und nach der Behebung'],
      ['05', 'Der Rundgang wird bewertet und als Kontrollprotokoll im Web und als PDF archiviert'],
    ],
    link: 'Die vollständige Anleitung lesen',
  },
} as const;

export function ChecklistDemoSection({ locale = 'en' }: { locale?: Locale } = {}) {
  const c = COPY[locale];
  const walkthroughForeign = isForeignFor(WALKTHROUGH_HREF, locale);
  return (
    <section id="patrol-demo" className="relative scroll-mt-24 overflow-hidden bg-muted/20 py-20 sm:py-24">
      <SectionAtmosphere variant="right" />

      <div className="relative z-10 mx-auto max-w-site px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <ScrollReveal>
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-mono-sm uppercase text-primary"><span className="h-2 w-2 animate-pulse-dot rounded-full bg-live" aria-hidden="true" />{c.eyebrow}</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {c.heading}
              </h2>
              <p className="mt-5 max-w-prose text-body leading-relaxed text-muted-foreground">
                {c.body}
              </p>

              <ul className="mt-8 space-y-3.5">
                {c.points.map(([n, label]) => (
                  <li key={n} className="flex items-start gap-3.5">
                    <span className="mt-0.5 font-mono text-mono-sm text-primary tabular-nums">
                      {n}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{label}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={hrefFor(WALKTHROUGH_HREF, locale)}
                hrefLang={walkthroughForeign ? 'en-US' : undefined}
                className="mt-8 inline-flex items-center gap-2 rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {walkthroughForeign ? `${c.link} (auf Englisch) ` : `${c.link} `}<ArrowRight className="h-4 w-4" aria-hidden="true" />
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
              <DemoFrame>
                <InteractiveChecklistDemo />
              </DemoFrame>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
