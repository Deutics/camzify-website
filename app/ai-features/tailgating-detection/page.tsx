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
  title: "Tailgating Detection | AI Piggybacking Detection Software",
  description: "Camzify tailgating detection flags a second person entering on a single access credential — one badge, one person, no exceptions.",
  path: "/ai-features/tailgating-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What is tailgating detection?', answer: 'Tailgating (or piggybacking) detection watches access points and flags when more than one person enters on a single badge, key card, or access credential. It closes the gap that badge-reader logs alone can\'t catch, since a badge log only proves the credential was used, not how many people came through.' },
  { question: 'Does it need to integrate with our access control system?', answer: 'No integration is required to detect a tailgating event on camera. For richer alerts, tailgating detection can be paired with access control logs where available, so an alert shows both the badge used and the confirmed head count on camera.' },
  { question: 'What happens when tailgating is detected?', answer: 'An alert with a timestamped clip routes to the assigned guard through the notification system. During a virtual patrol round, a tailgating event at a monitored entry point is logged as a non-compliant checklist item.' },
  { question: 'How accurate is the head count at a busy entrance?', answer: 'The model relies on confirmed object tracks rather than raw motion, so it distinguishes closely spaced individuals rather than counting a crowd as a single blob. Camera angle and framing at the access point still matter — a doorway view with a clear line of sight to each entrant gives the most reliable count.' },
  { question: 'Does it flag two authorized employees walking in together?', answer: 'The detection itself is based on headcount versus badge count at the entry event, not on whether both people are authorized. Pairing with access control logs lets a site distinguish an authorized second badge-in immediately after the first from an actual unbadged follower.' },
  { question: 'How is this different from a standard door-held-open alarm?', answer: 'A door-held-open alarm only knows the door stayed open past a time threshold — it can\'t tell whether one person or five walked through. Tailgating detection counts confirmed people crossing the threshold on a single access event, which catches piggybacking even when the door closes normally between entries.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Tailgating Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Tailgating Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            One badge, one person, no exceptions. Tailgating detection watches secure entry points and flags
            the moment a second person follows an authorized badge holder through a controlled door.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A second, unbadged person entering directly behind an authorized badge holder</li>
                  <li className="flex gap-2">• Multiple people passing through a single-entry access point together</li>
                  <li className="flex gap-2">• Door-held-open events that allow entry without a fresh badge scan</li>
                  <li className="flex gap-2">• After-hours tailgating at doors that should see no traffic</li>
                  <li className="flex gap-2">• Mismatches between badge count and confirmed head count at an entry event</li>
                  <li className="flex gap-2">• Repeated tailgating attempts at the same door within a short window</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="camera-feed" caption="TAILGATING DETECTION" alt="Camera view of a secure door showing two people entering on one badge scan, with the second person highlighted" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why tailgating detection matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Access control systems are built around a simple assumption: one badge scan means one authorized person entering. That assumption breaks the moment someone holds a door for a colleague, or a second person simply walks in close behind the first before the door swings shut. The badge log still shows a clean, valid entry — it has no way of knowing a second, unauthorized person came through on the same event.</p>
                <p>Manned entry points solve this with a guard physically watching the door, but that's not realistic at every access point on a large site, and attention lapses even where it is staffed. Reviewing footage after an incident to check who came in with whom is possible, but only after something has already gone wrong.</p>
                <p>Tailgating detection closes that gap by watching every access event continuously and comparing what the camera actually sees — how many confirmed people crossed the threshold — against what the badge log implies. The mismatch is what triggers the alert, in real time, rather than being discovered during a post-incident review.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="HEADCOUNT VS. BADGE EVENT" alt="Diagram showing confirmed head count at a doorway compared against a single badge scan event to flag tailgating" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Counting confirmed entries</h3>
                <p className="mt-2 text-muted-foreground">
                  A camera positioned at the access point uses <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link> to count confirmed subjects passing through the doorway within a single entry event, rather than reacting to general motion near the door.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Comparing to the badge event</h3>
                <p className="mt-2 text-muted-foreground">
                  When the confirmed head count exceeds one for a single badge scan, an alert fires. Each alert includes a clip of the entry, headcount, and timestamp — and, when <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">AI attribute extraction</Link> is enabled, structured attributes for each person involved.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alert delivery</h3>
                <p className="mt-2 text-muted-foreground">
                  Alerts route through the platform's <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification system</Link> with severity, acknowledgment status, and the option to mark as false positive.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Tailgating detection is configured per access-point camera with a defined entry zone. Available
                  settings include:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Entry-zone boundaries drawn directly on the camera view</li>
                  <li className="flex gap-2">• Schedule-based activation, e.g. business hours vs. after-hours doors</li>
                  <li className="flex gap-2">• Sensitivity tuning for closely spaced entrants</li>
                  <li className="flex gap-2">• Optional access control log pairing for badge-vs-headcount alerts</li>
                  <li className="flex gap-2">• Per-camera instance licensing, matching other detection features</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="ENTRY-ZONE CONFIGURATION" alt="Configuration panel showing an entry-zone boundary drawn over a doorway camera view with schedule and sensitivity controls" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="ACCESS POINT MONITORING" alt="Site diagram showing tailgating detection deployed across multiple secure access points in a facility" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A data center entrance where every badge-in must correspond to exactly one confirmed person</li>
                  <li className="flex gap-2">• An office lobby turnstile flagged when a visitor follows an employee through without signing in</li>
                  <li className="flex gap-2">• A warehouse staff door monitored after-hours where any tailgating event is treated as non-compliant</li>
                  <li className="flex gap-2">• A parking garage staff entrance separating authorized personnel from public access</li>
                  <li className="flex gap-2">• A server room door where tailgating alerts route immediately to on-call security</li>
                  <li className="flex gap-2">• A multi-tenant building entrance where each tenant's access should map to a single badge holder</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                During a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round,
                a tailgating event at a monitored door contributes to the compliance assessment at that camera
                stop and is logged alongside the checklist results in the patrol report.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Industries using this</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/industries/financial-services" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Financial Services</Link>
                  <Link href="/industries/energy" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Energy</Link>
                  <Link href="/industries/healthcare" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Healthcare</Link>
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                  <Link href="/industries/multiple-sites" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Multiple Sites</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion</Link>
                  <Link href="/ai-features/line-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Line Intrusion</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/unauthorized-access-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Unauthorized Access Detection</Link>
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
