import { HeroSection } from './_components/hero-section';
import { ProblemBand } from './_components/problem-band';
import { WhatIsVP } from './_components/what-is-vp';
import { ChecklistDemoSection } from './_components/checklist-demo-section';
import { HowItWorks } from './_components/how-it-works';
import { DetectionGrid } from './_components/detection-grid';
import { PlatformModules } from './_components/platform-modules';
import { CameraSupport } from './_components/camera-support';
import { CostVsGuards } from './_components/cost-vs-guards';
import { IndustrySelector } from './_components/industry-selector';
import { GuidesPreview } from './_components/guides-preview';
import { CTABand } from '@/components/layout/cta-band';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemBand />
      <WhatIsVP />
      <ChecklistDemoSection />
      <HowItWorks />
      <DetectionGrid />
      <PlatformModules />
      <CameraSupport />
      <CostVsGuards />
      <IndustrySelector />
      <GuidesPreview />
      <CTABand />
    </>
  );
}
