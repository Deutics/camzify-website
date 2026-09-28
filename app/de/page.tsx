import { HeroSection } from '../_components/hero-section';
import { TrustBand } from '../_components/trust-band';
import { CustomerLogos } from '@/components/content/customer-logos';
import { ProblemBand } from '../_components/problem-band';
import { PlatformCapabilities } from '../_components/platform-capabilities';
import { WhatIsVP } from '../_components/what-is-vp';
import { ChecklistDemoSection } from '../_components/checklist-demo-section';
import { PartnerDoor } from '../_components/partner-door';
import { AutoPatrolSection } from '../_components/auto-patrol-section';
import { HowItWorks } from '../_components/how-it-works';
import { DetectionGrid } from '../_components/detection-grid';
import { PlatformModules } from '../_components/platform-modules';
import { UseCasesRow } from '../_components/use-cases-row';
import { CameraSupport } from '../_components/camera-support';
import { CostVsGuards } from '../_components/cost-vs-guards';
import { IndustrySelector } from '../_components/industry-selector';
import { GuidesPreview } from '../_components/guides-preview';
import { HomepageFaq, homepageFaqsDe } from '../_components/homepage-faq';
import { CTABand } from '@/components/layout/cta-band';
import { JsonLd } from '@/components/system/json-ld';
import { graph, webPageSchema, faqSchema } from '@/lib/seo';
import { generatePageMeta } from '@/lib/page-utils';

/**
 * The German homepage: the English homepage's sections, rendered with locale="de".
 *
 * Every section is the same component as on /, carrying its English and German copy
 * side by side, so a design change to the homepage reaches both languages at once and
 * a copy change sits next to its translation. Section order matches app/page.tsx; keep
 * the two in step. The pair ('/' <-> '/de') is in lib/i18n.ts, and
 * scripts/check-translations.py hashes app/page.tsx together with app/_components for
 * it, so an English homepage change flags this page for review.
 *
 * Like the homepage, this page does not go through PageShell: it emits its own WebPage
 * and FAQPage nodes, and the FAQ schema is fed the same array the accordion renders.
 */
const pageMeta = {
  title: 'Cloud-VMS mit virtuellem Wächterrundgang',
  description: 'Ein Cloud-VMS für geplante KI-Kontrollgänge auf Ihren vorhandenen IP-Kameras: Checkliste pro Kamera, Meldung an die zuständige Person, Protokoll pro Runde.',
  path: '/de',
};

export const metadata = generatePageMeta(pageMeta);

export default function GermanHomePage() {
  const pageGraph = graph(
    webPageSchema({ name: `${pageMeta.title} | Camzify`, description: pageMeta.description, path: pageMeta.path, inLanguage: 'de' }),
    faqSchema(homepageFaqsDe, pageMeta.path)
  );

  return (
    <div lang="de">
      <JsonLd data={pageGraph} />
      <HeroSection locale="de" />
      <TrustBand locale="de" />
      <CustomerLogos locale="de" />
      <PartnerDoor locale="de" />
      <ProblemBand locale="de" />
      <PlatformCapabilities locale="de" />
      <WhatIsVP locale="de" />
      <ChecklistDemoSection locale="de" />
      <AutoPatrolSection locale="de" />
      <HowItWorks locale="de" />
      <DetectionGrid locale="de" />
      <PlatformModules locale="de" />
      <UseCasesRow locale="de" />
      <CameraSupport locale="de" />
      <CostVsGuards locale="de" />
      <IndustrySelector locale="de" />
      <GuidesPreview locale="de" />
      <HomepageFaq locale="de" />
      <CTABand locale="de" />
    </div>
  );
}
