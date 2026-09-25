import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { MultiSiteMockup } from '@/components/mockups/multi-site-mockup';
import Link from 'next/link';
import { SiteImage } from '@/components/content/site-image';
import { Building2, SlidersHorizontal, BarChart3, Camera } from 'lucide-react';

/**
 * German counterpart of /platform/multi-site-management. Site names (HQ Campus,
 * Parking Structure B, Retail - Downtown, Warehouse - Sector 4) are the sample sites
 * shown in the English-only console and are kept as they appear there.
 */
const pageMeta = {
  title: 'Videoüberwachung für mehrere Standorte',
  description: 'Camzify für mehrere Standorte: eine zentrale Konsole für Kameras, Alarme und den Nachweis der Rundgänge an allen verteilten Standorten.',
  path: '/de/plattform/mehrere-standorte',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  { question: 'Ändert ein zusätzlicher Standort meine Lizenz oder brauche ich einen neuen Tarif?', answer: 'Ein zusätzlicher Standort verbraucht für sich genommen nichts aus Ihrem Tarif – das Lizenzkontingent unter „Plan & Usage“ richtet sich nach Instanzen und Speicher, nicht nach Standorten. Kameras und Instanzen für KI-Funktionen am neuen Standort werden aus demselben kontoweiten Kontingent genommen. Sie brauchen also genügend verfügbare Instanzen, kein Tarif-Upgrade, nur um einen Standort hinzuzufügen.' },
  { question: 'Kann jeder Standort andere KI-Funktionen nutzen?', answer: 'Ja. In diesem Konto sind 6 von 9 KI-Funktionen kontoweit aktiv, aber welche davon an einem bestimmten Standort laufen, wird unabhängig festgelegt. Ein Lager nutzt vielleicht Bereichsüberwachung und die Erkennung von Kamerasabotage, eine Filiale im Einzelhandel dagegen Heatmaps, je nachdem, was der jeweilige Standort tatsächlich braucht.' },
  { question: 'Werden Nachweise und Berichte über alle Standorte zusammengefasst oder pro Standort geführt?', answer: 'Beides ist möglich. Jeder Standort behält seine eigene Konfiguration, seine Kameras und seinen Ereignisverlauf als eigenständigen Datensatz, aber die Ansichten Dashboard und Analytics & Reporting können alle Standorte zu einem kontoweiten Gesamtbild zusammenfassen. Ein Nachweisbericht lässt sich so pro Standort abrufen oder über alle Standorte hinweg, je nach Bedarf.' },
  { question: 'Kann ein Unterkonto auf einzelne Standorte beschränkt werden?', answer: 'Ja. Der Zugriff auf Standortebene wirkt zusammen mit den Berechtigungsgruppen, sodass ein Unterkonto nur bestimmte Standorte sehen kann statt aller. Eine Wachperson, die zum Beispiel für Retail - Downtown eingeteilt ist, muss Warehouse - Sector 4 für ihre Arbeit nicht sehen, und ihr Zugriff kann genau das abbilden.' },
  { question: 'Was passiert im Betrieb, wenn ein Standort die Verbindung verliert und die anderen online bleiben?', answer: 'Der betroffene Standort wird eigens markiert, statt in den kontoweiten Zahlen unterzugehen: Sein Anteil an Kameras online sinkt, und er ist in der Standortliste klar erkennbar, während die übrigen Standorte normal weiterberichten. Wie ein vollständiger Standortausfall in diesen Ansichten angezeigt wird, beschreiben die Seiten zum Live-Streaming und zum Dashboard.' },
];

