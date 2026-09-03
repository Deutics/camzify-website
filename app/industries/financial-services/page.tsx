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
  title: "AI Security for Financial Services | Video Surveillance",
  description: "Camzify provides AI-powered virtual patrolling and video analytics for financial services — automated patrols, real-time alerts, and compliance reports.",
  path: "/industries/financial-services",
};

export const metadata = generatePageMeta({ ...pageMeta });

const deploymentPhases = [
    { title: "Start with the vault and ATM line", body: "Cash-handling rooms, ATM enclosures, server rooms and after-hours entrances are onboarded first, since these carry both the security and the regulatory weight." },
    { title: "Verify closing procedure every night", body: "The end-of-day sequence checks that each secured area is closed and clear, producing an independent record of the closing routine rather than relying on a signed sheet." },
    { title: "Standardize across the branch network", body: "One approved sequence is applied to every branch through multi-site management, so compliance reporting is comparable across locations rather than branch-specific." },
];

const faqs = [
  { question: "Does Camzify provide audit-ready reports?", answer: "Yes. Every patrol round generates a timestamped compliance report showing what was checked, the result, and the camera snapshot. Reports are exportable as PDF." },
  { question: "Can it monitor ATM vestibules?", answer: "Yes. Zone detection on ATM-area cameras can alert on presence during closed hours or when the vestibule should be empty." },
  { question: "How long does setup take for a branch or vault facility?", answer: "Most single-branch deployments are configured within a few days once camera access is confirmed. Zones, patrol routes, and alert routing are set up per site, so a multi-branch rollout is typically staged branch by branch rather than all at once." },
  { question: "How does Camzify handle false positives in busy teller or lobby areas?", answer: "Zones and detection sensitivity are tuned per camera, so high-traffic customer areas can be excluded or set to a looser threshold while vaults, back offices, and after-hours zones stay strict. Multi-Object Tracking also helps distinguish routine foot traffic from an actual zone breach." },
  { question: "Does Camzify store or process customer transaction data?", answer: "No. Camzify operates on the video feed for security monitoring only — it does not connect to teller systems, core banking platforms, or transaction records. Scope of camera coverage is defined by your team during setup." },
  { question: "How does this compare to adding overnight guards at a branch?", answer: "Virtual patrolling covers every camera on a fixed schedule and produces a timestamped record for each round, at a fraction of the cost of stationing a guard at each location overnight. Most branches use it to close the after-hours gap rather than replace daytime staff entirely." },
];

