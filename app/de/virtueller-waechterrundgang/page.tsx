import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { SectionVisual } from '@/components/content/section-visual';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { serviceSchema } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const pageMeta = {
  title: 'Virtueller Wächterrundgang: Definition und Ablauf',
  description: 'Ein virtueller Wächterrundgang prüft jede Kamera einer Route nach Zeitplan gegen eine Checkliste und meldet jeden Fehler sofort an die zuständige Person.',
  path: '/de/virtueller-waechterrundgang',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  {
    question: 'Was genau passiert bei einem virtuellen Wächterrundgang?',
    answer: 'Zur geplanten Zeit beginnt die Runde an der ersten Kamera der Route und arbeitet die Checkliste für diesen Punkt ab: Tor geschlossen, keine Person auf dem Gelände, Rampentor zu, Kamerasicht frei. Jeder Punkt wird anhand des Einzelbilds bewertet, das Bild wird gespeichert. Ein fehlgeschlagener Punkt löst sofort eine Meldung an die für diese Kamera zuständige Person aus.',
  },
  {
    question: 'Was passiert zwischen den Runden?',
    answer: 'Die KI-Detektionen, die für jede Kamera aktiviert sind, laufen weiter: Perimeterschutz, Sabotageerkennung, Personen- und Fahrzeugverfolgung und weitere. Jede Detektion hat ein eigenes Meldefenster, sodass eine Zone tagsüber erkennt, aber erst nachts eine Meldung auslöst.',
  },
  {
    question: 'Ersetzt der virtuelle Wächterrundgang den Sicherheitsdienst?',
    answer: 'Er ersetzt die wiederkehrende Kontrollrunde und die Zeit, die auf einem leeren Gelände mit der Beobachtung der Kameras verbracht würde – nicht die Person, die vor Ort eingreifen kann. Wenn eine Prüfung fehlschlägt, wird eine Person benachrichtigt und entscheidet über das weitere Vorgehen; wird ein Eingreifen vor Ort benötigt, bleibt weiterhin eine Person in Reichweite des Standorts nötig.',
  },
  {
    question: 'Wie unterscheidet sich das von Videofernüberwachung mit Aufschaltung?',
    answer: 'Videofernüberwachung mit Live-Aufschaltung reagiert typischerweise auf einen ausgelösten Alarm: Ein Ereignis löst eine Prüfung durch eine Leitstelle aus. Der virtuelle Wächterrundgang läuft umgekehrt nach festem Zeitplan, unabhängig davon, ob ein Alarm vorliegt – jede Kamera der Route wird zur festgelegten Zeit geprüft und das Ergebnis dokumentiert.',
  },
  {
    question: 'Wer erhält die Meldung bei einem fehlgeschlagenen Punkt?',
    answer: 'Die für diese Kamera festgelegte Person: eine Wache vor Ort, ein mobiler Streifendienst, ein Ansprechpartner beim Kunden oder ein Operator in einer Leitstelle. Kanal und Empfänger werden je Kamera und je Detektionsart festgelegt.',
  },
];

export default function VirtuellerWaechterrundgangPage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
            schema={[serviceSchema({ name: 'Virtueller Wächterrundgang', description: pageMeta.description, path: pageMeta.path })]}
      breadcrumbs={[{ label: 'Virtueller Wächterrundgang' }]}
    >
      <section className="pb-16 pt-4">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Der Begriff</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Virtueller Wächterrundgang: Sicherheit über die vorhandenen Kameras
          </h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">
              Ein virtueller Wächterrundgang ist ein geplanter Kontrollgang, den Software statt einer Person auf den Kameras eines Standorts durchführt:
            </strong>{' '}
            jede Kamera der Route wird zur festgelegten Zeit gegen eine Checkliste geprüft, jedes Ergebnis mit dem zugehörigen Bild dokumentiert und jeder Fehler sofort an die zuständige Person gemeldet.
          </p>
          <div className="mt-8">
            <Link href="/de/fuer-sicherheitsdienste" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              Für Sicherheitsdienste <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Der Ablauf</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Ein Kontrollpunkt der Route</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                Jeder Punkt der Checkliste wird anhand des Kamerabilds zu diesem Zeitpunkt bewertet und mit dem Bild gespeichert – nicht nur, dass eine Kamera geprüft wurde, sondern was zu sehen war.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionVisual locale="de"
                variant="checklist"
                label="KAM 03 · Rampe"
                guard="Nachtwache, mobil"
                items={[['Rampentor 1 geschlossen', 'fail'], ['Keine Person auf der Rampe', 'ok'], ['Stapler in Parkposition', 'ok'], ['Kamerasicht frei', 'ok']]}
                caption="Ein Kontrollpunkt der Route. Das Tor ist offen, die Nachtwache wurde bereits mit diesem Bild benachrichtigt."
                alt="Eine Checkliste für einen Kamerapunkt mit drei bestandenen Punkten und einem fehlgeschlagenen Rampentor-Punkt"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Grenzen</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Was der virtuelle Wächterrundgang nicht leistet</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                Er greift nicht vor Ort ein. Er sieht nichts außerhalb des Kamerabilds, weshalb &bdquo;Kamerasicht frei&ldquo; auf jeder Route ein eigener Prüfpunkt ist. Und er entscheidet nicht über das weitere Vorgehen – er meldet einer Person, mit dem Bild, und die Entscheidung liegt bei ihr.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16">
        <div className="mx-auto max-w-site px-6">
          <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Weiterlesen</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { href: '/de', title: 'Cloud-Videomanagement', desc: 'Die Übersicht.' },
              { href: '/de/fuer-sicherheitsdienste', title: 'Für Sicherheitsdienste', desc: 'DIN 77200, Streifendienst-Sprache.' },
              { href: '/de/ki-videoanalyse', title: 'KI-Videoanalyse', desc: 'Erkennung zwischen den Runden.' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group rounded-xl border border-border bg-card p-6 transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <h3 className="font-display text-base font-bold transition-colors group-hover:text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs} heading="Fragen zum virtuellen Wächterrundgang" eyebrow="FAQ" />
    </PageShell>
  );
}
