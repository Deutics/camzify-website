import type { ReactNode } from 'react';
import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PhotoFigure } from '@/components/content/photo-figure';
import { FeatureHero } from '@/components/content/feature-hero';
import { BeforeAfter } from '@/components/content/before-after';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';
import { Eye, Radio, ShieldAlert, FileCheck2, Users, KeyRound, Layers, ArrowRight } from 'lucide-react';

/**
 * German counterpart of /partners/for-monitoring-centers (pair in lib/i18n.ts).
 *
 * The English page uses SectionVisual for three illustrations. Every SectionVisual
 * variant renders English prose (its figcaption and body labels) with no prop to
 * override it, so docs/I18N.md says not to use it here. The German equivalents are
 * inlined below with the same markup and classes.
 *
 * NSL, DIN EN 50518 and VdS 3138 are named as context a German reader recognizes.
 * Camzify holds none of them, and the page says so.
 */
const pageMeta = {
  title: 'Videofernüberwachung für Leitstellen und NSL',
  description: 'Führen Sie Rundgänge für jeden Sicherheitsdienst durch, den Sie überwachen, benachrichtigen Sie dessen Wachpersonal und liefern Sie je Runde ein Protokoll.',
  path: '/de/fuer-leitstellen',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  {
    question: 'Wer hält das Camzify-Konto, die Leitstelle oder der Sicherheitsdienst?',
    answer: 'Wer die Konsole bedient. Führt eine Leitstelle Rundgänge für mehrere Sicherheitsdienste durch, hält sie das Konto, und jeder Sicherheitsdienst ist ein Unterkonto, abgegrenzt auf seine eigenen Standorte und Kameras. Unterkonten können eigene Unterkonten anlegen, sodass ein Sicherheitsdienst seinen Endkunden einen Zugang geben kann, ohne Sie einzubeziehen. Betreibt ein Sicherheitsdienst seine eigene Überwachung und beauftragt Sie nur für Lastspitzen, lässt sich das Verhältnis umkehren: Der Sicherheitsdienst hält das Konto, und Sie sind ein Unterkonto mit einer Berechtigungsgruppe, die zur Aufgabe passt.',
  },
  {
    question: 'Kann ein Sicherheitsdienst die Standorte eines anderen sehen?',
    answer: 'Nein. Ein Unterkonto erreicht nur die ihm zugewiesenen Standorte. Ein Sicherheitsdienst sieht beim Login seine eigenen Kameras, seine eigenen Kontrollprotokolle und seine eigenen Alarme, und nichts, was einem anderen Ihrer Kunden gehört. Ihre Operatoren im übergeordneten Konto sehen alle.',
  },
  {
    question: 'Wer erhält die Nachricht an die Wachperson, wenn eine Prüfung fehlschlägt?',
    answer: 'Die Wachperson, die für diesen Standort oder diese Kamera eingetragen ist, über die Kanäle, die für diese Alarmkategorie eingerichtet sind: E-Mail, SMS, WhatsApp oder Push. Die Nachricht enthält das Einzelbild, anhand dessen die Prüfung bewertet wurde. Im manuellen Rundgang entscheidet der Operator, ob sie gesendet wird; im automatischen Rundgang sendet die Plattform sie selbst, sobald ein Checklistenpunkt als nicht konform (in der Konsole: Not Compliant) bewertet wird.',
  },
  {
    question: 'Handelt die KI ohne Operator?',
    answer: 'Im automatischen Rundgang ja, im Rahmen dessen, wofür der Rundgang eingerichtet ist: Sie prüft jeden Punkt der Liste, kann eine Szene eine festgelegte Zeit lang beobachten, statt nach einem einzelnen Bild zu urteilen, benachrichtigt die zuständige Wachperson bei nicht konformen Punkten und löst eine kritische Benachrichtigung aus, wenn sie eine Gefahr oder ein Sicherheitsrisiko erkennt. Was gegen das Risiko zu tun ist, entscheidet sie nicht. Das entscheidet der Operator oder die Wachperson.',
  },
  {
    question: 'Wie wird eine fehlgeschlagene Prüfung abgeschlossen?',
    answer: 'Ein als nicht konform markierter Checklistenpunkt erfasst ein Einzelbild und bleibt entweder ausstehend (Pending) oder wird als behoben (Fixed) markiert, sobald die Wachperson vor Ort war; dabei wird ein zweites Einzelbild erfasst. Ein Rundgang lässt sich nicht abschließen, solange ein Punkt als nicht konform offen ist, und ein ausstehender Punkt zählt gegen die Erfüllungsquote. Das Protokoll zeigt das Vorher- und das Nachher-Bild nebeneinander.',
  },
  {
    question: 'Was erhält der Sicherheitsdienst als Nachweis der Leistung?',
    answer: 'Ein Protokoll pro Runde: den Standort, die Kontrollpunkte, jedes Checklistenergebnis, das Einzelbild, anhand dessen jedes Ergebnis bewertet wurde, das Vorher-nachher-Paar für alles, was fehlschlug und behoben wurde, Zeitstempel und eine Erfüllungsquote. Der Sicherheitsdienst kann seine eigenen Protokolle über seinen abgegrenzten Zugang lesen, oder Sie schicken sie ihm. Nichts im Protokoll wird nachträglich eingetragen.',
  },
  {
    question: 'Können unsere Operatoren Rundgänge für viele Sicherheitsdienste auf einem Bildschirm durchführen?',
    answer: 'Ja. Die Standorte aller Sicherheitsdienste, für die Sie überwachen, liegen unter Ihrem Konto, und die Live-Wand gruppiert die Kameras nach Standort, mit der Zahl der Kameras online je Standort. Automatische Rundgänge laufen nach ihren Zeitplänen über alle hinweg; manuelle Rundgänge werden je Rundgangsablauf gestartet. Welcher Operator welche Standorte öffnen darf, steuern Berechtigungsgruppen.',
  },
  {
    question: 'Hält Camzify DIN EN 50518 oder VdS 3138?',
    answer: 'Nein. DIN EN 50518 und die VdS-Richtlinien 3138 stellen Anforderungen an die Leitstelle selbst, an eine Notruf- und Serviceleitstelle (NSL), nicht an eine Software. Camzify hält keine dieser Anerkennungen und ersetzt sie nicht. Ob und wie eine Leitstelle danach anerkannt ist, bleibt allein ihre Sache.',
  },
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

function FlowBody({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-2 sm:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s} className="relative rounded-lg border border-border bg-muted/20 p-3">
          <span className="font-mono text-mono-sm text-primary tabular-nums">{String(i + 1).padStart(2, '0')}</span>
          <span className="mt-1.5 block text-sm leading-snug">{s}</span>
          {i < steps.length - 1 && <ArrowRight aria-hidden="true" className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground sm:block" />}
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

function ReportBody() {
  return (
    <div>
      <div className="flex items-center gap-5">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-live font-display text-lg font-bold text-live">80 %</span>
        <div className="min-w-0 flex-1">
          <span className="block font-display text-base font-bold">Perimeter-Rundgang · manuell</span>
          <span className="block text-xs text-muted-foreground">5 Punkte · 1 Standort · 3 Kameras</span>
          <span className="mt-1.5 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-live/15 px-2 py-0.5 text-[11px] font-medium text-live">4 konform / behoben</span>
            <span className="rounded-full bg-warn/15 px-2 py-0.5 text-[11px] font-medium text-warn">1 ausstehend</span>
          </span>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-border bg-muted/20 p-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm font-medium">Tor vollständig geschlossen</span>
          <span className="font-mono text-mono-sm uppercase text-live">Behoben und bestätigt</span>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {[['/cam-06.jpg', 'Vorher'], ['/cam-06-after.jpg', 'Nachher']].map(([src, cap]) => (
            <figure key={cap} className="w-[calc(50%-4px)] sm:w-28">
              <img src={src} alt={`Torkamera, ${cap.toLowerCase()}`} aria-hidden="true" width={112} height={63} loading="lazy" className="h-[63px] w-full rounded-md border border-border object-cover" />
              <figcaption className="mt-1 text-center font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{cap}</figcaption>
            </figure>
          ))}
          <p className="w-full text-xs leading-relaxed text-muted-foreground sm:min-w-0 sm:w-auto sm:flex-1 sm:self-center">
            Nachricht an die Wachperson gesendet. Erneut geprüft und mit dem zweiten Bild abgeschlossen.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DeFuerLeitstellenPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Partner', href: '/de/partner' },
      { label: 'Für Leitstellen' },
    ]}>
      <FeatureHero
        eyebrow="Leitstellen · NSL · Alarmempfang · GSOC"
        title="Software zur Videofernüberwachung für Leitstellen"
        lede={<>
          <strong className="font-semibold text-foreground">
            Eine Leitstelle, etwa eine Notruf- und Serviceleitstelle (NSL), überwacht im Auftrag
            des Sicherheitsdienstes und schickt die Wachperson, wenn etwas nicht stimmt.
          </strong>{' '}
          Genau für diese Arbeitsteilung ist Camzify gebaut: ein Konto für das Unternehmen, das
          die Konsole bedient, ein abgegrenzter Zugang für jeden Sicherheitsdienst, für den es
          überwacht, die Benachrichtigung der Wachperson direkt aus dem Rundgang und ein
          Kontrollprotokoll pro Runde, das der Sicherheitsdienst an seinen eigenen Kunden
          weitergeben kann.
        </>}
        facts={['Ein Konto, ein Zugang je Dienst', 'Wachperson direkt aus dem Rundgang benachrichtigt', 'Ein Protokoll pro Runde und Kunde']}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/fuer-sicherheitsdienste', label: 'Für Sicherheitsdienste' }}
        visual={<PhotoFigure src="/partner-hero-for-monitoring-centers.webp" alt="Operatoren in einer Leitstelle an ihren Arbeitsplätzen vor einer Videowand mit Kamerabildern" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="max-w-3xl">
            <BeforeAfter
            before={{ src: '/partner-gate-opened.jpg', label: 'Offen vorgefunden · Wachperson benachrichtigt', alt: 'Eine Kamera am Hoftor: das Schiebetor steht offen, niemand ist dort, so wie der Rundgang es vorgefunden hat' }}
            after={{ src: '/partner-gate-closed.jpg', label: 'Geschlossen · bestätigt', alt: 'Dieselbe Torkamera wenige Minuten später: eine Wachperson in Warnweste schiebt das Tor zu' }}
            caption="Der Nachweis, den jeder behobene Punkt trägt: das Bild, das der Rundgang vorgefunden hat, und das Bild, nachdem sich die Wachperson darum gekümmert hat."
          />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Die Rollen</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Wo eine Leitstelle steht</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Es gibt drei Parteien, und wer die Konsole bedient, ist weder Eigentümer der
                Kameras noch Arbeitgeber der Wachperson.
              </p>
              <PointList items={[
                'Der Endkunde ist Eigentümer des Standorts.',
                'Der Sicherheitsdienst hält den Vertrag und stellt das Wachpersonal.',
                <>Die Leitstelle arbeitet hinter dem Sicherheitsdienst: Sie übernimmt die <Link href="/use-cases/remote-video-monitoring" className="text-primary hover:underline">Videofernüberwachung</Link> (auf Englisch), führt die Rundgänge durch und sagt der Wachperson vor Ort, wann eine Person gebraucht wird.</>,
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">
                Die meiste Videosoftware geht davon aus, dass Betreiber und Eigentümer dasselbe
                Unternehmen sind. Camzify nicht. Das Kontomodell ist von Grund auf mandantenfähig,
                die Benachrichtigung der Wachperson ist Teil des Rundgangs statt ein eigenes
                Werkzeug, und das Protokoll ist für die Partei geschrieben, die nicht dabei war.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Illustration
                caption="Der Weg, den eine fehlgeschlagene Prüfung nimmt. Die Leitstelle führt den Rundgang durch und benachrichtigt die Wachperson des Sicherheitsdienstes direkt."
                alt="Ablauf in vier Schritten: vom Standort des Endkunden über den Sicherheitsdienst zur Leitstelle, die den Rundgang durchführt, bis zum Einsatz der Wachperson"
              >
                <FlowBody steps={['Standort des Endkunden', 'Sicherheitsdienst', 'Leitstelle', 'Wachperson im Einsatz']} />
              </Illustration>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">Im Leitstellenbetrieb</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Was sich für eine besetzte Leitstelle ändert</h2>
            <p className="mt-4 max-w-prose text-muted-foreground">
              Der Engpass in einer Leitstelle ist die Aufmerksamkeit der Operatoren, nicht die
              Zahl der Kameras. Aufgezehrt wird sie vom Routinerundgang: dieselben Türen,
              dieselben Höfe, dieselben Prüfungen, alle zwei Stunden, bei jedem Kunden. Genau
              diesen Teil übernimmt die Plattform.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Eye,
                  title: 'Geplante Rundgänge laufen von selbst',
                  desc: 'Ein automatischer Rundgang arbeitet jeden Kontrollpunkt und seine Checkliste nach Zeitplan ab. Wo ein einzelnes Bild nicht reicht, beobachtet er die Szene eine festgelegte Zeit lang, bevor er entscheidet.',
                  href: '/de/ki-waechterrundgang/automatische-planung',
                },
                {
                  icon: Radio,
                  title: 'Wachpersonal direkt aus dem Rundgang benachrichtigt',
                  desc: 'Eine als nicht konform bewertete Prüfung erfasst ein Einzelbild und benachrichtigt die zuständige Wachperson. Im manuellen Rundgang entscheidet der Operator, ob die Nachricht rausgeht; im automatischen Rundgang geht sie von selbst.',
                  href: '/de/ki-waechterrundgang/benachrichtigungen',
                },
                {
                  icon: ShieldAlert,
                  title: 'Risiken als kritisch gemeldet',
                  desc: 'Während eines automatischen Rundgangs achtet die KI auch auf Gefahren und Sicherheitsrisiken, die nicht auf der Checkliste stehen, und löst eine kritische Benachrichtigung aus, damit ein Operator sie zuerst sieht.',
                  href: '/de/ki-waechterrundgang/risikoerkennung',
                },
                {
                  icon: FileCheck2,
                  title: 'Operatoren übernehmen, was eine Person braucht',
                  desc: 'Manuelle Rundgänge bleiben für die Prüfungen, die ein Mensch machen soll. So oder so landen jedes Ergebnis, jedes Einzelbild und jede Nachricht im selben Protokoll.',
                  href: '/de/ki-waechterrundgang/so-funktioniert-es',
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
                >
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
                caption="Ein Konto für die Leitstelle. Jeder Sicherheitsdienst ist ein Unterkonto, abgegrenzt auf seine eigenen Standorte; von dort kann er Zugänge für seine eigenen Kunden anlegen."
                alt="Kontostruktur: das Konto der Leitstelle oben, die Sicherheitsdienste als Unterkonten darunter, jeder mit eigenen Standorten"
              >
                <SitesBody />
              </Illustration>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <span className="font-mono text-mono-sm uppercase text-primary">Kontostruktur</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Ein Konto, ein abgegrenzter Zugang je Sicherheitsdienst</h2>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                {[
                  {
                    icon: Layers,
                    text: <>Die Leitstelle hält das Konto. Die Standorte aller Sicherheitsdienste, für die sie überwacht, liegen darunter, und ihre Operatoren sehen sie alle auf einer <Link href="/de/plattform/live-streaming" className="text-primary hover:underline">Live-Wand</Link>, nach Standort gruppiert.</>,
                  },
                  {
                    icon: Users,
                    text: <>Jeder Sicherheitsdienst ist ein <Link href="/de/plattform/benutzerverwaltung" className="text-primary hover:underline">Unterkonto</Link>, abgegrenzt auf seine eigenen Standorte und Kameras, mit Lizenzkontingent aus Ihrem. Unterkonten können eigene Unterkonten anlegen, sodass ein Sicherheitsdienst seinem Endkunden einen Zugang geben kann, ohne Sie einzubeziehen.</>,
                  },
                  {
                    icon: KeyRound,
                    text: <>Eine <Link href="/platform/permission-groups" className="text-primary hover:underline">Berechtigungsgruppe</Link> (auf Englisch) legt fest, was jeder Zugang öffnen und ändern darf. Die vorgefertigte Gruppe „Auditor“ sieht alles und ändert nichts; das passt meist genau für einen Sicherheitsdienst, der die Leistung prüft, für die er bezahlt.</>,
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <item.icon className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Das Ergebnis</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Was der Sicherheitsdienst nach jedem Rundgang erhält</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Ein <Link href="/de/ki-waechterrundgang/kontrollprotokolle" className="text-primary hover:underline">Kontrollprotokoll pro Runde</Link>{' '}
                hält fest, was geprüft wurde, was vorgefunden wurde und wann.
              </p>
              <PointList items={[
                'Es nennt den Standort und führt die Kontrollpunkte in ihrer Reihenfolge auf.',
                'Es dokumentiert jedes Checklistenergebnis und das Einzelbild, anhand dessen es bewertet wurde.',
                'Es enthält das Vorher-nachher-Paar für alles, was fehlschlug und behoben wurde.',
                'Es trägt Zeitstempel und eine Erfüllungsquote.',
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">
                Ein ausstehender Punkt zählt gegen diese Quote, und ein Rundgang lässt sich nicht
                abschließen, solange ein Punkt noch als nicht konform offen ist. Die Zahl bedeutet
                also, was sie sagt.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Der Sicherheitsdienst liest seine eigenen Protokolle über seinen abgegrenzten
                Zugang und kann sie unter eigenem Namen an seinen Kunden weitergeben. Die Leistung
                der Leitstelle wird zu etwas, das der Sicherheitsdienst vorzeigen kann, nicht nur
                zu etwas, wofür er bezahlt.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Illustration
                caption="Ein Rundgangsprotokoll mit Vorher- und Nachher-Bild für eine fehlgeschlagene Prüfung. Der Sicherheitsdienst sieht das nur für seine eigenen Standorte."
                alt="Auszug aus einem Kontrollprotokoll mit einem Checklistenpunkt, seinem Vorher- und Nachher-Bild und einer Erfüllungsquote"
              >
                <ReportBody />
              </Illustration>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Was wir Ihnen nicht versprechen</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Dass das Ihre Operatoren ersetzt. Das tut es nicht. Jemand entscheidet weiterhin,
                was eine kritische Benachrichtigung bedeutet und ob die Wachperson sofort ausrückt
                oder erst am Ende des Rundgangs.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Was sich ändert: Die Routineprüfung, der Teil, der teuer zu besetzen und hinterher
                nicht nachzuweisen ist, hängt nicht mehr davon ab, dass jemand auf eine Wand voller
                Bildschirme schaut, und die Aufmerksamkeit Ihrer Operatoren geht an die Ereignisse,
                die sie brauchen.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Wir veröffentlichen auch keine Reaktionszeiten, kein Verhältnis von Operatoren zu
                Kameras und keine Ereigniszahlen, weil wir sie für Ihren Betrieb nicht belegen
                können. Unsere Haltung zu Aussagen steht auf der{' '}
                <Link href="/trust" className="text-primary hover:underline">Trust-Seite</Link> (auf
                Englisch) und gilt für Partnergespräche genauso wie für das Marketing.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Wenn Sie Bewachung statt Überwachung anbieten, ist die Seite{' '}
                <Link href="/de/fuer-sicherheitsdienste" className="text-primary hover:underline">für Sicherheitsdienste</Link>{' '}
                für Sie geschrieben. Wenn Sie Alarme empfangen, sind der Anwendungsfall{' '}
                <Link href="/use-cases/alarm-verification" className="text-primary hover:underline">Alarmverifizierung</Link>{' '}
                und der{' '}
                <Link href="/guides/adding-remote-patrols-to-alarm-monitoring" className="text-primary hover:underline">Leitfaden zur Alarmüberwachung</Link>{' '}
                (beide auf Englisch) die nächsten Seiten; wenn Sie Konten für Kunden als Teil eines
                umfassenderen IT-Services führen, lesen Sie die Seite{' '}
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
