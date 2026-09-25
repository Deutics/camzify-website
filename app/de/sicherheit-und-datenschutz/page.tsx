import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * German counterpart of /security-and-compliance, and the page German buyers read for
 * DSGVO. Every framework is in Vorbereitung, nicht erteilt, target end of 2026.
 *
 * Differences from the English page, both deliberate:
 *   - A "Speicherort" section states where footage is stored (the AWS region nearest
 *     the customer's sites, never a named region) with the DSGVO / § 4 BDSG context
 *     worded as on /de/cloud-videomanagementsystem. The English description promises
 *     data residency; this is where the German page delivers it.
 *   - The English line "target dates are not published" sits next to the published
 *     end-of-2026 target. The German text says no dates beyond that target are given.
 */
const pageMeta = {
  title: 'Sicherheit und Datenschutz: DSGVO, Speicherung',
  description: 'Verschlüsselung, Zugriffskontrolle, Speicherort der Aufnahmen und der offene Stand bei DSGVO, SOC 2 und ISO 27001: so geht Camzify mit Ihren Videodaten um.',
  path: '/de/sicherheit-und-datenschutz',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  { question: 'Ist Camzify nach SOC 2 oder ISO 27001 zertifiziert?', answer: 'Noch nicht. Beide sind in Vorbereitung und nicht erteilt; in Vorbereitung ist ebenso die Ausrichtung an PDPA und DSGVO. Ziel ist, alle vier bis Ende 2026 abzuschließen. Diese Seite beschreibt den aktuellen Stand und ändert sich erst, wenn ein Zertifikat tatsächlich vorliegt.' },
  { question: 'Wie werden Videodaten bei der Übertragung und im Speicher geschützt?', answer: 'Streams werden über TLS 1.2 oder höher übertragen, gespeicherte Aufnahmen sind mit AES-256 verschlüsselt. Der Zugriff ist rollenbasiert über Berechtigungsgruppen geregelt, und jede Aktion im Konto wird protokolliert.' },
  { question: 'Wo werden die Aufnahmen gespeichert?', answer: 'In Amazon S3, in der AWS-Region, die den Standorten des Kunden am nächsten liegt.' },
  { question: 'Wer sieht bei einem mandantenfähigen Konto die Aufnahmen eines Kunden?', answer: 'Nur Logins, die auf die Standorte dieses Kunden beschränkt sind. Ein Unterkonto sieht seine eigenen Kameras, Alarme und Protokolle; das übergeordnete Konto sieht alles, was darunter liegt. Das Audit-Protokoll hält fest, wer was geöffnet hat.' },
  { question: 'Identifiziert die KI Personen?', answer: 'Nein. Die Merkmalserkennung beschreibt Kleidung, mitgeführte Gegenstände und Bewegungsrichtung; nichts auf der Plattform erkennt Gesichter oder benennt Personen, und wir sagen das auf jeder Seite, auf der man es vermuten könnte.' },
];

const frameworks = [
  {
    name: 'PDPA (Singapur)',
    detail: 'Ausrichtung am Personal Data Protection Act für Datenverarbeitung, Einwilligung und Meldung von Datenschutzverletzungen, für unsere Geschäftstätigkeit und unsere Kunden in Singapur.',
  },
  {
    name: 'DSGVO',
    detail: 'Ausrichtung an der Datenschutz-Grundverordnung für betroffene Personen in der EU, mit Rechtsgrundlage, Betroffenenrechten und den Pflichten als Auftragsverarbeiter.',
  },
  {
    name: 'SOC 2 Type II',
    detail: 'Kontrollen für Sicherheit, Verfügbarkeit und Vertraulichkeit, nachgewiesen über einen Beobachtungszeitraum statt zu einem einzelnen Zeitpunkt.',
  },
  {
    name: 'ISO 27001',
    detail: 'Informationssicherheits-Managementsystem mit Risikobewertung, Kontrollen und kontinuierlicher Verbesserung.',
  },
];

export default function DeSicherheitUndDatenschutzPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Sicherheit und Datenschutz' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Sicherheit und Datenschutz</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Sicherheit ist die Grundlage einer Plattform für den{' '}
            <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützten Wächterrundgang</Link>.
            Diese Seite beschreibt unsere Sicherheitsmaßnahmen, den Schutz Ihrer Daten und den
            Stand unserer Zertifizierungen. Wo wir eine Zertifizierung noch nicht erhalten haben,
            sagen wir das offen.
          </p>
          <div className="mt-16 max-w-prose space-y-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Verschlüsselung</h2>
              <p className="mt-4 text-muted-foreground">
                Alle Kamerastreams werden über verschlüsselte Verbindungen (TLS 1.2 oder höher)
                übertragen. Gespeicherte Videoaufnahmen sind mit AES-256 verschlüsselt. Die
                Kommunikation über die API läuft über HTTPS, wo unterstützt mit Certificate Pinning.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Speicherort</h2>
              <p className="mt-4 text-muted-foreground">
                Die Aufnahmen liegen in Amazon S3, in der AWS-Region, die den Standorten des Kunden
                am nächsten liegt. Videoaufnahmen, auf denen Personen erkennbar sind, sind
                personenbezogene Daten im Sinne der DSGVO; § 4 BDSG regelt zusätzlich die
                Beobachtung öffentlich zugänglicher Räume – etwa Eingänge, Parkflächen oder
                Verkaufsflächen, wie sie Camzify-Kunden typischerweise überwachen.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Zugriffskontrolle</h2>
              <p className="mt-4 text-muted-foreground">
                Die Plattform unterstützt rollenbasierte Zugriffskontrolle über die{' '}
                <Link href="/de/plattform/benutzerverwaltung" className="text-primary hover:underline">Benutzerverwaltung</Link>{' '}
                und{' '}
                <Link href="/platform/permission-groups" className="text-primary hover:underline">Berechtigungsgruppen</Link>{' '}
                (auf Englisch). Jede Aktion wird im Audit-Protokoll festgehalten.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Stand der Zertifizierungen</h2>
              <p className="mt-4 text-muted-foreground">
                Wir führen unsere Zertifizierungsarbeit offen auf, auch dort, wo sie noch nicht
                abgeschlossen ist. Alles Folgende ist{' '}
                <strong className="font-semibold text-foreground">in Vorbereitung und nicht erteilt</strong>;
                Ziel ist, alle vier Vorhaben bis Ende 2026 abzuschließen. Camzify sollte nach keinem
                dieser Rahmenwerke als zertifiziert bezeichnet werden, solange diese Seite nichts
                anderes sagt.
              </p>
              <ul className="mt-6 space-y-3">
                {frameworks.map((item) => (
                  <li key={item.name} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-display font-bold">{item.name}</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-warn/15 px-3 py-1 font-mono text-mono-sm uppercase text-warn">
                        In Vorbereitung
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                Über das Ziel Ende 2026 hinaus nennen wir keine Termine je Rahmenwerk, weil wir
                nichts zusagen, was wir nicht garantieren können. Wenn Ihr Beschaffungsprozess den
                aktuellen Stand schriftlich verlangt,{' '}
                <Link href="/contact" className="text-primary hover:underline">schreiben Sie uns</Link>{' '}
                (Kontaktseite auf Englisch), und wir sagen Ihnen genau, wo jeder Punkt steht.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <FaqSection items={faqs} locale="de" />
    </PageShell>
  );
}
