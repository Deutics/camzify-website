import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { PhotoFigure } from '@/components/content/photo-figure';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

const pageMeta = {
  title: 'PSA-Erkennung | Helme, Warnwesten, Handschuhe',
  description: 'Die PSA-Erkennung von Camzify meldet automatisch fehlende Helme, Warnwesten oder Handschuhe anhand der Vorgaben zur Schutzausrüstung an Ihrem Standort.',
  path: '/de/ki-funktionen/psa-erkennung',
};

export const metadata = generatePageMeta(pageMeta);

const chip = 'rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary';

const faqs = [
  { question: 'Welche Arten von PSA werden erkannt?', answer: 'Das Modell prüft gängige persönliche Schutzausrüstung, also Schutzhelme, Warnwesten und Handschuhe, gegen die Vorgaben, die für den jeweiligen Bereich oder die jeweilige Kamera eingestellt sind. Die geforderte PSA kann sich je nach Bereich unterscheiden, etwa zwischen Lagerfläche und Bürobereich am selben Standort.' },
  { question: 'Können die Vorgaben je Bereich unterschiedlich sein?', answer: 'Ja. PSA-Vorgaben werden pro Kamera oder Bereich konfiguriert. Eine Laderampe kann also Schutzhelm und Warnweste verlangen, während der angrenzende Bürobereich keine PSA erfordert, ohne dass dafür eigene Kameras oder Hardware nötig sind.' },
  { question: 'Ersetzt das eine Fachkraft für Arbeitssicherheit?', answer: 'Nein. Es ist eine durchgehende Prüfung der Vorgaben, die Verstöße meldet, damit eine Sicherheitsfachkraft oder Vorgesetzte handeln können. Sie liefert einen Nachweis mit Zeitstempel für Audits und die Aufarbeitung von Vorfällen, ersetzt aber nicht die menschliche Verantwortung für die Arbeitssicherheit.' },
  { question: 'Wie genau ist die Erkennung, und wie steht es um Fehlalarme?', answer: 'Jeder Alarm enthält einen Konfidenzwert und einen Clip mit Zeitstempel von dem Moment, in dem das fehlende Teil erkannt wurde, sodass eine prüfende Person auf einen Blick bestätigen kann, bevor sie handelt. Teilweise Verdeckung, etwa ein Schutzhelm, der kurz aus dem Bild gerät, wird gegen den bestätigten Track abgewogen und nicht anhand eines einzelnen Bildes bewertet. So erzeugen kurze Sichtlücken keine Flut von Alarmen.' },
  { question: 'Wie lange dauert es, PSA-Vorgaben für einen neuen Standort einzurichten?', answer: 'Die Konfiguration beruht auf Bereichen, nicht auf Hardware: Die geforderte PSA wird im Konfigurationsbereich pro Kamera oder Bereich festgelegt. Ein neuer Standort ist damit eine Frage der Festlegung von Bereichen und Vorgaben, nicht der Installation eigener Sensoren.' },
  { question: 'Braucht sie spezielle Kameras oder Hardware?', answer: 'Nein. Die PSA-Erkennung läuft auf denselben Kamerabildern, die bereits für die anderen Erkennungen von Camzify genutzt werden. Ein Standort braucht also keine eigene PSA-Prüfhardware an Eingängen oder Kontrollpunkten.' },
];