export default function DePlattformMehrereStandortePage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Plattform', href: '/de/plattform' },
      { label: 'Mehrere Standorte' },
    ]}>
      <FeatureHero
        eyebrow="Zentrale Übersicht"
        title="Videoüberwachung für mehrere Standorte"
        lede={<><strong className="font-semibold text-foreground">Die Verwaltung mehrerer Standorte in Camzify bietet eine einzige Konsole, um Kameras, Erkennungsalarme und den Nachweis der Rundgänge an allen Standorten im Blick zu behalten.</strong> Jeder Standort ist eine eigene Einheit mit eigenen Kameras, Rundgangsabläufen und Bedienern, das übergeordnete Konto sieht jedoch alles. Das hier gezeigte Konto betreibt 4 Standorte mit 15 eingerichteten Kameras und 6 von 9 aktiven KI-Funktionen, und jedes Dashboard, jede Live-Ansicht und jeder Benachrichtigungs-Feed lässt sich nach Standort filtern.</>}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/fuer-sicherheitsdienste', label: 'Für Sicherheitsdienste' }}
        visual={<div className="overflow-hidden rounded-xl">
            <SiteImage
              src="/multi-site-video-surveillance.png"
              alt="Ein Laptop mit dem Live-Streaming-Raster von Camzify, die Kamerabilder nach vier Standorten gruppiert: Warehouse, HQ Campus, Retail Downtown und Parking Structure B"
              className="w-full"
              width={1229}
              height={692}
              priority
            sizes="(max-width: 1024px) 100vw, 45vw" />
          </div>}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-12">
            <MultiSiteMockup />
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">In der Praxis</span>
            <h2 className="mt-2 font-display text-2xl font-bold">So werden Standorte gemeinsam verwaltet</h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Building2, title: 'Zentrale Übersicht über alle Standorte', desc: 'Eine Konsole fasst Kameras, Ereignisse und Nachweise aller Standorte zusammen, in diesem Konto 4 Standorte und 15 Kameras, alle in einer Ansicht.' },
              { icon: SlidersHorizontal, title: 'Unabhängige Konfiguration pro Standort', desc: 'Jeder Standort behält seine eigenen Kameras, Rundgangsabläufe und Bediener und wird getrennt von allen anderen Standorten des Kontos eingerichtet.' },
              { icon: BarChart3, title: 'Kontoweiter Überblick über KI-Funktionen', desc: '6 von 9 KI-Funktionen sind kontoweit aktiv, und Sie sehen, an welchen Standorten welche Erkennungsmodelle laufen.' },
              { icon: Camera, title: 'Verteilte Kamera- und Speicherzuteilung', desc: 'Kameras und Speicher kommen aus demselben kontoweiten Kontingent und werden auf die Standorte verteilt, an denen sie tatsächlich gebraucht werden.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 font-display text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Einen Standort hinzufügen</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Eigenständig eingerichtet, ein Dashboard</h2>
                <p className="mt-4 text-muted-foreground">
                  Ein neuer Standort wird für sich angelegt und eingerichtet, mit eigener Adresse, eigenen Kameras,
                  eigenen Rundgangsabläufen und eigener Auswahl an KI-Funktionen, ohne dass sich an der Einrichtung
                  bestehender Standorte etwas ändert. Parking Structure B zum Beispiel läuft mit 2 von 3 Kameras
                  online, unabhängig davon, wie HQ Campus oder Retail - Downtown eingerichtet sind.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Sobald er eingerichtet ist, erscheint der neue Standort direkt im selben kontoweiten Dashboard,
                  Ereignis-Feed und in denselben Benachrichtigungen wie alle anderen Standorte, ohne separates Login
                  und ohne separaten Bericht. Kamerazahlen, Ereignistrends der letzten 7 Tage und die Abdeckung mit
                  KI-Funktionen stehen neben den Standorten, die bereits im Konto sind.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-mono-sm uppercase text-primary">Kontoübersicht</span>
                <div className="mt-4 space-y-3">
                  {[
                    { label: 'Standorte', detail: '4 Standorte, jeder unabhängig eingerichtet' },
                    { label: 'Kameras', detail: '15 eingerichtet, über alle Standorte' },
                    { label: 'KI-Funktionen', detail: '6 von 9 kontoweit aktiv' },
                    { label: 'HQ Campus', detail: '4/4 Kameras online · 101 Ereignisse, plus 23 %' },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2.5">
                      <div>
                        <div className="text-sm font-medium">{r.label}</div>
                        <div className="text-xs text-muted-foreground">{r.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <FaqSection items={faqs} locale="de" inline />

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Weiterführende Seiten</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/de/plattform" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Plattform-Übersicht</Link>
              <Link href="/platform/dashboard" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Dashboard (auf Englisch)</Link>
              <Link href="/de/plattform/benutzerverwaltung" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Benutzerverwaltung</Link>
              <Link href="/de/ki-waechterrundgang" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">KI-gestützter Wächterrundgang</Link>
              <Link href="/de/preise" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Preise</Link>
              <Link href="/book-a-demo" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Demo anfragen</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
