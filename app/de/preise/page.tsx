import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { PhotoFigure } from '@/components/content/photo-figure';
import Link from 'next/link';
import { ArrowRight, Camera, Cpu, HardDrive, Users, Building2, MessageSquare } from 'lucide-react';

/**
 * German counterpart of /pricing.
 *
 * Only the two public figures appear here, in US dollars. List rates live in
 * lib/pricing-estimates.ts and are never imported into a page.
 *
 * Two deliberate departures from the English page:
 *   - QuoteEstimator is an English lead form, so it is not embedded. In its place a
 *     German section explains what the quote needs and links to /pricing#quote.
 *   - SectionVisual always renders an English caption line, so the compliance
 *     illustration is rebuilt inline below with German labels.
 */
const pageMeta = {
  title: 'Preise: ab 5 US-Dollar pro Kamera und Monat',
  description: 'Camzify wird pro Instanz und Monat abgerechnet, ab 5 US-Dollar pro Kamera. Nennen Sie uns Ihre Konfiguration, das Angebot kommt binnen eines Werktags.',
  path: '/de/preise',
};

export const metadata = generatePageMeta(pageMeta);

const builtFrom = [
  { icon: Camera, title: 'Kamera-Stream-Instanzen', desc: 'Eine pro angebundener Kamera, ab 5 US-Dollar pro Kamera und Monat. Sie bindet die Kamera an, streamt sie live und macht sie für Aufzeichnung und Rundgänge verfügbar. Bewegungserkennung und Sabotageerkennung sind ohne Aufpreis enthalten.' },
  { icon: Cpu, title: 'KI-Detektions-Instanzen', desc: 'Eine pro KI-Funktion und Kamera: Zehn Kameras mit Linienüberschreitung sind zehn Instanzen Linienüberschreitung. Eine Instanz für den KI-gestützten Wächterrundgang nimmt eine Kamera in manuelle und automatische Rundgänge auf. Jede Funktionsart hat ihren eigenen Monatspreis; Verhaltensanomalien und Waffenerkennung liegen am oberen Ende der Spanne.' },
  { icon: HardDrive, title: 'Cloud-Speicher', desc: 'Abgerechnet pro Terabyte und Monat, als gemeinsames Kontingent für das Konto. Wie es verbraucht wird, entscheiden Sie: Die Aufbewahrungsdauer wird pro Kamera oder für einen ganzen Standort festgelegt, sodass eine Torkamera neunzig Tage vorhält und eine Flurkamera sieben.' },
  { icon: Users, title: 'Unterkonten und Kontingente', desc: 'Stream-Instanzen, Detektions-Instanzen und Speicher lassen sich aus dem Bestand des Kontos an Unterkonten zuweisen. Ein Partnerangebot wird für das gesamte Portfolio bemessen.' },
  { icon: Building2, title: 'Standorte', desc: 'Jeder Standort hat eigene Rundgangsabläufe, einen eigenen Zeitplan und eine eigene Zuordnung der Wachpersonen, alles in einem Konto. Mehr Standorte brauchen weder mehr Konten noch mehr Instanzen.' },
  { icon: MessageSquare, title: 'Was keine eigene Position ist', desc: 'Die Plattformmodule gehören zum Konto: Live-Streaming, Cloud-Sicherung, Benachrichtigungen, Auswertungen, Benutzerverwaltung und Berechtigungsgruppen. Ebenso Bewegungs- und Sabotageerkennung auf jeder angebundenen Kamera.' },
];

/** Eine Konfiguration, kein Preis: wofür ein Konto dieser Größe lizenziert ist. */
const example = [
  { count: '100', item: 'Kamera-Stream-Instanzen', note: 'eine pro angebundener Kamera, jede live gestreamt' },
  { count: '10', item: 'Instanzen Linienüberschreitung', note: 'auf den zehn Kameras am Perimeter' },
  { count: '30', item: 'Instanzen Verweilerkennung', note: 'auf den dreißig Kameras an Eingängen und Gängen' },
  { count: '5', item: 'Instanzen Waffenerkennung', note: 'auf den fünf Kameras in Foyer und Eingangsbereich' },
  { count: '30 TB', item: 'Cloud-Speicher', note: 'pro Terabyte und Monat, verbraucht nach der Aufbewahrungsdauer jeder Kamera' },
];

