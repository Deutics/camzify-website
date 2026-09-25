import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { ProductShot } from '@/components/content/product-shot';
import { SiteImage } from '@/components/content/site-image';
import Link from 'next/link';
import {
  LayoutDashboard, Video, HardDrive, Bell, BarChart3, Users, Layers, Globe, Smartphone, Brain, Lock, ArrowRight,
} from 'lucide-react';

/**
 * German counterpart of /platform. Same sections, images and order as the English page.
 * The English "How it fits" paragraph names competitors and the virtual patrolling card
 * claims no other cloud VMS has the capability; both passages are left out here
 * (docs/I18N.md: no competitor statements on German pages). The `flow` SectionVisual
 * renders an English figcaption with no override, so its markup is written inline below.
 */
const pageMeta = {
  title: 'Cloud-VMS-Plattform | Videomanagement-Software',
  description: 'Cloud-VMS mit integriertem KI-Wächterrundgang: Live-Streaming, Cloud-Backup, Alarme, Analysen, Benutzer, Rechte und mehrere Standorte in einem Login.',
  path: '/de/plattform',
};

export const metadata = generatePageMeta(pageMeta);

/** Modules grouped by the job they do, in the order a buyer asks about them. */
const groups = [
  {
    heading: 'Video sehen und aufbewahren',
    blurb: 'Der Kern des Videomanagements: was live läuft, was aufgezeichnet wird und wie lange es aufbewahrt bleibt.',
    modules: [
      { icon: LayoutDashboard, title: 'Dashboard', href: '/platform/dashboard', english: true, desc: 'Kameras online, offene kritische Ereignisse, Alarme des Tages, Nachweis der Rundgänge und Stand der Aufbewahrung auf einem Bildschirm.', image: '/Video-Surveillance-Dashboard.png' },
      { icon: Video, title: 'Live-Streaming', href: '/de/plattform/live-streaming', english: false, desc: 'Eine Kamerawand nach Standort gruppiert, gespeicherte Kamera-Sets, eindeutige Offline-Anzeigen und PTZ, wo die Kamera es unterstützt.', image: '/live-camera-streaming.png' },
      { icon: HardDrive, title: 'Videospeicherung und Aufbewahrung', href: '/de/plattform/videospeicherung', english: false, desc: 'Durchgehende oder zeitgesteuerte Aufzeichnung, Aufbewahrungsdauer pro Kamera nach Tagen oder Speicherlimit, Wiedergabe und Export.', image: '/cloud-video-backup-and-retention-management.png' },
      { icon: Smartphone, title: 'Mobiler Zugriff', href: '/platform/mobile-access', english: true, desc: 'Live-Streams, Alarme und Nachweis der Rundgänge im Browser jedes Smartphones oder Tablets, ohne Installation.', image: '/mobile-access.webp' },
    ],
  },
  {
    heading: 'Erfahren, wenn etwas passiert',
    blurb: 'Erkennungen, auf die eine Person reagieren kann, und ein Nachweis, dass sie reagiert hat.',
    modules: [
      { icon: Bell, title: 'Alarme und Benachrichtigungen', href: '/de/plattform/alarme-und-benachrichtigungen', english: false, desc: 'Eine Warteschlange nach Schweregrad, Standort, Kamera oder Funktion, mit Quittierung, Eskalation und verknüpften Aufnahmen aus dem Backup.', image: '/security-alert-management.png' },
      { icon: BarChart3, title: 'Analysen und Berichte', href: '/platform/analytics-and-reporting', english: true, desc: 'Erkennungstrends im Zeitverlauf, Aufschlüsselung nach Attributen und nach Konfidenz, pro Standort und pro Funktion.', image: '/video-surveillance-analytics-and-reporting.png' },
      { icon: Brain, title: 'KI-Architektur', href: '/platform/ai-architecture', english: true, desc: 'Sechs Verarbeitungsebenen von der Erkennung bis zur adaptiven Inferenz, für jede Kamera einzeln abgestimmt.', image: '/ai-video-analytics-architecture.webp' },
    ],
  },
  {
    heading: 'Für viele Nutzer und Standorte',
    blurb: 'Delegieren, ohne die Kontrolle abzugeben: wer was sehen darf und wie viel der Lizenz jeder hält.',
    modules: [
      { icon: Users, title: 'Benutzerverwaltung', href: '/de/plattform/benutzerverwaltung', english: false, desc: 'Unterkonten, die selbst Unterkonten anlegen können, Zugriff pro Standort, Kontingente aus Ihrer Lizenz zugeteilt und bei Bedarf bei Ihnen nachgefordert.', image: '/security-system-user-management.png' },
      { icon: Lock, title: 'Berechtigungsgruppen', href: '/platform/permission-groups', english: true, desc: 'Zugriff auf Seitenebene, kombiniert mit Rechten zum Anlegen, Lesen, Ändern und Löschen pro Ressource, eine Gruppe pro Benutzer.', image: '/permission-group.png' },
      { icon: Layers, title: 'Lizenz und Instanzen', href: '/platform/license-and-instance-management', english: true, desc: 'Was aktiviert ist, was an Unterkonten vergeben wurde und was noch verfügbar ist, pro Funktion.', image: '/license-and-instance-management.png' },
      { icon: Globe, title: 'Mehrere Standorte', href: '/de/plattform/mehrere-standorte', english: false, desc: 'Jeder Standort wird eigenständig eingerichtet und in einer Konsole ausgewertet, zusammengefasst oder getrennt.', image: '/multi-site-video-surveillance.png' },
    ],
  },
];

