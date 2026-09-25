import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { SectionVisual, type SectionVisualVariant } from '@/components/content/section-visual';
import { SiteImage } from '@/components/content/site-image';
import { howToSchema } from '@/lib/seo';
import Link from 'next/link';
import { Wifi, Route, ClipboardCheck, Calendar, Cpu, FileText } from 'lucide-react';

/**
 * German counterpart of /virtual-patrolling/how-it-works. Page identity is declared
 * once and consumed by generatePageMeta and PageShell, as on the English page.
 */
const pageMeta = {
  title: 'So funktioniert der KI-Wächterrundgang',
  description: 'So läuft ein virtueller Kontrollgang ab: Kameras anbinden, Rundgangsablauf anlegen, Checklisten und Wachpersonen zuweisen, planen, prüfen, protokollieren.',
  path: '/de/ki-waechterrundgang/so-funktioniert-es',
};

export const metadata = generatePageMeta(pageMeta);

/**
 * Steps are declared once and used twice: rendered on the page and emitted as HowTo
 * schema, so the visible instructions and the structured data cannot drift apart.
 */
type Step = {
  icon: typeof Wifi;
  name: string;
  text: string;
  image?: string;
  imageAlt?: string;
  visual?: SectionVisualVariant;
};

const steps: Step[] = [
  { icon: Wifi, name: 'Kameras anbinden', text: 'Jede IP-Kamera wird über eine von drei Verbindungsarten angebunden: RTSP, RTMP oder HTTPS. Ein aus dem Internet erreichbarer RTSP-Stream wird direkt verbunden; Kameras in einem privaten Netzwerk laufen über den Camzify Connector, ohne Portweiterleitung. Die Streamqualität wird beim Verbinden automatisch erkannt.', image: '/vp-how-it-works-step-1.png', imageAlt: 'Die Kamerakonfiguration mit Kameras, die über RTSP, RTMP und HTTPS hinzugefügt wurden' },
  { icon: Route, name: 'Rundgangsablauf anlegen', text: 'Legen Sie eine geordnete Liste von Kameras fest, die die Route bildet. Jeder Rundgangsablauf entspricht einem tatsächlichen Weg über den Standort – Haupttor, Laderampe, Serverflur, Perimeter –, und ein Standort kann mehrere gleichzeitig betreiben.', image: '/vp-how-it-works-step-2.png', imageAlt: 'Ein Rundgangsablauf wird angelegt: Kameras in Reihenfolge, mit einer Checkliste je Kontrollpunkt' },
  { icon: ClipboardCheck, name: 'Checklisten und Wachpersonen zuweisen', text: 'Schreiben Sie für jede Kamera im Rundgangsablauf die Checklistenpunkte, gegen die sie geprüft wird, etwa „Tor vollständig geschlossen“ oder „Keine Sichtbehinderung“, und benennen Sie die zuständige Wachperson samt der Nachricht, die sie erhält, wenn ein Punkt nicht erfüllt ist.', visual: 'checklist' as const, image: '/vp-how-it-works-step-3.png', imageAlt: 'Checklistenpunkte und die zu benachrichtigende Wachperson, einem Kamera-Kontrollpunkt zugewiesen' },
  { icon: Calendar, name: 'Planen oder von Hand starten', text: 'Auto-Patrol läuft nach Häufigkeit, aktiven Stunden und aktiven Tagen in der Zeitzone des Standorts. Ein manueller Rundgang lässt sich jederzeit starten. In beiden Fällen folgt der Rundgang demselben Ablauf und prüft dieselben Punkte.', visual: 'schedule' as const, image: '/vp-how-it-works-step-4.png', imageAlt: 'Auto-Patrol-Einstellungen: Szenenbeobachtung, Häufigkeit, aktive Stunden und Tage' },
  { icon: Cpu, name: 'Die KI führt den Rundgang durch', text: 'Das System geht jede Kamera durch, bewertet jeden Punkt anhand eines Einzelbilds oder eines kurzen Ausschnitts des Live-Videos, hält seine Begründung fest, benachrichtigt bei jedem Fehler die zuständige Wachperson und meldet Gefährdungen und Sicherheitsrisiken, die es sieht, auch wenn kein Checklistenpunkt danach gefragt hat.', visual: 'notification' as const, image: '/vp-how-it-works-step-5.png', imageAlt: 'Ein laufender Rundgang: Die KI bewertet einen Checklistenpunkt anhand des Live-Bilds' },
  { icon: FileText, name: 'Protokoll und Verlauf', text: 'Zu jeder Runde wird ein Kontrollprotokoll abgelegt: jede Prüfung, das Bild hinter jedem Ergebnis, Vorher- und Nachher-Bilder bei allem, was behoben wurde, und eine Gesamtquote. Der Rundgang wird im Verlauf als Completed, Flagged oder Overdue (abgeschlossen, mit Befund, überfällig) geführt und lässt sich nach Rundgangsablauf, Standort oder Status filtern.', visual: 'report' as const, image: '/vp-how-it-works-step-6.png', imageAlt: 'Der Rundgangsverlauf und das Kontrollprotokoll zu einem abgeschlossenen Rundgang' },
];

