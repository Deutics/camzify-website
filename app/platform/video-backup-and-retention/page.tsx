import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { ProductShot } from '@/components/content/product-shot';
import { VideoBackupMockup } from '@/components/mockups/video-backup-mockup';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { HardDrive, Clock, Zap, Info } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Cloud Video Backup & Retention Management",
  description: "Camzify cloud video backup keeps footage safe even if the on-site NVR or hardware is destroyed. Per-camera retention by days or GB, bulk apply per site, playback, comparison.",
  path: "/platform/video-backup-and-retention",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How do I set up video backup for the first time?', answer: 'Pick which cameras record, choose continuous or scheduled recording, set a retention window per camera, and check the storage estimate before committing. The walkthrough is at /guides/how-to-configure-cloud-video-backup.' },
  { question: 'Does Camzify record continuously, or only at certain times?', answer: 'Either. Continuous recording captures around the clock. Scheduled recording captures only during hours you define — an office that is empty from 7pm to 7am does not need to pay to store twelve hours of an unlit corridor every day. A schedule can be applied to one site or to every camera at once, so it does not have to be set camera by camera.' },
  { question: 'Which costs less, continuous or scheduled recording?', answer: 'Scheduled, in direct proportion to the hours you drop — storage is consumed per hour recorded, so halving the recording window roughly halves the storage for that camera. Continuous is the right default where an incident could occur at any hour, or where an insurer or regulator expects unbroken coverage. Many sites run both: continuous on perimeter and entry cameras, scheduled on interior ones.' },
  { question: 'How is the Est. Storage figure calculated, and how accurate is it?', answer: 'It\'s a planning estimate, calculated from each camera\'s typical bitrate for its configured resolution and frame rate — not a live measurement of what has actually been recorded. Actual usage varies with scene activity, motion, and compression, so treat it as a sizing guide rather than an exact reading.' },
  { question: 'What happens when a camera runs out of assigned storage?', answer: 'When a camera is set to a storage (GB) cap and reaches it, the oldest footage rolls off to make room for new recording, the same way a "By Days" camera drops footage older than its retention window. Either way the camera keeps recording — older history is what gives way.' },
  { question: 'What\'s the difference between retention "By Days" and "By Storage"?', answer: 'By Days keeps a fixed time window — say 14 days — regardless of how much footage that ends up being. By Storage instead caps a camera at a fixed GB allowance and lets the retained time window shrink or grow with scene activity. 24/7 continuous recording can be paired with either limit.' },
  { question: 'Can retention be set per camera, or only for the whole account?', answer: 'Both. Each camera can carry its own retention mode and limit, or you can use the quick-apply presets — 7, 30, 60, or 90 days — to set every camera on the account to the same policy in one action.' },
  { question: 'What happens to a camera\'s footage if the camera is removed?', answer: 'Footage already stored under that camera remains subject to its existing retention policy until it ages out or is manually cleared — removing a camera from active monitoring doesn\'t immediately delete its backed-up history.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Platform', href: '/platform' },
      { label: 'Video Backup & Retention Management' },
    ]}>
      <FeatureHero
        eyebrow="Off-Site, Even When The Hardware Isn't"
        title="Cloud video backup & retention management"
        lede={<><strong className="font-semibold text-foreground">Footage stays safe in the cloud, even if the on-site hardware doesn't.</strong> Camzify lets you set per-camera retention policies by days or GB cap, with bulk application per site. The system shows projected storage usage, enables playback and multi-camera comparison, and manages storage allocation across sub-accounts — so a broken or stolen NVR never means lost evidence.</>}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/guides/how-to-configure-cloud-video-backup', label: 'How to configure backup' }}
        visual={<ProductShot
            src="/product-video-backup"
            alt="A laptop showing the Camzify Video Backup screen with storage allocation, per-site storage breakdown, and per-camera retention settings"
            label="Video backup · Camzify console"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">

          <div className="mt-12">
            <VideoBackupMockup />
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">In practice</span>
            <h2 className="mt-2 font-display text-2xl font-bold">How recording and retention are controlled</h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: HardDrive, title: 'Storage transparency', desc: 'Provisioned, used, assigned to child accounts, and remaining are always broken out separately — never one blended number.' },
              { icon: Clock, title: 'Flexible retention modes', desc: 'Set each camera by days, by a GB storage cap, or to record 24/7 — whichever fits how that camera is used.' },
              { icon: Zap, title: 'Quick-apply presets', desc: '7, 30, 60, or 90-day retention can be pushed to every camera on the account in a single action, no per-camera editing required.' },
              { icon: Info, title: 'Honest planning estimates', desc: 'Storage projections are clearly labeled as estimates based on typical bitrate — not dressed up as exact usage figures.' },
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
                <span className="font-mono text-mono-sm uppercase text-primary">Why Retention Matters</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Off-site, even when the hardware isn't</h2>
                <p className="mt-4 text-muted-foreground">
                  A smashed or stolen NVR is a common way footage disappears right when it matters most.
                  Camzify streams and stores footage off-site in the cloud as it's captured, so the recording
                  survives even if the physical hardware on-site doesn't.
                </p>
                <p className="mt-4 text-muted-foreground">
                  <strong className="font-semibold text-foreground">
                    Recording runs continuously or on a schedule, set per camera.
                  </strong>{' '}
                  Continuous suits anywhere an incident could happen at any hour. Scheduled records
                  only during the hours you define, which is the bluntest and most effective control
                  on storage cost — an interior camera watching an empty office overnight is paying
                  to store twelve hours of nothing. A schedule can be applied to a whole site or to
                  every camera at once rather than set one at a time.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Retention policy is where storage cost and evidence coverage trade off against each other —
                  a high-motion entrance camera at 4K eats storage far faster than a quiet loading dock at
                  1080p, which is why retention is configurable per camera rather than forced to one account-wide
                  setting. This module integrates with <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> too,
                  so patrol results, detection alerts, and platform status all feed into the same console, backed by the same off-site retention.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-mono-sm uppercase text-primary">Retention Modes</span>
                <div className="mt-4 space-y-3">
                  {[
                    { mode: 'By Days', desc: 'Keeps a fixed time window per camera, e.g. 14 or 30 days.' },
                    { mode: 'By Storage', desc: 'Caps a camera at a GB allowance; window flexes with activity.' },
                    { mode: '24/7 Continuous', desc: 'Records around the clock, paired with either limit above.' },
                  ].map((m) => (
                    <div key={m.mode} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2.5">
                      <span className="font-mono text-mono-sm text-primary">{m.mode}</span>
                      <span className="text-xs text-muted-foreground">{m.desc}</span>
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
              <Link href="/platform/license-and-instance-management" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">License & Instance Management</Link>
              <Link href="/virtual-patrolling" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Virtual Patrolling</Link>
              <Link href="/pricing" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Pricing</Link>
              <Link href="/book-a-demo" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Book a Demo</Link>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Industries using this</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/industries/retail" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
              <Link href="/industries/warehouses" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Warehouses</Link>
              <Link href="/industries/self-storage" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Self-Storage</Link>
              <Link href="/industries/remote-sites" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Remote Sites</Link>
            </div>
            <h3 className="mt-6 font-display text-lg font-bold">Use cases</h3>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link href="/use-cases/theft-prevention" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Theft Prevention</Link>
              <Link href="/use-cases/vandalism-prevention" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Vandalism Prevention</Link>
              <Link href="/use-cases/incident-investigation" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Incident Investigation</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
