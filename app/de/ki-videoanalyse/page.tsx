import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { SectionVisual } from '@/components/content/section-visual';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { serviceSchema } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const pageMeta = {
  title: 'KI-Videoanalyse auf vorhandenen Kameras',
  description: 'KI-Videoanalyse erkennt Ereignisse auf den Kamerabildern selbst, statt nur aufzuzeichnen: Perimeterschutz, Sabotage, Personen- und Fahrzeugerkennung und mehr.',
  path: '/de/ki-videoanalyse',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  {
    question: 'Was ist KI-Videoanalyse?',
    answer: 'KI-Videoanalyse wertet das Kamerabild selbst aus, statt nur aufzuzeichnen: Eine Person in einer definierten Zone, ein Fahrzeug an der falschen Stelle, eine Kamera, die verdeckt oder verstellt wurde, Rauch oder Feuer im Bild. Jede Funktion läuft auf der jeweiligen Kamera weiter und meldet nur innerhalb des dafür eingestellten Zeitfensters.',
  },
  {
    question: 'Läuft die Analyse auf jeder Kamera automatisch?',
    answer: 'Nein – jede KI-Funktion wird pro Kamera einzeln aktiviert und ist eine eigene Instanz in der Abrechnung. Eine Kamera kann mehrere Funktionen gleichzeitig haben, etwa Perimeterschutz und Sabotageerkennung.',
  },
  {
    question: 'Wie unterscheidet sich das vom virtuellen Wächterrundgang?',
    answer: 'KI-Detektion läuft fortlaufend zwischen den geplanten Runden und meldet ereignisgesteuert. Der virtuelle Wächterrundgang läuft nach festem Zeitplan und prüft eine Checkliste unabhängig davon, ob ein Ereignis vorliegt. Auf denselben Kameras ergänzen sich beide.',
  },
  {
    question: 'Wird bei jeder Meldung ein Alarm ausgelöst?',
    answer: 'Nur innerhalb des eingestellten Meldefensters. Eine Zone kann rund um die Uhr erkennen, aber nur außerhalb der Geschäftszeiten tatsächlich eine Meldung auslösen – das Fenster wird pro Kamera und pro Detektionsart festgelegt.',
  },
];

export default function KiVideoanalysePage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
            schema={[serviceSchema({ name: 'KI-Videoanalyse', description: pageMeta.description, path: pageMeta.path })]}
      breadcrumbs={[{ label: 'KI-Videoanalyse' }]}
    >
      <section className="pb-16 pt-4">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">KI-Videoanalyse</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            KI-Videoanalyse auf den Kameras, die Sie bereits haben
          </h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">
              KI-Videoanalyse wertet das Kamerabild selbst aus statt es nur aufzuzeichnen:
            </strong>{' '}
              eine Person in einer Zone, ein Fahrzeug an der falschen Stelle, eine Kamera, die verdeckt oder verstellt wurde. Jede Funktion läuft je Kamera und meldet innerhalb des dafür eingestellten Zeitfensters an die zuständige Person.
          </p>
          <div className="mt-8">
            <Link href="/book-a-demo" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              Demo anfragen <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Meldung, nicht Dauerbeschuss</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Ein Meldefenster je Detektion</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                Eine Zone kann rund um die Uhr erkennen, aber nur in dem Zeitfenster tatsächlich eine Meldung auslösen, das für sie eingestellt ist – eine Laderampe meldet nachts, bleibt tagsüber während des Betriebs still. Die Meldung geht mit dem zugehörigen Bild an die Person, die für diese Kamera festgelegt ist.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionVisual locale="de"
                variant="flow"
                steps={['Ereignis auf der Kamera', 'Prüfung gegen Zeitfenster', 'Meldung mit Bild', 'Person entscheidet']}
                caption="Ablauf einer KI-Detektion vom Ereignis bis zur Meldung."
                alt="Vierstufiger Ablauf von einem Kameraereignis über die Prüfung gegen das Meldefenster bis zur Meldung mit Bild und der Entscheidung einer Person"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-site px-6">
          <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Weiterlesen</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { href: '/de', title: 'Cloud-Videomanagement', desc: 'Die Übersicht.' },
              { href: '/de/virtueller-waechterrundgang', title: 'Virtueller Wächterrundgang', desc: 'Der geplante Kontrollgang.' },
              { href: '/de/fuer-sicherheitsdienste', title: 'Für Sicherheitsdienste', desc: 'Als zusätzliche Leistung anbieten.' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group rounded-xl border border-border bg-card p-6 transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <h3 className="font-display text-base font-bold transition-colors group-hover:text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs} heading="Fragen zur KI-Videoanalyse" eyebrow="FAQ" />
    </PageShell>
  );
}
