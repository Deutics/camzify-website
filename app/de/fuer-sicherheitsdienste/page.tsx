import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { serviceSchema } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const pageMeta = {
  title: 'Virtueller Wächterrundgang für Sicherheitsdienste',
  description: 'Bieten Sie Kunden den virtuellen Wächterrundgang als zusätzliche, abrechenbare Leistung an: für Standorte und Nächte, die personell nicht abzudecken sind.',
  path: '/de/fuer-sicherheitsdienste',
};

export const metadata = generatePageMeta({ ...pageMeta, locale: 'de_DE', type: 'website' });

const faqs = [
  {
    question: 'Ersetzt das den Streifendienst, den mein Unternehmen anbietet?',
    answer: 'Nein. Der virtuelle Wächterrundgang übernimmt die Standorte und Nächte, die personell nicht abgedeckt werden können, und prüft dort definierte Punkte je Kamera nach Zeitplan. Wachpersonal bleibt für den Einsatz vor Ort und für Kunden zuständig, bei denen physische Präsenz gefordert ist.',
  },
  {
    question: 'Wie werden mehrere Kundenstandorte über ein Konto verwaltet?',
    answer: 'Jeder Kunde erhält ein eigenes, abgegrenztes Unterkonto mit Zugriff nur auf seine eigenen Standorte und Kameras. Instanzen für KI-Funktionen, Wächterrundgänge und Speicher werden aus dem eigenen Lizenzkontingent zugewiesen; erreicht ein Kunde ein Limit, geht die Anfrage zur Freigabe an Sie statt automatisch gewährt zu werden.',
  },
  {
    question: 'Kann ein Kunde nur seine eigenen Berichte sehen?',
    answer: 'Ja. Ein Unterkonto erreicht ausschließlich die ihm zugewiesenen Standorte, sodass ein Kunde beim Login nur seine eigenen Kameras, Rundgang-Berichte und Meldungen sieht. Berichte enthalten Standort- und Kameranamen, Checklistenergebnisse, das jeweils geprüfte Bild und die Erfüllungsquote der Runde.',
  },
  {
    question: 'Was hat das mit DIN 77200 zu tun?',
    answer: 'DIN 77200 regelt Qualitätsanforderungen an Sicherheitsdienstleistungen und wird zunehmend in Ausschreibungen gefordert; Streifendienst und dessen Dokumentation sind Teil dieser Anforderungen. Camzify hält DIN 77200 nicht selbst – die Norm richtet sich an Sicherheitsdienstleister, nicht an Softwareanbieter –, aber der dokumentierte Rundgang mit Bild pro Kontrollpunkt liefert genau die Nachweise, die ein Kunde für seine eigene DIN-77200-konforme Dokumentation braucht.',
  },
  {
    question: 'Ist das ein wachsender Markt in Deutschland?',
    answer: 'Eine Studie von Lünendonk & Hossenfelder mit dem BDSW (Oktober 2025) fand, dass die Hälfte der 25 größten deutschen Sicherheitsdienstleister bereits Robotik oder digitale Lösungen einsetzt, KI-gestützte Videoüberwachung eingeschlossen, bei 7,5 % Umsatz- und 2,2 % Personalwachstum im Jahr 2024 – getrieben vor allem durch Fachkräftemangel.',
  },
];

export default function FuerSicherheitsdienstePage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
            schema={[serviceSchema({ name: 'Virtueller Wächterrundgang für Sicherheitsdienste', description: pageMeta.description, path: pageMeta.path, audience: 'Sicherheitsdienste und Bewachungsunternehmen' })]}
      breadcrumbs={[{ label: 'Für Sicherheitsdienste' }]}
    >
      <section className="pb-16 pt-4">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Für Sicherheitsdienste</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Ein virtueller Wächterrundgang, den Sie Ihren Kunden anbieten
          </h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            Der Fachkräftemangel trifft die Branche direkt: Standorte und Nächte, die sich mit Wachpersonal nicht mehr wirtschaftlich abdecken lassen. Ein virtueller Wächterrundgang auf den vorhandenen Kameras des Kunden ist eine zusätzliche, monatlich abgerechnete Leistung – verkauft pro Kamera, nicht pro Stunde.
          </p>
          <div className="mt-8">
            <Link href="/book-a-demo" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              Demo anfragen <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Ein Konto, mehrere Kunden</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Standorte sind die Grundeinheit</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                Jeder Kunde bekommt ein eigenes Unterkonto, abgegrenzt auf seine eigenen Standorte und Kameras. Sie weisen Instanzen für Rundgänge, KI-Funktionen und Speicher aus Ihrem eigenen Kontingent zu, und ein Kunde sieht ausschließlich seine eigenen Berichte – nie die eines anderen Kunden.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">DIN 77200 und Dokumentation</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Nachweise statt Logbuch</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                Ein klassisches Wachbuch bestätigt, dass ein Kontrollpunkt erreicht wurde – nicht, was dort tatsächlich zu sehen war. Ein virtueller Rundgang prüft einen definierten Zustand je Kamera und speichert das dabei geprüfte Bild, sodass der Bericht zeigt, dass das Tor tatsächlich geschlossen war, statt nur, dass jemand daneben stand. Für die eigene DIN-77200-Dokumentation eines Kunden ist genau das der relevante Unterschied.
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
              { href: '/de', title: 'Cloud-Videomanagement', desc: 'Die Übersicht.' },
              { href: '/de/virtueller-waechterrundgang', title: 'Virtueller Wächterrundgang', desc: 'Der Begriff, im Detail.' },
              { href: '/de/fuer-installateure', title: 'Für Installateure', desc: 'VdS 2366, wiederkehrende Umsätze.' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group rounded-xl border border-border bg-card p-6 transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <h3 className="font-display text-base font-bold transition-colors group-hover:text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs} heading="Fragen für Sicherheitsdienste" eyebrow="FAQ" />
    </PageShell>
  );
}
