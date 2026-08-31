import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { LicenseMockup } from '@/components/mockups/license-mockup';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import Image from 'next/image';
import { Layers, HardDrive, Users, RefreshCcw } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "License & Instance Management",
  description: "Camzify license management: AI feature instances per plan, activated vs granted vs available, storage allocation, plan term tracking.",
  path: "/platform/license-and-instance-management",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: "What's the difference between \"granted to sub-users\" and \"activated by you\"?", answer: 'Both draw from the same pool of licensed instances. \"Activated by you\" counts instances you\'ve stood up on your own account. \"Granted to sub-users\" counts instances you\'ve allocated out of your plan to a sub-user\'s account instead — on the Enterprise Plan that\'s 73 activated by you and 11 granted out, against 96 total.' },
  { question: 'What happens when a feature shows FULLY USED?', answer: "It means every instance of that feature type has been activated and none remain available — Camera Tampering Instances, for example, sit at 8 activated out of 8 total. The feature keeps running normally for existing instances; you just can't stand up a new one until you request more or free one up." },
  { question: 'Can unused instances from one feature be reallocated to another?', answer: "No — instance allocations are per feature type, so the 5 available Stream Instances can't be converted into Line Intrusion Instances directly. Expanding a specific feature, like Virtual Patrolling System Instances which is fully granted, goes through the request-more flow rather than a reallocation between features." },
  { question: 'How is storage entitlement separate from instance count?', answer: 'Video Backup Storage is tracked as its own pool — 18.0 TB total, 13.5 TB activated, 4.0 TB granted to sub-users, 460 GB available — independent of how many AI-feature instances are on the plan. A plan can have headroom on instances while storage is nearly full, or the reverse, and each is monitored on its own.' },
  { question: 'What happens when the subscription term ends?', answer: "The Enterprise Plan on this account started November 28, 2024 and expires December 29, 2026, and renews through your account manager rather than an automatic charge. As the expiry date approaches, the days-remaining figure on this page is the fastest way to check how much runway is left before renewal needs to happen." },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Platform', href: '/platform' },
      { label: 'License & Instance Management' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Plan & Usage</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">License & Instance Management</h1>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[2fr_3fr]">
            <p className="text-body text-muted-foreground">The Plan & Usage page shows total instances per AI feature, how many are activated by you, how many are granted to sub-users, and how many remain available — plus a separate storage entitlement tracked in terabytes. Plan terms show start date, expiry, and days remaining. On the current Enterprise Plan, 96 instances are granted across 8 features, with 12 still available and 161 days left on the term.</p>
            <Image
              src="/license-and-instance-management.jpg"
              alt="A laptop showing the Camzify Plan & Usage screen with subscription term, instance totals, storage entitlement, and a per-feature allocation table"
              className="w-full"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-12">
            <LicenseMockup />
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Layers, title: 'Per-feature instance transparency', desc: 'Total, activated, granted, and available are broken out for every AI feature on the plan — no combined number hiding where the room is.' },
              { icon: HardDrive, title: 'Storage entitlement tracking', desc: 'Video Backup Storage is metered separately in terabytes, currently 13.5 of 18.0 TB activated with 460 GB available.' },
              { icon: Users, title: 'Sub-user allocation from the same pool', desc: 'Instances granted to sub-users draw from the same 96-instance plan total, keeping one account-wide source of truth.' },
              { icon: RefreshCcw, title: 'Request-more when you hit the ceiling', desc: 'A feature that\'s fully granted or fully used, like Virtual Patrolling or Camera Tampering, surfaces a clear request-more path instead of a dead end.' },
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
                <span className="font-mono text-mono-sm uppercase text-primary">Reading The Numbers</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Activated, granted, and available</h2>
                <p className="mt-4 text-muted-foreground">
                  Every feature on the plan is broken into the same three buckets. Activated means you've stood up
                  an instance and it's running. Granted means you've allocated an instance out to a sub-user's
                  account instead of using it yourself. Available is what's left of the total — neither activated
                  nor granted — and it's the number that tells you how much room you actually have.
                </p>
                <p className="mt-4 text-muted-foreground">
                  That distinction matters most at the edges. Virtual Patrolling System Instances shows 9 total,
                  0 activated, 9 granted, 0 available — every instance is already out with sub-users, so
                  expanding your own usage there means requesting more, not reclaiming anything. Camera Tampering
                  Instances is fully used the other way: 8 of 8 activated directly, none available.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-mono-sm uppercase text-primary">Headroom By Feature</span>
                <div className="mt-4 space-y-3">
                  {[
                    { feature: 'Stream Instances', detail: '50 activated · 5 available' },
                    { feature: 'Virtual Patrolling System', detail: '9 granted · 0 available' },
                    { feature: 'Camera Tampering', detail: '8 activated · 0 available' },
                    { feature: 'Heatmaps Instances', detail: '2 activated · 2 available' },
                  ].map((f) => (
                    <div key={f.feature} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2.5">
                      <div>
                        <div className="text-sm font-medium">{f.feature}</div>
                        <div className="text-xs text-muted-foreground">{f.detail}</div>
                      </div>
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
              <Link href="/platform/permission-groups" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Permission Groups</Link>
              <Link href="/platform/user-management" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">User Management</Link>
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
