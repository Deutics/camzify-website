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
 * German counterpart of /industries/manufacturing (pair in lib/i18n.ts).
 *
 * The English page's security-team persona is written here as Werkschutz, the in-house
 * industrial security function a German plant has.
 *
 * DeploymentPlan renders an English "Step 01" label with no prop to override it, so the
 * same block is inlined below with the German label (docs/I18N.md).
 */
const pageMeta = {
  title: 'KI-Videoüberwachung für Industrie und Produktion',
  description: 'KI-gestützter Wächterrundgang und Videoanalyse für die Industrie: automatische Rundgänge, Alarme in Echtzeit und Kontrollprotokolle für den Werkschutz.',
  path: '/de/branchen/industrie-und-produktion',
};

export const metadata = generatePageMeta(pageMeta);

const deploymentPhases = [
  { title: 'Werkszugänge und Sperrbereiche abdecken', body: 'Zuerst kommen die Zugänge zur Produktion, Chemikalien- und Maschinenbereiche und der Zaun um das Gelände. Kamerapositionen in einer Produktionshalle müssen selten geändert werden; die Kamerabilder gibt es für die Prozessüberwachung bereits.' },
  { title: 'Arbeitsschutz auf die Sicherung aufsetzen', body: 'PSA- und Bereichsregeln laufen auf denselben Kamerabildern wie die Prüfungen auf Eindringen, sodass ein Rundgang an jedem Kontrollpunkt eine Sicherheitsfrage und eine Compliance-Frage zugleich abdeckt.' },
  { title: 'Das Protokoll als Schichtnachweis nutzen', body: 'Jeder abgeschlossene Rundgang liefert je Bereich eine Erfüllungsquote mit Zeitstempel. Sie wird zum prüfbaren Nachweis, dass die Schichtkontrolle tatsächlich stattgefunden hat.' },
];

