import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ProductShot } from '@/components/content/product-shot';
import { SectionAtmosphere } from '@/components/motion/section-atmosphere';
import type { Locale } from '@/lib/i18n';

/**
 * How it works — a four-step sequence.
 *
 * Numbering is meaningful here: the steps happen in this order and each depends on the
 * one before, which is the only case where numbered markers earn their place. Three of
 * the four steps carry the console screen where that step actually happens, so the
 * section shows the product rather than describing it.
 *
 * Rows alternate side on wide viewports, which is what breaks the uniform card rhythm
 * the rest of the page had.
 *
 * Renders on the English home and the German home (`locale="de"`). The step prose and
 * the screenshot alt text switch; the ProductShot labels and the "Round in progress"
 * panel are faux console UI and stay English, as the console is.
 */
interface Step {
  title: string;
  desc: string;
  shot: string | null;
  alt: string;
  label: string;
}

const STEPS: Record<Locale, Step[]> = {
  en: [
    {
      title: 'Connect the cameras you already have',
      desc: 'An RTSP stream that is reachable online connects directly; cameras on a private network relay through the Camzify Connector with no port forwarding. RTMP and HTTPS streams are supported too. Sites and cameras are grouped as you organize them operationally.',
      shot: '/product-configuration',
      alt: 'Camzify configuration screen showing four sites with per-site camera counts and seven-day event trends',
      label: 'Configuration · Camzify console',
    },
    {
      title: 'Build the patrol sequence',
      desc: 'Set the camera order for the round, write the checklist each camera is checked against, and name the guard responsible for each stop. Then choose the frequency, the active hours and the active days.',
      shot: '/product-virtual-patrolling',
      alt: 'Camzify patrol sequence configuration showing auto-patrol frequency, active hours, active days and reporting settings',
      label: 'Patrol setup · Camzify console',
    },
    {
      title: 'The AI runs the round',
      desc: 'On schedule or on demand, Camzify steps through every camera in the sequence, evaluates each checklist item against what the camera can see, and records a result per item. It does not skip stops and it does not get tired at 04:00.',
      shot: null,
      alt: '',
      label: '',
    },
    {
      title: 'Failures reach the person responsible',
      desc: 'Any non-compliant item notifies the guard assigned to that camera with a message explaining what was found. The completed round is emailed as a PDF with every check, the compliance percentage, and who was notified.',
      shot: '/product-notifications',
      alt: 'Camzify notifications screen showing a critical acknowledgment banner, severity breakdown and per-event detail',
      label: 'Notifications · Camzify console',
    },
  ],
  de: [
    {
      title: 'Vorhandene Kameras verbinden',
      desc: 'Ein online erreichbarer RTSP-Stream wird direkt verbunden; Kameras in einem privaten Netzwerk werden über den Camzify Connector angebunden, ohne Portweiterleitung. RTMP- und HTTPS-Streams werden ebenfalls unterstützt. Standorte und Kameras werden so gruppiert, wie Sie sie im Betrieb organisieren.',
      shot: '/product-configuration',
      alt: 'Camzify-Konfigurationsbildschirm mit vier Standorten, der Kameraanzahl pro Standort und den Ereignistrends der letzten sieben Tage',
      label: 'Configuration · Camzify console',
    },
    {
      title: 'Den Rundgangsablauf erstellen',
      desc: 'Legen Sie die Reihenfolge der Kameras für den Rundgang fest, schreiben Sie die Checkliste, gegen die jede Kamera geprüft wird, und benennen Sie für jeden Kontrollpunkt die zuständige Wachperson. Wählen Sie dann Häufigkeit, aktive Stunden und aktive Tage.',
      shot: '/product-virtual-patrolling',
      alt: 'Konfiguration eines Rundgangsablaufs in Camzify mit Auto-Patrol-Häufigkeit, aktiven Stunden, aktiven Tagen und Protokolleinstellungen',
      label: 'Patrol setup · Camzify console',
    },
    {
      title: 'Die KI führt den Rundgang durch',
      desc: 'Nach Zeitplan oder auf Abruf geht Camzify jede Kamera des Rundgangsablaufs durch, bewertet jeden Checklistenpunkt anhand dessen, was die Kamera sieht, und hält für jeden Punkt ein Ergebnis fest. Es lässt keinen Kontrollpunkt aus und wird um 04:00 Uhr nicht müde.',
      shot: null,
      alt: '',
      label: '',
    },
    {
      title: 'Fehler erreichen die zuständige Person',
      desc: 'Jeder nicht erfüllte Punkt benachrichtigt die Wachperson, die dieser Kamera zugeordnet ist, mit einer Nachricht, die erklärt, was festgestellt wurde. Der abgeschlossene Rundgang wird als PDF per E-Mail verschickt, mit jeder Prüfung, dem Erfüllungsgrad in Prozent und den benachrichtigten Personen.',
      shot: '/product-notifications',
      alt: 'Camzify-Benachrichtigungsbildschirm mit einem Banner zur Bestätigung kritischer Ereignisse, einer Aufschlüsselung nach Schweregrad und Details zu jedem Ereignis',
      label: 'Notifications · Camzify console',
    },
  ],
};