/** What the English quote form asks for, with its English field label for orientation. */
const quoteNeeds = [
  { what: 'Anzahl der Standorte', field: 'im Freitextfeld „Anything we should know“' },
  { what: 'Kameras, die angebunden werden sollen', field: '„Cameras to connect“' },
  { what: 'Kameras, die in Rundgänge aufgenommen werden', field: '„Cameras on patrol rounds“' },
  { what: 'KI-Funktionen und auf wie vielen Kameras jede laufen soll', field: '„Detection instances“, Verhaltensanomalien und Waffenerkennung gesondert unter „Behavioral anomaly or weapons instances“' },
  { what: 'Aufbewahrungsdauer der Aufnahmen', field: 'als Speicher in Terabyte unter „Cloud storage (TB)“; kennen Sie nur die gewünschte Dauer, nennen Sie diese im Freitextfeld' },
];

const faqs = [
  { question: 'Was kostet Camzify?', answer: 'Camzify beginnt bei 5 US-Dollar pro Kamera und Monat. Jede Kamera belegt eine Stream-Instanz, jede KI-Erkennung wird pro Funktion und Kamera lizenziert, und Cloud-Speicher wird pro Terabyte und Monat abgerechnet. Der genaue Betrag hängt also davon ab, wie viele Erkennungen auf jeder Kamera laufen und wie lange Aufnahmen aufbewahrt werden. Bewegungserkennung und Sabotageerkennung sind bei jeder Kamera enthalten. Die meisten Kameras liegen zwischen 20 und 90 US-Dollar pro Kamera und Monat, je nachdem, welche Erkennungen laufen und ob geplante Rundgänge aktiv sind; Cloud-Speicher wird gesondert pro Terabyte und Monat berechnet. Angebote werden pro Standort erstellt, und es muss keine Hardware gekauft werden.' },
  { question: 'Warum gibt es auf dieser Seite keine Preisliste?', answer: 'Weil das Angebot von der Laufzeit abhängt und davon, wie viel auf jeder Kamera läuft, und eine Liste für die meisten Standorte falsch wäre. Camzify beginnt bei 5 US-Dollar pro Kamera und Monat, und das Angebot ist die Summe der Instanzen, die ein Konto braucht: eine Stream-Instanz für jede Kamera, eine Detektions-Instanz für jede KI-Funktion auf einer Kamera, eine Rundgangs-Instanz für jede Kamera in Rundgängen und Speicher pro Terabyte. Stellen Sie die Konfiguration im Angebotsformular zusammen (derzeit auf Englisch), senden Sie die Anfrage ab, und das Angebot kommt innerhalb eines Werktags auf Ihren Standort abgestimmt zurück.' },
  { question: 'Gibt es Rabatte?', answer: 'Ja. Angebote fallen bei einer Jahreslaufzeit und bei Konten, die mehr Funktionen pro Kamera lizenzieren, niedriger aus, und ein Partnerportfolio wird als Ganzes angeboten. Erst dadurch sinkt eine Stream-Instanz auf die Untergrenze von 5 US-Dollar pro Kamera und Monat.' },
  { question: 'Welche Erkennungen sind kostenlos?', answer: 'Bewegungserkennung und Sabotageerkennung sind in jeder Stream-Instanz enthalten, sodass jede angebundene Kamera beide ohne Detektions-Instanz hat. Alles andere wird als Instanz pro Kamera lizenziert.' },
  { question: 'Wie funktioniert die Abrechnung pro Instanz?', answer: 'Jede angebundene Kamera belegt eine Stream-Instanz, die sie anbindet, live streamt und für Aufzeichnung und Rundgänge verfügbar macht. Jede KI-Funktion, die Sie auf einer Kamera aktivieren, belegt eine Detektions-Instanz dieser Funktion, eine Kamera mit zwei Erkennungen trägt also zwei, und jede Kamera in Rundgängen belegt eine Instanz für den KI-gestützten Wächterrundgang. Speicher wird pro Terabyte und Monat als gemeinsames Kontingent des Kontos verkauft, und Sie legen fest, wie jede Kamera oder jeder Standort darauf zugreift. Jede Instanzart hat ihren eigenen Monatspreis, und die Plattformmodule gehören zum Konto.' },
  { question: 'Was ist eine Instanz?', answer: 'Eine Einheit von etwas, das auf einer Kamera lizenziert ist: Eine Stream-Instanz ist eine angebundene Kamera, eine Instanz Linienüberschreitung ist die Linienüberschreitung auf einer Kamera. Die Planseite in der Konsole zeigt je Art, wie viele Instanzen der Plan umfasst, wie viele aktiviert sind, wie viele an Unterkonten vergeben sind und wie viele noch frei sind. Ein übergeordnetes Konto weist Unterkonten Instanzen aus diesem Kontingent zu.' },
  { question: 'Wie vergleiche ich das mit dem Einsatz von Wachpersonal?', answer: 'Nehmen Sie die Stunden pro Woche, die auf Routine-Kontrollgänge entfallen, mal den Stundensatz, mal die Zahl der Standorte. Das ist der Betrag, an dem sich ein Angebot messen lässt. Der ROI-Rechner (auf Englisch) berechnet ihn aus Ihren eigenen Zahlen und hat einen Modus für Sicherheitsdienste, die Fernkontrollgänge zu ihrem eigenen Preis anbieten wollen.' },
  { question: 'Muss ich Hardware kaufen?', answer: 'Nein. Camzify verkauft keine Hardware. Vor Ort wird höchstens ein PC gebraucht, auf dem der Camzify Connector läuft, für Kameras, die aus dem Internet nicht erreichbar sind.' },
  { question: 'Gibt es Mindestmengen oder Vertragslaufzeiten?', answer: 'Die Konditionen werden im Angebot vereinbart, nicht veröffentlicht. Nennen Sie uns Ihre Standorte und Kameras, und wir sagen Ihnen, was gilt.' },
];

