'use client';

import Link from 'next/link';
import { ArrowRight, Calculator, MousePointerClick } from 'lucide-react';
import { PatrolSweepHero } from '@/components/motion/patrol-sweep-hero';
import { HeroBgAnimation } from '@/components/motion/hero-bg-animation';

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
 */
export function HeroSection() {
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
              <span className="font-mono text-mono-sm text-primary uppercase">Cloud VMS with virtual patrolling</span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Every camera watched.
              <span className="block text-primary">Every site checked.</span>
            </h1>

            <p className="mt-5 max-w-lg text-body leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-foreground">
                Camzify is an AI-powered cloud video management system for the cameras you already own.
              </strong>{' '}
              Scheduled patrol rounds check every site on a checklist, message the guard when
              something fails, and file a report with the frame behind every result.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/book-a-demo"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-fast hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5"
              >
                Book a demo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#patrol-demo"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold transition-all duration-fast hover:bg-accent hover:border-primary/30"
              >
                <MousePointerClick className="h-4 w-4" aria-hidden="true" />
                Try the interactive demo
              </a>
            </div>

            {/*
              One line for the two other doors. The lead files say most readers run a
              guarding, monitoring or installation business; the calculator is what
              that reader opens first.
            */}
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <Link href="/roi-calculator" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
                <Calculator className="h-4 w-4" aria-hidden="true" /> Calculate your ROI
              </Link>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <a href="#partners" className="hover:underline">
                Security agency, monitoring company or installer? <span className="font-semibold text-primary">See how partners sell it</span>
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
