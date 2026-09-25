import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { PhotoFigure } from '@/components/content/photo-figure';
import { SectionVisual } from '@/components/content/section-visual';
import { ComparisonTable } from '@/components/content/comparison-table';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * German counterpart of /virtual-patrolling/vs-security-guards. Page identity is
 * declared once and consumed by generatePageMeta and PageShell.
 */
const pageMeta = {
  title: 'KI-Wächterrundgang im Vergleich zu Wachpersonal',
  description: 'Der KI-gestützte Wächterrundgang im Vergleich mit Wachpersonal: Kosten, Abdeckung, Gleichmäßigkeit, Nachweis und Skalierung, und wo Wachpersonal nötig bleibt.',
  path: '/de/ki-waechterrundgang/vergleich-wachpersonal',
};

export const metadata = generatePageMeta(pageMeta);

/*
 * The English table's "Monthly cost per site" row carries a US dollar range for manned
 * guarding with no source on the page. docs/I18N.md: a US figure is either kept with its
 * source or left out, so the row is left out here.
 */
const rows = [
  { feature: 'Abdeckung', camzify: 'Rund um die Uhr, 365 Tage', competitor: '8–12 Std. je Schicht', traditional: false },
  { feature: 'Ermüdung und menschliche Fehler', camzify: 'Keine', competitor: 'Deutlich nach 2 Std.', traditional: '-' },
  { feature: 'Gleichmäßigkeit zwischen Rundgängen', camzify: 'Jedes Mal identisch', competitor: 'Je nach Person unterschiedlich', traditional: '-' },
  { feature: 'Nachweis mit Zeitstempel', camzify: true, competitor: 'Teilweise (Unterschriftenlisten)', traditional: false },
  { feature: 'Nachweis je Prüfpunkt', camzify: true, competitor: false, traditional: false },
  { feature: 'Automatische Benachrichtigung der Wachperson', camzify: true, competitor: false, traditional: false },
  { feature: 'PDF-Protokoll je Rundgang', camzify: true, competitor: false, traditional: false },
  { feature: 'Skalierung über Standorte', camzify: 'Kameras hinzufügen', competitor: 'Mehr Personal einstellen', traditional: '-' },
  { feature: 'Eingreifen vor Ort', camzify: 'Erfordert Wachperson in Bereitschaft', competitor: true, traditional: false },
];

const faqs = [
  { question: 'Ersetzt der KI-gestützte Wächterrundgang das Wachpersonal vollständig?', answer: 'Er ersetzt den routinemäßigen Kontrollgang, das wiederkehrende Ablaufen und Prüfen, das den größten Teil einer Schicht ausmacht. Für das Eingreifen vor Ort, den Besucherempfang und die Zutrittskontrolle wird weiterhin Wachpersonal gebraucht. Der KI-gestützte Wächterrundgang spart die Kosten der Kontrollgänge ein, nicht die Sicherheitsaufgabe.' },
  { question: 'Was passiert, wenn eine Kamera während eines Rundgangs ausgefallen ist?', answer: 'Das System protokolliert die Kamera als nicht erreichbar und markiert ihre Checklistenpunkte als nicht prüfbar. Das erscheint im Kontrollprotokoll. Die Überwachung des Kamerazustands läuft getrennt davon und meldet Verbindungsprobleme.' },
  { question: 'Lässt sich der KI-gestützte Wächterrundgang zusammen mit vorhandenem Wachpersonal einsetzen?', answer: 'Ja. Viele Betriebe nutzen ihn für die Rundgänge nachts und außerhalb der Geschäftszeiten und behalten tagsüber eine Wachperson vor Ort. Das Kontrollprotokoll gibt der Einsatzleitung für jede Schicht einen Nachweis.' },
  { question: 'Entstehen durch den Umstieg Probleme mit Versicherung oder Haftung?', answer: 'Das sollte nicht der Fall sein, es lohnt sich aber, vor dem Umstieg mit Ihrem Versicherer und anhand der Risikorichtlinien Ihres Standorts zu klären. Viele Betriebe stellen fest, dass der Nachweis mit Zeitstempel je Prüfpunkt ihre Haftungsposition gegenüber einer Unterschriftenliste sogar stärkt, weil klar dokumentiert ist, was wann geprüft wurde.' },
  { question: 'Gibt es tarifliche oder vertragliche Fragen, wenn Wachstunden ersetzt werden?', answer: 'Das hängt ganz von Ihren bestehenden Verträgen und etwaigen Tarifvereinbarungen ab. Diese Frage gehört zu Ihrer Rechts- oder Personalabteilung; Camzify kann sie nicht pauschal beantworten. Viele Standorte umgehen das Thema, indem sie den KI-gestützten Wächterrundgang für Stunden einsetzen, die bisher gar nicht besetzt waren, statt bestehende Schichten direkt zu ersetzen.' },
  { question: 'Wie schnell kann ein Standort den KI-gestützten Wächterrundgang neben vorhandenem Wachpersonal erproben?', answer: 'Da er auf Ihren vorhandenen Kameras läuft und keine bestehende Bewachung abgezogen werden muss, kann ein Pilotbetrieb parallel zum Wachpersonal vor Ort laufen. So kann ein Standort beides direkt vergleichen, bevor sich an der Personalplanung etwas ändert.' },
];

