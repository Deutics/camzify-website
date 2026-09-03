import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "PPE Violation Detection | AI Safety Compliance Camera Software",
  description: "Camzify PPE violation detection automatically flags missing helmets, vests, or gloves against your site\\'s required safety gear policy.",
  path: "/ai-features/ppe-violation-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What PPE types can be detected?', answer: 'The model checks for commonly required personal protective equipment — hard hats, high-visibility vests, and gloves — against the policy configured for each zone or camera. Required PPE types can differ by area, for example a warehouse floor versus an office space within the same site.' },
  { question: 'Can requirements differ by zone?', answer: 'Yes. PPE requirements are configured per camera or zone, so a loading dock can require hard hats and vests while an adjacent office area requires none, without separate cameras or hardware.' },
  { question: 'Does this replace a safety officer?', answer: 'No. It is a continuous compliance check that flags violations for a safety officer or supervisor to act on, producing a timestamped record for audits and incident reviews rather than replacing human safety oversight.' },
  { question: 'How accurate is detection, and what about false positives?', answer: 'Every alert includes a confidence score and a timestamped clip of the moment the missing item was identified, so a reviewer can confirm at a glance before acting. Partial occlusion — a hard hat briefly out of frame, for instance — is weighed against the confirmed track rather than a single frame, which keeps momentary visibility gaps from generating a flood of alerts.' },
  { question: 'How long does it take to set up PPE requirements for a new site?', answer: 'Configuration is zone-based rather than hardware-based: required PPE types are set per camera or zone in the configuration panel, so a new site is a matter of defining zones and policies rather than installing dedicated sensors.' },
  { question: 'Does this need special cameras or hardware?', answer: 'No. PPE violation detection runs on the same camera feeds already used for other Camzify detections, so a site does not need dedicated PPE-scanning hardware at entrances or checkpoints.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'PPE Violation Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">PPE Violation Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Safety gear, verified automatically. PPE violation detection checks every confirmed person in frame
            against the required personal protective equipment for that zone, flagging missing helmets, vests,
            or gloves the moment they're spotted.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Missing hard hats in zones where head protection is required</li>
                  <li className="flex gap-2">• Missing high-visibility vests on active work floors</li>
                  <li className="flex gap-2">• Missing gloves in zones handling hazardous materials or equipment</li>
                  <li className="flex gap-2">• Missing safety glasses or hearing protection where the zone policy requires them</li>
                  <li className="flex gap-2">• Partial compliance, such as a vest present but a hard hat missing</li>
                  <li className="flex gap-2">• A timestamped compliance record per zone for safety audits</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="camera-feed" caption="PPE VIOLATION DETECTION" alt="Camera view of a work floor with a worker missing required PPE highlighted" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why PPE violation detection matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Most sites enforce PPE policy through a supervisor walking the floor, a badge-in checklist, or a spot check at shift start. All three share the same gap: they only capture compliance at the moment someone is looking. A worker who removes a hard hat five minutes after a walkthrough, or who never puts one on between checks, goes unrecorded until an incident forces the question.</p>
                <p>Spot checks also change behavior in ways that make the data unreliable. Workers who know a supervisor is due tend to be compliant when it counts and lapse the rest of the shift — the classic problem with any periodic, human-driven check on a continuous risk. On a large site with multiple entry points and rotating crews, it is not realistic for a safety officer to be everywhere at once anyway.</p>
                <p>Continuous AI monitoring closes that gap by checking every confirmed person against zone policy for as long as the camera is running, not just when someone happens to walk past. That turns PPE compliance from a periodic snapshot into a continuous record — and gives the safety officer a queue of confirmed violations to act on instead of a floor to patrol.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="PPE POLICY CHECK" alt="Diagram showing a tracked person checked against a zone's required PPE list before an alert fires" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Checking against zone policy</h3>
                <p className="mt-2 text-muted-foreground">
                  Every confirmed person tracked by <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link> is
                  checked against the PPE requirements configured for that camera's zone, so the same site can enforce different rules in different areas without separate hardware.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Identifying missing items</h3>
                <p className="mt-2 text-muted-foreground">
                  <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">AI attribute extraction</Link> identifies
                  which required items are present or missing on each person. A missing-item match fires an alert with the person's location, the missing PPE type, and a timestamped clip for the safety officer to review.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alert delivery</h3>
                <p className="mt-2 text-muted-foreground">
                  Alerts route through the platform's <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification system</Link> and
                  can be filtered by zone for daily compliance review, so a safety officer can work through violations by area rather than sorting through a single mixed feed.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  PPE requirements are set per zone or camera in the configuration panel. Each zone supports:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Required PPE types — hard hat, vest, gloves, glasses, hearing protection</li>
                  <li className="flex gap-2">• Partial vs. full compliance handling, e.g. one missing item vs. several</li>
                  <li className="flex gap-2">• Schedule-based activation, e.g. shift hours only</li>
                  <li className="flex gap-2">• Per-camera instance licensing</li>
                  <li className="flex gap-2">• Zone-based alert filtering for daily compliance review</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="PPE ZONE CONFIGURATION" alt="Configuration panel showing required PPE types assigned to a camera zone" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="SITE-WIDE PPE COMPLIANCE" alt="Facility map showing different PPE zone policies across a construction site" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A construction site entrance where every worker crossing into the active zone is checked for hard hat and vest</li>
                  <li className="flex gap-2">• A warehouse forklift lane where a missing high-visibility vest triggers an immediate alert</li>
                  <li className="flex gap-2">• A chemical handling area where missing gloves are flagged regardless of time of day</li>
                  <li className="flex gap-2">• A manufacturing floor where hearing protection is required near heavy machinery</li>
                  <li className="flex gap-2">• A loading dock where partial compliance — vest present, hard hat missing — is logged separately from full non-compliance</li>
                  <li className="flex gap-2">• A multi-zone facility where office areas carry no PPE requirement while the adjacent production floor requires full gear</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                During a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round,
                PPE compliance at each monitored zone contributes to the compliance assessment at that camera
                stop and is logged alongside the checklist results in the patrol report.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Industries using this</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/manufacturing" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Manufacturing</Link>
                  <Link href="/industries/construction-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Construction Sites</Link>
                  <Link href="/industries/energy" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Energy</Link>
                  <Link href="/industries/warehouses" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Warehouses</Link>
                  <Link href="/industries/waste-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Waste Management</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion</Link>
                  <Link href="/ai-features/ai-attribute-extraction" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">AI Attribute Extraction</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/loading-dock-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Loading Dock Monitoring</Link>
                  <Link href="/use-cases/perimeter-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Perimeter Security</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
          <div className="mx-auto mt-8 max-w-3xl text-left">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
