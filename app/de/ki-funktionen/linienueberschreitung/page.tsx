import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { PhotoFigure } from '@/components/content/photo-figure';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';

const pageMeta = {
  title: 'Linienüberschreitung | Virtueller Stolperdraht',
  description: 'Die Linienüberschreitung von Camzify ist ein virtueller Stolperdraht mit Richtung. Sie löst bei bestätigten Objekt-Tracks aus, nicht bei Pixelbewegung.',
  path: '/de/ki-funktionen/linienueberschreitung',
};

export const metadata = generatePageMeta(pageMeta);

const chip = 'rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary';

const faqs = [
  { question: 'Was ist Linienüberschreitung?', answer: 'Die Erkennung von Linienüberschreitungen, auch virtueller Stolperdraht oder Tripwire genannt, ist eine KI-Funktion, die einen Alarm auslöst, wenn ein verfolgtes Objekt eine festgelegte Linie im Kamerabild überquert. Anders als pixelbasierte Bewegungserkennung arbeitet sie mit bestätigten Objekt-Tracks, sodass Schatten, Lichtwechsel und Bildrauschen keine Fehlalarme auslösen.' },
  { question: 'Kann ich die Überschreitungsrichtung festlegen?', answer: 'Ja. Für jede Linie lässt sich die Richtung einstellen: von links nach rechts, von rechts nach links oder in beide Richtungen. Das ist entscheidend bei Toren mit nur einer Durchgangsrichtung, Zufahrten zu Laderampen oder Zaunlinien am Perimeter, an denen nur das Überschreiten von außen nach innen zählt.' },
  { question: 'Worin unterscheidet sie sich von der Bewegungserkennung?', answer: 'Die Bewegungserkennung reagiert auf Pixelveränderungen im Bild. Die Linienüberschreitung reagiert darauf, dass ein bestätigter Objekt-Track eine bestimmte Linie überquert. Der Unterschied liegt in der Genauigkeit: Die Bewegungserkennung erfasst alles, auch irrelevante Bewegung; die Linienüberschreitung erfasst nur, was zählt.' },
  { question: 'Wie viele Linien kann ich auf eine Kamera legen?', answer: 'Eine einzelne Kamera kann mehrere Linien tragen, jeweils mit eigener Richtung, Empfindlichkeit und eigenem Zeitplan. Ein Weitwinkelbild einer Zaunlinie kann zum Beispiel getrennte Linien für ein Fahrzeugtor und einen Fußgängerdurchgang tragen, ohne dass eine zweite Kamera nötig ist.' },
  { question: 'Löst sie bei Tieren oder aufgewirbeltem Laub aus?', answer: 'Der zugrunde liegende Objekt-Tracker ist darauf trainiert, Personen, Fahrzeuge und andere bestätigte Objektklassen von Bewegungen in der Umgebung wie wehendem Laub, Regen oder kleinen Tieren zu unterscheiden. Zusätzlich lassen sich die Objektklassen, die einen Alarm auslösen, pro Linie einschränken, sodass eine Perimeterlinie alles ignoriert, was keine Person und kein Fahrzeug ist.' },
  { question: 'Funktioniert die Linienüberschreitung auch nachts?', answer: 'Die Erkennungsqualität bei Nacht hängt von der Restlicht- oder Infrarotleistung der Kamera ab, nicht vom Erkennungsmodell selbst. Jedes Kamerabild, auf dem ein Mensch eine Person oder ein Fahrzeug erkennen könnte, reicht dem Tracker, um einen bestätigten Objekt-Track aufzubauen.' },
];

