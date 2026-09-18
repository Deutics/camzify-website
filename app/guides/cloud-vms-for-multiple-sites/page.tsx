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
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * The guide for "cloud VMS for multiple sites", "multi-site video management" and
 * "manage security cameras across locations". The reader has a recorder and a login
 * per site today and wants to know what one console actually changes: access, the
 * live wall, retention, rounds, outages and the order to roll it out in.
 */
const pageMeta = {
  title: "Cloud VMS for Multiple Sites | One Console",
  description: "How a cloud VMS puts several sites on one console: one login, permissions per site, retention and recording per site, patrol rounds and rollout.",
  path: "/guides/cloud-vms-for-multiple-sites",
};

const publishedTime = '2026-09-16';
const modifiedTime = '2026-09-16';

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime, modifiedTime });

const faqs = [
  { question: 'Do we need to replace the recorders at each site?', answer: 'No. A camera reachable on the network connects to Camzify directly by ONVIF or RTSP, and a recorder that publishes its cameras as RTSP streams can be the source instead. The recorder keeps recording locally as before. What changes is that the operator opens one console rather than one app per site.' },
  { question: 'Can a site manager see only their own site?', answer: 'Yes. A sub-user is scoped to specific sites through a permission group, and the live wall, recordings, alerts and reports all respect the same boundary. A manager assigned to one store does not see the warehouse, and a regional manager scoped to several sites sees those and nothing else.' },
  { question: 'Does every site have to run the same patrol round?', answer: 'No. A patrol sequence belongs to a site, with its own camera stops, checklist and schedule set in that site\'s own timezone. Comparable sites can be given the same sequence and schedule so their compliance figures compare directly, but a warehouse and a store do not have to look alike.' },
  { question: 'What happens when one site\'s internet connection drops?', answer: 'That site\'s cameras show as offline, the site is flagged in the site list and on the live wall, and recording and rounds at every other site continue. Nothing at the other sites depends on the site that dropped. Footage is recorded in the cloud, so a camera that is not streaming is not being recorded until the link returns.' },
  { question: 'Does adding a site change the license?', answer: 'Adding a site by itself consumes nothing. The license is a pool of camera stream instances, AI feature instances and backup storage held by the account, and cameras and features at the new site draw from that same pool. What a new site needs is enough available instances, not a separate plan. Camzify starts from $5 per camera per month, and a quote for the whole estate comes in lower for an annual term.' },
  { question: 'Is there a limit on the number of sites?', answer: 'There is no practical limit built into the product. Each site is its own record with its own cameras, sequences, operators and event history, and the dashboard and reporting roll every site into one account-wide view or show one site on its own. What scales is the operator\'s attention, which is why the live wall paginates and rounds file a report per site.' },
];

