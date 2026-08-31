'use client';

import { useRef } from 'react';
import { Users, UserCheck, UserPlus, UserX } from 'lucide-react';
import { gsap } from 'gsap';
import { useDeferredGsap, revealTrigger } from '@/hooks/use-deferred-gsap';

const statTiles = [
  { label: 'Total Sub-Users', value: 4, icon: Users },
  { label: 'Active', value: 2, icon: UserCheck, tone: 'active' as const },
  { label: 'Invited', value: 1, icon: UserPlus, tone: 'invited' as const },
  { label: 'Disabled', value: 1, icon: UserX, tone: 'disabled' as const },
];

const subUsers = [
  { initials: 'PN', name: 'Priya Nair', email: 'priya@acme.com', status: 'Active', role: 'Site Admin', instances: '2× Line Intr., 3× Tampering +1 more', sites: 'Warehouse - Sector 4', lastLogin: '2h ago' },
  { initials: 'MW', name: 'Marcus Webb', email: 'marcus@acme.com', status: 'Active', role: 'Guard', instances: 'None', sites: 'HQ Campus', lastLogin: '1d ago' },
  { initials: 'EC', name: 'Elena Cho', email: 'elena@acme.com', status: 'Invited', role: 'Auditor', instances: 'None', sites: 'All sites', lastLogin: 'Never' },
  { initials: 'DB', name: 'Devon Brooks', email: 'devon@acme.com', status: 'Disabled', role: 'Surveillance Manager', instances: '1× Zone Intr., 1× VPS', sites: 'Retail - Downtown, Parking Structure B', lastLogin: '21d ago' },
];

const statusPill: Record<string, string> = {
  Active: 'border-live/30 bg-live/10 text-live',
  Invited: 'border-warn/30 bg-warn/10 text-warn',
  Disabled: 'border-muted-foreground/30 bg-muted-foreground/10 text-muted-foreground',
};

export function UserManagementMockup() {
  const containerRef = useRef<HTMLDivElement>(null);

  useDeferredGsap(containerRef, ({ prefersReducedMotion, contextSafe }) => {
    const st = revealTrigger(containerRef.current);

    gsap.from(containerRef.current, { opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', scrollTrigger: st });

    // Hover: stat tiles lift
    gsap.utils.toArray<HTMLElement>('[data-stat-tile]').forEach((tile) => {
      const onEnter = contextSafe(() => gsap.to(tile, { y: -3, duration: 0.2, ease: 'power2.out' }));
      const onLeave = contextSafe(() => gsap.to(tile, { y: 0, duration: 0.25, ease: 'power2.out' }));
      tile.addEventListener('mouseenter', onEnter);
      tile.addEventListener('mouseleave', onLeave);
    });

    // Hover: user rows nudge right slightly (motion only)
    gsap.utils.toArray<HTMLElement>('[data-user-row]').forEach((row) => {
      const onEnter = contextSafe(() => gsap.to(row, { x: 4, duration: 0.2, ease: 'power2.out' }));
      const onLeave = contextSafe(() => gsap.to(row, { x: 0, duration: 0.25, ease: 'power2.out' }));
      row.addEventListener('mouseenter', onEnter);
      row.addEventListener('mouseleave', onLeave);
    });

    if (prefersReducedMotion) return;

    // Stat tiles: count up
    gsap.utils.toArray<HTMLElement>('[data-stat-value]').forEach((el) => {
      const target = Number(el.dataset.target ?? 0);
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: st,
        onUpdate: () => { el.textContent = String(Math.round(counter.val)); },
      });
    });

    // Sub-user rows stagger in
    gsap.from('[data-user-row]', {
      opacity: 0,
      y: 14,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1,
      delay: 0.2,
      scrollTrigger: st,
    });
  });

  return (
    <div ref={containerRef} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-3">
        <div className="flex items-center gap-2">
          <Users className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-mono-sm uppercase text-muted-foreground">User Management · Sub-Users</span>
        </div>
        <span className="font-mono text-mono-sm text-muted-foreground/60">4 permission groups configured</span>
      </div>

      <div className="p-5">
        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {statTiles.map((tile) => {
            const Icon = tile.icon;
            const iconColor =
              tile.tone === 'active' ? 'text-live' : tile.tone === 'invited' ? 'text-warn' : tile.tone === 'disabled' ? 'text-muted-foreground' : 'text-primary';
            return (
              <div key={tile.label} data-stat-tile className="rounded-lg border border-border bg-background/50 p-3 transition-colors hover:border-primary/50">
                <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
                <div data-stat-value data-target={tile.value} className="mt-2 font-display text-xl font-bold tabular-nums">
                  {tile.value}
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{tile.label}</div>
              </div>
            );
          })}
        </div>

        {/* Sub-user list */}
        <div className="mt-5">
          <div className="font-mono text-mono-sm uppercase text-muted-foreground">Sub-Users</div>
          <div className="mt-3 space-y-2">
            {subUsers.map((u) => (
              <div
                key={u.email}
                data-user-row
                className="flex flex-col gap-2 rounded-lg border border-border bg-background/50 px-3 py-2.5 transition-colors hover:border-primary/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] font-bold text-primary">
                    {u.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[12px] font-medium">{u.name}</span>
                      <span className={`flex-shrink-0 rounded-full border px-1.5 py-0.5 font-mono text-[9px] uppercase ${statusPill[u.status]}`}>
                        {u.status}
                      </span>
                    </div>
                    <div className="truncate text-[11px] text-muted-foreground">{u.email} · {u.role}</div>
                  </div>
                </div>
                <div className="flex flex-shrink-0 flex-col gap-0.5 pl-9 text-[11px] text-muted-foreground sm:items-end sm:pl-0">
                  <span>{u.sites}</span>
                  <span className="text-muted-foreground/70">Instances: {u.instances} · Last login {u.lastLogin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