export default function FinancialServicesPage() {
  return (
    <PageShell {...pageMeta} schema={[serviceSchema({ name: "AI Security for Financial Services", description: "Camzify provides AI-powered virtual patrolling and video analytics for financial services — automated patrols, real-time alerts, and compliance reports.", path: "/industries/financial-services", audience: "Financial Services" })]} faqs={faqs} breadcrumbs={[
      { label: 'Industries', href: '/industries' },
      { label: 'Financial Services' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI Security for Financial Services</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Financial services face security challenges that cameras alone cannot solve and manned guards cannot cover consistently. Camzify's <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> system runs automated AI patrol rounds on your existing cameras — checking every point, flagging failures, and notifying the right person.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common financial services security gaps Camzify closes:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Vault corridors and cash-handling areas left unchecked between staffed hours</li>
                  <li className="flex gap-2">• ATM vestibules with no continuous after-hours monitoring</li>
                  <li className="flex gap-2">• Branch perimeters relying on a single closing-time walk-through</li>
                  <li className="flex gap-2">• Server rooms and records storage without zone-level access verification</li>
                  <li className="flex gap-2">• Camera outages going unnoticed until an incident is already reported</li>
                  <li className="flex gap-2">• No timestamped audit trail proving a compliance check actually occurred</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="industry" caption="FINANCIAL SERVICES" alt="Security monitoring in a financial services environment" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why financial services needs continuous AI monitoring</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Branches and back-office facilities hold a mix of cash, records, and restricted infrastructure, but staffing thins out well before the building is actually empty — closing procedures, overnight hours, and weekend closures all leave vaults, ATMs, and server rooms with far less oversight than the risk they carry would suggest.</p>
                <p>A guard walking a closing round checks each area once; a fixed CCTV system records everything but reviews none of it until someone asks for the footage after the fact. Neither approach catches a vault corridor breach or an ATM vestibule left occupied after hours while it is still happening.</p>
                <p>Financial institutions also carry real audit and regulatory expectations around demonstrating that security checks took place, not just that cameras were recording. Continuous AI patrolling closes both gaps at once — a documented, timestamped check of every zone on a fixed schedule, with an immediate alert the moment something fails, rather than a record that only gets reviewed after a loss has already happened.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Three questions financial services security teams ask</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Is the vault corridor clear right now?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Has the ATM vestibule been checked in the last 30 minutes?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera Tampering Detection</Link> and automated patrol verification.</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow">
                  <p className="font-display text-lg font-bold italic">"Were all branch perimeter cameras verified overnight?"</p>
                  <p className="mt-3 text-sm text-muted-foreground">Camzify answers this with <Link href="/ai-features/motion-detection" className="text-primary hover:underline">Motion Detection</Link> and automated patrol verification.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="FINANCIAL SERVICES PATROL SEQUENCE" alt="Diagram of a financial services patrol route stepping through the vault, ATM vestibule, and branch perimeter" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How Camzify works for financial services</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the patrol route</h3>
                <p className="mt-2 text-muted-foreground">
                  A patrol sequence is set up once, ordering every camera stop — vault corridor, ATM vestibule, teller line, branch perimeter — into a single route that runs on a configurable schedule.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Checking each stop</h3>
                <p className="mt-2 text-muted-foreground">
                  At each stop, the AI checks the defined conditions for that camera using <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone Intrusion Detection</Link> and <Link href="/ai-features/motion-detection" className="text-primary hover:underline">Motion Detection</Link> — is the vault area clear, is the vestibule empty, is the camera unobstructed.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Routing the alert</h3>
                <p className="mt-2 text-muted-foreground">
                  A failed check creates an actionable alert with a snapshot and timestamp, routed to the assigned security contact, and logged alongside every other result in that round's patrol report.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">What to configure for a financial services site</h2>
                <p className="mt-4 text-muted-foreground">Most financial services deployments start with:</p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Restricted zones over the vault corridor, cash room, and server room</li>
                  <li className="flex gap-2">• ATM vestibule zones with after-hours presence alerting</li>
                  <li className="flex gap-2">• Branch perimeter and entrance rules covering opening and closing windows</li>
                  <li className="flex gap-2">• After-hours patrol frequency, typically every 30-60 minutes overnight</li>
                  <li className="flex gap-2">• Escalation routing to the branch security contact or regional operations center</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="FINANCIAL SERVICES ZONE SETUP" alt="Configuration panel showing vault and ATM vestibule zones mapped across a branch camera layout" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="camera-feed" caption="FINANCIAL SERVICES PATROL IN PROGRESS" alt="Camera feed showing an active patrol check at a bank branch vault corridor" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Someone lingering in the ATM vestibule well outside normal hours</li>
                  <li className="flex gap-2">• A vault corridor door left ajar after the closing procedure</li>
                  <li className="flex gap-2">• A branch entrance accessed before opening or after closing time</li>
                  <li className="flex gap-2">• A camera covering a cash-handling area losing focus or going dark</li>
                  <li className="flex gap-2">• Unusual presence in the server room or records storage overnight</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Deployment notes</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">Financial services environments demand high-reliability monitoring with comprehensive audit trails. Camzify's patrol compliance records, timestamped verifications, and exportable reports meet regulatory and audit requirements.</p>
            </ScrollReveal>
          </div>

          <DeploymentPlan phases={deploymentPhases} />

          <div className="mt-12">
            <ScrollReveal>
              <p className="text-muted-foreground">
                See how the numbers work for your financial services facility with the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or review <Link href="/pricing" className="text-primary hover:underline">pricing</Link> to understand the per-camera licensing model.
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
                  <Link href="/use-cases/unauthorized-access-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Unauthorized Access Detection</Link>
                  <Link href="/use-cases/guard-tour-verification" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Guard Tour Verification</Link>
                  <Link href="/use-cases/night-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Night Security</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related industries</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                  <Link href="/industries/retail" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
                  <Link href="/industries/multiple-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multiple Sites</Link>
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
