import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { SectionVisual } from '@/components/content/section-visual';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * German counterpart of /platform/deployment-options. Same facts, nothing added: see the
 * English page's header for what the business stated and what must not be invented.
 */
const pageMeta = {
  title: 'Bereitstellung: Cloud, On-Premises, Hybrid',
  description: 'Camzify läuft in der Cloud, in Ihren eigenen Räumen oder als Hybrid. On-Premises-Installationen werden mit Ihnen geplant und von Camzify eingerichtet.',
  path: '/de/plattform/bereitstellung',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  { question: 'Kann Camzify vor Ort (On-Premises) betrieben werden?', answer: 'Ja. Neben dem Cloud-Dienst wird Camzify vor Ort betrieben, für Kunden, deren Aufnahmen den eigenen Standort nicht verlassen dürfen, meist aus Datenschutzgründen. Camzify installiert und richtet die gesamte Installation ein.' },
  { question: 'Welchen Server braucht eine On-Premises-Installation?', answer: 'Das hängt davon ab, was vor Ort bleiben muss: wie viele Kameras, welche Erkennungen und wie viele Aufnahmen. Diese Anforderungen werden zuerst im Gespräch mit Ihnen erarbeitet, und der Server wird daraus bemessen. Eine pauschale Angabe vor diesem Gespräch gibt es deshalb nicht.' },
  { question: 'Wer installiert und betreut das System?', answer: 'Camzify installiert und richtet bei einer On-Premises-Installation alles ein. Sie stellen den Standort und die Anforderungen; die Installation selbst übernimmt Camzify.' },
  { question: 'Ist eine Mischung aus Cloud und vor Ort möglich?', answer: 'Ja. Ein Teil kann in Ihren Räumen laufen und ein Teil in der Cloud. Was wo läuft, wird pro Kunde festgelegt, im selben Anforderungsgespräch wie bei einer On-Premises-Installation.' },
  { question: 'Wo liegen die Aufnahmen in der Cloud-Variante?', answer: 'In Amazon S3, in der AWS-Region, die Ihren Standorten am nächsten liegt, bei der Übertragung mit TLS 1.2 oder höher und im Speicher mit AES-256 verschlüsselt.' },
  { question: 'Laufen individuelle Erkennungen auch vor Ort?', answer: 'Ja. Eine für Sie entwickelte Erkennung läuft in der Cloud oder vor Ort, mit derselben Wahl wie beim Rest der Plattform.' },
  { question: 'Wie wird eine On-Premises- oder Hybrid-Bereitstellung berechnet?', answer: 'Wie alles bei Camzify wird sie pro Standort angeboten. Das Angebot folgt auf das Anforderungsgespräch, weil das, was vor Ort laufen muss, den Umfang bestimmt.' },
];

const options = [
  {
    name: 'Cloud',
    tag: 'Standard',
    who: 'Für die meisten Standorte: nichts zu installieren, nichts zu warten.',
    points: [
      'Die Kameras streamen an die Plattform, jedes Modul wird im Browser bedient.',
      'Die Aufnahmen liegen in Amazon S3, in der AWS-Region, die Ihren Standorten am nächsten liegt, mit Aufbewahrungsdauer pro Kamera.',
      'Kameras in einem privaten Netzwerk werden über den Camzify Connector angebunden, ohne Portweiterleitung.',
    ],
  },
  {
    name: 'Vor Ort',
    tag: 'Für den Datenschutz',
    who: 'Für Kunden, deren Aufnahmen den eigenen Standort nicht verlassen dürfen.',
    points: [
      'Der Server wird aus Ihren Anforderungen bemessen, die zuerst mit Ihnen erarbeitet werden.',
      'Camzify installiert und richtet alles ein.',
      'Auch individuelle Erkennungen können vor Ort laufen.',
    ],
  },
  {
    name: 'Hybrid',
    tag: 'Beides',
    who: 'Für Kunden, die einen Teil vor Ort und einen Teil in der Cloud möchten.',
    points: [
      'Was wo läuft, wird pro Kunde festgelegt.',
      'Geplant im selben Anforderungsgespräch wie eine On-Premises-Installation.',
      'Pro Standort angeboten, wie jede Camzify-Bereitstellung.',
    ],
  },
];

