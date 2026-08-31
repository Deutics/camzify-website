import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { MobileAccessMockup } from '@/components/mockups/mobile-access-mockup';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import Image from 'next/image';
import { Smartphone, Globe, ShieldCheck, Bell } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Mobile Access | Security on the Go",
  description: "Camzify mobile access: live streams, alerts, and patrol compliance from any device. Responsive interface, no app download required.",
  path: "/platform/mobile-access",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Do guards need to install anything?', answer: 'No. Mobile access runs in the phone\'s own browser — Safari, Chrome, whatever\'s already there — so there\'s nothing to download, install, or keep updated through an app store.' },
  { question: 'Does mobile access work on tablets too?', answer: 'Yes. The interface is responsive rather than built around one fixed screen size, so it adapts across phones, tablets, and desktop browsers alike.' },
  { question: 'Can I acknowledge a critical alert from my phone?', answer: 'Yes, and it\'s the same acknowledgement state as everywhere else — acknowledging a critical event on mobile marks it acknowledged on the dashboard and in Notifications too, not just on the device you\'re holding.' },
  { question: 'Is the mobile experience missing any features compared to desktop?', answer: 'The core operational views — live streams, the alert feed, and patrol compliance — are all fully available on mobile. Some administrative and configuration screens are simply easier to work through on a larger display, but nothing is desktop-only by design.' },
  { question: 'Does mobile access require a separate license?', answer: 'No. It\'s the same account and the same data, viewed through a responsive interface — not a separate product or an add-on that needs its own license.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Platform', href: '/platform' },
      { label: 'Mobile Access' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Security On The Go</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Mobile Access</h1>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[2fr_3fr]">
            <p className="text-body text-muted-foreground">Camzify mobile access lets operations managers and guards view live streams, review alerts, and check patrol compliance from any device. The responsive web interface works on phones and tablets without a separate app download. Notifications reach guards wherever they are, and the same account data — cameras live, open critical alerts, patrol compliance — carries over exactly as it appears on desktop.</p>
            <Image
              src="/mobile-access.jpg"
              alt="A field worker checking a live camera grid on a phone and a multi-site status map on a tablet at a construction site"
              className="w-full rounded-xl"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-sm">
              <MobileAccessMockup />
            </div>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Smartphone, title: 'No app download', desc: 'Runs in any mobile browser — nothing to install, nothing to keep updated through an app store.' },
              { icon: Globe, title: 'Reachable from anywhere', desc: 'Live streams and the alert feed are one login away, whether a guard is on-site or off.' },
              { icon: ShieldCheck, title: 'Patrol compliance on the go', desc: 'Check today\'s round completion percentage without needing to be back at a desk.' },
              { icon: Bell, title: 'Notifications reach guards', desc: 'Alerts follow the person, not the workstation, so nothing waits for someone to be back at their screen.' },
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
                <span className="font-mono text-mono-sm uppercase text-primary">Built For Shift Work</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Responsive, not a separate app</h2>
                <p className="mt-4 text-muted-foreground">
                  Guards and supervisors don't work from one device. A round might start on a phone in a parking lot
                  and end at a desktop back in the office — a native app locked to one platform would mean re-learning
                  the interface, or losing features, every time the device changes. A responsive web app carries the
                  same layout logic and the same data across all of them.
                </p>
                <p className="mt-4 text-muted-foreground">
                  It also means there's no separate install to push out or keep current across a team's devices.
                  Whoever needs access opens a browser and logs in. This module integrates with{' '}
                  <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>, so
                  patrol results, alerts, and platform status stay in the same console on mobile as everywhere else.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-mono-sm uppercase text-primary">Works On</span>
                <div className="mt-4 space-y-3">
                  {[
                    { device: 'Phone', desc: 'Live streams, alerts, patrol compliance' },
                    { device: 'Tablet', desc: 'Same layout, more room for the camera grid' },
                    { device: 'Desktop', desc: 'Full dashboard and configuration screens' },
                  ].map((d) => (
                    <div key={d.device} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2.5">
                      <div className="text-sm font-medium">{d.device}</div>
                      <span className="text-xs text-muted-foreground">{d.desc}</span>
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
              <Link href="/platform/notifications-and-alerts" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Notifications & Alerts</Link>
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
