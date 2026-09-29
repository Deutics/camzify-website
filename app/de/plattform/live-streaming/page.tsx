import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { ProductShot } from '@/components/content/product-shot';
import { LiveStreamingMockup } from '@/components/mockups/live-streaming-mockup';
import Link from 'next/link';
import { LayoutGrid, Gauge, AlertOctagon, Filter } from 'lucide-react';

/** German counterpart of /platform/live-streaming. The mockup is faux console UI and stays English. */
const pageMeta = {
  title: 'Live-Streaming | Mehrere Kameras live ansehen',
  description: 'Camzify Live-Streaming: Kamerawand nach Standort gruppiert, Diashow-Modus, Filter nach Standort und KI-Funktion, klare Offline-Anzeigen. RTSP, RTMP, HTTPS.',
  path: '/de/plattform/live-streaming',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  { question: 'Wie richte ich eine Live-Kamerawand ein?', answer: 'Wählen Sie eine Rastergröße, fassen Sie die Kameras, die gemeinsam beobachtet werden, zu einem gespeicherten Kamera-Set zusammen, markieren Sie ein Set als Standard, damit es zuerst geladen wird, und filtern Sie nach Standort, sobald der Kamerabestand wächst. Die Schritt-für-Schritt-Anleitung (auf Englisch) finden Sie unter /guides/how-to-monitor-live-camera-feeds.' },
  { question: 'Was ist der Unterschied zwischen einem Kamera-Set und einem Rundgangsablauf?', answer: 'Ein Kamera-Set ist eine gespeicherte Gruppe von Kameras für die Beobachtung: Sie wählen die Kameras aus, speichern das Set, und ein Set kann Ihre Standardansicht sein, wenn Sie das Live-Streaming öffnen. Ein Rundgangsablauf ist eine geordnete Liste von Kontrollpunkten mit einer Checkliste an jedem Punkt, die für manuelle oder automatische Rundgänge genutzt wird. Dieselben Kameras, ein anderer Zweck: Ein Set dient dem Beobachten, ein Rundgangsablauf dem Überprüfen.' },
  { question: 'Wie viele Kameras kann ich gleichzeitig sehen?', answer: 'Das Raster wird auf mehrere Seiten verteilt, statt alle Kameras auf einen Bildschirm zu drängen. Ein Konto mit 30 Kameras zeigt zum Beispiel 8 bis 9 pro Seite auf mehreren Seiten, damit jeder Stream gut erkennbar bleibt. Der Diashow-Modus blättert die Seiten automatisch durch, wenn Sie nicht selbst klicken möchten.' },
  { question: 'Was ist der Unterschied zwischen „Low Latency“ und „High Stability“?', answer: '„Low Latency“ liefert das jeweils aktuellste Bild und eignet sich für die aktive Beobachtung, bei der ein, zwei Sekunden zählen. „High Stability“ puffert etwas mehr, um Schwankungen im Netzwerk auszugleichen, und eignet sich für eine Monitorwand oder einen Standort mit weniger zuverlässiger Verbindung. Derselbe Stream, eine andere Abwägung.' },
  { question: 'Was passiert, wenn ein ganzer Standort offline geht?', answer: 'Jede Kamera an diesem Standort zeigt eine Kein-Signal-Anzeige, und der Standort wird in der Standortleiste sowie mit einem Hinweisbanner oben im Raster markiert. So ist auf einen Blick klar, dass es sich um ein Verbindungsproblem an einem Standort handelt und nicht um mehrere voneinander unabhängige Kameraausfälle.' },
  { question: 'Kann ich das Raster nach KI-Funktion statt nach Standort filtern?', answer: 'Ja. Der Filter nach KI-Funktion (z. B. Waffenerkennung) zeigt nur die Kameras, auf denen diese Funktion aktiv läuft. Das ist hilfreich, wenn Sie die Abdeckung für eine bestimmte Erkennung prüfen möchten, statt nach Standort zu suchen.' },
  { question: 'Können Unterkonten Kameras sehen, die ich ihnen nicht zugewiesen habe?', answer: 'Nein. Der Filter „All Users“ zeigt nur die Kameras, auf die ein Unterkonto über seine Berechtigungsgruppe Zugriff hat. Das Live-Raster hält sich an dieselben Zugriffsgrenzen wie der Rest der Plattform.' },
];

export default function DePlattformLiveStreamingPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Plattform', href: '/de/plattform' },
      { label: 'Live-Streaming' },
    ]}>
      <FeatureHero
        eyebrow="Mehrere Kameras live"
        title="Live-Streaming von Kameras"
        lede={<><strong className="font-semibold text-foreground">Das Live-Streaming von Camzify zeigt mehrere Kameras in einem Raster, nach Standort gruppiert, mit einem Diashow-Modus, der in Intervallen von 5 Sekunden bis 1 Minute zwischen den Kameras wechselt.</strong> Filtern Sie nach Standort, Benutzer oder KI-Funktion. Fällt das Signal aus, wird das klar angezeigt, statt auf einem veralteten Bild stehen zu bleiben. Kameras werden über RTSP, RTMP oder HTTPS angebunden, womit auch HLS- und WebRTC-Streams abgedeckt sind.</>}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/guides/how-to-monitor-live-camera-feeds', label: 'Kamerawand einrichten (auf Englisch)' }}
        visual={<ProductShot
            src="/product-live-streaming"
            alt="Ein Laptop mit dem Live-Streaming-Raster von Camzify: Kamerabilder aus dem Einzelhandel, ein Ausfallbanner für den Standort Parking Structure B und die Anzeige 23 live / 7 offline"
            label="Live-Streaming · Camzify-Konsole"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-12">
            <LiveStreamingMockup />
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">In der Praxis</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Was die Live-Kamerawand leistet</h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: LayoutGrid, title: 'Nach Standort gruppiert', desc: 'Die Kameras bleiben nach Standort geordnet, und die Zahl der Kameras online ist pro Standort jederzeit in der Leiste über dem Raster sichtbar.' },
              { icon: Gauge, title: 'Zwei Wiedergabemodi', desc: '„Low Latency“ für die aktive Beobachtung, „High Stability“ für ein ruhigeres Bild in einem stärker ausgelasteten Netzwerk.' },
              { icon: AlertOctagon, title: 'Eindeutige Signalausfälle', desc: 'Eine ausgefallene Kamera oder ein komplett offline gegangener Standort wird sofort als „kein Signal“ angezeigt, nie als eingefrorenes letztes Bild.' },
              { icon: Filter, title: 'Filter nach Funktion oder Benutzer', desc: 'Grenzen Sie das Raster auf Kameras ein, auf denen eine bestimmte KI-Funktion läuft, oder auf das, was ein bestimmtes Unterkonto sehen darf.' },
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
                <span className="font-mono text-mono-sm uppercase text-primary">Alles an einem Ort</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Teil jedes Rundgangs</h2>
                <p className="mt-4 text-muted-foreground">
                  Dieses Modul ist mit dem <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützten Wächterrundgang</Link> verbunden
                  und ergibt so ein vollständiges Lagebild. Rundgangsergebnisse, Erkennungsalarme und der Zustand
                  der Plattform laufen in derselben Konsole zusammen – um zu prüfen, ob eine Kamera tatsächlich online
                  ist, müssen Sie also nicht in ein anderes Werkzeug wechseln.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Der Diashow-Modus ist für eine Monitorwand oder einen Leitstand gedacht, der im Hintergrund
                  mitläuft: Intervall einstellen, und das Raster blättert die Seiten selbstständig durch, ganz ohne Klicken.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-mono-sm uppercase text-primary">Anbindungswege</span>
                <div className="mt-4 space-y-3">
                  {[
                    { proto: 'RTSP', desc: 'Die meisten IP-Kameras und NVRs' },
                    { proto: 'RTMP', desc: 'Encoder und Streaming-Geräte' },
                    { proto: 'HTTPS', desc: 'Über das Web ausgelieferte HLS- und WebRTC-Streams' },
                  ].map((p) => (
                    <div key={p.proto} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2.5">
                      <span className="font-mono text-mono-sm text-primary">{p.proto}</span>
                      <span className="text-xs text-muted-foreground">{p.desc}</span>
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
              <Link href="/de/ki-waechterrundgang" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">KI-gestützter Wächterrundgang</Link>
              <Link href="/de/preise" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Preise</Link>
              <Link href="/book-a-demo" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Demo anfragen</Link>
              <Link href="/use-cases/one-live-wall-for-every-brand-and-location" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Eine Live-Wand für alle Kameramarken und Standorte (auf Englisch)</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
