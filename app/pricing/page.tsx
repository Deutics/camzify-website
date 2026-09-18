import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { SectionVisual } from '@/components/content/section-visual';
import { FeatureHero } from '@/components/content/feature-hero';
import { PhotoFigure } from '@/components/content/photo-figure';
import Link from 'next/link';
import { Camera, Cpu, HardDrive, Users, Building2, MessageSquare } from 'lucide-react';
import { QuoteEstimator } from '@/components/content/quote-estimator';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * Pricing is per instance per month and quoted for the site, lower for an annual term
 * and for more features per camera. The one public figure is the floor the business
 * stated on 2026-09-17: from $5 per camera per month. Internal rates exist only in
 * lib/pricing-estimates.ts and are used on the server to put an estimate in the team's
 * lead email; nothing else on the site shows a rate, which is how the comparable
 * software-only vendors handle it. So this page says what a quote is built from, lets
 * the reader build a configuration, and sends it in as a quote request.
 */
const pageMeta = {
  title: "Pricing | From $5 a Camera, Quoted for You",
  description: "Camzify is priced per instance per month, from $5 per camera. Build your configuration and get a quote for your site within one business day.",
  path: "/pricing",
};

export const metadata = generatePageMeta({ ...pageMeta });

const builtFrom = [
  { icon: Camera, title: 'Camera stream instances', desc: 'One per connected camera, from $5 a month. It connects the camera, streams it live and lets it be recorded and patrolled, and motion detection and camera tampering detection come with it at no charge.' },
  { icon: Cpu, title: 'AI detection instances', desc: 'One per AI feature per camera: ten cameras with line intrusion are ten line intrusion instances. A virtual patrolling instance puts one camera on manual and automated rounds. Each feature type has its own monthly price, and behavioral anomaly and weapons detection sit at the top of the range.' },
  { icon: HardDrive, title: 'Cloud storage', desc: 'Sold per terabyte per month, as a pool for the account. You decide how it is spent: retention is set per camera or applied to a whole site, so a gate camera can keep ninety days while a corridor keeps seven.' },
  { icon: Users, title: 'Sub-users and quota', desc: 'Stream instances, detection instances and storage can be allocated to sub-users from what the account holds. A partner quote is sized for the portfolio.' },
  { icon: Building2, title: 'Sites', desc: 'Every site runs its own sequences, schedule and roster on one account. More sites do not need more accounts or more instances.' },
  { icon: MessageSquare, title: 'What is not a line item', desc: 'The platform modules: live streaming, cloud backup, notifications, analytics, user management and permission groups come with the account. So do motion detection and camera tampering detection on every connected camera.' },
];

/** A configuration, not a price: what an account of this shape is licensed for. */
const example = [
  { count: '100', item: 'camera stream instances', note: 'one per connected camera, each streamed live' },
  { count: '10', item: 'line intrusion instances', note: 'on the ten perimeter cameras' },
  { count: '30', item: 'loitering detection instances', note: 'on the thirty cameras that watch entrances and aisles' },
  { count: '5', item: 'weapons detection instances', note: 'on the five lobby and entrance cameras' },
  { count: '30 TB', item: 'cloud storage', note: 'per terabyte per month, spent by the retention set on each camera' },
];

const faqs = [
  { question: 'How much does Camzify cost?', answer: 'Camzify starts from $5 per camera per month. Every camera takes one stream instance, each AI detection is licensed per feature per camera, and cloud storage is sold per terabyte per month, so the exact figure depends on how many detections run on each camera and how long footage is kept. Motion detection and camera tampering detection are included with every camera. Quotes are per site, with no hardware to buy.' },
  { question: 'Why is there no price list on this page?', answer: 'Because the quote depends on the term and on how much runs on each camera, and a list would be wrong for most sites. Camzify starts from $5 per camera per month, and the quote is the sum of the instances an account needs: a stream instance for every camera, a detection instance for every AI feature on a camera, a patrol instance for every camera on rounds, and storage per terabyte. Build the configuration above, request the quote, and it comes back set for your site within one business day.' },
  { question: 'Do you offer discounts?', answer: 'Yes. Quotes come in lower for an annual term and for accounts that license more features per camera, and a partner portfolio is quoted as a whole. That is what takes a stream instance down to the $5 floor.' },
  { question: 'Which detections are free?', answer: 'Motion detection and camera tampering detection are included with every stream instance, so every connected camera has both without a detection instance. Everything else is licensed as an instance per camera.' },
  { question: 'How does per-instance pricing work?', answer: 'Every connected camera takes one stream instance, which connects it, streams it live and makes it available to record and patrol. Every AI feature you enable on a camera takes one detection instance of that feature, so a camera with two detections carries two, and every camera on patrol rounds takes a virtual patrolling instance. Storage is sold per terabyte per month as a pool for the account, and you set how each camera or site draws on it. Each instance type has its own monthly price, and the platform modules come with the account.' },
  { question: 'What is an instance?', answer: 'One unit of something licensed on one camera: a stream instance is one camera connected, a line intrusion instance is line intrusion running on one camera. The plan page in the console shows, per type, how many instances are on the plan, how many are activated, how many are granted to sub-users, and how many remain. A parent account allocates instances to sub-users from that pool.' },
  { question: 'How do I compare it with hiring guards?', answer: 'Take the hours per week spent on routine rounds, times the hourly rate, times sites. That is the figure a quote is measured against. The ROI calculator computes it from your own numbers and has an agency mode for partners who would sell remote patrols at their own price.' },
  { question: 'Is there hardware to buy?', answer: 'No. Camzify sells no hardware. The one thing sometimes needed on site is a PC running the Camzify Connector for cameras that cannot be reached from the internet.' },
  { question: 'Are there minimums or contracts?', answer: 'Terms are agreed in the quote, not published. Tell us the sites and cameras and we will tell you what applies.' },
];

