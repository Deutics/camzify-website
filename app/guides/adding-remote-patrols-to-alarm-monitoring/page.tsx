import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { articleSchema, personSchema } from '@/lib/seo';
import { AuthorByline } from '@/components/content/author-byline';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
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
  title: 'Adding Remote Patrols to Alarm Monitoring',
  description: "For monitoring companies and installers: how scheduled camera rounds sit beside the alarm panel, what changes on the desk, how accounts are split per client.",
  path: "/guides/adding-remote-patrols-to-alarm-monitoring",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article', publishedTime: '2026-09-07', modifiedTime: '2026-09-07' });

const faqs = [
  { question: 'Does Camzify integrate with our alarm receiving software?', answer: 'No. It is a video platform with its own alerts and notification channels. The alarm workflow does not change; the rounds and their reports arrive beside it.' },
  { question: 'Can one operator watch rounds for many clients?', answer: "Yes. Every client's sites sit under your account and the live wall groups cameras by site with a per-site online count. Automated rounds run on their schedules across all of them; the operator handles what fails." },
  { question: 'What happens to a round when a site goes offline?', answer: 'It is logged as a missed round rather than skipped silently, and the next scheduled round runs when the connection returns. Cloud recording of that camera pauses for the outage; camera-side recording continues.' },
  { question: 'Who gets the guard message?', answer: "The person designated for that camera, on the channels configured for that alert category: email, SMS, WhatsApp or push, with the snapshot. That can be your desk, the client's guard, or a mobile patrol driver." },
  { question: 'Can the client see the rounds live?', answer: 'Through a scoped login, yes: their cameras, their alerts and their reports, nothing else. The ready-made Auditor group sees everything and changes nothing.' },
  { question: 'Is there a white-label option?', answer: 'No. The console carries the Camzify name. Many monitoring companies present the service under their own name and name the platform in the appendix of the proposal.' },
];

export default function AddingRemotePatrolsToAlarmMonitoringPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[articleSchema({ headline: "Adding Remote Patrols to Alarm Monitoring", description: pageMeta.description, path: pageMeta.path, datePublished: '2026-09-07', dateModified: '2026-09-07' }), personSchema()]} breadcrumbs={[
      { label: 'Guides', href: '/guides' },
      { label: 'Adding Remote Patrols to Alarm Monitoring' },
    ]}>
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Owner guide</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Adding remote patrols to alarm monitoring</h1>
          <AuthorByline className="mt-6" />
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[3fr_2fr]">
            <p className="max-w-prose text-body text-muted-foreground">An alarm monitoring operation sells a response to a signal. A scheduled camera round sells a record that the site was checked and found in order, every hour, with a frame per item, whether or not anything signalled. They are different products on the same cameras, and the second is usually sold to clients the first already has. This guide is for the monitoring company or the installer with a monitoring desk that wants to add rounds without changing how alarms are handled.</p>
            <SectionVisual variant="sites" caption="Every client under one account, each with its own sites, sequences and schedule." alt="A list of sites on one account with their camera counts and online status" />
          </div>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What the panel does and what the round does</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>The panel reports events: a contact closed, a PIR tripped. The round reports conditions: the dock door was down at 01:00, the yard was empty, the camera could see. A client with both has an answer to two different questions, what happened and whether the site was in order, and the second is the one the insurer asks. The <Link href="/use-cases/alarm-verification" className="text-primary hover:underline">alarm verification</Link> use case covers the camera's role at the moment of a signal; this guide covers the hours in between.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What changes on the operator's desk</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>Not the alarm workflow. Camzify does not receive panel signals and does not replace alarm receiving software. What arrives beside it is a second stream: automated rounds running on their schedules across every client site, failed checklist items messaging the designated person with a frame, and critical notifications for a risk the AI sees at a stop that the checklist did not ask about. The operator handles the failures, and the rounds that pass produce their reports without anyone touching them. The <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">scheduling page</Link> has the detail.</p>
              <p>Manual rounds stay available for the checks an operator should make in person from the console: after an alarm is stood down, for instance, walking the site's cameras and recording that it was found clear.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How the account is structured</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>The monitoring company holds the account. Each client, or each agency you monitor for, is a <Link href="/platform/user-management" className="text-primary hover:underline">sub-user</Link> scoped to its own sites and cameras, with a <Link href="/platform/permission-groups" className="text-primary hover:underline">permission group</Link> that decides what it can open. License quota is allocated from what you hold and can be reclaimed. A client reads its own reports through its own login and sees nothing that belongs to another. The <Link href="/partners/for-monitoring-centers" className="text-primary hover:underline">monitoring companies page</Link> covers the model, including the reverse arrangement where an agency holds the account and you are the sub-user.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Connecting the cameras you already monitor</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>Cameras reachable from the internet connect by RTSP directly. Cameras on the client's LAN connect through the <Link href="/camzify-connector" className="text-primary hover:underline">Camzify Connector</Link>, a small application on a PC inside that network, with no port forwarding on the client's router. Encoders push RTMP. A site can mix all three, and nothing the client has installed is replaced; the on-site recorder keeps recording. The <Link href="/camera-connectivity/rtsp-setup" className="text-primary hover:underline">RTSP setup guide</Link> walks through adding a camera.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What the client receives</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>A <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report per round</Link>: every stop, every item, its result, the frame, the before-and-after pair for anything fixed, timestamps and a compliance percentage. Beside the alarm log, it is the evidence that the site was checked and found in order between events. Nothing in it is typed in afterwards.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Pricing it beside the monitoring fee</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>Camzify is priced per camera and quoted for your portfolio; we do not publish rates. Price the round to your client per site per month, separately from the monitoring fee, so the client can see what each buys. The <Link href="/roi-calculator#agency" className="text-primary hover:underline">agency mode of the ROI calculator</Link> takes your client count and your price and shows the recurring revenue; the quote comes back against it.</p>
              </div>
            </ScrollReveal>
          </section>
          <section className="mt-14">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What not to promise</h2>
              <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
              <p>Not integration with the panel, not a false-alarm reduction figure, not a response time, not that the round attends. Say what the round does, show a report, and leave the rest to the <Link href="/trust" className="text-primary hover:underline">trust page</Link>, which lists what we do not claim so you never have to walk something back.</p>
              </div>
            </ScrollReveal>
          </section>

          <FaqSection items={faqs} inline />

          <section className="mt-12 rounded-xl bg-card p-8 shadow">
            <h2 className="font-display text-xl font-bold">Related</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/partners/for-monitoring-centers" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground">For monitoring companies</Link>
              <Link href="/use-cases/alarm-verification" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground">Alarm verification</Link>
              <Link href="/virtual-patrolling/automated-patrol-scheduling" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground">Automated patrol scheduling</Link>
              <Link href="/guides/what-goes-in-a-remote-patrol-proposal" className="rounded-full bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground">What goes in a proposal</Link>
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
