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
  title: "Multi-Object Tracking | AI Multi-Object Tracking Software",
  description: "Camzify multi-object tracking maintains persistent identity per subject across occlusions and re-entries with clean track histories.",
  path: "/ai-features/multi-object-tracking",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What is multi-object tracking?', answer: 'Multi-object tracking assigns a persistent track ID to every subject in a camera\'s view and maintains that identity frame over frame, rather than treating each frame as an isolated detection. It\'s the foundational layer that other detection features — line and zone intrusion, tailgating, journey mapping — build on top of.' },
  { question: 'What happens when a subject is briefly hidden from view?', answer: 'The tracker is designed to survive brief occlusions — a person walking behind a pillar, a forklift passing in front of a subject — and reassigns the same track ID when the subject reappears, rather than starting a new track and losing the history.' },
  { question: 'How many subjects can be tracked at once in a single frame?', answer: 'The tracker maintains independent identities for every confirmed subject visible in a frame simultaneously, which is what makes it reliable in moderately busy areas like loading docks, lobbies, and retail floors, not just single-subject scenes.' },
  { question: 'Does tracking work across multiple cameras?', answer: 'Multi-object tracking itself operates per camera. Linking a subject\'s identity across separate camera views is handled by cross-camera journey map, which uses this tracking output as one of its inputs.' },
  { question: 'What is a "clean track history"?', answer: 'A clean track history means the full path a subject took through a camera\'s frame — entry point, trajectory, exit point, and timestamps — is preserved as a single continuous record, rather than a series of disconnected detection events that a reviewer has to piece together manually.' },
  { question: 'Is tracking accuracy affected by crowd density?', answer: 'Accuracy holds up well in moderately busy scenes. Very dense crowds can reduce individual track confidence, since overlapping subjects are harder to separate visually — confidence scores are exposed on every track so downstream features can account for that.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Multi-Object Tracking' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Multi-Object Tracking</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">Multi-object tracking maintains persistent identity for every subject in the camera view. Each tracked object gets a unique track ID that survives brief occlusions — when a person walks behind a pillar and reappears, the system recognizes it as the same subject. This is the foundation that makes line and zone intrusion detection accurate.</p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability tracks and enables:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A unique, persistent track ID for every subject in frame</li>
                  <li className="flex gap-2">• Continuous identity through brief occlusions and re-entries</li>
                  <li className="flex gap-2">• The confirmed-track input that line and zone intrusion rules evaluate</li>
                  <li className="flex gap-2">• Directional and dwell-time logic used by other detection features</li>
                  <li className="flex gap-2">• Clean, reviewable track histories for every subject</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="camera-feed" caption="MULTI-OBJECT TRACKING" alt="Multi-Object Tracking visualization on camera feed" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why multi-object tracking matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>Detection features that react to a single frame — a change in pixels, a shape that looks like a person — have no memory. The same subject can trigger a fresh, disconnected event every time they briefly leave and re-enter the frame, and there's no way to answer a simple question like "how long has this person been in the loading dock?"</p>
                <p>Without persistent identity, every other detection feature is working with a snapshot instead of a story. A line-crossing rule can't tell direction reliably without a trajectory to evaluate. A dwell-time zone rule can't know how long someone has actually been present without a continuous track. A journey map across cameras has nothing to link.</p>
                <p>Multi-object tracking is the layer that turns isolated detections into a coherent record — one subject, one identity, one continuous history — that every other AI feature in the platform depends on.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="TRACK PERSISTENCE" alt="Diagram showing a subject's track ID surviving a brief occlusion behind an obstacle and continuing on re-entry" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">Building a track</h3>
                <p className="mt-2 text-muted-foreground">
                  Each confirmed subject entering a camera's frame is assigned a unique track ID. The system follows that subject's position, direction, and speed frame over frame, building a continuous trajectory rather than a series of unrelated detections.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Surviving occlusion</h3>
                <p className="mt-2 text-muted-foreground">
                  When a subject briefly disappears — behind a pillar, a passing vehicle, another person — the tracker predicts where they're likely to reappear and reassigns the same track ID on re-entry, rather than treating them as a new subject and breaking the history.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Feeding other detections</h3>
                <p className="mt-2 text-muted-foreground">
                  The confirmed track output feeds directly into <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">line intrusion detection</Link>, <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">zone intrusion detection</Link>, and every other feature that needs to reason about a subject's movement over time rather than a single frame.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Multi-object tracking runs automatically as the underlying layer for other detection features, with a few tunable settings:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Object-class filtering — track people only, or people and vehicles</li>
                  <li className="flex gap-2">• Occlusion-recovery window, tuned to typical obstruction lengths on-site</li>
                  <li className="flex gap-2">• Track confidence threshold before a subject counts as confirmed</li>
                  <li className="flex gap-2">• Per-camera instance licensing</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="TRACKING SETTINGS" alt="Configuration panel showing object-class filters and occlusion-recovery settings for multi-object tracking" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="FOUNDATIONAL TRACKING LAYER" alt="Site map showing multi-object tracking running across several cameras as the shared layer beneath other detection features" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A busy loading dock where multiple people and vehicles need independent, simultaneous tracks</li>
                  <li className="flex gap-2">• A retail floor where a subject passes behind shelving and needs to keep the same identity</li>
                  <li className="flex gap-2">• A lobby where a subject's dwell time needs to be measured continuously, not in fragments</li>
                  <li className="flex gap-2">• A parking structure where a vehicle's track feeds directional and dwell-time rules</li>
                  <li className="flex gap-2">• A multi-camera site where a subject's track needs to be handed off for journey mapping</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">In a patrol round</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                During a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol</Link> round,
                alerts from this detection model contribute to the compliance assessment at each camera stop
                and are logged in the patrol report.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 text-center">
              <h3 className="font-display text-lg font-bold">Related</h3>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link href="/ai-features" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">All AI Features</Link>
              <Link href="/virtual-patrolling" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Virtual Patrolling</Link>
              <Link href="/industries/warehouses" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Warehouses</Link>
              <Link href="/industries/retail" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Retail</Link>
              <Link href="/use-cases/perimeter-security" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Perimeter Security</Link>
              <Link href="/pricing" className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:border-primary/30 hover:text-primary">Pricing</Link>
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
