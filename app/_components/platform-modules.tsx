'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductShot } from '@/components/content/product-shot';

/**
 * The platform section.
 *
 * Was six identical icon cards — the fourth consecutive section using that device.
 * Now one large console screenshot with the modules as a selectable list beside it, so
 * the reader sees the actual product and can move between screens without leaving the
 * page. Selecting a module swaps the screenshot; every module still links to its own
 * page, so the internal linking is unchanged.
 *
 * Client component because of the selection state. Kept as low in the tree as possible
 * — everything above and below it stays server-rendered.
 */
const modules = [
  {
    title: 'Dashboard',
    href: '/platform/dashboard',
    desc: 'Cameras online, unacknowledged criticals, alert volume, patrol compliance and retention coverage — with sub-user sites folded in or held separate.',
    shot: '/product-dashboard',
    alt: 'Camzify dashboard showing cameras live, critical events open, alerts today, patrol compliance, a live detection events chart and per-site health',
  },
  {
    title: 'Live streaming',
    href: '/platform/live-streaming',
    desc: 'Multi-camera grid grouped by site, adjustable density, slideshow mode, and explicit offline states rather than a silently blank tile.',
    shot: '/product-live-streaming',
    alt: 'Camzify live streaming grid showing camera feeds across four sites with an offline site banner and latency mode controls',
  },
  {
    title: 'Video backup & retention',
    href: '/platform/video-backup-and-retention',
    desc: 'Retention set per camera by days or storage cap, with playback, multi-camera comparison and allocation across sub-accounts.',
    shot: '/product-video-backup',
    alt: 'Camzify video backup screen showing per-camera retention settings and storage allocation across sites',
  },
  {
    title: 'Notifications & alerts',
    href: '/platform/notifications-and-alerts',
    desc: 'One queue filtered by severity, site, camera or feature, with acknowledgment state, escalation and false-positive marking.',
    shot: '/product-notifications',
    alt: 'Camzify notifications screen with severity filters, acknowledgment queue and average time to acknowledge',
  },
  {
    title: 'User management',
    href: '/platform/user-management',
    desc: 'Sub-users, permission groups with per-module view/edit/delete, site-level access, and AI instance allocation from your license.',
    shot: '/product-user-management',
    alt: 'Camzify user management screen showing sub-users with permission groups, instance allocation and access controls',
  },
  {
    title: 'License & instances',
    href: '/platform/license-and-instance-management',
    desc: 'What is activated, what is granted to sub-accounts and what remains available — per feature, with quota requests.',
    shot: '/product-license-plan',
    alt: 'Camzify plan and usage screen showing subscription term, instance totals and a per-feature allocation table',
  },
];

export function PlatformModules() {
  const [active, setActive] = useState(0);
  const current = modules[active];

  return (
    <section className="border-t border-border bg-muted/20 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-mono-sm uppercase text-primary">The platform</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Everything runs from one console
            </h2>
            <p className="mt-5 max-w-prose text-body text-muted-foreground">
              Patrols, detections, streams, storage and access control are one product, not five
              integrations. Pick a module to see it.
            </p>
          </div>
          <Link
            href="/platform"
            className="rounded font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Explore the platform <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-14">
          <ul className="flex flex-col gap-1.5" role="tablist" aria-label="Platform modules">
            {modules.map((m, i) => {
              const selected = i === active;
              return (
                <li key={m.href}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(i)}
                    className={`w-full rounded-xl border p-5 text-left transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      selected
                        ? 'border-primary/50 bg-card shadow-lg'
                        : 'border-transparent bg-transparent hover:border-border hover:bg-card/60'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span
                        className={`font-display text-base font-bold ${selected ? 'text-primary' : ''}`}
                      >
                        {m.title}
                      </span>
                      {selected && (
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      )}
                    </span>
                    <span
                      className={`mt-2 block text-sm leading-relaxed text-muted-foreground transition-all ${
                        selected ? 'opacity-100' : 'opacity-70'
                      }`}
                    >
                      {m.desc}
                    </span>
                    {selected && (
                      <Link
                        href={m.href}
                        className="mt-3 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        Open module page <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductShot
              key={current.shot}
              src={current.shot}
              alt={current.alt}
              label={`${current.title} · Camzify console`}
              sizes="(max-width: 1024px) 100vw, 62vw"
            />
            <p className="mt-4 text-xs text-muted-foreground">
              Console screens shown with sample sites and cameras. Figures are interface
              illustrations, not customer data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