export default function DePsaErkennungPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'KI-Funktionen', href: '/de/ki-funktionen' },
      { label: 'PSA-Erkennung' },
    ]}>
      <FeatureHero
        eyebrow="KI-Erkennung · PSA-Erkennung"
        title="PSA-Erkennung"
        lede={<><strong className="font-semibold text-foreground">Schutzausrüstung, automatisch geprüft.</strong> Die PSA-Erkennung prüft jede bestätigte Person im Bild
            gegen die persönliche Schutzausrüstung (PSA), die für diesen Bereich vorgeschrieben ist, und meldet fehlende Helme, Warnwesten
            oder Handschuhe, sobald sie auffallen.</>}
        facts={['Fehlende Schutzhelme, wo Kopfschutz vorgeschrieben ist', 'Fehlende Warnwesten auf aktiven Arbeitsflächen', 'Fehlende Handschuhe beim Umgang mit Gefahrstoffen']}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/ki-funktionen', label: 'Alle 23 Erkennungen' }}
        visual={<PhotoFigure src="/feature-ppe-violation-detection-1.webp" alt="Die Live-Ansicht der Konsole mit einem PSA-Alarm im Kamerabild" caption="PSA-Erkennung" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div>
            <h2 className="font-display text-2xl font-bold">Diese Funktion erkennt und meldet:</h2>
            <ul className="mt-4 grid gap-3 text-muted-foreground sm:grid-cols-2">
              <li className="flex gap-2">• Fehlende Schutzhelme in Bereichen, in denen Kopfschutz vorgeschrieben ist</li>
              <li className="flex gap-2">• Fehlende Warnwesten auf aktiven Arbeitsflächen</li>
              <li className="flex gap-2">• Fehlende Handschuhe in Bereichen, in denen mit Gefahrstoffen oder Geräten gearbeitet wird</li>
              <li className="flex gap-2">• Fehlende Schutzbrille oder fehlenden Gehörschutz, wo die Vorgaben des Bereichs sie verlangen</li>
              <li className="flex gap-2">• Teilweise Einhaltung, etwa Warnweste vorhanden, aber Schutzhelm fehlt</li>
              <li className="flex gap-2">• Einen Nachweis mit Zeitstempel pro Bereich für Sicherheitsaudits</li>
            </ul>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Warum PSA-Erkennung wichtig ist</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>Die meisten Standorte setzen ihre PSA-Vorgaben über Vorgesetzte durch, die über die Fläche gehen, über eine Checkliste beim Einstempeln oder über eine Stichprobe zu Schichtbeginn. Alle drei haben dieselbe Lücke: Sie erfassen die Einhaltung nur in dem Moment, in dem jemand hinsieht. Wer fünf Minuten nach einem Rundgang den Schutzhelm abnimmt oder ihn zwischen den Kontrollen nie aufsetzt, taucht nirgends auf, bis ein Vorfall die Frage aufwirft.</p>
                <p>Stichproben verändern außerdem das Verhalten so, dass die Daten unzuverlässig werden. Wer weiß, dass gleich eine Kontrolle kommt, hält die Vorgaben ein, wenn es darauf ankommt, und lässt sie den Rest der Schicht schleifen: das klassische Problem jeder periodischen, von Menschen durchgeführten Prüfung eines dauerhaften Risikos. Auf einem großen Standort mit mehreren Zugängen und wechselnden Teams kann eine Sicherheitsfachkraft ohnehin nicht überall zugleich sein.</p>
                <p>Die durchgehende KI-Überwachung schließt diese Lücke, indem sie jede bestätigte Person gegen die Vorgaben des Bereichs prüft, solange die Kamera läuft, und nicht nur, wenn zufällig jemand vorbeikommt. Aus der PSA-Einhaltung wird so statt einer gelegentlichen Momentaufnahme ein durchgehender Nachweis, und die Sicherheitsfachkraft erhält eine Liste bestätigter Verstöße, die sie abarbeiten kann, statt eine Fläche, die sie ablaufen muss.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/feature-ppe-violation-detection-2.webp" alt="Diagramm: Eine verfolgte Person wird gegen die PSA-Liste eines Bereichs geprüft, bevor ein Alarm ausgelöst wird" caption="PSA-Prüfung gegen die Vorgaben" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">So funktioniert es</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Prüfung gegen die Vorgaben des Bereichs</h3>
                <p className="mt-2 text-muted-foreground">
                  Jede bestätigte Person, die das <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">Multi-Object-Tracking</Link> verfolgt,
                  wird gegen die PSA-Vorgaben geprüft, die für den Bereich dieser Kamera eingestellt sind. Derselbe Standort kann so in verschiedenen Bereichen unterschiedliche Regeln durchsetzen, ohne eigene Hardware.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Fehlende Teile erkennen</h3>
                <p className="mt-2 text-muted-foreground">
                  Die <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">KI-Attributerkennung</Link> stellt
                  fest, welche geforderten Teile an jeder Person vorhanden sind und welche fehlen. Fehlt ein Teil, wird ein Alarm mit dem Standort der Person, der fehlenden PSA-Art und einem Clip mit Zeitstempel ausgelöst, den die Sicherheitsfachkraft prüfen kann.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alarmzustellung</h3>
                <p className="mt-2 text-muted-foreground">
                  Alarme laufen über das <Link href="/de/plattform/alarme-und-benachrichtigungen" className="text-primary hover:underline">Benachrichtigungssystem</Link> der Plattform und
                  lassen sich für die tägliche Prüfung nach Bereich filtern. Eine Sicherheitsfachkraft kann Verstöße so Bereich für Bereich abarbeiten, statt eine einzige gemischte Liste durchzusehen.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Konfiguration</h2>
                <p className="mt-4 text-muted-foreground">
                  PSA-Vorgaben werden im Konfigurationsbereich pro Bereich oder Kamera festgelegt. Jeder Bereich unterstützt:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Geforderte PSA-Arten: Schutzhelm, Warnweste, Handschuhe, Schutzbrille, Gehörschutz</li>
                  <li className="flex gap-2">• Umgang mit teilweiser und vollständiger Nichteinhaltung, z. B. ein fehlendes Teil oder mehrere</li>
                  <li className="flex gap-2">• Benachrichtigungszeitfenster pro Kamera, z. B. nur während der Schichtzeiten benachrichtigen</li>
                  <li className="flex gap-2">• Lizenzierung pro Kamera-Instanz</li>
                  <li className="flex gap-2">• Alarmfilter nach Bereich für die tägliche Prüfung</li>
                </ul>
              </div>
            </ScrollReveal>
            <PhotoFigure src="/feature-ppe-violation-detection-3.webp" alt="Konfigurationsbereich mit den geforderten PSA-Arten für einen Kamerabereich" caption="PSA-Konfiguration pro Bereich" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PhotoFigure src="/feature-ppe-violation-detection-4.webp" alt="Kameraszenen von mehreren Standorten, an denen die PSA-Erkennung eingesetzt wird" caption="PSA-Einhaltung am gesamten Standort" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Typische Szenarien</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Ein Baustelleneingang, an dem jede Person, die den aktiven Bereich betritt, auf Schutzhelm und Warnweste geprüft wird</li>
                  <li className="flex gap-2">• Eine Staplerfahrspur im Lager, auf der eine fehlende Warnweste sofort einen Alarm auslöst</li>
                  <li className="flex gap-2">• Ein Bereich für den Umgang mit Chemikalien, in dem fehlende Handschuhe unabhängig von der Tageszeit gemeldet werden</li>
                  <li className="flex gap-2">• Eine Produktionsfläche, auf der in der Nähe schwerer Maschinen Gehörschutz vorgeschrieben ist</li>
                  <li className="flex gap-2">• Eine Laderampe, an der teilweise Einhaltung, also Warnweste vorhanden, Schutzhelm fehlt, getrennt von vollständiger Nichteinhaltung erfasst wird</li>
                  <li className="flex gap-2">• Ein Objekt mit mehreren Bereichen, in dem für Büros keine PSA vorgeschrieben ist, während die angrenzende Produktionsfläche die volle Ausrüstung verlangt</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Im Rundgang</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Bei einem <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützten Wächterrundgang</Link> fließt
                die PSA-Einhaltung in jedem überwachten Bereich in die Prüfung am jeweiligen Kamera-Kontrollpunkt ein und wird zusammen mit den
                Ergebnissen der Checkliste im Kontrollprotokoll festgehalten.
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
                  <Link href="/de/branchen/industrie-und-produktion" className={chip}>Industrie und Produktion</Link>
                  <Link href="/de/branchen/baustellen" className={chip}>Baustellen</Link>
                  <Link href="/industries/energy" className={chip}>Energie (EN)</Link>
                  <Link href="/de/branchen/lager-und-logistik" className={chip}>Lager und Logistik</Link>
                  <Link href="/industries/waste-management" className={chip}>Entsorgungswirtschaft (EN)</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Verwandte Erkennungen</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/de/ki-funktionen/bereichsueberwachung" className={chip}>Bereichsüberwachung</Link>
                  <Link href="/ai-features/ai-attribute-extraction" className={chip}>KI-Attributerkennung (EN)</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Anwendungsfälle</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/loading-dock-monitoring" className={chip}>Überwachung von Laderampen (EN)</Link>
                  <Link href="/use-cases/perimeter-security" className={chip}>Perimeterschutz (EN)</Link>
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