const faqs = [
  { question: 'Funktioniert Camzify mit Wärmebildkameras?', answer: 'Ja. Camzify verarbeitet die Videostreams jeder IP-Kamera, auch von Wärmebildkameras, wie sie in Industrieumgebungen zur Perimeterüberwachung eingesetzt werden.' },
  { question: 'Lassen sich Rundgänge um Schichtwechsel herum planen?', answer: 'Ja. Rundgangszeitpläne unterstützen einstellbare aktive Zeiten und lassen sich an Schichtmodelle anpassen.' },
  { question: 'Wie schnell lässt sich Camzify in einer großen Produktionshalle einrichten?', answer: 'Die Einrichtungszeit hängt von der Zahl der Kameras und dem Aufbau des Standorts ab, aber Bereiche und Rundgangsrouten für einen einzelnen Standort sind typischerweise innerhalb weniger Tage eingerichtet, sobald der Kamerazugang bestätigt ist. Standorte mit mehreren Gebäuden werden meist Produktionsbereich für Produktionsbereich eingeführt.' },
  { question: 'Wie geht Camzify mit Fehlalarmen durch Maschinenbewegung, Dampf oder Staub um?', answer: 'Bereichsgrenzen und Erkennungsempfindlichkeit werden bei der Einrichtung je Kamera abgestimmt. Bereiche mit ständiger Maschinenbewegung, Dampf oder Staub in der Luft lassen sich so anders eingrenzen oder mit anderen Schwellwerten versehen als eine ruhige Zaunlinie. Damit bleiben die Alarme auf echtes Eindringen gerichtet statt auf den normalen Werksbetrieb.' },
  { question: 'Lässt sich Camzify in unsere bestehende Zutrittskontrolle integrieren?', answer: 'Camzify arbeitet mit Ihren Kamerabildern unabhängig von der Zutrittskontrolle und kann daher als eigenständige Prüfebene laufen, auch wo bereits Ausweis- oder Kartensysteme im Einsatz sind. Welche Integrationsmöglichkeiten es konkret gibt, hängt von Ihrer Umgebung ab; sprechen Sie mit dem Camzify-Team über Ihr Zutrittskontrollsystem.' },
  { question: 'Wie schneidet der KI-gestützte Wächterrundgang gegenüber einer Streife des Werkschutzes auf einem großen Industriegelände ab?', answer: 'Eine Wachperson, die ein großes Werk abläuft, erfasst pro Stunde nur einen Bruchteil des Geländes und prüft jeden Bereich nur kurz. Der KI-gestützte Wächterrundgang prüft jede eingerichtete Kamera nach festem Zeitplan und hält jede Runde mit Zeitstempel fest. Er läuft typischerweise neben einer kleineren Präsenz vor Ort und deckt den Perimeter und die Sperrbereiche ab, die eine einzelne Streife nicht durchgehend erreichen kann.' },
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

export default function DeIndustrieUndProduktionPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: 'KI-Sicherheit für Industrie und Produktion', description: pageMeta.description, path: pageMeta.path, serviceType: 'KI-Videoüberwachung und KI-gestützter Wächterrundgang', audience: 'Industrie- und Produktionsbetriebe' })]} faqs={faqs} breadcrumbs={[
      { label: 'Branchen', href: '/de/branchen' },
      { label: 'Industrie und Produktion' },
    ]}>
      <FeatureHero
        eyebrow="Branche · Industrie und Produktion"
        title="KI-Sicherheit für Industrie und Produktion"
        lede={<><strong className="font-semibold text-foreground">Produktionsbetriebe haben Sicherheitsprobleme, die Kameras allein nicht lösen und die Wachpersonal nicht lückenlos abdecken kann.</strong> Der <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützte Wächterrundgang</Link> von Camzify führt automatische KI-Rundgänge auf Ihren vorhandenen Kameras durch: Er prüft jeden Punkt, meldet Fehler und benachrichtigt die richtige Person.</>}
        facts={['Sperrbereiche nach Schichtende unbeobachtet', 'Zaunlinien nachts ohne Abdeckung', 'Lager mit nur einem Kontrollgang pro Nacht']}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/ki-waechterrundgang/so-funktioniert-es', label: 'So läuft ein Rundgang ab' }}
        visual={<SiteImage
              src="/ai-security-for-manufacturing.webp" alt="KI-überwachte Produktionshalle mit einem Begrenzungsrahmen um ein Paket auf einem Förderband, dazu Beschäftigte, Maschinen und ein Produktionsmitarbeiter in PSA" className="w-full rounded-xl"
              width={1600}
              height={900}
              sizes="(max-width: 1024px) 100vw, 60vw"
            priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div>
            <h2 className="font-display text-2xl font-bold">Typische Sicherheitslücken in der Produktion, die Camzify schließt:</h2>
            <ul className="mt-4 grid gap-3 text-muted-foreground sm:grid-cols-2">
                  <li className="flex gap-2">• Sperrbereiche an Maschinen, die nach Schichtende betreten werden, ohne dass jemand hinsieht</li>
                  <li className="flex gap-2">• Zaunlinien und Außenflächen ohne durchgehende Abdeckung in der Nacht</li>
                  <li className="flex gap-2">• Rohstoff- und Fertigwarenlager, die sich auf einen einzigen nächtlichen Kontrollgang verlassen</li>
                  <li className="flex gap-2">• Verlade- und Versandbereiche, die zwischen geplanten Touren unbeobachtet bleiben</li>
                  <li className="flex gap-2">• Kamerasabotage oder Ausfälle in kritischen Bereichen, die stundenlang unbemerkt bleiben</li>
                  <li className="flex gap-2">• Kein Nachweis, dass Perimeter- und Bereichskontrollen tatsächlich stattgefunden haben</li>
                </ul>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Warum Produktionsbetriebe eine durchgehende KI-Überwachung brauchen</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Produktionsstandorte verbinden große Hallenflächen mit Außenflächen, Laderampen und Zäunen, oft verteilt auf mehrere Gebäude und Schichten. Sperrbereiche an Maschinen, Rohstoffe und Fertigwaren bergen echte Risiken, doch die Abdeckung ist meist genau dann am dünnsten, wenn das Werk am wenigsten besetzt ist: zwischen den Schichten und nachts.</p>
                <p>Ein Kontrollgang des Werkschutzes über ein großes Industriegelände erfasst bei jedem Durchgang nur einen Bruchteil des Geländes, und herkömmliche Videoüberwachung zeichnet Hof und Verladebereiche auf, ohne dass jemand die Aufnahmen sichtet, bis bereits etwas fehlt oder beschädigt ist.</p>
                <p>Eine durchgehende KI-Überwachung führt nach festem Zeitplan einen Rundgang über jede Kamera des Standorts durch, innen wie außen.</p>
                <PointList items={[
                  'Sie meldet einen Zaundurchbruch in dem Moment, in dem er passiert.',
                  'Sie meldet das unbefugte Betreten eines Bereichs in dem Moment, in dem es passiert.',
                  'Sie meldet eine ausgefallene Kamera in dem Moment, in dem es passiert, statt erst beim nächsten planmäßigen Kontrollgang.',
                ]} />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Drei Fragen, die der Werkschutz stellt</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">„Ist nach Schichtende noch jemand im Sperrbereich an den Maschinen?“</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify beantwortet das mit der <Link href="/de/ki-funktionen/bereichsueberwachung" className="text-primary hover:underline">Bereichsüberwachung</Link> und der automatischen Prüfung im Rundgang.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">„Wurden in der Nacht alle Perimeterkontrollen erledigt?“</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify beantwortet das mit der <Link href="/de/ki-funktionen/linienueberschreitung" className="text-primary hover:underline">Erkennung von Linienüberschreitungen</Link> und der automatischen Prüfung im Rundgang.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">„Hat jemand die Kamera am Rohstofflager manipuliert?“</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify beantwortet das mit der <Link href="/de/ki-funktionen/sabotageerkennung" className="text-primary hover:underline">Erkennung von Kamerasabotage</Link> und der automatischen Prüfung im Rundgang.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/industry-manufacturing-2.webp" alt="Die Konsole beim Einrichten einer Erkennung an einer Kamera in der Produktion, der Bereich über das Livebild gezeichnet" caption="Einrichten einer Erkennung in der Konsole" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">So arbeitet Camzify in der Produktion</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Die Route aufbauen</h3>
                <p className="mt-2 text-muted-foreground">
                  Ein Rundgangsablauf wird einmal eingerichtet: Er ordnet jeden Kontrollpunkt, also Sperrbereiche an Maschinen, Zaunlinien, Rohstofflager und Verladebereiche, zu einer einzigen Route, die nach einem einstellbaren Zeitplan läuft.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Jeden Kontrollpunkt prüfen</h3>
                <p className="mt-2 text-muted-foreground">
                  An jedem Kontrollpunkt prüft die KI die für diese Kamera festgelegten Bedingungen mit der <Link href="/de/ki-funktionen/bereichsueberwachung" className="text-primary hover:underline">Bereichsüberwachung</Link> und der <Link href="/de/ki-funktionen/linienueberschreitung" className="text-primary hover:underline">Erkennung von Linienüberschreitungen</Link>.
                </p>
                <PointList items={[
                  'Sie prüft, ob der Maschinenbereich frei ist.',
                  'Sie prüft, ob die Zaunlinie intakt ist.',
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
                <h2 className="font-display text-2xl font-bold">Was an einem Produktionsstandort eingerichtet wird</h2>
                <p className="mt-4 text-muted-foreground">Die meisten Einrichtungen in der Produktion starten mit diesen Punkten:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Sperrbereiche über Maschinenbereichen, Gefahrstofflagern und Rohstoffen</li>
                  <li className="flex gap-2">• Linienregeln am Perimeter für Zaunlinien und Fahrzeugtore</li>
                  <li className="flex gap-2">• Zeitpläne für Laderampen und Versandbereiche, abgestimmt auf die Betriebszeiten</li>
                  <li className="flex gap-2">• Eine Rundgangsfrequenz außerhalb der Betriebszeiten, typischerweise alle 30 bis 60 Minuten in der Nacht</li>
                  <li className="flex gap-2">• Eine Eskalation an den Werkschutz oder die Haustechnik in Rufbereitschaft</li>
                </ul>
              </div>
            </ScrollReveal>
            <PhotoFigure src="/industry-manufacturing-3.webp" alt="Live-Streaming einer Kamera in der Produktion, Personen und Fahrzeuge beim Tracking umrissen" caption="Livebild mit Tracking" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/industry-manufacturing-4.jpg" alt="Bilder aus einem Rundgang über den Produktionsstandort, jedes mit dem ausgelösten Alarm" caption="Rundgangsbilder mit Alarmen" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Typische Szenarien</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Eine Person oder ein Fahrzeug gelangt nach Schichtende in einen Sperrbereich an den Maschinen</li>
                  <li className="flex gap-2">• Ein Zaun wird nachts oder am Wochenende überquert</li>
                  <li className="flex gap-2">• Eine Laderampe wird außerhalb eines geplanten Versandfensters genutzt</li>
                  <li className="flex gap-2">• Die Kamera am Rohstofflager fällt mitten in der Schicht aus</li>
                  <li className="flex gap-2">• Unbefugte halten sich nach Betriebsschluss in der Nähe des Gefahrstofflagers auf</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Hinweise zur Einrichtung</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Produktionsumgebungen umfassen große Hallenflächen, Außenflächen und Verladeeinrichtungen. Vorhandene IP-Kameras im Werksnetz lassen sich direkt per RTSP anbinden. Für Standorte mit NAT- oder Firewall-Einschränkungen gibt es den Camzify Connector.</p>
            </ScrollReveal>
          </div>

          <DeploymentSteps phases={deploymentPhases} heading="So sieht eine erste Einrichtung aus" />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                Wie sich die Zahlen für Ihr Werk rechnen, zeigt der <Link href="/roi-calculator" className="text-primary hover:underline">ROI-Rechner</Link> (auf Englisch); das Lizenzmodell pro Instanz erklärt die Seite <Link href="/de/preise" className="text-primary hover:underline">Preise</Link>. Aufzeichnung und Aufbewahrung für dieselben Kameras beschreibt die Seite zum <Link href="/de/cloud-videomanagementsystem" className="text-primary hover:underline">Cloud-Videomanagementsystem</Link>.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Eingesetzte KI-Funktionen</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/de/ki-funktionen/bereichsueberwachung" className={chip}>Bereichsüberwachung</Link>
                  <Link href="/de/ki-funktionen/linienueberschreitung" className={chip}>Linienüberschreitung</Link>
                  <Link href="/de/ki-funktionen/sabotageerkennung" className={chip}>Kamerasabotage</Link>
                  <Link href="/ai-features/multi-object-tracking" className={chip}>Multi-Objekt-Tracking</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Verwandte Anwendungsfälle</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/perimeter-security" className={chip}>Perimeterschutz</Link>
                  <Link href="/use-cases/unauthorized-access-detection" className={chip}>Erkennung unbefugten Zutritts</Link>
                  <Link href="/use-cases/night-security" className={chip}>Nachtüberwachung</Link>
                  <Link href="/use-cases/virtual-patrolling-for-compliance-evidence" className={chip}>Wächterrundgang als Compliance-Nachweis</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Verwandte Branchen</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/de/branchen/lager-und-logistik" className={chip}>Lager und Logistik</Link>
                  <Link href="/de/branchen/baustellen" className={chip}>Baustellen</Link>
                  <Link href="/industries/energy" className={chip}>Energie und Versorgung</Link>
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
