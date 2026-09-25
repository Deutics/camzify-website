import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import { FeatureHero } from '@/components/content/feature-hero';
import { PhotoFigure } from '@/components/content/photo-figure';
import { SectionVisual } from '@/components/content/section-visual';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

/**
 * German counterpart of /virtual-patrolling/patrol-reports. Page identity is declared
 * once and consumed by generatePageMeta and PageShell.
 */
const pageMeta = {
  title: 'Kontrollprotokolle als PDF mit Kamerabildern',
  description: 'Jeder virtuelle Kontrollgang erzeugt ein PDF-Protokoll mit Zeitstempel, Prüfergebnissen und dem Kamerabild hinter jeder Prüfung. Exportierbar für Audits.',
  path: '/de/ki-waechterrundgang/kontrollprotokolle',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  { question: 'Erklärt das Protokoll, warum die KI so geantwortet hat?', answer: 'Ja, bei automatischen Rundgängen. Jede Antwort auf einen Checklistenpunkt enthält das Ergebnis und die Begründung dahinter in einfacher Sprache, etwa „the metal gate appears to be closed“ (das Metalltor scheint geschlossen zu sein) oder, bei einer Prüfung auf ausgeschaltetes Licht, „the room appears to be lit, indicating lights might be on“ (der Raum scheint beleuchtet zu sein, das Licht könnte also an sein). Sie lesen ein Argument, statt ein Urteil hinzunehmen. So lässt sich eine falsche Entscheidung erkennen und die Formulierung der Checkliste korrigieren, statt dem Ergebnis stillschweigend zu misstrauen.' },
  { question: 'Was hält ein automatischer Rundgang zu jeder Kamera fest?', answer: 'Eine schriftliche Beschreibung der Szene, die Zahl der anwesenden Personen, die im Bild erkannten Objekte, eine Bewertung der Gefährdungen, eine Bewertung der Sicherheitsrisiken, das aufgenommene Bild sowie jeden Checklistenpunkt mit Antwort und Begründung. Die Risikobewertungen werden für jede Kamera festgehalten, ob etwas nicht stimmt oder nicht; „none apparent“ (nichts erkennbar) ist selbst ein Ergebnis, und erst eine Reihe solcher Einträge macht den einen, der etwas anderes sagt, handlungsrelevant.' },
  { question: 'Enthält das Kontrollprotokoll Kamerabilder?', answer: 'Ja. Jedes Checklistenergebnis trägt das Bild der Kamera aus dem Moment, in dem dieser Punkt geprüft wurde, sodass das Protokoll zeigt, was tatsächlich zu sehen war, und nicht nur das Ergebnis. Ein Punkt, der nicht erfüllt war und während des Rundgangs behoben wurde, trägt zwei Bilder: die Kamera im vorgefundenen Zustand und dieselbe Kamera nach der Behebung. Erst das macht aus dem Protokoll statt einer Liste gemeldeter Probleme einen Nachweis erledigter Probleme. Ein noch offener Punkt trägt das Bild im vorgefundenen Zustand, zusammen mit der schriftlichen Begründung, warum er aussteht.' },
  { question: 'Wie lange werden Kontrollprotokolle aufbewahrt?', answer: 'Protokolle bleiben im Rundgangsverlauf, solange das Konto aktiv ist. Ein Protokoll von vor Monaten ist also noch verfügbar, wenn ein Versicherer oder Prüfer danach fragt. Ein eigener Archivierungsschritt ist nicht nötig.' },
  { question: 'Lässt sich ein Protokoll für einen Zeitraum statt für einen einzelnen Rundgang exportieren?', answer: 'Ja. Ein Zeitraum mit mehreren Rundgängen lässt sich gemeinsam exportieren. Das geht in der Regel schneller, als für ein Audit oder einen Versicherungsfall einzelne Protokolle nacheinander herauszusuchen.' },
  { question: 'Wer erhält eine E-Mail, wenn ein Protokoll erstellt wird?', answer: 'Alle, die im Verteiler dieses Standorts als Empfänger eingetragen sind. Empfänger lassen sich jederzeit hinzufügen, entfernen oder ändern; die Änderung gilt ab dem nächsten Protokoll.' },
  { question: 'Was ist der Unterschied zwischen einem Flagged- und einem Overdue-Protokoll?', answer: 'Flagged (mit Befund) bedeutet, dass der Rundgang gelaufen ist und mindestens ein Checklistenpunkt als nicht erfüllt zurückkam. Overdue (überfällig) bedeutet, dass ein geplanter Rundgang gar nicht gelaufen ist: Der Zeitplan hat ausgelöst, aber der Rundgang wurde nicht abgeschlossen.' },
  { question: 'Kann ich den Protokollverlauf einer bestimmten Kamera über viele frühere Rundgänge ansehen?', answer: 'Ja. Frühere Protokolle lassen sich nach Kamera, Standort oder Status filtern. So fällt ein Muster schnell auf, etwa eine Kamera, die immer wieder am selben Checklistenpunkt scheitert.' },
];

