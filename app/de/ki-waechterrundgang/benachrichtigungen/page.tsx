import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { PhotoFigure } from '@/components/content/photo-figure';
import { SectionVisual } from '@/components/content/section-visual';
import Link from 'next/link';
import { Bell, User, MessageSquare, ArrowRight, AlertTriangle } from 'lucide-react';

/**
 * German counterpart of /virtual-patrolling/guard-notifications. Page identity is
 * declared once and consumed by generatePageMeta and PageShell.
 */
const pageMeta = {
  title: 'Automatische Benachrichtigung der Wachperson',
  description: 'Ist ein Checklistenpunkt nicht erfüllt, benachrichtigt Camzify automatisch die dieser Kamera zugewiesene Wachperson, mit einer vorformulierten Nachricht.',
  path: '/de/ki-waechterrundgang/benachrichtigungen',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  { question: 'Werde ich nur zu Punkten auf der Checkliste benachrichtigt?', answer: 'Nein. Ein automatischer Rundgang löst auch kritische Benachrichtigungen für Gefährdungen und Sicherheitsrisiken aus, die er an einem Kontrollpunkt beobachtet, selbst wenn kein Checklistenpunkt sie abdeckt; siehe Risikoerkennung beim Rundgang. Diese Meldungen kommen über dieselben Kanäle wie ein nicht erfüllter Checklistenpunkt und müssen genauso quittiert werden.' },
  { question: 'Wird die Benachrichtigung automatisch verschickt, oder muss jemand sie freigeben?', answer: 'Das hängt davon ab, bei welcher Art von Rundgang das Problem gefunden wurde. Bei einem automatischen Rundgang wird sie automatisch verschickt, noch während der Rundgang läuft, ohne dass jemand dazwischengeschaltet ist. Genau darum geht es bei einem Rundgang um 3 Uhr nachts. Bei einem manuellen Rundgang sieht der Operator ohnehin auf die Kamera; die Nachricht wird ihm deshalb mit bereits eingesetzten Einzelheiten angeboten, und er entscheidet, ob er sie sendet, überspringt oder später vom selben Punkt aus sendet.' },
  { question: 'Was passiert, wenn die zuständige Wachperson nicht auf eine Benachrichtigung reagiert?', answer: 'Quittiert die Wachperson die Meldung nicht innerhalb des eingestellten Zeitfensters, wird sie automatisch an einen Vertreter oder an die Objektleitung eskaliert. Ein Fehler bleibt nie davon abhängig, ob eine einzelne Person gerade erreichbar ist.' },
  { question: 'Kann einer Kamera mehr als eine Wachperson zugewiesen werden?', answer: 'Ja. Eine Kamera kann eine primäre Wachperson haben, die die erste Benachrichtigung erhält, sowie einen oder mehrere Eskalationskontakte, die nur dann alarmiert werden, wenn die primäre Wachperson nicht rechtzeitig quittiert.' },
  { question: 'Lassen sich die Nachrichten je Checklistenpunkt anpassen?', answer: 'Jeder Checklistenpunkt hat seine eigene vorformulierte Nachricht, die beim Einrichten der Checkliste geschrieben wird. Ein Fehler am Tor und ein Fehler wegen Verweilens können völlig unterschiedlich formulierte Nachrichten auslösen, zugeschnitten auf das, was die Wachperson tatsächlich tun muss.' },
  { question: 'Über welche Kanäle laufen Benachrichtigungen?', answer: 'E-Mail, SMS, WhatsApp und Push werden unterstützt. Für eine Wachperson lassen sich mehrere Kanäle einrichten, und die Reihenfolge, in der sie versucht werden, wird je Wachperson festgelegt statt für den ganzen Standort.' },
  { question: 'Wird jede Benachrichtigung irgendwo protokolliert?', answer: 'Ja. Jede Benachrichtigung wird mit Empfänger, Zeitpunkt und Quittierungsstatus in das Kontrollprotokoll des jeweiligen Rundgangs geschrieben. So gibt es einen Nachweis, der nicht von der Erinnerung der Wachperson an ihre Schicht abhängt.' },
];

