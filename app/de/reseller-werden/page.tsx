import type { ReactNode } from 'react';
import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PhotoFigure } from '@/components/content/photo-figure';
import { FeatureHero } from '@/components/content/feature-hero';
import { ProductShot } from '@/components/content/product-shot';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';
import { Camera, Route, FileCheck2, ShieldCheck, Users, BookOpen, MessageSquare } from 'lucide-react';

/**
 * German counterpart of /partners/become-a-reseller (pair in lib/i18n.ts).
 *
 * The English page uses SectionVisual (variants `route` and `sites`). Every
 * SectionVisual variant renders English prose with no prop to override it, so
 * docs/I18N.md says not to use it here; the German equivalents are inlined below with
 * the same markup and classes. The ProductShot stays: it is a console screenshot, and
 * the console is English-only.
 */
const pageMeta = {
  title: 'Reseller werden | KI-Wächterrundgang verkaufen',
  description: 'Verkaufen Sie ein KI-gestütztes Cloud-VMS mit Wächterrundgang weiter: keine Hardware auf Lager, Preise auf Angebot, eine Seite für jede Aussage.',
  path: '/de/reseller-werden',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  {
    question: 'Was genau würden wir verkaufen?',
    answer: 'Ein Cloud-Videomanagementsystem, das auf den Kameras läuft, die ein Kunde bereits besitzt: Live-Streaming, Cloud-Aufzeichnung mit Aufbewahrungsdauer, 23 KI-Erkennungen, Alarme und den KI-gestützten Wächterrundgang, also geplante Rundgänge mit einer Checkliste je Kamera, einer Benachrichtigung der Wachperson bei einem Fehler und einem Kontrollprotokoll pro Runde. Es ist reine Software. Es gibt keine Hardware, die gelagert, versendet oder betreut werden muss.',
  },
  {
    question: 'Wie sind die Preise, und gibt es eine veröffentlichte Marge?',
    answer: 'Die Preise werden auf Angebotsbasis erstellt, und Margen veröffentlichen wir nicht. Reseller-Konditionen werden im Gespräch vereinbart; das sagen wir lieber offen, als einen Prozentsatz zu drucken, der nicht für jeden Fall gilt. Sagen können wir: KI-Funktionen werden je Kamera-Instanz lizenziert, und die Plattformmodule gehören zum Konto. So entsteht ein Angebot.',
  },
  {
    question: 'Wem gehört die Kundenbeziehung?',
    answer: 'Ihnen. Das Konto des Kunden kann als Unterkonto unter Ihrem angelegt werden, sodass Sie die kaufmännische Beziehung behalten und der Kunde einen eigenen, abgegrenzten Zugang erhält; oder der Kunde hält sein eigenes Konto direkt. Was passt, klären wir im Gespräch, nicht per Regel.',
  },
  {
    question: 'Worauf können wir einen Interessenten verweisen?',
    answer: 'Alles auf dieser Website ist so geschrieben, dass man es zitieren kann: eine Seite je Plattformmodul, eine Seite je Erkennung, Leitfäden, die Schritt für Schritt durch die Konsole führen, Vergleiche, die sagen, wo Wachpersonal weiterhin die bessere Wahl ist, und eine Trust-Seite, die auflistet, was wir nicht behaupten. Leitfäden, Vergleiche und die Trust-Seite gibt es bisher nur auf Englisch. Stellt ein Interessent eine Frage, die die Website nicht beantwortet, sollten wir sie beantworten, und wir würden sie gern hören.',
  },
  {
    question: 'Für welche Kunden passt es?',
    answer: 'Für Standorte, an denen bereits Kameras installiert sind und es Stunden gibt, in denen niemand hinsieht. Lager, Baustellen, Einzelhandelsflächen, Produktionswerke, Immobilienbestände, Self-Storage und abgelegene Anlagen sind die typischen Fälle, und Sicherheitsdienste und Leitstellen, die viele Kundenstandorte betreuen, passen ebenfalls.',
  },
  {
    question: 'Gibt es eine Demo, die wir einem Interessenten zeigen können?',
    answer: 'Fragen Sie eine Demo an (das Formular ist auf Englisch), dann führen wir mit Ihnen einen Live-Rundgang auf echten Kameras durch, und auf Wunsch noch einmal mit Ihrem Interessenten. Die interaktive Vorführung auf der Seite zum KI-gestützten Wächterrundgang zeigt den manuellen Rundgang von Anfang bis Ende, einschließlich der Nachricht an die Wachperson und des Vorher-nachher-Protokolls, ohne Login.',
  },
  { question: 'Ist das ein Händlerprogramm?', answer: 'Es ist dasselbe unter einem schlichteren Namen: Ein Reseller oder Händler verkauft Camzify auf den Kameras, die seine Kunden bereits besitzen, mit einem Zugang je Kunde, Preisen auf Angebotsbasis für den gesamten Bestand und ohne Hardware auf Lager. Die Konditionen werden im Gespräch vereinbart, statt als Programmstufe veröffentlicht zu werden.' },
];