export default function DeLinienueberschreitungPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'KI-Funktionen', href: '/de/ki-funktionen' },
      { label: 'Linienüberschreitung' },
    ]}>
      <FeatureHero
        eyebrow="KI-Erkennung · Linienüberschreitung"
        title="Linienüberschreitung"
        lede={<><strong className="font-semibold text-foreground">Die Linienüberschreitung ist ein virtueller Stolperdraht, der über einen beliebigen Bereich im Kamerabild gelegt wird, mit Richtungssteuerung.</strong> Sie löst aus, wenn ein bestätigter Objekt-Track die Linie überquert – nicht, wenn sich ein Schatten bewegt oder ein Licht flackert. Sie ist die Grundlage des Perimeterschutzes in Camzify.</>}
        facts={['Personen, die eine Zaunlinie am Perimeter überqueren', 'Fahrzeuge, die in eine gesperrte Ladezone fahren', 'Richtungsabhängige Durchgänge an Toren und Drehkreuzen']}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/ki-funktionen', label: 'Alle 23 Erkennungen' }}
        visual={<PhotoFigure src="/feature-line-intrusion-detection-1.webp" alt="Die Live-Ansicht der Konsole mit einem Alarm wegen Linienüberschreitung im Kamerabild" caption="Linienüberschreitung" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div>
            <h2 className="font-display text-2xl font-bold">Diese Funktion erkennt und meldet:</h2>
            <ul className="mt-4 grid gap-3 text-muted-foreground sm:grid-cols-2">
              <li className="flex gap-2">• Personen, die eine Zaunlinie am Perimeter überqueren</li>
              <li className="flex gap-2">• Fahrzeuge, die in eine gesperrte Ladezone fahren</li>
              <li className="flex gap-2">• Richtungsabhängige Durchgänge an Toren mit nur einer Durchgangsrichtung oder an Drehkreuzen</li>
              <li className="flex gap-2">• Bewegungen über gesicherte Grenzen außerhalb der Betriebszeiten</li>
              <li className="flex gap-2">• Wiederholtes Überschreiten derselben Linie innerhalb kurzer Zeit</li>
            </ul>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Warum Linienüberschreitung wichtig ist</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>Ein Perimeterzaun oder eine Grundstücksgrenze schreckt nur ab, wenn jemand oder etwas sie durchgehend im Blick hat. Ein Sicherheitsmitarbeiter auf einem Kontrollgang sieht eine Grenze bestenfalls ein paar Minuten pro Stunde; die übrige Zeit bleibt die Linie unbeobachtet.</p>
                <p>Fest installierte Bewegungsmelder und einfache Alarme auf Basis von Pixelveränderungen schließen einen Teil dieser Lücke, lösen aber bei allem aus, was sich im Bild bewegt: einem Lieferwagen, der auf der Straße vor dem Zaun vorbeifährt, einem Ast im Wind, einer Katze auf dem Hof. Sicherheitsteams gehen entweder in Fehlalarmen unter oder senken die Empfindlichkeit so weit, dass auch echte Überschreitungen übersehen werden.</p>
                <p>Die Linienüberschreitung löst beide Probleme zugleich: Sie beobachtet die Grenze jede Sekunde, an jedem Tag, und löst nur aus, wenn ein bestätigter Personen- oder Fahrzeug-Track die Linie tatsächlich in der Richtung überquert, auf die es ankommt.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/feature-line-intrusion-detection-2.webp" alt="Eine Bildfolge einer Kamera, die zeigt, wie sich eine Linienüberschreitung bis zum Alarm entwickelt" caption="Logik des Stolperdrahts" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">So funktioniert es</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Die Überschreitung erkennen</h3>
                <p className="mt-2 text-muted-foreground">
                  Das Modell nutzt <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">Multi-Object-Tracking</Link>, um
                  jedem erfassten Objekt im Bild von Bild zu Bild eine dauerhafte Identität zu geben. Die Linienregel wertet einen einzelnen bestätigten Track aus – nicht ein einzelnes Bild mit Pixelveränderung.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Richtungslogik</h3>
                <p className="mt-2 text-muted-foreground">
                  Schneidet die Bahn eines verfolgten Objekts die festgelegte Linie, prüft das System die Bewegungsrichtung gegen die eingestellte Regel. Eine Linie, die nur beim Überschreiten von außen nach innen alarmiert, ignoriert eine Person, die sich von der Grenze entfernt, und halbiert damit an den meisten Perimeterpunkten ungefähr die Zahl der Alarme.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alarmzustellung</h3>
                <p className="mt-2 text-muted-foreground">
                  Jeder Alarm enthält den Objekttyp, einen Konfidenzwert und einen Zeitstempel.
                </p>
                <PointList className="mt-3" items={[
                  <>Ist die <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">KI-Attributerkennung</Link> aktiviert, enthält der Alarm zusätzlich strukturierte Attribute wie Kleidungsfarbe und eine Beschreibung des Verhaltens.</>,
                  <>Alarme laufen über das Benachrichtigungssystem der Plattform und erscheinen in der <Link href="/de/plattform/alarme-und-benachrichtigungen" className="text-primary hover:underline">Alarm-Warteschlange</Link>.</>,
                  'Jeder Alarm in der Warteschlange zeigt seinen Schweregrad und seinen Quittierungsstatus und lässt sich als Fehlalarm markieren.',
                ]} />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Konfiguration</h2>
                <p className="mt-4 text-muted-foreground">
                  Linien werden im Konfigurationsbereich direkt auf das Kamerabild gezeichnet. Jede Linie unterstützt:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Richtungssteuerung: A→B, B→A oder beide Richtungen</li>
                  <li className="flex gap-2">• Empfindlichkeit pro Linie einstellbar</li>
                  <li className="flex gap-2">• Benachrichtigungszeitfenster pro Kamera, z. B. nur außerhalb der Betriebszeiten benachrichtigen</li>
                  <li className="flex gap-2">• Filter nach Objektklasse, z. B. nur Personen und Fahrzeuge</li>
                  <li className="flex gap-2">• Mehrere Linien pro Kamera, jeweils mit eigenen Regeln</li>
                </ul>
              </div>
            </ScrollReveal>
            <PhotoFigure src="/feature-line-intrusion-detection-3.webp" alt="Konfigurationsbereich mit einer gerichteten Linie über dem Kamerabild sowie Einstellungen für Empfindlichkeit und Zeitplan" caption="Linienkonfiguration" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/feature-line-intrusion-detection-4.webp" alt="Kameraszenen von mehreren Standorten, an denen die Linienüberschreitung eingesetzt wird" caption="Perimeterüberwachung" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Typische Szenarien</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Eine Zaunlinie am Perimeter, die nach Geschäftsschluss überwacht wird und nur beim Überschreiten von außen nach innen alarmiert</li>
                  <li className="flex gap-2">• Eine Fahrspur an der Laderampe, auf der Fahrzeuge außerhalb der geplanten Lieferzeiten einen Alarm auslösen</li>
                  <li className="flex gap-2">• Eine Dachluke, bei der jede Überschreitung als Verstoß gewertet wird</li>
                  <li className="flex gap-2">• Eine Grenze in einem Parkhaus, die öffentliche Flächen von Bereichen nur für Mitarbeitende trennt</li>
                  <li className="flex gap-2">• Ein Bauzaun, der nur nachts und am Wochenende scharf geschaltet ist</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Im Rundgang</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Bei einem <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützten Wächterrundgang</Link> fließen
                Alarme wegen Linienüberschreitung in die Prüfung an jedem Kamera-Kontrollpunkt ein. Hat ein Alarm zwischen zwei Rundgängen
                ausgelöst, wird er zusammen mit den Ergebnissen der Checkliste im Kontrollprotokoll festgehalten.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Die Aufnahmen rund um jeden Alarm werden im{' '}
                <Link href="/de/cloud-videomanagementsystem" className="text-primary hover:underline">Cloud-Videomanagementsystem</Link> mit der Aufbewahrungsdauer der jeweiligen Kamera gespeichert, sodass Clip und zugehörige Aufzeichnung im selben Konto liegen.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Branchen</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/de/branchen/lager-und-logistik" className={chip}>Lager und Logistik</Link>
                  <Link href="/de/branchen/industrie-und-produktion" className={chip}>Industrie und Produktion</Link>
                  <Link href="/de/branchen/baustellen" className={chip}>Baustellen</Link>
                  <Link href="/industries/energy" className={chip}>Energie (EN)</Link>
                  <Link href="/industries/remote-sites" className={chip}>Abgelegene Standorte (EN)</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Verwandte Erkennungen</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/de/ki-funktionen/bereichsueberwachung" className={chip}>Bereichsüberwachung</Link>
                  <Link href="/ai-features/multi-object-tracking" className={chip}>Multi-Object-Tracking (EN)</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Anwendungsfälle</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/perimeter-security" className={chip}>Perimeterschutz (EN)</Link>
                  <Link href="/use-cases/unauthorized-access-detection" className={chip}>Unbefugter Zutritt (EN)</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={faqs} locale="de" />
    </PageShell>
  );
}
