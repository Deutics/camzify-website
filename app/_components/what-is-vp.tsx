import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ProductShot } from '@/components/content/product-shot';
import { hrefFor, type Locale } from '@/lib/i18n';

/**
 * The definitional section.
 *
 * The opening paragraph is written to be extracted whole: it answers "what is virtual
 * patrolling" in one self-contained sentence before elaborating, because this is the
 * passage AI answer engines are most likely to quote from the site. Left-aligned and
 * set to `max-w-prose` — the previous centered treatment made a long definition harder
 * to scan for no gain.
 *
 * Renders on the English home and the German home (`locale="de"`). German readers know
 * "Videofernüberwachung" as alarm-triggered monitoring, so the German definition leans
 * on "planmäßig" to carry the English "scheduled"; it adds no contrast the English does
 * not make. The ProductShot label names a console screen and stays English.
 */
const COPY = {
  en: {
    eyebrow: 'The category',
    heading: 'What is virtual patrolling?',
    definition:
      'Virtual patrolling is a scheduled, AI-driven patrol round run across the cameras a site already has.',
    definitionRest:
      'The system follows a defined camera route, checks a per-camera list of conditions at each stop, scores the round, and notifies the guard responsible when a check fails.',
    body: 'It produces the same artifact a physical guard tour produces, a timestamped, per-checkpoint compliance record, without a person walking the route. The difference is that it runs identically at 03:00 as it does at 15:00, and every round is auditable afterwards.',
    link: 'How the patrol system works',
    shotAlt:
      'Camzify virtual patrolling screen showing three patrol sequences, auto-patrol scheduling with round frequency and active hours, and per-round reporting settings',
  },
  de: {
    eyebrow: 'Die Kategorie',
    heading: 'Was ist ein virtueller Wächterrundgang?',
    definition:
      'Ein virtueller Wächterrundgang ist ein planmäßiger, KI-gestützter Kontrollgang über die Kameras, die ein Standort bereits hat.',
    definitionRest:
      'Das System folgt einer festgelegten Kameraroute, prüft an jedem Kontrollpunkt eine Liste von Bedingungen für die jeweilige Kamera, bewertet den Rundgang und benachrichtigt die zuständige Wachperson, wenn eine Prüfung fehlschlägt.',
    body: 'Er liefert dasselbe Ergebnis wie ein Kontrollgang vor Ort, einen Nachweis mit Zeitstempel für jeden Kontrollpunkt, ohne dass eine Person die Route abgeht. Der Unterschied: Er läuft um 03:00 Uhr genauso ab wie um 15:00 Uhr, und jeder Rundgang lässt sich im Nachhinein prüfen.',
    link: 'So funktioniert der Rundgang',
    shotAlt:
      'Camzify-Bildschirm für den virtuellen Wächterrundgang mit drei Rundgangsabläufen, der Auto-Patrol-Planung mit Rundgangshäufigkeit und aktiven Stunden sowie den Protokolleinstellungen pro Rundgang',
  },
} as const;

export function WhatIsVP({ locale = 'en' }: { locale?: Locale } = {}) {
  const c = COPY[locale];
  return (
    <section id="what-is-virtual-patrolling" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <ScrollReveal>
            <div>
              <span className="font-mono text-mono-sm uppercase text-primary">{c.eyebrow}</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {c.heading}
              </h2>
              <div className="mt-6 max-w-prose space-y-4 text-body leading-relaxed text-muted-foreground">
                <p>
                  <strong className="font-semibold text-foreground">
                    {c.definition}
                  </strong>{' '}
                  {c.definitionRest}
                </p>
                <p>
                  {c.body}
                </p>
              </div>
              <Link
                href={hrefFor('/virtual-patrolling', locale)}
                className="mt-8 inline-flex items-center gap-2 rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {`${c.link} `}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ProductShot
              src="/product-virtual-patrolling"
              alt={c.shotAlt}
              label="Virtual Patrolling · Camzify console"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
