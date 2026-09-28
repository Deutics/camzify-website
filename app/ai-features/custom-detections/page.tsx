import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { SectionVisual } from '@/components/content/section-visual';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * Custom detections: the offer to build a detection that is not among the 23.
 *
 * Every fact here was stated by the business on 2026-09-28: which detections have
 * already been built for customers, that process and timeline depend on the detection
 * and are set once requirements are agreed, the pricing shape (a one-off build price
 * plus the normal per-instance license), that build footage is deleted afterwards,
 * that custom detections run in the cloud or on premises, and that plain-language
 * alerts exist in the console. Do not add build times, accuracy figures, data volumes
 * or prices: none were given.
 *
 * Facial recognition is deliberately framed as a custom build only, never a standard
 * feature (decision of 2026-09-28). The standard detections still identify nobody, and
 * the pages that say so about a specific detection remain true.
 */
const pageMeta = {
  title: 'Custom AI Detections | Built to Order',
  description: 'When the 23 standard detections do not cover it, Camzify builds the detection: plate recognition, eating and drinking, shoplifting, in cloud or on premises.',
  path: '/ai-features/custom-detections',
};

export const metadata = generatePageMeta(pageMeta);

const faqs = [
  { question: 'Can Camzify build a detection that is not on the list?', answer: 'Yes. When none of the 23 standard detections covers what a site needs, Camzify builds the detection. The requirement is defined with you first, the build is priced once, and the finished detection is licensed per camera like any other.' },
  { question: 'Which custom detections have already been built?', answer: 'For customers so far: license plate recognition, facial recognition, eating and drinking detection and shoplifting detection, among others. Each started as a requirement a standard detection did not meet.' },
  { question: 'How much does a custom detection cost?', answer: 'A one-off build price, then the normal per-instance pricing: each camera the detection runs on takes a detection instance, exactly as with the standard detections. The build price depends on the detection and is quoted once the requirements are agreed.' },
  { question: 'How long does a build take?', answer: 'It depends on the detection. The timeline is set together with the requirements, before any work starts, so you know it before you commit.' },
  { question: 'What happens to the footage used to build it?', answer: 'It is deleted once the build is finished.' },
  { question: 'Can a custom detection run on premises?', answer: 'Yes. A custom detection can be deployed in the cloud or on premises, the same choice as the rest of the platform.' },
  { question: 'Does Camzify do facial recognition?', answer: 'Not as a standard feature. None of the 23 standard detections identifies anyone: attribute extraction and suspect search work on clothing, carried objects and timing, not faces. Facial recognition exists only as a custom build, made on request for a customer that has the legal basis to use it.' },
  { question: 'Do I need a custom build, or will a plain-language alert do?', answer: 'Try behavioral anomaly detection first. It is one of the 23 standard detections: you describe the behavior to watch for in your own words, such as someone smoking in the loading bay, and it alerts when it sees it. If that covers the need, nothing has to be built; if it does not, that is the point to request a custom detection.' },
];

const built = [
  { name: 'License plate recognition', desc: 'Reads US and Singapore plates from the camera image and alerts on a watchlist, for the gates and car parks where a plate matters more than the vehicle.', href: '/ai-features/license-plate-recognition' },
  { name: 'Facial recognition', desc: 'Built only on request, for a customer with the legal basis to use it. Never part of the standard detections; see below.' },
  { name: 'Eating and drinking detection', desc: 'Flags eating or drinking in the areas of a site where it is not allowed.' },
  { name: 'Shoplifting detection', desc: 'Flags shoplifting behavior on store cameras, beyond what the standard detections look for.' },
];

const steps = [
  { title: 'Define the requirement', body: 'We agree what should count as a detection, on which cameras, and what should happen when it fires. What the build itself needs depends on the detection, and is settled here.' },
  { title: 'Price and timeline', body: 'Once the requirement is agreed you get the one-off build price and the timeline. Both depend on the detection, so neither is given before this point.' },
  { title: 'Build', body: 'Camzify builds the detection. Any footage used for the build is deleted once it is finished.' },
  { title: 'Deploy and license', body: 'The detection goes live in the cloud or on premises and is licensed per camera, one detection instance per camera it runs on, like the standard detections.' },
];

