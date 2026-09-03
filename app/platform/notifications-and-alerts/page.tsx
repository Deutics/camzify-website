import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { ProductShot } from '@/components/content/product-shot';
import { NotificationsMockup } from '@/components/mockups/notifications-mockup';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { Radio, ListFilter, CheckCircle2, SlidersHorizontal } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Security Alert Management | Notifications",
  description: "Camzify security notifications: filter by severity, site, camera, feature. Acknowledgment queue with escalation and false positive marking.",
  path: "/platform/notifications-and-alerts",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What makes an alert Critical versus Warning or Info?', answer: 'Critical is reserved for the highest-stakes detections — weapons and fire/smoke — since those need eyes on them immediately. Warning covers things like a camera stream going offline, and Info covers lower-urgency detections such as line intrusion. The same event categories always map to the same severity, so the tier is predictable, not judged case by case.' },
  { question: 'How does acknowledgment work, and is it logged?', answer: 'Acknowledging an alert marks it as reviewed and records who acknowledged it and when — it\'s not just a checkbox that disappears. Alerts move through four states: Ack Required, Acknowledged, Escalated, and False Positive, so there\'s a clear audit trail of what happened to every event.' },
  { question: 'Can notifications be filtered per user or role?', answer: 'Yes. The feed filters by category (Line Intrusion, Zone Intrusion, Heatmap Anomalies, Camera Tampering, Weapons Detection, PPE Violations, Fire & Smoke, Stream Status), by site, by camera, by severity, and by read/unread status — and what a given sub-user sees is scoped to the sites and cameras their permission group grants them.' },
  { question: 'Is there a way to export the alert history?', answer: 'The notification feed is built for filtering and review inside the platform rather than as a raw export tool — narrow it down by category, site, camera, severity, or status to pull up exactly the events you need to check or report on.' },
  { question: 'Does acknowledging a notification sync with the dashboard\'s critical queue?', answer: 'Yes. Acknowledgment state is shared — acknowledging a critical event from the notifications feed marks it acknowledged in the dashboard\'s critical-event queue too, and vice versa, so the two views never disagree about what\'s still outstanding.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Platform', href: '/platform' },
      { label: 'Security Alert Management' },
    ]}>
      <FeatureHero
        eyebrow="Categorized, Triaged, Acknowledged"
        title="Security alert management"
        lede={<><strong className="font-semibold text-foreground">The Camzify notification system provides total events, unread count, critical alerts (weapons and fire/smoke), and average time to acknowledge.</strong> Filter by category, site, camera, severity, object type, and acknowledgment status. Every alert supports four states: Ack Required, Acknowledged, Escalated, and False Positive.</>}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/guides/how-to-manage-security-alerts', label: 'How to work the alert queue' }}
        visual={<ProductShot
            src="/product-notifications"
            alt="A laptop showing the Camzify Notifications screen with stat tiles, filters, and a categorized alert feed showing critical, warning, and info events"
            label="Notifications · Camzify console"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-12">
            <NotificationsMockup />
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">In practice</span>
            <h2 className="mt-2 font-display text-2xl font-bold">How alerts are triaged</h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Radio, title: 'Real-time categorized feed', desc: 'Every event lands in the feed tagged by category — Line Intrusion, Weapons Detection, Fire & Smoke, and more — the moment it fires.' },
              { icon: ListFilter, title: 'Severity triage', desc: 'Critical, Warning, and Info tiers keep the highest-stakes events from getting lost in a wall of routine ones.' },
              { icon: CheckCircle2, title: 'Acknowledgment workflow', desc: 'Ack Required, Acknowledged, Escalated, and False Positive states leave a clear audit trail on every alert.' },
              { icon: SlidersHorizontal, title: 'Granular filtering', desc: 'Narrow the feed by category, site, camera, severity, or read status to find exactly what you\'re looking for.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 font-display text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Part Of Every Patrol</span>
                <h2 className="mt-2 font-display text-2xl font-bold">One queue, not four dashboards</h2>
                <p className="mt-4 text-muted-foreground">
                  This module integrates with <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> to
                  provide a complete operations picture. Patrol results, detection alerts, and platform status
                  all feed into the same console.
                </p>
                <p className="mt-4 text-muted-foreground">
                  The oldest unacknowledged critical event is always surfaced first — with Line Intrusion currently
                  the single busiest category feeding the queue, operators can tell in seconds whether they're
                  looking at a genuine spike or routine perimeter activity.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-mono-sm uppercase text-primary">Filter By</span>
                <div className="mt-4 space-y-3">
                  {[
                    { filter: 'Category', desc: '8 detection categories, from Line Intrusion to Fire & Smoke' },
                    { filter: 'Site / Camera', desc: 'Narrow to one location or a single stream' },
                    { filter: 'Severity', desc: 'All, Critical, Warning, or Info' },
                    { filter: 'Status', desc: 'Read & unread, unread only, or read only' },
                  ].map((f) => (
                    <div key={f.filter} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2.5">
                      <span className="font-mono text-mono-sm text-primary">{f.filter}</span>
                      <span className="text-xs text-muted-foreground">{f.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-card p-8 sm:p-10">
            <span className="font-mono text-mono-sm uppercase text-primary">FAQ</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-6">
              <FAQAccordion items={faqs} />
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Related</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/platform" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Platform Overview</Link>
              <Link href="/platform/dashboard" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Dashboard</Link>
              <Link href="/virtual-patrolling" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Virtual Patrolling</Link>
              <Link href="/pricing" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Pricing</Link>
              <Link href="/book-a-demo" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Book a Demo</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
