import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { LayoutDashboard, Video, HardDrive, Bell, BarChart3, Users, ArrowRight } from 'lucide-react';

const modules = [
  { icon: LayoutDashboard, title: 'Dashboard', desc: 'Active sites, camera uptime, AI alerts, patrol compliance, 14-day trends — all on one screen.', href: '/platform/dashboard' },
  { icon: Video, title: 'Live Streaming', desc: 'Multi-camera grid grouped by site, slideshow mode, per-site filters, no-signal states.', href: '/platform/live-streaming' },
  { icon: HardDrive, title: 'Video Backup', desc: 'Per-camera retention by days or GB cap. Playback, multi-camera comparison, storage allocation.', href: '/platform/video-backup-and-retention' },
  { icon: Bell, title: 'Notifications', desc: 'Filter by severity, site, camera, feature. Acknowledgement queue, escalation, false positive marking.', href: '/platform/notifications-and-alerts' },
  { icon: BarChart3, title: 'Analytics', desc: 'Detection trends, attribute breakdowns, confidence splits, per-feature activity charts.', href: '/platform/analytics-and-reporting' },
  { icon: Users, title: 'User Management', desc: 'Permission groups with per-module view/edit/delete, site-level access, AI instance grants.', href: '/platform/user-management' },
];

export function PlatformModules() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-mono-sm uppercase text-primary">The Platform</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Everything runs from one console
              </h2>
            </div>
            <Link
              href="/platform"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
            >
              Explore the platform <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(modules ?? []).map((m: any, i: number) => {
            const Icon = m?.icon ?? LayoutDashboard;
            return (
              <ScrollReveal key={i} delay={i * 0.06}>
                <Link
                  href={m?.href ?? '/'}
                  className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="rounded-lg bg-primary/10 p-2.5 inline-flex">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold">{m?.title ?? ''}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{m?.desc ?? ''}</p>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