export default function CustomDetectionsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Custom Detections' },
    ]}>
      <FeatureHero
        eyebrow="AI detection · Built to order"
        title="Custom AI detections, built to order"
        lede={<><strong className="font-semibold text-foreground">When none of the 23 standard detections covers what a site needs, Camzify builds the detection.</strong> The requirement is defined with you first, the build is priced once, and the finished detection is licensed per camera like any other, in the cloud or on premises.</>}
        facts={['One-off build price, then per camera', 'Cloud or on premises', 'Build footage deleted afterwards']}
        primary={{ href: '/book-a-demo', label: 'Discuss a detection' }}
        secondary={{ href: '/ai-features', label: 'The 23 standard detections' }}
        visual={<SectionVisual variant="flow" caption="Custom detection · request to live" alt="Four steps: requirement agreed, detection built, deployed in the cloud or on premises, licensed per camera" steps={['Requirement agreed', 'Detection built', 'Cloud or on premises', 'Licensed per camera']} />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold">Detections already built for customers</h2>
            <p className="mt-3 max-w-prose text-muted-foreground">
              These started as requirements the standard detections did not meet. They are examples, not the limit of what can be built.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {built.map((b) => (
                <li key={b.name} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-display text-base font-bold">
                    {'href' in b && b.href ? <Link href={b.href} className="hover:text-primary hover:underline">{b.name}</Link> : b.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Before you commission one</span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Try a plain-language alert first</h2>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Some needs do not call for a new detection at all.{' '}
                <Link href="/ai-features/behavioral-anomaly-detection" className="text-primary hover:underline">Behavioral anomaly detection</Link>, one of the 23, lets you describe the behavior to watch for in your own words, such as someone smoking in the loading bay or a fire door propped open, and alerts when it sees it. If that covers the need, nothing has to be built. If it does not, that is the point to request a custom detection, and the sentence you tried is a good starting point for the requirement.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">How a build works</h2>
          </ScrollReveal>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.06}>
                <li className="h-full rounded-xl border border-border bg-card p-6">
                  <span className="font-mono text-mono-sm text-primary">Step {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 font-display text-base font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto grid max-w-site gap-12 px-6 lg:grid-cols-2">
          <ScrollReveal>
            <div>
              <h2 className="font-display text-2xl font-bold">What it costs</h2>
              <p className="mt-4 text-muted-foreground">
                Two parts. A one-off build price, quoted once the requirement is agreed, and then the normal{' '}
                <Link href="/pricing" className="text-primary hover:underline">per-instance pricing</Link>: each camera the detection runs on takes one detection instance, exactly as with the standard detections. Nothing about the rest of the account changes.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <div>
              <h2 className="font-display text-2xl font-bold">Where it runs</h2>
              <p className="mt-4 text-muted-foreground">
                In the cloud or on premises, the same choice as the rest of the{' '}
                <Link href="/platform/deployment-options" className="text-primary hover:underline">platform</Link>. A site that keeps its footage on its own servers can run a custom detection there too. The footage used to build the detection is deleted once the build is finished.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Identity</span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Facial recognition is a custom build, never a default</h2>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                None of the 23 standard detections identifies anyone.{' '}
                <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">Attribute extraction</Link> and{' '}
                <Link href="/ai-features/forensic-video-search" className="text-primary hover:underline">suspect search</Link> work on clothing, carried objects and timing, the details a witness would give, not on faces.
              </p>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Facial recognition exists only as a custom build, made on request for a customer that has the legal basis to use it. That basis is the customer&apos;s to establish: under the GDPR, facial images processed to identify a person are special-category biometric data, and in Illinois the Biometric Information Privacy Act requires notice and written consent before biometric identifiers are collected. Other places have their own rules.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16">
        <div className="mx-auto max-w-site px-6">
          <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Related</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { href: '/ai-features', title: 'The 23 standard detections', desc: 'What ships today, with the catalog of what each one catches.' },
              { href: '/platform/ai-architecture', title: 'AI architecture', desc: 'How the standard detections process video, layer by layer.' },
              { href: '/security-and-compliance', title: 'Security and compliance', desc: 'Encryption, access control and where footage is kept.' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group rounded-xl border border-border bg-card p-6 transition-all duration-normal hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <h3 className="font-display text-base font-bold transition-colors group-hover:text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
