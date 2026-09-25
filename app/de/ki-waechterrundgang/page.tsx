import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { InteractiveChecklistDemo } from '@/components/motion/interactive-checklist-demo';
import { DemoFrame } from '@/components/motion/demo-frame';
import { ComparisonTable } from '@/components/content/comparison-table';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { SectionAtmosphere } from '@/components/motion/section-atmosphere';
import { FeatureHero } from '@/components/content/feature-hero';
import { SiteImage } from '@/components/content/site-image';
import { ProductShot } from '@/components/content/product-shot';
import Link from 'next/link';
import {
  Camera, ClipboardCheck, Bell, FileText, Route, CheckCircle, BarChart3, Users, Calendar, ShieldAlert,
} from 'lucide-react';

/**
 * German counterpart of /virtual-patrolling, and the hub for the eight German
 * sub-pages under /de/ki-waechterrundgang. Mirrors the English page's sections.
 *
 * Left out on purpose: the English comparison table's "cost per site per month" row,
 * which carries guard-tour dollar estimates. German pages show only the two public
 * Camzify figures, so the row and the sentence introducing those estimates are omitted.
 */
const pageMeta = {
  title: 'KI-gestützter Wächterrundgang auf Ihren Kameras',
  description: 'Geplante KI-Rundgänge auf Ihren Kameras: Checkliste an jedem Kontrollpunkt, Meldung an die Wachperson bei Abweichung, Kontrollprotokoll mit Bildnachweis.',
  path: '/de/ki-waechterrundgang',
};

export const metadata = generatePageMeta(pageMeta);

const comparisonRows = [
  { feature: 'Abdeckung rund um die Uhr ohne Schichtwechsel', camzify: true, competitor: false, traditional: false },
  { feature: 'Checkliste pro Kamera', camzify: true, competitor: false, traditional: false },
  { feature: 'Zuständige Wachperson je Kontrollpunkt', camzify: true, competitor: true, traditional: false },
  { feature: 'Protokoll mit dem Bild zu jeder Prüfung', camzify: true, competitor: false, traditional: false },
  { feature: 'Nachweis mit Zeitstempel', camzify: true, competitor: 'Teilweise', traditional: false },
  { feature: 'Erfüllungsquote in Prozent', camzify: true, competitor: false, traditional: false },
  { feature: 'Risiken über die Checkliste hinaus gemeldet', camzify: true, competitor: false, traditional: false },
  { feature: 'Skaliert über mehrere Standorte', camzify: true, competitor: false, traditional: 'Teilweise' },
  { feature: 'Keine Ermüdung, keine menschlichen Fehler', camzify: true, competitor: false, traditional: true },
];