/* German stand-ins for the English page's SectionVisual variants (see the note above). */

function Illustration({ caption, alt, children }: { caption: string; alt: string; children: ReactNode }) {
  return (
    <figure role="img" aria-label={alt} className="console-panel corner-ticks w-full min-w-0 max-w-full overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
        </span>
        <span className="font-mono text-mono-sm uppercase text-muted-foreground">{caption}</span>
      </div>
      <div className="p-5">{children}</div>
      <figcaption className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
        Oberflächenillustration mit Beispieldaten, keine Kundendaten.
      </figcaption>
    </figure>
  );
}

const stops = [
  { id: 'CAM 01', loc: 'Haupttor', frame: '/hero-cam-main-gate-640.webp', items: 2 },
  { id: 'CAM 04', loc: 'Laderampe', frame: '/hero-cam-loading-dock-640.webp', items: 2 },
  { id: 'CAM 09', loc: 'Serverraum', frame: '/hero-cam-server-room-640.webp', items: 2 },
  { id: 'CAM 02', loc: 'Parkplatz A', frame: '/hero-cam-parking-lot-640.webp', items: 1 },
];

function RouteBody() {
  return (
    <ol className="relative space-y-3">
      <span aria-hidden="true" className="absolute left-[19px] top-4 bottom-4 w-px bg-border" />
      {stops.map((s, i) => (
        <li key={s.id} className="relative flex min-w-0 items-center gap-3 sm:gap-4">
          <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-card font-mono text-sm text-primary tabular-nums">
            {String(i + 1).padStart(2, '0')}
          </span>
          <img src={s.frame} alt={`Kamera ${s.loc}`} aria-hidden="true" width={96} height={54} loading="lazy" className="h-9 w-16 shrink-0 rounded-md border border-border object-cover sm:h-12 sm:w-[84px]" />
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-mono-sm uppercase text-muted-foreground">{s.id}</span>
            <span className="block truncate text-sm font-medium">{s.loc}</span>
          </span>
          <span className="shrink-0 font-mono text-mono-sm text-muted-foreground">{s.items}<span className="hidden sm:inline"> {s.items === 1 ? 'Prüfung' : 'Prüfungen'}</span></span>
        </li>
      ))}
    </ol>
  );
}

function SitesBody() {
  const rows = [
    ['Lager – Sektor 4', '5/5', 'live'],
    ['Firmenzentrale', '4/4', 'live'],
    ['Filiale – Innenstadt', '3/4', 'warn'],
    ['Distribution – Nord', '2/2', 'live'],
  ] as const;
  return (
    <ul className="space-y-2">
      {rows.map(([name, cams, tone]) => (
        <li key={name} className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3.5 py-2.5 text-sm">
          <span className="flex items-center gap-2.5">
            <span aria-hidden="true" className={`h-2 w-2 rounded-full ${tone === 'live' ? 'bg-live' : 'bg-warn'}`} />
            {name}
          </span>
          <span className="font-mono text-mono-sm text-muted-foreground">{cams} Kameras online</span>
        </li>
      ))}
      <li className="pt-1 text-xs text-muted-foreground">Jeder Standort hat eigene Rundgangsabläufe, einen eigenen Zeitplan und einen eigenen Dienstplan für das Wachpersonal, alles in einem Konto.</li>
    </ul>
  );
}

