import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { SectionVisual } from '@/components/content/section-visual';
import Link from 'next/link';
import { PhotoFigure } from '@/components/content/photo-figure';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * Written for the owner of a small security business; the lead files say that is who
 * reads these pages. No prices, no figures the business has not verified.
 */
const pageMeta = {
  title: 'What Goes in a Remote Patrol Proposal',
  description: 'The eight sections of a remote patrol proposal: sites and cameras, sequence, checklist, schedule, notifications, what the client receives, price, limits.',
  path: "/guides/what-goes-in-a-remote-patrol-proposal",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime: '2026-09-07', modifiedTime: '2026-09-07' });

const faqs = [
  { question: 'How long should the proposal be?', answer: 'Two to four pages, plus a sample report. The service is concrete enough that a long proposal reads as padding.' },
  { question: 'Should I include a trial round?', answer: "If the client's cameras are reachable, yes. Book a demo and we will run a live round on their cameras; the report from it is the best page in the proposal." },
  { question: 'Do I need to explain the AI?', answer: 'Only as far as the checklist. The client cares that the round judges each item from the frame and keeps the frame. The detections that watch between rounds have their own pages if the client asks.' },
  { question: 'What if the client wants a service level?', answer: 'State what the schedule does and what the notification does, and do not state a response time you cannot control. Your response time is yours to commit to; ours is not a published figure.' },
  { question: 'Can the client change the checklist later?', answer: 'Yes, if their login has the permission. Checklist items are per camera and editable in the console. Many agencies keep that with themselves and take change requests.' },
  { question: 'Should the proposal mention Camzify by name?', answer: 'Your choice. The console carries the Camzify name and there is no white-label option, so a client with a login will see it. Some agencies present the service under their own name and name the platform in the appendix.' },
];

export default function WhatGoesInARemotePatrolProposalPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[articleSchema({ headline: "What Goes in a Remote Patrol Proposal", description: pageMeta.description, path: pageMeta.path, datePublished: '2026-09-07', dateModified: '2026-09-07' }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'What Goes in a Remote Patrol Proposal' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Owner guide</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">What goes in a remote patrol proposal</h1>
          <AuthorByline className="mt-6" />
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
            <p className="max-w-prose text-body text-muted-foreground">A proposal for remote patrols is short if it is honest, because the service is concrete: these cameras, this checklist, this schedule, this report, this person notified when a check fails, this price per site per month. This guide lists the sections in the order a client reads them, with what each should say and what it should leave out. It assumes you sell guarding or monitoring already and are adding rounds to the offer.</p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/vp-patrol-reports-1.png" alt="A patrol compliance report in the console: overall compliance, each camera stop, each item with its result and the frame behind it" caption="What the client receives after every round" />
          </div>
            <SectionVisual variant="checklist" caption="Section three of the proposal: the checklist per camera, as it appears on the round." alt="A patrol checklist with four items in different states" />
          </div>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">1. The sites and the cameras</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>Name each site and the cameras the round will use, by location rather than model: front gate, rear yard, dock bays one to three, server corridor. Say how each connects, directly by RTSP where the stream is reachable, or through the Camzify Connector on a PC inside the site's network, and say which cameras are not covered. A client who knows the round does not see the back stairwell is a client who does not blame the round when something happens there.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">2. The patrol sequence</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>The order the round visits the cameras. Write it as a walk: gate, yard, dock, corridor, plant room, back to the gate. Each stop is one camera. The <Link href="/virtual-patrolling/patrol-sequences" className="text-primary hover:underline">patrol sequences</Link> page explains how a sequence is built and why order matters for the report.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">3. The checklist, per camera</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>This is the heart of the proposal and the part clients read twice. At each stop, the conditions the round checks: dock door down, yard empty, gate closed and latched, camera view unobstructed. Write them as conditions, not events, so that a round that passes means something. Three to five items per camera is typical. The <Link href="/virtual-patrolling/patrol-checklists" className="text-primary hover:underline">checklists page</Link> covers how items are written and the three states each can hold: Compliant, Not Compliant and Pending.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">4. The schedule</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>Frequency, active hours and active days, per sequence. Every hour from 19:00 to 07:00 on weeknights, every two hours around the clock at weekends, whatever the client's risk and budget say. State whether rounds are <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated</Link>, run by your operator, or both. Say what happens if the site's connection drops: the round is logged as missed, not skipped silently, and the next scheduled round runs when the connection returns.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">5. Who is notified, and how</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>When a check fails, the item is marked Not Compliant with the frame and the guard designated for that camera is messaged on the configured channel: email, SMS, WhatsApp or push. Name the person or the desk per site, and say what they do next. On an automated round the message is immediate and unattended. The <Link href="/virtual-patrolling/guard-notifications" className="text-primary hover:underline">guard notifications</Link> page has the detail.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">6. What the client receives</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>A report per round: every stop, every item, its result, the frame it was judged against, the before-and-after pair for anything fixed, timestamps and a compliance percentage. Include a sample. Say how they get it: through their own scoped login, by email, or both. The <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">patrol reports</Link> page shows one.</p>
              <p>Say also what the client can see live if you give them a login: their cameras, their alerts, their reports, and nothing belonging to another client of yours.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">7. The price, per site per month</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>Your price, set against the quote you hold from us. Do not repeat Camzify's rates in the proposal; we do not publish them and the client does not need them. Price the round separately from the guarding or the response, so the client can see what each buys. The <Link href="/roi-calculator#agency" className="text-primary hover:underline">agency mode of the ROI calculator</Link> shows the recurring revenue for a given client count and price.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">8. What the service does not do</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>One paragraph, in plain words. It does not attend; a person does. It does not see areas without cameras. It does not run without a connection. It is not a detection rate or a response time. A proposal that says this is a proposal the client trusts, and it is the paragraph that keeps the guarding contract in place. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> is the model.</p>
              </div>
            </ScrollReveal>
          </section>

          <FaqSection items={faqs} inline />

          <section className="mt-12 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/how-to-sell-virtual-patrolling-to-clients" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground">How to sell virtual patrolling</Link>
              <Link href="/virtual-patrolling/patrol-checklists" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground">Patrol checklists</Link>
              <Link href="/virtual-patrolling/patrol-reports" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground">Patrol reports</Link>
              <Link href="/partners/for-security-agencies" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground">For security agencies</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/roi-calculator#agency" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90">Run your numbers</Link>
              <Link href="/contact" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">Ask for a partner quote</Link>
            </div>
          </section>
        </div>
      </article>
    </PageShell>
  );
}
