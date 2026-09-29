import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { PhotoFigure } from '@/components/content/photo-figure';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';

const pageMeta = {
  title: 'Bereichsüberwachung | Gesperrte Bereiche',
  description: 'Die Bereichsüberwachung von Camzify legt gesperrte Bereiche als Polygone fest. Jedes bestätigte Objekt darin löst einen Alarm aus, egal aus welcher Richtung.',
  path: '/de/ki-funktionen/bereichsueberwachung',
};

export const metadata = generatePageMeta(pageMeta);

const chip = 'rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary';

const faqs = [
  { question: 'Was ist Bereichsüberwachung?', answer: 'Die Bereichsüberwachung legt im Kamerabild einen gesperrten Bereich als Polygon fest und löst einen Alarm aus, sobald darin ein bestätigter Objekt-Track erkannt wird, unabhängig davon, aus welcher Richtung oder auf welchem Weg das Objekt hineingelangt ist. Sie ist für umschlossene oder unregelmäßig geformte Flächen wie Räume, Gitterboxen und Dächer gedacht, nicht für das Überschreiten einer einzelnen Grenze.' },
  { question: 'Worin unterscheidet sie sich von der Linienüberschreitung?', answer: 'Die Linienüberschreitung löst aus, wenn ein bestätigter Track eine einzelne festgelegte Linie überquert. Die Bereichsüberwachung löst bei Anwesenheit an einer beliebigen Stelle innerhalb einer umschlossenen Fläche aus und eignet sich damit besser für Räume, Gitterboxen und unregelmäßige Grenzen mit mehreren möglichen Zugängen.' },
  { question: 'Kann ein Bereich eine ungewöhnliche Form haben?', answer: 'Ja. Bereiche werden als beliebige Polygone direkt auf das Kamerabild gezeichnet und sind nicht auf Rechtecke beschränkt. Die Grenze kann so der tatsächlichen Form eines Raums, einer Gitterbox oder eines teilweise verdeckten Bildausschnitts folgen.' },
  { question: 'Löst sie aus, wenn jemand nur kurz am Rand eines Bereichs vorbeigeht?', answer: 'Für jeden Bereich lässt sich eine Verweildauer festlegen. Ein Bereich kann also sofort bei jedem bestätigten Eintritt alarmieren oder erst, wenn sich eine Person länger als eine festgelegte Anzahl Sekunden darin aufhält. So wird vermieden, dass jemand, der sich nur kurz an der Grenze befindet, einen Alarm auslöst.' },
  { question: 'Wie viele Bereiche kann eine Kamera haben?', answer: 'Eine einzelne Kamera kann mehrere Bereiche tragen, jeweils mit eigener Form, Empfindlichkeit, eigenem Objektklassen-Filter und Zeitplan. Ein Weitwinkelbild, das einen Serverraum und eine angrenzende Lagergitterbox erfasst, kann getrennte Bereichsregeln tragen, ohne dass eine zweite Kamera nötig ist.' },
  { question: 'Gibt es weniger Fehlalarme als bei einem einfachen Bewegungsalarm?', answer: 'Ja. Weil sie bestätigte Objekt-Tracks aus dem Multi-Object-Tracking auswertet und nicht reine Pixelveränderungen, löst sie nicht bei Lichtwechseln, Schatten oder Bewegungen in der Umgebung aus, wie es ein einfacher Bewegungsalarm tut.' },
];

