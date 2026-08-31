import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

export function WhatIsVP() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-prose text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              What is virtual patrolling?
            </h2>
            <p className="mt-6 text-body text-muted-foreground">
              Virtual patrolling is the practice of running scheduled, AI-driven patrol rounds
              across your existing cameras — following a defined route, checking a per-camera
              checklist, scoring compliance, and notifying the assigned guard when something
              fails. It produces the same audit trail as a physical guard tour, without the
              guard.
            </p>
            <Link
              href="/virtual-patrolling"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Learn how virtual patrolling works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