export default function CloudVmsForMultipleSitesPage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[
        articleSchema({ headline: 'Cloud VMS for Multiple Sites', description: pageMeta.description, path: pageMeta.path, datePublished: publishedTime, dateModified: modifiedTime }),
        personSchema(),
      ]}
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Cloud VMS for Multiple Sites' },
      ]}
    >
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Cloud VMS for multiple sites: every location on one console</h1>
          <AuthorByline className="mt-6" />
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            A <Link href="/platform" className="text-primary hover:underline">cloud VMS</Link> for multiple sites puts every location&apos;s cameras under one account, on one login, with each site kept as its own record. Recording, live view, permissions, alerts and patrol rounds are set per site and read from one console, folded together or held separate. This guide is for whoever runs security or operations across several locations and today carries a recorder login for each.
          </p>
          <p className="mt-4 max-w-prose text-body text-muted-foreground">
            The model underneath is <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud video surveillance</Link>: the cameras stream to a service in the cloud instead of to a box on site. What follows is what that changes when there are five sites rather than one, and what to ask before committing to it.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/guide-cloud-vms-for-multiple-sites.webp" alt="Illustration for this guide: the Camzify console and the cameras it runs on" priority />
          </div>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What changes when several sites move to a cloud VMS?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  The recorder at each site stops being the thing you log in to, and the site becomes a record inside one account instead. Each site keeps its own cameras, patrol sequences, operators and event history, and the dashboard reads all of them together or one at a time.
                </p>
                <p>
                  With a recorder per site, every question about the estate is answered site by site, and the sites slowest to open are the ones checked least. A cloud VMS answers the estate-wide questions once, from one screen.
                </p>
                <PointList items={[
                  'Every site is set up independently and read from one console, folded together or held separate.',
                  'The dashboard, live wall, notification feed and reports can all be filtered by site.',
                  'Cameras and AI feature instances at every site draw from the same account-wide license pool.',
                ]} />
                <p>
                  <Link href="/platform/multi-site-management" className="text-primary hover:underline">Multi-site management</Link> is where this lives in the product, and the <Link href="/industries/multiple-sites" className="text-primary hover:underline">multiple sites</Link> page covers the operational gaps it is meant to close.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does one login replace a login per recorder?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  The account holds every site, and each person is given a user on that account rather than a password on each recorder. What a user can see and change is decided by their permission group and the sites they are assigned to, so one login can open the whole estate or exactly one store.
                </p>
                <p>
                  The cameras do not need to change. Any camera or recorder that speaks ONVIF or RTSP connects, and a recorder that publishes its cameras as RTSP streams can stay as the source while it keeps its local copy. Cameras behind a router with no public address are reached through the <Link href="/camzify-connector" className="text-primary hover:underline">Camzify Connector</Link>, a small application on a Windows, macOS or Linux machine inside that site&apos;s network, one per site, which makes an outbound connection so nothing is forwarded on the router and no camera is exposed to the internet.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Can a site manager see only their own site?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Yes. A sub-user is scoped to one site, several or all of them, and a permission group decides what they can open and change within that scope. A store manager scoped to their store sees that store&apos;s cameras, recordings, alerts and reports and nothing else.
                </p>
                <p>
                  A permission group combines page-level access with create, read, update and delete rights per resource, and every user carries exactly one group. Four groups are built in: Site Admin, Guard, Auditor and Surveillance Manager, and custom groups cover anything those do not.
                </p>
                <p>
                  Sub-users can create their own sub-users, allocating sites, cameras, feature instances and backup storage only from quota they already hold. That lets a regional office manage its own sites without touching the account&apos;s commercial terms, and it is how a security agency gives each client a scoped view of that client&apos;s cameras. The <Link href="/platform/user-management" className="text-primary hover:underline">user management</Link> page covers the full lifecycle, including quota requests.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What does the live wall look like across sites?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  One grid, grouped by site, with a site strip along the top that shows each site&apos;s online count. The grid paginates rather than shrinking every camera onto one screen, so each stream stays legible, and a slideshow mode cycles through the pages on its own.
                </p>
                <PointList items={[
                  'Saved camera sets hold the cameras that are watched together, and one set can be the default view.',
                  'The grid filters by site, by AI feature or by what a given sub-user is allowed to see.',
                  'A dropped camera shows as no signal at once, never a frozen last frame.',
                ]} />
                <p>
                  Cameras bought at different times from different installers go on the same wall, because ONVIF and RTSP are on effectively every IP camera sold in the last decade. The use case <Link href="/use-cases/one-live-wall-for-every-brand-and-location" className="text-primary hover:underline">one live wall for every brand and location</Link> walks through that setting.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How are retention and recording set across sites?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Retention is set per camera, by a number of days or by a storage cap, and a recording schedule can be applied to a whole site or to every camera at once. The policy is enforced in the same place the footage lives, so the retention on paper and the retention in the system cannot drift apart between sites.
                </p>
                <p>
                  Per-camera retention is what lets one policy cover an uneven estate. A cash office at one site can keep footage longer than a corridor at another, and a site under a specific licensing condition can hold its footage longer than the rest without a separate system.
                </p>
                <p>
                  Footage is encrypted in transit and at rest and is reached through the same permission groups as live view, so a user who cannot open a camera cannot open its recordings either.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How do patrol rounds run across sites?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  A patrol sequence belongs to a site: an ordered list of that site&apos;s camera stops, each with its own checklist, on a schedule set by frequency, active hours and active days in the site&apos;s own timezone. One operator sees every site&apos;s rounds, compliance scores and patrol status from the same console, and each round files its report per site.
                </p>
                <p>
                  Comparable sites can be given the same sequence and schedule, which makes their compliance percentages directly comparable and surfaces the underperforming location. A failed item captures the frame and messages the guard assigned to that camera at that site, so the area manager for one store hears about that store&apos;s gate and nothing else. A round does not run across every site at once; each site runs its own, and the console is where they meet.
                </p>
                <p>
                  The <Link href="/virtual-patrolling/for-multi-site-operations" className="text-primary hover:underline">multi-site virtual patrolling</Link> page covers per-site sequences, assigned guards and how compliance rolls up into one aggregate figure.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What happens when one site&apos;s internet drops?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  That site&apos;s cameras show as offline, the site is flagged in the site list and on the live wall, and the other sites continue as before. Nothing at the other sites depends on the one that dropped, because each site connects to the cloud on its own link.
                </p>
                <p>
                  The site that dropped is shown as a site that is offline rather than blended into the account-wide numbers. Recording happens in the cloud, so a camera that is not streaming is not being recorded until the link returns. A camera that goes dark for another reason is a different case: camera tampering detection raises a covered, turned, defocused or frozen camera to a person with the frame.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How should a multi-site rollout be ordered?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Site by site, with one site finished and approved before the second is started. The first site becomes the template: camera order, checklist wording, retention, recording schedule and escalation contacts, tuned until the people responsible for it agree.
                </p>
                <PointList items={[
                  'Run the first site long enough to tune zones, thresholds and the checklist against real footage.',
                  'Apply the template to the next comparable site, and give each local contact a user scoped to their own site.',
                  'Add sites one at a time; a new site rolls into the existing dashboard without disturbing rounds already running elsewhere.',
                  'Compare compliance across the sites that share a sequence, and revise the template rather than each site separately.',
                ]} />
                <p>
                  Adding a site consumes nothing from the plan by itself; cameras and AI features at the new site draw from the same account-wide pool of instances. The step-by-step is in <Link href="/guides/how-to-set-up-sites-and-cameras" className="text-primary hover:underline">how to set up sites and cameras</Link>.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What should you ask before committing?</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Three things, all about your sites rather than the software. A cloud VMS needs upstream bandwidth for every camera streamed, a clear answer to who owns and reaches each camera, and a list of who needs to see what.
                </p>
                <PointList items={[
                  'Bandwidth per site: whether each site\'s upstream capacity can carry every camera you intend to stream. A site with too little, or a policy that footage must never leave the building, should keep its recorder. We do not publish a bandwidth figure per camera.',
                  'Who owns which cameras: whether each camera connects directly, through a recorder that publishes RTSP, or through a Connector on a machine at that site, and who there can keep that machine running.',
                  'How many users, and what each needs: site managers, regional managers, guards and auditors, and which built-in permission group fits each before you define a custom one.',
                ]} />
                <p>
                  Pricing is per instance per month, quoted for the estate; the <Link href="/pricing" className="text-primary hover:underline">pricing page</Link> turns your camera and feature counts into a quote request, and Camzify starts from $5 per camera per month.
                </p>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-20 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related guides</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/guides/what-is-a-cloud-vms" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">What is a cloud VMS</Link>
              <Link href="/guides/cloud-vms-bandwidth-requirements" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">Cloud VMS bandwidth requirements</Link>
              <Link href="/guides/how-to-set-up-sites-and-cameras" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white">How to set up sites and cameras</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/book-a-demo" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-primary/90">Book a demo</Link>
              <Link href="/roi-calculator" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">Calculate ROI</Link>
            </div>
          </section>
        </div>
      </article>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
