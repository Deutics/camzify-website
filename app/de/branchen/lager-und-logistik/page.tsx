import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { PhotoFigure } from '@/components/content/photo-figure';
import { serviceSchema } from '@/lib/seo';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { PointList } from '@/components/content/point-list';
import { SiteImage } from '@/components/content/site-image';

/**
 * German counterpart of /industries/warehouses (pair in lib/i18n.ts).
 *
 * DeploymentPlan renders an English "Step 01" label with no prop to override it, so the
 * same block is inlined below with the German label (docs/I18N.md).
 */
const pageMeta = {
  title: 'KI-Videoüberwachung für Lager und Logistik',
  description: 'Camzify führt Rundgänge auf den Kameras durch, die ein Lager schon hat: Rampentore, Perimeter und Sicherheitskäfige nachts geprüft, die Wache benachrichtigt.',
  path: '/de/branchen/lager-und-logistik',
};

export const metadata = generatePageMeta(pageMeta);

const deploymentPhases = [
  { title: 'Rampenfront und Perimeter erfassen', body: 'Zuerst werden die Kameras hinzugefügt, die bereits Rampentore, die Zaunlinie und die Kreuzungen der Hauptgänge abdecken. Die meisten Lager starten mit 8 bis 30 Kamerabildern; für den ersten Rundgang muss nichts neu montiert werden.' },
  { title: 'Den Nachtablauf aufbauen', body: 'Die Route wird Rampe für Rampe geordnet, dann folgen der Perimeter und die Käfige für hochwertige Ware. Jeder Kontrollpunkt bekommt seine eigene Checkliste (Tor geschlossen, Rampe frei, Zaun unversehrt) und läuft in den Stunden, in denen das Gebäude leer ist.' },
  { title: 'Die Protokolle der ersten Woche lesen', body: 'Das PDF jedes Rundgangs zeigt, welche Kontrollpunkte bestanden haben, welche fehlgeschlagen sind und wer benachrichtigt wurde. Die erste Woche bringt meist dieselben zwei oder drei wiederkehrenden Lücken ans Licht, und genau dort wird der Zeitplan enger gezogen.' },
];

const faqs = [
  { question: 'Wie viele Kameras braucht ein typisches Lager?', answer: 'Das hängt vom Aufbau des Standorts ab. Die meisten Lager nutzen 8 bis 30 Kameras für Rampentore, Perimeter, Bereiche mit hochwertiger Ware und Hauptgänge. Camzify lizenziert pro Kamera, Sie zahlen also nur für das, was Sie überwachen.' },
  { question: 'Kann Camzify Kühlbereiche überwachen?', answer: 'Ja. Camzify arbeitet mit dem Videostream jeder IP-Kamera. Funktioniert die Kamera unter Kühlhausbedingungen, verarbeitet die KI den Stream wie gewohnt.' },
  { question: 'Ersetzt der KI-gestützte Wächterrundgang unsere Nachtwache?', answer: 'Für die meisten Lager erspart er zusätzliches oder aufgestocktes Wachpersonal in der Nacht, statt ein bestehendes Nachtteam zu ersetzen. Viele Standorte kombinieren virtuelle Rundgänge mit einer kleineren Präsenz vor Ort und decken mit der KI tote Winkel und Rundgänge außerhalb der Betriebszeiten ab, die eine einzelne Wachperson nicht jede Stunde erreichen kann.' },
  { question: 'Wie schnell wird ein Eindringen am Rampentor oder ein Betreten nach Feierabend gemeldet?', answer: 'Alarme lösen nahezu in Echtzeit aus, sobald ein bestätigtes Ereignis erkannt wird, typischerweise innerhalb von Sekunden, und gehen über die Benachrichtigungswarteschlange mit einem Clip samt Zeitstempel an die zuständige Ansprechperson.' },
  { question: 'Können verschiedene Lagerbereiche unterschiedliche Rundgangszeitpläne haben?', answer: 'Ja. Rundgangsabläufe, Checklisten und Erkennungszeitpläne werden je Kamera oder Bereich eingerichtet. Eine tagsüber aktive Laderampe und ein nur nachts überwachter umzäunter Hof können so im selben Konto völlig unterschiedliche Regeln haben.' },
  { question: 'Was passiert, wenn eine Kamera mitten in der Schicht ausfällt oder manipuliert wird?', answer: 'Die Sabotageerkennung meldet Unschärfe, Abdecken, Szenenänderungen und eingefrorene Bilder, sobald sie auftreten, und die betroffene Kamera gilt im Kontrollprotokoll als nicht konform, bis das Bild wiederhergestellt ist.' },
  { question: 'Deckt das auch einen Logistikhof oder ein Speditionsdepot ab?', answer: 'Ja. Tore, Stellplatzreihen, Ladebuchten und die Zaunlinie laufen im selben Rundgang wie die Lagerhalle, mit Fahrzeugtracking am Tor und an den Ladebuchten und einer Linienregel am Perimeter. Ein Transportunternehmen mit mehreren Depots führt je Depot einen Rundgang in einem Konto durch.' },
];

