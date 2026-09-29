import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { PhotoFigure } from '@/components/content/photo-figure';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';

const pageMeta = {
  title: 'Verweilerkennung | Alarm nach Verweildauer',
  description: 'Die Verweilerkennung von Camzify meldet Personen oder Fahrzeuge, die länger als die festgelegte Verweildauer in einem Bereich bleiben. Durchgehen zählt nicht.',
  path: '/de/ki-funktionen/verweilerkennung',
};

export const metadata = generatePageMeta(pageMeta);

const chip = 'rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary';

const faqs = [
  { question: 'Was ist Verweilerkennung?', answer: 'Die Verweilerkennung löst einen Alarm aus, wenn eine verfolgte Person oder ein verfolgtes Fahrzeug länger als eine von Ihnen festgelegte Verweildauer in einem definierten Bereich bleibt. Wer den Bereich nur durchquert, zählt nicht. Wer bleibt, schon.' },
  { question: 'Worin unterscheidet sie sich von der Bereichsüberwachung?', answer: 'Die Bereichsüberwachung löst beim Betreten aus: Jeder bestätigte Track im Bereich erzeugt einen Alarm. Die Verweilerkennung wartet. Sie misst, wie lange der Track bleibt, und alarmiert erst, wenn diese Zeit den Schwellenwert überschreitet. Das passt zu Orten, an denen man durchgehen, aber nicht verweilen darf.' },
  { question: 'Identifiziert sie die Person?', answer: 'Nein. Sie folgt einem Track aus dem Multi-Object-Tracking, keinem Gesicht und keiner Identität. Der Alarm enthält das Bild, die Uhrzeit, die bisherige Verweildauer im Bereich und, wenn die KI-Attributerkennung aktiviert ist, eine einfache Beschreibung wie die Kleidungsfarbe.' },
  { question: 'Kann ich für verschiedene Bereiche unterschiedliche Verweildauern festlegen?', answer: 'Ja. Jeder Bereich hat seine eigene Verweildauer. Ein SB-Foyer mit Geldautomaten kann also schon nach einem kurzen Aufenthalt alarmieren, während in einer Fahrgasse im Parkhaus mehr Zeit erlaubt ist, und jede Kamera kann mehr als einen Bereich tragen.' },
  { question: 'Löst sie bei Mitarbeitenden aus, die im Bereich arbeiten?', answer: 'Ein Benachrichtigungszeitfenster pro Kamera hält sie in den Stunden ruhig, in denen Mitarbeitende dort erwartet werden. Außerhalb dieses Zeitfensters oder in einem Bereich, in dem zu keiner Zeit jemand warten sollte, löst ein langer Aufenthalt den Alarm aus.' },
  { question: 'Braucht sie neue Kameras oder eine eigene Lizenz?', answer: 'Sie läuft auf denselben Kameras und im selben Konto wie jede andere Erkennung und wird pro Kamera-Instanz lizenziert. Nur die Kameras, die einen Verweilbereich beobachten, tragen sie.' },
];

