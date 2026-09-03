'use client';

import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { PatrolSweepHero } from '@/components/motion/patrol-sweep-hero';
import { HeroBgAnimation } from '@/components/motion/hero-bg-animation';
import { motion } from 'framer-motion';

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
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-live" />
              <span className="font-mono text-mono-sm text-primary uppercase">AI-powered cloud video management</span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Every camera watched. Every site checked.{' '}
              <span className="text-primary">Around the clock.</span>
            </h1>

            <p className="mt-6 max-w-xl text-body leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-foreground">
                Camzify is an AI-powered cloud video management system
              </strong>{' '}
              for the cameras you already own &mdash; live streaming, cloud backup and 22
              real-time detections in one console, plus scheduled virtual patrol rounds that
              check every site and prove it.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/book-a-demo"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-fast hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/virtual-patrolling"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-7 py-3.5 text-sm font-semibold transition-all duration-fast hover:bg-accent hover:border-primary/30"
              >
                <Play className="h-4 w-4" />
                See a patrol run
              </Link>
            </div>

            <ul className="mt-8 grid gap-x-6 gap-y-2.5 text-sm text-muted-foreground sm:grid-cols-2">
              {[
                'Live multi-site viewing',
                'Cloud backup & retention',
                '22 detection models, real time',
                'Scheduled AI patrol rounds',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-live" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Patrol Sweep Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <PatrolSweepHero />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
