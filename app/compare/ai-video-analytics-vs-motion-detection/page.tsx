import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ComparisonTable } from '@/components/content/comparison-table';
import Link from 'next/link';
import { PhotoFigure } from '@/components/content/photo-figure';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "AI Video Analytics vs Motion Detection | Comparison",
  description: "Understand the difference between AI video analytics and traditional motion detection. AI tracks objects; motion detection responds to pixel changes.",
  path: "/compare/ai-video-analytics-vs-motion-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = 'AI Video Analytics vs Motion Detection'.split(' vs ');

const faqs = [
  { question: 'What is the practical difference?', answer: 'Motion detection fires on pixel change; AI detection fires on a confirmed object track of a chosen class. The first alerts on rain and headlights; the second alerts on a person or a vehicle.' },
  { question: 'Is motion detection ever the right tool?', answer: 'Yes, deliberately: as a liveness signal on a camera that should never be static, or in a sealed room where any movement is an event. Camzify includes it as a separate feature for exactly those cases.' },
  { question: 'Does AI detection need special hardware?', answer: 'No. It runs on the streams from the cameras you own; processing is in the cloud. The one on-site component sometimes needed is a PC running the Connector.' },
  { question: 'How do I tune either without drowning in alerts?', answer: 'Zones and lines where the risk is, a class filter, a notification window per camera and severity per detection. The false-alarms guide walks through each.' },
];

export default function AiVideoAnalyticsVsMotionDetectionPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'AI Video Analytics vs Motion Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI video analytics vs motion detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            An honest comparison of ai video analytics vs motion detection across the dimensions that matter most to security decision-makers. Both approaches have strengths, this table helps you decide which fits your facility.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/feature-motion-detection-1.webp" alt="The console live view with a motion detection alert drawn on the camera frame" caption="Motion detection on a live frame" />
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <ComparisonTable
                columns={[sides?.[0] ?? 'Option A', sides?.[1] ?? 'Option B']}
                rows={[
                  { label: "How it works", values: ["Object detection + tracking on confirmed subjects", "Pixel change detection across frame regions"] },
                  { label: "False alarm rate", values: ["Low — triggers on confirmed objects only", "High — shadows, lighting, weather all trigger"] },
                  { label: "Object classification", values: ["Yes — person, vehicle, animal", "No — all pixel changes treated equally"] },
                  { label: "Tracking", values: ["Maintains persistent identity across frames", "No tracking capability"] },
                  { label: "Zone/Line rules", values: ["Direction, schedule, zone-specific rules", "Region-based sensitivity only"] },
                  { label: "Attribute data", values: ["Clothing, object type, behavior description", "None"] },
                ]}
              />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Neither approach is universally better. The right choice depends on your facility size, risk profile, budget, and existing infrastructure. <a href="/virtual-patrolling" className="text-primary hover:underline">Virtual patrolling</a> is strongest where consistency, audit trails, and cost efficiency matter most — typically multi-site operations, after-hours coverage, and facilities where guard costs are the dominant security spend.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Use the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link> to model the cost comparison for your specific scenario, or <Link href="/pricing" className="text-primary hover:underline">review pricing</Link> to understand the per-camera licensing model. For the definitions behind this comparison, read <Link href="/guides/what-is-intelligent-video-analytics" className="text-primary hover:underline">what intelligent video analytics is</Link>.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
