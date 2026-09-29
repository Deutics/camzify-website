import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { PhotoFigure } from '@/components/content/photo-figure';
import { SectionVisual } from '@/components/content/section-visual';
import { InteractiveChecklistDemo } from '@/components/motion/interactive-checklist-demo';
import { DemoFrame } from '@/components/motion/demo-frame';
import Link from 'next/link';
import { ClipboardCheck, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';

/**
 * German counterpart of /virtual-patrolling/patrol-checklists. Page identity is
 * declared once and consumed by generatePageMeta and PageShell.
 */
const pageMeta = {
  title: 'Checklisten für Kontrollgänge je Kamera',
  description: 'Checklistenpunkte je Kamera für jeden Rundgang, bewertet als Compliant, Not Compliant oder Pending. Ein Fehler sichert ein Bild und alarmiert die Wache.',
  path: '/de/ki-waechterrundgang/checklisten',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  { question: 'Wie viele Checklistenpunkte kann eine Kamera haben?', answer: 'Es gibt keine feste Obergrenze. Eine Kamera, die nur ein Tor erfasst, hat vielleicht einen Punkt, eine Weitwinkelansicht einer Laderampe vier oder fünf. Die meisten Installationen bleiben bei 2 bis 4 Punkten je Kamera, damit ein Rundgang schnell zu bewerten und leicht nachzuvollziehen bleibt.' },
  { question: 'Lassen sich Checklistenpunkte für mehrere Kameras wiederverwenden?', answer: 'Ja. Ein Punkt wie „Keine unbefugten Personen im Bereich“ lässt sich auf beliebig viele Kameras mit derselben Anforderung anwenden, statt ihn für jeden Kontrollpunkt im Rundgangsablauf neu zu schreiben.' },
  { question: 'Was passiert mit einem Punkt beim manuellen Rundgang im Vergleich zu Auto-Patrol?', answer: 'Die Bewertungslogik ist in beiden Fällen identisch: Dieselbe Checkliste läuft, ob ein Operator sie in Echtzeit durchgeht oder der Zeitplan sie unbeaufsichtigt startet. Der einzige Unterschied ist, wer (oder was) den Rundgang von Kamera zu Kamera weiterführt.' },
  { question: 'Kann ich eine Checkliste ändern, nachdem ein Rundgangsablauf aktiv ist?', answer: 'Ja. Checklistenpunkte lassen sich jederzeit hinzufügen, bearbeiten oder entfernen. Änderungen gelten ab dem nächsten Rundgang; frühere Kontrollprotokolle behalten die Checkliste, die bei diesem Rundgang aktiv war, sodass historische Nachweise korrekt bleiben.' },
  { question: 'Müssen Checklistenpunkte genau dem entsprechen, was die Kamera sieht?', answer: 'Das sollten sie. Ein Checklistenpunkt funktioniert nur, wenn eine prüfende Person oder die bewertende KI ihn im Sichtfeld dieser Kamera tatsächlich bestätigen kann. Punkte werden gerade deshalb je Kamera geschrieben, damit sie prüfbar bleiben statt allgemein.' },
];

export default function DeKiWaechterrundgangChecklistenPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'KI-Wächterrundgang', href: '/de/ki-waechterrundgang' },
      { label: 'Checklisten' },
    ]}>
      <FeatureHero
        eyebrow="Nachweis je Kamera"
        title="Checklisten für Kontrollgänge"
        lede={<>Eine Checkliste für Kontrollgänge ist eine Reihe von Prüfpunkten, die jeder Kamera in einem <Link href="/virtual-patrolling/patrol-sequences" className="text-primary hover:underline">Rundgangsablauf</Link> (Englisch) zugewiesen werden.
            Bei jedem <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">virtuellen Kontrollgang</Link> wird jeder Punkt bewertet und mit schriftlicher Begründung als Compliant (erfüllt), Not Compliant (nicht erfüllt) oder Pending (ausstehend) markiert. Ein nicht erfüllter Punkt kann nicht so stehen bleiben: Der Rundgang wird erst abgeschlossen, wenn der Punkt behoben und erneut geprüft oder mit einer Begründung im Nachweis als ausstehend geführt wird. Die <Link href="/guides/how-to-run-a-virtual-patrol-round" className="text-primary hover:underline">Schritt-für-Schritt-Anleitung</Link> (Englisch) beschreibt den vollständigen Ablauf.
            Nicht erfüllte Punkte lösen automatisch eine Benachrichtigung an die Wachperson aus, die dieser Kamera zugewiesen ist.</>}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/guides/how-to-run-a-virtual-patrol-round', label: 'Selbst einen Rundgang durchführen (Englisch)' }}
        visual={<PhotoFigure src="/vp-patrol-checklists-1.png" alt="Ein Rundgangsablauf und seine Checkliste je Kamera werden in der Camzify-Konsole konfiguriert" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { icon: ClipboardCheck, title: 'Punkte in einfacher Sprache', desc: 'Jeder Punkt ist eine einfache Aussage, die das Kamerabild entweder bestätigt oder widerlegt, ohne Spielraum für Deutung.' },
              { icon: UserCheck, title: 'An eine Wachperson gebunden', desc: 'Hinter jeder Checkliste steht eine Kamera mit einer namentlich benannten Wachperson, die bei einem Fehler benachrichtigt wird.' },
              { icon: ShieldCheck, title: 'Bei jedem Rundgang gleich', desc: 'Dieselben Punkte werden auf dieselbe Weise geprüft, ob der Rundgang manuell oder geplant läuft.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 font-display text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Warum Checklisten zählen</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Warum Checklisten für Kontrollgänge wichtig sind</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Eine Wachperson auf einem Kontrollgang vor Ort arbeitet eine gedankliche Checkliste ab, die jedes Mal ein wenig anders ausfällt: Was in einer ruhigen Nacht genau geprüft wird, wird in einer hektischen nur gestreift. Festgehalten wird nicht, welche Punkte konkret geprüft wurden, sondern nur, dass der Rundgang stattgefunden hat.</p>
                <p>Eine Kamera ohne Checkliste hat das umgekehrte Problem: Sie zeichnet alles auf und bestätigt nichts. Die Aufnahmen existieren, aber niemand kann sagen, ob das Tor um 2 Uhr nachts tatsächlich geschlossen war, ohne sich den Ausschnitt noch einmal anzusehen.</p>
                <p>Eine Checkliste für Kontrollgänge löst beides. Jeder Punkt wird bei jedem Rundgang auf dieselbe Weise bewertet, und das Ergebnis, erfüllt oder nicht erfüllt, wird mit Zeitstempel für genau diese Kamera und genau diesen Punkt protokolliert.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Ausprobieren</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Die Checkliste selbst ausprobieren</h2>
              <p className="mt-2 text-muted-foreground">Klicken Sie sich durch drei Kameras und sehen Sie, wie Checklistenpunkte in einem echten Rundgang funktionieren. Die Demo zeigt die Konsole und ist deshalb, wie die Konsole selbst, auf Englisch.</p>
            </ScrollReveal>
            <div className="mt-8">
              <DemoFrame>
                <InteractiveChecklistDemo />
              </DemoFrame>
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <ScrollReveal>
              <div className="space-y-4">
                <span className="font-mono text-mono-sm uppercase text-primary">Beispiele</span>
                <h2 className="font-display text-2xl font-bold">So sehen Checklistenpunkte aus</h2>
                <p className="text-muted-foreground">Jeder Punkt ist eine Aussage in einfacher Sprache, die das Kamerabild entweder bestätigt oder widerlegt. Die Punkte sind auf die Kamera und die Umgebung zugeschnitten, die sie überwacht.</p>
                <div className="space-y-3">
                  {[
                    'Tor vollständig geschlossen',
                    'Kein Tailgating beobachtet',
                    'Rampentor gesichert',
                    'Keine unbefugten Personen im Bereich',
                    'Flur frei von Hindernissen',
                    'Zugangstür geschlossen',
                    'Notausgang frei',
                    'Fahrzeug auf dem vorgesehenen Stellplatz',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5">
                      <ClipboardCheck className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <PhotoFigure src="/vp-patrol-checklists-2.png" alt="Ein Checklistenpunkt wird während eines Rundgangs anhand des Kamerabilds bewertet" caption="Ein Checklistenpunkt, bewertet anhand des Bilds: erfüllt oder nicht erfüllt, das Bild wird gespeichert." />
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <SectionVisual locale="de" variant="flow" caption="Bewertung einer Checkliste" alt="Ablauf: Ein Checklistenpunkt wird anhand des Kamerabilds bewertet und als erfüllt oder nicht erfüllt protokolliert" steps={['Live-Bild am Kontrollpunkt', 'Punkt daran bewertet', 'Fehler benachrichtigt die Wache', 'Behoben oder ausstehend, dann Abschluss']} />
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">So läuft es ab</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Wie eine Checkliste bewertet wird</h2>
                <ol className="mt-6 space-y-4 text-muted-foreground">
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">01</span><span>Der Rundgang erreicht den Kontrollpunkt dieser Kamera im Rundgangsablauf</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">02</span><span>Jeder dieser Kamera zugewiesene Punkt wird anhand des aktuellen Bilds geprüft</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">03</span><span>Jeder Punkt wird als erfüllt oder nicht erfüllt markiert; ein nicht erfüllter Punkt wird danach als Fixed (behoben) oder Pending (ausstehend) aufgelöst, alles mit Zeitstempel</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">04</span><span>Jeder nicht erfüllte Punkt löst eine <Link href="/de/ki-waechterrundgang/benachrichtigungen" className="text-primary hover:underline">Benachrichtigung der Wachperson</Link> aus</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">05</span><span>Die Ergebnisse fließen in das <Link href="/de/ki-waechterrundgang/kontrollprotokolle" className="text-primary hover:underline">Kontrollprotokoll</Link> dieses Rundgangs</span></li>
                </ol>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Konfiguration</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Checklisten für einen Standort einrichten</h2>
                <p className="mt-4 text-muted-foreground">Checklisten werden beim Anlegen eines Rundgangsablaufs je Kamera konfiguriert. Die meisten Installationen folgen demselben Muster:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Schreiben Sie 2 bis 4 Punkte je Kamera, zugeschnitten auf das, was dieses Bild tatsächlich erfasst</li>
                  <li className="flex gap-2">• Verwenden Sie gängige Punkte (etwa „Bereich frei“) für Kameras mit derselben Anforderung wieder</li>
                  <li className="flex gap-2">• Verknüpfen Sie jeden Punkt mit einer <Link href="/de/ki-waechterrundgang/benachrichtigungen" className="text-primary hover:underline">vorformulierten Eskalationsnachricht</Link></li>
                  <li className="flex gap-2">• Prüfen und passen Sie die Punkte nach den ersten Rundgängen an, sobald echte Ergebnisse vorliegen</li>
                </ul>
              </div>
            </ScrollReveal>
            <SectionVisual locale="de" variant="flow" caption="Checkliste einrichten" steps={['Kamera wählen', 'Prüfpunkte formulieren', 'Wachperson und Nachricht festlegen', 'Jederzeit neu ordnen']} alt="Konfiguration zum Hinzufügen und Bearbeiten von Checklistenpunkten je Kamera" />
          </div>

          <FaqSection items={faqs} locale="de" inline />

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Weiterlesen</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/de/ki-waechterrundgang/benachrichtigungen" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Benachrichtigung der Wachperson <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/de/ki-waechterrundgang/digitales-wachbuch" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Digitales Wachbuch <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/de/ki-waechterrundgang/kontrollprotokolle" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Kontrollprotokolle <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/use-cases/guard-tour-verification" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Nachweis von Wächterrundgängen (Englisch) <ArrowRight className="h-3 w-3" /></Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
