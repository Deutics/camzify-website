import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { PhotoFigure } from '@/components/content/photo-figure';
import { SectionVisual } from '@/components/content/section-visual';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * German counterpart of /virtual-patrolling/patrol-compliance-tracking. Page identity
 * is declared once and consumed by generatePageMeta and PageShell.
 */
const pageMeta = {
  title: 'Digitales Wachbuch: Nachweis jedes Rundgangs',
  description: 'Durchführung und Erfüllungsquote aller Kontrollgänge an allen Standorten: Jeder Rundgang wird als Completed, Flagged oder Overdue mit Quote protokolliert.',
  path: '/de/ki-waechterrundgang/digitales-wachbuch',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  { question: 'Wann gilt ein Rundgang als Overdue?', answer: 'Overdue (überfällig) bedeutet, dass ein geplanter Rundgang gar nicht gelaufen ist. Das ist etwas anderes als Flagged (mit Befund): Dann ist der Rundgang gelaufen, aber mindestens ein Checklistenpunkt kam als nicht erfüllt zurück. Weil beides getrennt geführt wird, ist sofort klar, ob das Problem ein versäumter Kontrollgang oder ein tatsächlicher Fehler vor Ort ist.' },
  { question: 'Kann ich Nachweisdaten für einen bestimmten Zeitraum exportieren?', answer: 'Ja. Protokolle lassen sich für jeden frei gewählten Zeitraum exportieren und nach Standort oder Rundgangsablauf filtern. Für eine monatliche Auswertung müssen Sie also nicht jeden Rundgang herausziehen, den das System je protokolliert hat.' },
  { question: 'Wie wird die Erfüllungsquote berechnet?', answer: 'Sie ist der Anteil der erfüllten Checklistenpunkte an allen geprüften Punkten, berechnet je Rundgang und zu einem Gesamtwert über Rundgangsabläufe und Standorte zusammengefasst.' },
  { question: 'Kann ich benachrichtigt werden, wenn die Erfüllungsquote unter einen bestimmten Wert fällt?', answer: 'Ja. Sie können Schwellenwerte festlegen, sodass eine Erfüllungsquote unter dem gewählten Wert im Dashboard markiert wird, statt nur sichtbar zu sein, wenn zufällig jemand ins Protokoll schaut.' },
  { question: 'Ändert die Bearbeitung einer Checkliste frühere Nachweise?', answer: 'Nein. Frühere Protokolle behalten die Checkliste und den Status, die beim tatsächlichen Rundgang aktiv waren. Vergangene Erfüllungsquoten bleiben also korrekt, auch nachdem die Checkliste selbst geändert wurde.' },
];

