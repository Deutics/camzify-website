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
 * German counterpart of /industries/construction-sites (pair in lib/i18n.ts).
 *
 * DeploymentPlan renders an English "Step 01" label with no prop to override it, so the
 * same block is inlined below with the German label (docs/I18N.md).
 */
const pageMeta = {
  title: 'KI-Videoüberwachung für Baustellen',
  description: 'Camzify macht aus den Kameras, die schon auf einer Baustelle stehen, Rundgänge: nächtliche Kontrollen, Alarme an die Wachperson und ein Protokoll pro Runde.',
  path: '/de/branchen/baustellen',
};

export const metadata = generatePageMeta(pageMeta);

const deploymentPhases = [
  { title: 'Die Baustelle vor der ersten Woche virtuell einzäunen', body: 'Zuerst werden temporäre und auf Anhängern montierte Kameras eingebunden, die den Bauzaun, das Tor und das Materiallager abdecken. Baustellen ohne festes Netz laufen über den Connector und eine Mobilfunkverbindung.' },
  { title: 'Die Stunden kontrollieren, in denen die Baustelle leer ist', body: 'Rundgänge werden nachts, am Wochenende und während Baustillständen geplant, also in den Zeitfenstern, in denen Maschinen- und Metalldiebstahl tatsächlich passiert, statt während der Arbeitszeit.' },
  { title: 'Die Abdeckung mit dem Bau mitziehen', body: 'Rundgangsabläufe werden umgeordnet, während die Baustelle fortschreitet und Lagerflächen umziehen. Kameras werden je Bauphase hinzugefügt und stillgelegt, und die Lizenzierung folgt der Zahl der Kameras statt einem festen Vertrag.' },
];

