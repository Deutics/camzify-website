import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { siteConfig, formattedAddress } from '@/lib/site-config';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "FAQs | Frequently Asked Questions",
  description: "Common questions about Camzify virtual patrolling, AI video analytics, camera compatibility, pricing, and deployment.",
  path: "/faqs",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What is Camzify?', answer: 'Camzify is an AI video analytics and virtual patrolling platform. It runs scheduled AI patrol rounds on your existing security cameras, checking defined conditions at each camera and notifying the assigned security contact when a check fails.' },
  { question: 'What is virtual patrolling?', answer: 'Virtual patrolling is a system that runs automated AI patrol rounds across your cameras. At each camera stop, the AI checks a defined checklist — is the door closed, is the area clear, is the perimeter intact. Failed checks generate alerts and contribute to a timestamped compliance report.' },
  { question: 'Does Camzify work with my existing cameras?', answer: 'Camzify works with any IP camera that supports ONVIF, RTSP, RTMP, HLS, or WebRTC. Most IP cameras manufactured after 2010 are compatible. The Camzify Connector handles cameras on local networks without direct cloud access.' },
  { question: 'Does Camzify replace security guards?', answer: 'It depends on the facility. For sites where the primary guard function is patrol verification — checking doors, verifying perimeters, confirming areas are clear — virtual patrolling provides equivalent coverage at lower cost. For sites requiring physical response, Camzify augments guards by directing their attention to verified threats.' },
  { question: 'How much does Camzify cost?', answer: 'Camzify uses per-camera, per-month subscription pricing. Cost varies by the number of cameras, AI features activated, and storage retention. See the pricing page for current tiers, or use the ROI calculator to compare against your current guard spend.' },
  { question: 'What AI detections does Camzify offer?', answer: 'Live capabilities: line intrusion detection, zone intrusion detection, motion detection, camera tampering detection, multi-object tracking, and AI attribute extraction. Loitering detection, forensic video search, and behavioral analytics are on the product roadmap.' },
  { question: 'How quickly can Camzify be deployed?', answer: 'Once cameras are streaming, adding them to Camzify takes minutes. Building patrol sequences, configuring checklists, and starting automated patrols can be completed the same day. No on-premise hardware installation is required for cloud deployment.' },
  { question: 'Is my video footage secure?', answer: 'Camzify uses encrypted connections for all camera streams and stores footage with encryption at rest. Access is controlled through the platform\'s user management and permission groups. Contact us for detailed security documentation.' },
  { question: 'Where is Camzify headquartered?', answer: `Camzify is built by ${siteConfig.legalName}, headquartered in ${siteConfig.address.countryName} at ${formattedAddress}.` },
];

export default function FAQsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'FAQs' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Frequently Asked Questions</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Common questions about <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>, AI video analytics, and the Camzify platform. For more detailed information, explore our <Link href="/guides" className="text-primary hover:underline">guides</Link>.
          </p>
          <div className="mt-14">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
