import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { serviceSchema } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const pageMeta = {
  title: 'Cloud-VMS für CCTV- und Alarmanlagen-Installateure',
  description: 'Verkaufen Sie ein monatlich abgerechnetes Cloud-Videomanagementsystem auf bereits verbauten Kameras, statt nur einmalig zu installieren.',
  path: '/de/fuer-installateure',
  hreflang: {
    'de-DE': '/de/fuer-installateure',
    'en-US': '/partners/for-security-integrators',
    'x-default': '/partners/for-security-integrators',
  },
};

export const metadata = generatePageMeta({ ...pageMeta, locale: 'de_DE' });

const faqs = [
  {
    question: 'Muss ich neue Hardware verkaufen, um Camzify anzubieten?',
    answer: 'Nein. Jede Kamera, die bereits einen RTSP-, RTMP- oder HTTPS-Stream liefert, kann angebunden werden. Kameras in einem privaten Netzwerk laufen über den Camzify Connector, eine kleine Anwendung im Kundennetzwerk, ohne dass Ports am Router geöffnet werden müssen.',
  },
  {
    question: 'Was hat das mit VdS 2366 zu tun?',
    answer: 'VdS 2366 ist die Zertifizierung der VdS Schadenverhütung für Errichter von Sicherheitsanlagen — vergleichbar mit einer Art Gütesiegel, auf das größere gewerbliche Kunden bei der Auswahl eines Errichters achten. Camzify hält VdS 2366 nicht selbst; die Zertifizierung betrifft den Errichter, nicht den Softwareanbieter. Für einen VdS-2366-zertifizierten Errichter ist ein Cloud-VMS ein zusätzliches Angebot, das sich in ein bestehendes Kundenverhältnis einfügt, ohne die Zertifizierung selbst zu berühren.',
  },
  {
    question: 'Wie funktioniert die Abrechnung?',
    answer: 'Pro Instanz und Monat: eine Stream-Instanz je Kamera, eine Detektions-Instanz je aktivierter KI-Funktion und Kamera, sowie Cloud-Speicher pro Terabyte. Ein Angebot wird pro Standort erstellt; es werden keine pauschalen Listenpreise veröffentlicht.',
  },
  {
    question: 'Kann ich mehrere Kunden über ein Konto verwalten?',
    answer: 'Ja. Jeder Kunde erhält ein eigenes, abgegrenztes Unterkonto mit Zugriff nur auf seine eigenen Standorte und Kameras; Sie weisen Instanzen aus Ihrem eigenen Kontingent zu und behalten die Übersicht über alle Kunden in einem Konto.',
  },
];

export default function FuerInstallateurePage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      inLanguage="de"
      schema={[serviceSchema({ name: 'Cloud-VMS für Installateure', description: pageMeta.description, path: pageMeta.path, audience: 'CCTV- und Alarmanlagen-Installateure' })]}
      breadcrumbs={[{ label: 'Deutsch', href: '/de' }, { label: 'Für Installateure' }]}
    >
      <section className="pb-16 pt-4">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Für Installateure</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Wiederkehrende Umsätze statt Einmalinstallation
          </h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Eine Installation endet mit der Abnahme, danach bleibt meist nur der Wartungsvertrag. Ein Cloud-Videomanagementsystem auf den bereits verbauten Kameras eines Kunden ist ein monatlich abgerechnetes Angebot, das keine zusätzliche Hardware braucht und nach der Installation weiterläuft.
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
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Ohne neue Hardware</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Auf den bereits verbauten Kameras</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                Jede Kamera, die einen RTSP-, RTMP- oder HTTPS-Stream liefert, wird direkt angebunden. Kameras in einem privaten Netzwerk laufen über den Camzify Connector, ohne dass am Router etwas geöffnet werden muss — der Aufwand bleibt auf die Einrichtung des Kontos beschränkt, nicht auf einen erneuten Vor-Ort-Termin für neue Geräte.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Für zertifizierte Errichter</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Ein Zusatzangebot, keine neue Zertifizierung</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                Größere gewerbliche Kunden wählen ihren Errichter häufig auch nach dessen VdS-2366-Zertifizierung aus. Ein Cloud-VMS lässt sich als zusätzliches, monatlich abgerechnetes Angebot in dieses bestehende Kundenverhältnis einfügen, ohne die Zertifizierung selbst zu berühren — sie betrifft den Errichter, nicht die hier angebotene Software.
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
              { href: '/de/cloud-videomanagementsystem', title: 'Cloud-Videomanagementsystem', desc: 'Aufzeichnung und Speicherung.' },
              { href: '/de/fuer-sicherheitsdienste', title: 'Für Sicherheitsdienste', desc: 'Der virtuelle Wächterrundgang.' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group rounded-xl border border-border bg-card p-6 transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <h3 className="font-display text-base font-bold transition-colors group-hover:text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs} heading="Fragen für Installateure" eyebrow="FAQ" />
    </PageShell>
  );
}
