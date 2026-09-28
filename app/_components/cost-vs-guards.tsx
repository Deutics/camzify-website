import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { hrefFor, type Locale } from '@/lib/i18n';

/**
 * Cost comparison.
 *
 * The previous version led with an animated "70% average cost reduction" headline.
 * That figure was not substantiated anywhere, and /trust publicly commits to not
 * publishing numbers the business has not verified — so the page was contradicting
 * its own stated policy in its largest type.
 *
 * The guard side is stated as orders of magnitude only ("tens of thousands a year",
 * "about three times that" for 24/7), the same wording as the guard cost guide, which
 * deliberately quotes no rate. The dollar figures that used to sit here ($15-$30 an
 * hour, ~$35,000 and ~$105,000 a year) had no source and did not even agree with each
 * other. Camzify's row carries the one public price, "from $5 per camera per month",
 * and no bar: a bar would imply a ratio to guard cost that nothing supports. The reader
 * is sent to the ROI calculator for real numbers.
 *
 * Renders on both homepages; the words switch with `locale`. The German side keeps the
 * same orders of magnitude ("Zehntausende pro Jahr", "etwa das Dreifache") and the same
 * one public price. The ROI calculator, the guard cost guide and two of the comparisons
 * are English-only, so their German links keep the English href and are marked.
 */
type Row = { label: string; cost: string; width?: string; tone: 'critical' | 'primary' };

const rowsByLocale: Record<Locale, Row[]> = {
  en: [
    { label: 'One guard, one 8-hour shift, every day', cost: 'Tens of thousands a year', width: '33%', tone: 'critical' },
    { label: '24/7 cover of the same post', cost: 'About three times that', width: '100%', tone: 'critical' },
    { label: 'Camzify virtual patrolling', cost: 'From $5 per camera per month', tone: 'primary' },
  ],
  de: [
    { label: 'Eine Wachperson, eine 8-Stunden-Schicht, jeden Tag', cost: 'Zehntausende pro Jahr', width: '33%', tone: 'critical' },
    { label: 'Rund-um-die-Uhr-Besetzung desselben Postens', cost: 'Etwa das Dreifache', width: '100%', tone: 'critical' },
    { label: 'KI-gestützter Wächterrundgang von Camzify', cost: 'Ab 5 US-Dollar pro Kamera und Monat', tone: 'primary' },
  ],
};

const COPY = {
  en: {
    eyebrow: 'Cost Comparison',
    heading: 'Stop paying guard rates for camera checks',
    runNumbers: 'Run your own numbers',
    guardCost: 'How guard cost is calculated',
    cardHeading: 'Annual cost of one patrolled site',
    footnote:
      'Guard figures are orders of magnitude, explained in the guard cost guide, and vary widely by market and contract. Camzify is priced per instance per month and quoted per site, so the comparable figure depends on your camera count rather than headcount; the ROI calculator works it out against your own site.',
  },
  de: {
    eyebrow: 'Kostenvergleich',
    heading: 'Schluss mit Stundensätzen für Wachpersonal bei Kamerakontrollen',
    runNumbers: 'Eigene Zahlen durchrechnen',
    guardCost: 'Wie die Kosten für Wachpersonal berechnet werden',
    cardHeading: 'Jährliche Kosten eines kontrollierten Standorts',
    footnote:
      'Die Werte für Wachpersonal sind Größenordnungen, erläutert im Leitfaden zu den Kosten für Wachpersonal (auf Englisch), und schwanken stark je nach Markt und Vertrag. Camzify wird pro Instanz und Monat berechnet und pro Standort angeboten; der vergleichbare Wert hängt also von Ihrer Kameraanzahl ab statt von der Personalstärke. Der ROI-Rechner (auf Englisch) ermittelt ihn für Ihren eigenen Standort.',
  },
} as const;

/** Marks a link on a German page that leads to an English-only page. */
function EnMark() {
  return (
    <span
      title="Seite auf Englisch"
      className="rounded border border-current px-1 font-mono text-[10px] font-semibold leading-4 opacity-80"
    >
      EN
    </span>
  );
}

