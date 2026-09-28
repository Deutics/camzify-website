'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductShot } from '@/components/content/product-shot';
import { hrefFor, isForeignFor, type Locale } from '@/lib/i18n';

/**
 * The platform section.
 *
 * Was six identical icon cards — the fourth consecutive section using that device.
 * Now one large console screenshot with the modules as a selectable list beside it, so
 * the reader sees the actual product and can move between screens without leaving the
 * page. Selecting a module swaps the screenshot; every module still links to its own
 * page, so the internal linking is unchanged.
 *
 * Client component because of the selection state. Kept as low in the tree as possible
 * — everything above and below it stays server-rendered.
 *
 * Renders on both homepages. The words switch with `locale`; the screenshots, and the
 * chrome-bar label naming each console screen, stay English because the console is.
 */
type ModuleCopy = { title: string; desc: string; alt: string };

const modules: { href: string; shot: string; en: ModuleCopy; de: ModuleCopy }[] = [
  {
    href: '/platform/dashboard',
    shot: '/product-dashboard',
    en: {
      title: 'Dashboard',
      desc: 'Cameras online, unacknowledged criticals, alert volume, patrol compliance and retention coverage, with sub-user sites folded in or held separate.',
      alt: 'Camzify dashboard showing cameras live, critical events open, alerts today, patrol compliance, a live detection events chart and per-site health',
    },
    de: {
      title: 'Dashboard',
      desc: 'Kameras online, nicht quittierte kritische Ereignisse, Alarmaufkommen, Nachweis der Rundgänge und Stand der Aufbewahrung, mit den Standorten der Unterkonten zusammengefasst oder getrennt.',
      alt: 'Camzify-Dashboard mit Kameras live, offenen kritischen Ereignissen, Alarmen des Tages, Nachweis der Rundgänge, einem Live-Diagramm der Erkennungsereignisse und dem Zustand pro Standort',
    },
  },
  {
    href: '/platform/live-streaming',
    shot: '/product-live-streaming',
    en: {
      title: 'Live streaming',
      desc: 'Multi-camera grid grouped by site, adjustable density, slideshow mode, and explicit offline states rather than a silently blank tile.',
      alt: 'Camzify live streaming grid showing camera feeds across four sites with an offline site banner and latency mode controls',
    },
    de: {
      title: 'Live-Streaming',
      desc: 'Eine Kamerawand nach Standort gruppiert, einstellbare Dichte, Diashow-Modus und eindeutige Offline-Anzeigen statt einer stillschweigend leeren Kachel.',
      alt: 'Camzify-Live-Streaming mit Kamerabildern von vier Standorten, einem Hinweis auf einen Standort offline und Einstellungen für den Latenzmodus',
    },
  },
  {
    href: '/platform/video-backup-and-retention',
    shot: '/product-video-backup',
    en: {
      title: 'Video backup & retention',
      desc: 'Retention set per camera by days or storage cap, with playback, multi-camera comparison and allocation across sub-accounts.',
      alt: 'Camzify video backup screen showing per-camera retention settings and storage allocation across sites',
    },
    de: {
      title: 'Videospeicherung und Aufbewahrung',
      desc: 'Aufbewahrungsdauer pro Kamera nach Tagen oder Speicherlimit, mit Wiedergabe, Vergleich mehrerer Kameras und Zuteilung auf Unterkonten.',
      alt: 'Camzify-Videospeicherung mit Einstellungen zur Aufbewahrungsdauer pro Kamera und der Speicherzuteilung auf die Standorte',
    },
  },
  {
    href: '/platform/notifications-and-alerts',
    shot: '/product-notifications',
    en: {
      title: 'Notifications & alerts',
      desc: 'One queue filtered by severity, site, camera or feature, with acknowledgment state, escalation and false-positive marking.',
      alt: 'Camzify notifications screen with severity filters, acknowledgment queue and average time to acknowledge',
    },
    de: {
      title: 'Alarme und Benachrichtigungen',
      desc: 'Eine Warteschlange, gefiltert nach Schweregrad, Standort, Kamera oder Funktion, mit Quittierungsstatus, Eskalation und Markierung von Fehlalarmen.',
      alt: 'Camzify-Benachrichtigungen mit Filtern nach Schweregrad, der Warteschlange zur Quittierung und der durchschnittlichen Zeit bis zur Quittierung',
    },
  },
  {
    href: '/platform/user-management',
    shot: '/product-user-management',
    en: {
      title: 'User management',
      desc: 'Sub-users, permission groups with per-module view/edit/delete, site-level access, and AI instance allocation from your license.',
      alt: 'Camzify user management screen showing sub-users with permission groups, instance allocation and access controls',
    },
    de: {
      title: 'Benutzerverwaltung',
      desc: 'Unterkonten, Berechtigungsgruppen mit Ansehen, Bearbeiten und Löschen pro Modul, Zugriff pro Standort und Zuteilung der KI-Instanzen aus Ihrer Lizenz.',
      alt: 'Camzify-Benutzerverwaltung mit Unterkonten und ihren Berechtigungsgruppen, der Zuteilung von Instanzen und der Zugriffssteuerung',
    },
  },
  {
    href: '/platform/license-and-instance-management',
    shot: '/product-license-plan',
    en: {
      title: 'License & instances',
      desc: 'What is activated, what is granted to sub-accounts and what remains available, per feature, with quota requests.',
      alt: 'Camzify plan and usage screen showing subscription term, instance totals and a per-feature allocation table',
    },
    de: {
      title: 'Lizenz und Instanzen',
      desc: 'Was aktiviert ist, was an Unterkonten vergeben wurde und was noch verfügbar ist, pro Funktion, mit Anfragen für weitere Kontingente.',
      alt: 'Camzify-Ansicht zu Tarif und Nutzung mit Laufzeit des Abonnements, Summen der Instanzen und einer Tabelle der Zuteilung pro Funktion',
    },
  },
];

