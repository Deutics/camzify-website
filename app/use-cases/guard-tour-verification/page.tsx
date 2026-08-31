import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Guard Tour Verification | Guard Tour System",
  description: "Verify guard tour compliance with AI-powered patrol tracking. Camzify confirms whether guards completed their rounds and what they found. Book a demo.",
  path: "/use-cases/guard-tour-verification",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: "Does this replace guard tour systems like PIPE or Trackforce?", answer: "It can. Camzify verifies the condition at each checkpoint rather than just the guard's physical presence. For many facilities, this provides a more reliable compliance record than NFC-tag-based systems." },
  { question: "Can guards use the system alongside their physical rounds?", answer: "Yes. Virtual patrols can run independently, verifying the same checkpoints the guard is supposed to check. This provides a cross-reference between the guard's report and the AI assessment." },
  { question: "What does the compliance report include?", answer: "Each patrol round generates a report showing every checkpoint, the AI assessment (compliant or flagged), the timestamp, and the camera snapshot. Reports are exportable as PDF and stored in the patrol log." },
];

export default function GuardTourVerificationPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "Guard Tour Verification", description: "Verify guard tour compliance with AI-powered patrol tracking. Camzify confirms whether guards completed their rounds and what they found. Book a demo.", path: "/use-cases/guard-tour-verification" })]} faqs={faqs} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Guard Tour Verification' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Guard Tour Verification</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Guard tour verification is the process of confirming that a security guard completed their assigned patrol route, checked every point, and documented what they found. It is the accountability layer that most guard tour systems promise but few deliver reliably.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Why conventional CCTV fails</h2>
                <p className="mt-4 max-w-prose text-muted-foreground">Traditional guard tour systems use NFC tags or QR codes that guards scan at each checkpoint. This confirms the guard was physically present, but not that they actually looked at what they were supposed to check. A guard can tap a tag and walk past without verifying anything.</p>
              </div>
            </ScrollReveal>
            <Image
              src="/guard-tour-verification.jpg" alt="A guard reviewing an AI-verified patrol route on a tablet, with a route map and checkpoint markers overlaid on a campus at night" className="w-full rounded-xl"
              width={1229}
              height={692}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How Camzify handles it</h2>
              <div className="mt-4 max-w-prose text-muted-foreground" dangerouslySetInnerHTML={{ __html: `Camzify verifies the condition, not just the presence. <a href="/virtual-patrolling" class="text-primary hover:underline">Virtual patrol</a> rounds check what the camera sees at each point — is the door closed, is the area clear, is the fence line intact — independently of whether a guard is present. This creates a compliance record that is verifiable, timestamped, and audit-ready.` }} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">What a patrol round looks like</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">A guard tour verification patrol runs in parallel with or instead of the physical guard round. Each camera in the patrol sequence checks the same conditions the guard is supposed to verify. Discrepancies between the AI assessment and the guard's report are flagged automatically.</p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Detections that power this</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Zone Intrusion Detection</p>
                </Link>
                <Link href="/ai-features/camera-tampering-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Camera Tampering Detection</p>
                </Link>
                <Link href="/ai-features/motion-detection" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Motion Detection</p>
                </Link>
                <Link href="/ai-features/multi-object-tracking" className="rounded-lg bg-card p-4 shadow transition-shadow hover:shadow-md">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary">Live</span>
                  <p className="mt-1 font-display font-bold">Multi-Object Tracking</p>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Industries where this applies</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/industries/property-management" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Property Management</Link>
                <Link href="/industries/healthcare" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Healthcare</Link>
                <Link href="/industries/financial-services" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Financial Services</Link>
                <Link href="/industries/warehouses" className="rounded-full bg-card px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md">Warehouses</Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-20">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