const faqs = [
  { question: 'Wie lange dauert die Einrichtung des KI-gestützten Wächterrundgangs?', answer: 'Das hängt davon ab, wie viele Kameras und Checklistenpunkte beteiligt sind. Die sechs Schritte oben sind aber so angelegt, dass sie sich für einen typischen Standort in einem Durchgang erledigen lassen. Das Anbinden der Kameras geht meist am schnellsten; das Schreiben der Checklisten je Kamera dauert in der Regel am längsten, weil Sie dort festlegen, worauf es an jedem Kontrollpunkt tatsächlich ankommt.' },
  { question: 'Müssen die sechs Schritte in dieser Reihenfolge erledigt werden?', answer: 'Kameras müssen angebunden sein, bevor sie in einen Rundgangsablauf aufgenommen werden können, und ein Rundgangsablauf muss bestehen, bevor ihm Checklisten und Wachpersonen zugewiesen werden können. Darüber hinaus lassen sich spätere Schritte wie die Planung jederzeit wieder aufrufen und anpassen.' },
  { question: 'Was passiert, wenn ein Schritt ausgelassen wird, etwa die Zuweisung einer Wachperson?', answer: 'Eine Kamera ohne zugewiesene Wachperson kann trotzdem in einen Rundgangsablauf aufgenommen und geprüft werden, aber es gibt niemanden, der benachrichtigt wird, wenn ein Punkt als Not Compliant (nicht erfüllt) zurückkommt. Weisen Sie jeder Kamera eine Wachperson zu, bevor Sie sich für die tatsächliche Absicherung auf einen Rundgangsablauf verlassen.' },
  { question: 'Brauche ich technisches Personal für die Einrichtung?', answer: 'Nein. Eine Kamera wird angebunden, indem Sie ihre Streamdaten eintragen. Alles Weitere – Rundgangsabläufe anlegen, Checklistenpunkte schreiben, Wachpersonen zuweisen, Rundgänge planen – erledigen Sie in denselben Konfigurationsansichten, ohne Programmier- oder Netzwerkkenntnisse.' },
  { question: 'Kann ich etwas ändern, nachdem ein Rundgangsablauf aktiv ist?', answer: 'Ja. Kameras, Checklistenpunkte, Zuweisungen von Wachpersonen und der Zeitplan lassen sich jederzeit bearbeiten. Änderungen gelten ab dem nächsten Rundgang, sodass ein aktiver Rundgangsablauf nie aufgelöst werden muss, um ihn anzupassen.' },
  { question: 'Was ist der Unterschied zwischen einem manuellen und einem automatischen Rundgang?', answer: 'Einen manuellen Rundgang geht ein Operator Kamera für Kamera durch und trifft jede Bewertung anhand des Live-Bilds. Ein automatischer Rundgang folgt demselben Ablauf nach Zeitplan; die KI übernimmt die Bewertung, hält ihre Begründung fest, benachrichtigt die Wachpersonen selbst und legt das Protokoll ab, ohne dass jemand anwesend ist. Die meisten Standorte nutzen automatische Rundgänge für die Häufigkeit und manuelle Rundgänge, wenn ein Mensch genau hinsehen muss.' },
];

/*
 * Hero visual. The English page uses HeroPlaceholder, whose caption and labels are
 * English prose with no prop to override the caption, so the same console-framed
 * camera wall is written here in German (docs/I18N.md, "Prose in shared components").
 */
const heroFrames = [
  { src: '/hero-cam-main-gate-640.webp', id: 'KAM 01', loc: 'Haupttor' },
  { src: '/hero-cam-loading-dock-640.webp', id: 'KAM 04', loc: 'Laderampe' },
  { src: '/hero-cam-server-room-640.webp', id: 'KAM 09', loc: 'Serverflur' },
  { src: '/hero-cam-parking-lot-640.webp', id: 'KAM 02', loc: 'Parkplatz A' },
];