const COPY = {
  en: {
    eyebrow: 'The platform',
    heading: 'Everything runs from one console',
    lede: 'Patrols, detections, streams, storage and access control are one product, not five integrations. Pick a module to see it.',
    explore: 'Explore the platform',
    tablist: 'Platform modules',
    caption: 'Console screens shown with sample sites and cameras. Figures are interface illustrations, not customer data.',
  },
  de: {
    eyebrow: 'Die Plattform',
    heading: 'Alles läuft über eine Konsole',
    lede: 'Rundgänge, Erkennungen, Streams, Speicherung und Zugriffssteuerung sind ein Produkt, nicht fünf Integrationen. Wählen Sie ein Modul, um es zu sehen.',
    explore: 'Zur Plattform',
    tablist: 'Module der Plattform',
    caption: 'Konsolenansichten mit Beispielstandorten und -kameras. Die Zahlen illustrieren die Oberfläche und sind keine Kundendaten.',
  },
} as const;

export function PlatformModules({ locale = 'en' }: { locale?: Locale }) {
  const [active, setActive] = useState(0);
  const current = modules[active];
  const copy = COPY[locale];
  const currentCopy = current[locale];
  const currentForeign = isForeignFor(current.href, locale);

  return (
    <section className="border-t border-border bg-muted/20 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-mono-sm uppercase text-primary">{copy.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {copy.heading}
            </h2>
            <p className="mt-5 max-w-prose text-body text-muted-foreground">
              {copy.lede}
            </p>
          </div>
          <Link
            href={hrefFor('/platform', locale)}
            className="rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {copy.explore} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-14">
          <div>
          <div className="flex flex-col gap-1.5" role="tablist" aria-label={copy.tablist}>
            {modules.map((m, i) => {
              const selected = i === active;
              return (
                  <button
                    key={m.href}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(i)}
                    className={`w-full rounded-xl border p-5 text-left transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      selected
                        ? 'border-primary/50 bg-card shadow-lg'
                        : 'border-transparent bg-transparent hover:border-border hover:bg-card/60'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span
                        className={`font-display text-base font-bold ${selected ? 'text-primary' : ''}`}
                      >
                        {m[locale].title}
                      </span>
                      {selected && (
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      )}
                    </span>
                    <span
                      className={`mt-2 block text-sm leading-relaxed text-muted-foreground transition-all ${
                        selected ? 'opacity-100' : 'opacity-70'
                      }`}
                    >
                      {m[locale].desc}
                    </span>
                  </button>
              );
            })}
          </div>
          {/* The link lives outside the tab list, which may only own tabs. */}
          <Link
            href={hrefFor(current.href, locale)}
            hrefLang={currentForeign ? 'en-US' : undefined}
            className="ml-5 mt-3 inline-flex min-h-[44px] items-center gap-1.5 rounded px-1 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {locale === 'de' ? (
              <>
                {currentCopy.title} öffnen
                {currentForeign && (
                  <span title="Seite auf Englisch" className="rounded border border-border px-1 font-mono text-[10px] font-semibold leading-4 text-muted-foreground">
                    EN
                  </span>
                )}
              </>
            ) : (
              <>Open {currentCopy.title}</>
            )}{' '}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductShot
              key={current.shot}
              src={current.shot}
              alt={currentCopy.alt}
              label={`${current.en.title} · Camzify console`}
              sizes="(max-width: 1024px) 100vw, 620px"
            />
            <p className="mt-4 text-xs text-muted-foreground">
              {copy.caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
