import { generatePageMeta } from '@/lib/page-utils';
import { PhotoFigure } from '@/components/content/photo-figure';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * Written for the owner of a guarding company, a monitoring center or a CCTV
 * installation business asking whether a cloud VMS lets them sell a monitored service
 * on cameras their clients already own. Every product and partner fact here is taken
 * from the partner pages, the platform page and /llms.txt. No prices, margins or
 * figures the business has not verified.
 */
const pageMeta = {
  title: 'Cloud VMS for Security Agencies | Guide',
  description: 'How a guarding company, monitoring center or installer sells a monitored video service on the cameras clients already own, with a login per client.',
  path: '/guides/cloud-vms-for-security-agencies',
};

const publishedTime = '2026-09-16';
const modifiedTime = '2026-09-16';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const faqs = [
  { question: 'Do my clients need to buy new cameras?', answer: 'Usually not. Any camera that produces an RTSP stream connects, plus RTMP and HTTPS streams, and cameras on a private network connect through the Camzify Connector on a machine inside that network without port forwarding. Camzify sells no hardware, so there is nothing to stock or ship. A client with no cameras at all is the one case where there is nothing to connect yet.' },
  { question: 'Does each client need their own Camzify account?', answer: 'No. Your company holds one account and each client is a sub-user scoped to their own sites and cameras. Their login reaches their cameras, their patrol reports and their alerts and nothing that belongs to another client of yours. Sub-users can create sub-users of their own, so a client can give its own staff a login without involving you.' },
  { question: 'How is Camzify priced for an agency?', answer: 'Per camera, quoted for the portfolio you would cover. Camzify starts from $5 per camera per month and a partner portfolio is quoted as a whole; there is no published partner margin, tier or portal, and terms are agreed in conversation. You set your own price per client site per month against the quote, and the ROI calculator has an agency mode for that arithmetic.' },
  { question: 'Can a monitoring center hold the account instead of the agency?', answer: 'Yes. Whoever operates the console holds the account. A monitoring company running rounds for several agencies holds it and gives each agency a scoped login; an agency that runs its own monitoring holds it and gives its clients logins. Both arrangements use the same sub-user model.' },
  { question: 'What happens when a client leaves?', answer: 'Their sub-user can be deactivated without being deleted. A suspended sub-user keeps its sites, recordings and reports and can be reinstated, so a client who comes back does not start from nothing. The quota allocated to them returns to your license to allocate elsewhere.' },
  { question: 'Does this replace the guards my agency sells?', answer: 'No, and we say so on every partner page. The round covers the routine checks and the hours you cannot staff, and it notifies your guard when a check fails or a risk is raised. Someone still attends. The guard hours you sell become response hours, which is the part a client is least willing to cut.' },
];

export default function CloudVmsForSecurityAgenciesPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[articleSchema({ headline: 'Cloud VMS for Security Agencies', description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'Cloud VMS for Security Agencies' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Owner guide</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cloud VMS for security agencies: a service on the cameras your clients already own</h1>
          <AuthorByline className="mt-6" />
          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/guide-cloud-vms-for-security-agencies.webp" alt="Illustration for this guide: the Camzify console and the cameras it runs on" priority />
          </div>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">A <Link href="/platform" className="text-primary hover:underline">cloud VMS</Link> lets a guarding company, a monitoring center or a CCTV installer sell a monitored video service on cameras the client already has, from one account, with a login per client. The cameras stream to the cloud instead of to a recorder on site, and the rounds, alerts, recordings and reports for every client are run from one console. This guide answers the questions an owner asks before putting that service on a proposal: how the accounts separate, how per-camera billing maps to a monthly price, what the client sees, what you need on your side, and how to start with one client.</p>

          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Can a cloud VMS turn my clients&apos; existing cameras into a monitored service?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>Yes, provided the cameras produce a stream the service can read, which most IP cameras from the last decade do. <Link href="/cloud-video-surveillance" className="text-primary hover:underline">Cloud video surveillance</Link> takes an RTSP, RTMP or HTTPS stream from each camera and records, watches and reports on it in the cloud, so the client&apos;s recorder can stay exactly where it is.</p>
                <p>Camzify is software only. There is no hardware to stock, ship or support, and no preference for any camera manufacturer. A camera reachable from the internet is added by its stream address. A camera on the client&apos;s private network is relayed by the Camzify Connector, a small application on a Windows, macOS or Linux machine inside that network, so there is no port forwarding to negotiate with the client&apos;s IT.</p>
                <p>What you are selling on top of that stream is the part a recorder cannot do: scheduled patrol rounds with a checklist at each camera, AI detections between rounds, a guard notified when something fails, and a report per round the client can hold. The <Link href="/virtual-guard" className="text-primary hover:underline">virtual guard</Link> page describes that service in the market&apos;s own words. Camzify is the software; your company is the guard the client contracts with.</p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do accounts and permissions work when I have many clients?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>Your company holds one account, and each client is a sub-user scoped to their own sites and cameras. Sites are the unit everything is organized around, so access, reporting and alert filtering follow the site, and a client logging in reaches nothing that belongs to another client of yours.</p>
                <p>A permission group decides what each login can open and change. It combines page-level access with create, read, update and delete rights per resource, and one group is assigned per user. The ready-made Auditor group sees everything and changes nothing, which suits a client checking on the service they pay for. <Link href="/platform/user-management" className="text-primary hover:underline">User management</Link> covers both halves in detail.</p>
                <PointList items={[
                  'License quota is allocated to each client from your own: AI feature instances, patrolling instances and backup storage, never more than you hold.',
                  'When a client reaches a limit, their request comes back to you to approve or decline rather than being granted automatically.',
                  'Sub-users can create their own sub-users, so a client can give its own staff a login without involving you.',
                  'A sub-user can be deactivated without being deleted, keeps its sites, recordings and reports, and can be reinstated.',
                ]} />
                <p>The same model works when the parties are stacked differently. A monitoring company running rounds for several agencies holds the account and gives each agency a scoped login; the <Link href="/partners/for-monitoring-centers" className="text-primary hover:underline">monitoring companies</Link> page covers that three-party arrangement, including who receives the guard message.</p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does per-camera billing map to what I charge?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>Camzify is priced per instance per month and quoted for the portfolio you would cover; you then set your own price per client site per month against that quote. The two numbers are yours to keep apart, and your proposal should not repeat ours.</p>
                <p>The quote is built from what is switched on where. The platform modules come with the account. Every connected camera takes a stream instance, and each AI detection feature has a pool of instances, activating it on a camera consumes one, and patrolling instances are counted per camera per sequence. A corridor camera can record and nothing more while the gate camera records, detects and is a stop on the round, so a client site does not have to carry every feature on every camera.</p>
                <p>Camzify starts from $5 per camera per month and a partner portfolio is quoted as a whole; there is no published partner margin, tier or portal. Terms are agreed in conversation, and the <Link href="/partners/become-a-reseller" className="text-primary hover:underline">reseller page</Link> says so rather than inventing a program. The <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link> has an agency mode that takes your client sites, the price you would charge and the hours you cannot staff, and shows the recurring revenue; the margin is the difference between that and your quote.</p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does the client see, and what do I see?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>The client sees their own sites through their own login: their live cameras, their alerts and their patrol reports, filtered by the permission group you gave them. You see every client on the parent account, on one live wall grouped by site with a per-site online count, with every alert in one queue and every report under the site it belongs to.</p>
                <p>Whether a client gets live view or the report only is a commercial choice, and both are supported. Some agencies give the client the Auditor view so they can read reports and watch cameras without changing anything. Others hand over reports and keep the console to themselves. The client&apos;s login works in the browser on a phone as well as a desktop, with nothing to install.</p>
                <p>Alerts are delivered by email, SMS, WhatsApp and push, with channels configured per alert category and severity set per camera for each detection. Each detection has a notification window per camera, so a person in a loading bay notifies at 02:00 and stays quiet at 14:00 while the detection itself runs all day.</p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do patrol rounds and reports become a deliverable?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>A patrol round is an ordered list of camera stops with a checklist at each, run on a schedule, with a <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> filed at the end. The report is the deliverable: it is what the client receives after every round, and it is the part they cannot get from anyone who does not run rounds.</p>
                <p>Automated rounds run on a schedule set by frequency, active hours and active days in the site&apos;s own timezone, and each client site can have its own sequence and schedule. At each stop the round marks every checklist item from the frame. An item found Not Compliant captures a snapshot and messages the guard assigned to that camera, with no operator approving the message. A manual round offers the message to the operator instead.</p>
                <PointList items={[
                  'The report names the site and lists the camera stops in order.',
                  'It records every checklist result and the snapshot each result was judged against.',
                  'It carries the before-and-after pair for anything that failed and was fixed during the round.',
                  'It carries timestamps, the guard notified on any failure and an overall compliance percentage.',
                ]} />
                <p>A round cannot be closed with an item still Not Compliant, and a Pending item counts against the percentage, so the number means what it says. The report opens as a web report or a PDF, and the client reads it through their own login or you send it. Nothing in it is typed in after the fact.</p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does my agency need on its side?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>Three things: a person who owns the console, a written workflow for what happens when a check fails, and enough upstream bandwidth at each client site to carry the cameras you stream. None of them is hardware, and none of them is a control room if you do not already run one.</p>
                <p>The console owner sets up sites, builds the sequences and checklists, assigns the guard to notify per camera and creates the client logins. Automated rounds then run with nobody in the loop, so the day-to-day load is the notifications, not the rounds. For an agency that sells mobile patrols today, that is usually the dispatcher or the operations manager.</p>
                <p>The workflow is the part most owners skip. Decide before the first round who receives the guard message for each client site, what they do with it, and who closes the item as Fixed so the report carries the second snapshot. A staffed monitoring center adds manual rounds for the checks it wants a person to make and takes the critical notifications the automated round raises.</p>
                <p>Bandwidth is the honest constraint. Cloud video surveillance needs upstream bandwidth for every camera streamed, and a site that cannot carry its cameras, or whose policy says footage never leaves the building, should keep its recorder. Check the uplink before you promise the service, and stream the cameras that are stops on the round rather than every camera on the site. A <Link href="/partners/for-security-integrators" className="text-primary hover:underline">CCTV installer</Link> you already work with can answer that question in a visit.</p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do I start with one client?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>Pick the client whose cameras you can reach and whose overnight gap you already know about, and run one round on their cameras before you write a proposal. A report with the client&apos;s own dock door in it settles the question of whether the service is real, and it gives you the sample to price against.</p>
                <PointList items={[
                  'Book a demo and we will run a live round on cameras you can reach, with you and again with the client if that helps.',
                  'Create the client as a sub-user scoped to their site, choose a permission group, and allocate the instances the round needs from your license.',
                  'Build one sequence with a checklist per camera stop, assign the guard to notify, and set the schedule for the hours you cannot staff.',
                  'Price it per site per month at your rate, beside the sample report and the schedule, and keep the guard hours in the contract as response.',
                ]} />
                <p>The <Link href="/partners/for-security-agencies" className="text-primary hover:underline">security agencies</Link> page covers the commercial argument and the account model in full, and the selling guide below covers the client conversation. What we will not tell you is that this replaces your guards, or what your response time or detection rate will be; the trust page lists what we do not claim, and a proposal that stays inside those lines is one the client will not catch out later.</p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/how-to-sell-virtual-patrolling-to-clients" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground">How to sell virtual patrolling to your clients</Link>
              <Link href="/guides/what-goes-in-a-remote-patrol-proposal" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground">What goes in a remote patrol proposal</Link>
              <Link href="/guides/cloud-vms-cost" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground">Cloud VMS cost</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/roi-calculator#agency" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90">Run your numbers</Link>
              <Link href="/contact" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">Ask for a partner quote</Link>
            </div>
          </section>
        </div>
      </article>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