export default function DeResellerWerdenPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Partner', href: '/de/partner' },
      { label: 'Reseller werden' },
    ]}>
      <FeatureHero
        eyebrow="Reseller"
        title="Camzify-Reseller werden"
        lede={<>
          <strong className="font-semibold text-foreground">
            Camzify wird über Partner und direkt verkauft.
          </strong>{' '}
          Das Reseller-Modell richtet sich an Unternehmen mit einem Kundenstamm in Sicherheit oder Facility
          Management, die diesem Kundenstamm eine wiederkehrend abgerechnete Software verkaufen
          wollen. Der KI-gestützte Wächterrundgang passt zu diesem Vertriebsweg: Er setzt auf den
          Kameras auf, die der Kunde bereits besitzt, sodass keine Hardware-Lieferkette zu tragen
          ist und nicht erst ein Gespräch über den Austausch der Anlage gewonnen werden muss.
        </>}
        facts={['Reine Software, nichts auf Lager', 'Preise auf Angebotsbasis, Konditionen im Gespräch', 'Eine zitierbare Seite für jede Aussage']}
        primary={{ href: '/contact', label: 'Über Reselling sprechen' }}
        secondary={{ href: '/de/ki-waechterrundgang', label: 'Was Sie verkaufen würden' }}
        visual={<PhotoFigure src="/partner-hero-become-a-reseller.webp" alt="Ein Partner am Laptop bei der Arbeit in der Camzify-Konsole" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="max-w-3xl">
            <ProductShot src="/product-license-plan" alt="Die Konsolenansicht „Plan and Usage“: Instanzen je Funktion, was aktiviert ist, was an Unterkonten vergeben ist und was noch verfügbar ist" label="Plan und Nutzung" sizes="(max-width: 1024px) 100vw, 45vw" />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Das Produkt</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Was ein Reseller tatsächlich verkauft</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Ein KI-gestütztes Cloud-Videomanagementsystem für die Kameras, die ein Kunde bereits
                hat, mit einer Fähigkeit, die andere Cloud-VMS-Produkte nicht bieten: dem{' '}
                <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützten Wächterrundgang</Link>.
              </p>
              <PointList items={[
                'Ein geplanter Rundgang arbeitet jede Kamera der Reihe nach ab.',
                'An jedem Kontrollpunkt prüft er eine festgelegte Liste.',
                'Schlägt eine Prüfung fehl, benachrichtigt er die zuständige Wachperson.',
                'Am Ende legt er ein Protokoll mit dem Einzelbild hinter jedem Ergebnis ab.',
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">
                Er ersetzt den routinemäßigen Kontrollgang, nicht die Sicherheitsfunktion, und das
                sagen wir auf jeder Seite.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Drumherum stehen die Teile, die ein Käufer von jedem VMS erwartet: Live-Streaming,
                Cloud-Aufzeichnung mit Aufbewahrungsdauer je Kamera, 23 Erkennungen, die auf
                bestätigten Objektspuren auslösen statt auf Pixelbewegung, Alarme per E-Mail, SMS,
                WhatsApp und Push sowie die Verwaltung mehrerer Standorte mit rollenbasiertem
                Zugriff.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Illustration
                caption="Ein Rundgang: Kontrollpunkte in fester Reihenfolge, eine Checkliste an jedem, ein Protokoll am Ende. Diese Vorführung überzeugt im Verkauf."
                alt="Eine Rundgangsroute über vier Kontrollpunkte mit der Zahl der Prüfungen an jedem"
              >
                <RouteBody />
              </Illustration>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">Der Vertrieb</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Womit Sie arbeiten können</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Camera, title: 'Kein Hardware-Gespräch', desc: 'Jede ONVIF- oder RTSP-Kamera funktioniert, und Camzify verkauft keine eigenen. Der Interessent behält, was er hat; damit fällt der Einwand weg, an dem die meisten Modernisierungen scheitern.', href: '/de/unterstuetzte-kameras' },
                { icon: Route, title: 'Eine Vorführung, die überzeugt', desc: 'Die interaktive Demo führt einen manuellen Rundgang von Anfang bis Ende vor, mit Nachricht an die Wachperson und Vorher-nachher-Protokoll. Ist ein Interessent so weit, vereinbaren Sie eine Live-Vorführung auf echten Kameras.', href: '/de/ki-waechterrundgang' },
                { icon: BookOpen, title: 'Eine Seite für jede Aussage', desc: 'Eine Seite je Modul, je Erkennung und je Vergleich, zitierfähig geschrieben, dazu Leitfäden, die Schritt für Schritt durch die Konsole führen. Die Leitfäden sind auf Englisch.', href: '/guides' },
                { icon: FileCheck2, title: 'Ein Ergebnis, das der Käufer vorzeigen kann', desc: 'Das Protokoll pro Rundgang trägt Zeitstempel, die Einzelbilder und eine Erfüllungsquote, und es ist das, was ein Sicherheitsverantwortlicher seiner eigenen Geschäftsleitung vorlegt.', href: '/de/ki-waechterrundgang/kontrollprotokolle' },
              ].map((item) => (
                <Link key={item.title} href={item.href} className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-base font-bold group-hover:text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-[2fr_3fr]">
            <ScrollReveal>
              <Illustration
                caption="Ein Reseller kann das Konto halten und jedem Kunden einen abgegrenzten Zugang geben, oder der Kunde hält sein eigenes. So oder so behalten Sie die Beziehung."
                alt="Kontostruktur: das Konto eines Resellers mit den Kunden als Unterkonten darunter"
              >
                <SitesBody />
              </Illustration>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <span className="font-mono text-mono-sm uppercase text-primary">Der Ablauf</span>
              <h2 className="mt-2 font-display text-2xl font-bold">So funktioniert Reselling in der Praxis</h2>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                {[
                  { icon: MessageSquare, text: <>Am Anfang steht ein Gespräch. Sagen Sie uns, an wen und wie Sie verkaufen. Die Preise werden auf Angebotsbasis erstellt, also werden die Konditionen an Ihren Kunden ausgerichtet, statt aus einer Preisliste abgelesen zu werden.</>},
                  { icon: Users, text: <>Legen Sie fest, wo das Konto des Kunden liegt: unter Ihrem als <Link href="/de/plattform/benutzerverwaltung" className="text-primary hover:underline">Unterkonto</Link> mit Kontingent, das Sie zuteilen, oder eigenständig. Beides wird unterstützt.</>},
                  { icon: ShieldCheck, text: <>Verkaufen Sie, was die Website sagt. Hinter jeder Aussage auf dieser Website können wir stehen, und die <Link href="/trust" className="text-primary hover:underline">Trust-Seite</Link> (auf Englisch) listet auf, was wir nicht behaupten, damit Sie nie etwas zurücknehmen müssen.</>},
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <item.icon className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Was wir Ihnen nicht versprechen</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Dass es eine veröffentlichte Marge, ein gestuftes Partnerprogramm mit Abzeichen
                oder ein Schulungsprogramm gibt. Das gibt es bisher nicht, und eine Seite, die etwas
                anderes vorgibt, wäre der falsche Anfang für eine Partnerschaft, die darauf baut,
                nicht zu übertreiben. Wenn Sie Kamerasysteme errichten und warten, ist die Seite{' '}
                <Link href="/de/fuer-installateure" className="text-primary hover:underline">für Errichter und Installateure</Link>{' '}
                näher an Ihrer Arbeit; wenn Sie die Leistung für Kunden betreiben, lesen Sie die Seite{' '}
                <Link href="/de/fuer-managed-service-provider" className="text-primary hover:underline">für Managed Service Provider</Link>.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FaqSection items={faqs} locale="de" />
    </PageShell>
  );
}
