'use client';

import { useRef } from 'react';
import { Building2, Camera, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { gsap } from 'gsap';
import { useDeferredGsap, revealTrigger } from '@/hooks/use-deferred-gsap';

const sites = [
  { name: 'Warehouse - Sector 4', address: '4820 Distribution Way, Bay 4', online: 5, total: 5, events: 80, trend: -21 },
  { name: 'HQ Campus', address: '100 Corporate Pkwy', online: 4, total: 4, events: 101, trend: 23 },
  { name: 'Retail - Downtown', address: '212 Main St', online: 3, total: 3, events: 35, trend: 0 },
  { name: 'Parking Structure B', address: '88 Commerce Ave', online: 2, total: 3, events: 85, trend: -17 },
];

function TrendIcon({ trend }: { trend: number }) {
  if (trend > 0) return <TrendingUp className="h-3 w-3 text-live" />;
  if (trend < 0) return <TrendingDown className="h-3 w-3 text-critical" />;
  return <Minus className="h-3 w-3 text-muted-foreground" />;
}

export function MultiSiteMockup() {
  const containerRef = useRef<HTMLDivElement>(null);

  useDeferredGsap(containerRef, ({ prefersReducedMotion, contextSafe }) => {
    const st = revealTrigger(containerRef.current);
    gsap.from(containerRef.current, { opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', scrollTrigger: st });

    // Hover: site cards lift slightly
    gsap.utils.toArray<HTMLElement>('[data-site-card]').forEach((card) => {
      const onEnter = contextSafe(() => gsap.to(card, { y: -3, duration: 0.2, ease: 'power2.out' }));
      const onLeave = contextSafe(() => gsap.to(card, { y: 0, duration: 0.25, ease: 'power2.out' }));
      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
    });

    if (prefersReducedMotion) return;

    // Summary + per-site count-up
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

    // Site cards stagger in
    gsap.from('[data-site-card]', {
      opacity: 0,
      y: 16,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1,
      delay: 0.15,
      scrollTrigger: st,
    });
  });

  return (
    <div ref={containerRef} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-3">
        <div className="flex items-center gap-2">
          <Building2 className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-mono-sm uppercase text-muted-foreground">Multi-Site Overview</span>
        </div>
        <span className="font-mono text-mono-sm text-muted-foreground/60">6/9 AI Features Active</span>
      </div>

      <div className="p-5">
        {/* Summary stat row */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <span data-stat-value data-target="4" className="font-display text-xl font-bold tabular-nums">4</span>
            <span className="font-mono text-[10px] uppercase text-muted-foreground">Sites</span>
          </div>
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-primary" />
            <span data-stat-value data-target="15" className="font-display text-xl font-bold tabular-nums">15</span>
            <span className="font-mono text-[10px] uppercase text-muted-foreground">Cameras Configured</span>
          </div>
        </div>

        {/* Site cards */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {sites.map((s) => (
            <div
              key={s.name}
              data-site-card
              className="rounded-lg border border-border bg-background/50 p-3.5 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold">{s.name}</span>
                <span
                  data-stat-value
                  data-target={s.online}
                  data-of={s.total}
                  className={`font-mono text-[11px] tabular-nums ${s.online < s.total ? 'text-warn' : 'text-live'}`}
                >
                  {s.online}/{s.total}
                </span>
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">{s.address}</div>
              <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                <span className="font-mono text-[10px] uppercase text-muted-foreground">7-Day Events</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[11px] font-medium tabular-nums">{s.events}</span>
                  <TrendIcon trend={s.trend} />
                  <span className={`font-mono text-[10px] tabular-nums ${s.trend > 0 ? 'text-live' : s.trend < 0 ? 'text-critical' : 'text-muted-foreground'}`}>
                    {s.trend > 0 ? '+' : ''}{s.trend}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