const faqs = [
  { question: 'Funktioniert Camzify mit temporären Kameras über 4G?', answer: 'Ja. Unterstützt die Kamera RTSP- oder HLS-Streaming über ihre Mobilfunkverbindung, kann Camzify sich mit ihr verbinden. Der Camzify Connector kann außerdem die Bilder von Kameras, die nur im lokalen Netz erreichbar sind, über Verbindungen mit begrenzter Bandbreite weiterleiten.' },
  { question: 'Wie schnell lässt sich Camzify auf einer neuen Baustelle einrichten?', answer: 'Sobald die Kameras streamen, ist ein Standort in Camzify in wenigen Minuten angelegt. Rundgangsablauf aufbauen, Kameras zuweisen, Checklisten einrichten, und die Rundgänge können noch am selben Tag laufen.' },
  { question: 'Wie geht Camzify mit Kameras um, die mit dem Baufortschritt umziehen?', answer: 'Bereiche und Kontrollpunkte hängen an der Kamera, nicht an einer festen Adresse. Wird eine Kamera mit dem Baufortschritt umgesetzt, lässt sich ihr Bereich in wenigen Minuten auf das neue Bild zeichnen, ohne den ganzen Rundgangsablauf neu aufzubauen.' },
  { question: 'Erzeugt Camzify Fehlalarme durch umherwehenden Schutt oder Planen?', answer: 'Die Erkennung richtet sich nach Objekttyp und Bereichsregeln statt nach reiner Bewegung. Das verringert Fehlauslösungen durch flatternde Planen, Staub oder wandernde Schatten. Empfindlichkeit und Form der Bereiche lassen sich bei der Einrichtung je Kamera anpassen, etwa für besonders exponierte oder windige Stellen.' },
  { question: 'Werden Aufnahmen einer Baustelle anders aufbewahrt als die eines festen Standorts?', answer: 'Die Aufbewahrung wird je Konto eingestellt und hängt nicht von der Art des Standorts ab. Eine temporäre Baustelle kann also für die gesamte Projektdauer dieselbe Aufbewahrungsdauer und dieselben Zugriffsregeln haben wie ein fester Standort.' },
  { question: 'Ersetzt der KI-gestützte Wächterrundgang unseren Nachtwächter auf der Baustelle?', answer: 'Für die meisten Baustellen verringert er den Bedarf an einem eigenen oder zusätzlichen Nachtwächter, statt die Sicherung der Baustelle ganz zu ersetzen. Viele Bauunternehmen kombinieren virtuelle Rundgänge mit einer kleineren Bereitschaft und decken mit der KI den gesamten Perimeter und die Lagerflächen zwischen den Kontrollen vor Ort ab.' },
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

export default function DeBaustellenPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: 'Sicherheitskameras für Baustellen, von KI überwacht', description: pageMeta.description, path: pageMeta.path, serviceType: 'KI-Videoüberwachung und KI-gestützter Wächterrundgang', audience: 'Bauunternehmen und Baustellen' })]} faqs={faqs} breadcrumbs={[
      { label: 'Branchen', href: '/de/branchen' },
      { label: 'Baustellen' },
    ]}>
      <FeatureHero
        eyebrow="Branche · Baustellen"
        title="Sicherheitskameras für Baustellen, von KI überwacht"
        lede={<><strong className="font-semibold text-foreground">Baustellen haben Sicherheitsprobleme, die Kameras allein nicht lösen und die Wachpersonal nicht lückenlos abdecken kann.</strong> Der <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützte Wächterrundgang</Link> von Camzify führt automatische KI-Rundgänge auf Ihren vorhandenen Kameras durch: Jeder Punkt wird beobachtet, Fehler werden gemeldet, und die richtige Person wird benachrichtigt.</>}
        facts={['Offene Perimeter mit versetzbaren Bauzaunfeldern', 'Geräte- und Materiallager mit nur einer Schlusskontrolle', 'Baucontainer und Werkzeuglager nachts unbeobachtet']}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/ki-waechterrundgang/so-funktioniert-es', label: 'So läuft ein Rundgang ab' }}
        visual={<SiteImage
              src="/ai-security-for-construction-sites.webp" alt="KI-überwachte Baustelle mit Begrenzungsrahmen um Beschäftigte, Geräte und Materiallager, dazu Drohnenansichten der Baustelle" className="w-full rounded-xl"
              width={1600}
              height={900}
              sizes="(max-width: 1024px) 100vw, 60vw"
            priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div>
            <h2 className="font-display text-2xl font-bold">Typische Sicherheitslücken auf Baustellen, die Camzify schließt:</h2>
            <ul className="mt-4 grid gap-3 text-muted-foreground sm:grid-cols-2">
                  <li className="flex gap-2">• Offene Perimeter, an denen Bauzaunfelder versetzt oder durchbrochen werden können</li>
                  <li className="flex gap-2">• Geräte- und Materiallager, die sich auf eine einzige Kontrolle bei Arbeitsende verlassen</li>
                  <li className="flex gap-2">• Baucontainer und Werkzeuglager, die nachts unbeobachtet bleiben</li>
                  <li className="flex gap-2">• Kamerapositionen, die sich mit dem Baufortschritt von Woche zu Woche ändern</li>
                  <li className="flex gap-2">• Kein Nachweis, dass ein nächtlicher Rundgang tatsächlich stattgefunden hat</li>
                  <li className="flex gap-2">• Diebstahl von Altmetall und Kupferkabeln, der erst am Morgen auffällt</li>
                </ul>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Warum Baustellen eine durchgehende KI-Überwachung brauchen</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Eine Baustelle steht weit mehr Stunden leer, als auf ihr gearbeitet wird: abends, am Wochenende und in den Pausen zwischen den Schichten. Gleichzeitig lagern dort Material, Maschinen und Kupferkabel, die begehrt und leicht abzutransportieren sind, sobald jemand den Zaun überwunden hat. Nachts ist eine Baustelle selten überhaupt besetzt, und wo doch, kann eine einzelne Person nicht gleichzeitig eine Lagerfläche, eine Reihe Baucontainer und den gesamten Perimeter im Blick behalten.</p>
                <p>Auch der Aufbau selbst ändert sich laufend. Zäune, Lagerflächen und Kamerapositionen verschieben sich mit dem Baufortschritt von Woche zu Woche. Eine feste Streifenroute oder das Prinzip „Aufnahmen später sichten“ hinkt der Baustelle damit fast sofort hinterher.</p>
                <p>Eine durchgehende KI-Überwachung wächst mit der Baustelle mit.</p>
                <PointList items={[
                  'Bereiche und Kontrollpunkte werden neu gezeichnet, wenn Kameras umziehen.',
                  'Der Rundgang prüft den gesamten Perimeter und die Lagerflächen nach einem wiederkehrenden Zeitplan.',
                  'Ein Durchbruch oder ein versetztes Zaunfeld wird in dem Moment gemeldet, in dem es passiert, statt erst, wenn jemand die Aufzeichnung sichtet.',
                ]} />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Drei Fragen, die Sicherheitsverantwortliche auf Baustellen stellen</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">„Hat jemand die Baustelle betreten, nachdem die Letzten gegangen waren?“</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify beantwortet das mit der <Link href="/de/ki-funktionen/linienueberschreitung" className="text-primary hover:underline">Erkennung von Linienüberschreitungen</Link> und der automatischen Prüfung im Rundgang.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">„Ist der Bauzaun noch intakt?“</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify beantwortet das mit der <Link href="/de/ki-funktionen/bereichsueberwachung" className="text-primary hover:underline">Bereichsüberwachung</Link> und der automatischen Prüfung im Rundgang.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">„Wurden die Gerätelager in der Nacht kontrolliert?“</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify beantwortet das mit der <Link href="/ai-features/motion-detection" className="text-primary hover:underline">Bewegungserkennung</Link> (auf Englisch) und der automatischen Prüfung im Rundgang.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/industry-construction-sites-2.webp" alt="Die Konsole beim Einrichten einer Erkennung an einer Baustellenkamera, der Bereich über das Livebild gezeichnet" caption="Einrichten einer Erkennung in der Konsole" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">So arbeitet Camzify auf der Baustelle</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Die Route aufbauen</h3>
                <p className="mt-2 text-muted-foreground">
                  Ein Rundgangsablauf wird einmal eingerichtet: Er ordnet jeden Kontrollpunkt, also Zaunlinien, den Gerätehof, Materiallagerflächen und Baucontainer, zu einer einzigen Route, die nach einem einstellbaren Zeitplan läuft und sich umordnen lässt, wenn sich der Aufbau der Baustelle ändert.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Jeden Kontrollpunkt prüfen</h3>
                <p className="mt-2 text-muted-foreground">
                  An jedem Kontrollpunkt prüft die KI die für diese Kamera festgelegten Bedingungen mit der Erkennung von <Link href="/de/ki-funktionen/linienueberschreitung" className="text-primary hover:underline">Linienüberschreitungen</Link>, der <Link href="/de/ki-funktionen/bereichsueberwachung" className="text-primary hover:underline">Bereichsüberwachung</Link> und der <Link href="/ai-features/motion-detection" className="text-primary hover:underline">Bewegungserkennung</Link> (auf Englisch).
                </p>
                <PointList items={[
                  'Sie prüft, ob die Zaunlinie intakt ist.',
                  'Sie prüft, ob der Hof frei ist.',
                  'Sie prüft auf Bewegung, wo keine sein sollte.',
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
                <h2 className="font-display text-2xl font-bold">Was auf einer Baustelle eingerichtet wird</h2>
                <p className="mt-4 text-muted-foreground">Die meisten Einrichtungen auf Baustellen starten mit diesen Punkten:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Linienregeln am Perimeter entlang der Bauzaunfelder</li>
                  <li className="flex gap-2">• Bereiche über dem Gerätehof und den Materiallagerflächen</li>
                  <li className="flex gap-2">• Bewegungserkennung, nach Feierabend auf Baucontainer und Werkzeuglager begrenzt</li>
                  <li className="flex gap-2">• Eine höhere Rundgangsfrequenz in Bauphasen mit hohem Diebstahlrisiko, etwa während der Kupfer- oder Kabelinstallation</li>
                  <li className="flex gap-2">• Ein schneller Ablauf, um Bereiche neu zu zeichnen, wenn sich Kamerapositionen mit dem Baufortschritt verschieben</li>
                </ul>
              </div>
            </ScrollReveal>
            <PhotoFigure src="/industry-construction-sites-3.webp" alt="Live-Streaming einer Baustellenkamera, Personen und Fahrzeuge beim Tracking umrissen" caption="Livebild mit Tracking" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/industry-construction-sites-4.jpg" alt="Bilder aus einem Rundgang über die Baustelle, jedes mit dem ausgelösten Alarm" caption="Rundgangsbilder mit Alarmen" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Typische Szenarien</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Ein Abschnitt des Bauzauns liegt am Morgen um oder wurde über Nacht versetzt</li>
                  <li className="flex gap-2">• Bewegung an der Materiallagerfläche, nachdem die Kolonne abgerückt ist</li>
                  <li className="flex gap-2">• Die Tür eines Baucontainers steht nach der letzten Schicht offen</li>
                  <li className="flex gap-2">• Ein unbekanntes Fahrzeug parkt nach Feierabend innerhalb des Baustellenzauns</li>
                  <li className="flex gap-2">• Eine Kamera wird durch Wind oder Maschinen in der Nähe aus der Ausrichtung gebracht</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Hinweise zur Einrichtung</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Baustellen brauchen temporäre Kameras, oft solarbetriebene Einheiten mit 4G/5G-Anbindung. Camzify verbindet sich per RTSP oder HLS mit diesen temporären Kameras und lässt sich neu einrichten, während sich die Baustelle verändert.</p>
            </ScrollReveal>
          </div>

          <DeploymentSteps phases={deploymentPhases} heading="So sieht eine erste Einrichtung aus" />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                Wie sich die Zahlen für Ihre Baustellen rechnen, zeigt der <Link href="/roi-calculator" className="text-primary hover:underline">ROI-Rechner</Link> (auf Englisch); das Lizenzmodell pro Instanz erklärt die Seite <Link href="/de/preise" className="text-primary hover:underline">Preise</Link>. Die <Link href="/guides/construction-site-security-checklist" className="text-primary hover:underline">Sicherheitscheckliste für Baustellen</Link> (auf Englisch) ist die tägliche Liste, die ein Rundgang abarbeitet. Aufzeichnung und Aufbewahrung für dieselben Kameras beschreibt die Seite zum <Link href="/de/cloud-videomanagementsystem" className="text-primary hover:underline">Cloud-Videomanagementsystem</Link>.
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
                  <Link href="/ai-features/motion-detection" className={chip}>Bewegungserkennung</Link>
                  <Link href="/de/ki-funktionen/sabotageerkennung" className={chip}>Kamerasabotage</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Verwandte Anwendungsfälle</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/trespassing-detection" className={chip}>Erkennung unbefugten Betretens</Link>
                  <Link href="/use-cases/perimeter-security" className={chip}>Perimeterschutz</Link>
                  <Link href="/use-cases/remote-site-monitoring" className={chip}>Überwachung abgelegener Standorte</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Verwandte Branchen</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/de/branchen/lager-und-logistik" className={chip}>Lager und Logistik</Link>
                  <Link href="/de/branchen/industrie-und-produktion" className={chip}>Industrie und Produktion</Link>
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