const faqs = [
  { question: 'Was ist ein KI-gestützter Wächterrundgang?', answer: 'Ein KI-gestützter Wächterrundgang führt geplante Kontrollgänge über Ihre vorhandenen Kameras aus, bewertet von KI statt von einer Person vor Ort. Das System folgt einem festgelegten Kameraablauf, prüft an jeder Kamera eine eigene Checkliste, markiert Abweichungen, benachrichtigt die zuständige Wachperson und erstellt ein Kontrollprotokoll mit Zeitstempel und dem Bild zu jedem Ergebnis, ohne dass ein Mitarbeiter die Route abläuft.' },
  { question: 'Worin unterscheidet sich das von einem Wächterkontrollsystem?', answer: 'Ein klassisches Wächterkontrollsystem belegt, dass eine Wachperson einen Kontrollpunkt aufgesucht hat, meist über NFC-Tags oder QR-Codes, und sagt nichts darüber, was dort vorzufinden war. Der KI-gestützte Wächterrundgang prüft an jeder Kamera einen festgelegten Zustand und speichert das Bild, anhand dessen bewertet wurde. Der Nachweis zeigt also, dass das Tor tatsächlich geschlossen war, nicht nur, dass jemand daneben stand.' },
  { question: 'Ersetzt der KI-gestützte Wächterrundgang Wachpersonal?', answer: 'Er ersetzt den routinemäßigen Kontrollgang, also das wiederkehrende Ablaufen und Prüfen, das den größten Teil einer Schicht ausmacht. Für das Eingreifen vor Ort wird weiterhin Personal gebraucht. Sicherheitsdienste bieten den KI-gestützten Wächterrundgang deshalb zusätzlich zu ihrem Wachpersonal an, als nächtliche Abdeckung aller Kundenstandorte, nicht als Ersatz dafür.' },
  { question: 'Was passiert, wenn ein Punkt der Checkliste nicht erfüllt ist?', answer: 'Der Punkt wird als nicht konform markiert, und das Bild wird gespeichert. Bei einem automatischen Rundgang wird die für diese Kamera zuständige Wachperson sofort mit einer vorab festgelegten Nachricht benachrichtigt; bei einem manuellen Rundgang wird dem Bediener diese Nachricht angeboten. Danach muss der Punkt geklärt werden, bevor der Rundgang abgeschlossen werden kann: behoben und erneut geprüft, wobei ein zweites Bild aufgenommen wird, oder mit schriftlicher Begründung als ausstehend geführt, was die Erfüllungsquote senkt.' },
  { question: 'Können Rundgänge automatisch laufen?', answer: 'Ja. Auto-Patrol läuft nach einem festgelegten Zeitplan: Sie bestimmen Häufigkeit, aktive Stunden und aktive Tage in der Zeitzone des Standorts. Das System geht jede Kamera des Ablaufs durch, bewertet jeden Punkt der Checkliste anhand eines Einzelbilds oder eines kurzen Ausschnitts des Livebilds, benachrichtigt bei Abweichungen die Wachpersonen und legt das Kontrollprotokoll ab, ohne dass ein Bediener anwesend ist.' },
  { question: 'Was steht im Kontrollprotokoll?', answer: 'Jede geprüfte Kamera, jeder Punkt der Checkliste mit seinem Ergebnis, das Bild, anhand dessen der Punkt bewertet wurde, Vorher- und Nachher-Bild bei allem, was während des Rundgangs behoben wurde, die schriftliche Begründung bei allem, was aussteht, die bei einer Abweichung benachrichtigte Wachperson und eine Erfüllungsquote für den gesamten Rundgang. Protokolle lassen sich als Webbericht oder als PDF öffnen. Die Bilder machen das Protokoll zum Nachweis: Wer es Monate später prüft, sieht, was die Kamera gezeigt hat, statt sich auf das Ergebnis verlassen zu müssen.' },
  { question: 'Prüft der Rundgang nur, was auf der Checkliste steht?', answer: 'Ein manueller Rundgang schon, denn der Bediener beantwortet die Punkte, die ihm vorliegen. Ein automatischer Rundgang bewertet jede Kamera zusätzlich eigenständig auf Sicherheits- und Gefahrenrisiken und löst für alles, was er findet, eine kritische Benachrichtigung aus, auch wenn kein Punkt danach gefragt hat. Eine Checkliste kann nur abfragen, woran jemand beim Schreiben gedacht hat, und der Zustand, der zu einem Vorfall führt, steht oft nicht darauf.' },
  { question: 'Welche Kameras funktionieren mit dem KI-gestützten Wächterrundgang?', answer: 'Jede IP-Kamera, die ONVIF oder RTSP unterstützt, und das sind praktisch alle IP-Kameras der letzten zehn Jahre, dazu RTMP- und HTTPS-Streams (HLS oder WebRTC). Kameras werden über eine von drei Verbindungsarten hinzugefügt, die Streamqualität wird beim Verbinden automatisch erkannt, und proprietäre Hardware ist nicht erforderlich.' },
];

