import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import { FeatureHero } from '@/components/content/feature-hero';
import { PhotoFigure } from '@/components/content/photo-figure';
import { SectionVisual } from '@/components/content/section-visual';
import { SiteImage } from '@/components/content/site-image';
import Link from 'next/link';
import { Calendar, Clock, Repeat, ArrowRight, ShieldAlert, Camera, Eye, HelpCircle, CheckCircle } from 'lucide-react';

/**
 * German counterpart of /virtual-patrolling/automated-patrol-scheduling. Page identity
 * is declared once and consumed by generatePageMeta and PageShell.
 */
const pageMeta = {
  title: 'Automatische Planung von Kontrollgängen',
  description: 'Planen Sie KI-Kontrollgänge nach Häufigkeit, aktiven Stunden und Tagen. Camzify führt jeden Rundgang unbeaufsichtigt durch und mailt das PDF-Protokoll.',
  path: '/de/ki-waechterrundgang/automatische-planung',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  { question: 'Prüft ein automatischer Rundgang nur die Punkte auf der Checkliste?', answer: 'Nein. Er arbeitet die Checkliste ab und bewertet jeden Kontrollpunkt zusätzlich eigenständig auf Gefährdungen und Sicherheitsrisiken. Für alles, was er dabei findet, löst er eine kritische Benachrichtigung aus, auch wenn kein Checklistenpunkt es abgedeckt hat. Eine Checkliste kann nur fragen, woran jemand beim Anlegen des Rundgangsablaufs gedacht hat, und die wertvollen Funde eines Rundgangs stehen oft nicht darauf: ein zugestellter Notausgang, eine unbeaufsichtigte Tasche, Rauch, eine Person an einem Ort, an dem sie nicht sein sollte.' },
  { question: 'Wird die Wachperson bei einem nicht erfüllten Punkt ohne Freigabe benachrichtigt?', answer: 'Bei einem automatischen Rundgang ja. Die Benachrichtigung geht noch während des Rundgangs an die Wachperson, die dieser Kamera zugewiesen ist, ohne dass ein Operator dazwischengeschaltet ist. Genau dafür läuft der Rundgang um 3 Uhr nachts. Bei einem manuellen Rundgang sieht der Operator ohnehin auf die Kamera; die Nachricht wird ihm deshalb angeboten statt automatisch verschickt, und er kann sie senden, überspringen oder später vom selben Punkt aus senden.' },
  { question: 'Was ist Szenenbeobachtung beim automatischen Wächterrundgang?', answer: 'Mit ihr bewertet ein automatischer Rundgang eine Kamera anhand eines kurzen Ausschnitts des Live-Videos von ein bis drei Sekunden statt anhand eines einzelnen Standbilds. Ein Bild zeigt, dass jemand im Flur ist; ein paar Sekunden zeigen, ob die Person durchgegangen oder stehen geblieben ist. Das Einzelbild ist schneller und richtig für statische Prüfungen wie ein Tor oder ein Rolltor. Die Beobachtung lohnt die zusätzlichen Sekunden überall dort, wo Menschen im Spiel sind, denn sie verhindert, dass ein Rundgang eine Wachperson weckt, nur weil jemand an einer Kamera vorbeigeht.' },
  { question: 'Fühlt sich ein automatischer Rundgang anders an als ein Kontrollgang vor Ort?', answer: 'Er deckt denselben Ablauf mit denselben Prüfungen zu denselben Zeiten ab und findet, anders als ein Kontrollgang vor Ort, in der vierten Nacht um 3 Uhr genauso zuverlässig statt wie in der ersten. Was er nicht tut, ist eingreifen. Er beobachtet, bewertet, benachrichtigt die zuständige Wachperson und legt den Nachweis ab, sodass ein Mensch zu den Dingen geschickt wird, die einen Menschen brauchen, statt zu allem.' },
  { question: 'Können Kameras im selben Rundgangsablauf unterschiedlichen Zeitplänen folgen?', answer: 'Nein. Ein Rundgangsablauf läuft als Einheit; alle Kameras darin werden gemeinsam nach demselben Zeitplan geprüft. Brauchen zwei Kameragruppen unterschiedliche Häufigkeiten oder aktive Stunden, teilen Sie sie in getrennte Rundgangsabläufe mit jeweils eigenem Zeitplan auf.' },
  { question: 'Was passiert, wenn ein geplanter Rundgang noch läuft, während der nächste fällig wird?', answer: 'Der laufende Rundgang schließt seine verbleibenden Kontrollpunkte ab, bevor der nächste geplante Start zugelassen wird. Rundgänge überschneiden sich also nicht und stauen sich nicht auf. Bei einer engen Taktung sollte genug Zeit bleiben, damit ein vollständiger Rundgang durchlaufen kann.' },
  { question: 'Kann ich einen Zeitplan pausieren, ohne seine Konfiguration zu verlieren?', answer: 'Ja. Beim Pausieren bleiben Häufigkeit, aktive Stunden und aktive Tage genau so erhalten, wie sie eingestellt sind. Solange der Zeitplan pausiert ist, startet kein Rundgang; beim Fortsetzen läuft er unverändert weiter.' },
  { question: 'Berücksichtigt die automatische Planung Feiertage?', answer: 'Ja. Bestimmte Tage lassen sich als Ausnahmen markieren, sodass der Zeitplan sie überspringt, ohne dass er neu angelegt oder danach wieder aktiviert werden muss.' },
  { question: 'Wer erhält das Protokoll eines geplanten Rundgangs?', answer: 'Alle, die für diesen Standort als Empfänger eingetragen sind. Das PDF-Protokoll wird automatisch per E-Mail verschickt, sobald der Rundgang endet; es ist kein manueller Schritt nötig, um es zu erstellen oder zu versenden.' },
];

