import { HeroSection } from './_components/hero-section';
import { TrustBand } from './_components/trust-band';
import { ProblemBand } from './_components/problem-band';
import { PlatformCapabilities } from './_components/platform-capabilities';
import { WhatIsVP } from './_components/what-is-vp';
import { ChecklistDemoSection } from './_components/checklist-demo-section';
import { AutoPatrolSection } from './_components/auto-patrol-section';
import { HowItWorks } from './_components/how-it-works';
import { DetectionGrid } from './_components/detection-grid';
import { PlatformModules } from './_components/platform-modules';
import { UseCasesRow } from './_components/use-cases-row';
import { CameraSupport } from './_components/camera-support';
import { CostVsGuards } from './_components/cost-vs-guards';
import { IndustrySelector } from './_components/industry-selector';
import { GuidesPreview } from './_components/guides-preview';
import { HomepageFaq, homepageFaqs } from './_components/homepage-faq';
import { CTABand } from '@/components/layout/cta-band';
import { JsonLd } from '@/components/system/json-ld';
import { graph, webPageSchema, faqSchema } from '@/lib/seo';

/**
 * Homepage.
 *
 * No `export const metadata` on purpose — the root layout's metadata already describes
 * this page, and its canonical is '/'. Every other route must define its own.
 *
 * The homepage does not go through `PageShell`, so the WebPage and FAQPage nodes are
 * emitted here explicitly. `homepageFaqs` is the same array the visible accordion
 * renders; the FAQ rich result is invalid if the schema and the visible answers differ.
 *
 * Section order is an argument, not a list: hook, credentials, problem, definition,
 * proof-by-doing, mechanism, capability, product, application, compatibility, economics,
 * audience, objections, close.
 */
export default function HomePage() {
  const pageGraph = graph(
    webPageSchema({
      name: 'Virtual Patrolling & AI Video Surveillance Software | Camzify',
      description:
        'Camzify runs scheduled AI patrol rounds on the cameras you already own — checking every point, flagging failures, notifying the right guard.',
      path: '/',
    }),
    faqSchema(homepageFaqs, '/')
  );

  return (
    <>
      <JsonLd data={pageGraph} />
      <HeroSection />
      <TrustBand />
      <ProblemBand />
      <PlatformCapabilities />
      <WhatIsVP />
      <ChecklistDemoSection />
      <AutoPatrolSection />
      <HowItWorks />
      <DetectionGrid />
      <PlatformModules />
      <UseCasesRow />
      <CameraSupport />
      <CostVsGuards />
      <IndustrySelector />
      <GuidesPreview />
      <HomepageFaq />
      <CTABand />
    </>
  );
}
