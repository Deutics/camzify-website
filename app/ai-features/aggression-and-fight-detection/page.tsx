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
  title: "Aggression & Fight Detection | AI Violence Detection Software",
  description: "Camzify aggression and fight detection flags physical altercations the moment they start, routing an alert to security before someone reviews the footage.",
  path: "/ai-features/aggression-and-fight-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What triggers an aggression or fight alert?', answer: 'The model watches for rapid, aggressive body movement between two or more people consistent with a physical altercation — pushing, striking, grappling — and fires an alert the moment that pattern is confirmed, rather than waiting for someone to review footage after the fact.' },
  { question: 'Does it distinguish horseplay from a real fight?', answer: 'The model is tuned for sustained, aggressive multi-person movement rather than brief contact, which reduces false positives from normal physical activity. Every alert includes a clip so a human reviewer can confirm before dispatching a response.' },
  { question: 'How quickly does security get notified?', answer: 'Alerts route through the notification system in near real time from the moment the pattern is confirmed, with severity and escalation rules configurable per site so the right guard or team is notified immediately.' },
  { question: 'Does it work in crowded scenes with lots of movement?', answer: 'The model evaluates relative motion and proximity between individually tracked subjects rather than reacting to overall scene activity, so a busy but non-aggressive crowd — a queue, a concourse at peak hours — doesn\'t trigger a false alert on its own.' },
  { question: 'How does this compare to weapons detection?', answer: 'Weapons detection identifies a visible weapon in frame; aggression and fight detection identifies a physical altercation pattern between people, with or without a weapon present. The two are complementary and are often enabled together, since a fight can escalate to involve a weapon or vice versa.' },
  { question: 'What camera setup does it need?', answer: 'It works on the same camera feeds used for other detection features, with no special hardware required. A view with a reasonably clear line of sight to the monitored area — entrances, common areas, queues — gives the model enough to track relative motion between individuals accurately.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Aggression & Fight Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Aggression & Fight Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            A fight breaks out, security knows first. Aggression and fight detection flags physical altercations
            the moment they start, so a response can begin in real time instead of after footage is reviewed.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Rapid, aggressive multi-person body movement consistent with a physical altercation</li>
                  <li className="flex gap-2">• Sustained pushing, striking, or grappling between confirmed subjects</li>
                  <li className="flex gap-2">• Escalating confrontations in queues, entrances, and common areas</li>
                  <li className="flex gap-2">• Immediate, prioritized alert routing to the nearest available guard</li>
                  <li className="flex gap-2">• Altercations involving three or more people in the same tracked event</li>
                  <li className="flex gap-2">• Repeated aggressive incidents at the same location within a short window</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="camera-feed" caption="AGGRESSION & FIGHT DETECTION" alt="Camera view highlighting two subjects engaged in a physical altercation with a confidence score" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why aggression and fight detection matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>A physical altercation can go from first shove to serious injury in seconds — far faster than a guard on patrol or watching a bank of monitors is likely to notice, intervene, or even know it's happening at all. By the time someone reports it or a supervisor reviews the footage afterward, the incident is already over and the only value left is documentation.</p>
                <p>Relying on people nearby to call for help has the same gap: bystanders often hesitate, and staff aren't always positioned to see the moment it starts. Fixed motion alarms don't help either, since a fight looks like ordinary movement to a system that can't distinguish aggressive contact from a crowd milling around.</p>
                <p>Aggression and fight detection watches for the specific motion pattern of a physical altercation — rapid, sustained, aggressive movement between tracked individuals — and fires the alert while the incident is still unfolding, giving security the chance to respond in real time rather than reconstruct events afterward.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="ALTERCATION PATTERN DETECTION" alt="Diagram showing relative motion and proximity between tracked subjects evaluated against an aggression threshold" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Reading relative motion</h3>
                <p className="mt-2 text-muted-foreground">
                  Built on top of <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link>, the model evaluates the relative motion and proximity between tracked subjects over a short time window rather than reacting to overall scene activity.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Confirming a sustained pattern</h3>
                <p className="mt-2 text-muted-foreground">
                  A sustained aggressive-movement pattern between two or more people crosses the alert threshold. Every alert includes a clip covering the moments before and during the event, along with confidence score and timestamp, so the reviewing guard has full context immediately.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alert delivery</h3>
                <p className="mt-2 text-muted-foreground">
                  Alerts route through the platform's <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification system</Link> with critical-severity defaults and configurable escalation.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Aggression and fight detection is enabled per camera with default critical-severity alerting.
                  Configuration options include:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Per-camera enablement with critical-severity alerting by default</li>
                  <li className="flex gap-2">• Sensitivity tuning for the sustained-movement threshold</li>
                  <li className="flex gap-2">• Schedule-based activation for areas with time-limited monitoring needs</li>
                  <li className="flex gap-2">• Escalation contacts and routing rules per site</li>
                  <li className="flex gap-2">• Per-camera instance licensing, matching other detection features</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="ALERT SENSITIVITY CONFIGURATION" alt="Configuration panel showing sensitivity threshold and escalation routing for aggression and fight detection" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="REAL-TIME INCIDENT RESPONSE" alt="Security dashboard showing a critical-severity aggression detection alert with clip and escalation status" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A queue outside a nightclub or bar where a confrontation escalates into a physical altercation</li>
                  <li className="flex gap-2">• A school hallway or courtyard where a fight breaks out between students during a change of class</li>
                  <li className="flex gap-2">• A retail store checkout area where a dispute over a return turns physical</li>
                  <li className="flex gap-2">• A residential common area where an altercation between residents triggers an immediate alert</li>
                  <li className="flex gap-2">• A restaurant dining area where a confrontation between patrons escalates quickly</li>
                  <li className="flex gap-2">• A parking lot at night where an altercation is flagged alongside a nearby weapons detection alert</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Aggression detection runs continuously rather than only during scheduled checks, but an event
                during an active <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round
                is logged immediately as a critical non-compliance event in the patrol report.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Industries using this</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/retail" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
                  <Link href="/industries/education-facilities" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Education</Link>
                  <Link href="/industries/restaurants" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Restaurants</Link>
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                  <Link href="/industries/residential" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Residential</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/weapons-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Weapons Detection</Link>
                  <Link href="/ai-features/behavioral-anomaly-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Behavioral Anomaly Detection</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/incident-investigation" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Incident Investigation</Link>
                  <Link href="/use-cases/night-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Night Security</Link>
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
