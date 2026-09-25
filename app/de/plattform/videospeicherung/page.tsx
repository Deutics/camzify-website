import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { ProductShot } from '@/components/content/product-shot';
import { VideoBackupMockup } from '@/components/mockups/video-backup-mockup';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';
import { HardDrive, Clock, Zap, Info } from 'lucide-react';

/**
 * German counterpart of /platform/video-backup-and-retention. The mockup is faux console
 * UI and stays English; retention mode names ("By Days", "By Storage") are the console's
 * own labels and are kept in English with a German gloss.
 */
const pageMeta = {
  title: 'Cloud-Videoaufzeichnung, Backup und Aufbewahrung',
  description: 'Cloud-Backup für Videoaufnahmen, das einen zerstörten NVR übersteht. Aufbewahrung pro Kamera nach Tagen oder GB, pro Standort gesammelt zuweisbar.',
  path: '/de/plattform/videospeicherung',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  { question: 'Wie richte ich das Video-Backup zum ersten Mal ein?', answer: 'Legen Sie fest, welche Kameras aufzeichnen, wählen Sie durchgehende oder zeitgesteuerte Aufzeichnung, bestimmen Sie pro Kamera die Aufbewahrungsdauer und prüfen Sie die Speicherschätzung, bevor Sie speichern. Die Schritt-für-Schritt-Anleitung (auf Englisch) finden Sie unter /guides/how-to-configure-cloud-video-backup.' },
  { question: 'Zeichnet Camzify durchgehend auf oder nur zu bestimmten Zeiten?', answer: 'Beides ist möglich. Die durchgehende Aufzeichnung läuft rund um die Uhr. Die zeitgesteuerte Aufzeichnung läuft nur in den Stunden, die Sie festlegen. Ein Büro, das von 19 bis 7 Uhr leer ist, muss nicht jeden Tag zwölf Stunden eines dunklen Flurs speichern. Ein Zeitplan lässt sich auf einen Standort oder auf alle Kameras auf einmal anwenden und muss nicht Kamera für Kamera eingestellt werden.' },
  { question: 'Was ist günstiger, durchgehende oder zeitgesteuerte Aufzeichnung?', answer: 'Die zeitgesteuerte, und zwar genau im Verhältnis zu den Stunden, die wegfallen. Speicher wird pro aufgezeichneter Stunde verbraucht; halbiert sich das Aufzeichnungsfenster, halbiert sich ungefähr auch der Speicherbedarf dieser Kamera. Die durchgehende Aufzeichnung ist die richtige Voreinstellung, wo zu jeder Stunde etwas passieren kann oder wo ein Versicherer oder eine Behörde eine lückenlose Aufzeichnung erwartet. Viele Standorte kombinieren beides: durchgehend an Außen- und Eingangskameras, zeitgesteuert an Innenkameras.' },
  { question: 'Wie wird der Wert „Est. Storage“ berechnet, und wie genau ist er?', answer: 'Er ist eine Planungsschätzung, berechnet aus der typischen Bitrate jeder Kamera bei ihrer eingestellten Auflösung und Bildrate, keine Live-Messung dessen, was tatsächlich aufgezeichnet wurde. Der tatsächliche Verbrauch hängt von der Aktivität im Bild, von Bewegung und Kompression ab. Verstehen Sie den Wert daher als Richtgröße für die Planung, nicht als exakten Messwert.' },
  { question: 'Was passiert, wenn der zugewiesene Speicher einer Kamera voll ist?', answer: 'Hat eine Kamera ein Speicherlimit in GB und erreicht es, werden die ältesten Aufnahmen entfernt, um Platz für neue zu schaffen, so wie eine Kamera mit „By Days“ Aufnahmen verwirft, die älter als ihre Aufbewahrungsdauer sind. In beiden Fällen zeichnet die Kamera weiter auf. Was weicht, ist der ältere Verlauf.' },
  { question: 'Was ist der Unterschied zwischen „By Days“ und „By Storage“?', answer: '„By Days“ (nach Tagen) hält ein festes Zeitfenster, zum Beispiel 14 Tage, unabhängig davon, wie viele Aufnahmen dabei zusammenkommen. „By Storage“ (nach Speicher) begrenzt eine Kamera stattdessen auf ein festes GB-Kontingent, und das aufbewahrte Zeitfenster schrumpft oder wächst mit der Aktivität im Bild. Eine durchgehende 24/7-Aufzeichnung lässt sich mit beiden Grenzen kombinieren.' },
  { question: 'Lässt sich die Aufbewahrungsdauer pro Kamera festlegen oder nur für das ganze Konto?', answer: 'Beides. Jede Kamera kann ihren eigenen Aufbewahrungsmodus und ihr eigenes Limit haben, oder Sie nutzen die Schnellvorlagen mit 7, 30, 60 oder 90 Tagen, um allen Kameras des Kontos in einem Schritt dieselbe Regel zuzuweisen.' },
  { question: 'Was passiert mit den Aufnahmen einer Kamera, wenn die Kamera entfernt wird?', answer: 'Bereits gespeicherte Aufnahmen dieser Kamera unterliegen weiter ihrer bisherigen Aufbewahrungsregel, bis sie ablaufen oder manuell gelöscht werden. Wird eine Kamera aus der aktiven Überwachung genommen, wird ihr gesicherter Verlauf nicht sofort gelöscht.' },
  { question: 'Wo werden die Aufnahmen gespeichert?', answer: 'Die Aufnahmen werden in einen Cloud-Objektspeicher geschrieben, in Amazon S3, in der AWS-Region, die den Standorten des Kunden am nächsten liegt, und im Ruhezustand verschlüsselt. So bleibt der Abruf schnell, und die Daten bleiben nah an dem Ort, an dem sie aufgezeichnet wurden. Die Aufbewahrungsdauer bestimmt, wie lange sie dort bleiben: ein Zeitfenster in Tagen oder ein Speicherlimit pro Kamera. Sind Aufnahmen abgelaufen, werden sie aus diesem Speicher gelöscht.' },
  { question: 'Ist das eine Cloud-Videoaufzeichnung?', answer: 'Ja. Jede Kamera zeichnet durchgehend oder nach Zeitplan in die Cloud auf, und die Aufnahmen werden mit einer pro Kamera festgelegten Aufbewahrungsdauer in Tagen oder mit einem Speicherlimit aufbewahrt. Nichts hängt von einem Rekorder vor Ort ab. Wiedergabe und Export laufen in derselben Konsole.' },
];

export default function DePlattformVideospeicherungPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Plattform', href: '/de/plattform' },
      { label: 'Videospeicherung und Aufbewahrung' },
    ]}>
      <FeatureHero
        eyebrow="Extern gesichert, auch wenn die Hardware ausfällt"
        title="Cloud-Backup und Aufbewahrung von Videoaufnahmen"
        lede={<><strong className="font-semibold text-foreground">Die Aufnahmen bleiben in der Cloud sicher, auch wenn der Hardware vor Ort etwas zustößt.</strong> In Camzify legen Sie die Aufbewahrungsdauer pro Kamera nach Tagen oder mit einem GB-Limit fest und weisen sie pro Standort gesammelt zu. Das System zeigt den voraussichtlichen Speicherbedarf, ermöglicht die Wiedergabe und den Vergleich mehrerer Kameras und verwaltet die Speicherzuteilung über Unterkonten hinweg – ein beschädigter oder gestohlener NVR bedeutet so nie verlorenes Beweismaterial. Es ist die Aufzeichnungsebene des <Link href="/de/cloud-videomanagementsystem" className="text-primary hover:underline">Cloud-Videomanagementsystems</Link> von Camzify.</>}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/guides/how-to-configure-cloud-video-backup', label: 'Backup einrichten (auf Englisch)' }}
        visual={<ProductShot
            src="/product-video-backup"
            alt="Ein Laptop mit der Ansicht Video Backup in Camzify: Speicherzuteilung, Speicherbelegung pro Standort und Aufbewahrungseinstellungen pro Kamera"
            label="Video-Backup · Camzify-Konsole"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-12">
            <VideoBackupMockup />
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">In der Praxis</span>
            <h2 className="mt-2 font-display text-2xl font-bold">So steuern Sie Aufzeichnung und Aufbewahrung</h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: HardDrive, title: 'Transparenter Speicher', desc: 'Bereitgestellter, belegter, an Unterkonten vergebener und verbleibender Speicher werden immer getrennt ausgewiesen, nie als eine vermischte Zahl.' },
              { icon: Clock, title: 'Flexible Aufbewahrungsmodi', desc: 'Stellen Sie jede Kamera nach Tagen, mit einem GB-Speicherlimit oder auf 24/7-Aufzeichnung ein, je nachdem, wie die Kamera genutzt wird.' },
              { icon: Zap, title: 'Schnellvorlagen', desc: 'Eine Aufbewahrung von 7, 30, 60 oder 90 Tagen lässt sich in einem Schritt auf alle Kameras des Kontos übertragen, ohne jede Kamera einzeln zu bearbeiten.' },
              { icon: Info, title: 'Ehrliche Planungswerte', desc: 'Speicherprognosen sind klar als Schätzungen auf Basis der typischen Bitrate gekennzeichnet und werden nicht als exakte Verbrauchswerte ausgegeben.' },
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
                <span className="font-mono text-mono-sm uppercase text-primary">Warum die Aufbewahrung zählt</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Extern gesichert, auch wenn die Hardware ausfällt</h2>
                <p className="mt-4 text-muted-foreground">
                  Ein zerschlagener oder gestohlener NVR ist ein häufiger Grund, warum Aufnahmen genau dann fehlen,
                  wenn es am meisten darauf ankommt. Camzify streamt und speichert die Aufnahmen schon während der
                  Aufzeichnung extern in der Cloud, sodass sie erhalten bleiben, auch wenn die Hardware vor Ort verloren geht.
                </p>
                <p className="mt-4 text-muted-foreground">
                  <strong className="font-semibold text-foreground">
                    Die Aufzeichnung läuft durchgehend oder nach Zeitplan, pro Kamera festgelegt.
                  </strong>
                </p>
                <PointList items={[
                  'Die durchgehende Aufzeichnung passt überall dort, wo zu jeder Stunde etwas passieren kann.',
                  'Die zeitgesteuerte Aufzeichnung läuft nur in den Stunden, die Sie festlegen, und ist der direkteste und wirksamste Hebel für die Speicherkosten.',
                  'Für eine Innenkamera, die nachts ein leeres Büro filmt, zahlen Sie sonst zwölf Stunden Speicher für Aufnahmen, auf denen nichts passiert.',
                  'Ein Zeitplan lässt sich auf einen ganzen Standort oder auf alle Kameras auf einmal anwenden, statt ihn einzeln einzustellen.',
                ]} />
                <p className="mt-4 text-muted-foreground">
                  In der Aufbewahrungsregel wägen Sie Speicherkosten gegen die Abdeckung mit Beweismaterial ab.
                  Eine Eingangskamera mit viel Bewegung in 4K verbraucht Speicher weit schneller als eine ruhige
                  Laderampe in 1080p. Deshalb lässt sich die Aufbewahrung pro Kamera einstellen, statt auf eine
                  Einstellung für das ganze Konto festgelegt zu sein. Auch dieses Modul ist mit dem <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützten Wächterrundgang</Link> verbunden:
                  Rundgangsergebnisse, Erkennungsalarme und der Zustand der Plattform laufen in derselben Konsole zusammen, gesichert durch dieselbe externe Aufbewahrung.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-mono-sm uppercase text-primary">Aufbewahrungsmodi</span>
                <div className="mt-4 space-y-3">
                  {[
                    { mode: 'By Days', desc: 'Hält ein festes Zeitfenster pro Kamera, z. B. 14 oder 30 Tage.' },
                    { mode: 'By Storage', desc: 'Begrenzt eine Kamera auf ein GB-Kontingent; das Zeitfenster passt sich der Aktivität an.' },
                    { mode: '24/7 Continuous', desc: 'Zeichnet rund um die Uhr auf, kombiniert mit einer der beiden Grenzen.' },
                  ].map((m) => (
                    <div key={m.mode} className="flex items-center justify-between gap-4 rounded-lg bg-muted/30 px-4 py-2.5">
                      <span className="shrink-0 font-mono text-mono-sm text-primary">{m.mode}</span>
                      <span className="text-right text-xs text-muted-foreground">{m.desc}</span>
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
              <Link href="/platform/license-and-instance-management" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Lizenz- und Instanzverwaltung (auf Englisch)</Link>
              <Link href="/de/ki-waechterrundgang" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">KI-gestützter Wächterrundgang</Link>
              <Link href="/de/preise" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Preise</Link>
              <Link href="/book-a-demo" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Demo anfragen</Link>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Branchen, die das nutzen</h2>
            <p className="mt-2 text-sm text-muted-foreground">Seiten ohne deutsche Fassung öffnen auf Englisch.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/industries/retail" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Einzelhandel</Link>
              <Link href="/de/branchen/lager-und-logistik" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Lager und Logistik</Link>
              <Link href="/industries/self-storage" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Self-Storage</Link>
              <Link href="/industries/remote-sites" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Abgelegene Standorte</Link>
            </div>
            <h3 className="mt-6 font-display text-lg font-bold">Anwendungsfälle</h3>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link href="/use-cases/theft-prevention" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Diebstahlprävention</Link>
              <Link href="/use-cases/vandalism-prevention" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Vandalismusprävention</Link>
              <Link href="/use-cases/incident-investigation" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Aufklärung von Vorfällen</Link>
              <Link href="/use-cases/cloud-video-backup-against-dvr-theft" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Cloud-Backup gegen DVR- und NVR-Diebstahl</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