export default function DeKiWaechterrundgangVergleichWachpersonalPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'KI-Wächterrundgang', href: '/de/ki-waechterrundgang' },
      { label: 'Vergleich mit Wachpersonal' },
    ]}>
      <FeatureHero
        eyebrow="Direkter Vergleich"
        title="KI-Wächterrundgang oder Wachpersonal?"
        lede={<>Der <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützte Wächterrundgang</Link> und
            Wachpersonal lösen dasselbe Problem: Jeder Kontrollpunkt eines Standorts wird regelmäßig geprüft, und auf
            Fehler wird reagiert. Der Unterschied liegt bei Kosten, Gleichmäßigkeit und Nachweisbarkeit. Diese Seite
            vergleicht beides ehrlich, auch dort, wo Wachpersonal im Vorteil bleibt.</>}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/roi-calculator', label: 'Eigene Zahlen rechnen (Englisch)' }}
        visual={<PhotoFigure src="/compare-vs-security-guards.webp" alt="Ein Sicherheitsmitarbeiter prüft einen virtuellen Kontrollgang auf einem Tablet, daneben eine Wachperson am Gebäudeeingang" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-12">
            <ScrollReveal>
              <ComparisonTable
                rows={rows}
                columns={['Kriterium', 'Camzify KI-Wächterrundgang', 'Wachpersonal vor Ort', 'Keine Kontrollgänge']}
              />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Ehrliche Grenzen</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Wo Wachpersonal im Vorteil bleibt</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Beim Eingreifen vor Ort. Ist ein Unbefugter auf dem Gelände, kann eine Kamera ihn erkennen und
                melden, aber nicht körperlich eingreifen. Betriebe, die sofortige Präsenz vor Ort brauchen
                (Notaufnahmen in Krankenhäusern, Einzelhandel mit hochwertiger Ware, aktive Baustellen), benötigen
                weiterhin jemanden, der eingreifen kann, sei es eine Wachperson vor Ort, ein mobiler Streifendienst
                oder die Polizei.
              </p>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Am stärksten ist die Kombination aus beidem: Der KI-gestützte Wächterrundgang übernimmt die
                wiederkehrenden Rundgänge zu einem Bruchteil der Kosten, und eine Wachperson in Bereitschaft
                übernimmt die Ausnahmen, die ein Eingreifen vor Ort erfordern. Das Kontrollprotokoll sagt der
                Wachperson genau, was wo nicht erfüllt ist, sodass die Reaktionszeit von Stunden auf Minuten sinkt.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Das kombinierte Modell</h2>
                <p className="mt-4 text-muted-foreground">
                  Der KI-gestützte Wächterrundgang und eine Wachperson in Bereitschaft sind keine konkurrierenden
                  Optionen, sondern decken zwei Hälften derselben Aufgabe ab. Die KI führt jeden routinemäßigen
                  Rundgang nach Zeitplan durch, ohne einen Kontrollpunkt auszulassen.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Kommt ein Checklistenpunkt als nicht erfüllt zurück, wird die zuständige Wachperson sofort
                  benachrichtigt und greift genau in den Situationen ein, die Präsenz vor Ort erfordern, statt
                  jeden Rundgang selbst abzulaufen.
                </p>
                {/*
                  As on the English page: a guarding company reading this is being told its
                  own model is the problem, so it gets the other door, the same product sold
                  as a service the agency provides.
                */}
                <p className="mt-4 text-muted-foreground">
                  <strong className="font-semibold text-foreground">Sie führen einen Sicherheitsdienst?</strong>{' '}
                  Dann ist das eine Leistung, die Sie verkaufen, statt Kosten, die Sie einsparen – nächtliche
                  Absicherung aller Kundenstandorte, mit einem Protokoll je Kunde, zusätzlich zu dem Wachpersonal,
                  das Sie bereits stellen. Mehr unter{' '}
                  <Link href="/de/fuer-sicherheitsdienste" className="text-primary hover:underline">Camzify für Sicherheitsdienste</Link>.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <SectionVisual locale="de" variant="flow" caption="Kombiniertes Modell" alt="Ablauf: Der KI-gestützte Wächterrundgang übernimmt die routinemäßigen Rundgänge, eine Wachperson in Bereitschaft reagiert auf gemeldete Ausnahmen" steps={['KI führt jeden Routinerundgang durch', 'Eine Prüfung schlägt fehl', 'Wachperson zu diesem Kontrollpunkt geschickt', 'Rundgang und Einsatz dokumentiert']} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Selbst rechnen</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Kostenvergleich</h2>
              <p className="mt-4 text-muted-foreground">
                Mit dem <Link href="/roi-calculator" className="text-primary hover:underline">ROI-Rechner</Link> (Englisch)
                vergleichen Sie Ihre aktuellen Kosten für Wachpersonal mit Camzify für Ihre konkrete
                Standortkonfiguration. Ausführliche Kostendaten zu Wachpersonal finden Sie in unserem Leitfaden zu{' '}
                <Link href="/guides/security-guard-cost-per-hour" className="text-primary hover:underline">Stundensätzen für Wachpersonal</Link> (Englisch).
              </p>
            </ScrollReveal>
          </div>

          <FaqSection items={faqs} locale="de" inline />

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Weiterlesen</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/de/preise" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Preise <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/roi-calculator" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">ROI-Rechner (Englisch) <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/guides/security-guard-cost-per-hour" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Leitfaden zu Wachkosten (Englisch) <ArrowRight className="h-3 w-3" /></Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
