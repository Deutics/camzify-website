import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FAQAccordion } from '@/components/content/faq-accordion';
import { SectionVisual } from '@/components/content/section-visual';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * Written for the owner of a small security business; the lead files say that is who
 * reads these pages. No prices, no figures the business has not verified.
 */
const pageMeta = {
  title: 'How to Sell Virtual Patrolling to Your Clients',
  description: 'For guarding company owners: the client conversation, starting from what they buy now. Show one round, sell the report, price per site, keep the guards.',
  path: "/guides/how-to-sell-virtual-patrolling-to-clients",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime: '2026-09-07', modifiedTime: '2026-09-07' });

const faqs = [
  { question: 'Does the client need to buy anything?', answer: "Usually not. Any camera producing an RTSP stream works, plus RTMP and HTTPS. Cameras on the client's network connect through the Camzify Connector on a PC inside it. A client with no cameras is the one case where there is nothing to sell yet." },
  { question: 'What do I say when they ask what it costs?', answer: 'Your price per site per month, set against the quote you have from us. We do not publish rates, so there is no public number for the client to compare against, and the proposal should not repeat ours either.' },
  { question: 'How many rounds should I propose?', answer: 'Enough to make the report meaningful and no more than the client will pay for. Every hour or every two hours overnight is a common shape. Frequency, active hours and active days are set per sequence, so two clients can have two schedules.' },
  { question: 'Can I run the round for the client, or do they run it?', answer: "Either. Automated rounds run on the schedule with nobody in the loop. Manual rounds are run from the console by whoever has the login, which can be your operator or the client's own. Most agencies run the automated rounds and give the client the Auditor view." },
  { question: 'What if the client wants to see the cameras live?', answer: 'They can, through their scoped login: their live wall, their alerts, their reports, nothing else. Whether you give them that or the report only is a commercial choice; both are supported.' },
  { question: 'Is there a partner program with margins to quote?', answer: 'No published margin, tier or curriculum. Terms are agreed in conversation, and the partner pages say so rather than inventing a program. Book a demo or ask for a partner quote and the conversation starts from your portfolio.' },
];

export default function HowToSellVirtualPatrollingToClientsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[articleSchema({ headline: "How to Sell Virtual Patrolling to Your Clients", description: pageMeta.description, path: pageMeta.path, datePublished: '2026-09-07', dateModified: '2026-09-07' }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'How to Sell Virtual Patrolling to Your Clients' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Owner guide</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">How to sell virtual patrolling to your clients</h1>
          <AuthorByline className="mt-6" />
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
            <p className="max-w-prose text-body text-muted-foreground">Nobody who buys guarding has asked for virtual patrolling by name. They have asked, in other words, for the hours they cannot afford, the overnight checks nobody makes, and something to show the insurer. This guide is the conversation, in the order it tends to go, for an owner who sells guard hours and mobile patrols today and wants to add a monthly service without losing the contract they have.</p>
            <SectionVisual variant="report" caption="The thing you are selling. Show the report before the price." alt="A patrol report excerpt with a checklist item, its before and after snapshots and a compliance percentage" />
          </div>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Start from what they buy now, not from the software</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>The client buys visits and hours. Open with the gap in both: the eleven sites the driver did not stop at tonight, the hours between the 23:00 and 03:00 visits, the checks that happen only when someone remembers. A camera round is the answer to the gap, and it is easier to sell as coverage between visits than as a product with a name.</p>
              <p>Do not lead with detections, models or a console. Lead with a checklist: at each camera, is the door closed, is the yard empty, is the dock down. The client recognizes those questions because they are the ones they ask you. The <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling overview</Link> is where you send them afterwards, not where you start.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Show one round, on their cameras if you can</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>A round is a sequence of camera stops with a checklist at each, run on a schedule, with a report at the end. The <Link href="/virtual-patrolling/how-it-works" className="text-primary hover:underline">how it works</Link> page walks through it, and the interactive demonstration on the virtual patrolling page runs a manual round end to end in about twenty seconds, including the guard message and the before-and-after report. Run it in the meeting. It does more than any slide.</p>
              <p>If the client has cameras you can reach, book a demo and we will run a live round on them. A report with the client's own dock door in it settles the question of whether the thing is real.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Sell the report, because the report is the product</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>A visit log says a driver attended. A <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">round report</Link> shows every camera stop, every checklist result, the frame it was judged against, the before-and-after pair for anything fixed, a timestamp and a compliance percentage. Clients with an insurer, a landlord or a head office to answer to see the difference immediately, and it is the part they cannot get from anyone who does not run rounds.</p>
              <p>Show a sample report before you show a price. The client who has seen the report is negotiating for it; the client who has not is negotiating against a line item.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Keep the guards in the contract</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>The round does not attend. It finds the dock door up and messages your guard with the frame; someone still drives out. Say so plainly, because the client will ask, and because it is the reason the guarding contract stays. The <Link href="/compare/virtual-patrolling-vs-mobile-patrols" className="text-primary hover:underline">mobile patrols comparison</Link> is written to be shown to a client for exactly this point.</p>
              <p>The shape that sells is rounds on the cameras all night, the driver dispatched to what fails, and a report per round. Coverage and response, priced separately, on one invoice.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Price it per site per month, at your rate</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>Camzify is priced per camera and quoted for the portfolio you would cover; we do not publish rates and neither should your proposal repeat ours. You set the price per client site per month against the quote. The <Link href="/roi-calculator#agency" className="text-primary hover:underline">agency mode of the ROI calculator</Link> takes your client count, your price and the hours you cannot staff, and shows the recurring revenue; the margin is the difference between that and your quote.</p>
              <p>Put the price beside the report and the schedule, not on its own. The <Link href="/guides/what-goes-in-a-remote-patrol-proposal" className="text-primary hover:underline">proposal guide</Link> covers what the document contains.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Set the account up so the client sees only their own</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>Your company holds the account. Each client is a <Link href="/platform/user-management" className="text-primary hover:underline">sub-user</Link> scoped to their sites, with a permission group that decides what they can open; the ready-made Auditor group sees everything and changes nothing, which suits a client checking on the service. They read their own reports through their own login and nothing that belongs to another client of yours. The <Link href="/partners/for-security-agencies" className="text-primary hover:underline">security agencies page</Link> covers the model.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What not to promise</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>Not that it replaces guards, not a detection rate, not a response time, not a saving with a number on it. Everything on this site is written to be quoted without being walked back, and the <Link href="/trust" className="text-primary hover:underline">trust page</Link> lists what we do not claim. A proposal that stays inside those lines is one the client will not catch out later.</p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16 rounded-2xl border border-border bg-card p-8 sm:p-10">
            <span className="font-mono text-mono-sm uppercase text-primary">FAQ</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-6"><FAQAccordion items={faqs} /></div>
          </section>

          <section className="mt-12 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/partners/for-security-agencies" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground">For security agencies</Link>
              <Link href="/compare/virtual-patrolling-vs-mobile-patrols" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground">Virtual patrolling vs mobile patrols</Link>
              <Link href="/guides/what-goes-in-a-remote-patrol-proposal" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground">What goes in a proposal</Link>
              <Link href="/virtual-patrolling/patrol-reports" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground">Patrol reports</Link>
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