export default function DeBereitstellungPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Plattform', href: '/de/plattform' },
      { label: 'Bereitstellung' },
    ]}>
      <FeatureHero
        eyebrow="Plattform · Bereitstellung"
        title="Cloud, vor Ort oder eine Mischung aus beidem"
        lede={<><strong className="font-semibold text-foreground">Camzify läuft standardmäßig in der Cloud und in Ihren eigenen Räumen, wenn die Aufnahmen den Standort nicht verlassen dürfen.</strong> Auch eine Mischung aus beidem ist möglich. On-Premises- und Hybrid-Installationen werden aus Ihren Anforderungen mit Ihnen geplant, und Camzify installiert und richtet alles ein.</>}
        facts={['Standardmäßig in der Cloud', 'Vor Ort für den Datenschutz', 'Von Camzify eingerichtet']}
        primary={{ href: '/book-a-demo', label: 'Bereitstellung planen' }}
        secondary={{ href: '/de/sicherheit-und-datenschutz', label: 'Sicherheit und Datenschutz' }}
        visual={<SectionVisual locale="de" variant="flow" caption="Bereitstellung · drei Varianten" alt="Drei Varianten der Bereitstellung: Cloud, vor Ort und Hybrid" steps={['Cloud', 'Vor Ort', 'Hybrid', 'Pro Standort angeboten']} />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {options.map((o, i) => (
              <ScrollReveal key={o.name} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-display text-xl font-bold">{o.name}</h2>
                    <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-mono-sm uppercase text-muted-foreground">{o.tag}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{o.who}</p>
                  <ul className="mt-5 space-y-3 text-sm">
                    {o.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Vor Ort</span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">So wird eine On-Premises-Installation geplant</h2>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Es gibt keine Standardbox zum Versand, weil sich von Kunde zu Kunde unterscheidet, was vor Ort bleiben muss. Die Installation beginnt mit einem Gespräch über Ihre Anforderungen: welche Kameras und Standorte, welche Erkennungen, wie viele Aufnahmen für wie lange, und was das Gebäude nie verlassen darf. Aus diesen Antworten wird der Server bemessen, und Camzify installiert und richtet anschließend die gesamte Installation ein. Dasselbe Gespräch klärt, ob eine Hybrid-Lösung mit einem Teil in der Cloud besser passt.
              </p>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Videoaufnahmen, auf denen Personen erkennbar sind, sind personenbezogene Daten im Sinne der DSGVO. Wo sie liegen, legen Sie mit der Wahl der Bereitstellung selbst fest.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Welche Variante passt</h2>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Wählen Sie die Cloud, wenn Sie nichts installieren oder warten möchten, wenn Sie mehrere Standorte betreiben oder wenn Aufnahmen einen gestohlenen oder defekten Rekorder überstehen sollen. Wählen Sie vor Ort, wenn ein Vertrag, eine Vorschrift oder Ihre eigene Richtlinie verlangt, dass Aufnahmen in Ihren Räumen bleiben. Wählen Sie eine Mischung, wenn das nur für einen Teil gilt. Mehr zur Cloud-Variante steht auf der Seite zum{' '}
                <Link href="/de/cloud-videomanagementsystem" className="text-primary hover:underline">Cloud-Videomanagementsystem</Link>.
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
              { href: '/de/sicherheit-und-datenschutz', title: 'Sicherheit und Datenschutz', desc: 'Verschlüsselung, Zugriffskontrolle und der Stand der Zertifizierungen.' },
              { href: '/de/ki-funktionen/individuelle-erkennungen', title: 'Individuelle Erkennungen', desc: 'Auf Bestellung entwickelt, in der Cloud oder vor Ort.' },
              { href: '/de/camzify-connector', title: 'Camzify Connector', desc: 'Wie Kameras im privaten Netzwerk ohne Portweiterleitung in die Cloud kommen.' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group rounded-xl border border-border bg-card p-6 transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <h3 className="font-display text-base font-bold transition-colors group-hover:text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs} locale="de" />
    </PageShell>
  );
}
