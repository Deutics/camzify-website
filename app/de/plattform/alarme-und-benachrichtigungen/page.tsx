import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { ProductShot } from '@/components/content/product-shot';
import { NotificationsMockup } from '@/components/mockups/notifications-mockup';
import Link from 'next/link';
import { Radio, ListFilter, CheckCircle2, SlidersHorizontal } from 'lucide-react';

/**
 * German counterpart of /platform/notifications-and-alerts. The console is English, so
 * the four alert states are named once in the hero with their console labels and in
 * German everywhere else. The mockup is faux console UI and stays English.
 */
const pageMeta = {
  title: 'Alarmmanagement | Alarme und Benachrichtigungen',
  description: 'Camzify-Benachrichtigungen: Filter nach Schweregrad, Standort, Kamera und Funktion, eine Quittierungs-Warteschlange mit Eskalation, Fehlalarme gekennzeichnet.',
  path: '/de/plattform/alarme-und-benachrichtigungen',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  { question: 'Was macht einen Alarm kritisch statt zu einer Warnung oder einer Info?', answer: '„Kritisch“ ist den folgenreichsten Erkennungen vorbehalten, Waffen sowie Feuer und Rauch, weil sie sofort angesehen werden müssen. „Warnung“ umfasst etwa einen Kamerastream, der offline geht, und „Info“ weniger dringende Erkennungen wie eine Linienüberschreitung. Dieselben Ereigniskategorien erhalten immer denselben Schweregrad, die Einstufung ist also vorhersehbar und wird nicht von Fall zu Fall beurteilt.' },
  { question: 'Wie funktioniert die Quittierung, und wird sie protokolliert?', answer: 'Wer einen Alarm quittiert, markiert ihn als geprüft, und festgehalten wird, wer ihn wann quittiert hat. Es ist also nicht nur ein Häkchen, das wieder verschwindet. Alarme durchlaufen vier Zustände: Quittierung erforderlich, quittiert, eskaliert und Fehlalarm. So ist für jedes Ereignis nachvollziehbar, was damit geschehen ist.' },
  { question: 'Lassen sich Benachrichtigungen pro Benutzer oder Rolle filtern?', answer: 'Ja. Der Feed lässt sich nach Kategorie filtern (Linienüberschreitung, Bereichsüberwachung, Heatmap-Anomalien, Kamerasabotage, Waffenerkennung, PSA-Verstöße, Feuer und Rauch, Stream-Status), nach Standort, nach Kamera, nach Schweregrad und nach gelesen oder ungelesen. Was ein Unterkonto sieht, ist auf die Standorte und Kameras beschränkt, die ihm seine Berechtigungsgruppe freigibt.' },
  { question: 'Lässt sich der Alarmverlauf exportieren?', answer: 'Der Benachrichtigungs-Feed ist für das Filtern und Prüfen innerhalb der Plattform gebaut, nicht als Werkzeug für einen Rohdatenexport. Grenzen Sie ihn nach Kategorie, Standort, Kamera, Schweregrad oder Status ein, um genau die Ereignisse aufzurufen, die Sie prüfen oder melden müssen.' },
  { question: 'Wird eine Quittierung mit der Warteschlange kritischer Ereignisse im Dashboard abgeglichen?', answer: 'Ja. Der Quittierungsstatus wird geteilt: Wer ein kritisches Ereignis im Benachrichtigungs-Feed quittiert, quittiert es damit auch in der Warteschlange kritischer Ereignisse im Dashboard, und umgekehrt. Beide Ansichten zeigen also immer denselben Stand dessen, was noch offen ist.' },
];