export default function PricingPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'Pricing' }]}>
      <FeatureHero
        eyebrow="Pricing"
        title="Pay per instance, per month, for what you switch on"
        lede={
          <>
            <strong className="font-semibold text-foreground">
              Camzify is priced per instance per month and quoted for your site, from $5 per camera.
            </strong>{' '}
            A stream instance for every camera, a detection instance for every AI feature on it, a
            patrol instance for every camera on rounds, and cloud storage per terabyte. The platform
            comes with the account, and the quote comes in lower for an annual term or more features
            per camera.
          </>
        }
        facts={['From $5 per camera per month', 'Motion and tampering detection included', 'Quote within one business day']}
        primary={{ href: '#quote', label: 'Build your configuration and get a quote' }}
        secondary={{ href: '/roi-calculator', label: 'Run your numbers first' }}
        visual={
          <>
            <PhotoFigure src="/product-pricing-plan-light.webp" alt="The Plan and Usage screen on a laptop, with a request to add stream instances open" priority className="dark:hidden" />
            <PhotoFigure src="/product-pricing-plan-dark.webp" alt="The Plan and Usage screen on a laptop, with a request to add stream instances open" className="hidden dark:block" />
          </>
        }
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div>
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
              <SectionVisual variant="compliance" caption="What you are paying for per round: the checks, the frames and the compliance record. The quote is per instance; the value is per round." alt="A compliance overview showing patrol rounds with their compliance percentages" />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How instance licensing works</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Everything on the account is an instance of one type. A stream instance is one
                camera connected: it streams live, it can be recorded, and it can be a stop on a
                patrol round. A detection instance is one AI feature running on one camera, so a
                camera with line intrusion and loitering detection carries one instance of each.
                Cloud storage is its own pool, sold per terabyte per month, that the retention on
                every camera draws from. How it is spent is entirely yours to set: retention per
                camera in days or as a storage cap, or one setting applied to a whole site, with
                longer retention on the cameras that matter and shorter on the ones that do not. The plan page in the console shows, per type, how many
                instances are on the plan, how many you have activated, how many are granted to
                sub-users, and how many remain. For a multi-site or partner account, the parent
                allocates instances to sub-users from that pool and can reclaim them. The{' '}
                <Link href="/platform/license-and-instance-management" className="text-primary hover:underline">license and instance management</Link>{' '}
                page shows the screen.
              </p>
              <div className="mt-8 rounded-xl border border-border bg-card p-6">
                <p className="font-mono text-mono-sm uppercase text-primary">Worked configuration</p>
                <p className="mt-2 max-w-prose text-sm text-muted-foreground">
                  A site with 100 cameras that wants line intrusion on ten of them, loitering
                  detection on thirty, weapons detection on five, and 30 TB of storage is licensed
                  for exactly that, and billed monthly for it:
                </p>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  {example.map((e) => (
                    <div key={e.item} className="flex gap-3 rounded-lg border border-border bg-background px-4 py-3">
                      <dt className="font-display text-lg font-bold text-foreground">{e.count}</dt>
                      <dd className="text-sm">
                        <span className="block font-medium text-foreground">{e.item}</span>
                        <span className="block text-muted-foreground">{e.note}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 max-w-prose text-sm text-muted-foreground">
                  The other 70 cameras carry no detection and cost only their stream instance. Add a
                  detection to a camera later and it takes one more instance from that month on. The
                  30 TB is spent however the account decides: ninety days on the gates, seven on the
                  corridors, a storage cap on a busy dock. Put your own counts into the form
                  below and the quote prices a configuration like this for your site.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Request a quote</span>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Your counts, then the quote</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Enter what you would connect and switch on. Send it and the quote comes back within
                one business day for exactly this configuration, set for your site, with any
                annual-term or volume discount already applied.
              </p>
            </ScrollReveal>
            <div className="mt-8">
              <QuoteEstimator />
            </div>
          </div>

          <FaqSection items={faqs} inline heading="Pricing, answered" />
        </div>
      </section>
    </PageShell>
  );
}
