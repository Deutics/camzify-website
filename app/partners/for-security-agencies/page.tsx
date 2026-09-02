import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';
import { Building2, Users, FileText, Clock, ShieldAlert, Layers } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Camzify for Security Agencies | Remote Guarding Software",
  description: "Add virtual patrolling to a manned guarding offer. Cover every client site on schedule overnight, give each client its own scoped login and reports, and dispatch guards to verified events.",
  path: "/partners/for-security-agencies",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  {
    question: 'Will virtual patrolling replace the guards my agency sells?',
    answer: 'No, and an agency should be sceptical of anyone claiming it will. What it changes is what a guard is dispatched to. A scheduled round covers the sites and hours you cannot staff, verifies specific conditions at each camera, and escalates to a guard when something needs a person. The guard hours you sell become response hours rather than walking hours — which is the part a client is least willing to cut, because it is the part that actually deals with the problem.',
  },
  {
    question: 'How does one account cover multiple client sites?',
    answer: 'Sites are the unit everything is organised around. Each client can be given a sub-user account scoped to their own sites and cameras and nothing else, with a permission group deciding which pages they can open and what they can change. You allocate AI feature instances, patrolling instances and backup storage to each from your own licence, and when a client reaches a limit their request comes to you to approve or decline rather than being granted automatically.',
  },
  {
    question: 'Can a client see their own reports without seeing other clients?',
    answer: 'Yes. A sub-user reaches only the sites assigned to them, so a client logging in sees their own cameras, their own patrol reports and their own alerts. Reports carry the site and camera names, the checklist results, the snapshots each result was judged against, and the compliance percentage for the round.',
  },
  {
    question: 'What can an agency sell overnight that it cannot staff?',
    answer: 'Scheduled rounds across every client site at whatever frequency is agreed — every two hours through the night is common — with a compliance report filed after each one. Staffing that as physical patrols across a portfolio of sites is usually impossible at any price a client will pay. The rounds happen whether or not anyone is on shift, and the report is what the client is really buying: evidence the site was checked.',
  },
  {
    question: 'Does this work for a central monitoring station or alarm receiving centre?',
    answer: 'Yes, and the argument is slightly different there. A CMS or ARC is already staffed and already watching; the problem is operator load and the ratio of real events to noise. Scheduled rounds handle the routine verification that would otherwise occupy an operator, and detections arrive with the snapshot and the surrounding video attached so an operator can judge quickly. See our monitoring centres page for that side of it.',
  },
  {
    question: 'How is this different from a guard tour system?',
    answer: 'A guard tour system proves a guard reached a checkpoint — an NFC tag or a QR code was scanned. It says nothing about what was there. A virtual round checks a defined condition at each camera and stores the frame it was judged against, so the record shows the gate was actually closed rather than that somebody stood next to it. For an agency defending a claim, that difference is the whole point.',
  },
];