/** German rebuild of SectionVisual's `compliance` variant; same tokens, same shape. */
function ComplianceIllustration() {
  const week: ('done' | 'flag' | 'over')[] = ['done', 'done', 'flag', 'done', 'done', 'over', 'done'];
  const days = ['M', 'D', 'M', 'D', 'F', 'S', 'S'];
  return (
    <figure role="img" aria-label="Eine Übersicht der Rundgänge einer Woche mit abgeschlossenen, markierten und überfälligen Rundgängen" className="console-panel corner-ticks w-full min-w-0 max-w-full overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
        </span>
        <span className="font-mono text-mono-sm uppercase text-muted-foreground">
          Wofür Sie pro Rundgang zahlen: die Prüfungen, die Bilder und der Nachweis. Das Angebot gilt pro Instanz, der Nutzen entsteht pro Rundgang.
        </span>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <span className="font-display text-base font-bold">Rundgänge diese Woche</span>
          <span className="font-mono text-mono-sm text-muted-foreground">Perimeter-Rundgang · 4 Standorte</span>
        </div>
        <div className="mt-4 flex items-end gap-2">
          {week.map((s, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <span className={`w-full rounded-md ${s === 'done' ? 'h-14 bg-live/70' : s === 'flag' ? 'h-14 bg-warn/70' : 'h-6 bg-critical/60'}`} />
              <span className="font-mono text-[10px] text-muted-foreground">{days[i]}</span>
            </div>
          ))}
        </div>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-mono-sm uppercase text-muted-foreground">
          <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-live/70" aria-hidden="true" /> Abgeschlossen</li>
          <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-warn/70" aria-hidden="true" /> Markiert</li>
          <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-critical/60" aria-hidden="true" /> Überfällig</li>
        </ul>
      </div>
      <figcaption className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
        Illustration der Oberfläche mit Beispieldaten, keine Kundendaten.
      </figcaption>
    </figure>
  );
}