export function CostVsGuards({ locale = 'en' }: { locale?: Locale }) {
  const copy = COPY[locale];
  const rows = rowsByLocale[locale];
  const de = locale === 'de';
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal>
            <div>
              <span className="font-mono text-mono-sm uppercase text-primary">{copy.eyebrow}</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {copy.heading}
              </h2>
              <div className="mt-5 max-w-prose space-y-4 text-body text-muted-foreground">
                {de ? (
                  <>
                    <p>
                      Der Stundensatz einer Wachperson schwankt stark je nach Markt und Vertrag, und
                      ein besetzter Posten ist nicht eine einzige Wachperson. Rechnet man Urlaub,
                      Krankheit und Pausen ein, braucht die durchgehende Besetzung eines einzigen
                      Postens mehrere Personen im Dienstplan.
                    </p>
                    <p>
                      Die meisten dieser bezahlten Stunden entfallen auf den Routinerundgang: dieselbe
                      Route abgehen, dieselben Türen prüfen, bestätigen, dass dieselben Bereiche frei
                      sind. Genau diesen Teil ersetzt der KI-gestützte Wächterrundgang, nicht das
                      Eingreifen und nicht das Urteilsvermögen.
                    </p>
                  </>
                ) : (
                  <>
                <p>
                  A guard&apos;s hourly rate varies widely by market and contract, and one staffed
                  post is not one guard. Allowing for leave, sickness and breaks, continuous cover
                  of a single post takes several people on the roster.
                </p>
                <p>
                  Most of those paid hours go on the routine round: walking the same route,
                  checking the same doors, confirming the same areas are clear. That is the part
                  virtual patrolling replaces, not the response and not the judgment.
                </p>
                  </>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/roi-calculator"
                  hrefLang={de ? 'en-US' : undefined}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-fast hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {copy.runNumbers}
                  {de && <EnMark />} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/guides/security-guard-cost-per-hour"
                  hrefLang={de ? 'en-US' : undefined}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {copy.guardCost}
                  {de && <EnMark />}
                </Link>
              </div>

              {/*
                This section argues from the end user's side. A guarding company reading
                it is being told its own model is the cost, so it gets the other door.
              */}
              {de ? (
                <p className="mt-8 rounded-lg border border-border bg-card/60 p-4 text-sm text-muted-foreground">
                  <strong className="font-semibold text-foreground">Sie führen einen Sicherheitsdienst?</strong>{' '}
                  Für Sie ist das Abdeckung, die Sie verkaufen, statt Kosten, die Sie senken: nächtliche
                  Rundgänge über alle Kundenstandorte, zusätzlich zu den Wachpersonen, die Sie bereits
                  stellen.{' '}
                  <Link href={hrefFor('/partners/for-security-agencies', locale)} className="text-primary hover:underline">
                    Camzify für Sicherheitsdienste
                  </Link>
                  . Sie überwachen im Auftrag eines Sicherheitsdienstes? Siehe{' '}
                  <Link href={hrefFor('/partners/for-monitoring-centers', locale)} className="text-primary hover:underline">
                    Camzify für Leitstellen
                  </Link>
                  .
                </p>
              ) : (
              <p className="mt-8 rounded-lg border border-border bg-card/60 p-4 text-sm text-muted-foreground">
                <strong className="font-semibold text-foreground">Run a security agency?</strong>{' '}
                For you this is coverage to sell rather than a cost to cut: overnight rounds across
                every client site, alongside the guards you already provide.{' '}
                <Link href="/partners/for-security-agencies" className="text-primary hover:underline">
                  Camzify for security agencies
                </Link>
                . Monitor on an agency&apos;s behalf? See{' '}
                <Link href="/partners/for-monitoring-centers" className="text-primary hover:underline">
                  Camzify for monitoring companies
                </Link>
                .
              </p>
              )}

              {de ? (
                <p className="mt-6 text-sm text-muted-foreground">
                  Sie wägen die Optionen ab?{' '}
                  <Link href={hrefFor('/virtual-patrolling/vs-security-guards', locale)} className="text-primary hover:underline">
                    KI-gestützter Wächterrundgang im Vergleich zu Wachpersonal
                  </Link>
                  ,{' '}
                  <Link href="/compare/virtual-patrolling-vs-guard-tour-systems" hrefLang="en-US" className="text-primary hover:underline">
                    im Vergleich zu Wächterkontrollsystemen
                  </Link>{' '}
                  (auf Englisch) und{' '}
                  <Link href="/compare/camzify-vs-eagle-eye-networks" hrefLang="en-US" className="text-primary hover:underline">
                    Camzify vs Eagle Eye Networks
                  </Link>{' '}
                  (auf Englisch).
                </p>
              ) : (
              <p className="mt-6 text-sm text-muted-foreground">
                Weighing the options?{' '}
                <Link href="/virtual-patrolling/vs-security-guards" className="text-primary hover:underline">
                  Virtual patrolling vs security guards
                </Link>
                ,{' '}
                <Link href="/compare/virtual-patrolling-vs-guard-tour-systems" className="text-primary hover:underline">
                  vs guard tour systems
                </Link>{' '}
                and{' '}
                <Link href="/compare/camzify-vs-eagle-eye-networks" className="text-primary hover:underline">
                  Camzify vs Eagle Eye Networks
                </Link>
                .
              </p>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-7 sm:p-8">
              <h3 className="font-mono text-mono-sm uppercase text-muted-foreground">
                {copy.cardHeading}
              </h3>
              <div className="mt-8 space-y-7">
                {rows.map((r) => (
                  <div key={r.label}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span
                        className={`text-sm ${r.tone === 'primary' ? 'font-semibold text-primary' : ''}`}
                      >
                        {r.label}
                      </span>
                      <span
                        className={`font-mono text-sm tabular-nums ${
                          r.tone === 'primary' ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      >
                        {r.cost}
                      </span>
                    </div>
                    {r.width && (
                      <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-critical/70" style={{ width: r.width }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
                {copy.footnote}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