const anatomy = [
  { icon: Route, title: 'Rundgangsablauf', desc: 'Eine geordnete Liste von Kameras, die die Route des Rundgangs über den Standort festlegt.', href: '/virtual-patrolling/patrol-sequences', en: true },
  { icon: Camera, title: 'Kontrollpunkt', desc: 'An jeder Kamera des Ablaufs hält das System an und prüft die Checkliste dieser Kamera.', href: '/de/ki-waechterrundgang/so-funktioniert-es' },
  { icon: ClipboardCheck, title: 'Prüfung der Checkliste', desc: 'Jeder Punkt wird als konform oder nicht konform bewertet: Tor geschlossen, Bereich frei, Zugang gesichert.', href: '/de/ki-waechterrundgang/checklisten' },
  { icon: Bell, title: 'Benachrichtigung', desc: 'Ein nicht erfüllter Punkt benachrichtigt die für diese Kamera zuständige Wachperson, mit einer eigens für diesen Punkt hinterlegten Nachricht.', href: '/de/ki-waechterrundgang/benachrichtigungen' },
  { icon: ShieldAlert, title: 'Risikoerkennung', desc: 'Automatische Rundgänge melden zusätzlich Sicherheits- und Gefahrenrisiken im Bild, auch wenn kein Punkt danach fragt.', href: '/de/ki-waechterrundgang/risikoerkennung' },
  { icon: FileText, title: 'Kontrollprotokoll', desc: 'Jede Kamera, jeder Punkt, jedes Ergebnis, mit dem Bild zu jeder Prüfung.', href: '/de/ki-waechterrundgang/kontrollprotokolle' },
  { icon: BarChart3, title: 'Digitales Wachbuch', desc: 'Jeder Rundgang wird als abgeschlossen, markiert oder überfällig erfasst, mit seiner Erfüllungsquote.', href: '/de/ki-waechterrundgang/digitales-wachbuch' },
  { icon: Calendar, title: 'Zeitplan', desc: 'Häufigkeit, aktive Stunden und aktive Tage, in der Zeitzone des Standorts.', href: '/de/ki-waechterrundgang/automatische-planung' },
];

export default function DeKiWaechterrundgangPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'KI-gestützter Wächterrundgang' }]}>
      <FeatureHero
        eyebrow="Kernfunktion"
        title="KI-gestützter Wächterrundgang"
        lede={
          <>
            <strong className="font-semibold text-foreground">
              Ein KI-gestützter Wächterrundgang führt geplante Kontrollgänge über die Kameras aus,
              die an einem Standort bereits installiert sind
            </strong>{' '}
            – entlang einer festgelegten Route, mit einer eigenen Checkliste an jedem
            Kontrollpunkt, einer Benachrichtigung an die zuständige Wachperson, wenn etwas nicht
            stimmt, und einem Kontrollprotokoll mit Zeitstempel und dem Bild zu jedem Ergebnis.
            Häufig ist auch vom virtuellen Wächterrundgang die Rede. Er liefert denselben Nachweis
            wie ein Kontrollgang vor Ort, ohne dass jemand ihn abläuft, und um 03:00 Uhr genauso
            wie um 15:00 Uhr.
          </>
        }
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/ki-waechterrundgang/so-funktioniert-es', label: 'So funktioniert es' }}
        facts={['Manuell oder automatisch', 'Bildnachweis bei jeder Prüfung', 'Auf vorhandenen Kameras']}
        visual={
          <div className="overflow-hidden rounded-xl">
            <SiteImage
              src="/vp-overview-main.png"
              alt="Der Bildschirm für den KI-gestützten Wächterrundgang in Camzify mit einem laufenden Rundgang und seinem Kameraablauf"
              className="w-full"
              width={1000}
              height={563}
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        }
      />

      {/* Interaktive Demo */}
      <section className="relative overflow-hidden border-t border-border bg-muted/20 py-20 sm:py-24">
        <SectionAtmosphere variant="right" />
        <div className="relative z-10 mx-auto max-w-site px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Selbst ausprobieren</span>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  Ein Rundgang in 20 Sekunden
                </h2>
                <p className="mt-5 max-w-prose text-body leading-relaxed text-muted-foreground">
                  Gehen Sie drei Kameras durch und bewerten Sie jeden Punkt. Ist einer nicht
                  erfüllt, werden Sie gefragt, ob die Wachperson benachrichtigt werden soll – und
                  der Rundgang geht erst weiter, wenn der Punkt behoben und erneut geprüft oder mit
                  Begründung als ausstehend geführt ist. Diese eine Regel ist das ganze Produkt im
                  Kleinen.
                </p>
                <p className="mt-4 max-w-prose text-sm text-muted-foreground">
                  Die Demo ist, wie die Konsole, auf Englisch.
                </p>
                <Link
                  href="/guides/how-to-run-a-virtual-patrol-round"
                  className="mt-8 inline-flex items-center gap-2 rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Zur vollständigen Anleitung (auf Englisch) <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <DemoFrame>
                <InteractiveChecklistDemo />
              </DemoFrame>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Aufbau eines Rundgangs */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Aufbau eines Rundgangs</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Acht Bausteine, bei jedem Rundgang, in dieser Reihenfolge
              </h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                Ob von einem Bediener oder vom Zeitplan gestartet: Ein Rundgang besteht immer aus
                denselben Bausteinen. Jeder hat eine eigene Seite.
              </p>
            </div>
          </ScrollReveal>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {anatomy.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.href} delay={i * 0.05}>
                  <li className="h-full">
                    <Link
                      href={item.href}
                      className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded-lg bg-primary/10 p-2"><Icon className="h-4 w-4 text-primary" aria-hidden="true" /></span>
                        <span className="font-mono text-mono-sm text-muted-foreground tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="mt-4 font-display text-base font-bold transition-colors group-hover:text-primary">{item.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                      <span className="mt-3 text-sm font-semibold text-primary opacity-0 transition-opacity duration-normal group-hover:opacity-100">
                        {item.en ? 'Mehr erfahren (auf Englisch)' : 'Mehr erfahren'} <span aria-hidden="true">&rarr;</span>
                      </span>
                    </Link>
                  </li>
                </ScrollReveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Manuell oder Auto-Patrol */}
      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Zwei Betriebsarten</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Manueller Rundgang oder Auto-Patrol</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                Derselbe Ablauf, dieselben Checklisten, dasselbe Kontrollprotokoll. Der Unterschied liegt darin, wer jede Bewertung trifft und wann der Rundgang stattfindet.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <ScrollReveal>
              <div className="h-full rounded-xl border border-border bg-card p-8">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold">Manueller Rundgang</h3>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Ein Bediener geht von Kamera zu Kamera und beantwortet jeden Punkt der Checkliste
                  anhand des Livebilds. Bei einem nicht erfüllten Punkt wird die Nachricht an die
                  Wachperson angeboten, und der Punkt muss geklärt sein, bevor der Rundgang enden
                  kann. Geeignet für spontane Kontrollen und um die Reaktion auf einen Vorfall zu
                  überprüfen.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {['Der Bediener bewertet jeden Kontrollpunkt in Echtzeit', 'Kein Punkt darf übersprungen oder offen gelassen werden', 'Nachricht an die Wachperson bei jeder Abweichung angeboten'].map((t) => (
                    <li key={t} className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-live" aria-hidden="true" /> {t}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="h-full rounded-xl border border-primary/30 bg-card p-8 shadow-lg shadow-primary/5">
                <div className="flex flex-wrap items-center gap-3">
                  <Calendar className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold">Auto-Patrol</h3>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-mono-sm uppercase text-primary">Empfohlen</span>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Geplante Rundgänge nach Häufigkeit, aktiven Stunden und aktiven Tagen, ohne
                  Bediener. Die KI bewertet jeden Kontrollpunkt anhand eines Einzelbilds oder
                  weniger Sekunden Video, hält ihre Begründung fest, meldet Risiken über die
                  Checkliste hinaus, benachrichtigt die Wachpersonen selbstständig und legt das
                  Kontrollprotokoll ab.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {['Läuft nach Zeitplan, auch wenn niemand im Dienst ist', 'Szenenbeobachtung für Kontrollpunkte, die Kontext brauchen', 'Sicherheits- und Gefahrenrisiken an jedem Kontrollpunkt bewertet'].map((t) => (
                    <li key={t} className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-live" aria-hidden="true" /> {t}</li>
                  ))}
                </ul>
                <Link href="/de/ki-waechterrundgang/automatische-planung" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  So funktioniert die Planung <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Der Nachweis */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Der Nachweis</span>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Belegt statt versprochen</h2>
                <p className="mt-5 max-w-prose text-body text-muted-foreground">
                  Versicherer, Prüfer und Auftraggeber wollen belegt sehen, dass Rundgänge
                  stattgefunden haben, dass jeder Kontrollpunkt geprüft wurde und dass auf
                  Abweichungen reagiert wurde. Jeder Rundgang legt ein{' '}
                  <Link href="/de/ki-waechterrundgang/kontrollprotokolle" className="text-primary hover:underline">Kontrollprotokoll</Link>{' '}
                  ab, mit dem Bild zu jeder Prüfung und beiden Bildern bei allem, was behoben wurde.
                </p>
                <p className="mt-4 max-w-prose text-body text-muted-foreground">
                  Das Rundgangsprotokoll führt jeden Rundgang als abgeschlossen, markiert oder
                  überfällig, mit seiner Erfüllungsquote, und das{' '}
                  <Link href="/de/ki-waechterrundgang/digitales-wachbuch" className="text-primary hover:underline">digitale Wachbuch</Link>{' '}
                  fasst das pro Standort zusammen, sodass eine einzige Zahl zeigt, ob die Abdeckung
                  hält.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <ProductShot
                src="/product-virtual-patrolling"
                alt="Der Bildschirm für den Wächterrundgang in der Konsole: Rundgangsabläufe, der nächste Rundgang für jeden Ablauf und die Einstellungen für Auto-Patrol"
                label="Virtual patrolling"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vergleich */}
      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Im Vergleich</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Gegenüber Kontrollgängen vor Ort und klassischer Videoüberwachung</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                Camzify wird pro Instanz angeboten; wie sich ein Angebot zusammensetzt, steht auf
                der Seite{' '}
                <Link href="/de/preise" className="text-primary hover:underline">Preise</Link>.
                Wo Wachpersonal weiterhin gebraucht wird, zeigt der{' '}
                <Link href="/de/ki-waechterrundgang/vergleich-wachpersonal" className="text-primary hover:underline">Vergleich mit Wachpersonal</Link>.
                Wenn Ihnen der Begriff{' '}
                <Link href="/de/virtueller-waechterrundgang" className="text-primary hover:underline">virtueller Wächterrundgang</Link>{' '}
                geläufiger ist: Auf dieser Seite ist er erklärt.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-10">
            <ComparisonTable
              rows={comparisonRows}
              columns={['Merkmal', 'Camzify KI-Wächterrundgang', 'Rundgänge mit Wachpersonal', 'Klassische Videoüberwachung']}
            />
          </div>
        </div>
      </section>

      {/* Einsatzbereiche */}
      <section className="py-16">
        <div className="mx-auto max-w-site px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Branchen mit KI-gestütztem Wächterrundgang</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  ['Lager und Logistik', '/de/branchen/lager-und-logistik'], ['Einzelhandel (EN)', '/industries/retail'], ['Industrie und Produktion', '/de/branchen/industrie-und-produktion'],
                  ['Baustellen', '/de/branchen/baustellen'], ['Gesundheitswesen (EN)', '/industries/healthcare'], ['Immobilienverwaltung (EN)', '/industries/property-management'],
                  ['Sicherheitsdienste', '/de/fuer-sicherheitsdienste'],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="rounded-lg border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/30 hover:text-primary">{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Passende Anwendungsfälle (EN)</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  ['Nachweis von Kontrollgängen', '/use-cases/guard-tour-verification'], ['Überwachung außerhalb der Geschäftszeiten', '/use-cases/after-hours-monitoring'],
                  ['Perimeterschutz', '/use-cases/perimeter-security'], ['Überwachung entfernter Standorte', '/use-cases/remote-site-monitoring'],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="rounded-lg border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/30 hover:text-primary">{label}</Link>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Mit (EN) gekennzeichnete Seiten gibt es nur auf Englisch.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <FaqSection items={faqs} locale="de" inline className="!mt-0" eyebrow="Häufige Fragen" heading="Der KI-gestützte Wächterrundgang im Überblick" />
        </div>
      </section>
    </PageShell>
  );
}