function HeroCameraWall() {
  return (
    <figure
      role="img"
      aria-label="Ein Rundgangsablauf mit vier Kameras, das Haupttor ist der aktuelle Kontrollpunkt"
      className="console-panel corner-ticks w-full min-w-0 max-w-full overflow-hidden"
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
        </span>
        <span className="font-mono text-mono-sm uppercase text-muted-foreground">Perimeterrunde · 4 Kontrollpunkte</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-live">
          <span className="h-1.5 w-1.5 rounded-full bg-live motion-safe:animate-pulse-dot" aria-hidden="true" />
          Live
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3">
        {heroFrames.map((f, i) => {
          const isActive = i === 0;
          return (
            <div
              key={f.id}
              className={`camera-tile-frame relative overflow-hidden rounded-lg border ${isActive ? 'border-primary/60' : 'border-border'}`}
            >
              <img
                src={f.src}
                alt={`Kamera ${f.loc}`}
                width={480}
                height={270}
                loading={i === 0 ? 'eager' : 'lazy'}
                className={`aspect-video h-full w-full object-cover ${isActive ? 'opacity-95' : 'opacity-75'}`}
              />
              <div aria-hidden="true" className="camera-tile-scrim absolute inset-0" />
              <div className="camera-tile absolute inset-0 flex flex-col justify-between p-2.5">
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-[10px] uppercase tracking-wider ${isActive ? 'text-live' : 'camera-tile-label'}`}>{f.id}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />}
                </div>
                <span className="font-mono camera-tile-label text-[9px] uppercase tracking-wider">{f.loc}</span>
              </div>
            </div>
          );
        })}
      </div>
      <figcaption className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
        Konsolenansicht mit Beispielkameras. Illustration der Oberfläche, keine Kundenaufnahmen.
      </figcaption>
    </figure>
  );
}

export default function DeKiWaechterrundgangSoFunktioniertEsPage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[howToSchema({
        name: 'So funktioniert der KI-gestützte Wächterrundgang',
        description: pageMeta.description,
        path: pageMeta.path,
        steps: steps.map((s) => ({ name: s.name, text: s.text })),
      })]}
      breadcrumbs={[{ label: 'KI-Wächterrundgang', href: '/de/ki-waechterrundgang' }, { label: 'So funktioniert es' }]}
    >
      <FeatureHero
        eyebrow="Schritt für Schritt"
        title="So funktioniert der KI-gestützte Wächterrundgang"
        lede={
          <>
            <strong className="font-semibold text-foreground">
              Der KI-gestützte Wächterrundgang führt geplante KI-Kontrollgänge über Ihre vorhandenen Kameras durch.
            </strong>{' '}
            Hier sehen Sie genau, wie ein Rundgang von der Kameraanbindung bis zum
            Kontrollprotokoll verläuft, in den sechs Schritten, denen das Produkt tatsächlich
            folgt – und was jeder davon liefert.
          </>
        }
        primary={{ href: '/book-a-demo', label: 'Auf Ihren Kameras ansehen' }}
        secondary={{ href: '/guides/how-to-run-a-virtual-patrol-round', label: 'Selbst einen Rundgang durchführen (Englisch)' }}
        facts={['Sechs Schritte', 'Keine neue Hardware', 'Ab dem ersten Rundgang live']}
        visual={<HeroCameraWall />}
      />

      <section className="border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ol className="space-y-16 lg:space-y-20">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const imageFirst = i % 2 === 1;
              return (
                <li key={step.name}>
                  <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                    <ScrollReveal className={imageFirst ? 'lg:order-2' : ''}>
                      <div>
                        <div className="flex items-center gap-4">
                          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-sm font-medium text-primary tabular-nums">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-primary/40 via-border to-transparent" />
                          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        <h2 className="mt-6 font-display text-2xl font-bold tracking-tight">{step.name}</h2>
                        <p className="mt-4 max-w-prose text-body leading-relaxed text-muted-foreground">{step.text}</p>
                      </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.08} className={imageFirst ? 'lg:order-1' : ''}>
                      {step.image ? (
                        <div className="overflow-hidden rounded-xl">
                          <SiteImage src={step.image} alt={step.imageAlt ?? step.name} className="w-full" width={1229} height={692} priority={i === 0} sizes="(max-width: 1024px) 100vw, 50vw" />
                        </div>
                      ) : (
                        <SectionVisual locale="de" variant={step.visual ?? 'flow'} caption={`Schritt ${i + 1} · ${step.name}`} alt={`Illustration zu Schritt ${i + 1}: ${step.name}`} />
                      )}
                    </ScrollReveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <FaqSection items={faqs} locale="de" inline className="!mt-0" eyebrow="Häufige Fragen" heading="Fragen zur Einrichtung" />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-site px-6">
          <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Weiterlesen</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              ['Rundgangsabläufe (Englisch)', '/virtual-patrolling/patrol-sequences'], ['Checklisten', '/de/ki-waechterrundgang/checklisten'],
              ['Automatische Planung', '/de/ki-waechterrundgang/automatische-planung'], ['Kontrollprotokolle', '/de/ki-waechterrundgang/kontrollprotokolle'],
              ['Risikoerkennung', '/de/ki-waechterrundgang/risikoerkennung'], ['Preise', '/de/preise'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="rounded-lg border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/30 hover:text-primary">{label}</Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
