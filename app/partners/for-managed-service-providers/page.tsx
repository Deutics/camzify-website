import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import { SectionVisual } from '@/components/content/section-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { Layers, Users, KeyRound, Bell, HardDrive, FileCheck2, ShieldCheck } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * For the MSP that holds the account on behalf of many customers. The account model
 * described here (sub-users, quota allocation and requests, permission groups, storage
 * broken out by child account, suspend without delete) is what the product ships.
 */
const pageMeta = {
  title: "For Managed Service Providers | Multi-Tenant VMS",
  description: "Run video surveillance and virtual patrolling as a managed service. One account, a scoped login per customer, quota you allocate and reclaim, alerts and reports per client.",
  path: "/partners/for-managed-service-providers",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  {
    question: 'How does one MSP account serve many customers?',
    answer: 'Each customer is a sub-user scoped to its own sites and cameras. A customer logging in sees only what is theirs: their live wall, their alerts, their patrol reports. Your operators, on the parent account, see every customer. Sub-users can create their own sub-users, so a customer with several departments can delegate further without involving you.',
  },
  {
    question: 'How is license quota shared out?',
    answer: 'From what you hold. Sites, cameras, AI feature instances and backup storage are allocated to each sub-user out of your own quota, and a customer that reaches its allocation sees it as at capacity and can request more. You approve the request, or not. Storage is broken out as provisioned, used, assigned to child accounts and remaining, so what you have given away is never blended into one number.',
  },
  {
    question: 'Can we stop a customer\'s access without deleting their data?',
    answer: 'Yes. A sub-user can be suspended, which blocks login and leaves the sites, cameras, recordings and reports in place. Reinstating them restores access to exactly what was there. Deleting is a separate, deliberate action.',
  },
  {
    question: 'Who gets the alerts, us or the customer?',
    answer: 'Whoever you configure. Notification channels are set per alert category, and severity can be set per camera for each AI feature, so a critical event at one customer can reach your desk while routine events go to the customer\'s own contact. Patrol failures message the guard designated for that camera.',
  },
  {
    question: 'How do customers on a LAN get connected?',
    answer: 'With the Camzify Connector, a small application on a Windows, macOS or Linux machine inside the customer\'s network. It relays local RTSP cameras to Camzify with no port forwarding, which matters when you do not control the customer\'s firewall. Cameras reachable from the internet connect directly, and encoders push RTMP.',
  },
  {
    question: 'What can we show a customer as proof of service?',
    answer: 'A report per patrol round with every checklist result, the snapshot it was judged against, before-and-after frames for anything fixed, timestamps and a compliance percentage. Every action on the account is also written to an audit trail. The customer can read their own reports through their login, or you can send them.',
  },
];

const FRAMES = [
  { src: '/cam-06.jpg', id: 'CLIENT A · CAM 01', loc: 'WAREHOUSE · MAIN GATE' },
  { src: '/cam-03.jpg', id: 'CLIENT B · CAM 02', loc: 'OFFICE · SERVER CORRIDOR' },
  { src: '/cam-02.jpg', id: 'CLIENT C · CAM 04', loc: 'DEPOT · LOADING DOCK' },
  { src: '/cam-04.jpg', id: 'CLIENT D · CAM 07', loc: 'RETAIL · PARKING LOT' },
];

export default function ForManagedServiceProvidersPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Partners', href: '/partners' },
      { label: 'For Managed Service Providers' },
    ]}>
      <FeatureHero
        eyebrow="Managed service providers"
        title="Camzify for managed service providers"
        lede={<>
          <strong className="font-semibold text-foreground">
            An MSP already carries the operational relationship, the network and often the site
            access, which is most of what a video surveillance rollout needs.
          </strong>{' '}
          Camzify adds a security service line on top of that footprint with no hardware to
          procure: one account you hold, a scoped login per customer, license quota you allocate
          and reclaim, and a report per patrol round to show each of them.
        </>}
        facts={['One account, a login per customer', 'Quota allocated and reclaimed by you', 'Alerts and reports per client']}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/guides/how-to-manage-sub-users-and-quotas', label: 'How sub-users and quotas work' }}
        visual={
          <HeroPlaceholder
            label="MSP console · Four customers, one login"
            alt="An MSP operator's camera wall showing sites from four different customers, each tile labelled with the customer and site"
            frames={FRAMES}
            active={1}
          />
        }
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[2fr_3fr]">
            <ScrollReveal>
              <SectionVisual
                variant="sites"
                caption="Your account at the top. Each customer is a sub-user with its own sites, allocated from the quota you hold."
                alt="Account tree: the MSP's account at the top, customers as sub-users beneath it, each with its own sites"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <span className="font-mono text-mono-sm uppercase text-primary">Account structure</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Built for the party that is not the site owner</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Most video software assumes the operator and the owner are the same company.
                Camzify assumes they may not be. You hold the account; every customer is a{' '}
                <Link href="/platform/user-management" className="text-primary hover:underline">sub-user</Link>{' '}
                scoped to its own sites and cameras, carrying a{' '}
                <Link href="/platform/permission-groups" className="text-primary hover:underline">permission group</Link>{' '}
                that decides which pages it can open and what it can change. A customer never
                sees another customer.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Quota flows the same way. Sites, cameras, AI feature instances and backup storage
                are handed to each customer out of what you hold, and a customer that reaches its
                allocation requests more rather than taking it. The{' '}
                <Link href="/platform/license-and-instance-management" className="text-primary hover:underline">plan page</Link>{' '}
                breaks storage out as provisioned, used, assigned to child accounts and remaining.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <span className="font-mono text-mono-sm uppercase text-primary">The service</span>
            <h2 className="mt-2 font-display text-2xl font-bold">What you run for each customer</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Layers, title: 'Live wall across customers', desc: 'Every customer\'s cameras on one screen, grouped by site with a per-site online count. Filter to one customer or one AI feature.', href: '/platform/live-streaming' },
                { icon: HardDrive, title: 'Recording and retention', desc: 'Per camera, continuous or scheduled, kept by days or a storage cap. A copy in the cloud survives whatever happens to the customer\'s recorder.', href: '/platform/video-backup-and-retention' },
                { icon: Bell, title: 'Alerts routed per client', desc: 'Channels per alert category and severity per camera per feature, so the critical events reach you and the routine ones reach the customer.', href: '/platform/notifications-and-alerts' },
                { icon: FileCheck2, title: 'Rounds with a report each', desc: 'Scheduled patrol rounds on each customer\'s cameras, the guard messaged on a failed check, and a compliance report per round to hand over.', href: '/virtual-patrolling' },
              ].map((item) => (
                <Link key={item.title} href={item.href} className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-base font-bold group-hover:text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Operations</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Onboarding, change and offboarding</h2>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                {[
                  { icon: Users, text: <>Onboard a customer by creating the sub-user, allocating quota and adding their sites. Cameras on their LAN connect through the <Link href="/camzify-connector" className="text-primary hover:underline">Connector</Link> with no change to their firewall.</>},
                  { icon: KeyRound, text: <>Change what a customer can do by moving them to a different permission group. The change takes effect immediately, with nothing to propagate.</>},
                  { icon: ShieldCheck, text: <>Offboard by suspending the sub-user. Login stops, the data stays, and reinstating restores exactly what was there. Every step is in the audit trail.</>},
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <item.icon className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionVisual
                variant="report"
                caption="The per-round report is what a customer sees for its own sites. Nothing in it is typed in after the fact."
                alt="Patrol report excerpt with a checklist item, its before and after snapshots and a compliance percentage"
              />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What we will not tell you</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                That there is a published partner margin, a white-label option or an SLA figure.
                Pricing is quote-based and partner terms are agreed in conversation. The console
                carries the Camzify name. We also do not publish uptime, response-time or event
                figures, because we cannot substantiate them for your customers; the{' '}
                <Link href="/trust" className="text-primary hover:underline">trust page</Link>{' '}
                sets out that policy. If your work is installing cameras rather than operating
                them, see{' '}
                <Link href="/partners/for-security-integrators" className="text-primary hover:underline">security integrators</Link>;
                if you run monitoring for security agencies, see{' '}
                <Link href="/partners/for-monitoring-centers" className="text-primary hover:underline">monitoring companies</Link>.
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