export default function DeVerweilerkennungPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'KI-Funktionen', href: '/de/ki-funktionen' },
      { label: 'Verweilerkennung' },
    ]}>
      <FeatureHero
        eyebrow="KI-Erkennung · Verweilerkennung"
        title="Verweilerkennung"
        lede={<><strong className="font-semibold text-foreground">Die Verweilerkennung meldet, wenn eine Person oder ein Fahrzeug länger als eine von Ihnen festgelegte Verweildauer in einem definierten Bereich bleibt.</strong> Wer den Bereich kurz durchquert, wird ignoriert. Wer bleibt, wird mit Bild, Uhrzeit und bisheriger Verweildauer gemeldet. Der Unterschied zwischen jemandem, der einen Vorplatz überquert, und jemandem, der an einer Hintertür wartet, ist damit der Alarm selbst.</>}
        facts={['Eine Person, die nach Geschäftsschluss an einem Hintereingang wartet', 'Ein Fahrzeug, das länger als zum Absetzen am Tor oder Zaun steht', 'Jemand, der sich im SB-Foyer oder Treppenhaus aufhält']}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/ki-funktionen', label: 'Alle 23 Erkennungen' }}
        visual={<PhotoFigure src="/feature-loitering-detection-1.webp" alt="Die Live-Ansicht der Konsole mit einem Verweilalarm im Kamerabild" caption="Verweilerkennung" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div>
            <h2 className="font-display text-2xl font-bold">Diese Funktion erkennt und meldet:</h2>
            <ul className="mt-4 grid gap-3 text-muted-foreground sm:grid-cols-2">
              <li className="flex gap-2">• Eine Person, die außerhalb der Betriebszeiten an einem Hintereingang oder Lieferanteneingang wartet</li>
              <li className="flex gap-2">• Ein Fahrzeug, das an einem Tor, einer Zaunlinie oder einer Laderampe länger steht als zum Absetzen nötig</li>
              <li className="flex gap-2">• Jemanden, der sich in einem SB-Foyer mit Geldautomaten, einem Treppenhaus oder einer Fahrgasse im Parkhaus aufhält</li>
              <li className="flex gap-2">• Eine Person, die länger an einer Auslage, einer Gitterbox oder einer Lagertür steht, als es ein Kunde tun würde</li>
              <li className="flex gap-2">• Eine Person, die sich nach Schließung des Geländes noch am Rand eines Schulgeländes oder auf einem Spielplatz aufhält</li>
              <li className="flex gap-2">• Eine Gruppe, die sich in einem Bereich sammelt, in dem niemand warten sollte</li>
            </ul>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Warum Verweilerkennung wichtig ist</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>Den meisten Einbrüchen, Diebstählen und Übergriffen geht kein Überschreiten einer Grenze voraus, sondern ein Warten. Jemand steht an einer Hintertür, um zu sehen, ob jemand kommt, sitzt in einem Auto mit Blick auf ein Tor oder schleicht um eine Gitterbox im Lager, bevor er hineingreift.</p>
                <p>Regeln, die auf das Betreten reagieren, können das nicht erkennen.</p>
                <PointList items={[
                  'Eine Bereichsregel löst bei jedem aus, der hineintritt. Ein Vorplatz oder ein Foyer, das man durchqueren darf, erzeugt so Alarme, die niemand liest.',
                  'Ein Bewegungsalarm kann eine Lieferung nicht von einer Observation unterscheiden, denn in beiden Fällen bewegt sich etwas.',
                  'Ein Sicherheitsmitarbeiter auf einem Kontrollgang sieht den Bereich wenige Sekunden pro Stunde und kann nicht wissen, wie lange die Person vor seinem Rundgang schon dort war.',
                ]} />
                <p>Die Verweilerkennung misst genau das, was diese Werkzeuge nicht messen können: die Zeit an einem Ort. Der Bereich bleibt für alle ruhig, die ihn durchqueren, und meldet die Person, die nicht geht, solange sich noch etwas unternehmen lässt.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <div className="max-w-prose">
                <h2 className="font-display text-2xl font-bold">So funktioniert es</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Den Bereich festlegen</h3>
                <p className="mt-2 text-muted-foreground">
                  Ein Bediener zeichnet ein Polygon über den Teil des Kamerabilds, in dem Warten eine Rolle spielt: den Streifen vor einer Hintertür, den Vorraum mit dem Geldautomaten, die Zufahrt zu einem Tor. Der Bereich kann einer unregelmäßigen Grenze folgen statt einem Rechteck, und eine Kamera kann mehr als einen Bereich tragen.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Die Verweildauer messen</h3>
                <p className="mt-2 text-muted-foreground">
                  Die Erkennung folgt Tracks aus derselben <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">Multi-Object-Tracking</Link>-Engine, die auf der gesamten Plattform zum Einsatz kommt. Betritt ein bestätigter Track den Bereich, startet für diesen Track ein Timer. Verlässt er den Bereich, endet der Timer. Ein Track, der sich noch im Bereich befindet, wenn der Timer den eingestellten Schwellenwert überschreitet, ist das Ereignis; ein Track, der vorher gegangen ist, war nie eines.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alarmzustellung</h3>
                <p className="mt-2 text-muted-foreground">
                  Der Alarm enthält das Bild im Moment der Schwellenüberschreitung, die Uhrzeit, die bisherige Verweildauer und den Objekttyp. Er nimmt denselben Weg wie jede andere Erkennung.
                </p>
                <PointList className="mt-3" items={[
                  <>Ist die <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">KI-Attributerkennung</Link> aktiviert, enthält der Alarm zusätzlich eine einfache Beschreibung der Person, etwa die Kleidungsfarbe, damit ein Sicherheitsmitarbeiter weiß, nach wem er Ausschau halten muss.</>,
                  <>Er landet mit einem Schweregrad pro Kamera und einem Quittierungsstatus in der <Link href="/de/plattform/alarme-und-benachrichtigungen" className="text-primary hover:underline">Alarm-Warteschlange</Link> und erreicht die zuständige Person per E-Mail, SMS, WhatsApp oder Push-Benachrichtigung.</>,
                  <>Nichts daran identifiziert die Person. Es ist ein Track mit einer Dauer, kein Gesicht.</>,
                ]} />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-start gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Konfiguration</h2>
                <p className="mt-4 text-muted-foreground">
                  Verweilbereiche werden im Konfigurationsbereich auf das Kamerabild gezeichnet. Jeder Bereich unterstützt:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Eine eigene Verweildauer, damit sich ein Vorraum und eine Fahrgasse im Parkhaus unterscheiden können</li>
                  <li className="flex gap-2">• Ein Polygon beliebiger Form, passend zu der Fläche, auf der Warten eine Rolle spielt</li>
                  <li className="flex gap-2">• Ein Benachrichtigungszeitfenster pro Kamera, damit der Bereich ruhig bleibt, solange Mitarbeitende erwartet werden</li>
                  <li className="flex gap-2">• Eine Auswahl, was zählt: nur Personen oder Personen und Fahrzeuge</li>
                  <li className="flex gap-2">• Mehr als einen Bereich pro Kamera, jeweils mit eigenen Regeln</li>
                  <li className="flex gap-2">• Einen Schweregrad pro Kamera, damit eine Hintertür höher eingestuft werden kann als ein Vorplatz</li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Typische Szenarien</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Ein Hintereingang im Einzelhandel, an dem eine Person, die nach Geschäftsschluss wartet, gemeldet wird, bevor jemand die Tür probiert</li>
                  <li className="flex gap-2">• Eine Bankfiliale oder ein SB-Foyer, in dem ein langer Aufenthalt außerhalb der Öffnungszeiten an die Leitstelle geht</li>
                  <li className="flex gap-2">• Eine Zaunlinie an einem Lager, an der ein Fahrzeug, das mit Blick auf den Hof parkt, gemeldet wird, solange es noch dort steht</li>
                  <li className="flex gap-2">• Ein Schulgelände oder Spielplatz, auf dem Anwesenheit nach Schließung des Geländes an den Hausmeister gemeldet wird</li>
                  <li className="flex gap-2">• Der Parkplatz einer Wohnanlage, auf dem jemand, der zwischen den Fahrzeugen umhergeht, ohne das Gelände zu verlassen, das Ereignis ist</li>
                  <li className="flex gap-2">• Ein Lagerraum oder eine Gitterbox, an deren Tür jemand länger steht, als eine Kommissionierung dauert, und der an die Schichtleitung gemeldet wird</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Im Rundgang</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Bei einem <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützten Wächterrundgang</Link> fließen
                Alarme dieser Erkennung in die Prüfung an jedem Kamera-Kontrollpunkt ein und werden im Kontrollprotokoll festgehalten. Bei einem
                automatisierten Rundgang beobachtet die <Link href="/de/ki-waechterrundgang/risikoerkennung" className="text-primary hover:underline">Szenenbeobachtung</Link> jeden Kontrollpunkt zusätzlich für ein kurzes Zeitfenster. So unterscheidet ein Rundgang eine Person, die durchgeht, von einer Person, die noch da ist.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 text-center">
              <h3 className="font-display text-lg font-bold">Weiterführend</h3>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Link href="/de/ki-funktionen" className={chip}>Alle KI-Funktionen</Link>
                <Link href="/de/cloud-videomanagementsystem" className={chip}>Cloud-Videomanagementsystem</Link>
                <Link href="/de/ki-funktionen/bereichsueberwachung" className={chip}>Bereichsüberwachung</Link>
                <Link href="/de/ki-waechterrundgang" className={chip}>KI-gestützter Wächterrundgang</Link>
                <Link href="/industries/retail" className={chip}>Einzelhandel (EN)</Link>
                <Link href="/industries/financial-services" className={chip}>Finanzdienstleister (EN)</Link>
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