export default function ForSecurityAgenciesPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Partners', href: '/partners' },
      { label: 'For Security Agencies' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Partner Programme</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Camzify for security agencies
          </h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">
              A guarding company can only sell as many hours as it can staff.
            </strong>{' '}
            Virtual patrolling is coverage that is not capped by headcount: scheduled rounds
            across every client site, through the hours nobody wants to work, with a report per
            client at the end of each one. Sold alongside guards, not instead of them.
          </p>

          <div className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The constraint every agency runs into</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
                <p>
                  Night coverage is the hardest to staff and the least profitable to sell. A client
                  with four sites wants all four checked overnight; the honest answer is usually a
                  patrol car doing a circuit, or one site covered properly and three not at all.
                </p>
                <p>
                  Meanwhile the client keeps asking for something the industry has never been good
                  at giving them: proof. Not that a guard was on site, but that the specific things
                  they care about were actually checked, on the nights they were supposed to be.
                </p>
                <p>
                  <strong className="font-semibold text-foreground">
                    Virtual patrolling answers both with the same product.
                  </strong>{' '}
                  Rounds run on the cameras a client already owns, on a schedule, across every site
                  at once &mdash; and each round files a{' '}
                  <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">compliance report</Link>{' '}
                  with the snapshot behind every check.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What it changes commercially</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: Clock,
                    title: 'Coverage you cannot staff',
                    desc: 'Rounds every two hours across a portfolio of sites, overnight, at a cost that does not scale with headcount. The line item did not exist before because nobody could deliver it.',
                  },
                  {
                    icon: FileText,
                    title: 'Evidence the client can hold',
                    desc: 'Each round produces a report naming every camera, every check, the result and the frame it was judged against — for the client, their insurer, or a dispute.',
                  },
                  {
                    icon: ShieldAlert,
                    title: 'Guards dispatched to verified events',
                    desc: 'A failed check or a flagged risk notifies the guard responsible for that camera. Guard hours become response hours, which is the part a client will not cut.',
                  },
                  {
                    icon: Layers,
                    title: 'One account, every client separated',
                    desc: 'Each client gets a login scoped to their own sites, with licence quota allocated from yours and requests for more coming back to you to approve.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-border bg-card p-6">
                    <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How a multi-client account is structured</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The account model was built for exactly this shape: an organisation holding licence
                capacity and handing portions of it to others, who may in turn do the same.
              </p>
              <ol className="mt-8 max-w-prose space-y-6">
                {[
                  ['Sites are the unit', 'Every camera belongs to a site, and access, reporting and alert filtering are all organised around it. One client, one or more sites.'],
                  ['Each client gets a scoped account', 'A sub-user reaches only the sites assigned to them. They see their own cameras, patrol reports and alerts, and nothing belonging to anyone else.'],
                  ['A permission group decides what they can do', 'Page-level access combined with create, read, update and delete rights per resource. A client who should look but not change gets exactly that.'],
                  ['You allocate licence quota', 'AI feature instances, patrolling instances and backup storage are granted from your own unused allocation — never more than you hold.'],
                  ['Requests come back to you', 'When a client reaches a limit they submit a quota request rather than hitting a dead end. You approve it if you have capacity, or decline it.'],
                ].map(([title, desc], i) => (
                  <li key={title} className="flex gap-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-8 max-w-prose text-muted-foreground">
                Detail on both halves:{' '}
                <Link href="/platform/user-management" className="text-primary hover:underline">user management</Link>{' '}
                and{' '}
                <Link href="/platform/permission-groups" className="text-primary hover:underline">permission groups</Link>,
                or the walkthrough at{' '}
                <Link href="/guides/how-to-manage-sub-users-and-quotas" className="text-primary hover:underline">managing sub-users and quotas</Link>.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where your agency sits</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Agencies come at this from different directions, and the argument changes slightly
                depending on which one you are.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: Users,
                    title: 'Manned guarding',
                    desc: 'You sell guard hours and want to sell coverage on top of them, particularly overnight and across sites you cannot reach.',
                  },
                  {
                    icon: Building2,
                    title: 'Remote guarding',
                    desc: 'You already sell monitoring as a service and want scheduled verification with an audit trail, not just event-driven alerts.',
                  },
                  {
                    icon: ShieldAlert,
                    title: 'Monitoring centre, CMS or ARC',
                    desc: 'You are staffed and watching, and the constraint is operator load and noise rather than coverage.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-border bg-card p-6">
                    <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 max-w-prose text-muted-foreground">
                If you run a staffed monitoring operation, the{' '}
                <Link href="/partners/for-monitoring-centres" className="text-primary hover:underline">monitoring centres</Link>{' '}
                page covers that angle. If you resell rather than operate, see{' '}
                <Link href="/partners/become-a-reseller" className="text-primary hover:underline">becoming a reseller</Link>.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What we will not tell you</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                That this replaces your guards. It does not, and an agency is the last audience that
                should be sold that story. Someone still has to attend, and no software decides
                what to do about a broken window at 2am. What changes is that the routine round
                &mdash; the part that is expensive to staff, easy to skip and impossible to prove
                &mdash; stops depending on somebody being awake, and your people are sent to the
                things that need people.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Everything on this page describes what the platform does today. Our position on
                claims we cannot substantiate is on the{' '}
                <Link href="/trust" className="text-primary hover:underline">trust page</Link>, and it
                applies to partner conversations as much as to marketing.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
