import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { PhotoFigure } from '@/components/content/photo-figure';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

const pageMeta = {
  title: 'Erkennung von Kamerasabotage | Fünf Modi',
  description: 'Die Sabotageerkennung von Camzify überwacht fünf Modi: Unschärfe, Abdecken des Objektivs, Szenenwechsel, Helligkeitsänderung und eingefrorene Bilder.',
  path: '/de/ki-funktionen/sabotageerkennung',
};

export const metadata = generatePageMeta(pageMeta);

const chip = 'rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary';

const faqs = [
  { question: 'Was gilt als Kamerasabotage?', answer: 'Die Sabotageerkennung achtet auf fünf verschiedene Zustände: plötzliche Unschärfe, physisches Abdecken des Objektivs, einen schnellen Szenenwechsel, der darauf hinweist, dass die Kamera bewegt oder gedreht wurde, eine ungewöhnliche Helligkeitsänderung und eingefrorene Bilder, die auf eine Bildschleife oder einen Hardwaredefekt hindeuten. Jeder dieser Zustände löst einen Alarm aus.' },
  { question: 'Worin unterscheidet sich ein eingefrorenes Bild von einem Netzwerkausfall?', answer: 'Ein Alarm wegen eingefrorener Bilder löst aus, wenn das Videosignal anliegt, sich das Bild selbst aber nicht mehr verändert: ein Stream in der Schleife oder ein hängender Stream. Ein Netzwerk- oder Kameraausfall ist ein eigener Zustand, der an anderer Stelle der Plattform als Verbindungs- oder Offline-Alarm erscheint und nicht als Sabotageereignis.' },
  { question: 'Kann jemand ein Objektiv übersprühen oder abkleben, ohne einen Alarm auszulösen?', answer: 'Das physische Abdecken des Objektivs ist einer der fünf überwachten Sabotagemodi und genau dafür ausgelegt: Ein plötzlicher, anhaltender Verlust an Bilddetails, wie er bei einem verdeckten Objektiv auftritt, löst einen Alarm aus, statt als Dunkelheit oder Kamerafehler missverstanden zu werden.' },
  { question: 'Funktioniert die Sabotageerkennung bei Kameras mit automatischer Belichtung oder Fokussierung?', answer: 'Ja. Das Modell ist darauf abgestimmt, die automatischen Belichtungs- und Fokusanpassungen einer Kamera – die allmählich und vorhersehbar ablaufen – von einer plötzlichen, ungewöhnlichen Unschärfe oder Helligkeitsänderung zu unterscheiden, die auf einen physischen Eingriff hindeutet.' },
  { question: 'Wie schnell wird ein Sabotagealarm zugestellt?', answer: 'Erkennung und Alarmweiterleitung erfolgen nahezu in Echtzeit ab dem Moment, in dem ein Sabotagezustand bestätigt ist. Denn eine sabotierte Kamera ist ein toter Winkel für jede andere Erkennung, die auf diesem Kamerabild läuft, bis der Zustand behoben ist.' },
  { question: 'Wirkt sich ein Sabotagealarm auf andere Erkennungen derselben Kamera aus?', answer: 'Eine sabotierte Kamera kann andere Erkennungsmodelle nicht zuverlässig ausführen, bis der Sabotagezustand aufgehoben ist. Deshalb wird ein Sabotagealarm mit hoher Priorität behandelt – er zeigt faktisch an, dass der gesamte Erfassungsbereich der Kamera vorübergehend nicht überwacht wird.' },
];

