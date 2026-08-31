'use client';

import { useRef } from 'react';
import { CalendarClock, Boxes, HardDrive } from 'lucide-react';
import { gsap } from 'gsap';
import { useDeferredGsap, revealTrigger } from '@/hooks/use-deferred-gsap';

const summary = [
  { label: 'Total Instances', value: 96 },
  { label: 'Activated By You', value: 73 },
  { label: 'Granted To Sub-Users', value: 11 },
  { label: 'Available', value: 12 },
];

const features = [
  { name: 'Stream Instances', total: 55, activated: 50, granted: 0, available: 5, status: 'ACTIVE' as const },
  { name: 'Line Intrusion Instances', total: 10, activated: 7, granted: 1, available: 2, status: 'ACTIVE' as const },
  { name: 'Virtual Patrolling System Instances', total: 9, activated: 0, granted: 9, available: 0, status: 'FULLY GRANTED · REQUEST MORE' as const },
  { name: 'Safety Equipment Detector Instances', total: 6, activated: 4, granted: 1, available: 1, status: 'ACTIVE' as const },
  { name: 'Camera Tampering Instances', total: 8, activated: 8, granted: 0, available: 0, status: 'FULLY USED · REQUEST MORE' as const },
  { name: 'Heatmaps Instances', total: 4, activated: 2, granted: 0, available: 2, status: 'ACTIVE' as const },
];

function statusClasses(status: string) {
  if (status.startsWith('FULLY')) return 'border-warn/30 bg-warn/10 text-warn';
  return 'border-live/30 bg-live/10 text-live';
}

export function LicenseMockup() {
  const containerRef = useRef<HTMLDivElement>(null);

  useDeferredGsap(containerRef, ({ prefersReducedMotion, contextSafe }) => {
    const st = revealTrigger(containerRef.current);
    gsap.from(containerRef.current, { opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', scrollTrigger: st });

    // Hover: feature rows highlight + nudge right
    gsap.utils.toArray<HTMLElement>('[data-feature-row]').forEach((row) => {
      const onEnter = contextSafe(() => gsap.to(row, { x: 3, duration: 0.2, ease: 'power2.out' }));
      const onLeave = contextSafe(() => gsap.to(row, { x: 0, duration: 0.25, ease: 'power2.out' }));
      row.addEventListener('mouseenter', onEnter);
      row.addEventListener('mouseleave', onLeave);
    });

    if (prefersReducedMotion) return;

    // Count-up on stat values (days remaining + instance summary)
    gsap.utils.toArray<HTMLElement>('[data-stat-value]').forEach((el) => {
      const target = Number(el.dataset.target ?? 0);
      const suffix = el.dataset.suffix ?? '';
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: st,
        onUpdate: () => { el.textContent = `${Math.round(counter.val)}${suffix}`; },
      });
    });

    // Storage utilization bar fill
    gsap.from('[data-storage-bar]', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1,
      ease: 'power2.out',
      delay: 0.2,
      scrollTrigger: st,
    });

    // Feature rows stagger in
    gsap.from('[data-feature-row]', {
      opacity: 0,
      y: 12,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.07,
      delay: 0.3,
      scrollTrigger: st,
    });
  });

  return (
    <div ref={containerRef} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-3">
        <div className="flex items-center gap-2">
          <Boxes className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-mono-sm uppercase text-muted-foreground">Plan & Usage · Enterprise Plan</span>
        </div>
        <span className="font-mono text-mono-sm text-muted-foreground/60">8 Features</span>
      </div>

      <div className="p-5">
        {/* Subscription term strip */}
        <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-background/50 px-4 py-3">
          <CalendarClock className="h-4 w-4 flex-shrink-0 text-primary" />
          <div>
            <span data-stat-value data-target="161" data-suffix=" days remaining" className="font-display text-lg font-bold tabular-nums">
              161 days remaining
            </span>
            <div className="mt-0.5 text-[11px] text-muted-foreground">Started Nov 28, 2024 · Expires Dec 29, 2026 · renews via account manager</div>
          </div>
        </div>

        {/* Instance summary row */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {summary.map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-background/50 p-3 transition-colors hover:border-primary/50">
              <div data-stat-value data-target={s.value} className="font-display text-xl font-bold tabular-nums">
                {s.value}
              </div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Storage utilization */}
        <div className="mt-4">
          <div className="flex items-center justify-between font-mono text-mono-sm uppercase text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><HardDrive className="h-3 w-3" /> Video Backup Storage</span>
            <span>13.5 TB / 18.0 TB activated · 460 GB available · 97% utilized</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div data-storage-bar className="h-full rounded-full bg-primary" style={{ width: '97%' }} />
          </div>
        </div>

        {/* Per-feature allocation table */}
        <div className="mt-5">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-x-3 px-1 font-mono text-[10px] uppercase text-muted-foreground/70">
            <span>Feature</span>
            <span className="text-right">Total</span>
            <span className="text-right">Activated</span>
            <span className="text-right">Granted</span>
            <span className="text-right">Available</span>
            <span className="text-right">Status</span>
          </div>
          <div className="mt-2 space-y-1.5">
            {features.map((f) => (
              <div
                key={f.name}
                data-feature-row
                className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] items-center gap-x-3 rounded-lg border border-border bg-background/50 px-3 py-2 transition-colors hover:border-primary/50"
              >
                <span className="truncate text-[11px] font-medium">{f.name}</span>
                <span className="text-right font-mono text-[11px] text-muted-foreground">{f.total}</span>
                <span className="text-right font-mono text-[11px] text-muted-foreground">{f.activated}</span>
                <span className="text-right font-mono text-[11px] text-muted-foreground">{f.granted}</span>
                <span className="text-right font-mono text-[11px] text-muted-foreground">{f.available}</span>
                <span className={`justify-self-end rounded-full border px-2 py-0.5 text-right font-mono text-[9px] uppercase ${statusClasses(f.status)}`}>
                  {f.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
