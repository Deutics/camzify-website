import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import { SectionVisual } from '@/components/content/section-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { Camera, Route, FileCheck2, ShieldCheck, Users, BookOpen, MessageSquare } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * The previous version promised "dedicated support, training, and competitive margins".
 * None of those is a published program, and the brief bans stating margins. This page
 * says what a reseller is actually selling and what the terms process is.
 */
const pageMeta = {
  title: "Become a Reseller | Sell Virtual Patrolling",
  description: "Resell an AI cloud video management system with virtual patrolling built in. No hardware to stock, quote-based pricing, a page to quote for every claim.",
  path: "/partners/become-a-reseller",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  {
    question: 'What exactly would we be selling?',
    answer: 'A cloud video management system that runs on the cameras a customer already owns: live streaming, cloud recording and retention, 22 AI detections, alerts, and virtual patrolling, which is scheduled patrol rounds with a checklist per camera, a guard notified on failure and a compliance report per round. It is software only. There is no hardware to stock, ship or support.',
  },
  {
    question: 'How is it priced, and is there a published margin?',
    answer: 'Pricing is quote-based, and we do not publish margins. Reseller terms are agreed in conversation, and we would rather say that plainly than print a percentage that does not hold for every case. What we can tell you is that AI features are licensed per camera instance and platform modules come with the account, which is how a quote is built.',
  },
  {
    question: 'Who owns the customer relationship?',
    answer: 'You do. The customer\'s account can be created under yours as a sub-user, so you keep the commercial relationship and the customer gets its own scoped login, or the customer can hold its own account directly. Which one fits is a conversation, not a rule.',
  },
  {
    question: 'What can we point a prospect at?',
    answer: 'Everything on this site is written to be quoted: a page per platform module, a page per detection, guides that walk through the console step by step, comparisons that say where guards still win, and a trust page that lists what we do not claim. If a prospect asks a question the site does not answer, it is a question we should be answering, and we would like to hear it.',
  },
  {
    question: 'Which customers is it a fit for?',
    answer: 'Sites with cameras already installed and hours when nobody is watching them. Warehouses, construction sites, retail estates, manufacturing plants, property portfolios, self-storage and remote assets are the common shapes, and security agencies and monitoring companies that cover many client sites are a fit in their own right.',
  },
  {
    question: 'Is there a demo we can run for a prospect?',
    answer: 'Book a demo and we will run a live patrol round on real cameras with you, and again with your prospect if that helps. The interactive demonstration on the virtual patrolling page shows the manual round end to end, including the guard message and the before-and-after report, without a login.',
  },
];

const FRAMES = [
  { src: '/cam-06.jpg', id: 'CAM 01', loc: 'MAIN GATE' },
  { src: '/cam-02.jpg', id: 'CAM 04', loc: 'LOADING DOCK' },
  { src: '/cam-03.jpg', id: 'CAM 09', loc: 'SERVER CORRIDOR' },
  { src: '/cam-04.jpg', id: 'CAM 02', loc: 'PARKING LOT A' },
];