export default function DeSabotageerkennungPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'KI-Funktionen', href: '/de/ki-funktionen' },
      { label: 'Kamerasabotage' },
    ]}>
      <FeatureHero
        eyebrow="KI-Erkennung · Kamerasabotage"
        title="Erkennung von Kamerasabotage"
        lede={<><strong className="font-semibold text-foreground">Die Sabotageerkennung überwacht fünf verschiedene Sabotagemodi: plötzliche Unschärfe, physisches Abdecken des Objektivs, einen schnellen Szenenwechsel, der darauf hinweist, dass die Kamera bewegt wurde, ungewöhnliche Helligkeitsänderungen und eingefrorene Bilder, die auf eine Bildschleife oder einen Hardwaredefekt hindeuten.</strong> Jeder dieser Zustände löst sofort einen Alarm aus.</>}
        facts={['Plötzliche Unschärfe, die das Bild für die Auswertung unbrauchbar macht', 'Abdecken des Objektivs – mit Hand, Tuch oder Farbspray', 'Schneller Szenenwechsel, weil die Kamera bewegt oder gedreht wurde']}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/ki-funktionen', label: 'Alle 23 Erkennungen' }}
        visual={<PhotoFigure src="/feature-camera-tampering-detection-1.webp" alt="Die Live-Ansicht der Konsole mit einem Sabotagealarm im Kamerabild" caption="Erkennung von Kamerasabotage" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div>
            <h2 className="font-display text-2xl font-bold">Diese Funktion erkennt und meldet:</h2>
            <ul className="mt-4 grid gap-3 text-muted-foreground sm:grid-cols-2">
              <li className="flex gap-2">• Plötzliche Unschärfe, die das Bild für die Auswertung unbrauchbar macht</li>
              <li className="flex gap-2">• Physisches Abdecken des Objektivs, mit Hand, Tuch oder Farbspray</li>
              <li className="flex gap-2">• Schnellen Szenenwechsel, der darauf hinweist, dass die Kamera bewegt oder gedreht wurde</li>
              <li className="flex gap-2">• Ungewöhnliche Helligkeitsänderungen, die zu einer auf das Objektiv gerichteten Lampe oder einem Laser passen</li>
              <li className="flex gap-2">• Eingefrorene Bilder, die auf eine Bildschleife oder einen Hardwaredefekt hindeuten</li>
            </ul>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Warum Sabotageerkennung wichtig ist</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>Eine Kamera, die abgedeckt, unscharf gestellt oder weggedreht wurde, fällt nicht einfach aus. Sie meldet sich weiter als online, während sie unbemerkt nichts mehr erfasst. Jede andere Erkennung auf diesem Kamerabild wird im selben Moment blind, und wenn niemand zufällig bemerkt, dass die Aufnahmen falsch aussehen, kann die Lücke stundenlang unentdeckt bleiben.</p>
                <p>Genau in diesem Moment ist Sabotage am wahrscheinlichsten: Wer eine Kamera absichtlich außer Gefecht setzt, wählt die, die den Bereich erfasst, den er gleich betreten will. Ein Dashboard, das nur „Kamera online“ anzeigt, reicht nicht. Es muss den Unterschied zwischen einem funktionierenden Kamerabild und einem absichtlich oder versehentlich beeinträchtigten erkennen.</p>
                <p>Die Sabotageerkennung schließt diese Lücke, indem sie das Kamerabild selbst durchgehend gegen fünf bekannte Sabotagemuster prüft. Eine beeinträchtigte Kamera wird gemeldet, sobald es passiert, nicht erst, wenn das nächste Mal jemand zufällig auf diese Ansicht schaut.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/feature-camera-tampering-detection-2.webp" alt="Diagramm: Fünf unabhängige Sabotagemuster werden gegen ein Live-Kamerabild geprüft" caption="Logik der Sabotagemuster" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">So funktioniert es</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Die fünf Sabotagemodi</h3>
                <p className="mt-2 text-muted-foreground">
                  Jedes Bild wird durchgehend gegen fünf unabhängige Muster geprüft: Unschärfe, physisches Abdecken, Szenenwechsel, Helligkeitsänderung und eingefrorene Bilder. Jeder Modus hat eine eigene Erkennungslogik, denn ein verdecktes Objektiv sieht völlig anders aus als eine gedrehte Kamera oder ein eingefrorenes Bild.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Ein Sabotageereignis bestätigen</h3>
                <p className="mt-2 text-muted-foreground">
                  Ein Zustand muss über ein kurzes Bestätigungsfenster hinaus anhalten, bevor er als Sabotage gilt. Das filtert kurzzeitige Effekte wie einen vorbeiziehenden Schatten, eine kurze Blendung oder eine normale automatische Belichtungsanpassung heraus. Nach der Bestätigung gilt der Sabotagezustand als aktiv, bis das Kamerabild wieder normal ist.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alarmzustellung</h3>
                <p className="mt-2 text-muted-foreground">
                  Ein Alarm enthält den Sabotagemodus, einen Schnappschuss von kurz vor dem Ereignis und einen Zeitstempel. Weil eine sabotierte Kamera andere Erkennungen nicht zuverlässig ausführen kann, solange sie beeinträchtigt ist, werden Sabotagealarme über das Benachrichtigungssystem der Plattform standardmäßig mit hoher Priorität weitergeleitet.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Konfiguration</h2>
                <p className="mt-4 text-muted-foreground">
                  Die Sabotageerkennung wird pro Kamera mit sinnvollen Standardwerten aktiviert, und jeder Modus lässt sich einzeln anpassen:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Jeder Modus einzeln ein- und ausschaltbar, zum Beispiel die Szenenwechsel-Erkennung bei einer PTZ-Kamera ausschalten</li>
                  <li className="flex gap-2">• Bestätigungsfenster, bevor ein Zustand als bestätigte Sabotage gilt</li>
                  <li className="flex gap-2">• Empfindlichkeit pro Modus</li>
                  <li className="flex gap-2">• Eigene Eskalation und Priorität für Sabotagealarme</li>
                  <li className="flex gap-2">• Lizenzierung pro Kamera-Instanz</li>
                </ul>
              </div>
            </ScrollReveal>
            <PhotoFigure src="/feature-camera-tampering-detection-3.webp" alt="Konfigurationsbereich mit den fünf Sabotagemodi, jeweils mit eigener Empfindlichkeit und eigenem Schalter" caption="Einstellungen der Sabotagemodi" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/feature-camera-tampering-detection-4.webp" alt="Kameraszenen von mehreren Standorten, an denen die Sabotageerkennung eingesetzt wird" caption="Sabotageüberwachung an mehreren Standorten" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Typische Szenarien</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Eine Kamera über einem Lager für hochwertige Waren wird vor einem Diebstahlversuch abgedeckt</li>
                  <li className="flex gap-2">• Eine Schwenk-Neige-Kamera wird von Hand aus ihrem zugewiesenen Erfassungsbereich gedreht</li>
                  <li className="flex gap-2">• Eine helle Lampe oder ein Laser wird auf ein Objektiv gerichtet, um das Bild zu überstrahlen</li>
                  <li className="flex gap-2">• Das Bild einer Kamera friert wegen eines Hardware- oder Encoderfehlers unbemerkt ein</li>
                  <li className="flex gap-2">• Eine Kamera an einem Geldautomaten oder im Kassenbereich wird übersprüht oder abgeklebt</li>
                  <li className="flex gap-2">• Eine Kamera an einem abgelegenen Standort verliert nach einem versehentlichen Stoß oder durch Witterungsschäden den Fokus</li>
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
