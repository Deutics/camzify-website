import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FAQAccordion } from '@/components/content/faq-accordion';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import { SectionVisual } from '@/components/content/section-visual';
import Link from 'next/link';
import { Eye, Radio, ShieldAlert, FileCheck2, Users, KeyRound, Layers } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * Who this page is for, stated by the business 2026-09-03: monitoring companies that
 * work behind security agencies — they run the monitoring on the agency's behalf and
 * notify the agency's guards when something needs a person. Central monitoring
 * stations, alarm receiving centers and GSOCs are the same shape of operation, so the
 * page addresses all of them, but the three-party relationship is the frame.
 */
const pageMeta = {
  title: "Camzify for Monitoring Companies | CMS, ARC and GSOC",
  description: "Run scheduled patrol rounds for every agency you monitor for, notify their guards from the round itself, and hand each agency a compliance report per round. One account, a scoped login per agency.",
  path: "/partners/for-monitoring-centers",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  {
    question: 'Who holds the Camzify account, the monitoring company or the agency?',
    answer: 'Whoever operates the console. For a monitoring company that runs rounds on behalf of several agencies, the monitoring company holds the account and each agency is a sub-user scoped to its own sites and cameras. Sub-users can create their own sub-users, so an agency can give its end clients a login without involving you. If an agency runs its own monitoring and only contracts you for overflow, the arrangement can be reversed: the agency holds the account and you are a sub-user with a permission group that fits the work.',
  },
  {
    question: 'Can one agency see another agency\'s sites?',
    answer: 'No. A sub-user reaches only the sites assigned to it. An agency logging in sees its own cameras, its own patrol reports and its own alerts, and nothing that belongs to another client of yours. Your operators, on the parent account, see all of them.',
  },
  {
    question: 'Who receives the guard message when a check fails?',
    answer: 'The guard designated for that site or camera, through the channels configured for that alert category: email, SMS, WhatsApp or push. The message carries the snapshot the check was judged against. In a manual round the operator decides whether to send it; in an automated round the platform sends it on its own when a checklist item is found Not Compliant.',
  },
  {
    question: 'Does the AI act without an operator?',
    answer: 'In an automated round, yes, within what the round is configured to do: it checks each item on the list, can watch a scene for a set period before deciding rather than judging one frame, messages the designated guard for items found Not Compliant, and raises a critical notification if it identifies a safety or security risk. It does not decide what to do about the risk. That is the operator\'s call, or the guard\'s.',
  },
  {
    question: 'How does a failed check get closed?',
    answer: 'A checklist item marked Not Compliant captures a snapshot and either stays Pending or is marked Fixed once the guard has attended, which captures a second snapshot. A round cannot be completed with an item left Not Compliant, and a Pending item counts against the compliance percentage. The report shows the before and after frames side by side.',
  },
  {
    question: 'What does the agency get as evidence of the service?',
    answer: 'A report per round: the site, the camera stops, every checklist result, the snapshot each result was judged against, the before-and-after pair for anything that failed and was fixed, timestamps, and a compliance percentage. The agency can read its own reports through its scoped login, or you can send them. Nothing in the report is typed in after the fact.',
  },
  {
    question: 'Can our operators run rounds for many agencies on one screen?',
    answer: 'Yes. Sites from every agency you monitor for sit under your account, and the live wall groups cameras by site with a per-site online count. Automated rounds run on their schedules across all of them; manual rounds are opened per patrol sequence. Which operator can open which sites is controlled by permission groups.',
  },
];

const FRAMES = [
  { src: '/cam-06.jpg', id: 'AGENCY A · CAM 01', loc: 'CLIENT SITE · MAIN GATE' },
  { src: '/cam-02.jpg', id: 'AGENCY A · CAM 04', loc: 'CLIENT SITE · LOADING DOCK' },
  { src: '/cam-03.jpg', id: 'AGENCY B · CAM 02', loc: 'CLIENT SITE · SERVER CORRIDOR' },
  { src: '/cam-04.jpg', id: 'AGENCY C · CAM 07', loc: 'CLIENT SITE · PARKING LOT' },
];

