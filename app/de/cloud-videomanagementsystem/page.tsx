import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ProductShot } from '@/components/content/product-shot';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { serviceSchema } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const pageMeta = {
  title: 'Cloud-Videomanagementsystem für IP-Kameras',
  description: 'Aufzeichnung, Speicherung und Wiedergabe für IP-Kameras in der Cloud statt am NVR vor Ort, mit Aufbewahrung pro Kamera und Zugriff über den Browser.',
  path: '/de/cloud-videomanagementsystem',
  hreflang: { 'de-DE': '/de/cloud-videomanagementsystem', 'en-US': '/cloud-video-surveillance', 'x-default': '/cloud-video-surveillance' },
};

export const metadata = generatePageMeta({ ...pageMeta, locale: 'de_DE' });

const faqs = [
  {
    question: 'Was ist ein cloud-basiertes Videomanagementsystem?',
    answer: 'Ein Videomanagementsystem (VMS) nimmt die Streams der IP-Kameras eines Standorts entgegen, zeichnet sie auf und macht sie live und im Rückblick verfügbar. Bei einem Cloud-VMS liegt die Aufzeichnung und Speicherung nicht auf einem Rekorder vor Ort, sondern in der Cloud — der Zugriff erfolgt über den Browser, von jedem Standort aus.',
  },
  {
    question: 'Muss der vorhandene NVR ersetzt werden?',
    answer: 'Nein. Jede Kamera, die einen RTSP-Stream liefert, kann direkt an Camzify angebunden werden, ebenso RTMP- und HTTPS-Streams. Kameras in einem privaten Netzwerk werden über den Camzify Connector angebunden, ohne dass am Router Ports geöffnet werden müssen.',
  },
  {
    question: 'Wo werden die Aufnahmen gespeichert?',
    answer: 'In der AWS-Region, die den Kamerastandorten am nächsten liegt — für deutsche Kunden ist das in der Regel die AWS-Region Frankfurt. Es wird kein pauschales Herkunftsland zugesichert; maßgeblich ist die tatsächliche Nähe zum Standort.',
  },
  {
    question: 'Wie wird die Aufbewahrungsdauer festgelegt?',
    answer: 'Pro Kamera einzeln. Die Speicherkapazität wird pro Terabyte und Monat abgerechnet, und die Aufbewahrungsdauer richtet sich danach, wie der Kunde diesen Speicher auf seine Kameras verteilt.',
  },
  {
    question: 'Was kostet ein Cloud-VMS im Vergleich zu einem NVR vor Ort?',
    answer: 'Camzify wird pro Instanz und Monat abgerechnet — eine Stream-Instanz je Kamera, eine Detektions-Instanz je aktivierter KI-Funktion und Kamera, sowie Cloud-Speicher pro Terabyte. Ein Angebot wird pro Standort erstellt; es werden keine pauschalen Listenpreise veröffentlicht.',
  },
];

export default function CloudVideomanagementsystemPage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      inLanguage="de"
      schema={[serviceSchema({ name: 'Cloud-Videomanagementsystem', description: pageMeta.description, path: pageMeta.path })]}
      breadcrumbs={[{ label: 'Deutsch', href: '/de' }, { label: 'Cloud-Videomanagementsystem' }]}
    >
      <section className="pb-16 pt-4">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Videomanagementsystem</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Cloud-Videomanagementsystem für IP-Kameras
          </h1>
          <div className="mt-10 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="max-w-prose text-body text-muted-foreground">
                <strong className="font-semibold text-foreground">
                  Aufzeichnung, Speicherung und Wiedergabe für IP-Kameras, die in der Cloud statt auf einem Rekorder vor Ort laufen:
                </strong>{' '}
                Jede Kamera verbindet sich direkt oder über den Camzify Connector, die Aufnahme wird nach der pro Kamera eingestellten Frist aufbewahrt, und der Zugriff erfolgt live und im Rückblick über den Browser — von jedem Standort aus, mit einem Login pro Nutzer.
              </p>
              <div className="mt-8">
                <Link href="/book-a-demo" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                  Demo anfragen <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <ProductShot
              src="/product-video-backup"
              alt="Der Bildschirm für Videosicherung in der Camzify-Konsole mit Aufnahmemodus und Aufbewahrungseinstellungen pro Kamera"
              label="Video backup and retention"
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Datenschutz und Speicherort</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Wo die Daten liegen</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                Videoaufnahmen, auf denen Personen erkennbar sind, sind personenbezogene Daten im Sinne der DSGVO; § 4 BDSG regelt zusätzlich die Beobachtung öffentlich zugänglicher Räume — etwa Eingänge, Parkflächen oder Verkaufsflächen, wie sie Camzify-Kunden typischerweise überwachen. Camzify legt fest, dass die Aufnahmen in der AWS-Region gespeichert werden, die den Kamerastandorten am nächsten liegt; für deutsche Standorte ist das die AWS-Region Frankfurt, in Betrieb seit 2014.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-site px-6">
          <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Weiterlesen</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { href: '/de', title: 'Cloud-Videomanagement', desc: 'Die Übersicht.' },
              { href: '/de/fuer-installateure', title: 'Für Installateure', desc: 'VdS 2366, wiederkehrende Umsätze.' },
              { href: '/de/ki-videoanalyse', title: 'KI-Videoanalyse', desc: 'Erkennung auf denselben Kameras.' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group rounded-xl border border-border bg-card p-6 transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <h3 className="font-display text-base font-bold transition-colors group-hover:text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs} heading="Fragen zum Videomanagementsystem" eyebrow="FAQ" />
    </PageShell>
  );
}
