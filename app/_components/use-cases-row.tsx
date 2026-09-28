import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { SectionAtmosphere } from '@/components/motion/section-atmosphere';
import { Stagger, StaggerItem } from '@/components/motion/stagger';
import type { Locale } from '@/lib/i18n';

/**
 * Use-case row.
 *
 * The homepage previously linked to no use-case pages at all, despite thirteen of them
 * existing and matching some of the highest-intent search terms in the category. These
 * six are the ones with the clearest commercial intent.
 *
 * Renders on both homepages. The use-case pages exist in English only, so on the German
 * side every card still links to the English page and carries an "EN" marker.
 */
type UseCaseCopy = { title: string; desc: string };

const useCases: { href: string; en: UseCaseCopy; de: UseCaseCopy }[] = [
  {
    href: '/use-cases/perimeter-security',
    en: {
      title: 'Perimeter security',
      desc: 'Fence lines and gates checked every round, with directional rules so passing traffic stays quiet.',
    },
    de: {
      title: 'Perimeterschutz',
      desc: 'Zäune und Tore bei jedem Rundgang geprüft, mit Richtungsregeln, damit vorbeifahrender Verkehr keinen Alarm auslöst.',
    },
  },
  {
    href: '/use-cases/after-hours-monitoring',
    en: {
      title: 'After-hours monitoring',
      desc: 'The hours nobody is rostered, patrolled on a schedule you set, with a report each morning.',
    },
    de: {
      title: 'Überwachung außerhalb der Betriebszeiten',
      desc: 'Die Stunden, für die niemand eingeteilt ist, nach einem Zeitplan kontrolliert, den Sie festlegen, mit einem Kontrollprotokoll an jedem Morgen.',
    },
  },
  {
    href: '/use-cases/guard-tour-verification',
    en: {
      title: 'Guard tour verification',
      desc: 'Evidence the round happened, per checkpoint, without relying on a signed sheet.',
    },
    de: {
      title: 'Nachweis von Kontrollgängen',
      desc: 'Der Beleg, dass der Rundgang stattgefunden hat, pro Kontrollpunkt, ohne sich auf eine unterschriebene Liste zu verlassen.',
    },
  },
  {
    href: '/use-cases/theft-prevention',
    en: {
      title: 'Theft prevention',
      desc: 'Stockrooms, docks and high-value areas verified clear at close and intact at open.',
    },
    de: {
      title: 'Diebstahlprävention',
      desc: 'Lagerräume, Laderampen und Bereiche mit hochwertiger Ware bei Schließung als leer und bei Öffnung als unversehrt bestätigt.',
    },
  },
  {
    href: '/use-cases/remote-site-monitoring',
    en: {
      title: 'Remote site monitoring',
      desc: 'Unmanned locations where the nearest responder is an hour away and early detection is everything.',
    },
    de: {
      title: 'Überwachung abgelegener Standorte',
      desc: 'Unbesetzte Standorte, an denen die nächste Einsatzkraft eine Stunde entfernt ist und frühes Erkennen alles entscheidet.',
    },
  },
  {
    href: '/use-cases/loading-dock-monitoring',
    en: {
      title: 'Loading dock monitoring',
      desc: 'Doors left open outside a delivery window, and vehicle movement when the bay should be closed.',
    },
    de: {
      title: 'Überwachung von Laderampen',
      desc: 'Tore, die außerhalb eines Lieferfensters offen stehen, und Fahrzeugbewegungen, wenn die Rampe geschlossen sein sollte.',
    },
  },
];

const COPY = {
  en: {
    eyebrow: 'Use Cases',
    heading: 'What teams actually run it for',
    all: 'All use cases',
  },
  de: {
    eyebrow: 'Anwendungsfälle',
    heading: 'Wofür Teams es tatsächlich einsetzen',
    all: 'Alle Anwendungsfälle',
  },
} as const;

/** Marks a link on a German page that leads to an English-only page. */
function EnMark() {
  return (
    <span
      title="Seite auf Englisch"
      className="ml-1.5 inline-block rounded border border-border px-1 align-middle font-mono text-[10px] font-semibold leading-4 text-muted-foreground"
    >
      EN
    </span>
  );
}

export function UseCasesRow({ locale = 'en' }: { locale?: Locale }) {
  const copy = COPY[locale];
  const de = locale === 'de';
  // Every target here is English-only, so the German side keeps the English hrefs.
  const foreign = de ? { hrefLang: 'en-US' } : {};

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <SectionAtmosphere variant="left" intensity="subtle" />
      <div className="relative z-10 mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="font-mono text-mono-sm uppercase text-primary">{copy.eyebrow}</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {copy.heading}
              </h2>
              {de && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Die Seiten zu Anwendungsfällen gibt es bisher nur auf Englisch.
                </p>
              )}
            </div>
            <Link
              href="/use-cases"
              {...foreign}
              className="rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {copy.all}
              {de && <EnMark />} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </ScrollReveal>

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {useCases.map((u) => (
            <StaggerItem key={u.href} className="h-full">
              <Link
                href={u.href}
                {...foreign}
                className="group flex h-full flex-col bg-card p-7 transition-colors duration-normal hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <h3 className="font-display text-lg font-bold transition-colors group-hover:text-primary">
                  {u[locale].title}
                  {de && <EnMark />}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{u[locale].desc}</p>
                <span
                  aria-hidden="true"
                  className="mt-4 text-muted-foreground transition-transform duration-fast group-hover:translate-x-1 group-hover:text-primary"
                >
                  →
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
