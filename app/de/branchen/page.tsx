import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { serviceSchema } from '@/lib/seo';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { SiteImage } from '@/components/content/site-image';
import { Warehouse, Store, Factory, HardHat, HeartPulse, GraduationCap, Landmark, Car, Zap, Building, Home, UtensilsCrossed, Archive, Trash2, Radio, MapPin } from 'lucide-react';

/**
 * German counterpart of /industries (pair in lib/i18n.ts). All sixteen industries are
 * listed in the English order. Three have a German page (lib/i18n.ts); the other
 * thirteen link to the English page and say so on the card.
 */
const pageMeta = {
  title: 'Branchen | KI-Videoüberwachung nach Branche',
  description: 'KI-gestützter Wächterrundgang und Videoanalyse von Camzify für Lager, Einzelhandel, Industrie, Baustellen, Gesundheitswesen und weitere Branchen.',
  path: '/de/branchen',
};

export const metadata = generatePageMeta(pageMeta);

/** `de` is the German page where one exists; otherwise the card links to the English page. */
const items = [
  { slug: 'warehouses', de: '/de/branchen/lager-und-logistik', name: 'Lager und Logistik', icon: Warehouse },
  { slug: 'retail', name: 'Einzelhandel', icon: Store },
  { slug: 'manufacturing', de: '/de/branchen/industrie-und-produktion', name: 'Industrie und Produktion', icon: Factory },
  { slug: 'construction-sites', de: '/de/branchen/baustellen', name: 'Baustellen', icon: HardHat },
  { slug: 'healthcare', name: 'Gesundheitswesen', icon: HeartPulse },
  { slug: 'education-facilities', name: 'Bildungseinrichtungen', icon: GraduationCap },
  { slug: 'financial-services', name: 'Banken und Finanzdienstleister', icon: Landmark },
  { slug: 'automotive', name: 'Autohäuser und Werkstätten', icon: Car },
  { slug: 'energy', name: 'Energie und Versorgung', icon: Zap },
  { slug: 'property-management', name: 'Immobilienverwaltung', icon: Building },
  { slug: 'residential', name: 'Wohnanlagen', icon: Home },
  { slug: 'restaurants', name: 'Gastronomie', icon: UtensilsCrossed },
  { slug: 'self-storage', name: 'Self-Storage', icon: Archive },
  { slug: 'waste-management', name: 'Entsorgung und Recycling', icon: Trash2 },
  { slug: 'remote-sites', name: 'Abgelegene Standorte', icon: Radio },
  { slug: 'multiple-sites', name: 'Mehrere Standorte', icon: MapPin },
];

const faqs = [
  { question: 'Unterscheidet sich das Produkt je Branche?', answer: 'Nein. Dasselbe Konto, dieselben Kameras und dieselben Erkennungen dienen jeder Branche. Was sich unterscheidet, ist die Einrichtung: welche Erkennungen auf welchen Kameras laufen, was die Checkliste an jedem Kontrollpunkt abfragt und wer benachrichtigt wird.' },
  { question: 'Meine Branche ist nicht aufgeführt. Passt Camzify trotzdem?', answer: 'Wenn der Standort Kameras hat und es Stunden gibt, in denen niemand hinsieht: ja. Die Seiten zu Anwendungsfällen (auf Englisch) gehen von der Situation statt von der Branche aus und sind vielleicht der bessere Einstieg.' },
  { question: 'Stammen die Einsatzhinweise auf diesen Seiten von echten Kunden?', answer: 'Sie beschreiben, was ein erster Einsatz typischerweise umfasst. Es sind keine Fallstudien, weil wir Kundennamen und Zahlen nicht ohne Erlaubnis veröffentlichen und bisher keine Erlaubnis vorliegt.' },
  { question: 'Wo fange ich an?', answer: 'Fragen Sie eine Demo auf Ihren eigenen Kameras an (das Formular ist auf Englisch). Ein Live-Rundgang an einem echten Standort sagt mehr als jede Branchenseite.' },
];

export default function DeBranchenHub() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: 'Branchen', description: pageMeta.description, path: pageMeta.path, serviceType: 'KI-Videoüberwachung und KI-gestützter Wächterrundgang' })]} breadcrumbs={[{ label: 'Branchen' }]}>
      <section className="pb-20">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Branchen</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Jeder Standort ist anders, aber die Sicherheitsaufgabe ist dieselbe: Kameras zeichnen auf, Wachpersonal kann nicht überall sein, und niemand prüft, was geprüft werden müsste. Der <Link href="/de/ki-waechterrundgang" className="text-primary hover:underline">KI-gestützte Wächterrundgang</Link> von Camzify wird für jede Umgebung eigens eingerichtet, um die Risiken der jeweiligen Branche abzudecken.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            Drei Branchenseiten gibt es auf Deutsch; die übrigen führen zur englischen Fassung.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((ind, i) => (
              <ScrollReveal key={ind.slug} delay={i * 0.04}>
                <Link href={ind.de ?? `/industries/${ind.slug}`} className="group flex flex-col items-center overflow-hidden rounded-xl border border-border bg-card pb-6 text-center shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
                  <div className="mb-5 aspect-video w-full overflow-hidden border-b border-border">
                    <SiteImage src={`/industry-thumb-${ind.slug}.webp`} alt={`${ind.name}: ein typischer Standort, den Camzify überwacht`} width={1600} height={900} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="h-full w-full object-cover" />
                  </div>
                  <ind.icon className="h-8 w-8 text-primary" />
                  <h2 className="mt-3 font-display text-base font-bold">{ind.name}</h2>
                  <span className="mt-2 text-xs font-semibold text-primary">{ind.de ? 'Ansehen →' : 'Auf Englisch →'}</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <FaqSection items={faqs} locale="de" />
    </PageShell>
  );
}
