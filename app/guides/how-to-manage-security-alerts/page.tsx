import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { HowToSteps, HowToNote, type HowToStep } from '@/components/content/how-to-steps';
import { howToSchema } from '@/lib/seo';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "How to Manage Security Camera Alerts | Triage & Acknowledgement Guide",
  description: "Work an alert queue without drowning in it: scan by severity, filter to what matters, open the linked video around an event, acknowledge criticals, and tune delivery channels.",
  path: "/guides/how-to-manage-security-alerts",
};

export const metadata = generatePageMeta({ ...pageMeta, type: 'article' });

const steps: HowToStep[] = [
  {
    name: 'Scan the queue rather than reading it',
    text: 'Card view shows snapshots at a glance and list view is denser, with a coloured edge carrying severity. Scanning images is far faster than reading rows, which matters because the practical failure of alerting is not missing an alert — it is a queue nobody opens because working through it takes too long.',
  },
  {
    name: 'Filter to the slice you are responsible for',
    text: 'Narrow by site, camera, feature, severity or date range. A supervisor covering three sites and a guard covering one should not be looking at the same queue, and filtering is what makes the same feed usable for both.',
  },
  {
    name: 'Open the event and look at the footage around it',
    text: 'The detail view carries the snapshot, which zooms, along with the metadata and — where backup was recording that camera — the linked video from around the event. That surrounding video is what separates a real judgement from a guess: a single frame shows a person near a door, and thirty seconds either side shows whether they opened it.',
  },
  {
    name: 'Acknowledge criticals and record what you did',
    text: 'Critical events carry a response band, with queue arrows to step through unacknowledged ones and a place to log your response. Acknowledgement is what converts an alert from something that fired into something a named person handled, which is the part an investigation asks about afterwards.',
  },
  {
    name: 'Tune the channels so the right things interrupt people',
    text: 'In notification preferences, toggle email, SMS, WhatsApp and push per alert category, and set notification severity per camera for each AI feature. A camera on a public pavement and a camera on a server room door should not carry the same severity for the same detection.',
  },
];

const faqs = [
  {
    question: 'How do I stop alert fatigue without missing real events?',
    answer: 'Tune severity per camera rather than per feature, so an event on a sensitive camera interrupts someone and the same event on a low-stakes camera goes to the queue instead of a phone. Then reduce what generates alerts at source — exclusion zones over the things that move and do not matter, a minimum object size, and an object filter restricting alerts to people or vehicles. Channel settings decide who gets interrupted; detection tuning decides how often there is anything to be interrupted by.',
  },
  {
    question: 'Which channels can alerts be delivered on?',
    answer: 'Email, SMS, WhatsApp and push, toggled per alert category. Guards can have more than one channel configured, in a preferred order, so coverage does not depend on one phone being switched on.',
  },
  {
    question: 'Can I see the video around an alert, not just the snapshot?',
    answer: 'Yes, where video backup was recording that camera at the time. The event detail links the footage from around the event, so you can see what happened before and after rather than judging a single frame. This is the practical reason to keep backup running on cameras carrying detections you expect to act on.',
  },
  {
    question: 'What does acknowledging a critical event actually do?',
    answer: 'It records that a specific person saw it and what they did about it. Unacknowledged criticals stay visible as outstanding, which is how a shift handover surfaces what was left, and the acknowledgement itself becomes part of the account activity record.',
  },
];

export default function Page() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[howToSchema({ name: 'How to manage security camera alerts in Camzify', description: pageMeta.description, path: pageMeta.path, steps })]}
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'How to Manage Security Alerts' }]}
    >
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Guide</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">How to manage security camera alerts</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            <strong className="font-semibold text-foreground">
              An alert queue fails by being ignored, not by missing events.
            </strong>{' '}
            This guide covers working one at speed &mdash; scanning, filtering, judging against the
            surrounding video, acknowledging what matters &mdash; and tuning delivery so the right
            things interrupt people. See also{' '}
            <Link href="/guides/how-to-reduce-false-alarms" className="text-primary hover:underline">how to reduce false alarms</Link>.
          </p>

          <HowToSteps steps={steps} />

          <HowToNote>
            The order to fix things in is detection first, delivery second. Widening severity
            thresholds quietens a noisy queue for a week and hides real events at the same time;
            an exclusion zone over the tree line that was causing the noise fixes it permanently
            and costs you nothing.
          </HowToNote>

          <div className="mt-14">
            <ScrollReveal>
              <p className="max-w-prose text-muted-foreground">
                Related:{' '}
                <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notifications and alerts</Link>,{' '}
                <Link href="/ai-features/motion-detection" className="text-primary hover:underline">motion detection tuning</Link>, and{' '}
                <Link href="/guides/how-to-configure-cloud-video-backup" className="text-primary hover:underline">configuring video backup</Link>.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