export default function DePlattformAlarmeUndBenachrichtigungenPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Plattform', href: '/de/plattform' },
      { label: 'Alarme und Benachrichtigungen' },
    ]}>
      <FeatureHero
        eyebrow="Eingeordnet, priorisiert, quittiert"
        title="Verwaltung von Sicherheitsalarmen"
        lede={<><strong className="font-semibold text-foreground">Das Alarmmanagement in Camzify beginnt in der Ansicht Notifications, die die Gesamtzahl der Ereignisse, die ungelesenen Alarme, die kritischen Alarme (Waffen sowie Feuer und Rauch) und die durchschnittliche Zeit bis zur Quittierung zeigt.</strong> Filtern Sie nach Kategorie, Standort, Kamera, Schweregrad, Objekttyp und Quittierungsstatus. Jeder Alarm kennt vier Zustände: Quittierung erforderlich, quittiert, eskaliert und Fehlalarm (in der Konsole: Ack Required, Acknowledged, Escalated und False Positive).</>}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/guides/how-to-manage-security-alerts', label: 'Die Alarm-Warteschlange abarbeiten (auf Englisch)' }}
        visual={<ProductShot
            src="/product-notifications"
            alt="Ein Laptop mit der Ansicht Notifications in Camzify: Kennzahlen, Filter und ein nach Kategorien geordneter Alarm-Feed mit kritischen Ereignissen, Warnungen und Infos"
            label="Benachrichtigungen · Camzify-Konsole"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-12">
            <NotificationsMockup />
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">In der Praxis</span>
            <h2 className="mt-2 font-display text-2xl font-bold">So werden Alarme priorisiert</h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Radio, title: 'Feed in Echtzeit, nach Kategorien', desc: 'Jedes Ereignis landet im Moment der Auslösung im Feed, gekennzeichnet nach Kategorie: Linienüberschreitung, Waffenerkennung, Feuer und Rauch und weitere.' },
              { icon: ListFilter, title: 'Priorisierung nach Schweregrad', desc: 'Die Stufen Kritisch, Warnung und Info sorgen dafür, dass die folgenreichsten Ereignisse nicht in einer Flut von Routinemeldungen untergehen.' },
              { icon: CheckCircle2, title: 'Ablauf der Quittierung', desc: 'Die Zustände Quittierung erforderlich, quittiert, eskaliert und Fehlalarm hinterlassen bei jedem Alarm eine klare, nachvollziehbare Spur.' },
              { icon: SlidersHorizontal, title: 'Feine Filter', desc: 'Grenzen Sie den Feed nach Kategorie, Standort, Kamera, Schweregrad oder Lesestatus ein, um genau das zu finden, was Sie suchen.' },
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
                <span className="font-mono text-mono-sm uppercase text-primary">Teil jedes Rundgangs</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Eine Warteschlange statt vier Dashboards</h2>
                <p className="mt-4 text-muted-foreground">
                  Dieses Modul ist mit dem <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützten Wächterrundgang</Link> verbunden
                  und ergibt so ein vollständiges Lagebild. Rundgangsergebnisse, Erkennungsalarme und der Zustand
                  der Plattform laufen in derselben Konsole zusammen.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Das älteste noch nicht quittierte kritische Ereignis steht immer ganz oben, und da die
                  Linienüberschreitung derzeit die Kategorie mit den meisten Meldungen ist, sehen Bediener in
                  Sekunden, ob sie es mit einer echten Häufung zu tun haben oder mit üblicher Aktivität am Perimeter.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-mono-sm uppercase text-primary">Filtern nach</span>
                <div className="mt-4 space-y-3">
                  {[
                    { filter: 'Kategorie', desc: '8 Erkennungskategorien, von Linienüberschreitung bis Feuer und Rauch' },
                    { filter: 'Standort / Kamera', desc: 'Auf einen Standort oder einen einzelnen Stream eingrenzen' },
                    { filter: 'Schweregrad', desc: 'Alle, Kritisch, Warnung oder Info' },
                    { filter: 'Status', desc: 'Gelesen und ungelesen, nur ungelesen oder nur gelesen' },
                  ].map((f) => (
                    <div key={f.filter} className="flex items-center justify-between gap-4 rounded-lg bg-muted/30 px-4 py-2.5">
                      <span className="shrink-0 font-mono text-mono-sm text-primary">{f.filter}</span>
                      <span className="text-right text-xs text-muted-foreground">{f.desc}</span>
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
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
