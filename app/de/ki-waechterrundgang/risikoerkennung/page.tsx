import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import { FeatureHero } from '@/components/content/feature-hero';
import { SiteImage } from '@/components/content/site-image';
import { SectionVisual } from '@/components/content/section-visual';
import Link from 'next/link';
import { ShieldAlert, Bell, Eye, ClipboardCheck } from 'lucide-react';

/**
 * German counterpart of /virtual-patrolling/risk-detection. Page identity is declared
 * once and consumed by generatePageMeta and PageShell.
 */
const pageMeta = {
  title: 'KI-Risikoerkennung beim Kontrollgang',
  description: 'Automatische Rundgänge erkennen Gefährdungen und Sicherheitsrisiken an jeder Kamera, etwa einen zugestellten Ausgang oder Rauch, auch ohne Prüfpunkt dafür.',
  path: '/de/ki-waechterrundgang/risikoerkennung',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  {
    question: 'Was ist proaktive Risikoerkennung in der Videoüberwachung?',
    answer: 'Das System meldet einen gefährlichen oder unsicheren Zustand, solange er noch ein Zustand ist, statt den Vorfall aufzuzeichnen, der daraus folgt. Ein mit Paletten zugestellter Notausgang, eine aufgekeilte Sicherheitstür, eine unbeaufsichtigte Tasche in einem öffentlichen Bereich und Rauch in einem Technikraum sind eine Zeit lang Risiken, bevor etwas passiert, und in dieser Zeit lassen sie sich mit wenig Aufwand beheben. Camzify meldet solche Zustände während automatischer Rundgänge als kritische Benachrichtigungen, neben den Checklistenergebnissen derselben Kameras.',
  },
  {
    question: 'Wie unterscheidet sich das von einer Checkliste für Kontrollgänge?',
    answer: 'Eine Checkliste beantwortet die Fragen, die jemand aufgeschrieben hat. Die Risikoerkennung beantwortet die Frage, an die niemand gedacht hat. Beides läuft im selben Rundgang: Jede Kamera wird gegen ihre Checkliste geprüft, und derselbe Kontrollpunkt wird zusätzlich eigenständig auf Risiken bewertet. Ein zugestellter Ausgang wird also gemeldet, ob „Ausgang frei“ je als Punkt angelegt wurde oder nicht. Beides ergänzt sich: Die Checkliste belegt, dass eine bestimmte Kontrolle geprüft wurde, und die Risikoerkennung deckt die Lücke zwischen den Kontrollen ab.',
  },
  {
    question: 'Sagt Camzify Vorfälle voraus, bevor sie passieren?',
    answer: 'Nein, und seien Sie vorsichtig bei jedem Anbieter, der das behauptet. Was das System tut, ist enger gefasst und nützlicher: Es beobachtet Zustände, die jetzt bestehen und Zeit bräuchten, um zu einem Vorfall zu werden, und informiert jemanden, solange noch Zeit zum Handeln ist. Eine aufgekeilte Tür ist keine Vorhersage, sondern eine Tatsache über den Standort in diesem Moment. Der Wert liegt darin, dass eine Person heute Nacht davon erfährt, statt nächste Woche im Vorfallbericht davon zu lesen.',
  },
  {
    question: 'Welche Arten von Risiken werden gemeldet?',
    answer: 'Die Kategorien folgen den Erkennungsmodellen, die auf der Plattform laufen, darunter Feuer und Rauch, zurückgelassene oder unbeaufsichtigte Gegenstände, Personen in gesperrten Bereichen, fehlende persönliche Schutzausrüstung (PSA) dort, wo sie vorgeschrieben ist, Aggression, Behinderungen und Kamerasabotage. Die vollständige Übersicht finden Sie bei den KI-Funktionen. Was ein bestimmter Rundgang meldet, hängt davon ab, welche Funktionen an dieser Kamera aktiv sind.',
  },
  {
    question: 'Wo kommen diese Meldungen an?',
    answer: 'In derselben Benachrichtigungs-Warteschlange wie die Erkennungen aus der Daueranalyse, als kritisch markiert, mit dem Bild der Kamera und der Erwartung, dass sie quittiert werden. Sie verschwinden nicht im Kontrollprotokoll: Das Protokoll dokumentiert den Rundgang, während ein Risiko, um das sich jetzt jemand kümmern muss, als Benachrichtigung über die Kanäle hinausgeht, die für diese Wachperson eingerichtet sind: E-Mail, SMS, WhatsApp oder Push.',
  },
  {
    question: 'Ersetzt das die dauerhafte KI-Überwachung?',
    answer: 'Nein. Die dauerhafte Überwachung beobachtet eine Kamera ununterbrochen und erfasst ein Ereignis, während es geschieht. Ein Rundgang ist ein geplanter Durchgang, der jede Kamera im Rundgangsablauf der Reihe nach erreicht und nachweist, dass er das getan hat. Die Risikoerkennung beim Rundgang übernimmt einen Teil der Aufgabe der dauerhaften Überwachung: ein bewusster Blick auf jeden Kontrollpunkt, nach Zeitplan, ob etwas ausgelöst hat oder nicht.',
  },
];