export default function DePreisePage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Preise' }]}>
      <FeatureHero
        eyebrow="Preise"
        title="Sie zahlen pro Instanz und Monat – für das, was Sie aktivieren"
        lede={
          <>
            <strong className="font-semibold text-foreground">
              Camzify wird pro Instanz und Monat abgerechnet und pro Standort angeboten, ab 5 US-Dollar pro Kamera und Monat.
            </strong>{' '}
            Eine Stream-Instanz für jede Kamera, eine Detektions-Instanz für jede KI-Funktion darauf,
            eine Rundgangs-Instanz für jede Kamera in Rundgängen und Cloud-Speicher pro Terabyte.
            Die Plattform gehört zum Konto, und bei einer Jahreslaufzeit oder mehr Funktionen pro
            Kamera fällt das Angebot niedriger aus.
          </>
        }
        facts={['Ab 5 US-Dollar pro Kamera und Monat', 'Bewegungs- und Sabotageerkennung inklusive', 'Angebot innerhalb eines Werktags']}
        primary={{ href: '#angebot', label: 'Angebot anfordern' }}
        secondary={{ href: '/roi-calculator', label: 'Erst selbst rechnen (ROI-Rechner, Englisch)' }}
        visual={
          <>
            <PhotoFigure src="/product-pricing-plan-light.webp" alt="Der Bildschirm „Plan and Usage“ auf einem Laptop, mit einer geöffneten Anfrage für zusätzliche Stream-Instanzen" priority className="dark:hidden" />
            <PhotoFigure src="/product-pricing-plan-dark.webp" alt="Der Bildschirm „Plan and Usage“ auf einem Laptop, mit einer geöffneten Anfrage für zusätzliche Stream-Instanzen" className="hidden dark:block" />
          </>
        }
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div>
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Woraus sich ein Angebot zusammensetzt</span>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Sechs Posten, die Sie selbst zählen können</h2>
            </ScrollReveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {builtFrom.map((b, i) => (
                <ScrollReveal key={b.title} delay={i * 0.05}>
                  <div className="h-full rounded-xl border border-border bg-card p-6">
                    <b.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-base font-bold">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Der Vergleich, der zählt</span>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Mit Wachpersonal vergleichen, nicht mit Software</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Der Maßstab für den KI-gestützten Wächterrundgang ist keine andere Plattform,
                sondern die Stunden, die eine Person mit Routine-Kontrollgängen verbringt: Stunden
                pro Woche mal Stundensatz mal Standorte. Diese Zahl kennen nur Sie, sie hängt von
                Markt und Vertrag ab, und wir schätzen sie nicht für Sie. Der{' '}
                <Link href="/roi-calculator" className="text-primary hover:underline">ROI-Rechner</Link>{' '}
                (auf Englisch) berechnet sie aus Ihren eigenen Zahlen, und der{' '}
                <Link href="/guides/security-guard-cost-per-hour" className="text-primary hover:underline">Leitfaden zu den Kosten von Wachpersonal</Link>{' '}
                (auf Englisch) erklärt, warum ein dauerhaft besetzter Posten mehrere Personen
                erfordert, nicht eine.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Ein Rundgang ersetzt den routinemäßigen Kontrollgang, nicht das Eingreifen. Der{' '}
                <Link href="/de/ki-waechterrundgang/vergleich-wachpersonal" className="text-primary hover:underline">Vergleich mit Wachpersonal</Link>{' '}
                zeigt, wo weiterhin eine Person gebraucht wird, und die{' '}
                <Link href="/de/fuer-sicherheitsdienste" className="text-primary hover:underline">Seite für Sicherheitsdienste</Link>{' '}
                erklärt, warum das für einen Sicherheitsdienst zusätzlicher Umsatz ist und keine
                Kosten, die es zu senken gilt.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <ComplianceIllustration />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">So funktioniert die Lizenzierung pro Instanz</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Alles im Konto ist eine Instanz einer bestimmten Art. Eine Stream-Instanz ist eine
                angebundene Kamera: Sie wird live gestreamt, kann aufgezeichnet werden und kann ein
                Kontrollpunkt in einem Rundgang sein. Eine Detektions-Instanz ist eine KI-Funktion
                auf einer Kamera; eine Kamera mit Linienüberschreitung und Verweilerkennung trägt
                also je eine Instanz von beiden. Cloud-Speicher ist ein eigenes Kontingent, pro
                Terabyte und Monat abgerechnet, aus dem die Aufbewahrung jeder Kamera schöpft. Wie
                es verbraucht wird, bestimmen allein Sie: die Aufbewahrungsdauer pro Kamera in Tagen
                oder als Speichergrenze, oder eine Einstellung für einen ganzen Standort, mit
                längerer Aufbewahrung für die wichtigen Kameras und kürzerer für die übrigen. Die
                Planseite in der Konsole zeigt je Art, wie viele Instanzen der Plan umfasst, wie
                viele Sie aktiviert haben, wie viele an Unterkonten vergeben sind und wie viele noch
                frei sind. Bei einem Konto mit mehreren Standorten oder einem Partnerkonto weist das
                übergeordnete Konto Unterkonten Instanzen aus diesem Kontingent zu und kann sie
                zurückholen. Die Seite zur{' '}
                <Link href="/platform/license-and-instance-management" className="text-primary hover:underline">Lizenz- und Instanzverwaltung</Link>{' '}
                (auf Englisch) zeigt den Bildschirm dazu.
              </p>
              <div className="mt-8 rounded-xl border border-border bg-card p-6">
                <p className="font-mono text-mono-sm uppercase text-primary">Beispielkonfiguration</p>
                <p className="mt-2 max-w-prose text-sm text-muted-foreground">
                  Ein Standort mit 100 Kameras, der Linienüberschreitung auf zehn davon,
                  Verweilerkennung auf dreißig, Waffenerkennung auf fünf und 30 TB Speicher haben
                  möchte, wird genau dafür lizenziert und monatlich abgerechnet:
                </p>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  {example.map((e) => (
                    <div key={e.item} className="flex gap-3 rounded-lg border border-border bg-background px-4 py-3">
                      <dt className="font-display text-lg font-bold text-foreground">{e.count}</dt>
                      <dd className="text-sm">
                        <span className="block font-medium text-foreground">{e.item}</span>
                        <span className="block text-muted-foreground">{e.note}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 max-w-prose text-sm text-muted-foreground">
                  Die übrigen 70 Kameras haben keine Erkennung und kosten nur ihre Stream-Instanz.
                  Erhält eine Kamera später eine Erkennung, belegt sie ab diesem Monat eine Instanz
                  mehr. Die 30 TB werden so verbraucht, wie das Konto es festlegt: neunzig Tage an
                  den Toren, sieben in den Fluren, eine Speichergrenze an einer stark frequentierten
                  Laderampe. Mit Ihren eigenen Zahlen im Angebotsformular wird eine solche
                  Konfiguration für Ihren Standort bepreist.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div id="angebot" className="mt-16 scroll-mt-28">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Angebot anfordern</span>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Ihre Zahlen, dann das Angebot</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Das Angebotsformular gibt es derzeit nur auf Englisch. Halten Sie dafür diese
                Angaben bereit; in Klammern steht jeweils, wo sie im Formular hingehören:
              </p>
              <ul className="mt-6 max-w-prose space-y-3">
                {quoteNeeds.map((q) => (
                  <li key={q.what} className="rounded-lg border border-border bg-card px-4 py-3 text-sm">
                    <span className="block font-medium text-foreground">{q.what}</span>
                    <span className="block text-muted-foreground">({q.field})</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-prose text-muted-foreground">
                Nach dem Absenden kommt das Angebot innerhalb eines Werktags zurück, genau für diese
                Konfiguration, auf Ihren Standort abgestimmt und mit einem etwaigen Rabatt für
                Jahreslaufzeit oder Volumen bereits eingerechnet.
              </p>
              <div className="mt-8">
                <Link
                  href="/pricing#quote"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-fast hover:bg-primary/90 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Zum Angebotsformular (auf Englisch) <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <FaqSection items={faqs} locale="de" inline heading="Fragen zu den Preisen" />
        </div>
      </section>
    </PageShell>
  );
}
