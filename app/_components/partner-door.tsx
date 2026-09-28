import Link from 'next/link';
import { ArrowRight, Calculator, Users, ShieldAlert, Cable } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { hrefFor, isForeignFor, type Locale } from '@/lib/i18n';

/*
 * The partner door, high on the homepage.
 *
 * The business's own lead files say who is reading: owners of guarding companies,
 * monitoring companies and CCTV installers, nine in ten with fewer than fifty staff.
 * For them the argument is revenue, not a cost to cut, and it belongs above the fold
 * of the second screen rather than in a paragraph under the cost section. The ROI
 * calculator sits beside the cards because it is the thing that buyer opens first.
 */
const segmentMeta = [
  { icon: Users, href: '/partners/for-security-agencies' },
  { icon: ShieldAlert, href: '/partners/for-monitoring-centers' },
  { icon: Cable, href: '/partners/for-security-integrators' },
];

const COPY = {
  en: {
    eyebrow: 'For security agencies, monitoring companies and installers',
    heading: 'Coverage to sell, not a cost to cut',
    body: 'A guarding company can only sell the hours it can staff. Virtual patrolling is coverage that is not capped by headcount, sold alongside the guards you already provide, on the cameras your clients already own.',
    segments: [
      {
        title: 'Security agencies',
        desc: 'Sell overnight coverage across every client site that you cannot staff, with a report per client after each round.',
      },
      {
        title: 'Monitoring companies',
        desc: 'Run rounds for every agency you monitor for, notify their guards from the round itself, and hand each one a report.',
      },
      {
        title: 'CCTV and alarm installers',
        desc: 'Attach a monthly service to the cameras you already install. No new hardware, no new staff, a clean hand-over.',
      },
    ],
    howItWorks: 'How it works',
    roiEyebrow: 'ROI calculator',
    roiHeading: 'Run your numbers',
    roiBody: 'Client sites, the price you would charge, the hours you cannot staff. See the recurring revenue and the rounds delivered, at your rate. Site operators get the other view: what routine guard rounds cost today.',
    roiCta: 'Open the calculator',
  },
  de: {
    eyebrow: 'Für Sicherheitsdienste, Leitstellen und Errichter',
    heading: 'Abdeckung, die Sie verkaufen – nicht Kosten, die Sie senken',
    body: 'Ein Sicherheitsdienst kann nur die Stunden verkaufen, die er mit Personal besetzen kann. Der KI-gestützte Wächterrundgang ist Abdeckung, die nicht durch die Personalstärke begrenzt ist – verkauft neben den Wachpersonen, die Sie bereits stellen, auf den Kameras, die Ihre Kunden bereits besitzen.',
    segments: [
      {
        title: 'Sicherheitsdienste',
        desc: 'Verkaufen Sie nächtliche Abdeckung für jeden Kundenstandort, den Sie nicht besetzen können, mit einem Kontrollprotokoll pro Kunde nach jedem Rundgang.',
      },
      {
        title: 'Leitstellen',
        desc: 'Führen Sie Rundgänge für jeden Sicherheitsdienst durch, für den Sie überwachen, benachrichtigen Sie dessen Wachpersonen direkt aus dem Rundgang und übergeben Sie jedem ein Kontrollprotokoll.',
      },
      {
        title: 'Errichter von Video- und Alarmanlagen',
        desc: 'Ergänzen Sie die Kameras, die Sie ohnehin installieren, um einen monatlichen Service. Keine neue Hardware, kein neues Personal, eine saubere Übergabe.',
      },
    ],
    howItWorks: 'So funktioniert es',
    roiEyebrow: 'ROI-Rechner',
    roiHeading: 'Rechnen Sie selbst nach',
    roiBody: 'Kundenstandorte, der Preis, den Sie berechnen würden, die Stunden, die Sie nicht besetzen können. Sehen Sie den wiederkehrenden Umsatz und die geleisteten Rundgänge zu Ihrem Satz. Standortbetreiber erhalten die andere Sicht: was routinemäßige Kontrollgänge durch Wachpersonal heute kosten.',
    roiCta: 'Rechner öffnen (EN)',
  },
} as const;

export function PartnerDoor({ locale = 'en' }: { locale?: Locale }) {
  const c = COPY[locale];
  const segments = segmentMeta.map((m, i) => ({ ...m, ...c.segments[i] }));
  const roiHref = '/roi-calculator#agency';
  return (
    <section id="partners" className="py-20 sm:py-24">
      <div className="mx-auto max-w-site px-6">
        <ScrollReveal>
          <span className="font-mono text-mono-sm uppercase text-primary">{c.eyebrow}</span>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {c.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            {c.body}
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-3">
            {segments.map((s, i) => (
              <ScrollReveal key={s.href} delay={i * 0.06}>
                <Link
                  href={hrefFor(s.href, locale)}
                  hrefLang={isForeignFor(s.href, locale) ? 'en-US' : undefined}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
                >
                  <s.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-base font-bold group-hover:text-primary">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    {c.howItWorks} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.18}>
            <Link
              href={hrefFor(roiHref, locale)}
              hrefLang={isForeignFor(roiHref, locale) ? 'en-US' : undefined}
              className="group flex h-full flex-col justify-between rounded-xl border border-primary/30 bg-primary/5 p-6 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg"
            >
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-mono-sm uppercase text-primary">
                  <Calculator className="h-4 w-4" aria-hidden="true" /> {c.roiEyebrow}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold">{c.roiHeading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {c.roiBody}
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all group-hover:bg-primary/90">
                {c.roiCta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
