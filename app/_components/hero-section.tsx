'use client';

import Link from 'next/link';
import { ArrowRight, Calculator, MousePointerClick } from 'lucide-react';
import { PatrolSweepHero } from '@/components/motion/patrol-sweep-hero';
import { HeroBgAnimation } from '@/components/motion/hero-bg-animation';
import { hrefFor, isForeignFor, type Locale } from '@/lib/i18n';

/**
 * The hero.
 *
 * Positioning changed here on purpose. The previous headline — "Patrolled 24/7.
 * Without the guard." — sold one capability and argued against the buyer the business
 * has since named as its primary target (security agencies). The product is a cloud
 * video management system with AI detection and virtual patrolling on top, and that
 * is what the headline and the definition now say, in that order: category first so
 * search engines and answer engines can classify it, the patrol differentiator second
 * so it still stands out from every other cloud VMS.
 *
 * The definition sentence is written to be extracted whole: brand, category, the
 * "cameras you already own" qualifier, and the capability list in one sentence that
 * survives being quoted with nothing around it.
 *
 * The words switch by `locale`; the design does not. The camera wall on the right is
 * faux console UI and stays English on both pages, because the console is English-only.
 */
const COPY = {
  en: {
    eyebrow: 'Cloud VMS with virtual patrolling',
    headline: 'Every camera watched.',
    headlineAccent: 'Every site checked.',
    definition: 'Camzify is an AI-powered cloud video management system for the cameras you already own.',
    lede: 'Scheduled patrol rounds check every site on a checklist, message the guard when something fails, and file a report with the frame behind every result.',
    demoCta: 'Book a demo',
    tryDemo: 'Try the interactive demo',
    roi: 'Calculate your ROI',
    partnersAsk: 'Security agency, monitoring company or installer?',
    partnersLink: 'See how partners sell it',
  },
  de: {
    eyebrow: 'Cloud-VMS mit KI-gestütztem Wächterrundgang',
    headline: 'Jede Kamera im Blick.',
    headlineAccent: 'Jeder Standort kontrolliert.',
    definition: 'Camzify ist ein KI-gestütztes Cloud-Videomanagementsystem für die Kameras, die Sie bereits besitzen.',
    lede: 'Geplante Rundgänge prüfen jeden Standort anhand einer Checkliste, benachrichtigen die Wachperson, wenn ein Punkt nicht erfüllt ist, und legen ein Kontrollprotokoll mit dem Bild hinter jedem Ergebnis ab.',
    demoCta: 'Demo anfragen',
    tryDemo: 'Interaktive Demo testen',
    roi: 'ROI berechnen',
    partnersAsk: 'Sicherheitsdienst, Leitstelle oder Errichter?',
    partnersLink: 'So vertreiben Partner Camzify',
  },
} as const;

export function HeroSection({ locale = 'en' }: { locale?: Locale }) {
  const c = COPY[locale];
  const demoHref = hrefFor('/book-a-demo', locale);
  const roiHref = hrefFor('/roi-calculator', locale);
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <HeroBgAnimation />

      <div className="relative z-10 mx-auto max-w-site px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* Left: Copy */}
          {/*
            No entrance fade on the copy: this block holds the Largest Contentful Paint
            element, and an opacity-0 start kept it invisible until JavaScript hydrated and
            the animation ran, which PageSpeed measured as a two-second render delay. The
            rise is a transform-only CSS animation, so the text paints at full opacity in
            the server HTML and merely settles into place.
          */}
          <div className="motion-safe:animate-hero-copy-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-live" />
              <span className="font-mono text-mono-sm text-primary uppercase">{c.eyebrow}</span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              {c.headline}
              <span className="block text-primary">{c.headlineAccent}</span>
            </h1>

            <p className="mt-5 max-w-lg text-body leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-foreground">
                {c.definition}
              </strong>{' '}
              {c.lede}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={demoHref}
                hrefLang={isForeignFor('/book-a-demo', locale) ? 'en-US' : undefined}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-fast hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5"
              >
                {c.demoCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#patrol-demo"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold transition-all duration-fast hover:bg-accent hover:border-primary/30"
              >
                <MousePointerClick className="h-4 w-4" aria-hidden="true" />
                {c.tryDemo}
              </a>
            </div>

            {/*
              One line for the two other doors. The lead files say most readers run a
              guarding, monitoring or installation business; the calculator is what
              that reader opens first.
            */}
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <Link
                href={roiHref}
                hrefLang={isForeignFor('/roi-calculator', locale) ? 'en-US' : undefined}
                className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
              >
                <Calculator className="h-4 w-4" aria-hidden="true" /> {c.roi}
              </Link>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <a href="#partners" className="hover:underline">
                {c.partnersAsk} <span className="font-semibold text-primary">{c.partnersLink}</span>
              </a>
            </p>
          </div>

          {/* Right: Patrol Sweep Animation. Same rule: scale only, never opacity from zero. */}
          <div className="motion-safe:animate-hero-panel-in">
            <PatrolSweepHero />
          </div>
        </div>
      </div>
    </section>
  );
}