const flowSteps = ['Live gestreamt und aufgezeichnet', 'Erkennungen und Kontrollgänge', 'Eine benannte Person benachrichtigt', 'Protokolliert, bewertet, aufbewahrt'];

const faqs = [
  { question: 'Ist die Camzify-Plattform ein Cloud-VMS oder eine Lösung vor Ort?', answer: 'Ein Cloud-VMS. Es muss kein Server und kein NVR installiert werden: Die Kameras streamen an die Plattform, die Aufnahmen werden in der Cloud mit einer pro Kamera festgelegten Aufbewahrungsdauer gespeichert, und jedes Modul wird im Browser bedient. Die einzige Software vor Ort ist der optionale Camzify Connector, eine kleine Anwendung für einen Windows-, macOS- oder Linux-Rechner, die Kameras in einem privaten Netzwerk ohne Portweiterleitung anbindet.' },
  { question: 'Sind alle diese Module enthalten oder werden sie einzeln lizenziert?', answer: 'Die Plattformmodule – Dashboard, Live-Streaming, Backup, Benachrichtigungen, Analysen, Benutzer, Berechtigungen, Lizenz und mehrere Standorte – sind ein Produkt mit einem Login. Jede angebundene Kamera belegt eine Stream-Instanz; zusätzlich lizenziert wird die KI: Für jede Erkennungsfunktion enthält Ihr Tarif ein Kontingent an Instanzen, das Aktivieren einer Funktion auf einer Kamera belegt eine davon, und Instanzen für den KI-gestützten Wächterrundgang werden pro Kamera und Rundgangsablauf gezählt. Unter „Plan & Usage“ sehen Sie genau, was aktiviert, vergeben und noch verfügbar ist.' },
  { question: 'Kann ein Konto mehrere Kunden oder Standorte getrennt betreiben?', answer: 'Ja. Alles ist um Standorte herum organisiert, und ein Unterkonto kann auf seine eigenen Standorte und Kameras beschränkt werden und sonst nichts sehen; eine Berechtigungsgruppe legt fest, was es öffnen und ändern darf. Lizenzkontingente werden ihm aus Ihrem Kontingent zugeteilt, und eine Anfrage nach mehr landet zur Freigabe bei Ihnen. Unterkonten können nach demselben Prinzip eigene Unterkonten anlegen, und genau das macht die Plattform für Sicherheitsdienste und Managed Service Provider (MSP) nutzbar.' },
  { question: 'Wo werden die Aufnahmen gespeichert, und wer hat Zugriff?', answer: 'In der Cloud, im Ruhezustand mit AES-256 und bei der Übertragung über TLS 1.2 oder höher verschlüsselt, mit einer pro Kamera festgelegten Aufbewahrungsdauer. Der Zugriff folgt denselben Berechtigungsgruppen wie der Rest der Plattform: Wer eine Kamera nicht öffnen darf, kann auch ihre Aufzeichnungen nicht öffnen. Jede Aktion im Konto wird in einem Audit-Protokoll festgehalten, das der Kontoinhaber einsehen kann.' },
  { question: 'Zeigen die Screenshots auf diesen Seiten das echte Produkt?', answer: 'Ja. Die Konsolenansichten auf den Plattformseiten stammen aus der Anwendung selbst, jeweils im hellen und im dunklen Design, und wechseln mit dem Design, in dem Sie die Website ansehen. Die Zahlen darin sind Oberflächenillustrationen mit Beispielstandorten und -kameras, keine Kundendaten, und jede Bildunterschrift weist darauf hin.' },
  { question: 'Funktioniert die Plattform auf dem Smartphone?', answer: 'Ja, über den Browser, der ohnehin auf dem Smartphone ist: Live-Streams, Alarme und der Nachweis der Rundgänge in einer responsiven Oberfläche, ohne Installation. So kann auch eine Vertretung schon in ihrer ersten Schicht mit dem eigenen Gerät arbeiten. Native Apps für iOS und Android sind in Entwicklung und stehen auf der Roadmap; die Browser-Oberfläche bleibt auch danach verfügbar.' },
];

