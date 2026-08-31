import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ComparisonTable } from '@/components/content/comparison-table';
import Link from 'next/link';

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

export default function AiVideoAnalyticsVsMotionDetectionPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'AI Video Analytics vs Motion Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Video Analytics vs Motion Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            An honest comparison of ai video analytics vs motion detection across the dimensions that matter most to security decision-makers. Both approaches have strengths — this table helps you decide which fits your facility.
          </p>

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
                  { label: "Attribute data", values: ["Clothing, object type, behaviour description", "None"] },
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
                Use the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link> to model the cost comparison for your specific scenario, or <Link href="/pricing" className="text-primary hover:underline">review pricing</Link> to understand the per-camera licensing model.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
