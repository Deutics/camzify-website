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
import { Layers, Users, KeyRound, Bell, HardDrive, FileCheck2, ShieldCheck } from 'lucide-react';

/**
 * German counterpart of /partners/for-managed-service-providers (pair in lib/i18n.ts).
 *
 * The English page uses SectionVisual (variants `sites` and `report`). Every
 * SectionVisual variant renders English prose with no prop to override it, so
 * docs/I18N.md says not to use it here; the German equivalents are inlined below with
 * the same markup and classes.
 */
const pageMeta = {
  title: 'Managed Service Provider | Mandantenfähiges VMS',
  description: 'Videoüberwachung und KI-Wächterrundgang als Managed Service: ein Konto, ein Zugang je Kunde, Kontingent in Ihrer Hand, Alarme und Protokolle je Kunde.',
  path: '/de/fuer-managed-service-provider',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  {
    question: 'Wie bedient ein MSP-Konto viele Kunden?',
    answer: 'Jeder Kunde ist ein Unterkonto, abgegrenzt auf seine eigenen Standorte und Kameras. Ein Kunde sieht beim Login nur, was ihm gehört: seine Live-Wand, seine Alarme, seine Kontrollprotokolle. Ihre Operatoren im übergeordneten Konto sehen jeden Kunden. Unterkonten können eigene Unterkonten anlegen, sodass ein Kunde mit mehreren Abteilungen weiter delegieren kann, ohne Sie einzubeziehen.',
  },
  {
    question: 'Wie wird das Lizenzkontingent aufgeteilt?',
    answer: 'Aus dem, was Sie halten. Standorte, Kameras, Instanzen für KI-Funktionen und Backup-Speicher werden jedem Unterkonto aus Ihrem eigenen Kontingent zugeteilt. Ein Kunde, der seine Zuteilung erreicht, sieht sie als ausgeschöpft und kann mehr anfordern. Sie genehmigen die Anfrage oder nicht. Der Speicher wird aufgeschlüsselt in bereitgestellt, belegt, an Unterkonten vergeben und verbleibend, sodass das, was Sie abgegeben haben, nie in einer einzigen Zahl verschwimmt.',
  },
  {
    question: 'Können wir den Zugang eines Kunden sperren, ohne seine Daten zu löschen?',
    answer: 'Ja. Ein Unterkonto lässt sich sperren; das blockiert den Login und lässt Standorte, Kameras, Aufnahmen und Protokolle unverändert. Wird es wieder freigegeben, ist genau das wieder zugänglich, was vorher da war. Löschen ist ein eigener, bewusster Schritt.',
  },
  {
    question: 'Wer bekommt die Alarme, wir oder der Kunde?',
    answer: 'Wen Sie festlegen. Benachrichtigungskanäle werden je Alarmkategorie eingerichtet, und der Schweregrad lässt sich je Kamera und KI-Funktion einstellen. So kann ein kritisches Ereignis bei einem Kunden auf Ihrem Tisch landen, während Routineereignisse an den Ansprechpartner des Kunden gehen. Fehlgeschlagene Rundgangsprüfungen benachrichtigen die Wachperson, die für diese Kamera eingetragen ist.',
  },
  {
    question: 'Wie werden Kunden mit Kameras im lokalen Netz angebunden?',
    answer: 'Mit dem Camzify Connector, einer kleinen Anwendung auf einem Windows-, macOS- oder Linux-Rechner im Netzwerk des Kunden. Er leitet lokale RTSP-Kameras ohne Portweiterleitung an Camzify weiter; das zählt, wenn Sie die Firewall des Kunden nicht selbst verwalten. Aus dem Internet erreichbare Kameras werden direkt angebunden, und Encoder senden per RTMP.',
  },
  {
    question: 'Was können wir einem Kunden als Leistungsnachweis zeigen?',
    answer: 'Ein Protokoll pro Rundgang mit jedem Checklistenergebnis, dem Einzelbild, anhand dessen es bewertet wurde, Vorher-nachher-Bildern für alles Behobene, Zeitstempeln und einer Erfüllungsquote. Jede Aktion im Konto wird außerdem in einem Audit-Trail festgehalten. Der Kunde kann seine eigenen Protokolle über seinen Zugang lesen, oder Sie schicken sie ihm.',
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

export default function DeFuerManagedServiceProviderPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Partner', href: '/de/partner' },
      { label: 'Für Managed Service Provider' },
    ]}>
      <FeatureHero
        eyebrow="Managed Service Provider"
        title="Camzify für Managed Service Provider"
        lede={<>
          <strong className="font-semibold text-foreground">
            Ein MSP bringt die Kundenbetreuung, das Netzwerk und oft auch den Zugang zum Standort
            bereits mit, und das ist der größte Teil dessen, was die Einführung einer
            Videoüberwachung braucht.
          </strong>{' '}
          Camzify ergänzt diese Basis um eine Sicherheitsleistung als neue Sparte, ohne dass
          Hardware beschafft werden muss: ein Konto in Ihrer Hand, ein abgegrenzter Zugang je
          Kunde, Lizenzkontingent, das Sie zuteilen und zurückholen, und ein Kontrollprotokoll pro
          Rundgang, das Sie jedem Kunden zeigen.
        </>}
        facts={['Ein Konto, ein Zugang je Kunde', 'Kontingent von Ihnen zugeteilt und zurückgeholt', 'Alarme und Protokolle je Kunde']}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/guides/how-to-manage-sub-users-and-quotas', label: 'Unterkonten und Kontingente (auf Englisch)' }}
        visual={<PhotoFigure src="/partner-hero-for-managed-service-providers.webp" alt="Ein Dienstleister am Laptop, der die Camzify-Konsole für einen Kunden bedient" priority />}
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
          <div className="grid items-start gap-10 lg:grid-cols-[2fr_3fr]">
            <ScrollReveal>
              <Illustration
                caption="Ihr Konto oben. Jeder Kunde ist ein Unterkonto mit eigenen Standorten, zugeteilt aus dem Kontingent, das Sie halten."
                alt="Kontostruktur: das Konto des MSP oben, die Kunden als Unterkonten darunter, jeder mit eigenen Standorten"
              >
                <SitesBody />
              </Illustration>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <span className="font-mono text-mono-sm uppercase text-primary">Kontostruktur</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Gebaut für die Partei, der der Standort nicht gehört</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Die meiste Videosoftware geht davon aus, dass Betreiber und Eigentümer dasselbe
                Unternehmen sind. Camzify rechnet damit, dass sie es nicht sind.
              </p>
              <PointList items={[
                'Sie halten das Konto.',
                <>Jeder Kunde ist ein <Link href="/de/plattform/benutzerverwaltung" className="text-primary hover:underline">Unterkonto</Link>, abgegrenzt auf seine eigenen Standorte und Kameras.</>,
                <>Jeder Kunde hat eine <Link href="/platform/permission-groups" className="text-primary hover:underline">Berechtigungsgruppe</Link> (auf Englisch), die festlegt, welche Seiten er öffnen und was er ändern darf.</>,
                'Ein Kunde sieht nie einen anderen Kunden.',
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">
                Das Kontingent fließt auf demselben Weg. Standorte, Kameras, Instanzen für
                KI-Funktionen und Backup-Speicher gehen aus Ihrem Bestand an jeden Kunden, und ein
                Kunde, der seine Zuteilung erreicht, fordert mehr an, statt es sich zu nehmen. Die{' '}
                <Link href="/platform/license-and-instance-management" className="text-primary hover:underline">Plan-Seite</Link>{' '}
                (auf Englisch) schlüsselt den Speicher auf in bereitgestellt, belegt, an Unterkonten
                vergeben und verbleibend.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">Die Leistung</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Was Sie für jeden Kunden betreiben</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Layers, title: 'Live-Wand über alle Kunden', desc: 'Die Kameras aller Kunden auf einem Bildschirm, nach Standort gruppiert, mit der Zahl der Kameras online je Standort. Filtern Sie nach einem Kunden oder einer KI-Funktion.', href: '/de/plattform/live-streaming' },
                { icon: HardDrive, title: 'Aufzeichnung und Aufbewahrung', desc: 'Je Kamera, durchgehend oder nach Zeitplan, aufbewahrt nach Tagen oder bis zu einer Speichergrenze. Eine Kopie in der Cloud übersteht alles, was mit dem Rekorder des Kunden passiert.', href: '/de/plattform/videospeicherung' },
                { icon: Bell, title: 'Alarme je Kunde gesteuert', desc: 'Kanäle je Alarmkategorie und Schweregrad je Kamera und Funktion, sodass kritische Ereignisse bei Ihnen landen und Routineereignisse beim Kunden.', href: '/de/plattform/alarme-und-benachrichtigungen' },
                { icon: FileCheck2, title: 'Rundgänge mit je einem Protokoll', desc: 'Geplante Rundgänge auf den Kameras jedes Kunden, die Wachperson bei einer fehlgeschlagenen Prüfung benachrichtigt und ein Kontrollprotokoll pro Runde zur Übergabe.', href: '/de/ki-waechterrundgang' },
              ].map((item) => (
                <Link key={item.title} href={item.href} className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-base font-bold group-hover:text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Betrieb</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Onboarding, Änderungen und Offboarding</h2>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                {[
                  { icon: Users, text: <>Einen Kunden nehmen Sie auf, indem Sie das Unterkonto anlegen, Kontingent zuteilen und seine Standorte hinzufügen. Kameras in seinem lokalen Netz verbinden sich über den <Link href="/de/camzify-connector" className="text-primary hover:underline">Connector</Link>, ohne Änderung an seiner Firewall.</>},
                  { icon: KeyRound, text: <>Was ein Kunde darf, ändern Sie, indem Sie ihn in eine andere Berechtigungsgruppe verschieben. Die Änderung gilt sofort, ohne dass etwas verteilt werden muss.</>},
                  { icon: ShieldCheck, text: <>Zum Offboarding sperren Sie das Unterkonto. Der Login endet, die Daten bleiben, und eine Freigabe stellt genau das wieder her, was da war. Jeder Schritt steht im Audit-Trail.</>},
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <item.icon className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Illustration
                caption="Das Protokoll pro Rundgang ist das, was ein Kunde für seine eigenen Standorte sieht. Nichts darin wird nachträglich eingetragen."
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
                Dass es eine veröffentlichte Partnermarge, eine White-Label-Option oder eine
                SLA-Kennzahl gibt.
              </p>
              <PointList items={[
                'Die Preise werden auf Angebotsbasis erstellt, und Partnerkonditionen werden im Gespräch vereinbart.',
                'Die Konsole trägt den Namen Camzify.',
                <>Wir veröffentlichen auch keine Zahlen zu Verfügbarkeit, Reaktionszeiten oder Ereignissen, weil wir sie für Ihre Kunden nicht belegen können; die <Link href="/trust" className="text-primary hover:underline">Trust-Seite</Link> (auf Englisch) beschreibt diese Haltung.</>,
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">
                Wenn Sie Kameras eher errichten als betreiben, lesen Sie die Seite{' '}
                <Link href="/de/fuer-installateure" className="text-primary hover:underline">für Errichter und Installateure</Link>;
                wenn Sie Überwachung für Sicherheitsdienste leisten, die Seite{' '}
                <Link href="/de/fuer-leitstellen" className="text-primary hover:underline">für Leitstellen</Link>.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FaqSection items={faqs} locale="de" />
    </PageShell>
  );
}
