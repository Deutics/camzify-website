import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PhotoFigure } from '@/components/content/photo-figure';
import { serviceSchema } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * German home.
 *
 * The German home, paired with the English homepage (lib/i18n.ts). Positioning follows
 * docs/INTERNATIONAL-EXPANSION.md's Germany section: the category has no settled German
 * name, and the market's "Videofernüberwachung" means the older, alarm-triggered model.
 * No competitor is named on the page (CLAUDE.md rule 8).
 */
const pageMeta = {
  title: 'Cloud-VMS mit virtuellem Wächterrundgang',
  description: 'Ein Cloud-VMS für geplante KI-Kontrollgänge auf Ihren vorhandenen IP-Kameras: Checkliste pro Kamera, Meldung an die zuständige Person, Protokoll pro Runde.',
  path: '/de',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  {
    question: 'Was ist ein virtueller Wächterrundgang?',
    answer: 'Ein virtueller Wächterrundgang ist ein geplanter Kontrollgang, den Software statt einer Person durchführt: Zu festgelegten Zeiten prüft Camzify jede Kamera einer Route gegen eine Checkliste, hält das Ergebnis mit dem zugehörigen Bild fest und meldet jeden Fehler sofort an die zuständige Person. Zwischen den Runden laufen KI-Detektionen auf denselben Kameras weiter.',
  },
  {
    question: 'Ist das dasselbe wie Videofernüberwachung?',
    answer: 'Nicht ganz. Videofernüberwachung beschreibt in Deutschland meist eine Aufschaltung, bei der ein Alarm eine Reaktion einer Leitstelle auslöst. Der virtuelle Wächterrundgang läuft dagegen nach Plan, unabhängig davon, ob ein Alarm ausgelöst wurde – jede Kamera wird zur festgelegten Zeit geprüft, nicht nur im Alarmfall.',
  },
  {
    question: 'Wo bleiben die Videodaten?',
    answer: 'In Amazon S3, in der AWS-Region, die den Standorten des Kunden am nächsten liegt. Welche Region das ist, richtet sich nach den tatsächlichen Standorten der Kameras; ein bestimmtes Land wird nicht pauschal zugesichert.',
  },
  {
    question: 'Ersetzt das den Werkschutz oder den Sicherheitsdienst vor Ort?',
    answer: 'Nein. Der Rundgang übernimmt die wiederkehrende Kontrolle und die Beobachtung zwischen den Runden, nicht das Eingreifen vor Ort. Wenn eine Prüfung fehlschlägt oder eine Detektion auslöst, wird eine Person benachrichtigt und entscheidet, was zu tun ist – Werkschutz- oder Wachpersonal bleibt für den Einsatz vor Ort zuständig.',
  },
  {
    question: 'Braucht man dafür neue Kameras?',
    answer: 'Nein. Jede Kamera, die einen RTSP-Stream liefert, kann verwendet werden, ebenso RTMP- und HTTPS-Streams. Kameras in einem privaten Netzwerk werden über den Camzify Connector angebunden, ohne dass Ports geöffnet werden müssen.',
  },
];