export default function DeKiWaechterrundgangDigitalesWachbuchPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'KI-Wächterrundgang', href: '/de/ki-waechterrundgang' },
      { label: 'Digitales Wachbuch' },
    ]}>
      <FeatureHero
        eyebrow="Nachweis auf einen Blick"
        title="Digitales Wachbuch für Kontrollgänge"
        lede={<>Das digitale Wachbuch misst durchgeführte gegenüber geplanten Rundgängen über
            alle Abläufe des <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützten Wächterrundgangs</Link>.
            Jeder Rundgang wird mit einem Status – Completed, Flagged oder Overdue (abgeschlossen, mit Befund, überfällig) – und einer Erfüllungsquote protokolliert.
            Das Dashboard zeigt eine einzige Erfüllungsquote über alle Standorte.</>}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/ki-waechterrundgang/kontrollprotokolle', label: 'Kontrollprotokolle' }}
        visual={<PhotoFigure src="/vp-patrol-compliance-tracking-1.png" alt="Der Rundgangsverlauf in der Camzify-Konsole mit Status und Erfüllungsquote jedes Rundgangs" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Warum es zählt</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Warum ein digitales Wachbuch wichtig ist</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Ein geplanter Kontrollgang, der stillschweigend ausfällt, hinterlässt kein deutliches Signal. Niemand wird alarmiert, wenn ein Rundgang einfach nicht stattfindet. Die Lücke zeigt sich erst später, wenn jemand bemerkt, dass Aufnahmen nie gesichtet wurden, oder wenn zu einem Vorfall nichts vorliegt, worauf man sich beziehen kann.</p>
                <p>Den Nachweis aus dem Gedächtnis oder über ein Wachbuch auf Papier zu führen, funktioniert nicht mehr, sobald mehrere Rundgangsabläufe, Schichten und Standorte beteiligt sind. Außerdem lässt sich so nicht unterscheiden, ob ein Rundgang stattgefunden und etwas gefunden hat oder ob er nie stattgefunden hat.</p>
                <p>Werden Status und Erfüllungsquote jedes Rundgangs mit Zeitstempel protokolliert, wird aus der Tätigkeit bei Kontrollgängen eine Kennzahl, die sich über die Zeit verfolgen lässt: je Standort, je Rundgangsablauf oder über den gesamten Betrieb. Ein sich verschlechternder Trend zeigt sich so im Dashboard, lange bevor daraus ein Vorfall wird.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <SectionVisual locale="de" variant="flow" caption="Ermittlung des Status" alt="Ablauf: Die Checklistenergebnisse eines Rundgangs ergeben eine Erfüllungsquote und einen Status" steps={['Rundgang geplant', 'Pünktlich gelaufen?', 'Alle Punkte erfüllt?', 'Completed · Flagged · Overdue']} />
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">So wird er ermittelt</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Wie der Status eines Rundgangs ermittelt wird</h2>
                <ol className="mt-6 space-y-4 text-muted-foreground">
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">01</span><span>Der Rundgang endet, und das Ergebnis jedes Checklistenpunkts wird erfasst</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">02</span><span>Die erfüllten Punkte, geteilt durch alle Punkte, ergeben die Erfüllungsquote des Rundgangs</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">03</span><span>Kam ein Punkt als nicht erfüllt zurück, wird der Rundgang als Flagged markiert</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">04</span><span>Ist der Rundgang bis zur geplanten Zeit nicht gelaufen, wird er stattdessen als Overdue markiert</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">05</span><span>Status und Quote werden für diesen Rundgang in den Rundgangsverlauf geschrieben</span></li>
                </ol>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Was Sie erhalten</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Was das digitale Wachbuch liefert</h2>
                <div className="mt-6 space-y-4">
                  {[
                    { title: 'Status des Rundgangs', desc: 'Jeder Kontrollgang wird eingeordnet: Completed (alle Punkte beantwortet), Flagged (Fehler gefunden) oder Overdue (geplanter Rundgang nicht gelaufen).' },
                    { title: 'Erfüllungsquote', desc: 'Je Rundgang und insgesamt. Zeigt die erfüllten Punkte als Anteil aller geprüften Punkte.' },
                    { title: 'Filterbarer Rundgangsverlauf', desc: 'Filtern nach Rundgangsablauf, Art des Rundgangs (manuell oder automatisch), Status und Zeitraum.' },
                    { title: 'Im Dashboard', desc: 'Die Gesamt-Erfüllungsquote der Kontrollgänge erscheint im Haupt-Dashboard neben der Kameraverfügbarkeit und der Zahl der KI-Alarme.' },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl border border-border bg-card p-5">
                      <h3 className="font-display text-base font-bold">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <PhotoFigure src="/vp-patrol-compliance-tracking-2.png" alt="Ein Kontrollprotokoll mit Erfüllungsquote und den Ergebnissen je Punkt" caption="Das Protokoll eines Rundgangs: Erfüllungsquote, jeder Punkt und die Bilder dahinter." />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <SectionVisual locale="de" variant="flow" caption="Protokolle und Schwellenwerte" steps={['Schwellenwert festlegen', 'Jeder Rundgang wird bewertet', 'Darunter gefallen?', 'Markiert und exportierbar']} alt="Konfiguration für den Export von Nachweisen und für Schwellenwerte bei niedriger Erfüllungsquote" />
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Konfiguration</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Protokolle exportieren und Schwellenwerte festlegen</h2>
                <p className="mt-4 text-muted-foreground">Die Nachweisdaten sind nicht nur für das Live-Dashboard gedacht. Die meisten Teams müssen sie auch in eine übergreifende Auswertung übernehmen oder noch vor Schichtende auf ein Problem hingewiesen werden statt danach.</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Nachweise lassen sich für einen frei gewählten Zeitraum exportieren, gefiltert nach Standort oder Rundgangsablauf</li>
                  <li className="flex gap-2">• Schwellenwerte lassen sich so festlegen, dass eine Erfüllungsquote unter dem gewählten Wert im Dashboard markiert wird</li>
                  <li className="flex gap-2">• Überfällige Rundgänge werden getrennt von Rundgängen mit niedriger Quote ausgewiesen, damit ein versäumter Kontrollgang nicht in einem sonst guten Wert untergeht</li>
                  <li className="flex gap-2">• Frühere Protokolle behalten die damals aktive Checkliste und den damaligen Status, sodass ältere Exporte auch nach geänderten Checklisten korrekt bleiben</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <FaqSection items={faqs} locale="de" inline />

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Weiterlesen</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/de/ki-waechterrundgang/kontrollprotokolle" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Kontrollprotokolle <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/platform/dashboard" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Dashboard der Plattform (Englisch) <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/platform/analytics-and-reporting" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Analysen (Englisch) <ArrowRight className="h-3 w-3" /></Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