export default function BecomeAResellerPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Partners', href: '/partners' },
      { label: 'Become a Reseller' },
    ]}>
      <FeatureHero
        eyebrow="Resellers"
        title="Become a Camzify reseller"
        lede={<>
          <strong className="font-semibold text-foreground">
            Camzify is sold through partners as well as directly.
          </strong>{' '}
          The reseller track is for companies with a security or facilities customer base that
          want a recurring software line to sell into it. Virtual patrolling suits that motion:
          it attaches to cameras the customer already owns, so there is no hardware supply chain
          to carry and no rip-and-replace conversation to win first.
        </>}
        facts={['Software only, nothing to stock', 'Quote-based pricing, terms agreed in conversation', 'A page you can quote for every claim']}
        primary={{ href: '/contact', label: 'Talk to us about reselling' }}
        secondary={{ href: '/virtual-patrolling', label: 'What you would be selling' }}
        visual={
          <HeroPlaceholder
            label="Live round · The demonstration you can run"
            alt="A four-camera patrol round in progress in the Camzify console, the kind of live demonstration a reseller can run for a prospect"
            frames={FRAMES}
            active={0}
          />
        }
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">The product</span>
              <h2 className="mt-2 font-display text-2xl font-bold">What a reseller is actually selling</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                An AI cloud video management system for the cameras a customer already has, with
                one capability other cloud VMS products do not offer:{' '}
                <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>.
                A scheduled round works through each camera in order, checks a defined list at
                each stop, messages the designated guard when a check fails, and files a report
                with the snapshot behind every result. It replaces the routine patrol round, not
                the security function, and we say that on every page.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Around it sit the parts a buyer expects of any VMS: live streaming, cloud
                recording with retention per camera, 22 detections that fire on confirmed object
                tracks rather than pixel motion, alerts by email, SMS, WhatsApp and push, and
                multi-site management with role-based access.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionVisual
                variant="route"
                caption="A patrol round: ordered camera stops, a checklist at each, a report at the end. This is the demonstration that sells it."
                alt="A patrol route across four camera stops with a checklist count at each"
              />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">Selling it</span>
            <h2 className="mt-2 font-display text-2xl font-bold">What you have to work with</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Camera, title: 'No hardware conversation', desc: 'Any ONVIF or RTSP camera works, and Camzify sells none of its own. The prospect keeps what they have, which removes the objection that kills most upgrades.', href: '/supported-cameras' },
                { icon: Route, title: 'A demonstration that lands', desc: 'The interactive demo runs a manual round end to end, guard message and before-and-after report included. Book a live one on real cameras when a prospect is ready.', href: '/virtual-patrolling' },
                { icon: BookOpen, title: 'A page for every claim', desc: 'A page per module, per detection and per comparison, written to be quoted, plus guides that walk through the console step by step.', href: '/guides' },
                { icon: FileCheck2, title: 'A deliverable the buyer can show', desc: 'The report per round is timestamped, carries the snapshots and a compliance percentage, and is what a security manager takes to their own management.', href: '/virtual-patrolling/patrol-reports' },
              ].map((item) => (
                <Link key={item.title} href={item.href} className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-base font-bold group-hover:text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-[2fr_3fr]">
            <ScrollReveal>
              <SectionVisual
                variant="sites"
                caption="A reseller can hold the account and give each customer a scoped login, or the customer can hold its own. Either way you keep the relationship."
                alt="Account tree showing a reseller's account with customer sub-users beneath it"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <span className="font-mono text-mono-sm uppercase text-primary">The process</span>
              <h2 className="mt-2 font-display text-2xl font-bold">How reselling works in practice</h2>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                {[
                  { icon: MessageSquare, text: <>Start with a conversation. Tell us who you sell to and how; pricing is quote-based, so the terms are worked out against your customers rather than read off a rate card.</>},
                  { icon: Users, text: <>Decide where the customer&apos;s account lives. Under yours as a <Link href="/platform/user-management" className="text-primary hover:underline">sub-user</Link> with quota you allocate, or standalone. Both are supported.</>},
                  { icon: ShieldCheck, text: <>Sell what the site says. Every claim on this site is one we can stand behind, and the <Link href="/trust" className="text-primary hover:underline">trust page</Link> lists what we do not claim so you never have to walk something back.</>},
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <item.icon className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What we will not tell you</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                That there is a published margin, a tiered partner program with badges, or a
                training curriculum. There is not yet, and a page that pretended otherwise would
                be the wrong start to a partnership built on not overclaiming. If you install and
                maintain camera systems, the{' '}
                <Link href="/partners/for-security-integrators" className="text-primary hover:underline">security integrators</Link>{' '}
                page is closer to your work; if you operate the service for customers, see{' '}
                <Link href="/partners/for-managed-service-providers" className="text-primary hover:underline">managed service providers</Link>.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
            <span className="font-mono text-mono-sm uppercase text-primary">FAQ</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-6">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