export default function GermanHubPage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
            schema={[serviceSchema({ name: 'Virtueller Wächterrundgang', description: pageMeta.description, path: pageMeta.path })]}
      breadcrumbs={[{ label: 'Übersicht' }]}
    >
      <section className="pb-16 pt-4">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Cloud-Videomanagement</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Ein Cloud-VMS mit virtuellem Wächterrundgang
          </h1>
          <div className="mt-10 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="max-w-prose text-body text-muted-foreground">
                <strong className="font-semibold text-foreground">
                  Camzify führt geplante KI-Kontrollgänge auf den IP-Kameras durch, die ein Standort bereits hat:
                </strong>{' '}
                zu festgelegten Zeiten wird jede Kamera einer Route gegen eine Checkliste geprüft, jedes Ergebnis mit dem zugehörigen Einzelbild dokumentiert und jeder Fehler sofort an die zuständige Person gemeldet. Zwischen den Runden laufen KI-Detektionen weiter – Perimeterschutz, Sabotageerkennung, Personen- und Fahrzeugerkennung – mit einem Meldefenster, das für jede Kamera einzeln eingestellt wird.
              </p>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Der Rundgang ist im englischsprachigen Markt als &bdquo;virtual guard&ldquo; oder &bdquo;virtual patrolling&ldquo; bekannt. Ein deutscher Fachbegriff hat sich bisher nicht durchgesetzt; meist ist von Videofernüberwachung im engeren, alarmgesteuerten Sinn die Rede. Diese Seite verwendet &bdquo;virtueller Wächterrundgang&ldquo; für das planmäßige, kameragestützte Kontrollgang-Modell, das Camzify anbietet.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/book-a-demo" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                  Demo anfragen <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/" className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted/40">
                  English version
                </Link>
              </div>
            </div>
            <PhotoFigure
              src="/vp-virtual-guard.png"
              alt="Das Camzify-Dashboard auf einem Laptop: Kameras live, offene kritische Ereignisse, Detektionsverlauf und Live-Alarmfeed"
              priority
            />
          </div>
        </div>
      </section>

      {/* Category naming */}
      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Der Begriff</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Ein planmäßiger Kontrollgang, kein Alarmdienst</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                Videofernüberwachung mit Live-Aufschaltung reagiert auf einen Alarm: Ein Ereignis löst aus, ein Operator schaltet sich auf und reagiert. Der virtuelle Wächterrundgang läuft umgekehrt nach Zeitplan – jede Kamera einer Route wird geprüft, ob ein Alarm vorliegt oder nicht, und das Ergebnis wird mit dem geprüften Bild dokumentiert. Beide Modelle schließen sich nicht aus; viele Kunden nutzen KI-Detektionen für den Alarmfall und den planmäßigen Rundgang für die wiederkehrende Kontrolle.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Personas */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Für wen</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Zwei Wege, Camzify einzusetzen</h2>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <ScrollReveal>
              <div className="flex h-full flex-col rounded-xl border border-border bg-card p-8">
                <h3 className="font-display text-xl font-bold">Sicherheitsdienste und Bewachungsunternehmen</h3>
                <p className="mt-3 flex-1 text-muted-foreground">
                  Der virtuelle Wächterrundgang als zusätzliche, abrechenbare Leistung neben Streifendienst und Werkschutz – für Standorte, Nächte oder Kunden, die personell nicht abgedeckt werden können.
                </p>
                <Link href="/de/fuer-sicherheitsdienste" className="mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                  Für Sicherheitsdienste <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-card p-8">
                <h3 className="font-display text-xl font-bold">CCTV- und Alarmanlagen-Installateure</h3>
                <p className="mt-3 flex-1 text-muted-foreground">
                  Ein monatlich abgerechnetes Cloud-Videomanagementsystem auf bereits verbauten Kameras, ohne zusätzliche Hardware zu verkaufen.
                </p>
                <Link href="/de/fuer-installateure" className="mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                  Für Installateure <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Read next */}
      <section className="border-t border-border bg-muted/20 py-16">
        <div className="mx-auto max-w-site px-6">
          <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Weiterlesen</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: '/de/ki-waechterrundgang', title: 'KI-Wächterrundgang', desc: 'Wie ein Rundgang geplant, geprüft und dokumentiert wird.' },
              { href: '/de/plattform', title: 'Plattform', desc: 'Live-Streaming, Speicherung, Alarme und Benutzer in einer Konsole.' },
              { href: '/de/ki-funktionen', title: 'KI-Funktionen', desc: 'Die 23 Erkennungen, die auf vorhandenen Kameras laufen.' },
              { href: '/de/cloud-videomanagementsystem', title: 'Cloud-Videomanagementsystem', desc: 'Aufzeichnung und Speicherung in der Cloud.' },
              { href: '/de/partner', title: 'Partner', desc: 'Für Sicherheitsdienste, Leitstellen, Errichter und MSPs.' },
              { href: '/de/branchen', title: 'Branchen', desc: 'Industrie, Lager und Logistik, Baustellen.' },
              { href: '/de/preise', title: 'Preise', desc: 'Pro Instanz und Monat, pro Standort angeboten.' },
              { href: '/de/sicherheit-und-datenschutz', title: 'Sicherheit und Datenschutz', desc: 'DSGVO, Speicherung und der Stand der Zertifizierungen.' },
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
