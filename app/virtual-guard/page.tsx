import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { SectionVisual } from '@/components/content/section-visual';
import { ComparisonTable } from '@/components/content/comparison-table';
import { SiteImage } from '@/components/content/site-image';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { serviceSchema } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data.
 *
 * "Virtual guard" is the market's name for the category (480 searches a month in the
 * US against 10 for "virtual patrol"), so this page defines the term in the market's
 * words and then explains how Camzify delivers one. It is deliberately honest that the
 * service is provided by an agency or monitoring company running the software.
 */
const pageMeta = {
  title: "Virtual Guard | AI Virtual Security Guard Software",
  description: "A virtual guard watches a site through its cameras, not from it: scheduled AI rounds, detections between rounds, a person notified, a report filed.",
  path: "/virtual-guard",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What is a virtual guard?', answer: 'A virtual guard is security cover delivered through a site\'s cameras rather than by a person standing on the site. In practice it is one of two things, or both: an operator watching the cameras from elsewhere and responding to what they see, or software running scheduled patrol rounds on those cameras, checking a list at each one and notifying a person when something fails. Camzify is the software; the agency or monitoring company running it is the guard.' },
  { question: 'Is a virtual guard the same as remote guarding?', answer: 'They overlap. Remote guarding usually describes a person in a monitoring room watching cameras and reacting to alarms. A virtual guard is the broader idea of cover through cameras, and the version Camzify delivers adds the patrol round: the same stops and checks on a schedule, with a report, whether or not anyone is watching the screen at the time.' },
  { question: 'Does a virtual guard replace security guards?', answer: 'It replaces the routine patrol round and the hours spent watching an empty site, not the person who can attend. When a check fails or a detection fires, a person is notified and decides what to do; if that person needs to be on site in minutes, someone still has to be within minutes of the site. Most deployments keep a mobile or on-call guard and use the virtual guard to decide when they are needed.' },
  { question: 'What does a virtual guard check?', answer: 'Whatever the checklist for each camera asks: a gate closed, a dock door shut, a fire exit clear, no person in a zone, a vehicle where it should be, a camera view unobstructed. Each answer is judged from the frame at that stop and recorded with it. Between rounds, the AI detections you have enabled on each camera watch for intrusion, tampering, fire and smoke and the rest.' },
  { question: 'Who receives the notification?', answer: 'The person designated for that camera: a guard on site, a mobile patrol, a client contact or an operator in a monitoring room. Channels are set per camera and per detection, and each detection has a notification window, so a rule can detect all day and only notify in the hours nobody should be there.' },
  { question: 'Does it need new cameras?', answer: 'No. Any camera that produces an RTSP stream can be used, plus RTMP and HTTPS streams. Cameras on a private network connect through the Camzify Connector, a small application on a machine inside that network, without opening ports.' },
  { question: 'How is a virtual guard priced?', answer: 'Camzify is licensed per camera and quoted for the site, and we do not publish rates. The quote is measured against the guarding hours it replaces, which the ROI calculator lets you work out with your own figures before you talk to anyone.' },
];

const comparisonRows = [
  { feature: 'Cover between rounds', values: ['AI detections on every camera, in the notification window you set', 'Whatever the guard happens to see or hear', 'Recording only; reviewed after the fact'] },
  { feature: 'The patrol round', values: ['Every camera, every item, on schedule, identical at 03:00 and 15:00', 'Depends on the person, the weather and the hour', 'None'] },
  { feature: 'Record of each check', values: ['Result, timestamp and the frame it was judged from', 'A logbook entry or a checkpoint tap', 'None'] },
  { feature: 'Physical response on site', values: ['Requires a guard on call; the virtual guard tells them when', 'Immediate, if the guard is nearby', 'None'] },
  { feature: 'Judgment on the unexpected', values: ['Raises what it sees as critical; a person decides', 'Human judgment on the spot', 'None until reviewed'] },
  { feature: 'Cost basis', values: ['Per camera, quoted for the site', 'Per hour, whether or not anything happens', 'Hardware and storage'] },
];

