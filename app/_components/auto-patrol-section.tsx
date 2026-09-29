import Link from 'next/link';
import { ArrowRight, Clock, Eye, FileText, ShieldAlert } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { SectionAtmosphere } from '@/components/motion/section-atmosphere';
import { SceneObservation } from '@/components/motion/scene-observation';
import { hrefFor, type Locale } from '@/lib/i18n';

/**
 * Auto-Patrol, placed directly after the manual demo.
 *
 * The order is the argument: the visitor has just walked a round themselves and knows
 * what it involves, which is the moment "and it runs itself every two hours, all
 * night" means something. Leading with automation before showing the round makes it
 * sound like a scheduler.
 *
 * Scene observation gets the visual because it is the part that is genuinely hard to
 * believe from a sentence — that the system looks at moving video rather than a still,
 * and that this is what keeps it from waking someone over a person walking past.
 *
 * Renders on the English home and the German home (`locale="de"`); the locale is passed
 * on to SceneObservation, which carries prose of its own. "Auto-Patrol" is the console's
 * feature name and stays as it is in German.
 */
const COPY = {
  en: {
    eyebrow: 'Auto-Patrol',
    heading: 'The same round, walked by AI, all night',
    lead: 'Auto-Patrol runs the sequence you built on a schedule you set — every fifteen minutes, every two hours, only after closing.',
    leadRest:
      'It stops at each camera in order, works through that camera’s checklist, messages the guard responsible for anything that fails, and files the report before anyone opens a laptop — no operator approving each step. The 3am round happens at 3am, on the fourth night as reliably as the first.',
    subheading: 'It watches. It does not glance.',
    subBody:
      'Set a stop to observe the scene for a moment and the AI assesses live video rather than one still frame — the difference between knowing somebody is in a corridor and knowing whether they stayed. That context is what makes an automated round feel like a guard walking the floor instead of a script ticking boxes.',
    points: [
      [Clock, 'On a schedule', 'Frequency, active hours and active days, in the site’s own timezone.'],
      [Eye, 'With context', 'Judge each stop on a single frame, or on a few seconds of live video.'],
      [ShieldAlert, 'With judgment', 'Flags safety and security risks it sees, even where no checklist item asked.'],
      [FileText, 'With its reasoning shown', 'Each answer is recorded with why — “the metal gate appears to be closed” — not just a tick.'],
    ],
    riskLink: 'Risks it flags beyond the checklist',
    scheduleLink: 'How automated patrolling is scheduled',
  },
  de: {
    eyebrow: 'Auto-Patrol',
    heading: 'Derselbe Rundgang, die ganze Nacht von der KI durchgeführt',
    lead: 'Auto-Patrol führt den von Ihnen erstellten Rundgangsablauf nach einem von Ihnen festgelegten Zeitplan aus – alle fünfzehn Minuten, alle zwei Stunden, nur nach Betriebsschluss.',
    leadRest:
      'Der Rundgang hält an jeder Kamera in der festgelegten Reihenfolge, arbeitet deren Checkliste ab, benachrichtigt die zuständige Wachperson über alles, was nicht erfüllt ist, und legt das Kontrollprotokoll ab, bevor jemand einen Laptop aufklappt – ohne dass ein Operator jeden Schritt freigibt. Der Rundgang um 3 Uhr findet um 3 Uhr statt, in der vierten Nacht so zuverlässig wie in der ersten.',
    subheading: 'Die KI beobachtet, statt nur kurz hinzusehen.',
    subBody:
      'Stellen Sie einen Kontrollpunkt so ein, dass er die Szene einen Moment lang beobachtet, und die KI bewertet Live-Video statt eines einzelnen Standbilds – der Unterschied zwischen dem Wissen, dass jemand im Flur ist, und dem Wissen, ob die Person geblieben ist. Dieser Kontext lässt einen automatisierten Rundgang wirken wie eine Wachperson auf ihrem Kontrollgang statt wie ein Skript, das Kästchen abhakt.',
    points: [
      [Clock, 'Nach Zeitplan', 'Häufigkeit, aktive Stunden und aktive Tage, in der Zeitzone des Standorts.'],
      [Eye, 'Mit Kontext', 'Jeden Kontrollpunkt anhand eines einzelnen Bildes oder anhand einiger Sekunden Live-Video bewerten.'],
      [ShieldAlert, 'Mit Urteilsvermögen', 'Meldet Sicherheitsrisiken und Gefahren, die sie sieht, auch wenn kein Checklistenpunkt danach gefragt hat.'],
      [FileText, 'Mit nachvollziehbarer Begründung', 'Jede Antwort wird mit ihrer Begründung festgehalten – „das Metalltor scheint geschlossen zu sein“ – nicht nur mit einem Haken.'],
    ],
    riskLink: 'Risiken, die die KI über die Checkliste hinaus meldet',
    scheduleLink: 'So wird der automatische Rundgang geplant',
  },
} as const;

export function AutoPatrolSection({ locale = 'en' }: { locale?: Locale } = {}) {
  const c = COPY[locale];
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <SectionAtmosphere variant="left" />

      <div className="relative z-10 mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="font-mono text-mono-sm uppercase text-primary">{c.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {c.heading}
            </h2>
            <p className="mt-5 max-w-prose text-body leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-foreground">
                {c.lead}
              </strong>{' '}
              {c.leadRest}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
          <ScrollReveal>
            <div>
              <h3 className="font-display text-xl font-bold">{c.subheading}</h3>
              <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
                {c.subBody}
              </p>

              <ul className="mt-8 space-y-4">
                {c.points.map(([Icon, title, desc]) => {
                  const I = Icon as typeof Clock;
                  return (
                    <li key={title as string} className="flex items-start gap-3.5">
                      <span className="mt-0.5 rounded-lg bg-primary/10 p-2">
                        <I className="h-4 w-4 text-primary" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">{title as string}</span>
                        <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                          {desc as string}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>

              <Link
                href={hrefFor('/virtual-patrolling/risk-detection', locale)}
                className="mt-8 mr-6 inline-flex items-center gap-2 rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {`${c.riskLink} `}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={hrefFor('/virtual-patrolling/automated-patrol-scheduling', locale)}
                className="mt-8 inline-flex items-center gap-2 rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {`${c.scheduleLink} `}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <SceneObservation locale={locale} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
