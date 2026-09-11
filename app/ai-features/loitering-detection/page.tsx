import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { FeatureHero } from '@/components/content/feature-hero';
import { PhotoFigure } from '@/components/content/photo-figure';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Loitering Detection | In Development",
  description: "Loitering detection is in development at Camzify. Configurable dwell-time thresholds will distinguish brief visits from lingering subjects.",
  path: "/ai-features/loitering-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Is loitering detection available today?', answer: 'No. It is in development and marked as such on the roadmap. The page describes what it will do and does not claim it as a current capability.' },
  { question: 'What will it detect?', answer: 'A tracked person remaining inside a defined zone beyond a dwell time you set, which is different from presence: a person walking through does not qualify, a person waiting does.' },
  { question: 'What can I use for that scenario now?', answer: 'Zone intrusion detection with a notification window, and automated patrol rounds with scene observation, which watch a scene for a short period rather than judging one frame. The risk detection page covers the round side.' },
  { question: 'Will it need new cameras or licences?', answer: 'It will run on the same cameras and be licensed per camera instance like every other detection. We will not publish a date until it ships.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Loitering Detection' },
    ]}>
      <FeatureHero
        eyebrow="In development · AI detection"
        title="Loitering detection"
        lede={<><strong className="font-semibold text-foreground">Loitering detection is an in-development feature that will detect subjects who remain in a defined area beyond a configurable dwell-time threshold.</strong> Brief entries will be ignored; lingering subjects will escalate an alert. Until this feature ships, zone intrusion detection covers many of the same scenarios by alerting on any entry into a restricted zone.</>}
        facts={['On the roadmap, not yet in production', 'Dwell time in a zone, not just presence', 'Will run on the same cameras and account']}
        primary={{ href: '/roadmap', label: 'See the roadmap' }}
        secondary={{ href: '/ai-features', label: 'Detections available today' }}
        visual={<PhotoFigure src="/feature-loitering-detection-1.webp" alt="The console live view with a loitering alert drawn on the camera frame" priority />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <div className="rounded-xl border border-warn/30 bg-warn/5 p-6">
            <p className="text-sm text-warn">
              This feature is on the roadmap and not yet available in production. For current detection capabilities, see our <Link href="/ai-features" className="text-warn underline">live detection features</Link>.
            </p>
          </div>
          <div className="mt-12 max-w-prose">
                <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
                <p className="mt-4 text-muted-foreground">
                  During a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round,
                  alerts from this detection model contribute to the compliance assessment at each camera stop
                  and are logged in the patrol report.
                </p>
              </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">Related</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/ai-features" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">All AI Features</Link>
              <Link href="/virtual-patrolling" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Virtual Patrolling</Link>
              <Link href="/industries/warehouses" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Warehouses</Link>
              <Link href="/industries/retail" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
              <Link href="/use-cases/perimeter-security" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Perimeter Security</Link>
              <Link href="/pricing" className="rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Pricing</Link>
            </div>
          </div>
        </div>
      </section>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
