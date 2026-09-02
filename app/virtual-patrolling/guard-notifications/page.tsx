import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { Bell, User, MessageSquare, ArrowRight, AlertTriangle, Phone } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Automated Guard Notifications | Guard Alert System",
  description: "When a patrol checklist item fails, Camzify automatically notifies the guard assigned to that specific camera with a predefined escalation message.",
  path: "/virtual-patrolling/guard-notifications",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Is the notification sent automatically, or does someone have to approve it?', answer: 'It depends which kind of round found the problem. On an automated round it is sent automatically as the round runs, with nobody in the loop — which is the whole point of a round that happens at 3am. On a manual round the operator is already looking at the camera, so the message is offered with the specifics filled in and they choose to send it, skip it, or send it later from the same item.' },
  { question: 'What happens if the assigned guard doesn\'t respond to a notification?', answer: 'If the guard doesn\'t acknowledge the alert within the configured window, it escalates automatically to a backup contact or site supervisor. The failure is never left waiting on a single person\'s availability.' },
  { question: 'Can a camera have more than one guard assigned?', answer: 'Yes. A camera can carry a primary guard who receives the first notification, plus one or more escalation contacts who are only alerted if the primary doesn\'t acknowledge in time.' },
  { question: 'Are notification messages customisable per checklist item?', answer: 'Each checklist item carries its own predefined message, written when the checklist is set up. A gate-related failure and a loitering failure can trigger entirely different wording, tailored to what the guard actually needs to do.' },
  { question: 'Which channels do notifications use?', answer: 'Email, SMS, WhatsApp, and push are all supported. Guards can have more than one channel configured, and the order they\'re tried in is set per guard rather than fixed for the whole site.' },
  { question: 'Is every notification logged somewhere?', answer: 'Yes. Every notification — who it was sent to, when, and whether it was acknowledged — is written into that round\'s patrol report, so there\'s a record independent of the guard\'s own memory of the shift.' },
];

export default function GuardNotificationsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Virtual Patrolling', href: '/virtual-patrolling' },
      { label: 'Guard Notifications' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Automatic Escalation</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Guard Notifications</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            A guard notification is an automatic alert sent to the security guard assigned to a specific camera
            when a <Link href="/virtual-patrolling/patrol-checklists" className="text-primary hover:underline">checklist item</Link> is
            marked Not Compliant during a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round.
            Each notification carries a predefined message explaining what was found and what action is expected.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { icon: User, title: 'Named guard per camera', desc: 'Every camera in the patrol sequence has an assigned guard with contact details. No ambiguity about who is responsible.' },
              { icon: MessageSquare, title: 'Predefined messages', desc: 'Each checklist item has a pre-written escalation message. "Gate left open after delivery — close immediately."' },
              { icon: AlertTriangle, title: 'Instant delivery', desc: 'Notifications are sent the moment a failure is logged. The guard knows what happened and where before anyone else.' },
            ].map((item: any, i: number) => {
              const Icon = item?.icon ?? Bell;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 font-display text-lg font-bold">{item?.title ?? ''}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item?.desc ?? ''}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Why It Matters</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Why guard notifications matter</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>A failed checklist item is only useful if it reaches someone who can act on it. Without an automatic alert, that failure sits in a report until an operator happens to review it — which might be minutes later, or might be at the end of the shift, long after the gate has been left open or the zone has stayed unattended.</p>
                <p>Radioing around or calling the guard on duty works occasionally, but it depends on someone remembering to do it, knowing who is actually covering that camera right now, and reaching them on whatever channel they happen to have open. None of that is guaranteed, and none of it leaves a record of when the guard was told or whether they responded.</p>
                <p>Tying the notification directly to the checklist item removes the guesswork. The moment a result is logged as Not Compliant, the system already knows which camera it came from, which guard is assigned to it, and what message to send — so the alert goes out immediately, to the right person, with no one in between.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <ScrollReveal>
              <div className="space-y-4">
                <span className="font-mono text-mono-sm uppercase text-primary">Examples</span>
                <h2 className="font-display text-2xl font-bold">What a notification looks like</h2>
                <p className="text-muted-foreground">Each message is written when the checklist item is created, so it names the problem and the expected action rather than leaving the guard to guess.</p>
                <div className="space-y-3">
                  {[
                    'Gate left open after delivery — close immediately',
                    'Unauthorised person in loading zone — investigate now',
                    'Fire exit blocked — clear immediately',
                    'Vehicle not in designated bay — reposition',
                    'Dock door left unsecured — confirm and lock',
                    'Corridor obstruction reported — remove and log',
                  ].map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5">
                      <Bell className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <PlaceholderVisual type="report" caption="NOTIFICATION LOG" alt="Log of guard notifications showing predefined messages sent for failed checklist items" />
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">How It Flows</span>
                <h2 className="mt-2 font-display text-2xl font-bold">How notifications flow</h2>
                <ol className="mt-6 space-y-4 text-muted-foreground">
                  <li className="flex gap-3"><span className="font-mono text-primary">01</span> Patrol round reaches a camera in the sequence</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">02</span> Checklist item is evaluated — Compliant or Not Compliant</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">03</span> On failure, the system retrieves the guard assigned to that camera</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">04</span> The predefined message for that checklist item is sent to the guard</li>
                  <li className="flex gap-3"><span className="font-mono text-primary">05</span> The notification is logged in the <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">patrol report</Link></li>
                </ol>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="GUARD NOTIFICATION FLOW" alt="Guard notification system showing automatic alert routing from failed checklist item to assigned guard" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="ESCALATION CHAIN" alt="Diagram showing an unacknowledged guard notification escalating from primary guard to backup contact" />
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Configuration</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Escalation and delivery channels</h2>
                <p className="mt-4 text-muted-foreground">Notifications aren't a single fire-and-forget message. Delivery and escalation are configured per guard, so coverage doesn't depend on one phone being switched on.</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Each guard can have multiple channels configured — email, SMS, WhatsApp, and push — in a preferred order</li>
                  <li className="flex gap-2">• Acknowledgement is required within a configurable window before an alert counts as unactioned</li>
                  <li className="flex gap-2">• Unacknowledged alerts escalate automatically to a backup guard or site supervisor</li>
                  <li className="flex gap-2">• Escalation contacts are set independently of the primary guard, so backup coverage is never assumed</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-card p-8 sm:p-10">
            <span className="font-mono text-mono-sm uppercase text-primary">FAQ</span>
            <h2 className="mt-2 font-display text-2xl font-bold">Frequently asked questions</h2>
            <div className="mt-6">
              <FAQAccordion items={faqs} />
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Related</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/virtual-patrolling/patrol-checklists" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Patrol Checklists <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/platform/notifications-and-alerts" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Platform Notifications <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/use-cases/guard-tour-verification" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Guard Tour Verification <ArrowRight className="h-3 w-3" /></Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