export default function ForMonitoringCentresPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Partners', href: '/partners' },
      { label: 'For Monitoring Companies' },
    ]}>
      <FeatureHero
        eyebrow="Monitoring companies · CMS · ARC · GSOC"
        title="Camzify for monitoring companies"
        lede={<>
          <strong className="font-semibold text-foreground">
            A monitoring company watches on the agency&apos;s behalf and sends the guard when
            something is wrong.
          </strong>{' '}
          Camzify is built for exactly that shape of operation: one account for the company
          that runs the console, a scoped login for every agency it monitors for, guards
          notified from the round itself, and a compliance report per round that the agency
          can hand to its own client.
        </>}
        facts={['One account, a login per agency', 'Guards notified from the round', 'A report per round, per client']}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/partners/for-security-agencies', label: 'For security agencies' }}
        visual={
          <HeroPlaceholder
            label="Operator console · Rounds across three agencies"
            alt="A monitoring operator's camera wall showing sites from three different security agencies, each tile labelled with the agency and client site"
            frames={FRAMES}
            active={2}
          />
        }
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">The relationship</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Where a monitoring company sits</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The end client owns the site. The security agency holds the contract and
                supplies the guards. The monitoring company sits behind the agency: it watches
                the cameras, runs the rounds, and tells the guard on site when a person is
                needed. Three parties, and the one operating the console is neither the one
                that owns the cameras nor the one that employs the guard.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Most video software assumes the operator and the owner are the same company.
                Camzify does not. The account model is multi-tenant by design, the guard
                notification is part of the patrol round rather than a separate tool, and the
                report is written for the party that was not in the room.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionVisual
                variant="flow"
                steps={['End client site', 'Security agency', 'Monitoring company', 'Guard dispatched']}
                caption="The chain a failed check travels. The monitoring company runs the round and notifies the agency's guard directly."
                alt="Four-step flow from the end client's site, to the security agency, to the monitoring company running the round, to the guard being dispatched"
              />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">On the operator floor</span>
            <h2 className="mt-2 font-display text-2xl font-bold">What changes for a staffed monitoring operation</h2>
            <p className="mt-4 max-w-prose text-muted-foreground">
              The constraint in a monitoring center is operator attention, not camera count.
              The routine round is what eats it: the same doors, the same yards, the same
              checks, every two hours, across every client. That is the part the platform
              takes.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Eye,
                  title: 'Scheduled rounds run themselves',
                  desc: 'An automated round works through each camera stop and its checklist on schedule. Where a single frame is not enough, it watches the scene for a set period before deciding.',
                  href: '/virtual-patrolling/automated-patrol-scheduling',
                },
                {
                  icon: Radio,
                  title: 'Guards messaged from the round',
                  desc: 'A check found Not Compliant captures a snapshot and messages the designated guard. In a manual round the operator chooses to send it; in an automated round it goes on its own.',
                  href: '/virtual-patrolling/guard-notifications',
                },
                {
                  icon: ShieldAlert,
                  title: 'Risks raised as critical',
                  desc: 'During an automated round the AI also looks for safety and security risks that are not on the checklist and raises a critical notification, so an operator sees it first.',
                  href: '/virtual-patrolling/risk-detection',
                },
                {
                  icon: FileCheck2,
                  title: 'Operators take what needs a person',
                  desc: 'Manual rounds stay for the checks you want a human to make. Either way, every result, snapshot and message lands in the same report.',
                  href: '/virtual-patrolling/how-it-works',
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
                >
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
                caption="One account for the monitoring company. Each agency is a sub-user scoped to its own sites; an agency can create logins for its own clients from there."
                alt="Account tree: the monitoring company's account at the top, agencies as sub-users beneath it, each with its own sites"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <span className="font-mono text-mono-sm uppercase text-primary">Account structure</span>
              <h2 className="mt-2 font-display text-2xl font-bold">One account, a scoped login per agency</h2>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                {[
                  {
                    icon: Layers,
                    text: <>The monitoring company holds the account. Sites from every agency it monitors for sit under it, and its operators see all of them on one <Link href="/platform/live-streaming" className="text-primary hover:underline">live wall</Link>, grouped by site.</>,
                  },
                  {
                    icon: Users,
                    text: <>Each agency is a <Link href="/platform/user-management" className="text-primary hover:underline">sub-user</Link> scoped to its own sites and cameras, with license quota allocated from yours. Sub-users can create their own, so an agency can hand its end client a login without involving you.</>,
                  },
                  {
                    icon: KeyRound,
                    text: <>A <Link href="/platform/permission-groups" className="text-primary hover:underline">permission group</Link> decides what each login can open and change. The ready-made Auditor group sees everything and changes nothing, which is usually the right shape for an agency checking on the service it is paying for.</>,
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <item.icon className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">The deliverable</span>
              <h2 className="mt-2 font-display text-2xl font-bold">What the agency receives after every round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                A <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report per round</Link>:
                the site, the camera stops in order, every checklist result, the snapshot each
                result was judged against, the before-and-after pair for anything that failed and
                was fixed, timestamps, and a compliance percentage. A Pending item counts against
                that percentage, and a round cannot be closed with an item still Not Compliant, so
                the number means what it says.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The agency reads its own reports through its scoped login and can pass them on
                to its client under its own name. The monitoring company&apos;s service becomes
                something the agency can show, not just something it pays for.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionVisual
                variant="report"
                caption="A round report with the before and after frames for a failed check. The agency sees this for its own sites only."
                alt="Patrol report excerpt showing a checklist item, its before and after snapshots and a compliance percentage"
              />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What we will not tell you</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                That this replaces your operators. It does not. Somebody still decides what a
                critical notification means and whether the guard goes now or at the end of the
                round. What changes is that the routine verification, the part that is expensive
                to staff and impossible to prove afterwards, stops depending on somebody watching
                a wall of screens, and your operators&apos; attention goes to the events that
                need it.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                We also do not publish response times, operator-to-camera ratios or event
                volumes, because we cannot substantiate them for your operation. Our position on
                claims is on the{' '}
                <Link href="/trust" className="text-primary hover:underline">trust page</Link>, and
                it applies to partner conversations as much as to marketing. If you run guarding
                rather than monitoring, the{' '}
                <Link href="/partners/for-security-agencies" className="text-primary hover:underline">security agencies</Link>{' '}
                page is written for you.
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
