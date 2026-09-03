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
 *
 * The first block is what a video-management buyer asks of any platform — deployment
 * model, camera lock-in, storage, security, search, mobile. The second is what is
 * specific to virtual patrolling. The earlier version had only the second, which meant
 * a VMS buyer found none of their questions answered on the page that ranks highest.
 */
export const homepageFaqs = [
  {
    question: 'Is Camzify a cloud video management system or an on-premise one?',
    answer:
      'Cloud. There is no server or NVR to install: cameras stream to the platform, footage is stored in the cloud with a retention window set per camera, and everything is managed from a browser. The only on-site software is the optional Camzify Connector, a small application for a Windows, macOS or Linux machine that relays cameras on a private network without port forwarding. Cameras that are already reachable over the internet need nothing installed at all.',
  },
  {
    question: 'Does Camzify work with the cameras I already have?',
    answer:
      'Yes, in almost all cases. Camzify connects to any IP camera that supports ONVIF or RTSP, which covers effectively every IP camera manufactured in the last decade, and it also accepts RTMP and HTTPS (HLS or WebRTC) streams. Camzify sells no hardware, so there is no feature reserved for its own cameras. Every detection model and every patrol capability runs on whatever cameras you have.',
  },
  {
    question: 'Where is footage stored, and for how long?',
    answer:
      'In the cloud, under a retention policy set per camera rather than once for the account, by a number of days or by a storage cap. Recording runs continuously or on a schedule you define, so an interior camera watching an empty office overnight does not have to consume storage doing it. Footage past its window is deleted automatically, and any clip can be exported for a chosen time range.',
  },
  {
    question: 'How is the platform secured?',
    answer:
      'Camera streams are transmitted over TLS 1.2 or higher and footage at rest is encrypted with AES-256. Access is role-based: each user carries one permission group combining page-level access with create, read, update and delete rights per resource, and every action on the account is logged in an audit trail the account holder can review. PDPA, GDPR, SOC 2 Type II and ISO 27001 alignment are in progress and none is yet held — the security page says so plainly.',
  },
  {
    question: 'Can I search recorded footage for a specific person?',
    answer:
      'Yes. AI suspect search takes a plain-language description, such as clothing color, bag, approximate age or direction of travel, and returns every matching appearance across indexed cameras and time windows, ranked by confidence. No reference photo is needed. It is not facial recognition: matches are made on confirmed object tracks and appearance attributes, and identification is always a human decision. The cross-camera journey map then shows a matched subject’s full path.',
  },
  {
    question: 'Can guards and managers use it on a phone?',
    answer:
      'Yes. Mobile access runs in the phone’s own browser, Safari, Chrome or whatever is already there, with live streams, alerts and patrol compliance in a responsive interface, so there is nothing to install for a relief guard on their first shift. Native iOS and Android apps are in development and listed on the roadmap; the browser interface stays available after they ship.',
  },
  {
    question: 'What is virtual patrolling?',
    answer:
      'Virtual patrolling is a scheduled, AI-driven patrol round run across existing security cameras. The system follows a defined camera route, checks a per-camera list of conditions at each stop, scores compliance, notifies the guard assigned to any failed check, and produces a timestamped report with the snapshot behind every result. It creates the same audit trail as a physical guard tour without a person walking the route.',
  },
  {
    question: 'Does virtual patrolling replace security guards?',
    answer:
      'It replaces the routine patrol round, not the security function. The repetitive walk-and-check that occupies most of a guard shift is what the AI takes over; guards are still needed for physical response, visitor management and judgment calls. Many sites use it to cover hours that were never staffed in the first place, and security agencies sell it alongside their guards as overnight coverage across every client site rather than instead of them.',
  },
  {
    question: 'How much does Camzify cost?',
    answer:
      'Camzify is licensed per camera per month, with the price depending on camera count, the AI features activated and the retention period, so public rate-card figures are not published. The comparison that matters is usually against manned guarding rather than against other software: the ROI calculator models it using your own guard rates and camera count, and a demo returns an exact quote.',
  },
  {
    question: 'How quickly does an alert reach someone?',
    answer:
      'Alerts fire within seconds of a confirmed detection and route to the contact assigned to that specific camera over email, SMS, WhatsApp or push, carrying the object type, confidence score, timestamp and a snapshot. Each alert has an acknowledgment state, so there is a record of who saw it and when, and unacknowledged high-severity events stay at the top of the queue.',
  },
  {
    question: 'What happens when a checklist item fails during a round?',
    answer:
      'The item is marked Not Compliant and the snapshot is kept. On an automated round the guard assigned to that camera is notified immediately; on a manual round the operator is offered the message and chooses. The item then has to be resolved before the round can close: either fixed and re-checked, which captures a second frame, or held as Pending with a written reason, which counts against the compliance score. The report carries all of it.',
  },
  {
    question: 'How is this different from motion detection?',
    answer:
      'Motion detection responds to pixel change, so it triggers on shadows, headlights, rain and moving foliage. Camzify detections operate on confirmed object tracks: the system maintains a persistent identity for each subject across frames and evaluates rules against that track. The practical difference is alert volume — object-track detection removes most of the noise that makes conventional motion alerts unusable.',
  },
  {
    question: 'Which industries use Camzify?',
    answer:
      'Any site with cameras already installed and hours when nobody is watching them. The most common deployments are warehouses and logistics sites, construction sites, retail estates, manufacturing plants, property management portfolios, self-storage, and remote or unmanned assets such as substations and pump stations — and security agencies covering many of those sites for their own clients.',
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
