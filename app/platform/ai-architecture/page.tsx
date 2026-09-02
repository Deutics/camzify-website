import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { AiPipelineDiagram } from '@/components/mockups/ai-pipeline-diagram';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { SiteImage } from '@/components/content/site-image';
import { Radio, Zap, Boxes, MessageSquare } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "AI Video Analytics Architecture | Six Processing Layers",
  description: "Camzify AI architecture: six layers from object detection to adaptive inference. Custom domain models, vision-language analysis, GPU-efficient processing.",
  path: "/platform/ai-architecture",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Why six separate layers instead of one AI model?', answer: 'Each layer does one distinct job — detection, tracking, domain classification, language context, signal integrity, and compute allocation. Splitting the pipeline that way means any single layer can be improved, retrained, or swapped without touching the rest of the system, which a single monolithic model doesn\'t allow.' },
  { question: 'Does Signal Analysis really need no GPU, and why does that matter for cost?', answer: 'Yes — tampering detection, motion gating, and stream health checks run on signal-processing techniques rather than a neural network, so this layer runs on CPU. That keeps a meaningful share of the pipeline\'s workload off the GPU capacity the deep-learning layers actually need.' },
  { question: 'What does Adaptive Inference actually skip, and is anything missed?', answer: 'It skips frames that haven\'t meaningfully changed since the last one processed — a static, unchanging scene — and puts full model attention on frames where something is actually moving or happening. Because the skip decision is driven by detecting change in the first place, genuinely active frames aren\'t the ones being skipped.' },
  { question: 'Are Custom Domain Models retrained per customer, or shared?', answer: 'They\'re built per industry or vertical — warehouse, retail, construction, and so on — rather than retrained from scratch for each individual customer, so a deployment in a given vertical starts with domain-relevant classes already in place.' },
  { question: 'How does the Vision-Language layer differ from basic object detection?', answer: 'Basic detection returns a bounding box and a class label. The Vision-Language layer adds descriptive attributes and natural-language context on top of that, so a detection reads more like a description of what\'s happening than a coordinate and a tag.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Platform', href: '/platform' },
      { label: 'AI Video Analytics Architecture' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Under The Hood</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Video Analytics Architecture</h1>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[2fr_3fr]">
            <p className="text-body text-muted-foreground">Camzify AI architecture consists of six processing layers: Object Detection, Multi-Object Tracking, Custom Domain Models (industry-specific classes), Vision-Language Model (attributes and natural-language context), Signal Analysis (tampering, motion gating, stream health — no GPU required), and Adaptive Inference (skips static frames, full attention on active scenes).</p>
            <SiteImage
              src="/ai-video-analytics-architecture.jpg"
              alt="Diagram of the Camzify AI detection pipeline, from camera feed through object detection, tracking, domain classification, analysis, and confidence-checked output"
              className="w-full rounded-xl"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-12">
            <AiPipelineDiagram />
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Radio, title: 'GPU-efficient signal analysis', desc: 'Tampering, motion gating, and stream health run on signal-processing logic rather than a neural network — no GPU required for this layer at all.' },
              { icon: Zap, title: 'Adaptive inference saves compute', desc: 'Static frames get skipped rather than reprocessed, so full model attention — and compute budget — goes to scenes that are actually active.' },
              { icon: Boxes, title: 'Custom models per industry', desc: 'Domain models carry object classes trained for the vertical being monitored, not a generic one-size-fits-all detector.' },
              { icon: MessageSquare, title: 'Natural-language context', desc: 'The vision-language layer adds descriptive attributes on top of detections, so alerts read as description, not just coordinates.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 font-display text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <span className="font-mono text-mono-sm uppercase text-primary">Why Layers, Not One Model</span>
                <h2 className="mt-2 font-display text-2xl font-bold">Better accuracy, tuned independently</h2>
                <p className="mt-4 text-muted-foreground">
                  A single monolithic model has to be everything at once — detector, tracker, domain classifier, and
                  language layer rolled into one set of weights. Splitting those responsibilities across six purpose-built
                  layers means each one can be evaluated, tuned, or retrained on its own, without the risk of a fix in
                  one area quietly degrading another.
                </p>
                <p className="mt-4 text-muted-foreground">
                  It also concentrates compute where it's actually needed. Signal Analysis runs on CPU because it doesn't
                  need a neural network to spot a tampered lens or a dead stream, and Adaptive Inference skips frames
                  where nothing changed rather than re-running the full pipeline on every single frame regardless of
                  activity. This module integrates with{' '}
                  <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>, so
                  detections from every layer feed the same operational picture.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-mono-sm uppercase text-primary">Pipeline At A Glance</span>
                <div className="mt-4 space-y-3">
                  {[
                    { layer: '01 · Object Detection', role: 'Finds people, vehicles, objects' },
                    { layer: '02 · Multi-Object Tracking', role: 'Follows objects across frames' },
                    { layer: '03 · Custom Domain Models', role: 'Industry-specific classes' },
                    { layer: '04 · Vision-Language Model', role: 'Attributes, natural-language context' },
                    { layer: '05 · Signal Analysis', role: 'Tampering, motion gating — no GPU' },
                    { layer: '06 · Adaptive Inference', role: 'Skips static frames, saves compute' },
                  ].map((l) => (
                    <div key={l.layer} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2.5">
                      <div className="text-sm font-medium">{l.layer}</div>
                      <span className="text-xs text-muted-foreground">{l.role}</span>
                    </div>
                  ))}
                </div>
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
              <Link href="/platform" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Platform Overview</Link>
              <Link href="/ai-features" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">AI Features</Link>
              <Link href="/platform/dashboard" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Dashboard</Link>
              <Link href="/virtual-patrolling" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Virtual Patrolling</Link>
              <Link href="/pricing" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Pricing</Link>
              <Link href="/book-a-demo" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Book a Demo</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
