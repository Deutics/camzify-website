import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, Video, HardDrive, Bell, BarChart3, Users, Shield, Layers, Globe, Smartphone, Brain, ArrowRight, Lock } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "AI Video Surveillance Platform",
  description: "The Camzify platform: dashboard, live streaming, video backup, notifications, analytics, user management, and multi-site control — all in one console.",
  path: "/platform",
};

export const metadata = generatePageMeta({ ...pageMeta });

const modules = [
  { icon: LayoutDashboard, title: 'Dashboard', href: '/platform/dashboard', desc: 'Active sites, camera uptime, AI alerts, patrol compliance, and 14-day trends.', image: '/Video-Surveillance-Dashboard.jpg' },
  { icon: Video, title: 'Live Streaming', href: '/platform/live-streaming', desc: 'Multi-camera grid with slideshow mode, grouped by site.', image: '/live-camera-streaming.jpg' },
  { icon: HardDrive, title: 'Video Backup & Retention', href: '/platform/video-backup-and-retention', desc: 'Per-camera retention, playback, and storage management.', image: '/cloud-video-backup-and-retention-management.jpg' },
  { icon: Bell, title: 'Notifications & Alerts', href: '/platform/notifications-and-alerts', desc: 'Filter, acknowledge, escalate, and mark false positives.', image: '/security-alert-management.jpg' },
  { icon: BarChart3, title: 'Analytics & Reporting', href: '/platform/analytics-and-reporting', desc: 'Detection trends, attribute breakdowns, confidence splits.', image: '/video-surveillance-analytics-and-reporting.jpg' },
  { icon: Users, title: 'User Management', href: '/platform/user-management', desc: 'Permission groups, site-level access, AI instance grants.', image: '/security-system-user-management.jpg' },
  { icon: Lock, title: 'Permission Groups', href: '/platform/permission-groups', desc: 'Per-module View/Edit/Delete access matrix.', image: '/permission-group.jpg' },
  { icon: Layers, title: 'License Management', href: '/platform/license-and-instance-management', desc: 'AI instances: activated, granted, available per feature.', image: '/license-and-instance-management.jpg' },
  { icon: Globe, title: 'Multi-Site Management', href: '/platform/multi-site-management', desc: 'Centralised oversight across all locations.', image: '/multi-site-video-surveillance.jpg' },
  { icon: Smartphone, title: 'Mobile Access', href: '/platform/mobile-access', desc: 'Live streams and alerts from any device.', image: '/mobile-access.jpg' },
  { icon: Brain, title: 'AI Architecture', href: '/platform/ai-architecture', desc: 'Six-layer processing: detection to adaptive inference.', image: '/ai-video-analytics-architecture.jpg' },
];

export default function PlatformPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Platform' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">The Camzify Platform</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            One console for cameras, detection, <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>,
            video backup, analytics, and user management. Every module is built, shipping, and accessible
            from the same dashboard.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(modules ?? []).map((m, i) => {
              const Icon = m?.icon ?? LayoutDashboard;
              return (
                <ScrollReveal key={i} delay={i * 0.04}>
                  <Link href={m?.href ?? '/'} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors duration-200 hover:bg-accent/50">
                    <div className="aspect-video w-full overflow-hidden p-4 pb-0">
                      {m?.image && (
                        <Image
                          src={m.image}
                          alt={`${m?.title ?? ''} screen preview`}
                          className="h-full w-full rounded-lg object-cover object-top"
                          width={1229}
                          height={692}
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-base font-bold">{m?.title ?? ''}</h3>
                        <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2.5">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">{m?.desc ?? ''}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Learn more <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
