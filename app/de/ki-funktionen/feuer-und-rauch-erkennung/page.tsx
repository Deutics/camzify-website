import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { PhotoFigure } from '@/components/content/photo-figure';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * German counterpart of /ai-features/fire-and-smoke-detection. The English page states
 * that this detection complements fire alarm and suppression systems and is not a
 * certified life-safety replacement. Keep that framing: never describe it as a
 * Brandmeldeanlage, a Brandmelder or a substitute for either.
 */
const pageMeta = {
  title: 'Feuer- und Raucherkennung mit Sicherheitskameras',
  description: 'Die Feuer- und Raucherkennung von Camzify erkennt sichtbaren Rauch und sichtbare Flammen direkt im Kamerabild, oft bevor ein Wärmesensor auslösen würde.',
  path: '/de/ki-funktionen/feuer-und-rauch-erkennung',
};

export const metadata = generatePageMeta(pageMeta);

const chip = 'rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary';

const faqs = [
  { question: 'Worin unterscheidet sie sich von einem Rauchmelder?', answer: 'Ein Rauchmelder reagiert auf Partikel oder Wärme, die den Sensor selbst erreichen, und das dauert in einem großen oder offenen Raum. Die visuelle Feuer- und Raucherkennung beobachtet direkt das Kamerabild und kann sichtbaren Rauch oder sichtbare Flammen in dem Moment erfassen, in dem sie im Bild erscheinen, oft bevor sie einen fest installierten Sensor erreichen.' },
  { question: 'Ersetzt sie eine Brandmeldeanlage?', answer: 'Nein. Sie ist eine zusätzliche visuelle Frühwarnebene, die bestehende Brandmelde- und Löschanlagen ergänzt, und kein zertifizierter Ersatz für diese Sicherheitstechnik. Sie gibt Sicherheitsteams einen früheren visuellen Alarm und einen Clip mit Zeitstempel, auf dessen Grundlage sie handeln können.' },
  { question: 'Wodurch entsteht ein Fehlalarmrisiko, und wie wird damit umgegangen?', answer: 'Dampf, Staub und Nebel können optisch wie Rauch aussehen. Das Modell ist darauf trainiert, Fehlalarme aus diesen Quellen zu verringern, und jeder Alarm enthält einen Clip und einen Konfidenzwert, damit ein Mensch schnell prüfen kann, bevor Notfallmaßnahmen eingeleitet werden.' },
  { question: 'Braucht sie spezielle Kameras, etwa Wärmebildkameras?', answer: 'Nein. Die Feuer- und Raucherkennung läuft auf denselben normalen Kamerabildern, die auch für die anderen Erkennungen von Camzify genutzt werden. Sie benötigt keine Wärmebild- oder Infrarot-Hardware, kann aber als zusätzliche Ebene neben solchen Systemen eingesetzt werden.' },
  { question: 'Lässt sich die Empfindlichkeit pro Standort einstellen?', answer: 'Ja. Der Konfidenz-Schwellenwert, ab dem eine visuelle Übereinstimmung einen Alarm auslöst, und die Eskalationsregeln dafür, wer benachrichtigt wird, lassen sich beide pro Standort oder Kamera konfigurieren.' },
  { question: 'Was passiert, wenn das Kamerabild teilweise durch Regale oder Anlagen verdeckt ist?', answer: 'Die Erkennung ist auf das beschränkt, was tatsächlich im Bild sichtbar ist. Eine Rauchquelle, die sich vollständig hinter hohen Regalen oder Anlagen entwickelt, wird unter Umständen erst gesehen, wenn sie sichtbar wird. Die zuverlässigste Abdeckung erreichen Kamerapositionen mit freier Sicht über den überwachten Bereich.' },
];

export default function DeFeuerUndRauchErkennungPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'KI-Funktionen', href: '/de/ki-funktionen' },
      { label: 'Feuer- und Raucherkennung' },
    ]}>
      <FeatureHero
        eyebrow="KI-Erkennung · Feuer- und Raucherkennung"
        title="Feuer- und Raucherkennung"
        lede={<><strong className="font-semibold text-foreground">Rauch erkennen, bevor daraus ein Feuer wird.</strong> Die Feuer- und Raucherkennung auf Sicherheitskameras überwacht das Live-Bild auf sichtbare Flammen
            und sichtbaren Rauch und meldet ein Ereignis oft, bevor es einen fest installierten Wärme- oder Rauchsensor erreicht.</>}
        facts={['Sichtbare Flammen im gesamten Sichtfeld der Kamera', 'Sichtbarer Rauch in Lager-, Elektro- oder Industriebereichen', 'Frühe Ereignisse in großen oder offenen Räumen']}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/ki-funktionen', label: 'Alle 23 Erkennungen' }}
        visual={<PhotoFigure src="/feature-fire-and-smoke-detection-1.webp" alt="Die Live-Ansicht der Konsole mit einem Feuer- und Rauchalarm im Kamerabild" caption="Feuer- und Raucherkennung" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div>
            <h2 className="font-display text-2xl font-bold">Diese Funktion erkennt und meldet:</h2>
            <ul className="mt-4 grid gap-3 text-muted-foreground sm:grid-cols-2">
              <li className="flex gap-2">• Sichtbare Flammen an beliebiger Stelle im Sichtfeld der Kamera</li>
              <li className="flex gap-2">• Sichtbaren Rauch, der sich in Lager-, Elektro- oder Industriebereichen entwickelt</li>
              <li className="flex gap-2">• Ereignisse im frühen Stadium in großen oder offenen Räumen, bevor ein fest installierter Sensor auslöst</li>
              <li className="flex gap-2">• Rauch oder Flammen in unbeaufsichtigten Bereichen nachts oder am Wochenende</li>
              <li className="flex gap-2">• Mehrere gleichzeitige Rauchquellen, die auf ein sich schnell entwickelndes Ereignis hindeuten</li>
              <li className="flex gap-2">• Sofortige Weiterleitung als kritischer Alarm an das Personal vor Ort</li>
            </ul>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Warum Feuer- und Raucherkennung wichtig ist</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>Fest installierte Wärme- und Rauchsensoren lösen erst aus, wenn Rauch oder Wärme den Ort des Sensors tatsächlich erreicht. In einem großen Lager mit hohen Decken, auf einem offenen Hof oder in einem Raum mit starker Luftströmung kann das so lange dauern, dass sich ein Feuer festgesetzt hat, bevor der Alarm ertönt. Der Sensor reagiert konstruktionsbedingt immer erst im Nachhinein.</p>
                <p>Die herkömmliche Absicherung für diese Lücke ist, dass Mitarbeitende etwas bemerken: Jemand riecht Rauch oder sieht Flammen und löst den Alarm von Hand aus. Das funktioniert zu belebten Zeiten mit Personal auf der Fläche. Es funktioniert nicht nachts, in unbesetzten Gebäuden oder in selten begangenen Bereichen, also genau dann, wenn ein unentdecktes Feuer am meisten Zeit hat, sich auszubreiten, bevor jemand reagiert.</p>
                <p>Die visuelle Erkennung beobachtet den Raum selbst, statt darauf zu warten, dass Rauch zu einem festen Punkt zieht. Sie kann Flammen oder Rauch melden, sobald sie im Bild sichtbar sind, unabhängig von Deckenhöhe, Luftströmung oder davon, ob gerade jemand in der Nähe ist. Und sie läuft durchgehend, was weder ein menschlicher Beobachter noch ein nur regelmäßig geprüfter Sensor garantieren kann.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/feature-fire-and-smoke-detection-2.webp" alt="Diagramm: Ein Kamerabild wird auf die visuellen Merkmale von Flammen und Rauch analysiert, bevor ein kritischer Alarm ausgelöst wird" caption="Abgleich visueller Merkmale" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">So funktioniert es</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Die visuellen Merkmale lesen</h3>
                <p className="mt-2 text-muted-foreground">
                  Das Modell analysiert das Live-Bild jeder Kamera auf die visuellen Merkmale von Flammen und Rauch: Farbe, Textur und Bewegungsmuster, die sich von gewöhnlicher Bewegung in der Szene unterscheiden. Eine bestätigte Übereinstimmung oberhalb des Konfidenz-Schwellenwerts löst sofort einen Alarm aus.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Falsche Auslöser herausfiltern</h3>
                <p className="mt-2 text-muted-foreground">
                  Dampf, Staub und Nebel können auf den ersten Blick wie Rauch aussehen. Deshalb ist das Modell darauf trainiert, ihre typischen Farb-, Textur- und Bewegungsmerkmale von einem echten Rauch- oder Flammenereignis zu unterscheiden, bevor ein Alarm ausgelöst wird.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Weiterleitung kritischer Alarme</h3>
                <p className="mt-2 text-muted-foreground">
                  Jeder Alarm ist standardmäßig als kritisch eingestuft und enthält einen Clip, einen Konfidenzwert und einen Zeitstempel, damit das prüfende Team das Ereignis bestätigen und ohne Verzögerung Notfallmaßnahmen einleiten kann. Alarme laufen über das <Link href="/de/plattform/alarme-und-benachrichtigungen" className="text-primary hover:underline">Benachrichtigungssystem</Link> der Plattform, mit Eskalationsregeln, die sich pro Standort konfigurieren lassen.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Konfiguration</h2>
                <p className="mt-4 text-muted-foreground">
                  Die Feuer- und Raucherkennung wird pro Kamera aktiviert und alarmiert standardmäßig mit kritischem Schweregrad. Einstellbar sind unter anderem:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Standardmäßig kritischer Schweregrad pro Kamera</li>
                  <li className="flex gap-2">• Standardmäßig durchgehende Überwachung ohne Zeitplan-Einschränkung</li>
                  <li className="flex gap-2">• Optionale Zeitplan-Einschränkung für Standorte, die eine wünschen</li>
                  <li className="flex gap-2">• Eskalationsregeln pro Standort, z. B. wer zuerst benachrichtigt wird</li>
                  <li className="flex gap-2">• Lizenzierung pro Kamera-Instanz</li>
                </ul>
              </div>
            </ScrollReveal>
            <PhotoFigure src="/feature-fire-and-smoke-detection-3.webp" alt="Konfigurationsbereich mit kritischem Schweregrad und Eskalationsregeln für eine Kamera" caption="Konfiguration der Feuer- und Raucherkennung" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/feature-fire-and-smoke-detection-4.webp" alt="Kameraszenen von mehreren Standorten, an denen die Feuer- und Raucherkennung eingesetzt wird" caption="Feuerüberwachung im gesamten Objekt" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Typische Szenarien</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Ein Lagerbereich mit brennbarem Material in Regalen, in dem Rauch in einem Gang sofort einen Alarm auslöst</li>
                  <li className="flex gap-2">• Ein Elektroraum, in dem jede sichtbare Flamme unabhängig von der Tageszeit als kritisch gilt</li>
                  <li className="flex gap-2">• Ein großes Lager mit hohen Decken, in dem ein fest installierter Wärmesensor weit von einem möglichen Brandherd entfernt sitzt</li>
                  <li className="flex gap-2">• Ein unbesetztes Objekt über Nacht, wenn kein Personal da ist, das Rauch direkt bemerken könnte</li>
                  <li className="flex gap-2">• Eine Self-Storage-Anlage mit vielen einzelnen Einheiten und wenig durchgehendem Publikumsverkehr</li>
                  <li className="flex gap-2">• Ein Wertstoff- oder Recyclinghof im Freien, auf dem sich ein Feuer entwickeln kann, bevor es einen Sensor in einem Gebäude erreicht</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Im Rundgang</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Die Feuer- und Raucherkennung läuft durchgehend und nicht nur während geplanter Kontrollen. Tritt jedoch während eines laufenden
                <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützten Wächterrundgangs</Link> ein
                Ereignis auf, wird es sofort als kritische Abweichung im Kontrollprotokoll festgehalten.
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
                  <Link href="/industries/self-storage" className={chip}>Self-Storage (EN)</Link>
                  <Link href="/industries/energy" className={chip}>Energie (EN)</Link>
                  <Link href="/industries/waste-management" className={chip}>Entsorgungswirtschaft (EN)</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Verwandte Erkennungen</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/de/ki-funktionen/sabotageerkennung" className={chip}>Kamerasabotage</Link>
                  <Link href="/de/ki-funktionen/bereichsueberwachung" className={chip}>Bereichsüberwachung</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Anwendungsfälle</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/after-hours-monitoring" className={chip}>Überwachung außerhalb der Betriebszeiten (EN)</Link>
                  <Link href="/use-cases/remote-site-monitoring" className={chip}>Überwachung abgelegener Standorte (EN)</Link>
                  <Link href="/use-cases/fire-and-smoke-detection-for-high-rise-buildings" className={chip}>Feuer- und Raucherkennung in Hochhäusern (EN)</Link>
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