export default function DeKiWaechterrundgangKontrollprotokollePage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'KI-Wächterrundgang', href: '/de/ki-waechterrundgang' },
      { label: 'Kontrollprotokolle' },
    ]}>
      <FeatureHero
        eyebrow="Automatische Protokolle"
        title="Kontrollprotokolle für jeden Rundgang"
        lede={<>Ein Kontrollprotokoll ist das PDF-Dokument, das nach jedem <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">virtuellen Kontrollgang</Link> erstellt wird.
            Es enthält den Namen des Rundgangsablaufs, Datum und Uhrzeit, jede geprüfte Kamera, jeden
            Checklistenpunkt mit seinem Status, das Kamerabild, anhand dessen der Punkt bewertet wurde, die bei
            einem Fehler benachrichtigte Wachperson und eine Gesamt-Erfüllungsquote. Protokolle werden
            automatisch per E-Mail verschickt und im Rundgangsverlauf abgelegt, wo sich jeder Rundgang als
            Web-Protokoll oder als PDF öffnen lässt.</>}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/ki-waechterrundgang/digitales-wachbuch', label: 'Digitales Wachbuch' }}
        visual={<PhotoFigure src="/vp-patrol-reports-1.png" alt="Ein Kontrollprotokoll in der Camzify-Konsole mit den Checklistenergebnissen und Kamerabildern" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="font-mono text-mono-sm uppercase text-primary">Inhalt des Protokolls</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Was das Protokoll enthält</h2>
              <ul className="mt-6 space-y-3">
                {[
                  'Name des Rundgangsablaufs und Standort',
                  'Datum, Start- und Endzeit',
                  'Jede Kamera im Rundgangsablauf mit ihren Checklistenergebnissen',
                  'Status erfüllt oder nicht erfüllt je Punkt',
                  'Das Kamerabild, anhand dessen jeder Punkt bewertet wurde, mit Zoom-Möglichkeit',
                  'Vorher- und Nachher-Bilder bei jedem Punkt, der während des Rundgangs behoben wurde',
                  'Bei automatischen Rundgängen: eine schriftliche Beschreibung der Szene, die darin erkannten Objekte und die Begründung jeder Antwort',
                  'Bei automatischen Rundgängen: eine Bewertung von Gefährdungen und Sicherheitsrisiken für jede Kamera, auch wenn nichts vorliegt',
                  'Bei Fehlern versendete Benachrichtigungen an Wachpersonen',
                  'Gesamt-Erfüllungsquote des Rundgangs',
                  'Art des Rundgangs (Manual oder Auto)',
                  'Status: Completed, Flagged oder Overdue (abgeschlossen, mit Befund, überfällig)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-live flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <PhotoFigure src="/vp-patrol-reports-2.png" alt="Protokolleinstellungen in der Konsole: Verteilung und Aufbewahrung der Rundgangsprotokolle" caption="Protokolleinstellungen: wer das PDF jedes Rundgangs erhält und wie Protokolle aufbewahrt werden." />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Warum Protokolle zählen</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Warum Kontrollprotokolle wichtig sind</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Das Kontrollprotokoll ist das Dokument, das alle drei folgenden Anforderungen erfüllt:
                automatisch erstellt, bei jedem Rundgang, ohne manuellen Aufwand.
              </p>
              <PointList items={[
                'Versicherer verlangen einen Nachweis über die Absicherung durch Kontrollgänge.',
                'Aufsichtsbehörden wollen Nachweise mit Zeitstempel.',
                'Prüfer müssen nachvollziehen können, dass Prüfungen stattgefunden haben und Fehler eskaliert wurden.',
              ]} />
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Unter <Link href="/guides/how-to-run-a-virtual-patrol-round" className="text-primary hover:underline">So wird ein Rundgang durchgeführt</Link> (Englisch) sehen Sie, woher jeder Teil des Protokolls stammt. Zusammen mit dem <Link href="/de/ki-waechterrundgang/digitales-wachbuch" className="text-primary hover:underline">digitalen Wachbuch</Link> ergeben
                diese Protokolle einen lückenlosen Prüfpfad, der die Disziplin bei Kontrollgängen über alle Standorte hinweg belegt.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <SectionVisual locale="de" variant="flow" caption="Protokollerstellung" alt="Ablauf: Ein Rundgang endet und seine Ergebnisse werden zu einem PDF-Protokoll zusammengestellt" steps={['Rundgang erreicht letzten Kontrollpunkt', 'Alle Ergebnisse zusammengeführt', 'Protokoll mit Bildern erstellt', 'Gemailt und abgelegt']} />
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">So läuft es ab</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Wie ein Kontrollprotokoll entsteht</h2>
                <ol className="mt-6 space-y-4 text-muted-foreground">
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">01</span><span>Der Rundgang erreicht seinen letzten Kamera-Kontrollpunkt, ob manuell oder nach <Link href="/de/ki-waechterrundgang/automatische-planung" className="text-primary hover:underline">automatischem Zeitplan</Link></span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">02</span><span>Alle Checklistenergebnisse des Rundgangs werden zu einem Datensatz zusammengeführt, jedes mit dem Bild, das an dieser Kamera aufgenommen wurde</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">03</span><span>Der Datensatz wird als PDF mit Name des Rundgangsablaufs, Zeitstempeln und Ergebnissen je Kamera aufbereitet</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">04</span><span>Das Protokoll geht automatisch per E-Mail an die eingetragenen Empfänger</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">05</span><span>Das Protokoll wird im Rundgangsverlauf abgelegt, als Web-Protokoll oder PDF abrufbar und mit der <Link href="/de/ki-waechterrundgang/digitales-wachbuch" className="text-primary hover:underline">Erfüllungsquote</Link> dieses Rundgangs verknüpft</span></li>
                </ol>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Konfiguration</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Empfänger, Aufbewahrung und Exportformate</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Legen Sie je Standort einen Verteiler fest; jeder Empfänger erhält das PDF, sobald ein Rundgang endet</li>
                  <li className="flex gap-2">• Protokolle bleiben für spätere Abfragen im Rundgangsverlauf; rufen Sie bei Bedarf eine bestimmte Woche, einen Standort oder eine Kamera auf</li>
                  <li className="flex gap-2">• Exportieren Sie ein einzelnes Protokoll oder einen ganzen Zeitraum für Versicherungsfälle, Anfragen von Behörden oder interne Audits</li>
                  <li className="flex gap-2">• Filtern Sie frühere Protokolle nach Status, Completed, Flagged oder Overdue, um Muster schnell zu erkennen</li>
                </ul>
              </div>
            </ScrollReveal>
            <SectionVisual locale="de" variant="flow" caption="Protokolleinstellungen" steps={['Verteiler festlegen', 'Rundgang endet', 'PDF an alle Empfänger', 'Aufbewahrt und filterbar']} alt="Konfiguration für Protokollempfänger, Aufbewahrung und Exportoptionen" />
          </div>

          <FaqSection items={faqs} locale="de" inline />

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Weiterlesen</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/de/ki-waechterrundgang/digitales-wachbuch" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Digitales Wachbuch <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/de/ki-waechterrundgang/automatische-planung" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Automatische Planung <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/platform/analytics-and-reporting" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Analysen und Berichte (Englisch) <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/industries/healthcare" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Gesundheitswesen (Englisch) <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/use-cases/virtual-patrolling-for-compliance-evidence" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Virtueller Wächterrundgang als Compliance-Nachweis (Englisch)</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
