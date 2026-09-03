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
  title: "Weapons Detection | AI Weapon Detection Camera Software",
  description: "Camzify weapons detection flags visible weapons in camera view the moment they appear, routing an alert before a threat escalates.",
  path: "/ai-features/weapons-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What does weapons detection actually detect?', answer: 'The model flags visibly brandished weapons — firearms and edged weapons — in the camera frame. It is a visual detection model, not a metal detector or X-ray system, and works on any camera with a clear enough view of the object.' },
  { question: 'How fast is the alert?', answer: 'Detection and alert routing happen in near real time from the moment a weapon becomes visible in frame, so the assigned guard or security team is notified within seconds, not after someone reviews footage later.' },
  { question: 'Does it produce false positives on similar-looking objects?', answer: 'The model is trained specifically to reduce false positives on visually similar objects like phones or tools, and every alert includes a confidence score and clip so a human can verify before escalating further.' },
  { question: 'Can it detect a concealed weapon?', answer: 'No. Weapons detection identifies weapons that are visibly brandished in the camera frame — it is a visual model, not a concealed-weapons scanner. A firearm or blade kept out of camera view, such as holstered or in a bag, will not trigger a detection.' },
  { question: 'How complex is setup for a new site?', answer: 'Setup follows the same pattern as other detection features — enable the capability per camera, and default critical-severity alerting applies immediately. No additional hardware, calibration, or per-camera training is required beyond a clear enough view of the monitored area.' },
  { question: 'How is this different from a metal-detector or checkpoint system?', answer: 'A metal detector or checkpoint screens people as they pass through a fixed point and requires that point to be staffed and enforced. Weapons detection works continuously across any monitored camera view, including areas with no physical checkpoint at all, and doesn\'t require anyone to walk through a designated screening line.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Weapons Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Weapons Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            Spot a threat before it escalates. Weapons detection flags visible firearms and edged weapons the
            moment they enter frame, so the response starts before an incident develops rather than after.
          </p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Visibly brandished firearms in camera view</li>
                  <li className="flex gap-2">• Visible edged weapons in camera view</li>
                  <li className="flex gap-2">• Detections at entrances, lobbies, and public-facing areas</li>
                  <li className="flex gap-2">• Immediate, prioritized alert routing to the on-site or on-call guard</li>
                  <li className="flex gap-2">• Repeated detections tied to the same confirmed subject track</li>
                  <li className="flex gap-2">• Detections outside scheduled hours at areas that should see no weapon presence</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="camera-feed" caption="WEAPONS DETECTION" alt="Camera view with a detected weapon highlighted by a bounding box and confidence score" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why weapons detection matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>A weapon becoming visible on camera is one of the narrowest windows security has to respond before a threat escalates further. A guard watching one monitor among dozens can easily miss that moment, and footage reviewed after the fact only confirms what already happened — it can't change the outcome.</p>
                <p>Manual monitoring simply can't hold continuous attention on every camera at once, and staffing enough people to watch every feed live isn't realistic for most sites. The result is a gap between the moment a weapon appears and the moment anyone notices, which is exactly the window where a fast response matters most.</p>
                <p>Weapons detection closes that gap by watching every enabled camera continuously and firing the moment a weapon is confirmed in frame, so the alert reaches a guard in seconds rather than depending on someone happening to be looking at the right screen at the right time.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="WEAPON CLASSIFICATION" alt="Diagram showing a confirmed object track evaluated against trained weapon classes with a confidence threshold" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Scanning confirmed tracks</h3>
                <p className="mt-2 text-muted-foreground">
                  The model runs on confirmed object detections from <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link>, evaluating each tracked object against trained weapon classes rather than scanning raw, unconfirmed motion.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Confidence scoring</h3>
                <p className="mt-2 text-muted-foreground">
                  A match above the confidence threshold fires an alert immediately. Every alert is tagged critical severity by default and includes the object type, confidence score, timestamp, and a short clip for immediate human verification.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Critical alert routing</h3>
                <p className="mt-2 text-muted-foreground">
                  Alerts route through the platform's <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification system</Link> with escalation rules configurable per site.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Weapons detection is enabled per camera with default critical-severity alerting. Configuration
                  options include:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Per-camera enablement with critical-severity alerting by default</li>
                  <li className="flex gap-2">• Escalation contacts and routing rules per site</li>
                  <li className="flex gap-2">• Schedule-based activation for areas with time-limited monitoring needs</li>
                  <li className="flex gap-2">• Confidence threshold tuning for the alert-firing point</li>
                  <li className="flex gap-2">• Per-camera instance licensing, matching other detection features</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="ALERT ROUTING CONFIGURATION" alt="Configuration panel showing critical-severity alert routing and escalation contacts for weapons detection" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="CRITICAL ALERT RESPONSE" alt="Security dashboard showing a critical-severity weapons detection alert with clip, confidence score, and escalation status" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A school entrance where any visible weapon triggers an immediate lockdown protocol</li>
                  <li className="flex gap-2">• A retail store lobby flagged the moment a firearm becomes visible near checkout</li>
                  <li className="flex gap-2">• A hospital emergency department entrance monitored continuously for weapon presence</li>
                  <li className="flex gap-2">• A bank branch lobby where a detection routes directly to a critical alert queue</li>
                  <li className="flex gap-2">• A parking structure where a weapon detection triggers alongside a nearby aggression alert</li>
                  <li className="flex gap-2">• An office building loading dock where after-hours weapon detection is treated as critical by default</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Weapons detection runs continuously rather than only during scheduled checks, but a detection
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
                  <Link href="/industries/financial-services" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Financial Services</Link>
                  <Link href="/industries/healthcare" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Healthcare</Link>
                  <Link href="/industries/property-management" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Property Management</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Related detections</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/ai-features/aggression-and-fight-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Aggression & Fight Detection</Link>
                  <Link href="/ai-features/zone-intrusion-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Zone Intrusion</Link>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-lg font-bold">Use cases</h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/use-cases/trespassing-detection" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Trespassing Detection</Link>
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
