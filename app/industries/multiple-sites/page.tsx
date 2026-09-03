import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { DeploymentPlan } from '@/components/content/deployment-plan';
import { PlaceholderVisual } from '@/components/content/placeholder-visual';
import { FAQAccordion } from '@/components/content/faq-accordion';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "AI Security for Multiple Sites | Video Surveillance",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for multiple sites — automated patrols, real-time alerts, and compliance reports.",
  path: "/industries/multiple-sites",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Standardize one sequence first", body: "A single site is configured and tuned into an approved template — camera order, checklist wording and escalation contacts — before anything is rolled out more widely." },
    { title: "Replicate and delegate", body: "The template is applied across the estate, with permission groups giving each local contact access to their own site while regional managers retain the combined view." },
    { title: "Compare compliance across locations", body: "Because every site runs an identical checklist, round-completion and compliance percentages become directly comparable, which is what surfaces the underperforming location." },
];

const faqs = [
  { question: "Is there a limit to how many sites Camzify can manage?", answer: "No practical limit. The platform is designed for multi-site operations, with centralized management, site-specific patrol configurations, and cross-site analytics." },
  { question: "Can different sites have different patrol schedules?", answer: "Yes. Each site has its own patrol sequences, checklists, schedules, and alert routing — all managed from the central dashboard." },
  { question: "How long does it take to onboard a new site into an existing account?", answer: "Once camera access is confirmed for the new site, zones and a patrol route are typically configured within a few days and added to the existing dashboard alongside your other locations, without disrupting patrols already running elsewhere." },
  { question: "Does detection accuracy vary between sites with different camera hardware?", answer: "Camzify works with any IP camera feed, but zone boundaries and detection sensitivity are tuned per camera during setup, so a site with older or lower-resolution cameras can be configured with thresholds appropriate to that hardware rather than a one-size-fits-all setting." },
  { question: "Can reporting be split out per site for local compliance or franchise requirements?", answer: "Yes. Patrol reports and compliance records are generated per site, so a franchise or regional operator can produce a location-specific report while still having a consolidated view across the full portfolio." },
  { question: "How does centralized virtual patrolling compare to managing separate guarding contracts per site?", answer: "Separate guarding contracts across many locations tend to produce inconsistent coverage and make it hard to compare one site against another. Centralized virtual patrolling runs the same scheduled checks and reporting format across every site from one dashboard, so gaps and patrol failures are visible portfolio-wide instead of buried in separate vendor reports." },
];

export default function MultipleSitesPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Multiple Sites", description: "Camzify provides AI-powered virtual patrolling and video analytics for multiple sites — automated patrols, real-time alerts, and compliance reports.", path: "/industries/multiple-sites", audience: "Multiple Sites" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Multiple Sites' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Security for Multiple Sites</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Multi-site operators face security challenges that cameras alone cannot solve and manned guards cannot cover consistently. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system runs automated AI patrol rounds on your existing cameras — checking every point, flagging failures, and notifying the right person.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common multi-site security gaps Camzify closes:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Inconsistent patrol coverage across locations run by different local teams</li>
                  <li className="flex gap-2">• No centralized visibility into which sites had checks completed overnight</li>
                  <li className="flex gap-2">• Camera outages at remote sites going unnoticed for days</li>
                  <li className="flex gap-2">• Alert routing that doesn't reach the right contact for each location</li>
                  <li className="flex gap-2">• No standardized audit trail across the portfolio</li>
                  <li className="flex gap-2">• Difficulty scaling guarding coverage as new sites are added</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="industry" caption="MULTIPLE SITES" alt="Security monitoring in a multiple sites environment" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why multi-site operations need continuous AI monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Running security across many locations usually means stitching together separate guarding contracts, inconsistent camera systems, and local teams who each handle checks their own way. What counts as a completed patrol at one site may be a quick glance at another.</p>
                <p>A regional security manager reviewing that patchwork after the fact has no easy way to tell which sites are actually being checked consistently and which are relying on assumption. A camera going offline at a remote location can go unnoticed for days if no one is specifically watching for it.</p>
                <p>Continuous AI monitoring standardizes the patrol itself — the same scheduled checks, the same reporting format, and the same alert routing logic applied across every site from one dashboard — so gaps show up immediately instead of being discovered during an incident review.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions multiple sites security teams ask</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Are all 50 locations secure right now?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Which sites had patrol failures last night?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera Tampering Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Can one team manage security across all branches?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/motion-detection" className="text-primary hover:underline">Motion Detection</Link> and automated patrol verification.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="MULTI-SITE PATROL SEQUENCE" alt="Diagram of patrol rounds running across multiple sites into a single centralized dashboard" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for multiple sites</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the patrol route</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once per site, ordering every camera stop for that location into a route that runs on a configurable schedule — with every site's routes visible from the same central dashboard.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop, the AI checks the defined conditions for that camera using <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and <Link href="/ai-features/motion-detection" className="text-primary hover:underline">Motion Detection</Link> — is the area clear, is the boundary intact, is the camera unobstructed — using the same logic regardless of which site the camera belongs to.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Routing the alert</h3>
                <p className="mt-2 text-muted-foreground">
                  A failed check creates an actionable alert with a snapshot and timestamp, routed to the assigned contact for that specific site, and logged alongside every other result in that round's patrol report.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">What to configure for a multi-site rollout</h2>
                <p className="mt-4 text-muted-foreground">Most multi-site deployments start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Per-site zones and patrol routes tailored to each location's layout</li>
                  <li className="flex gap-2">• Site-specific alert routing to the correct local or regional contact</li>
                  <li className="flex gap-2">• A consistent patrol schedule template applied across comparable site types</li>
                  <li className="flex gap-2">• Role-based dashboard access for regional managers versus individual site staff</li>
                  <li className="flex gap-2">• Consolidated reporting for portfolio-wide compliance review</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="MULTI-SITE DASHBOARD SETUP" alt="Configuration panel showing patrol zones and schedules managed across several sites from one dashboard" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="camera-feed" caption="MULTI-SITE PATROL IN PROGRESS" alt="Camera feed showing an active patrol check running as part of a multi-site monitoring rollout" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• One location's patrol reports showing repeated failures compared to the rest of the portfolio</li>
                  <li className="flex gap-2">• A camera going offline at a remote site with no local staff to notice</li>
                  <li className="flex gap-2">• A new site added mid-quarter needing zones configured before go-live</li>
                  <li className="flex gap-2">• A regional manager needing a single report covering every site for a board review</li>
                  <li className="flex gap-2">• After-hours activity flagged at a site outside normal business hours</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Deployment notes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Multi-site operations benefit most from Camzify's centralized dashboard, consistent patrol scheduling, and cross-site reporting. One security team can oversee all locations with site-specific configurations.</p>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your multiple sites facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-camera licensing model.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">AI Features used here</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion</Link>
                  <Link href="/ai-features/camera-tampering-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Camera Tampering</Link>
                  <Link href="/ai-features/motion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Motion Detection</Link>
                  <Link href="/ai-features/multi-object-tracking" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multi-Object Tracking</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/after-hours-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">After-Hours Monitoring</Link>
                  <Link href="/use-cases/guard-tour-verification" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Guard Tour Verification</Link>
                  <Link href="/use-cases/night-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Night Security</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related industries</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/remote-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Remote Sites</Link>
                  <Link href="/industries/retail" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
                  <Link href="/industries/financial-services" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Financial Services</Link>
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