export default function DeKiWaechterrundgangBenachrichtigungenPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'KI-Wächterrundgang', href: '/de/ki-waechterrundgang' },
      { label: 'Benachrichtigungen' },
    ]}>
      <FeatureHero
        eyebrow="Automatische Eskalation"
        title="Benachrichtigung der Wachperson"
        lede={<>Eine automatische Benachrichtigung ist eine Meldung an die Wachperson, die einer bestimmten Kamera
            zugewiesen ist, sobald ein <Link href="/de/ki-waechterrundgang/checklisten" className="text-primary hover:underline">Checklistenpunkt</Link> während
            eines <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">virtuellen Kontrollgangs</Link> als nicht erfüllt markiert wird.
            Jede Benachrichtigung enthält eine vorformulierte Nachricht, die erklärt, was vorgefunden wurde und was zu tun ist.</>}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/plattform/alarme-und-benachrichtigungen', label: 'Die Alarmübersicht' }}
        visual={<PhotoFigure src="/vp-guard-notifications-1.png" alt="Eine Ereignisansicht in der Camzify-Konsole mit dem Kamerabild hinter einer nicht erfüllten Prüfung und der versendeten Nachricht an die Wachperson" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { icon: User, title: 'Benannte Wachperson je Kamera', desc: 'Jeder Kamera im Rundgangsablauf ist eine Wachperson mit Kontaktdaten zugewiesen. Es ist immer klar, wer zuständig ist.' },
              { icon: MessageSquare, title: 'Vorformulierte Nachrichten', desc: 'Jeder Checklistenpunkt hat eine vorab geschriebene Eskalationsnachricht. „Tor nach Anlieferung offen gelassen – sofort schließen.“' },
              { icon: AlertTriangle, title: 'Sofortige Zustellung', desc: 'Benachrichtigungen gehen in dem Moment raus, in dem ein Fehler protokolliert wird. Die Wachperson weiß vor allen anderen, was wo passiert ist.' },
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
              <span className="font-mono text-mono-sm uppercase text-primary">Warum es zählt</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Warum die Benachrichtigung der Wachperson wichtig ist</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Ein nicht erfüllter Checklistenpunkt nützt nur, wenn er jemanden erreicht, der handeln kann. Ohne automatische Meldung bleibt der Fehler in einem Protokoll liegen, bis ein Operator zufällig hineinsieht. Das kann Minuten später sein oder erst am Schichtende, lange nachdem das Tor offen geblieben ist oder der Bereich unbeaufsichtigt war.</p>
                <p>Die diensthabende Wachperson per Funk oder Telefon zu suchen, klappt manchmal. Es hängt aber davon ab, dass jemand daran denkt, weiß, wer diese Kamera gerade tatsächlich betreut, und die Person über den Kanal erreicht, den sie gerade offen hat. Nichts davon ist sicher, und nichts davon hinterlässt einen Nachweis, wann die Wachperson informiert wurde oder ob sie reagiert hat.</p>
                <p>Wird die Benachrichtigung direkt an den Checklistenpunkt gebunden, entfällt das Rätselraten. Sobald ein Ergebnis als nicht erfüllt protokolliert ist, weiß das System bereits, von welcher Kamera es stammt, welche Wachperson ihr zugewiesen ist und welche Nachricht zu senden ist. Die Meldung geht also sofort an die richtige Person, ohne Umweg.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <ScrollReveal>
              <div className="space-y-4">
                <span className="font-mono text-mono-sm uppercase text-primary">Beispiele</span>
                <h2 className="font-display text-2xl font-bold">So sieht eine Benachrichtigung aus</h2>
                <p className="text-muted-foreground">Jede Nachricht wird beim Anlegen des Checklistenpunkts geschrieben. Sie benennt also das Problem und die erwartete Maßnahme, statt die Wachperson raten zu lassen.</p>
                <div className="space-y-3">
                  {[
                    'Tor nach Anlieferung offen gelassen – sofort schließen',
                    'Unbefugte Person im Ladebereich – sofort nachsehen',
                    'Notausgang zugestellt – sofort freiräumen',
                    'Fahrzeug nicht auf dem vorgesehenen Stellplatz – umparken',
                    'Rampentor nicht gesichert – prüfen und verschließen',
                    'Hindernis im Flur gemeldet – entfernen und protokollieren',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5">
                      <Bell className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <PhotoFigure src="/vp-guard-notifications-2.png" alt="Die Benachrichtigungsansicht mit Meldungen, ihrer Kamera, Dringlichkeit und ihrem Quittierungsstatus" caption="Die Benachrichtigungsübersicht: jede versendete Nachricht, an wen sie ging und ob sie quittiert wurde." />
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">So läuft es ab</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Wie Benachrichtigungen ablaufen</h2>
                <ol className="mt-6 space-y-4 text-muted-foreground">
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">01</span><span>Der Rundgang erreicht eine Kamera im Rundgangsablauf</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">02</span><span>Der Checklistenpunkt wird als erfüllt oder nicht erfüllt bewertet</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">03</span><span>Bei einem Fehler ermittelt das System die Wachperson, die dieser Kamera zugewiesen ist</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">04</span><span>Die vorformulierte Nachricht zu diesem Checklistenpunkt geht an die Wachperson</span></li>
                  <li className="flex gap-3"><span className="shrink-0 font-mono text-primary tabular-nums">05</span><span>Die Benachrichtigung wird im <Link href="/de/ki-waechterrundgang/kontrollprotokolle" className="text-primary hover:underline">Kontrollprotokoll</Link> festgehalten</span></li>
                </ol>
              </div>
            </ScrollReveal>
            <SectionVisual locale="de" variant="flow" caption="Ablauf der Benachrichtigung" alt="Benachrichtigung der Wachperson: automatische Weiterleitung einer Meldung vom nicht erfüllten Checklistenpunkt an die zuständige Wachperson" steps={['Punkt am Kontrollpunkt nicht erfüllt', 'Zuständige Wachperson ermittelt', 'Vorformulierte Nachricht gesendet', 'Im Protokoll festgehalten']} />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <SectionVisual locale="de" variant="flow" caption="Eskalationskette" steps={['Wachperson benachrichtigt', 'Keine Quittierung im Zeitfenster', 'Eskalation an Vertretung', 'Jeder Schritt protokolliert']} alt="Ablauf: Eine nicht quittierte Benachrichtigung wird von der primären Wachperson an einen Vertreter eskaliert" />
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Konfiguration</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Eskalation und Zustellkanäle</h2>
                <p className="mt-4 text-muted-foreground">Benachrichtigungen sind keine einmalige Nachricht, die man abschickt und vergisst. Zustellung und Eskalation werden je Wachperson konfiguriert, damit die Absicherung nicht davon abhängt, dass ein einziges Telefon eingeschaltet ist.</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Für jede Wachperson lassen sich mehrere Kanäle einrichten, E-Mail, SMS, WhatsApp und Push, in einer bevorzugten Reihenfolge</li>
                  <li className="flex gap-2">• Eine Quittierung ist innerhalb eines einstellbaren Zeitfensters erforderlich, bevor eine Meldung als unbearbeitet gilt</li>
                  <li className="flex gap-2">• Nicht quittierte Meldungen werden automatisch an eine Vertretung oder an die Objektleitung eskaliert</li>
                  <li className="flex gap-2">• Eskalationskontakte werden unabhängig von der primären Wachperson festgelegt, sodass eine Vertretung nie stillschweigend vorausgesetzt wird</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <FaqSection items={faqs} locale="de" inline />

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Weiterlesen</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/de/ki-waechterrundgang/checklisten" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Checklisten <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/de/plattform/alarme-und-benachrichtigungen" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Alarme und Benachrichtigungen <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/use-cases/guard-tour-verification" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Nachweis von Wächterrundgängen (Englisch) <ArrowRight className="h-3 w-3" /></Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
