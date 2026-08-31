'use client';

import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { PatrolSweepHero } from '@/components/motion/patrol-sweep-hero';
import { HeroBgAnimation } from '@/components/motion/hero-bg-animation';
import { motion } from 'framer-motion';

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
              <span className="font-mono text-mono-sm text-primary uppercase">AI-Powered Virtual Patrolling</span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Your site. Patrolled 24/7.{' '}
              <span className="text-primary">Without the guard.</span>
            </h1>

            <p className="mt-6 max-w-xl text-body text-muted-foreground">
              Camzify runs scheduled AI patrol rounds across the cameras you already own —
              checking every point on the route, flagging what fails, and notifying the
              guard responsible.
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

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-live" />
                Works with existing cameras
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-live" />
                No proprietary hardware
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-live" />
                PDF patrol reports
              </span>
            </div>
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
