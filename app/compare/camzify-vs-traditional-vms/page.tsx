import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ComparisonTable } from '@/components/content/comparison-table';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Camzify vs Traditional VMS | Cloud Video Management",
  description: "Compare Camzify with traditional video management systems. See how AI-powered virtual patrolling goes beyond recording to active verification.",
  path: "/compare/camzify-vs-traditional-vms",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = 'Camzify vs Traditional VMS'.split(' vs ');

const faqs = [
  { question: 'What does a traditional VMS do that Camzify does not?', answer: 'Deep integration with on-premise recorders, access control panels and building systems is where a traditional VMS is strongest. Camzify is cloud-first and runs on the camera streams; it does not replace an NVR and does not integrate with alarm panels.' },
  { question: 'What does Camzify do that a traditional VMS does not?', answer: 'Virtual patrolling: scheduled rounds with a checklist per camera, a guard notified on failure and a report per round. Most VMS products record and alert; none runs the round.' },
  { question: 'Can I keep my NVR?', answer: 'Yes. Camzify takes a stream from the camera and records to the cloud on its own schedule; the recorder keeps doing what it does.' },
  { question: 'Which is right for several sites?', answer: 'Cloud, in most cases: one console, sites and sub-users under one account, and no server per site. The cloud versus on-premise comparison covers the exceptions.' },
];

export default function CamzifyVsTraditionalVmsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'Camzify vs Traditional VMS' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Camzify vs traditional VMS</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            An honest comparison of camzify vs traditional vms across the dimensions that matter most to security decision-makers. Both approaches have strengths, this table helps you decide which fits your facility.
          </p>

          <div className="mt-12">
            <ScrollReveal>
              <ComparisonTable
                columns={[sides?.[0] ?? 'Option A', sides?.[1] ?? 'Option B']}
                rows={[
                  { label: "Primary function", values: ["Active AI verification via patrol rounds", "Passive video recording and playback"] },
                  { label: "Detection", values: ["AI-powered: zone, line, motion, tampering, tracking", "Basic motion detection or none"] },
                  { label: "Deployment", values: ["Cloud-based, connect via RTSP/RTMP/HTTPS", "On-premise NVR/server installation"] },
                  { label: "Patrol automation", values: ["Built-in virtual patrolling with checklists", "Not available"] },
                  { label: "Compliance reporting", values: ["Automated PDF reports with compliance %", "Manual review of recorded footage"] },
                  { label: "Scalability", values: ["Add cameras from any location", "Limited by on-premise hardware capacity"] },
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
      <FaqSection items={faqs} />
    </PageShell>
  );
}
