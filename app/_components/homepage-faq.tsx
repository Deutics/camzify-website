import Link from 'next/link';
import { FAQAccordion } from '@/components/content/faq-accordion';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

/**
 * Homepage FAQ.
 *
 * Exported so `app/page.tsx` can pass the identical array into `faqSchema()` — the
 * FAQPage structured data and the visible answers must come from one source or the
 * rich result is invalid.
 *
 * Questions are phrased the way buyers type them, and each answer opens with the
 * direct answer before elaborating, so a single pair survives being quoted out of
 * context by an answer engine.
 */
export const homepageFaqs = [
  {
    question: 'What is virtual patrolling?',
    answer:
      'Virtual patrolling is a scheduled, AI-driven patrol round run across existing security cameras. The system follows a defined camera route, checks a per-camera list of conditions at each stop, scores compliance, notifies the guard assigned to any failed check, and produces a timestamped PDF report. It creates the same audit trail as a physical guard tour without a person walking the route.',
  },
  {
    question: 'Does Camzify work with the cameras I already have?',
    answer:
      'Yes, in almost all cases. Camzify connects to any IP camera that supports ONVIF or RTSP, which covers effectively every IP camera manufactured in the last decade, and it also ingests RTMP, HLS and WebRTC. No proprietary hardware is required. For cameras on a local network with no public route, the Camzify Connector relays the stream without port forwarding and without exposing the camera to the internet.',
  },
  {
    question: 'Does virtual patrolling replace security guards?',
    answer:
      'It replaces the routine patrol round, not the security function. The repetitive walk-and-check that occupies most of a guard shift is what the AI takes over. Guards are still needed for physical response, visitor management and judgement calls. Many sites use virtual patrolling to cover hours that were never staffed in the first place rather than to remove existing shifts.',
  },
  {
    question: 'How much does Camzify cost?',
    answer:
      'Camzify is licensed per camera per month across three tiers. Public rate-card figures are not published because pricing depends on camera count, the AI features activated and retention period. The comparison that matters is against manned guarding rather than against other software: the ROI calculator models it using your own guard rates and camera count, and a demo returns an exact quote.',
  },
  {
    question: 'How quickly does an alert reach someone?',
    answer:
      'Alerts fire within seconds of a confirmed detection and route to the contact assigned to that specific camera, carrying the object type, confidence score, timestamp and a snapshot. Each alert has an acknowledgement state, so there is a record of who saw it and when, and unacknowledged high-severity events stay at the top of the queue.',
  },
  {
    question: 'What happens when a checklist item fails during a round?',
    answer:
      'The item is marked Not Compliant, logged with a timestamp, and an automatic notification goes to the guard assigned to that camera with a predefined message explaining what was found. The failure appears in the round\'s PDF report alongside every other check, and the round\'s overall compliance percentage reflects it.',
  },
  {
    question: 'How is this different from motion detection?',
    answer:
      'Motion detection responds to pixel change, so it triggers on shadows, headlights, rain and moving foliage. Camzify detections operate on confirmed object tracks: the system maintains a persistent identity for each subject across frames and evaluates rules against that track. The practical difference is alert volume — object-track detection removes most of the noise that makes conventional motion alerts unusable.',
  },
  {
    question: 'Which industries use virtual patrolling?',
    answer:
      'Any site with cameras already installed and hours when nobody is watching them. The most common deployments are warehouses and logistics sites, construction sites, retail estates, manufacturing plants, property management portfolios, self-storage, and remote or unmanned assets such as substations and pump stations.',
  },
];

export function HomepageFaq() {
  return (
    <section className="border-t border-border bg-muted/20 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-6">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="font-mono text-mono-sm uppercase text-primary">Common questions</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              What buyers ask before a demo
            </h2>
            <p className="mt-5 max-w-prose text-body text-muted-foreground">
              If your question is not here, the{' '}
              <Link href="/faqs" className="text-primary hover:underline">
                full FAQ
              </Link>{' '}
              goes further, and{' '}
              <Link href="/contact" className="text-primary hover:underline">
                contact
              </Link>{' '}
              reaches a person.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="mx-auto mt-12 max-w-3xl">
            <FAQAccordion items={homepageFaqs} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
