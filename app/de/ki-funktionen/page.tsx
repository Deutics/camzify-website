import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { SiteImage } from '@/components/content/site-image';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import {
  Crosshair, Shield, Activity, Camera, Users, Brain, Clock as ClockIcon, Eye,
  UserSearch, Route, DoorClosed, ShieldAlert, Swords, HardHat, Flame, PersonStanding,
  PackageX, Trash2, CircleParking, Navigation, CarFront, Thermometer, TrendingUp, ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

/**
 * German counterpart of /ai-features. The cards are written inline rather than through
 * FeatureCard, because FeatureCard renders an English "Learn more" with no prop to
 * override it. The markup mirrors FeatureCard's.
 *
 * `slug` is the English detection slug, kept separately because the card image is named
 * after it (/feature-<slug>-1.webp) while `href` points at the German page where one exists.
 */
const pageMeta = {
  title: 'KI-Funktionen | 23 Erkennungen für Videoanalyse',
  description: '23 KI-Erkennungen im Live-Betrieb: Eindringen, Verweilen, Tailgating, Waffen, PSA, Feuer und Rauch, Stürze, Fahrzeuge, Parken und mehr.',
  path: '/de/ki-funktionen',
};

export const metadata = generatePageMeta(pageMeta);

const liveDetections = [
  { icon: <Crosshair className="h-5 w-5" />, slug: 'line-intrusion-detection', title: 'Linienüberschreitung', desc: 'Virtueller Stolperdraht über einen beliebigen Bereich, mit Richtungssteuerung. Löst bei bestätigten Objekt-Tracks aus, nicht bei Pixelbewegung.', href: '/de/ki-funktionen/linienueberschreitung', typicalUse: 'Zaunlinien am Perimeter, gesperrte Ladezonen, Tore mit nur einer Durchgangsrichtung' },
  { icon: <Shield className="h-5 w-5" />, slug: 'zone-intrusion-detection', title: 'Bereichsüberwachung', desc: 'Gesperrte Bereiche als Polygone. Jeder bestätigte Objekt-Track, der hineingelangt, löst einen Alarm aus, unabhängig von der Eintrittsrichtung.', href: '/de/ki-funktionen/bereichsueberwachung', typicalUse: 'Serverräume, Elektroverteilerräume, Gefahrstofflager' },
  { icon: <ClockIcon className="h-5 w-5" />, slug: 'loitering-detection', title: 'Verweilerkennung', desc: 'Eine Person oder ein Fahrzeug bleibt länger in einem Bereich als die von Ihnen festgelegte Verweildauer. Kurze Aufenthalte werden ignoriert, wer verweilt, wird gemeldet.', href: '/de/ki-funktionen/verweilerkennung', typicalUse: 'Hintereingänge nach Geschäftsschluss, Tore, SB-Foyers mit Geldautomaten, Treppenhäuser' },
  { icon: <Activity className="h-5 w-5" />, slug: 'motion-detection', title: 'Bewegungserkennung', desc: 'Erkennung per Hintergrundsubtraktion, die Bildrauschen, Lichtwechsel und Veränderungen in der Umgebung herausfiltert.', href: '/ai-features/motion-detection', typicalUse: 'Zufahrten und Ladezonen außerhalb der Betriebszeiten' },
  { icon: <Camera className="h-5 w-5" />, slug: 'camera-tampering-detection', title: 'Erkennung von Kamerasabotage', desc: 'Fünf Modi: plötzliche Unschärfe, Abdecken des Objektivs, schneller Szenenwechsel, ungewöhnliche Helligkeitsänderung, eingefrorene Bilder.', href: '/de/ki-funktionen/sabotageerkennung', typicalUse: 'Jede Kamera, durchgehend, damit die Aufnahmen für die Auswertung brauchbar bleiben' },
  { icon: <Users className="h-5 w-5" />, slug: 'multi-object-tracking', title: 'Multi-Object-Tracking', desc: 'Eine dauerhafte Track-Identität pro erfasstem Objekt. Bleibt bei kurzen Verdeckungen und erneutem Eintritt erhalten, mit sauberen Track-Verläufen.', href: '/ai-features/multi-object-tracking', typicalUse: 'Die bestätigten Tracks, auf denen jede andere Erkennungsregel aufsetzt' },
  { icon: <Brain className="h-5 w-5" />, slug: 'ai-attribute-extraction', title: 'KI-Attributerkennung', desc: 'Ein Vision-Language-Modell liest die Szene und ergänzt strukturierte Attribute: Kleidung, Objekttyp, Verhalten.', href: '/ai-features/ai-attribute-extraction', typicalUse: 'Alarme und Aufnahmen für Suche und Berichte verschlagworten' },
  { icon: <UserSearch className="h-5 w-5" />, slug: 'forensic-video-search', title: 'KI-Personensuche', desc: 'Beschreiben Sie eine Person in Alltagssprache und finden Sie jeden passenden Auftritt über indexierte Kameras und Zeiträume hinweg.', href: '/ai-features/forensic-video-search', typicalUse: 'Aufklärung nach einem Vorfall an einem oder mehreren Standorten' },
  { icon: <Route className="h-5 w-5" />, slug: 'cross-camera-journey-map', title: 'Kameraübergreifende Wegverfolgung', desc: 'Ein Objekt, eine zusammengesetzte Zeitleiste über alle Kameras am Standort: der vollständige Weg statt einzelner Clips.', href: '/ai-features/cross-camera-journey-map', typicalUse: 'Standorte mit mehreren Kameras, an denen der vollständige Weg einer Person gebraucht wird' },
  { icon: <DoorClosed className="h-5 w-5" />, slug: 'tailgating-detection', title: 'Tailgating-Erkennung', desc: 'Ein Ausweis, eine Person. Meldet, wenn eine zweite Person mit nur einer Zutrittsberechtigung hindurchgeht.', href: '/ai-features/tailgating-detection', typicalUse: 'Einzelzugänge hinter einem Ausweisleser' },
  { icon: <ShieldAlert className="h-5 w-5" />, slug: 'weapons-detection', title: 'Waffenerkennung', desc: 'Sichtbare Waffen werden gemeldet, sobald sie ins Bild kommen, bevor eine Bedrohung eskaliert.', href: '/ai-features/weapons-detection', typicalUse: 'Eingänge, Foyers, öffentlich zugängliche Bereiche' },
  { icon: <Swords className="h-5 w-5" />, slug: 'aggression-and-fight-detection', title: 'Aggressions- und Schlägereierkennung', desc: 'Körperliche Auseinandersetzungen werden gemeldet, sobald sie beginnen, nicht erst, wenn jemand die Aufnahmen sichtet.', href: '/ai-features/aggression-and-fight-detection', typicalUse: 'Warteschlangen, Eingänge und Gemeinschaftsbereiche' },
  { icon: <Eye className="h-5 w-5" />, slug: 'behavioral-anomaly-detection', title: 'Erkennung von Verhaltensauffälligkeiten', desc: 'Beschreiben Sie in Alltagssprache, auf welches Verhalten geachtet werden soll, etwa Schlägereien, Rauchen, Vandalismus oder unbefugtes Betreten, und genau darauf wird überwacht.', href: '/ai-features/behavioral-anomaly-detection', typicalUse: 'Jede Kamera, für ein individuelles Verhalten, ohne Bereiche einzuzeichnen' },
  { icon: <HardHat className="h-5 w-5" />, slug: 'ppe-violation-detection', title: 'PSA-Erkennung', desc: 'Fehlende Helme, Warnwesten oder Handschuhe werden automatisch anhand der PSA-Vorgaben Ihres Standorts gemeldet.', href: '/de/ki-funktionen/psa-erkennung', typicalUse: 'Aktive Arbeitsbereiche und Gefahrstoffzonen' },
  { icon: <Flame className="h-5 w-5" />, slug: 'fire-and-smoke-detection', title: 'Feuer- und Raucherkennung', desc: 'Sichtbarer Rauch und sichtbare Flammen werden direkt im Kamerabild erkannt, oft bevor ein Wärmesensor auslösen würde.', href: '/de/ki-funktionen/feuer-und-rauch-erkennung', typicalUse: 'Lager, Elektroräume und große offene Flächen' },
  { icon: <PersonStanding className="h-5 w-5" />, slug: 'slip-and-fall-detection', title: 'Sturzerkennung', desc: 'Stürze werden in Echtzeit erkannt und an den nächstgelegenen Sicherheitsmitarbeiter weitergeleitet, bevor daraus ein Haftungsfall wird.', href: '/ai-features/slip-and-fall-detection', typicalUse: 'Gänge, Eingänge und Wege während der Geschäftszeiten' },
  { icon: <PackageX className="h-5 w-5" />, slug: 'abandoned-object-detection', title: 'Erkennung zurückgelassener Gegenstände', desc: 'Unbeaufsichtigte Taschen und Pakete werden gemeldet, sobald sie zurückgelassen werden und niemand sie wieder an sich nimmt.', href: '/ai-features/abandoned-object-detection', typicalUse: 'Foyers, Eingänge und öffentliche Wartebereiche' },
  { icon: <Trash2 className="h-5 w-5" />, slug: 'littering-detection', title: 'Littering-Erkennung', desc: 'Gegenstände, die außerhalb der vorgesehenen Behälter entsorgt werden, werden im Moment des Geschehens erfasst, mit einem Clip samt Zeitstempel.', href: '/ai-features/littering-detection', typicalUse: 'Überwachte Außenbereiche' },
  { icon: <CircleParking className="h-5 w-5" />, slug: 'illegal-parking-detection', title: 'Falschparker-Erkennung', desc: 'Fahrzeuge, die Feuerwehrzufahrten, Ladezonen oder reservierte Stellplätze blockieren, werden sofort gemeldet.', href: '/ai-features/illegal-parking-detection', typicalUse: 'Feuerwehrzufahrten, Ladezonen, reservierte Stellplätze' },
  { icon: <Navigation className="h-5 w-5" />, slug: 'wrong-way-vehicle-detection', title: 'Falschfahrer-Erkennung', desc: 'Fahrzeuge, die entgegen einer festgelegten Fahrtrichtung fahren, werden gemeldet, bevor es zu einem Zusammenstoß kommt.', href: '/ai-features/wrong-way-vehicle-detection', typicalUse: 'Rampen in Parkhäusern, Ein- und Ausfahrten mit Schranke' },
  { icon: <CarFront className="h-5 w-5" />, slug: 'vehicle-damage-report', title: 'Fahrzeugschadenbericht', desc: 'Dellen und Kratzer an Fahrzeugen, die einen Standort befahren oder verlassen, automatisch mit Zeitstempel protokolliert.', href: '/ai-features/vehicle-damage-report', typicalUse: 'Ein- und Ausfahrten für Fahrzeuge' },
  { icon: <Thermometer className="h-5 w-5" />, slug: 'heatmap-anomalies', title: 'Heatmap-Anomalien', desc: 'Laufwege über einen Standort hinweg als Karte, mit einer Meldung, sobald ein Muster ungewöhnlich aussieht.', href: '/ai-features/heatmap-anomalies', typicalUse: 'Standortweite Überwachung der Laufwege' },
  { icon: <TrendingUp className="h-5 w-5" />, slug: 'occupancy-and-peak-hour-trends', title: 'Belegung und Stoßzeiten', desc: 'Die geschäftigsten Stunden und Bereiche werden automatisch aus Live-Zählungen der Kameras ermittelt, nicht geschätzt.', href: '/ai-features/occupancy-and-peak-hour-trends', typicalUse: 'Standortweite Berichte zu Belegung und Stoßzeiten' },
];

const faqs = [
  { question: 'Muss ich jede Erkennung einzeln lizenzieren?', answer: 'Nein. KI-Funktionen werden pro Kamera-Instanz lizenziert, sodass jede Kamera nur die Erkennungen trägt, die sie tatsächlich nutzt. Die meisten Standorte beginnen mit Eindringerkennung, Bereichsüberwachung und Kamerasabotage und erweitern dann Kamera für Kamera.' },
  { question: 'Was haben alle Erkennungen gemeinsam?', answer: 'Sie lösen bei bestätigten Objekt-Tracks aus dem Multi-Object-Tracking aus, nicht bei Pixelveränderungen, und jeder Alarm enthält einen Schnappschuss oder Clip, einen Konfidenzwert und ein Benachrichtigungszeitfenster pro Kamera. Keine von ihnen identifiziert Personen.' },
  { question: 'Welche Erkennungen sind noch nicht verfügbar?', answer: 'Jede Erkennung auf dieser Seite ist heute verfügbar, auch die Verweilerkennung. Der einzige Punkt auf der Roadmap sind die nativen Mobil-Apps, aufgeführt auf der Roadmap-Seite; mobil greifen Sie heute über den Browser zu.' },
  { question: 'Wie hängen Erkennungen und Rundgänge zusammen?', answer: 'Ein Rundgang prüft Zustände nach Zeitplan; Erkennungen überwachen zwischen den Rundgängen durchgehend. Bei einem automatisierten Rundgang löst die KI zusätzlich eine kritische Benachrichtigung aus, wenn sie ein Risiko sieht, nach dem die Checkliste nicht gefragt hat.' },
];

export default function DeKiFunktionenPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'KI-Funktionen' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Intelligente Videoanalyse, Funktion für Funktion</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Camzify bietet 23 KI-Erkennungsfunktionen: KI-Software für Sicherheitskameras, die auf Ihren vorhandenen Kameras läuft. Jede löst bei
            bestätigten Objekt-Tracks aus, nicht bei Schatten, Lichtwechseln oder Bildrauschen. Jede Erkennung ist direkt in den
            <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützten Wächterrundgang</Link> eingebunden. Neu im Thema? Lesen Sie zuerst, <Link href="/de/ki-videoanalyse" className="text-primary hover:underline">was intelligente Videoanalyse ist</Link>.
          </p>

          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold">Im Live-Betrieb</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {liveDetections.map((d, i) => (
                <ScrollReveal key={d.slug} delay={i * 0.06}>
                  <Link
                    href={d.href}
                    className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="aspect-video w-full overflow-hidden border-b border-border bg-muted/30">
                      <SiteImage src={`/feature-${d.slug}-1.webp`} alt={`${d.title} in der Live-Ansicht der Konsole`} width={1229} height={692} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-start justify-between">
                        <div className="rounded-lg bg-primary/10 p-2.5 text-primary transition-colors group-hover:bg-primary/15">
                          {d.icon}
                        </div>
                        <span className="font-mono text-mono-sm text-live uppercase">Live</span>
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold">{d.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">{d.desc}</p>
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Mehr erfahren <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Erkennungskatalog</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Alle Erkennungen auf einen Blick: was sie tun, wo sie typischerweise eingesetzt werden und wie sie lizenziert werden. Jede ist
              eine eigene Instanz, sodass eine Kamera nur die Erkennungen trägt, die sie braucht. Sechs Erkennungen haben eine deutsche
              Detailseite; die übrigen Links führen zur englischen Seite.
            </p>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-left">
                    <th className="px-4 py-3 font-semibold">Erkennung</th>
                    <th className="px-4 py-3 font-semibold">Was sie tut</th>
                    <th className="px-4 py-3 font-semibold">Typischer Einsatz</th>
                    <th className="px-4 py-3 font-semibold">Lizenzierung</th>
                  </tr>
                </thead>
                <tbody>
                  {liveDetections.map((d) => (
                    <tr key={d.href} className="border-b border-border align-top last:border-0">
                      <td className="px-4 py-3 font-medium">
                        <Link href={d.href} className="text-primary hover:underline">{d.title}</Link>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{d.desc}</td>
                      <td className="px-4 py-3 text-muted-foreground">{d.typicalUse}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">Pro Kamera lizenziert</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <FaqSection items={faqs} locale="de" />
    </PageShell>
  );
}