export default function DeBereichsueberwachungPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'KI-Funktionen', href: '/de/ki-funktionen' },
      { label: 'Bereichsüberwachung' },
    ]}>
      <FeatureHero
        eyebrow="KI-Erkennung · Bereichsüberwachung"
        title="Bereichsüberwachung"
        lede={<><strong className="font-semibold text-foreground">Die Bereichsüberwachung legt im Kamerabild gesperrte Bereiche als Polygone fest.</strong> Jeder bestätigte Objekt-Track, der in den Bereich gelangt, löst einen Alarm aus, unabhängig davon, wie oder aus welcher Richtung das Objekt ins Bild gekommen ist. Das eignet sich für Sperrbereiche, Serverräume und Gefahrenzonen.</>}
        facts={['Betreten eines gesperrten Server- oder Elektroverteilerraums', 'Stapler oder Fahrzeug im reinen Fußgängerbereich', 'Personen in einem Gefahrstoff- oder Chemikalienlager']}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/ki-funktionen', label: 'Alle 23 Erkennungen' }}
        visual={<PhotoFigure src="/feature-zone-intrusion-detection-1.webp" alt="Die Live-Ansicht der Konsole mit einem Alarm der Bereichsüberwachung im Kamerabild" caption="Bereichsüberwachung" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div>
            <h2 className="font-display text-2xl font-bold">Diese Funktion erkennt und meldet:</h2>
            <ul className="mt-4 grid gap-3 text-muted-foreground sm:grid-cols-2">
              <li className="flex gap-2">• Jede Person, die einen gesperrten Serverraum oder Elektroverteilerraum betritt</li>
              <li className="flex gap-2">• Einen Stapler oder ein anderes Fahrzeug, das in einen reinen Fußgängerbereich fährt</li>
              <li className="flex gap-2">• Personen in einem Gefahrstoff- oder Chemikalienlager</li>
              <li className="flex gap-2">• Jeden Objekt-Track in einer Sperrzone außerhalb der Betriebszeiten</li>
              <li className="flex gap-2">• Wiederholtes Betreten desselben Bereichs innerhalb kurzer Zeit</li>
              <li className="flex gap-2">• Eine Person, die länger als die eingestellte Verweildauer in einem Bereich bleibt</li>
            </ul>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Warum Bereichsüberwachung wichtig ist</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>Manche Bereiche haben keinen einzelnen Übergang: Ein Serverraum, eine Chemikalien-Gitterbox oder eine Technikfläche auf dem Dach ist eine Fläche, die jederzeit frei von Unbefugten bleiben muss, egal durch welche Tür, Luke oder Lücke jemand hineingelangt.</p>
                <p>Eine Linienregel erfasst immer nur einen Übergang.</p>
                <PointList items={[
                  'Eine unregelmäßige Grenze mit mehreren möglichen Zugängen braucht mehrere aufeinander abgestimmte Linien und lässt an den Ecken trotzdem Lücken.',
                  'Sicherheitsmitarbeiter, die einen Sperrbereich auf einem Kontrollgang prüfen, sehen ihn nur wenige Sekunden pro Stunde.',
                  'Ein fest installierter Türalarm übersieht jeden, der durch eine Wartungsluke, eine abgehängte Deckenplatte oder ein Fenster hineinkommt.',
                ]} />
                <p>Die Bereichsüberwachung ersetzt all das durch ein einziges Polygon über der Fläche, die eine Kamera sieht. Eintritt ist Eintritt, egal auf welchem Weg, und der Alarm löst in dem Moment aus, in dem sich ein bestätigter Objekt-Track innerhalb der Grenze befindet.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/feature-zone-intrusion-detection-2.webp" alt="Eine Bildfolge einer Kamera, die zeigt, wie sich ein Eindringen in einen Bereich bis zum Alarm entwickelt" caption="Logik beim Betreten eines Bereichs" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">So funktioniert es</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Den Bereich festlegen</h3>
                <p className="mt-2 text-muted-foreground">
                  Ein Bediener zeichnet im Konfigurationsbereich ein beliebiges Polygon direkt über das Kamerabild. Das muss kein Rechteck sein, sondern kann jede Form haben, die der tatsächlichen Grenze des Sperrbereichs entspricht, auch bei unregelmäßigen Räumen, Gitterboxen oder teilweise verdeckten Bildausschnitten.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Den Eintritt erkennen</h3>
                <p className="mt-2 text-muted-foreground">
                  Das System nutzt dieselbe <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">Multi-Object-Tracking</Link>-Engine wie die übrige Plattform. Ein Track wird in jedem Bild gegen das Polygon des Bereichs geprüft – sobald ein Teil der Position eines bestätigten Tracks innerhalb der Grenze liegt, gilt der Bereich als betreten, ohne dass das Objekt zuerst eine bestimmte Kante überqueren muss.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alarmzustellung</h3>
                <p className="mt-2 text-muted-foreground">
                  Jeder Bereich kann einen eigenen Objektklassen-Filter und eine eigene Verweildauer haben. Ein Bereich lässt sich also so einstellen, dass er bei jeder Person sofort alarmiert oder erst, wenn sich jemand länger als eine festgelegte Anzahl Sekunden darin aufhält.
                </p>
                <PointList className="mt-3" items={[
                  'Alarme enthalten den Objekttyp, einen Konfidenzwert und einen Zeitstempel.',
                  <>Ist die <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">KI-Attributerkennung</Link> aktiviert, enthalten Alarme zusätzlich strukturierte Attribute, die die erfasste Person beschreiben.</>,
                  <>Alarme laufen mit Schweregrad und Quittierungsstatus in die <Link href="/de/plattform/alarme-und-benachrichtigungen" className="text-primary hover:underline">Alarm-Warteschlange</Link>.</>,
                ]} />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Konfiguration</h2>
                <p className="mt-4 text-muted-foreground">
                  Bereiche werden im Konfigurationsbereich als Polygone direkt auf das Kamerabild gezeichnet. Jeder Bereich unterstützt:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Beliebige Polygonform, nicht auf Rechtecke beschränkt</li>
                  <li className="flex gap-2">• Verweildauer, bevor ein Alarm ausgelöst wird</li>
                  <li className="flex gap-2">• Benachrichtigungszeitfenster pro Kamera, z. B. nur außerhalb der Betriebszeiten benachrichtigen</li>
                  <li className="flex gap-2">• Filter nach Objektklasse, z. B. nur Personen oder Personen und Fahrzeuge</li>
                  <li className="flex gap-2">• Mehrere Bereiche pro Kamera, jeweils mit eigenen Regeln</li>
                  <li className="flex gap-2">• Empfindlichkeit pro Bereich einstellbar</li>
                </ul>
              </div>
            </ScrollReveal>
            <PhotoFigure src="/feature-zone-intrusion-detection-3.webp" alt="Konfigurationsbereich mit einem Polygon über einem Sperrbereich sowie Einstellungen für Verweildauer und Zeitplan" caption="Bereichskonfiguration" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/feature-zone-intrusion-detection-4.webp" alt="Kameraszenen von mehreren Standorten, an denen die Bereichsüberwachung eingesetzt wird" caption="Überwachung von Sperrbereichen" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Typische Szenarien</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Ein Serverraum, in dem jede Anwesenheit außerhalb geplanter Wartungsfenster einen Alarm auslöst</li>
                  <li className="flex gap-2">• Eine Chemikalien-Gitterbox, in der ein Betreten ohne zugewiesenen PSA-Ausweis als Verstoß gewertet wird</li>
                  <li className="flex gap-2">• Eine Technikfläche auf dem Dach, auf der unbefugte Anwesenheit unabhängig vom Zugang einen Alarm auslöst</li>
                  <li className="flex gap-2">• Eine Bereitstellungsfläche an der Laderampe, die während des Entladens nur befugtem Personal offensteht</li>
                  <li className="flex gap-2">• Ein Lagerraum im Einzelhandel, in dem Anwesenheit nach Geschäftsschluss sofort einen Alarm auslöst</li>
                  <li className="flex gap-2">• Ein Raum mit elektrischen Schaltanlagen, in dem ein Aufenthalt von mehr als ein paar Sekunden auf unbefugten Zutritt hinweist</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Im Rundgang</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Bei einem <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützten Wächterrundgang</Link> fließen
                Alarme dieser Erkennung in die Prüfung an jedem Kamera-Kontrollpunkt ein und werden im Kontrollprotokoll festgehalten.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 text-center">
              <h3 className="font-display text-lg font-bold">Weiterführend</h3>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Link href="/de/ki-funktionen" className={chip}>Alle KI-Funktionen</Link>
                <Link href="/de/cloud-videomanagementsystem" className={chip}>Cloud-Videomanagementsystem</Link>
                <Link href="/de/ki-waechterrundgang" className={chip}>KI-gestützter Wächterrundgang</Link>
                <Link href="/de/branchen/lager-und-logistik" className={chip}>Lager und Logistik</Link>
                <Link href="/industries/retail" className={chip}>Einzelhandel (EN)</Link>
                <Link href="/use-cases/perimeter-security" className={chip}>Perimeterschutz (EN)</Link>
                <Link href="/use-cases/car-theft-and-vandalism-in-parking-facilities" className={chip}>Autodiebstahl und Vandalismus in Parkanlagen (EN)</Link>
                <Link href="/de/preise" className={chip}>Preise</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={faqs} locale="de" />
    </PageShell>
  );
}
