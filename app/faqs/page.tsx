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
  { question: 'What is virtual patrolling?', answer: 'Virtual patrolling is a system that runs automated AI patrol rounds across your cameras. At each camera stop, the AI checks a defined checklist, is the door closed, is the area clear, is the perimeter intact. Failed checks generate alerts and contribute to a timestamped compliance report.' },
  { question: 'Does Camzify work with my existing cameras?', answer: 'Camzify works with any IP camera that supports ONVIF or RTSP, added over one of three connection types: RTSP, RTMP, or HTTPS (which covers both HLS and WebRTC streams). Most IP cameras manufactured after 2010 are compatible. The Camzify Connector handles cameras on local networks without direct cloud access.' },
  { question: 'Does Camzify replace security guards?', answer: 'It depends on the facility. For sites where the primary guard function is patrol verification, checking doors, verifying perimeters, confirming areas are clear, virtual patrolling provides equivalent coverage at lower cost. For sites requiring physical response, Camzify augments guards by directing their attention to verified threats.' },
  { question: 'How much does Camzify cost?', answer: 'Camzify is priced per instance per month and quoted per site: a stream instance for each camera, a detection instance for each AI feature on a camera, and cloud storage per terabyte per month, spent as you set retention. It starts from $5 per camera per month, and most cameras land between $20 and $90 per camera per month depending on which detections run. The pricing page takes your camera and feature counts for a quote, and the ROI calculator compares it with your current guard spend.' },
  { question: 'What AI detections does Camzify offer?', answer: 'Twenty-three live detections: line and zone intrusion, loitering, motion, tailgating, camera tampering, weapons, aggression and fight, slip and fall, fire and smoke, PPE violation, abandoned object, littering, illegal parking, wrong-way vehicle, vehicle damage report, multi-object tracking, AI attribute extraction, AI suspect search, cross-camera journey map, behavioral anomaly detection, heatmap anomalies, and occupancy and peak hour trends. Anything outside that list, such as license plate recognition, can be built to order as a custom detection. Native mobile apps are the one roadmap item.' },
  { question: 'How quickly can Camzify be deployed?', answer: 'Once cameras are streaming, adding them to Camzify takes minutes. Building patrol sequences, configuring checklists, and starting automated patrols can be completed the same day. No on-premises hardware installation is required for the cloud deployment.' },
  { question: 'Is my video footage secure?', answer: 'Camzify uses encrypted connections for all camera streams and stores footage with encryption at rest. In the cloud deployment, footage is stored in Amazon S3 in the AWS region nearest your sites. Access is controlled through the platform\'s user management and permission groups. Contact us for detailed security documentation.' },
  { question: 'Can Camzify run on premises instead of in the cloud?', answer: 'Yes. Camzify runs in the cloud by default, and on your own premises when footage has to stay on site for privacy reasons. A hybrid of the two is possible as well. On-premises server requirements are planned with you from the site\'s needs, and Camzify installs and sets up everything.' },
  { question: 'Can Camzify build a detection that is not on the list?', answer: 'Yes. Detections outside the standard set, such as license plate recognition, eating and drinking detection or shoplifting detection, are built to order once the requirement is agreed. A custom detection carries a one-off build price plus the normal per-instance pricing, and the footage used to build it is deleted once the build is finished.' },
  { question: 'Does Camzify hold SOC 2 or ISO 27001 certification?', answer: 'Not yet. Work toward PDPA, GDPR, SOC 2 Type II and ISO 27001 is in progress and targeted for the end of 2026; none of the four is held today, and the site will not describe them as held until they are.' },
  { question: 'Where is Camzify headquartered?', answer: `Camzify is built by ${siteConfig.legalName}, headquartered in ${siteConfig.address.countryName} at ${formattedAddress}.` },
];

export default function FAQsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[{ label: 'FAQs' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Frequently asked questions</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Camzify is a cloud video management system that runs <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link> and AI detections on the cameras a site already has. These are the questions buyers ask most: what it checks, which cameras connect, how it is priced and deployed, and where footage is kept. The <Link href="/guides" className="text-primary hover:underline">guides</Link> go into each in depth.
          </p>
          <div className="mt-14">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
