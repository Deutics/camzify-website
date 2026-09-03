import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { FeatureHero } from '@/components/content/feature-hero';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import { SectionVisual } from '@/components/content/section-visual';
import { ComparisonTable } from '@/components/content/comparison-table';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Virtual Patrolling vs Security Guards",
  description: "Virtual patrolling compared with manned guards on cost, coverage, consistency, audit trail and scale, including where guards are still needed.",
  path: "/virtual-patrolling/vs-security-guards",
};

export const metadata = generatePageMeta({ ...pageMeta });

const rows = [
  { feature: 'Coverage hours', camzify: '24/7/365', competitor: '8–12h per shift', traditional: false },
  { feature: 'Fatigue and human error', camzify: 'None', competitor: 'Significant after 2h', traditional: '-' },
  { feature: 'Consistency between rounds', camzify: 'Identical every time', competitor: 'Varies by individual', traditional: '-' },
  { feature: 'Timestamped audit trail', camzify: true, competitor: 'Partial (sign-in sheets)', traditional: false },
  { feature: 'Per-item compliance record', camzify: true, competitor: false, traditional: false },
  { feature: 'Automatic guard notification', camzify: true, competitor: false, traditional: false },
  { feature: 'PDF report per round', camzify: true, competitor: false, traditional: false },
  { feature: 'Scales across sites', camzify: 'Add cameras', competitor: 'Hire more guards', traditional: '-' },
  { feature: 'Physical response capability', camzify: 'Requires guard on call', competitor: true, traditional: false },
  { feature: 'Monthly cost per site', camzify: 'Quoted per camera', competitor: '$3,000–$8,000+', traditional: '-' },
];

const faqs = [
  { question: 'Does virtual patrolling replace security guards entirely?', answer: 'It replaces the routine patrol round — the repetitive walk-and-check that occupies most of a guard\'s shift. Guards are still needed for physical response, visitor management, and access control. Virtual patrolling removes the patrol cost, not the security function.' },
  { question: 'What if a camera is down during a patrol?', answer: 'The system logs the camera as unreachable and marks the checklist items as unable to verify. This appears in the patrol report. Camera health monitoring runs separately and alerts on connectivity issues.' },
  { question: 'Can virtual patrolling work alongside existing guards?', answer: 'Yes. Many operations use virtual patrolling for the overnight and after-hours rounds, while keeping a guard on-site during business hours. The patrol report gives the guard supervisor a compliance record for every shift.' },
  { question: 'Does switching to virtual patrolling create insurance or liability issues?', answer: 'It shouldn\'t, but it\'s worth confirming with your insurer and your site\'s risk policy before switching. Many operations find the timestamped, per-item audit trail actually strengthens their liability position compared to a sign-in sheet, since there is a clear record of exactly what was checked and when.' },
  { question: 'Are there union or contractual issues with replacing guard hours?', answer: 'That depends entirely on your existing contracts and any collective bargaining agreements in place — this is a question for your legal or HR team, not something Camzify can answer generically. Many sites avoid the issue by using virtual patrolling to cover hours that were not previously staffed, rather than replacing existing guard shifts outright.' },
  { question: 'How quickly can a site pilot virtual patrolling alongside existing guards?', answer: 'Since virtual patrolling runs on top of your existing cameras and does not require removing any current guarding, a pilot can run in parallel with guards already on-site. This lets a site compare the two side by side before making any change to guard staffing.' },
];

export default function VsSecurityGuardsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Virtual Patrolling', href: '/virtual-patrolling' },
      { label: 'vs Security Guards' },
    ]}>
      <FeatureHero
        eyebrow="Head-To-Head Comparison"
        title="Virtual patrolling vs security guards"
        lede={<><Link href="/virtual-patrolling" className="text-primary hover:underline">Virtual patrolling</Link> and manned guarding
            solve the same problem — ensuring every checkpoint on a site is checked regularly and failures are
            acted on. The difference is cost, consistency, and auditability. This page compares them honestly,
            including where guards still win.</>}
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/roi-calculator', label: 'Run your own numbers' }}
        visual={<HeroPlaceholder label="Blended model · Perimeter round" alt="Camzify console illustrating virtual patrolling vs security guards" />}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">


          <div className="mt-12">
            <ScrollReveal>
              <ComparisonTable
                rows={rows}
                columns={['Dimension', 'Camzify Virtual Patrolling', 'Manned Security Guards', 'No Patrolling']}
              />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Honest Limits</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Where guards still win</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Physical response. If a trespasser is on-site, a camera can detect and notify — but it cannot
                physically intervene. Operations that require immediate physical presence (hospital A&E, high-value
                retail, active construction sites) will still need a response capability, whether that is an on-site
                guard, a mobile patrol unit, or local police.
              </p>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                The strongest deployment model is both: virtual patrolling handles the repetitive rounds at a fraction
                of the cost, and a guard-on-call handles the physical exceptions. The patrol report tells the guard
                exactly what failed and where, so response time drops from hours to minutes.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">The blended model</h2>
                <p className="mt-4 text-muted-foreground">
                  Virtual patrolling and a guard-on-call are not competing options — they cover different halves of the
                  same job. The AI runs every routine round, on schedule, without missing a checkpoint.
                </p>
                <p className="mt-4 text-muted-foreground">
                  When a checklist item comes back Not Compliant, the assigned guard is notified immediately and steps
                  in for exactly the situations that need a physical presence, instead of walking every round in person.
                </p>
                {/*
                  This page argues from the end user's side. A guarding company reading it is
                  being told its own model is the problem, so it needs the other door — the
                  same product sold as something an agency provides rather than something
                  done to it.
                */}
                <p className="mt-4 text-muted-foreground">
                  <strong className="font-semibold text-foreground">Running a security agency?</strong>{' '}
                  This is a service to sell rather than a cost to cut &mdash; overnight coverage
                  across every client site, with a report per client, alongside the guards you
                  already provide. See{' '}
                  <Link href="/partners/for-security-agencies" className="text-primary hover:underline">Camzify for security agencies</Link>.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <SectionVisual variant="flow" caption="Blended Patrol Model" alt="Diagram showing virtual patrolling handling routine rounds and a guard-on-call responding to flagged exceptions" steps={['AI runs every routine round', 'A check fails', 'Guard dispatched to that stop', 'Round and response recorded']} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <span className="font-mono text-mono-sm uppercase text-primary">Run The Numbers</span>
              <h2 className="mt-2 font-display text-2xl font-bold">Cost comparison</h2>
              <p className="mt-4 text-muted-foreground">
                Use the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link> to
                compare your current guarding costs against Camzify for your specific site configuration. For
                detailed guard cost data, see our guide on{' '}
                <Link href="/guides/security-guard-cost-per-hour" className="text-primary hover:underline">security guard cost per hour</Link>.
              </p>
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
              <Link href="/pricing" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Pricing <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/roi-calculator" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">ROI Calculator <ArrowRight className="h-3 w-3" /></Link>
              <Link href="/guides/security-guard-cost-per-hour" className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:border-primary/30 hover:text-primary">Guard Cost Guide <ArrowRight className="h-3 w-3" /></Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