export default function DePlattformPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Plattform' }]}>
      <FeatureHero
        eyebrow="Die Plattform"
        title="Ein Cloud-VMS mit einer Konsole für den gesamten Videobetrieb"
        lede={
          <>
            <strong className="font-semibold text-foreground">
              Die Camzify-Plattform ist ein KI-gestütztes Cloud-Videomanagementsystem: Live-Streaming,
              Cloud-Backup und Aufbewahrung, Alarme, Analysen, Benutzer- und Lizenzverwaltung sowie die
              Steuerung mehrerer Standorte in einem Login
            </strong>{' '}
            – mit 23 Erkennungsmodellen und dem{' '}
            <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützten Wächterrundgang</Link>{' '}
            als festem Bestandteil statt als nachträglichem Zusatz. Jedes der unten aufgeführten Module ist
            verfügbar und über dasselbe Dashboard erreichbar.
          </>
        }
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/platform/dashboard', label: 'Mit dem Dashboard beginnen' }}
        facts={['Elf Module, ein Login', 'Cloud, kein NVR vor Ort', 'Echte Screenshots, hell und dunkel']}
        visual={
          <ProductShot
            src="/product-dashboard"
            alt="Camzify-Dashboard mit Kameras online, offenen kritischen Ereignissen, Alarmen des Tages, Nachweis der Rundgänge, einem Live-Diagramm der Erkennungen und dem Zustand pro Standort"
            label="Dashboard · Camzify-Konsole"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        }
      />

      {/* How the modules fit together, before the grid, so the grid reads as a system */}
      <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">So greift es ineinander</span>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Vier Stationen eines Kamerastreams</h2>
                <p className="mt-5 max-w-prose text-body text-muted-foreground">
                  Ein Stream kommt an, wird angesehen und gespeichert, die Erkennung macht Ereignisse daraus,
                  eine Person wird benachrichtigt und handelt, und die Plattform hält all das fest. Die Module
                  sind die Stationen dieses einen Ablaufs, keine elf getrennten Werkzeuge. Die Aufzeichnungsebene
                  darunter beschreibt die Seite zum{' '}
                  <Link href="/de/cloud-videomanagementsystem" className="text-primary hover:underline">Cloud-Videomanagementsystem</Link>.
                  Wie es sich von einem rekorderbasierten System unterscheidet, zeigt{' '}
                  <Link href="/compare/camzify-vs-traditional-vms" className="text-primary hover:underline">Camzify im Vergleich zu klassischen VMS</Link>{' '}
                  (auf Englisch). Wenn der Begriff neu für Sie ist, lesen Sie zuerst die beiden englischsprachigen
                  Leitfäden dazu,{' '}
                  <Link href="/guides/what-is-a-cloud-vms" className="text-primary hover:underline">was ein Cloud-VMS ist</Link>{' '}
                  und{' '}
                  <Link href="/guides/cloud-vms-cost" className="text-primary hover:underline">wovon seine Kosten abhängen</Link>.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <figure
                role="img"
                aria-label="Ablauf: Ein Kamerastream wird angesehen und aufgezeichnet, Erkennungen werden ausgelöst, eine Person wird benachrichtigt und der Vorgang wird aufbewahrt"
                className="console-panel corner-ticks w-full min-w-0 max-w-full overflow-hidden"
              >
                <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2.5">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
                  </span>
                  <span className="font-mono text-mono-sm uppercase text-muted-foreground">Von der Kamera zum Nachweis</span>
                </div>
                <div className="p-5">
                  <ol className="grid gap-2 sm:grid-cols-4">
                    {flowSteps.map((s, i) => (
                      <li key={s} className="relative rounded-lg border border-border bg-muted/20 p-3">
                        <span className="font-mono text-mono-sm text-primary tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                        <span className="mt-1.5 block text-sm leading-snug">{s}</span>
                        {i < 3 && <ArrowRight aria-hidden="true" className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground sm:block" />}
                      </li>
                    ))}
                  </ol>
                </div>
                <figcaption className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
                  Oberflächenillustration mit Beispieldaten, keine Kundendaten.
                </figcaption>
              </figure>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Modules, grouped by job */}
      {groups.map((g, gi) => (
        <section key={g.heading} className={`py-16 sm:py-20 ${gi % 2 === 1 ? 'border-t border-border bg-muted/20' : ''}`}>
          <div className="mx-auto max-w-site px-6">
            <ScrollReveal>
              <div className="max-w-3xl">
                <span className="font-mono text-mono-sm uppercase text-primary">{String(gi + 1).padStart(2, '0')}</span>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">{g.heading}</h2>
                <p className="mt-3 max-w-prose text-muted-foreground">{g.blurb}</p>
              </div>
            </ScrollReveal>
            <div className={`mt-10 grid gap-6 sm:grid-cols-2 ${g.modules.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
              {g.modules.map((m, i) => {
                const Icon = m.icon;
                return (
                  <ScrollReveal key={m.href} delay={i * 0.05}>
                    <Link
                      href={m.href}
                      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="aspect-video w-full overflow-hidden border-b border-border bg-muted/30">
                        <SiteImage
                          src={m.image}
                          alt={`Vorschau der Ansicht ${m.title}`}
                          className="h-full w-full object-cover object-top transition-transform duration-slow group-hover:scale-[1.02]"
                          width={1229}
                          height={692}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-display text-base font-bold transition-colors group-hover:text-primary">{m.title}</h3>
                          <span className="rounded-lg bg-primary/10 p-2"><Icon className="h-4 w-4 text-primary" aria-hidden="true" /></span>
                        </div>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition-opacity duration-normal group-hover:opacity-100">
                          {m.english ? 'Modul öffnen (auf Englisch)' : 'Modul öffnen'} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* The two things that are not modules but sit on top of every one */}
      <section className="border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              { title: '23 KI-Erkennungsmodelle', desc: 'Jede Erkennung löst erst bei einer bestätigten Objektspur aus und landet in derselben Alarm-Warteschlange: Eindringen, Kamerasabotage, Waffen, Feuer, PSA und Verhaltensweisen, die Sie in einfacher Sprache beschreiben.', href: '/de/ki-funktionen', label: 'KI-Funktionen' },
              { title: 'KI-gestützter Wächterrundgang', desc: 'Geplante Rundgänge mit einer Checkliste pro Kamera, Vorher-nachher-Nachweis für alles, was behoben wurde, und jedes Mal ein Kontrollprotokoll.', href: '/de/ki-waechterrundgang', label: 'KI-gestützter Wächterrundgang' },
            ].map((c) => (
              <ScrollReveal key={c.href}>
                <Link href={c.href} className="group flex h-full flex-col rounded-xl border border-primary/30 bg-card p-8 shadow-lg shadow-primary/5 transition-all duration-normal hover:-translate-y-1 hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <h2 className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">{c.title}</h2>
                  <p className="mt-3 flex-1 max-w-prose text-body text-muted-foreground">{c.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary">{c.label} <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <FaqSection items={faqs} locale="de" inline className="!mt-0" eyebrow="Häufige Fragen" heading="Fragen zur Plattform" />
        </div>
      </section>
    </PageShell>
  );
}
