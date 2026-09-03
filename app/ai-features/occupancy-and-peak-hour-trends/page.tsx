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
  title: "Occupancy & Peak Hour Trends | AI Occupancy Analytics Software",
  description: "Camzify occupancy and peak hour trends identifies busiest hours and zones automatically from live camera counts, not guesswork.",
  path: "/ai-features/occupancy-and-peak-hour-trends",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How is occupancy counted?', answer: 'Confirmed subject counts from multi-object tracking are aggregated per camera or zone continuously, giving a live occupancy figure and a historical trend rather than a one-time manual count.' },
  { question: 'What can I do with peak hour data?', answer: 'Peak hour trends inform staffing schedules, cleaning and restocking windows, and space planning decisions — knowing exactly when a location is busiest removes the guesswork from those decisions.' },
  { question: 'Does this need separate people-counting hardware?', answer: 'No. It runs on the same connected cameras used for other detection features, with no dedicated people-counting sensors or turnstile hardware required.' },
  { question: 'How accurate is the occupancy count in busy areas?', answer: 'The count is built from confirmed subject tracks, which holds up well in moderately busy areas. In very dense crowds, individual tracks can be harder to separate, so figures are best read as a reliable trend indicator rather than an exact headcount at extreme density.' },
  { question: 'Can I compare occupancy across multiple zones or sites?', answer: 'Yes. Occupancy is tracked per camera or defined zone, so trends can be compared zone-by-zone within a site, or rolled up across a multi-site account for portfolio-level staffing and planning decisions.' },
  { question: 'How far back does historical trend data go?', answer: 'Historical trends build up continuously from the point tracking is enabled, with retention configurable per account — enough history to establish reliable day-of-week and hour-of-day patterns for staffing and planning decisions.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Occupancy & Peak Hour Trends' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Occupancy & Peak Hour Trends</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Know when it's busiest, plan around it. Occupancy and peak hour trends identifies the busiest hours
            and zones automatically from live camera counts, so staffing and planning decisions aren't guesswork.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability tracks:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Live occupancy counts per camera, zone, or site</li>
                  <li className="flex gap-2">• Historical peak-hour and peak-day trends over time</li>
                  <li className="flex gap-2">• Zone-by-zone comparison across a single site</li>
                  <li className="flex gap-2">• Trend data exportable for staffing and space-planning decisions</li>
                  <li className="flex gap-2">• Portfolio-level comparison across a multi-site account</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="dashboard" caption="OCCUPANCY & PEAK HOUR TRENDS" alt="Dashboard chart showing occupancy counts across a day with a highlighted peak-hour window" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why occupancy and peak hour trends matter</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Staffing, cleaning schedules, and restocking windows are usually set based on rough assumptions — "lunch is busy," "weekends are slower" — rather than actual measured data. Those assumptions drift over time as customer behavior changes, and nobody notices until a location is visibly understaffed during a rush or overstaffed during a lull.</p>
                <p>Dedicated people-counting sensors can answer this, but they mean new hardware, new installation, and another system to maintain — often not worth it just to answer a scheduling question.</p>
                <p>Occupancy and peak hour trends answers it using cameras that are already in place, turning live subject counts into a continuous, accurate picture of when and where a site is actually busiest.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="OCCUPANCY AGGREGATION" alt="Diagram showing live subject counts from multiple cameras aggregating into a site-wide occupancy trend" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Aggregating live counts</h3>
                <p className="mt-2 text-muted-foreground">
                  Confirmed subject counts from <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link> are aggregated continuously per camera or defined zone, building a live occupancy figure that updates in real time.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Building the trend line</h3>
                <p className="mt-2 text-muted-foreground">
                  Live counts accumulate into a historical trend broken down by hour of day and day of week, surfacing peak windows automatically rather than requiring a manual count or a separate people-counting sensor.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Where the data feeds</h3>
                <p className="mt-2 text-muted-foreground">
                  Occupancy data feeds the platform's <Link href="/platform/analytics-and-reporting" className="text-primary hover:underline">analytics and reporting</Link> module alongside <Link href="/ai-features/heatmap-anomalies" className="text-primary hover:underline">heatmap anomalies</Link> for a fuller picture of site activity.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Zones are marked on the camera view or site map for per-area occupancy tracking. Each account supports:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Zone boundaries for per-area occupancy tracking</li>
                  <li className="flex gap-2">• Reporting windows and comparison periods</li>
                  <li className="flex gap-2">• Notification window per camera: notifications only in the hours you set</li>
                  <li className="flex gap-2">• Per-camera instance licensing</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="OCCUPANCY ZONE SETUP" alt="Configuration panel showing occupancy tracking zones marked across a site floor plan" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="dashboard" caption="PEAK HOUR COMPARISON" alt="Dashboard comparing occupancy trends across multiple zones and sites over a week" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A retail store scheduling staff around measured lunch and weekend peaks</li>
                  <li className="flex gap-2">• A restaurant identifying its true busiest hours ahead of adding evening shifts</li>
                  <li className="flex gap-2">• A bank branch planning teller coverage around actual foot traffic patterns</li>
                  <li className="flex gap-2">• A campus facility comparing occupancy across buildings for space planning</li>
                  <li className="flex gap-2">• A property manager tracking common-area usage trends across a portfolio</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Occupancy tracking runs as continuous background analytics rather than a per-camera checklist
                item during a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round,
                but occupancy trends for a patrolled site are visible alongside that site's patrol reports.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Industries using this</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/retail" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
                  <Link href="/industries/restaurants" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Restaurants</Link>
                  <Link href="/industries/financial-services" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Financial Services</Link>
                  <Link href="/industries/education-facilities" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Education</Link>
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/heatmap-anomalies" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Heatmap Anomalies</Link>
                  <Link href="/ai-features/multi-object-tracking" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multi-Object Tracking</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/guard-tour-verification" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Guard Tour Verification</Link>
                  <Link href="/use-cases/after-hours-monitoring" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">After-Hours Monitoring</Link>
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