export default function VirtualGuardPage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[serviceSchema({ name: 'Virtual Guard', description: pageMeta.description, path: pageMeta.path })]}
      breadcrumbs={[{ label: 'Virtual Guard' }]}
    >
      <FeatureHero
        eyebrow="Virtual guard"
        title="A virtual guard watches the site through its cameras"
        lede={
          <>
            <strong className="font-semibold text-foreground">
              A virtual guard is security cover delivered through a site&apos;s cameras rather than by a person standing on it:
            </strong>{' '}
            scheduled patrol rounds that check a list at every camera, AI detections that watch between rounds in the hours you set, a person notified the moment something fails, and a report with the frame behind every result. Camzify is the software that does this. The security agency or monitoring company running it is the guard.
          </>
        }
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/virtual-patrolling', label: 'How the rounds work' }}
        facts={['Runs on the cameras you have', 'A person notified on every failure', 'Evidence on every check']}
        visual={
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <SiteImage
              src="/vp-vs-security-guards.jpg"
              alt="A security officer at a patrol car alongside an AI camera network, the blended model of guards and virtual rounds"
              className="w-full"
              width={1000}
              height={667}
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        }
      />

      {/* Three meanings */}
      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">The term</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Three things people mean by &ldquo;virtual guard&rdquo;</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                The phrase is used loosely. It helps to know which of the three you are being sold, because they cost differently and leave different records behind.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              { n: '01', title: 'A person watching remotely', body: 'An operator in a monitoring room with the site\'s cameras on a wall, reacting to alarms and to what they notice. This is what most providers call remote guarding. The cover is as good as the operator\'s attention across every screen they have.', href: '/guides/remote-guarding-cost', label: 'Remote guarding cost' },
              { n: '02', title: 'Software running rounds', body: 'A scheduled round steps through the cameras in order, answers a checklist at each stop from the frame, notifies the person responsible on a failure and files a report. Nobody has to be watching for the round to happen. This is virtual patrolling.', href: '/virtual-patrolling', label: 'Virtual patrolling' },
              { n: '03', title: 'Both, with detections in between', body: 'The rounds run on schedule, AI detections watch every camera between them in the notification window set for each, and an operator or a guard takes what needs a person. This is how Camzify is deployed by agencies and monitoring companies.', href: '/partners/for-security-agencies', label: 'For security agencies' },
            ].map((c, i) => (
              <ScrollReveal key={c.n} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-8">
                  <span className="font-mono text-mono-sm text-muted-foreground tabular-nums">{c.n}</span>
                  <h3 className="mt-3 font-display text-xl font-bold">{c.title}</h3>
                  <p className="mt-3 flex-1 text-muted-foreground">{c.body}</p>
                  <Link href={c.href} className="mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:underline">{c.label} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* A shift */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">A shift, in order</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">What a virtual guard does overnight</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                At the scheduled time the round starts at the first camera in the <Link href="/virtual-patrolling/patrol-sequences" className="text-primary hover:underline">sequence</Link> and works through the <Link href="/virtual-patrolling/patrol-checklists" className="text-primary hover:underline">checklist</Link> for that stop: gate closed, no person in the yard, dock door shut, camera view clear. Each item is marked from the frame and the frame is kept. A failed item sends the message written for it to the <Link href="/virtual-patrolling/guard-notifications" className="text-primary hover:underline">guard designated for that camera</Link>, and the round records whether it was fixed.
              </p>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Between rounds the <Link href="/ai-features" className="text-primary hover:underline">AI detections</Link> enabled on each camera keep watching. Detection runs all the time; the notification window decides when a detection becomes a message, so a person in the loading bay notifies at 02:00 and stays quiet at 14:00. When the last round finishes, the <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> is filed: every stop, every item, every result, and who was told.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionVisual
                variant="checklist"
                label="CAM 03 · Loading dock"
                guard="Night guard, mobile"
                items={[['Dock door 1 closed', 'fail'], ['No person on the apron', 'ok'], ['Forklift parked in bay', 'ok'], ['Camera view unobstructed', 'ok']]}
                caption="One stop on the round. The door is open, so the night guard has already been messaged with this frame."
                alt="A checklist for one camera stop with three items passed and the dock door item failed"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Who provides it */}
      <section className="border-t border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal>
              <SectionVisual
                variant="flow"
                steps={['Site cameras', 'Camzify rounds and detections', 'Agency or monitoring room', 'Guard attends']}
                caption="The software runs the round; the agency or monitoring company is the virtual guard the client contracts with."
                alt="Four-step flow from the site's cameras, to Camzify running rounds and detections, to the agency or monitoring room, to a guard attending"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <span className="font-mono text-mono-sm uppercase text-primary">Who you are buying from</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">The guard is a company. Camzify is what it runs.</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                If you manage a site, a virtual guard service is usually sold to you by a security agency or a monitoring company, who run the rounds, take the notifications and send a person when one is needed. Camzify is the console they do it on: one account, a scoped login and a report per client, the guard messaged from inside the round.
              </p>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                If you are that agency or monitoring company, this is the offer you can put on the cameras your clients already have, priced per camera rather than per hour. The <Link href="/partners/for-security-agencies" className="text-primary hover:underline">security agencies</Link> and <Link href="/partners/for-monitoring-centers" className="text-primary hover:underline">monitoring companies</Link> pages cover the account model, and the <Link href="/guides/how-to-sell-virtual-patrolling-to-clients" className="text-primary hover:underline">selling guide</Link> covers the pitch. Sites that want to run it themselves can; the console does not care who is logged in.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Virtual guard vs security guard</span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Where each one is better</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                A person on site can open a door, calm a situation and call an ambulance. A virtual guard cannot, and this table says so. The full comparison is on <Link href="/virtual-patrolling/vs-security-guards" className="text-primary hover:underline">virtual patrolling vs security guards</Link>.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-10">
            <ComparisonTable rows={comparisonRows} columns={['Capability', 'Virtual guard on Camzify', 'Guard on site', 'Cameras recording only']} />
          </div>
        </div>
      </section>

      {/* Limits */}
      <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Limits</span>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">What a virtual guard will not do</h2>
              <p className="mt-5 max-w-prose text-body text-muted-foreground">
                It will not attend. It will not see a corner without a camera, or through a lens that is dirty, dark or pointed at the wrong thing, which is why camera view is a checklist item on every stop. It will not decide what to do about what it finds; it tells a person, with the frame, and the decision is theirs. And it will not run without a link to the cameras: an outage is a missed round in the log, never a silent one.
              </p>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                We do not publish detection rates, response times or uptime figures. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> explains why, and the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link> lets you put your own guarding hours against a quote before anyone from Camzify is involved.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related */}
      <section className="py-16">
        <div className="mx-auto max-w-site px-6">
          <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Read next</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: '/guides/what-is-virtual-patrolling', title: 'What is virtual patrolling?', desc: 'The round itself, defined and walked through.' },
              { href: '/use-cases/remote-video-monitoring', title: 'Remote video monitoring', desc: 'Rounds and detections on a site watched from elsewhere.' },
              { href: '/guides/remote-guarding-cost', title: 'Remote guarding cost', desc: 'What the service is priced on and how to compare quotes.' },
              { href: '/cloud-video-surveillance', title: 'Cloud video surveillance', desc: 'The recording and storage layer underneath the guard.' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group rounded-xl border border-border bg-card p-6 transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <h3 className="font-display text-base font-bold transition-colors group-hover:text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs} heading="Virtual guards, answered" />
    </PageShell>
  );
}
