import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ProductShot } from '@/components/content/product-shot';
import { SectionAtmosphere } from '@/components/motion/section-atmosphere';
import { Stagger, StaggerItem } from '@/components/motion/stagger';
import { hrefFor, isForeignFor, type Locale } from '@/lib/i18n';

/**
 * Every shipping detection model, grouped by the same six categories the main
 * navigation uses.
 *
 * This section previously showed six of them and claimed six was the total, which
 * contradicted the navigation, /llms.txt and the feature pages. Listing every model
 * corrects that, and it puts more internal links on the highest-authority page on the
 * site. The heading count is derived from `groups`, so adding a model here is enough.
 *
 * `featured` marks the six with the deepest pages — they get a card each; the rest
 * render as a dense linked list so the section stays scannable rather than becoming
 * a wall of identical cards.
 *
 * Renders on the English home and the German home (`locale="de"`). Each model carries
 * its English and German name side by side, so the two lists cannot drift apart. On the
 * German side links go through `hrefFor`: six detections, the custom-detections page and
 * the alerts page have German counterparts; every other target is an English page and
 * gets `hrefLang="en-US"` plus an "EN" marker (cards and lists) or "(auf Englisch)"
 * (running text). German names follow /de/ki-funktionen.
 */
const featured = [
  {
    title: { en: 'Behavioral Anomaly Detection', de: 'Erkennung von Verhaltensauffälligkeiten' },
    href: '/ai-features/behavioral-anomaly-detection',
    desc: {
      en: 'Describe the behavior you want watched in plain language, such as fights, smoking, vandalism or trespassing, and it monitors for exactly that.',
      de: 'Beschreiben Sie in Alltagssprache, auf welches Verhalten geachtet werden soll, etwa Schlägereien, Rauchen, Vandalismus oder unbefugtes Betreten, und genau darauf wird überwacht.',
    },
  },
  {
    title: { en: 'Line Intrusion Detection', de: 'Linienüberschreitung' },
    href: '/ai-features/line-intrusion-detection',
    desc: {
      en: 'A virtual tripwire with directional control. Fires on a confirmed object track crossing the line, not on a shadow or a lighting shift.',
      de: 'Ein virtueller Stolperdraht mit Richtungssteuerung. Löst aus, wenn ein bestätigter Objekt-Track die Linie überquert, nicht bei einem Schatten oder einem Lichtwechsel.',
    },
  },
  {
    title: { en: 'Zone Intrusion Detection', de: 'Bereichsüberwachung' },
    href: '/ai-features/zone-intrusion-detection',
    desc: {
      en: 'Polygonal restricted areas with a notification window per camera. Any confirmed object entering the zone raises an alert.',
      de: 'Gesperrte Bereiche als Polygone, mit einem Benachrichtigungsfenster pro Kamera. Jedes bestätigte Objekt, das in den Bereich gelangt, löst einen Alarm aus.',
    },
  },
  {
    title: { en: 'Camera Tampering Detection', de: 'Erkennung von Kamerasabotage' },
    href: '/ai-features/camera-tampering-detection',
    desc: {
      en: 'Five modes: defocus, physical coverage, scene change, brightness shift and frozen frames.',
      de: 'Fünf Modi: Unschärfe, Abdecken des Objektivs, Szenenwechsel, Helligkeitsänderung und eingefrorene Bilder.',
    },
  },
  {
    title: { en: 'Multi-Object Tracking', de: 'Multi-Object-Tracking' },
    href: '/ai-features/multi-object-tracking',
    desc: {
      en: 'Persistent identity per subject, frame over frame. Survives brief occlusions and re-entries.',
      de: 'Eine dauerhafte Identität pro erfasstem Objekt, Bild für Bild. Bleibt bei kurzen Verdeckungen und erneutem Eintritt erhalten.',
    },
  },
  {
    title: { en: 'AI Attribute Extraction', de: 'KI-Attributerkennung' },
    href: '/ai-features/ai-attribute-extraction',
    desc: {
      en: 'A vision-language model reads the scene and attaches structured attributes: clothing color, object type, behavior.',
      de: 'Ein Vision-Language-Modell liest die Szene und ergänzt strukturierte Attribute: Kleidungsfarbe, Objekttyp, Verhalten.',
    },
  },
];

/** [English name, German name, English href] */
type Item = readonly [string, string, string];

