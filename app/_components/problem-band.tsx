import { EyeOff, VideoOff, BellOff } from 'lucide-react';
import { Stagger, StaggerItem } from '@/components/motion/stagger';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { SectionAtmosphere } from '@/components/motion/section-atmosphere';
import type { Locale } from '@/lib/i18n';

/**
 * The problem statement.
 *
 * Icons are back, but not as the identical tinted rounded square this page used five
 * times over. Here they sit inside the left rule as a hairline marker, so they read as
 * part of the rule rather than as a card ornament — the device stays unique to this
 * section.
 */
const icons = [EyeOff, VideoOff, BellOff];

const COPY = {
  en: {
    eyebrow: 'The gap',
    heading: 'Cameras everywhere. Nobody watching.',
    problems: [
      {
        lead: 'A guard covers one place at a time.',
        body: 'Your sites run around the clock across multiple zones. One person walking a route reaches any given point for a few minutes an hour, and attention measurably degrades after the first.',
        stat: '1 of 12',
        statLabel: 'cameras watched at once',
      },
      {
        lead: 'Cameras record. They do not check.',
        body: 'Conventional CCTV captures everything and reviews nothing. Footage is consulted only once an incident has been reported, by which point it is evidence rather than prevention.',
        stat: 'After',
        statLabel: 'the fact, every time',
      },
      {
        lead: 'Alerts arrive with nobody attached.',
        body: 'Pixel-based motion floods an inbox with events carrying no context, no owner and no record that anyone acted. Teams stop reading them, or turn sensitivity down until real events are missed too.',
        stat: 'No owner',
        statLabel: 'no acknowledgment trail',
      },
    ],
  },
  de: {
    eyebrow: 'Die Lücke',
    heading: 'Überall Kameras. Niemand schaut hin.',
    problems: [
      {
        lead: 'Eine Wachperson ist immer nur an einem Ort.',
        body: 'Ihre Standorte laufen rund um die Uhr über mehrere Bereiche hinweg. Eine Person, die eine Route abgeht, erreicht jeden einzelnen Punkt nur für wenige Minuten pro Stunde, und ihre Aufmerksamkeit lässt nach der ersten Stunde messbar nach.',
        stat: '1 von 12',
        statLabel: 'Kameras gleichzeitig im Blick',
      },
      {
        lead: 'Kameras zeichnen auf. Sie prüfen nicht.',
        body: 'Herkömmliche Videoüberwachung zeichnet alles auf und wertet nichts aus. Aufnahmen werden erst gesichtet, wenn ein Vorfall gemeldet wurde – dann sind sie Beweismittel statt Prävention.',
        stat: 'Im Nachhinein',
        statLabel: 'jedes Mal',
      },
      {
        lead: 'Alarme kommen an, aber niemand ist zuständig.',
        body: 'Pixelbasierte Bewegungserkennung flutet den Posteingang mit Ereignissen ohne Kontext, ohne Zuständigen und ohne Nachweis, dass jemand reagiert hat. Teams lesen sie nicht mehr oder senken die Empfindlichkeit, bis auch echte Ereignisse übersehen werden.',
        stat: 'Niemand zuständig',
        statLabel: 'kein Nachweis der Quittierung',
      },
    ],
  },
} as const;

export function ProblemBand({ locale = 'en' }: { locale?: Locale }) {
  const c = COPY[locale];
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <SectionAtmosphere variant="left" intensity="subtle" />

      <div className="relative z-10 mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="font-mono text-mono-sm uppercase text-primary">{c.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {c.heading}
            </h2>
          </div>
        </ScrollReveal>

        <Stagger className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-10">
          {c.problems.map((p, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem key={p.lead}>
                <div className="group relative h-full pl-7">
                  {/* The rule is the device — it brightens from the icon downward on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-critical/60 via-border to-transparent transition-all duration-slow group-hover:from-critical"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -left-[9px] top-0 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-critical/40 bg-background transition-colors duration-normal group-hover:border-critical"
                  >
                    <Icon className="h-2.5 w-2.5 text-critical" />
                  </span>

                  <p className="font-display text-xl font-bold leading-snug sm:text-2xl">
                    {p.lead}
                  </p>
                  <p className="mt-4 text-body leading-relaxed text-muted-foreground">{p.body}</p>

                  <p className="mt-6 border-t border-border pt-4">
                    <span className="font-mono text-sm text-critical">{p.stat}</span>{' '}
                    <span className="font-mono text-mono-sm uppercase text-muted-foreground">
                      {p.statLabel}
                    </span>
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
