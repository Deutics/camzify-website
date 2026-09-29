import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { SectionVisual } from '@/components/content/section-visual';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * German counterpart of /ai-features/custom-detections. Same facts, nothing added: see
 * the English page's header for what the business stated and what must not be invented.
 */
const pageMeta = {
  title: 'Individuelle KI-Erkennungen auf Bestellung',
  description: 'Deckt keine der 23 Erkennungen Ihren Bedarf, entwickelt Camzify sie: Kennzeichen, Essen und Trinken, Ladendiebstahl, in der Cloud oder vor Ort.',
  path: '/de/ki-funktionen/individuelle-erkennungen',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  { question: 'Kann Camzify eine Erkennung entwickeln, die nicht in der Liste steht?', answer: 'Ja. Deckt keine der 23 Standard-Erkennungen ab, was ein Standort braucht, entwickelt Camzify die Erkennung. Die Anforderung wird zuerst gemeinsam festgelegt, die Entwicklung wird einmalig berechnet, und die fertige Erkennung wird wie jede andere pro Kamera lizenziert.' },
  { question: 'Welche individuellen Erkennungen gibt es bereits?', answer: 'Für Kunden entstanden sind bisher unter anderem Kennzeichenerkennung, Gesichtserkennung, Erkennung von Essen und Trinken sowie Ladendiebstahlerkennung. Jede begann als Anforderung, die keine Standard-Erkennung erfüllte.' },
  { question: 'Was kostet eine individuelle Erkennung?', answer: 'Einen einmaligen Entwicklungspreis und danach die übliche Abrechnung pro Instanz: Jede Kamera, auf der die Erkennung läuft, belegt eine Detektions-Instanz, genau wie bei den Standard-Erkennungen. Der Entwicklungspreis hängt von der Erkennung ab und wird angeboten, sobald die Anforderungen feststehen.' },
  { question: 'Wie lange dauert die Entwicklung?', answer: 'Das hängt von der Erkennung ab. Der Zeitplan wird zusammen mit den Anforderungen festgelegt, bevor die Arbeit beginnt, sodass Sie ihn kennen, bevor Sie sich festlegen.' },
  { question: 'Was geschieht mit den Aufnahmen, die für die Entwicklung genutzt werden?', answer: 'Sie werden gelöscht, sobald die Entwicklung abgeschlossen ist.' },
  { question: 'Kann eine individuelle Erkennung vor Ort laufen?', answer: 'Ja. Eine individuelle Erkennung lässt sich in der Cloud oder vor Ort (On-Premises) betreiben, mit derselben Wahl wie beim Rest der Plattform.' },
  { question: 'Bietet Camzify Gesichtserkennung an?', answer: 'Nicht als Standardfunktion. Keine der 23 Standard-Erkennungen identifiziert Personen: Merkmalserkennung und Personensuche arbeiten mit Kleidung, mitgeführten Gegenständen und Zeitpunkten, nicht mit Gesichtern. Gesichtserkennung gibt es nur als individuelle Entwicklung, auf Anfrage und nur für Kunden mit einer Rechtsgrundlage für ihren Einsatz.' },
  { question: 'Brauche ich eine Entwicklung, oder reicht eine Beschreibung in eigenen Worten?', answer: 'Probieren Sie zuerst die Verhaltensanomalie-Erkennung. Sie gehört zu den 23 Standard-Erkennungen: Sie beschreiben das Verhalten in eigenen Worten, etwa jemand raucht an der Laderampe, und sie alarmiert, wenn sie es sieht. Reicht das, muss nichts entwickelt werden; reicht es nicht, ist das der Zeitpunkt für eine individuelle Erkennung.' },
];

const built = [
  { name: 'Kennzeichenerkennung', desc: 'Liest US- und Singapur-Kennzeichen aus dem Kamerabild und alarmiert bei Kennzeichen auf einer Beobachtungsliste, für Tore und Parkflächen, an denen das Kennzeichen mehr zählt als das Fahrzeug. Deutsche Kennzeichen werden noch nicht gelesen.' },
  { name: 'Gesichtserkennung', desc: 'Nur auf Anfrage, für Kunden mit einer Rechtsgrundlage für ihren Einsatz. Nie Teil der Standard-Erkennungen; siehe unten.' },
  { name: 'Erkennung von Essen und Trinken', desc: 'Meldet Essen oder Trinken in Bereichen eines Standorts, in denen es nicht erlaubt ist.' },
  { name: 'Ladendiebstahlerkennung', desc: 'Meldet Ladendiebstahlverhalten auf Filialkameras, über das hinaus, worauf die Standard-Erkennungen achten.' },
];

const steps = [
  { title: 'Anforderung festlegen', body: 'Wir legen gemeinsam fest, was als Erkennung zählt, auf welchen Kameras, und was passieren soll, wenn sie auslöst. Was die Entwicklung selbst braucht, hängt von der Erkennung ab und wird hier geklärt.' },
  { title: 'Preis und Zeitplan', body: 'Stehen die Anforderungen fest, erhalten Sie den einmaligen Entwicklungspreis und den Zeitplan. Beide hängen von der Erkennung ab und werden deshalb erst an diesem Punkt genannt.' },
  { title: 'Entwicklung', body: 'Camzify entwickelt die Erkennung. Für die Entwicklung genutzte Aufnahmen werden gelöscht, sobald sie abgeschlossen ist.' },
  { title: 'Betrieb und Lizenz', body: 'Die Erkennung geht in der Cloud oder vor Ort in Betrieb und wird pro Kamera lizenziert, eine Detektions-Instanz pro Kamera, wie die Standard-Erkennungen.' },
];

export default function DeIndividuelleErkennungenPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'KI-Funktionen', href: '/de/ki-funktionen' },
      { label: 'Individuelle Erkennungen' },
    ]}>
      <FeatureHero
        eyebrow="KI-Erkennung · Auf Bestellung"
        title="Individuelle KI-Erkennungen, auf Bestellung entwickelt"
        lede={<><strong className="font-semibold text-foreground">Deckt keine der 23 Standard-Erkennungen ab, was ein Standort braucht, entwickelt Camzify die Erkennung.</strong> Die Anforderung wird zuerst gemeinsam festgelegt, die Entwicklung wird einmalig berechnet, und die fertige Erkennung wird wie jede andere pro Kamera lizenziert, in der Cloud oder vor Ort.</>}
        facts={['Einmaliger Preis, dann pro Kamera', 'Cloud oder vor Ort', 'Entwicklungsaufnahmen gelöscht']}
        primary={{ href: '/book-a-demo', label: 'Erkennung besprechen' }}
        secondary={{ href: '/de/ki-funktionen', label: 'Die 23 Standard-Erkennungen' }}
        visual={<SectionVisual locale="de" variant="flow" caption="Individuelle Erkennung · von der Anfrage bis live" alt="Vier Schritte: Anforderung festgelegt, Erkennung entwickelt, Betrieb in der Cloud oder vor Ort, Lizenz pro Kamera" steps={['Anforderung festgelegt', 'Erkennung entwickelt', 'Cloud oder vor Ort', 'Lizenz pro Kamera']} />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold">Für Kunden bereits entwickelte Erkennungen</h2>
            <p className="mt-3 max-w-prose text-muted-foreground">
              Sie begannen als Anforderungen, die keine Standard-Erkennung erfüllte. Es sind Beispiele, nicht die Grenze dessen, was sich entwickeln lässt.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {built.map((b) => (
                <li key={b.name} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-display text-base font-bold">{b.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Bevor Sie eine beauftragen</span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Zuerst in eigenen Worten beschreiben</h2>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Manche Anforderungen brauchen gar keine neue Erkennung. Die{' '}
                <Link href="/ai-features/behavioral-anomaly-detection" hrefLang="en-US" className="text-primary hover:underline">Verhaltensanomalie-Erkennung</Link>{' '}
                (Seite auf Englisch), eine der 23, lässt Sie das zu beobachtende Verhalten in eigenen Worten beschreiben, etwa jemand raucht an der Laderampe oder eine Brandschutztür steht offen, und alarmiert, wenn sie es sieht. Reicht das, muss nichts entwickelt werden. Reicht es nicht, ist das der Zeitpunkt für eine individuelle Erkennung, und der Satz, den Sie ausprobiert haben, ist ein guter Ausgangspunkt für die Anforderung.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">So läuft eine Entwicklung ab</h2>
          </ScrollReveal>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.06}>
                <li className="h-full rounded-xl border border-border bg-card p-6">
                  <span className="font-mono text-mono-sm text-primary">Schritt {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 font-display text-base font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto grid max-w-site gap-12 px-6 lg:grid-cols-2">
          <ScrollReveal>
            <div>
              <h2 className="font-display text-2xl font-bold">Was es kostet</h2>
              <p className="mt-4 text-muted-foreground">
                Zwei Teile: ein einmaliger Entwicklungspreis, angeboten sobald die Anforderung feststeht, und danach die übliche{' '}
                <Link href="/de/preise" className="text-primary hover:underline">Abrechnung pro Instanz</Link>: Jede Kamera, auf der die Erkennung läuft, belegt eine Detektions-Instanz, genau wie bei den Standard-Erkennungen. Am übrigen Konto ändert sich nichts.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <div>
              <h2 className="font-display text-2xl font-bold">Wo sie läuft</h2>
              <p className="mt-4 text-muted-foreground">
                In der Cloud oder vor Ort (On-Premises), mit derselben Wahl wie beim Rest der{' '}
                <Link href="/de/plattform/bereitstellung" className="text-primary hover:underline">Plattform</Link>. Ein Standort, der seine Aufnahmen auf eigenen Servern hält, kann eine individuelle Erkennung auch dort betreiben. Die für die Entwicklung genutzten Aufnahmen werden gelöscht, sobald sie abgeschlossen ist.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Identität</span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Gesichtserkennung nur auf Bestellung, nie als Standard</h2>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Keine der 23 Standard-Erkennungen identifiziert Personen. Merkmalserkennung und Personensuche arbeiten mit Kleidung, mitgeführten Gegenständen und Zeitpunkten, den Angaben, die auch ein Zeuge machen würde, nicht mit Gesichtern.
              </p>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Gesichtserkennung gibt es nur als individuelle Entwicklung, auf Anfrage und nur für Kunden mit einer Rechtsgrundlage für ihren Einsatz. Diese Grundlage herzustellen ist Sache des Kunden: Nach der DSGVO sind Gesichtsbilder, die zur Identifizierung einer Person verarbeitet werden, biometrische Daten einer besonderen Kategorie (Art. 9 DSGVO).
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16">
        <div className="mx-auto max-w-site px-6">
          <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Weiterlesen</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { href: '/de/ki-funktionen', title: 'Die 23 Standard-Erkennungen', desc: 'Was heute verfügbar ist, mit dem Katalog dessen, was jede erkennt.' },
              { href: '/de/sicherheit-und-datenschutz', title: 'Sicherheit und Datenschutz', desc: 'Verschlüsselung, Zugriffskontrolle und wo Aufnahmen liegen.' },
              { href: '/de/preise', title: 'Preise', desc: 'Abrechnung pro Instanz und Monat, pro Standort angeboten.' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group rounded-xl border border-border bg-card p-6 transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <h3 className="font-display text-base font-bold transition-colors group-hover:text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs} locale="de" />
    </PageShell>
  );
}