const groups: { label: Record<Locale, string>; items: Item[] }[] = [
  {
    label: { en: 'Perimeter & Access', de: 'Perimeter und Zutritt' },
    items: [
      ['Line Intrusion Detection', 'Linienüberschreitung', '/ai-features/line-intrusion-detection'],
      ['Zone Intrusion Detection', 'Bereichsüberwachung', '/ai-features/zone-intrusion-detection'],
      ['Loitering Detection', 'Verweilerkennung', '/ai-features/loitering-detection'],
      ['Motion Detection', 'Bewegungserkennung', '/ai-features/motion-detection'],
      ['Tailgating Detection', 'Tailgating-Erkennung', '/ai-features/tailgating-detection'],
    ],
  },
  {
    label: { en: 'Threat & Incident', de: 'Bedrohung und Vorfall' },
    items: [
      ['Behavioral Anomaly Detection', 'Erkennung von Verhaltensauffälligkeiten', '/ai-features/behavioral-anomaly-detection'],
      ['Weapons Detection', 'Waffenerkennung', '/ai-features/weapons-detection'],
      ['Aggression & Fight Detection', 'Aggressions- und Schlägereierkennung', '/ai-features/aggression-and-fight-detection'],
      ['Slip & Fall Detection', 'Sturzerkennung', '/ai-features/slip-and-fall-detection'],
      ['Fire & Smoke Detection', 'Feuer- und Raucherkennung', '/ai-features/fire-and-smoke-detection'],
    ],
  },
  {
    label: { en: 'Site Compliance', de: 'Vorgaben am Standort' },
    items: [
      ['PPE Violation Detection', 'PSA-Erkennung', '/ai-features/ppe-violation-detection'],
      ['Abandoned Object Detection', 'Erkennung zurückgelassener Gegenstände', '/ai-features/abandoned-object-detection'],
      ['Littering Detection', 'Littering-Erkennung', '/ai-features/littering-detection'],
      ['Camera Tampering Detection', 'Erkennung von Kamerasabotage', '/ai-features/camera-tampering-detection'],
    ],
  },
  {
    label: { en: 'Vehicle & Parking', de: 'Fahrzeuge und Parken' },
    items: [
      ['Illegal Parking Detection', 'Falschparker-Erkennung', '/ai-features/illegal-parking-detection'],
      ['Wrong-Way Vehicle Detection', 'Falschfahrer-Erkennung', '/ai-features/wrong-way-vehicle-detection'],
      ['Vehicle Damage Report', 'Fahrzeugschadenbericht', '/ai-features/vehicle-damage-report'],
    ],
  },
  {
    label: { en: 'Investigation & Tracking', de: 'Aufklärung und Tracking' },
    items: [
      ['AI Suspect Search', 'KI-Personensuche', '/ai-features/forensic-video-search'],
      ['Cross-Camera Journey Map', 'Kameraübergreifende Wegverfolgung', '/ai-features/cross-camera-journey-map'],
      ['Multi-Object Tracking', 'Multi-Object-Tracking', '/ai-features/multi-object-tracking'],
      ['AI Attribute Extraction', 'KI-Attributerkennung', '/ai-features/ai-attribute-extraction'],
    ],
  },
  {
    label: { en: 'Analytics & Insights', de: 'Analysen und Auswertungen' },
    items: [
      ['Heatmap Anomalies', 'Heatmap-Anomalien', '/ai-features/heatmap-anomalies'],
      ['Occupancy & Peak Hour Trends', 'Belegung und Stoßzeiten', '/ai-features/occupancy-and-peak-hour-trends'],
    ],
  },
];

const shippingCount = groups.reduce((n, g) => n + g.items.length, 0);

const ROADMAP_HREF = '/roadmap';
const LPR_HREF = '/ai-features/license-plate-recognition';
const CUSTOM_HREF = '/ai-features/custom-detections';
const ALERTS_HREF = '/platform/notifications-and-alerts';

const COPY = {
  en: {
    eyebrow: 'AI Detection',
    headingSuffix: ' detection models, all shipping',
    intro:
      'Every detection fires on a confirmed object track, not a shadow, not a lighting shift, not camera noise. Each one feeds directly into your patrol rounds, so a detection between rounds is logged against the camera it belongs to.',
    fullSetHeading: 'The full detection set',
    customLead: 'Need one that is not listed?',
    customLink: 'Custom detections',
    queueHeading: 'Every detection, one queue',
    queueBody:
      "Detections do not land in separate tools. They arrive in a single notification queue with severity, site, camera and feature, an acknowledgment state, and the option to mark a false positive so the model's behavior on that camera is recorded.",
    queueLink: 'See alert management',
    shotAlt:
      'Camzify notifications screen showing 54 detection events with severity filters, a critical acknowledgment banner, and average time to acknowledge',
  },
  de: {
    eyebrow: 'KI-Erkennung',
    headingSuffix: ' Erkennungsmodelle, alle heute verfügbar',
    intro:
      'Jede Erkennung löst bei einem bestätigten Objekt-Track aus, nicht bei einem Schatten, nicht bei einem Lichtwechsel, nicht bei Bildrauschen. Jede fließt direkt in Ihre Rundgänge ein, sodass eine Erkennung zwischen zwei Rundgängen bei der Kamera protokolliert wird, zu der sie gehört.',
    fullSetHeading: 'Alle Erkennungen im Überblick',
    customLead: 'Ihre Erkennung ist nicht dabei?',
    customLink: 'Individuelle Erkennungen',
    queueHeading: 'Alle Erkennungen, eine Warteschlange',
    queueBody:
      'Erkennungen landen nicht in getrennten Werkzeugen. Sie kommen in einer einzigen Benachrichtigungswarteschlange an, mit Schweregrad, Standort, Kamera und Funktion, einem Bestätigungsstatus und der Möglichkeit, einen Fehlalarm zu markieren, sodass das Verhalten des Modells an dieser Kamera festgehalten wird.',
    queueLink: 'Zur Alarmverwaltung',
    shotAlt:
      'Camzify-Benachrichtigungsbildschirm mit 54 Erkennungsereignissen, Filtern nach Schweregrad, einem Banner zur Bestätigung kritischer Ereignisse und der durchschnittlichen Zeit bis zur Bestätigung',
  },
} as const;