const COPY = {
  en: {
    eyebrow: 'How it works',
    heading: 'Four steps from cameras to a compliance record',
  },
  de: {
    eyebrow: 'So funktioniert es',
    heading: 'Vier Schritte von den Kameras zum Nachweis',
  },
} as const;

export function HowItWorks({ locale = 'en' }: { locale?: Locale } = {}) {
  const c = COPY[locale];
  const steps = STEPS[locale];
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <SectionAtmosphere variant="center" intensity="subtle" />
      <div className="relative z-10 mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="font-mono text-mono-sm uppercase text-primary">{c.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {c.heading}
            </h2>
          </div>
        </ScrollReveal>

        <ol className="mt-14 space-y-14 lg:space-y-16">
          {steps.map((step, i) => {
            const imageFirst = i % 2 === 1;
            return (
            <li key={step.title}>
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <ScrollReveal className={imageFirst ? 'lg:order-2' : ''}>
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-sm font-medium text-primary tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-px flex-1 bg-gradient-to-r from-primary/40 via-border to-transparent"
                      />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-prose text-body leading-relaxed text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </ScrollReveal>

                {step.shot ? (
                  <ScrollReveal delay={0.08} className={imageFirst ? 'lg:order-1' : ''}>
                    <ProductShot src={step.shot} alt={step.alt} label={step.label} />
                  </ScrollReveal>
                ) : (
                  <ScrollReveal delay={0.08} className={imageFirst ? 'lg:order-1' : ''}>
                    <div className="console-panel corner-ticks p-8">
                      <span className="font-mono text-mono-sm uppercase text-muted-foreground">
                        Round in progress
                      </span>
                      <ul className="mt-6 space-y-3.5">
                        {[
                          ['CAM 01 · Main gate', 'Gate closed', true],
                          ['CAM 01 · Main gate', 'No tailgating observed', true],
                          ['CAM 02 · Loading dock', 'Bay clear', true],
                          ['CAM 03 · Server room', 'Door secured', false],
                          ['CAM 04 · Perimeter east', 'Fence line unbreached', true],
                        ].map(([cam, check, ok], n) => (
                          <li key={n} className="flex items-start justify-between gap-4 text-sm">
                            <span>
                              <span className="block font-mono text-mono-sm uppercase text-muted-foreground">
                                {cam as string}
                              </span>
                              <span className="mt-0.5 block">{check as string}</span>
                            </span>
                            <span
                              className={`mt-1 flex-shrink-0 font-mono text-mono-sm uppercase ${
                                ok ? 'text-live' : 'text-critical'
                              }`}
                            >
                              {ok ? 'Compliant' : 'Not compliant'}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 border-t border-border pt-4 font-mono text-mono-sm uppercase text-muted-foreground">
                        Round score · 4 of 5 · 80% compliant
                      </p>
                    </div>
                  </ScrollReveal>
                )}
              </div>
            </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