/*
 * The English page shows the SceneObservation component here. It renders English
 * explanatory sentences with no prop to override them, so its resolved state (the one
 * it shows under prefers-reduced-motion, which carries the meaning) is written here in
 * German with the same corridor frames (docs/I18N.md, "Prose in shared components").
 */
function SzenenbeobachtungVergleich() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <span className="font-mono text-mono-sm uppercase text-muted-foreground">Einzelbild</span>
        </div>
        <p className="mt-1 text-sm font-medium">Ein Standbild je Kontrollpunkt</p>
        <div className="relative mt-4 overflow-hidden rounded-lg border border-border">
          <SiteImage
            src="/scene-single-frame"
            alt="Flurkamera mit einer Person in der Mitte des Flurs"
            width={480}
            height={270}
            sizes="(max-width: 768px) 100vw, 480px"
            className="w-full"
          />
          <span className="absolute right-2 top-2 rounded bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
            00:00
          </span>
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-warn/30 bg-warn/5 p-3">
          <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-warn" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-warn">Jemand ist im Flur.</span> Geht die Person
            durch, oder steht sie dort? Ein einzelnes Bild kann das nicht sagen: Es weckt entweder
            eine Wachperson umsonst oder lässt einen echten Vorfall durch.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-primary/30 bg-card p-5 shadow-lg shadow-primary/5">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="font-mono text-mono-sm uppercase text-primary">Eine Weile beobachten</span>
        </div>
        <p className="mt-1 text-sm font-medium">Einige Sekunden Live-Video je Kontrollpunkt</p>
        <div className="relative mt-4 overflow-hidden rounded-lg border border-border">
          <SiteImage
            src="/scene-watch-04"
            alt="Derselbe Flur einige Sekunden später, die Person geht hinaus"
            width={480}
            height={270}
            sizes="(max-width: 768px) 100vw, 480px"
            className="w-full"
          />
          <span className="absolute right-2 top-2 rounded bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-primary backdrop-blur-sm">
            00:03
          </span>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-primary" aria-hidden="true" />
        </div>
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-live/30 bg-live/5 p-3">
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-live" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-live">Durchgegangen und hinaus.</span> Flur frei,
            Checklistenpunkt erfüllt, niemand geweckt. Dasselbe Beobachtungsfenster erfasst auch
            die Person, die nicht wieder geht.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DeKiWaechterrundgangAutomatischePlanungPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'KI-Wächterrundgang', href: '/de/ki-waechterrundgang' },
      { label: 'Automatische Planung' },
    ]}>
      <FeatureHero
        eyebrow="Automatische Planung"
        title="Automatische Planung von Kontrollgängen"
        lede={<>Automatische Planung bedeutet, dass <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">virtuelle Kontrollgänge</Link> in
            einer festgelegten Häufigkeit, zu bestimmten aktiven Stunden und an ausgewählten Wochentagen
            laufen, vollständig unbeaufsichtigt. Das System übernimmt jeden Rundgang, von der ersten Kamera
            bis zum fertigen Protokoll.</>}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/ki-waechterrundgang/risikoerkennung', label: 'Risikoerkennung beim Rundgang' }}
        visual={<PhotoFigure src="/vp-automated-patrol-scheduling-1.png" alt="Auto-Patrol-Einstellungen in der Camzify-Konsole: Szenenbeobachtung, Häufigkeit, aktive Stunden und aktive Tage" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { icon: Repeat, title: 'Häufigkeit', desc: 'Legen Sie fest, wie oft Rundgänge laufen: alle 30 Minuten, stündlich, alle 2 Stunden. Das System hält den Zeitplan genau ein.' },
              { icon: Clock, title: 'Aktive Stunden', desc: 'Bestimmen Sie das Zeitfenster, in dem Rundgänge aktiv sind. Nur nachts, zu Geschäftszeiten oder rund um die Uhr, passend zu Ihrem Betrieb.' },
              { icon: Calendar, title: 'Aktive Tage', desc: 'Wählen Sie, an welchen Wochentagen der Zeitplan gilt. Nur werktags, nur am Wochenende oder jeden Tag.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 font-display text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Warum Planung zählt</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Warum automatische Planung wichtig ist</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Kontrollgänge vor Ort hängen davon ab, dass jemand daran denkt, sie durchzuführen. Ein geplanter Rundgang fällt aus, wenn ein Standort unterbesetzt ist, wenn andere Einsätze Vorrang haben oder schlicht, wenn niemand auf den schriftlichen Plan schaut. Die Lücke in der Absicherung fällt erst auf, wenn etwas passiert und niemand sagen kann, wann der Bereich zuletzt kontrolliert wurde.</p>
                <p>Virtuelle Kontrollgänge von Hand zu starten, hat dieselbe Schwäche in anderer Form. Jemand muss sich weiterhin anmelden und den Rundgang zur richtigen Zeit starten, jedes Mal und an jedem Standort. Das funktioniert, bis es eben nicht mehr funktioniert.</p>
                <p>Die automatische Planung macht Sie vollständig unabhängig davon, dass jemand daran denkt. Sind Häufigkeit, aktive Stunden und aktive Tage einmal eingestellt, startet jeder Rundgang pünktlich und unbeaufsichtigt, ob dienstags um 3 Uhr nachts oder an einem Tag, auf den gerade niemand geachtet hat.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">So läuft es ab</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Was bei einem Auto-Patrol-Rundgang passiert</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">01</span><span>Der Zeitplan startet den Rundgang zur eingestellten Zeit</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">02</span><span>Das System geht jede Kamera im <Link href="/virtual-patrolling/patrol-sequences" className="text-primary hover:underline">Rundgangsablauf</Link> (Englisch) durch</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">03</span><span>Jeder <Link href="/de/ki-waechterrundgang/checklisten" className="text-primary hover:underline">Checklistenpunkt</Link> wird automatisch bewertet</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">04</span><span>Nicht erfüllte Punkte benachrichtigen die zuständige Wachperson automatisch – kein Operator muss die Nachricht freigeben</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">05</span><span>Gefährdungen und Sicherheitsrisiken an einem Kontrollpunkt lösen eine kritische Benachrichtigung aus, ob ein Checklistenpunkt sie abdeckt oder nicht</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">06</span><span>Das PDF-<Link href="/de/ki-waechterrundgang/kontrollprotokolle" className="text-primary hover:underline">Kontrollprotokoll</Link> geht per E-Mail an die festgelegten Empfänger</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">07</span><span>Der Rundgang wird mit seiner <Link href="/de/ki-waechterrundgang/digitales-wachbuch" className="text-primary hover:underline">Erfüllungsquote</Link> protokolliert</span></li>
                </ul>
              </div>
            </ScrollReveal>
            <PhotoFigure src="/vp-automated-patrol-scheduling-2.png" alt="Das Auto-Patrol-Panel mit Zeitplan- und Protokolloptionen" caption="Auto-Patrol-Einstellungen, wie sie in der Konsole erscheinen: Häufigkeit, aktive Stunden, aktive Tage und Protokollversand." />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Konfiguration</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Szenenbeobachtung: Bewertung über mehr als ein Bild</h2>
                <p className="mt-4 max-w-prose text-muted-foreground">
                  <strong className="font-semibold text-foreground">
                    Ein automatischer Rundgang kann eine Kamera anhand eines kurzen Ausschnitts des
                    Live-Videos bewerten statt anhand eines einzelnen Standbilds.
                  </strong>{' '}
                  Die Szenenbeobachtung verfolgt das Bild eine, zwei oder drei Sekunden lang, bevor sie
                  entscheidet. Ein einzelnes Bild genügt, um zu sehen, ob ein Rolltor unten ist, aber
                  nicht, ob eine Person im Bild durchgeht oder sich dort aufhält – eine Prüfung, die
                  einen Moment Kontext braucht, um richtig entschieden zu werden.
                </p>
                <p className="mt-4 max-w-prose text-muted-foreground">
                  Das Einzelbild ist die schnellere Variante und die richtige Wahl für alles Statische:
                  ein Tor, eine Schranke, ein Rolltor. Die Beobachtung kostet je Kontrollpunkt etwas mehr
                  Zeit und macht das bei allem wett, was mit Menschen zu tun hat. Dort lautet die Frage
                  fast nie „Ist jemand da?“, sondern „Ist noch jemand da?“.
                </p>

                <div className="mt-8">
                  <SzenenbeobachtungVergleich />
                </div>

                <div className="mt-16 rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="font-mono text-mono-sm uppercase text-primary">Über die Checkliste hinaus</span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold">Risiken, an die beim Anlegen niemand gedacht hat</h2>
                  <p className="mt-4 max-w-prose text-muted-foreground">
                    <strong className="font-semibold text-foreground">
                      Eine Checkliste kann nur fragen, woran Sie gedacht haben.
                    </strong>{' '}
                    Ein automatischer Rundgang bewertet jeden Kontrollpunkt zusätzlich eigenständig auf
                    Gefährdungen und Sicherheitsrisiken und löst eine kritische Benachrichtigung aus,
                    wenn er eines findet, ob ein Checklistenpunkt es abdeckt oder nicht.
                  </p>
                  <PointList items={[
                    'Der zugestellte Notausgang muss beim Anlegen des Rundgangsablaufs nicht vorhergesehen worden sein.',
                    'Die unbeaufsichtigte Tasche braucht keinen eigenen Checklistenpunkt.',
                    'Der Rauch muss nicht auf der Liste gestanden haben.',
                    'Die Person an einem Ort, an dem sie nicht sein sollte, wird gemeldet, ohne dass jemand danach gefragt hat.',
                  ]} />
                  <p className="mt-4 max-w-prose text-muted-foreground">
                    Entscheidend ist, wann die Meldung kommt. Eine aufgekeilte Tür oder ein zugestellter
                    Ausgang ist eine Weile ein Risiko, bevor daraus ein Vorfall wird, und in diesem
                    Zeitfenster lässt es sich mit wenig Aufwand beheben. Ein Rundgang, der nur die Fragen
                    auf der Liste beantwortet, geht an allem anderen vorbei; dieser meldet es, solange es
                    noch ein Zustand ist.
                  </p>
                  <p className="mt-4 max-w-prose text-muted-foreground">
                    <strong className="font-semibold text-foreground">
                      Beide Bewertungen werden an jedem Kontrollpunkt ins Protokoll geschrieben, nicht nur,
                      wenn etwas gefunden wird.
                    </strong>{' '}
                    Dazu hält jede Kamera eine Beschreibung der Szene in einfacher Sprache fest, die Zahl
                    der anwesenden Personen und die im Bild erkannten Objekte – so lässt sich ein
                    Risikoeintrag mit dem abgleichen, was die Kamera tatsächlich gesehen hat.
                  </p>
                  <p className="mt-4 max-w-prose text-muted-foreground">
                    Mehr dazu, was das abdeckt und wo es hingehört:{' '}
                    <Link href="/de/ki-waechterrundgang/risikoerkennung" className="text-primary hover:underline">KI-Risikoerkennung beim Rundgang</Link>.
                    Die Meldungen kommen als{' '}
                    <Link href="/de/plattform/alarme-und-benachrichtigungen" className="text-primary hover:underline">kritische Benachrichtigungen</Link>{' '}
                    in derselben Warteschlange an wie die{' '}
                    <Link href="/de/ki-funktionen" className="text-primary hover:underline">KI-Erkennungen</Link> aus
                    der Daueranalyse, mit angehängtem Bild und der Erwartung, dass sie quittiert werden.
                  </p>
                </div>

                <h2 className="mt-16 font-display text-2xl font-bold">Zeitzone, Feiertage, Pausieren und Fortsetzen</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Zeitpläne laufen in der Ortszeit des Standorts, nicht in der Standardeinstellung des Kontos, sodass Einsätze über mehrere Zeitzonen hinweg genau bleiben</li>
                  <li className="flex gap-2">• Markieren Sie bestimmte Tage als Ausnahmen, damit der Zeitplan Feiertage oder Schließtage überspringt, ohne neu angelegt zu werden</li>
                  <li className="flex gap-2">• Pausieren Sie einen Zeitplan während Wartungsarbeiten und setzen Sie ihn später mit unveränderter Häufigkeit, Stunden und Tagen fort</li>
                  <li className="flex gap-2">• Der nächste geplante Start jedes Rundgangsablaufs ist in der Zeitplanübersicht auf einen Blick zu sehen</li>
                </ul>
              </div>
            </ScrollReveal>
            <SectionVisual locale="de" variant="flow" caption="Ausnahmen im Zeitplan" steps={['Läuft in der Zeitzone des Standorts', 'Feiertage markieren', 'Für Wartung pausieren', 'Mit gleichen Einstellungen fortsetzen']} alt="Konfiguration für Zeitzone, Feiertagsausnahmen sowie Pausieren und Fortsetzen eines Rundgangszeitplans" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <SectionVisual locale="de" variant="flow" caption="Zustellung nach dem Rundgang" alt="Ablauf: Ein geplanter Rundgang endet, Protokoll und Benachrichtigungen werden zugestellt" steps={['Zeitplan startet', 'Rundgang läuft unbeaufsichtigt', 'Wachperson bei Fehler benachrichtigt', 'Protokoll gemailt und abgelegt']} />
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Nach dem Rundgang</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Empfänger und Eskalation bei geplanten Rundgängen</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Ein Verteiler je Standort legt fest, wer das PDF-<Link href="/de/ki-waechterrundgang/kontrollprotokolle" className="text-primary hover:underline">Kontrollprotokoll</Link> erhält, sobald ein Rundgang endet</li>
                  <li className="flex gap-2">• Jeder nicht erfüllte Punkt löst weiterhin die übliche Benachrichtigung der Wachperson aus, ob geplant oder manuell</li>
                  <li className="flex gap-2">• Ein ausgelassener oder überfälliger Rundgang wird im <Link href="/de/ki-waechterrundgang/digitales-wachbuch" className="text-primary hover:underline">digitalen Wachbuch</Link> genauso markiert wie ein versäumter manueller Rundgang</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <FaqSection items={faqs} locale="de" inline />

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Weiterlesen</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/de/ki-waechterrundgang/kontrollprotokolle" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Kontrollprotokolle <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/use-cases/after-hours-monitoring" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Überwachung außerhalb der Geschäftszeiten (Englisch) <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/de/branchen/lager-und-logistik" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Lager und Logistik <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/de/preise" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Preise <ArrowRight className="h-3 w-3" /></Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