/** Marks a German-page link whose target is an English-only page. */
function EnMarker() {
  return (
    <>
      <span
        aria-hidden="true"
        className="ml-1.5 align-middle font-mono text-[10px] font-normal uppercase tracking-wider text-muted-foreground"
      >
        EN
      </span>
      <span className="sr-only"> (auf Englisch)</span>
    </>
  );
}

export function DetectionGrid({ locale = 'en' }: { locale?: Locale } = {}) {
  const c = COPY[locale];
  const de = locale === 'de';
  const langOf = (href: string) => (isForeignFor(href, locale) ? 'en-US' : undefined);
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <SectionAtmosphere variant="right" />
      <div className="relative z-10 mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="font-mono text-mono-sm uppercase text-primary">{c.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {shippingCount}{c.headingSuffix}
            </h2>
            <p className="mt-5 max-w-prose text-body text-muted-foreground">
              {c.intro}
            </p>
          </div>
        </ScrollReveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((f) => (
            <StaggerItem key={f.href} className="h-full">
              <Link
                href={hrefFor(f.href, locale)}
                hrefLang={langOf(f.href)}
                className="console-panel corner-ticks group flex h-full flex-col p-6 transition-transform duration-normal hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-mono-sm uppercase text-live">
                    <span className="h-1.5 w-1.5 rounded-full bg-live motion-safe:animate-pulse-dot" />
                    Live
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-muted-foreground transition-transform duration-fast group-hover:translate-x-0.5 group-hover:text-primary"
                  >
                    →
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold group-hover:text-primary">
                  {f.title[locale]}
                  {isForeignFor(f.href, locale) && <EnMarker />}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc[locale]}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <ScrollReveal delay={0.1}>
          <div className="mt-16 rounded-2xl border border-border bg-card/40 p-8 sm:p-10">
            <h3 className="font-display text-xl font-bold">{c.fullSetHeading}</h3>
            <p className="mt-2 max-w-prose text-sm text-muted-foreground">
              {de ? (
                <>
                  So gruppiert, wie die Plattform sie gruppiert. Jedes hier aufgeführte Modell ist
                  heute verfügbar; die{' '}
                  <Link href={hrefFor(ROADMAP_HREF, locale)} hrefLang={langOf(ROADMAP_HREF)} className="text-primary hover:underline">Roadmap</Link>{' '}
                  (auf Englisch) zeigt, was als Nächstes kommt. Mit EN markierte Links führen zur
                  englischen Seite.
                </>
              ) : (
                <>
                  Grouped the way the platform groups them. Every model listed here ships
                  today; the{' '}
                  <Link href="/roadmap" className="text-primary hover:underline">roadmap</Link> lists
                  what is coming next.
                </>
              )}
            </p>
            <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((g) => (
                <div key={g.label.en}>
                  <h4 className="font-mono text-mono-sm uppercase text-muted-foreground">
                    {g.label[locale]}
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {g.items.map(([en, deName, href]) => (
                      <li key={href}>
                        <Link
                          href={hrefFor(href, locale)}
                          hrefLang={langOf(href)}
                          className="rounded text-sm text-foreground/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {de ? deName : en}
                          {isForeignFor(href, locale) && <EnMarker />}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{c.customLead}</span>{' '}
                {de ? (
                  <>
                    Erkennungen werden auch auf Bestellung entwickelt, etwa{' '}
                    <Link href={hrefFor(LPR_HREF, locale)} hrefLang={langOf(LPR_HREF)} className="text-primary hover:underline">Kennzeichenerkennung</Link>{' '}
                    (auf Englisch) für Kennzeichen aus den USA und Singapur, die Erkennung von Essen
                    und Trinken sowie Ladendiebstahlerkennung.
                  </>
                ) : (
                  <>
                    Detections are also built to order, such as{' '}
                    <Link href="/ai-features/license-plate-recognition" className="text-primary hover:underline">license plate recognition</Link>{' '}
                    for US and Singapore plates, eating and drinking detection and shoplifting detection.
                  </>
                )}
              </p>
              <Link href={hrefFor(CUSTOM_HREF, locale)} hrefLang={langOf(CUSTOM_HREF)} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline">
                {`${c.customLink} `}<span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <div>
              <h3 className="font-display text-2xl font-bold">{c.queueHeading}</h3>
              <p className="mt-4 max-w-prose text-muted-foreground">
                {c.queueBody}
              </p>
              <Link
                href={hrefFor(ALERTS_HREF, locale)}
                hrefLang={langOf(ALERTS_HREF)}
                className="mt-6 inline-flex items-center gap-2 rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {`${c.queueLink} `}<span aria-hidden="true">→</span>
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <ProductShot
              src="/product-notifications"
              alt={c.shotAlt}
              label="Notifications · Camzify console"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
