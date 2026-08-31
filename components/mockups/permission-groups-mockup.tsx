'use client';

import { useRef } from 'react';
import { ShieldCheck, Eye, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { gsap } from 'gsap';
import { useDeferredGsap, revealTrigger } from '@/hooks/use-deferred-gsap';

const PAGES = ['Dashboard', 'Configuration', 'Live Streaming', 'Virtual Patrolling', 'Video Backup', 'Notifications', 'Plan & Usage'];

const groups = [
  {
    name: 'Site Admin',
    members: 1,
    pageAccess: 6,
    pages: ['Dashboard', 'Configuration', 'Live Streaming', 'Virtual Patrolling', 'Video Backup', 'Notifications'],
    view: 10,
    create: 10,
    edit: 10,
    del: 8,
  },
  {
    name: 'Guard',
    members: 1,
    pageAccess: 4,
    pages: ['Dashboard', 'Live Streaming', 'Virtual Patrolling', 'Notifications'],
    view: 1,
    create: 0,
    edit: 0,
    del: 0,
  },
  {
    name: 'Auditor',
    members: 1,
    pageAccess: 7,
    pages: ['Dashboard', 'Configuration', 'Live Streaming', 'Virtual Patrolling', 'Video Backup', 'Notifications', 'Plan & Usage'],
    view: 10,
    create: 0,
    edit: 0,
    del: 0,
  },
  {
    name: 'Surveillance Manager',
    members: 1,
    pageAccess: 6,
    pages: ['Dashboard', 'Configuration', 'Live Streaming', 'Virtual Patrolling', 'Video Backup', 'Notifications'],
    view: 10,
    create: 7,
    edit: 9,
    del: 0,
  },
];

const metrics: { key: 'view' | 'create' | 'edit' | 'del'; label: string; icon: typeof Eye }[] = [
  { key: 'view', label: 'View', icon: Eye },
  { key: 'create', label: 'Create', icon: PlusCircle },
  { key: 'edit', label: 'Edit', icon: Pencil },
  { key: 'del', label: 'Delete', icon: Trash2 },
];

export function PermissionGroupsMockup() {
  const containerRef = useRef<HTMLDivElement>(null);

  useDeferredGsap(containerRef, ({ prefersReducedMotion, contextSafe }) => {
    const st = revealTrigger(containerRef.current);
    gsap.from(containerRef.current, { opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', scrollTrigger: st });

    // Hover: role cards lift slightly
    gsap.utils.toArray<HTMLElement>('[data-role-card]').forEach((card) => {
      const onEnter = contextSafe(() => gsap.to(card, { y: -3, duration: 0.2, ease: 'power2.out' }));
      const onLeave = contextSafe(() => gsap.to(card, { y: 0, duration: 0.25, ease: 'power2.out' }));
      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
    });

    if (prefersReducedMotion) return;

    // Count-up on numeric badges
    gsap.utils.toArray<HTMLElement>('[data-stat-value]').forEach((el) => {
      const target = Number(el.dataset.target ?? 0);
      const of = el.dataset.of;
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: st,
        onUpdate: () => {
          const rounded = Math.round(counter.val);
          el.textContent = of ? `${rounded}/${of}` : String(rounded);
        },
      });
    });

    // Role cards stagger in
    gsap.from('[data-role-card]', {
      opacity: 0,
      y: 16,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1,
      delay: 0.1,
      scrollTrigger: st,
    });

    // Permission bars grow from 0
    gsap.from('[data-bar-fill]', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.04,
      delay: 0.3,
      scrollTrigger: st,
    });
  });

  return (
    <div ref={containerRef} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-mono-sm uppercase text-muted-foreground">User Management · Permission Groups</span>
        </div>
        <span className="font-mono text-mono-sm text-muted-foreground/60">4 Groups</span>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div
              key={g.name}
              data-role-card
              className="rounded-lg border border-border bg-background/50 p-3.5 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold">{g.name}</span>
                <span className="rounded-full border border-border bg-muted/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {g.members} member
                </span>
              </div>

              {/* Page access */}
              <div className="mt-3">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase text-muted-foreground">
                  <span>Page Access</span>
                  <span data-stat-value data-target={g.pageAccess} data-of="7" className="tabular-nums text-foreground">
                    {g.pageAccess}/7
                  </span>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {PAGES.map((p) => (
                    <span
                      key={p}
                      className={`h-1.5 w-1.5 rounded-full ${g.pages.includes(p) ? 'bg-primary' : 'bg-muted'}`}
                      title={p}
                    />
                  ))}
                </div>
                <div className="mt-1 truncate text-[10px] text-muted-foreground/70">{g.pages.join(', ')}</div>
              </div>

              {/* Instance permissions */}
              <div className="mt-3 space-y-1.5">
                {metrics.map((m) => {
                  const Icon = m.icon;
                  const val = g[m.key];
                  return (
                    <div key={m.key} className="flex items-center gap-2">
                      <Icon className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
                      <span className="w-10 flex-shrink-0 text-[10px] text-muted-foreground">{m.label}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          data-bar-fill
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${(val / 10) * 100}%` }}
                        />
                      </div>
                      <span
                        data-stat-value
                        data-target={val}
                        data-of="10"
                        className="w-8 flex-shrink-0 text-right font-mono text-[10px] tabular-nums text-muted-foreground"
                      >
                        {val}/10
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