/* German stand-in for DeploymentPlan (see the note above): same markup, German step label. */
function DeploymentSteps({ phases, heading }: { phases: { title: string; body: string }[]; heading: string }) {
  return (
    <div className="mt-12">
      <ScrollReveal>
        <h2 className="font-display text-2xl font-bold">{heading}</h2>
        <ol className="mt-6 grid gap-5 sm:grid-cols-3">
          {phases.map((phase, i) => (
            <li key={i} className="rounded-xl border border-border bg-card p-6">
              <span className="font-mono text-mono-sm uppercase text-primary">
                Schritt {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-base font-bold">{phase.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{phase.body}</p>
            </li>
          ))}
        </ol>
      </ScrollReveal>
    </div>
  );
}

const chip = 'rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary';

export default function DeLagerUndLogistikPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: 'Sicherheitskameras für Lager, von KI kontrolliert', description: pageMeta.description, path: pageMeta.path, serviceType: 'KI-Videoüberwachung und KI-gestützter Wächterrundgang', audience: 'Lager- und Logistikbetriebe' })]} faqs={faqs} breadcrumbs={[
      { label: 'Branchen', href: '/de/branchen' },
      { label: 'Lager und Logistik' },
    ]}>
      <FeatureHero
        eyebrow="Branche · Lager und Logistik"
        title="Sicherheitskameras für Lager, von KI kontrolliert"
        lede={<><strong className="font-semibold text-foreground">Lager- und Logistikstandorte haben Sicherheitsprobleme, die Kameras allein nicht lösen und die Wachpersonal nicht lückenlos abdecken kann.</strong> Der <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützte Wächterrundgang</Link> von Camzify führt automatische KI-Rundgänge auf Ihren vorhandenen Kameras durch: Er prüft jeden Punkt, meldet Fehler und benachrichtigt die richtige Person.</>}
        facts={['Rampentore zwischen Anlieferungen unbeobachtet', 'Zaunlinien nachts ohne durchgehende Abdeckung', 'Wertlager mit nur einem Kontrollgang pro Nacht']}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/ki-waechterrundgang/so-funktioniert-es', label: 'So läuft ein Rundgang ab' }}
        visual={<SiteImage
              src="/ai-security-for-warehouses.webp" alt="KI-überwachtes Lager mit Begrenzungsrahmen um einen Gabelstapler, eine Person und Paletten, dazu eine Luftaufnahme und Ansichten der Hochregale" className="w-full rounded-xl"
              width={1600}
              height={900}
              sizes="(max-width: 1024px) 100vw, 60vw"
            priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div>
            <h2 className="font-display text-2xl font-bold">Typische Sicherheitslücken im Lager, die Camzify schließt:</h2>
            <ul className="mt-4 grid gap-3 text-muted-foreground sm:grid-cols-2">
                  <li className="flex gap-2">• Rampentore, die zwischen geplanten Anlieferungen unbeobachtet bleiben</li>
                  <li className="flex gap-2">• Zaunlinien ohne durchgehende Abdeckung in der Nacht</li>
                  <li className="flex gap-2">• Lagerbereiche für hochwertige Ware, die sich auf einen einzigen nächtlichen Kontrollgang verlassen</li>
                  <li className="flex gap-2">• Kameraausfälle oder Sabotage, die stundenlang unbemerkt bleiben</li>
                  <li className="flex gap-2">• Kein Nachweis, dass ein Rundgang tatsächlich stattgefunden hat</li>
                </ul>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Warum Lager eine durchgehende KI-Überwachung brauchen</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Ein typisches Lager läuft weit länger, als es besetzt ist: Lkw kommen vor Sonnenaufgang, Schichten enden lange nach Einbruch der Dunkelheit, und das Gebäude selbst steht in jedem 24-Stunden-Zyklus über weite Strecken leer oder ist nur schwach besetzt. Eine einzelne Wachperson auf ihrem Rundgang deckt den ganzen Standort bestenfalls ein paar Minuten pro Stunde ab; den Rest der Zeit sind Rampentore, Zaunlinien und Lagerbereiche praktisch unbeobachtet.</p>
                <p>Herkömmliche Videoüberwachung zeichnet alles auf und wertet nichts aus, bis ein Vorfall bereits gemeldet ist. Wenn nach einem Diebstahl oder einer beschädigten Sendung jemand die Aufnahmen heraussucht, ist das Zeitfenster für eine echte Reaktion längst vorbei.</p>
                <p>Der KI-gestützte Wächterrundgang schließt diese Lücke mit geplanten KI-Rundgängen.</p>
                <PointList items={[
                  'Jeder Rundgang prüft jeden Kontrollpunkt einer festgelegten Route.',
                  'Jeder Rundgang hält das Ergebnis fest.',
                  'Die richtige Person wird benachrichtigt, sobald etwas fehlschlägt.',
                  'Das Ergebnis ist derselbe Nachweis, den ein Kontrollgang vor Ort liefern würde, ohne dass eine Wachperson ihn ablaufen muss.',
                ]} />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Drei Fragen, die Sicherheitsverantwortliche im Lager stellen</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">„War das Tor um 2 Uhr nachts wirklich geschlossen?“</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify beantwortet das mit der <Link href="/de/ki-funktionen/linienueberschreitung" className="text-primary hover:underline">Erkennung von Linienüberschreitungen</Link> und der automatischen Prüfung im Rundgang.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">„Hat nach Schichtende jemand die Rampenlinie überschritten?“</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify beantwortet das mit der <Link href="/de/ki-funktionen/bereichsueberwachung" className="text-primary hover:underline">Bereichsüberwachung</Link> und der automatischen Prüfung im Rundgang.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">„Wer hat letzte Nacht den Perimeter kontrolliert, und können Sie es belegen?“</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify beantwortet das mit der <Link href="/de/ki-funktionen/sabotageerkennung" className="text-primary hover:underline">Erkennung von Kamerasabotage</Link> und der automatischen Prüfung im Rundgang.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/industry-warehouses-2.webp" alt="Die Konsole beim Einrichten einer Erkennung an einer Lagerkamera, der Bereich über das Livebild gezeichnet" caption="Einrichten einer Erkennung in der Konsole" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">So arbeitet Camzify im Lager</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Die Route aufbauen</h3>
                <p className="mt-2 text-muted-foreground">
                  Ein Rundgangsablauf wird einmal eingerichtet: Er ordnet jeden Kontrollpunkt, also Rampentore, Zaunlinien, Lager für hochwertige Ware und Hauptgänge, zu einer einzigen Route, die nach einem einstellbaren Zeitplan läuft.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Jeden Kontrollpunkt prüfen</h3>
                <p className="mt-2 text-muted-foreground">
                  An jedem Kontrollpunkt prüft die KI die für diese Kamera festgelegten Bedingungen mit der Erkennung von <Link href="/de/ki-funktionen/linienueberschreitung" className="text-primary hover:underline">Linienüberschreitungen</Link> und der <Link href="/de/ki-funktionen/bereichsueberwachung" className="text-primary hover:underline">Bereichsüberwachung</Link>.
                </p>
                <PointList items={[
                  'Sie prüft, ob der Bereich frei ist.',
                  'Sie prüft, ob die Begrenzung intakt ist.',
                  'Sie prüft, ob die Sicht der Kamera frei ist.',
                ]} />

                <h3 className="mt-6 font-display text-lg font-bold">Den Alarm weiterleiten</h3>
                <p className="mt-2 text-muted-foreground">
                  Eine fehlgeschlagene Prüfung erzeugt einen Alarm mit Einzelbild und Zeitstempel. Er geht an die zuständige Ansprechperson für Sicherheit und wird zusammen mit allen anderen Ergebnissen im Kontrollprotokoll dieser Runde festgehalten.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Was an einem Lagerstandort eingerichtet wird</h2>
                <p className="mt-4 text-muted-foreground">Die meisten Einrichtungen im Lager starten mit diesen Punkten:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Bereiche an den Rampentoren mit einem Meldefenster rund um die Anlieferungen</li>
                  <li className="flex gap-2">• Linienregeln am Perimeter für Zaunlinien und Fahrzeugtore</li>
                  <li className="flex gap-2">• Sperrbereiche über Lagern für hochwertige Ware und über Gefahrstoffbereichen</li>
                  <li className="flex gap-2">• Eine Rundgangsfrequenz außerhalb der Betriebszeiten, typischerweise alle 30 bis 60 Minuten in der Nacht</li>
                  <li className="flex gap-2">• Eine Eskalation kritischer Alarme an die Ansprechperson für Sicherheit in Rufbereitschaft</li>
                </ul>
              </div>
            </ScrollReveal>
            <PhotoFigure src="/industry-warehouses-3.webp" alt="Live-Streaming einer Lagerkamera, Personen und Fahrzeuge beim Tracking umrissen" caption="Livebild mit Tracking" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/industry-warehouses-4.jpg" alt="Bilder aus einem Rundgang über den Lagerstandort, jedes mit dem ausgelösten Alarm" caption="Rundgangsbilder mit Alarmen" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Typische Szenarien</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Ein Rampentor steht außerhalb eines geplanten Anlieferfensters offen</li>
                  <li className="flex gap-2">• Ein Gabelstapler oder anderes Fahrzeug fährt in einen Gang nur für Fußgänger</li>
                  <li className="flex gap-2">• Zaunüberquerungen in der Nacht</li>
                  <li className="flex gap-2">• Eine Kamera fällt mitten in der Schicht aus oder verliert die Schärfe</li>
                  <li className="flex gap-2">• Unbefugte halten sich nach Betriebsschluss in einem Sicherheitskäfig für hochwertige Ware auf</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Hinweise zur Einrichtung</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Lagerumgebungen bringen weite, offene Flächen, hohe Decken und wechselnde Lichtverhältnisse mit sich. Kameras hängen typischerweise an Rampentoren, Zaunlinien und Gangkreuzungen. Die häufigste Einrichtung ist eine RTSP-Anbindung über den Camzify Connector.</p>
            </ScrollReveal>
          </div>

          <DeploymentSteps phases={deploymentPhases} heading="So sieht eine erste Einrichtung aus" />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                Wie sich die Zahlen für Ihr Lager rechnen, zeigt der <Link href="/roi-calculator" className="text-primary hover:underline">ROI-Rechner</Link> (auf Englisch); das Lizenzmodell pro Instanz erklärt die Seite <Link href="/de/preise" className="text-primary hover:underline">Preise</Link>. Aufzeichnung und Aufbewahrung für dieselben Kameras beschreibt die Seite zum <Link href="/de/cloud-videomanagementsystem" className="text-primary hover:underline">Cloud-Videomanagementsystem</Link>.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Eingesetzte KI-Funktionen</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/de/ki-funktionen/linienueberschreitung" className={chip}>Linienüberschreitung</Link>
                  <Link href="/de/ki-funktionen/bereichsueberwachung" className={chip}>Bereichsüberwachung</Link>
                  <Link href="/de/ki-funktionen/sabotageerkennung" className={chip}>Kamerasabotage</Link>
                  <Link href="/ai-features/multi-object-tracking" className={chip}>Multi-Objekt-Tracking</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Verwandte Anwendungsfälle</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/loading-dock-monitoring" className={chip}>Überwachung von Laderampen</Link>
                  <Link href="/use-cases/after-hours-monitoring" className={chip}>Überwachung außerhalb der Betriebszeiten</Link>
                  <Link href="/use-cases/theft-prevention" className={chip}>Diebstahlprävention</Link>
                  <Link href="/use-cases/fire-exit-and-escape-route-monitoring" className={chip}>Überwachung von Notausgängen und Fluchtwegen</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Verwandte Branchen</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/de/branchen/industrie-und-produktion" className={chip}>Industrie und Produktion</Link>
                  <Link href="/de/branchen/baustellen" className={chip}>Baustellen</Link>
                  <Link href="/industries/waste-management" className={chip}>Entsorgung und Recycling</Link>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">Seiten ohne deutsche Fassung öffnen die englische Version.</p>
          </div>
        </div>
      </section>

      <FaqSection items={faqs} locale="de" />
    </PageShell>
  );
}