export default function DeKiWaechterrundgangRisikoerkennungPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'KI-Wächterrundgang', href: '/de/ki-waechterrundgang' },
      { label: 'Risikoerkennung' },
    ]}>
      <FeatureHero
        eyebrow="Über die Checkliste hinaus"
        title="KI-Risikoerkennung beim Kontrollgang"
        lede={<><strong className="font-semibold text-foreground">
            Eine Checkliste kann nur fragen, woran Sie gedacht haben.
            </strong>{' '}
            Bei einem{' '}
            <Link href="/de/ki-waechterrundgang/automatische-planung" className="text-primary hover:underline">automatischen Kontrollgang</Link>{' '}
            bewertet Camzify jede Kamera eigenständig auf Gefährdungen und Sicherheitsrisiken und
            löst für jeden Fund eine kritische Meldung aus – ob ein Checklistenpunkt ihn abdeckt oder nicht.</>}
        primary={{ href: '/book-a-demo', label: 'Demo anfragen' }}
        secondary={{ href: '/de/ki-waechterrundgang/automatische-planung', label: 'Automatische Planung' }}
        visual={
          <figure className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-card p-2" aria-label="Vier Kamera-Kontrollpunkte eines Rundgangs, jeder eigenständig auf Risiken bewertet">
            {[
              { src: '/vp-risk-cam-main-gate.jpg', label: 'KAM 01 · Haupttor', alt: 'Eine Torkamera: Wachperson am Pförtnerhaus, Fahrzeuge passieren die Schranke' },
              { src: '/vp-risk-cam-loading-dock.jpg', label: 'KAM 04 · Laderampe', alt: 'Eine Kamera an der Laderampe: zwei Lkw an den Toren, Paletten auf der Vorfläche' },
              { src: '/vp-risk-cam-parking-lot.jpg', label: 'KAM 02 · Parkplatz', alt: 'Eine Parkplatzkamera: Reihen geparkter Autos, dazwischen geht eine Person' },
              { src: '/vp-risk-cam-server-room.jpg', label: 'KAM 07 · Serverraum', alt: 'Eine Kamera im Serverraum: Rackreihen, ein Techniker geht durch den Gang' },
            ].map((c, i) => (
              <div key={c.src} className="camera-tile-frame relative aspect-video overflow-hidden rounded-md">
                <SiteImage src={c.src} alt={c.alt} width={1000} height={563} priority={i === 0} sizes="(max-width: 1024px) 50vw, 22vw" className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[hsl(216_22%_4%/0.85)] to-transparent" aria-hidden="true" />
                <span className="camera-tile absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-wider camera-tile-label">{c.label}</span>
              </div>
            ))}
          </figure>
        }
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Die Lücke, die eine Checkliste lässt</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Checklisten entstehen aus Erfahrung: das Tor, das offen bleibt, das Rampentor, das
                  aufgekeilt wird, der Flur, in dem sich Kartons stapeln. Sie sind gut bei allem, was
                  schon einmal schiefgegangen ist, und genau deshalb lohnen sie sich.
                </p>
                <p>
                  Was sie nicht können, ist vorausdenken. Der Zustand, der den nächsten Vorfall auslöst,
                  ist meist nicht der, den jemand aufgeschrieben hat – und ein Rundgang, der nur die
                  Fragen auf der Liste beantwortet, geht an allem anderen vorbei, ohne festzuhalten,
                  dass er überhaupt etwas gesehen hat.
                </p>
                <p>
                  <strong className="font-semibold text-foreground">
                    Genau diese Lücke deckt die Risikoerkennung ab.
                  </strong>{' '}
                  Derselbe Kontrollpunkt, der „Ist das Rampentor gesichert?“ beantwortet, wird auch
                  daraufhin bewertet, was tatsächlich im Bild ist. So werden auch die Paletten gemeldet,
                  die dahinter vor dem Notausgang gestapelt sind.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Bewertet an jedem Kontrollpunkt, nicht nur, wenn etwas nicht stimmt</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Jede Kamera eines automatischen Rundgangs erhält im Protokoll zwei Einträge:{' '}
                <strong className="font-semibold text-foreground">possible safety risks</strong> (mögliche Gefährdungen) und{' '}
                <strong className="font-semibold text-foreground">possible security risks</strong> (mögliche Sicherheitsrisiken).
                Sie werden ausgefüllt, ob etwas nicht stimmt oder nicht.
              </p>
              <PointList items={[
                <>In einem Fitnessraum kann dort stehen: &bdquo;possible tripping hazards due to equipment left out on the floor&ldquo; (mögliche Stolpergefahr durch auf dem Boden liegende Geräte).</>,
                <>Bei einem Gehweg kann dort stehen: &bdquo;wet surfaces might cause slipping&ldquo; (nasse Flächen könnten zum Ausrutschen führen).</>,
                <>An den meisten Kontrollpunkten steht: &bdquo;none apparent&ldquo; (nichts erkennbar).</>,
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">
                Erst das Festhalten der unauffälligen Ergebnisse macht die auffälligen lesenswert. Ein
                System, das sich nur meldet, wenn es etwas zu sagen hat, lässt Sie nicht unterscheiden
                zwischen einer ruhigen Nacht und einem System, das nicht mehr hinsieht – und es hinterlässt
                keinen Nachweis, dass eine Gefahr zu dem Zeitpunkt nicht bestand, zu dem später jemand
                behauptet, sie sei da gewesen.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Jeder Kontrollpunkt hält außerdem fest, was die Kamera tatsächlich gesehen hat: eine
                Beschreibung der Szene in einfacher Sprache, die Zahl der anwesenden Personen und die im
                Bild erkannten Objekte. Das ist der Kontext, vor dem eine Bewertung entsteht, und er wird
                mit ihr zusammen gespeichert.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Warum es auf den Zeitpunkt ankommt</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Die meisten Risiken an einem Standort entstehen nicht von einem Augenblick auf den nächsten.
              </p>
              <PointList items={[
                'Eine Brandschutztür, die zu Schichtbeginn aufgekeilt wird, bleibt stundenlang offen.',
                'Paletten vor einem Ausgang bleiben dort, bis jemand sie wegräumt.',
                'Eine in einer Eingangshalle abgestellte Tasche steht dort, bis sie jemandem auffällt.',
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">
                Jedes davon ist eine Zeit lang ein Risiko, bevor mehr daraus wird, und in dieser Zeit ist
                es in fünf Minuten behoben. Ein geplanter Rundgang, der alle paar Stunden jede Kamera
                ansieht, trifft in dieses Zeitfenster. Mehr wird nicht behauptet – nicht, dass das System
                Ereignisse vorhersieht, sondern dass es einen gefährlichen Zustand erreicht, solange er
                noch ein Zustand ist, und eine namentlich benannte Person informiert, die sich darum
                kümmern kann.
              </p>
              <SectionVisual locale="de"
                className="mt-8"
                variant="flow"
                caption="Zeitfenster des Risikos"
                alt="Ablauf: Ein gefährlicher Zustand entsteht, der geplante Rundgang erreicht ihn, solange er noch ein Zustand ist, die zuständige Person wird benachrichtigt und der Nachweis abgelegt"
                steps={['Brandschutztür ist aufgekeilt', 'Geplanter Rundgang erreicht den Kontrollpunkt', 'Kritische Meldung an die Wachperson', 'Behoben, solange es ein Zustand ist']}
              />

              <div className="mt-8 rounded-xl border border-warn/30 bg-warn/5 p-6">
                <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
                  <strong className="font-semibold text-foreground">Was das nicht ist:</strong>{' '}
                  keine Vorhersage, und das behaupten wir auch nicht. Das System meldet Zustände, die jetzt
                  im Kamerabild zu sehen sind. Wer Ihnen Software verkauft, die Vorfälle vorhersagt,
                  beschreibt etwas, das es nicht gibt, und{' '}
                  <Link href="/trust" className="text-primary hover:underline">unsere Haltung zu solchen Behauptungen</Link>{' '}
                  (Englisch) ist öffentlich nachzulesen.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Wie es mit allem anderen zusammenspielt</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: ClipboardCheck,
                    title: 'Die Checkliste belegt die Kontrolle',
                    desc: 'Jeder Punkt wird beantwortet und mit einem Bild festgehalten, und genau das verlangen Prüfer und Versicherer. Sie deckt ab, was Sie prüfen wollten.',
                    href: '/de/ki-waechterrundgang/checklisten',
                    link: 'Checklisten',
                  },
                  {
                    icon: ShieldAlert,
                    title: 'Die Risikoerkennung deckt den Rest ab',
                    desc: 'Derselbe Kontrollpunkt wird auf Gefährdungen und Sicherheitsrisiken im Bild bewertet und löst für alles, wonach die Liste nicht gefragt hat, eine kritische Meldung aus.',
                    href: '/de/ki-funktionen',
                    link: 'KI-Erkennungsmodelle',
                  },
                  {
                    icon: Eye,
                    title: 'Die Szenenbeobachtung liefert Kontext',
                    desc: 'Ein Kontrollpunkt lässt sich anhand einiger Sekunden Live-Video statt eines einzelnen Bilds bewerten. Das unterscheidet jemanden, der durchgeht, von jemandem, der bleibt.',
                    href: '/de/ki-waechterrundgang/automatische-planung',
                    link: 'Automatische Planung',
                  },
                  {
                    icon: Bell,
                    title: 'Die Meldung erreicht einen Menschen',
                    desc: 'Kritische Benachrichtigungen gehen per E-Mail, SMS, WhatsApp oder Push an die Wachperson, die für diese Kamera eingerichtet ist, und müssen quittiert werden.',
                    href: '/de/ki-waechterrundgang/benachrichtigungen',
                    link: 'Benachrichtigungen',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-border bg-card p-6">
                    <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    <Link href={item.href} className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                      {item.link} &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Wo es am meisten bringt</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Am meisten profitieren Standorte, an denen ein gefährlicher Zustand stundenlang unbemerkt bestehen kann.
              </p>
              <PointList items={[
                <>Ein <Link href="/de/branchen/lager-und-logistik" className="text-primary hover:underline">Lager</Link> profitiert am meisten nach Schichtende.</>,
                <>Eine <Link href="/de/branchen/baustellen" className="text-primary hover:underline">Baustelle</Link> profitiert am meisten über Nacht.</>,
                <>Ein <Link href="/industries/remote-sites" className="text-primary hover:underline">abgelegener oder unbesetzter Standort</Link> (Englisch), an dem überhaupt niemand vorbeikommt, profitiert am meisten.</>,
              ]} />
              <p className="mt-4 max-w-prose text-muted-foreground">
                Überall dort, wo die Antwort auf &bdquo;Wie lange, bis es jemandem auffällt?&ldquo; in Stunden
                gemessen wird, ist ein geplanter Rundgang, der genau hinsieht, mehr wert als eine weitere Kamera.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FaqSection items={faqs} locale="de" />
    </PageShell>
  );
}
