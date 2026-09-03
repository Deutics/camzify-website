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
  title: "Heatmap Anomalies | AI Foot Traffic Pattern Software",
  description: "Camzify heatmap anomalies maps foot traffic patterns across a site and flags when a pattern looks unusual compared to the established baseline.",
  path: "/ai-features/heatmap-anomalies",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What is a heatmap anomaly?', answer: 'The system builds a baseline foot traffic pattern for each monitored area over time. An anomaly is a deviation from that baseline — unusual congestion, an empty zone that\'s normally busy, or unexpected activity in a low-traffic area — flagged for review rather than a single fixed rule.' },
  { question: 'How long before the baseline is accurate?', answer: 'The baseline improves as more traffic data accumulates for each zone. Early results reflect a smaller sample; accuracy improves over the first few weeks of continuous monitoring as normal patterns become established.' },
  { question: 'Is this a security feature or an operations feature?', answer: 'Both. Security teams use anomalies to flag unusual activity outside expected patterns, while operations teams use the same heatmap data for layout, staffing, and queue-management decisions.' },
  { question: 'Does an anomaly automatically trigger a security response?', answer: 'An anomaly is flagged for review in the notification queue with severity and acknowledgment status, the same as other alert types. Whether it prompts a security response, an operations look, or no action at all depends on the zone and context, which is why it\'s surfaced for a human decision rather than acted on automatically.' },
  { question: 'Can I exclude a known busy period, like a planned event, from anomaly detection?', answer: 'Each camera carries a notification window, so anomaly notifications can be limited to the hours that matter and a planned event or seasonal rush doesn\'t generate a flood of expected-but-flagged notifications. The detection itself keeps running; the window decides when it tells anyone.' },
  { question: 'How is this different from occupancy and peak hour trends?', answer: 'The two are complementary. Heatmap anomalies flags deviations from a zone\'s established baseline, while occupancy and peak hour trends tracks live counts and historical patterns for staffing and planning decisions. Anomalies answer "does this look unusual"; trends answer "when is this normally busy".' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Heatmap Anomalies' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Heatmap Anomalies</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            See where people really go. Heatmap anomalies maps foot traffic across a site and flags patterns
            that deviate from the established baseline — unusual congestion, empty zones, or unexpected activity.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Foot traffic congestion above the normal pattern for a zone</li>
                  <li className="flex gap-2">• Activity in a normally low-traffic area outside expected hours</li>
                  <li className="flex gap-2">• A monitored area sitting unusually empty during typically busy hours</li>
                  <li className="flex gap-2">• A visual heatmap overlay for layout and staffing decisions</li>
                  <li className="flex gap-2">• Zone-to-zone comparison to spot where traffic is shifting on a site</li>
                  <li className="flex gap-2">• Anomaly history reviewable alongside other site events</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="dashboard" caption="HEATMAP ANOMALIES" alt="Site floor plan overlaid with a colour-coded foot traffic heatmap highlighting an anomalous zone" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why heatmap anomalies matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Most foot traffic on a site is unremarkable — people moving through as expected, at roughly the volume you'd expect for the time of day. The interesting moments are the exceptions: a corridor that's suddenly congested, a normally busy lobby that's gone quiet, a back area with activity at an hour when nobody should be there. Those exceptions are easy to miss without something actively watching for them.</p>
                <p>A single fixed rule — "alert if more than N people are in this zone" — doesn't capture what "unusual" actually means for a given area, because normal varies by zone, by hour, and by day of week. A number that's alarming in a back corridor at 2am is completely ordinary in a lobby at lunchtime.</p>
                <p>Heatmap anomalies solves this by comparing current traffic against a baseline built specifically for each zone, rather than a single threshold applied everywhere. That's what lets it flag a real deviation instead of either missing it or flooding the queue with false alerts.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="BASELINE VS DEVIATION LOGIC" alt="Diagram showing current zone traffic compared against a learned baseline pattern before an anomaly is flagged" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building the baseline</h3>
                <p className="mt-2 text-muted-foreground">
                  Confirmed subject counts from <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link> are
                  aggregated per zone over time to build a baseline traffic pattern for each area of the site.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Detecting a deviation</h3>
                <p className="mt-2 text-muted-foreground">
                  Current traffic is continuously compared against that baseline. A deviation beyond the
                  configured threshold — in either direction — flags an anomaly with the affected zone and time window.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Where the data feeds</h3>
                <p className="mt-2 text-muted-foreground">
                  Heatmap data also feeds the platform's <Link href="/platform/analytics-and-reporting" className="text-primary hover:underline">analytics and reporting</Link> module
                  for trend review independent of any single anomaly.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Zones are marked on the camera view or site map. Each zone supports:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Zone boundaries marked on the camera view or site map</li>
                  <li className="flex gap-2">• Anomaly sensitivity threshold, configurable per zone</li>
                  <li className="flex gap-2">• Baseline learning period before anomaly flagging goes active</li>
                  <li className="flex gap-2">• Notification window per camera, e.g. notify in business hours only</li>
                  <li className="flex gap-2">• Per-camera instance licensing</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="ZONE & SENSITIVITY CONFIGURATION" alt="Configuration panel showing a monitored zone drawn on a site map with an anomaly sensitivity threshold control" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="dashboard" caption="ANOMALY REVIEW" alt="Dashboard view listing flagged heatmap anomalies by zone, time window, and deviation severity" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A retail aisle showing unusual congestion outside a promotional period</li>
                  <li className="flex gap-2">• A back-of-house corridor with unexpected foot traffic after closing</li>
                  <li className="flex gap-2">• A lobby sitting unusually empty during a normally busy morning window</li>
                  <li className="flex gap-2">• A queue forming in an area not designed for queuing, flagged for layout review</li>
                  <li className="flex gap-2">• A traffic pattern shift near a restricted-adjacent zone worth a security look</li>
                  <li className="flex gap-2">• A seasonal deviation from baseline that operations teams review before adjusting staffing</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Heatmap anomalies run as continuous background analytics rather than a per-camera checklist
                item during a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round,
                but a flagged anomaly at a patrolled site is visible alongside that site's patrol reports.
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
                  <Link href="/industries/education-facilities" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Education</Link>
                  <Link href="/industries/financial-services" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Financial Services</Link>
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/occupancy-and-peak-hour-trends" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Occupancy & Peak Hour Trends</Link>
                  <Link href="/ai-features/motion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Motion Detection</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/guard-tour-verification" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Guard Tour Verification</Link>
                  <Link href="/use-cases/incident-investigation" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Incident Investigation</Link>
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
