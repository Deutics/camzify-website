import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { SectionVisual } from '@/components/content/section-visual';
import Link from 'next/link';
import { Camera, Cpu, HardDrive, Users, Building2, Calculator, ArrowRight, MessageSquare } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * Pricing is quote-based and the business has decided (2026-09-07) that no price,
 * "from" figure or placeholder rate appears on the site. The previous version of this
 * page showed three tiers with camera bands, retention days, "SLA guarantees" and an
 * "on-premise option", none of which the business has verified and several of which
 * contradict the product as documented elsewhere. This page now says what a quote is
 * built from, which is the substance a buyer and an answer engine can use, and sends
 * the reader to contact for the number.
 */
const pageMeta = {
  title: "Pricing | Per Camera, Quoted for Your Site",
  description: "Camzify is priced per camera per month and quoted for your site or client portfolio. What a quote is built from, and how to ask for one.",
  path: "/pricing",
};

export const metadata = generatePageMeta({ ...pageMeta });

const builtFrom = [
  { icon: Camera, title: 'Cameras', desc: 'The unit of pricing. Every camera on the account counts once, whatever it is used for.' },
  { icon: Cpu, title: 'AI features per camera', desc: 'Each detection is licensed as an instance on a camera, so a perimeter camera and a stockroom camera carry different features and different cost.' },
  { icon: HardDrive, title: 'Cloud retention', desc: 'Recording is kept per camera by days or by a storage cap. Longer retention on more cameras is the second thing that moves a quote.' },
  { icon: Users, title: 'Sub-users and quota', desc: 'Sites, cameras, instances and storage can be allocated to sub-users from what the account holds. A partner quote is sized for the portfolio.' },
  { icon: Building2, title: 'Sites', desc: 'Every site runs its own sequences, schedule and roster on one account. More sites do not need more accounts.' },
  { icon: MessageSquare, title: 'What is not a line item', desc: 'The platform modules: live streaming, cloud backup, notifications, analytics, user management, permission groups and virtual patrolling come with the account.' },
];

const faqs = [
  { question: 'Why is there no price on this page?', answer: 'Because a price that fits every site is a price that fits none, and we would rather quote than mislead. Camzify is priced per camera per month, and the quote depends on camera count, the AI features licensed on each camera, retention, and the number of sites and sub-users. Ask for one with your camera count and it comes back against your own guarding cost.' },
  { question: 'How does per-camera pricing work?', answer: 'Every camera on the account counts once. The platform modules come with the account; AI features are licensed per camera instance, so each camera carries only the detections it uses. Retention is set per camera and affects the quote in proportion.' },
  { question: 'What is an instance?', answer: 'One AI feature running on one camera. The plan page in the console shows, per feature, how many instances are on the plan, how many are activated, how many are granted to sub-users, and how many remain. A parent account allocates instances to sub-users from that pool.' },
  { question: 'How do I compare it with hiring guards?', answer: 'Take the hours per week spent on routine rounds, times the hourly rate, times sites. That is the figure a quote is measured against. The ROI calculator computes it from your own numbers and has an agency mode for partners who would sell remote patrols at their own price.' },
  { question: 'Is there hardware to buy?', answer: 'No. Camzify sells no hardware. The one thing sometimes needed on site is a PC running the Camzify Connector for cameras that cannot be reached from the internet.' },
  { question: 'Are there minimums or contracts?', answer: 'Terms are agreed in the quote, not published. Tell us the sites and cameras and we will tell you what applies.' },
];

export default function PricingPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Pricing' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-mono-sm uppercase text-primary">Per camera, quoted for your site</span>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Pricing</h1>
            <p className="mt-6 text-body text-muted-foreground">
              <strong className="font-semibold text-foreground">Camzify is priced per camera per month and quoted for your site.</strong>{' '}
              No hardware, no separate charge for the platform modules, and AI features licensed
              only on the cameras that use them. The number depends on six things, all of them
              yours to count, and the quote comes back against what routine rounds cost you today.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90">
                Ask for a quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/roi-calculator" className="inline-flex items-center gap-2 rounded-lg border border-border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-accent hover:border-primary/30">
                <Calculator className="h-4 w-4" aria-hidden="true" /> Run your numbers first
              </Link>
            </div>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">What a quote is built from</span>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Six things, all of them yours to count</h2>
            </ScrollReveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {builtFrom.map((b, i) => (
                <ScrollReveal key={b.title} delay={i * 0.05}>
                  <div className="h-full rounded-xl border border-border bg-card p-6">
                    <b.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-base font-bold">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">The comparison that matters</span>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Compare against guarding, not against software</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The cost that virtual patrolling is measured against is not another platform. It
                is the hours a person spends walking routine rounds: hours per week, times the
                hourly rate, times sites. That figure is yours, it varies by market and contract,
                and we will not guess it for you. The{' '}
                <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>{' '}
                computes it from your own numbers, and the{' '}
                <Link href="/guides/security-guard-cost-per-hour" className="text-primary hover:underline">guard cost guide</Link>{' '}
                explains why a staffed post costs several people, not one.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                What a round replaces is the routine walk, not the response. The{' '}
                <Link href="/virtual-patrolling/vs-security-guards" className="text-primary hover:underline">guards comparison</Link>{' '}
                covers where a person is still needed, and the{' '}
                <Link href="/partners/for-security-agencies" className="text-primary hover:underline">security agencies page</Link>{' '}
                covers why, for a guarding company, this is revenue to sell rather than a cost to cut.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionVisual variant="compliance" caption="What you are paying for per round: the checks, the frames and the compliance record. The quote is per camera; the value is per round." alt="A compliance overview showing patrol rounds with their compliance percentages" />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How instance licensing works</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                An instance is one AI feature running on one camera. The plan page in the console
                shows, per feature, how many instances are on the plan, how many you have
                activated, how many are granted to sub-users, and how many remain. For a
                multi-site or partner account, the parent allocates instances to sub-users from that
                pool and can reclaim them. The{' '}
                <Link href="/platform/license-and-instance-management" className="text-primary hover:underline">license and instance management</Link>{' '}
                page shows the screen.
              </p>
            </ScrollReveal>
          </div>

          <FaqSection items={faqs} inline heading="Pricing, answered" />
        </div>
      </section>
    </PageShell>
  );
}
