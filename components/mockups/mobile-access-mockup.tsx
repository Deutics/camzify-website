'use client';

import { useRef } from 'react';
import { Camera, AlertTriangle, ShieldCheck, Signal, Battery, Wifi } from 'lucide-react';
import { gsap } from 'gsap';
import { useDeferredGsap, revealTrigger } from '@/hooks/use-deferred-gsap';

// Same real figures used elsewhere on the site (e.g. the dashboard), shown here in a
// condensed phone-width layout to illustrate that mobile carries the same live data.
const statRows = [
  { label: 'Cameras Live', value: 49, of: 61, icon: Camera },
  { label: 'Critical Open', value: 19, icon: AlertTriangle, tone: 'critical' as const },
  { label: 'Patrol Compliance', value: 75, suffix: '%', icon: ShieldCheck },
];

const alertRows = [
  { severity: 'critical', feature: 'Weapons Detection', detail: 'Object flagged at Gate 2 camera' },
  { severity: 'critical', feature: 'Camera Stream Down', detail: 'Retail - Downtown' },
];

export function MobileAccessMockup() {
  const containerRef = useRef<HTMLDivElement>(null);

  useDeferredGsap(containerRef, ({ prefersReducedMotion, contextSafe }) => {
    const st = revealTrigger(containerRef.current);
    gsap.from(containerRef.current, { opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', scrollTrigger: st });

    // Hover: alert rows nudge slightly (motion only — Tailwind handles the border glow)
    gsap.utils.toArray<HTMLElement>('[data-alert-row]').forEach((row) => {
      const onEnter = contextSafe(() => gsap.to(row, { x: 3, duration: 0.2, ease: 'power2.out' }));
      const onLeave = contextSafe(() => gsap.to(row, { x: 0, duration: 0.25, ease: 'power2.out' }));
      row.addEventListener('mouseenter', onEnter);
      row.addEventListener('mouseleave', onLeave);
    });

    if (prefersReducedMotion) return;

    // Stat rows: count up
    gsap.utils.toArray<HTMLElement>('[data-stat-value]').forEach((el) => {
      const target = Number(el.dataset.target ?? 0);
      const of = el.dataset.of;
      const suffix = el.dataset.suffix ?? '';
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: st,
        onUpdate: () => {
          const rounded = Math.round(counter.val);
          el.textContent = of ? `${rounded}/${of}` : `${rounded}${suffix}`;
        },
      });
    });

    // Stat rows stagger in
    gsap.from('[data-stat-row]', {
      opacity: 0,
      y: 10,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.08,
      delay: 0.15,
      scrollTrigger: st,
    });

    // Alert rows stagger in
    gsap.from('[data-alert-row]', {
      opacity: 0,
      x: 12,
      duration: 0.45,
      ease: 'power2.out',
      stagger: 0.1,
      delay: 0.4,
      scrollTrigger: st,
    });
  });

  return (
    <div ref={containerRef} className="flex flex-col items-center">
      {/* Phone frame — an illustrative responsive-concept mockup, not a captured screenshot */}
      <div className="w-full max-w-[300px] rounded-[2.5rem] border-[6px] border-border bg-card p-2 shadow-sm">
        <div className="overflow-hidden rounded-[1.9rem] border border-border bg-background">
          {/* Notch / status bar */}
          <div className="flex items-center justify-between bg-muted/30 px-5 pb-2 pt-3">
            <span className="font-mono text-[10px] text-muted-foreground">9:41</span>
            <div className="h-1.5 w-16 rounded-full bg-muted-foreground/20" />
            <div className="flex items-center gap-1 text-muted-foreground">
              <Signal className="h-3 w-3" />
              <Wifi className="h-3 w-3" />
              <Battery className="h-3 w-3" />
            </div>
          </div>

          {/* App header */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-live" />
            <span className="font-mono text-[10px] uppercase text-muted-foreground">Camzify · Mobile</span>
          </div>

          <div className="p-4">
            {/* Stat rows */}
            <div className="space-y-2">
              {statRows.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    data-stat-row
                    className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`h-3.5 w-3.5 ${s.tone === 'critical' ? 'text-critical' : 'text-primary'}`} />
                      <span className="font-mono text-[10px] uppercase text-muted-foreground">{s.label}</span>
                    </div>
                    <span
                      data-stat-value
                      data-target={s.value}
                      data-of={s.of ?? ''}
                      data-suffix={s.suffix ?? ''}
                      className={`font-display text-base font-bold tabular-nums ${s.tone === 'critical' ? 'text-critical' : ''}`}
                    >
                      {s.of ? `${s.value}/${s.of}` : `${s.value}${s.suffix ?? ''}`}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Alert feed */}
            <div className="mt-4">
              <div className="font-mono text-[10px] uppercase text-muted-foreground">Alert Feed</div>
              <div className="mt-2 space-y-2">
                {alertRows.map((a, i) => (
                  <div
                    key={i}
                    data-alert-row
                    className="rounded-lg border border-border bg-background/50 px-3 py-2 transition-colors hover:border-primary/50"
                  >
                    <span className="font-mono text-[9px] uppercase text-critical">{a.severity}</span>
                    <div className="mt-0.5 text-[11px] font-medium">{a.feature}</div>
                    <div className="text-[10px] text-muted-foreground">{a.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Honest caption — illustrative concept, not a pixel-accurate screenshot */}
      <span className="mt-4 font-mono text-mono-sm uppercase text-muted-foreground/70">Responsive View · Same Live Data</span>
    </div>
  );
}
