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
  title: "Camera Tampering Detection | AI Camera Tampering Detection Software",
  description: "Camzify camera tampering detection monitors five modes: defocus, coverage, scene change, brightness shift, and frozen frames.",
  path: "/ai-features/camera-tampering-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What counts as camera tampering?', answer: 'Camera tampering detection watches for five distinct conditions: sudden defocus, physical coverage of the lens, a rapid scene change indicating the camera was moved or rotated, an abnormal brightness shift, and frozen frames suggesting a feed loop or hardware failure. Any one of these fires an alert.' },
  { question: 'How is a frozen feed different from a network outage?', answer: 'A frozen-frame alert fires when the video signal is present but the image itself stops changing — a looped or stuck feed. A network or camera outage is a separate condition, typically surfaced elsewhere in the platform as a connectivity or offline-camera alert rather than a tampering event.' },
  { question: 'Can someone spray-paint or tape over a lens without triggering an alert?', answer: 'Physical coverage of the lens is one of the five monitored tamper modes and is designed specifically to catch this — a sudden, sustained loss of scene detail consistent with the lens being blocked triggers an alert rather than being mistaken for darkness or a camera fault.' },
  { question: 'Does tampering detection work on cameras with automatic exposure or focus?', answer: 'Yes. The model is tuned to distinguish a camera\'s own automatic exposure and focus adjustments — which happen gradually and predictably — from a sudden, abnormal defocus or brightness shift consistent with physical interference.' },
  { question: 'How fast is a tampering alert delivered?', answer: 'Detection and alert routing happen in near real time from the moment a tamper condition is confirmed, since a tampered camera is a blind spot for every other detection feature running on that feed until it\'s resolved.' },
  { question: 'Does a tampering alert affect other detections on the same camera?', answer: 'A tampered camera can\'t reliably run other detection models until the tamper condition clears, so a tampering alert is treated as high priority — it\'s effectively a signal that the camera\'s entire coverage area is temporarily unmonitored.' },
];

export default function Page() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'AI Features', href: '/ai-features' },
      { label: 'Camera Tampering Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Camera Tampering Detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">Camera tampering detection monitors five distinct tampering modes: sudden defocus, physical coverage of the lens, rapid scene change indicating the camera was moved, abnormal brightness shifts, and frozen frames suggesting a feed loop or hardware failure. Any of these conditions triggers an immediate alert.</p>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">This capability detects and alerts on:</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Sudden defocus that leaves the scene unusable for review</li>
                  <li className="flex gap-2">• Physical coverage of the lens — a hand, cloth, or spray</li>
                  <li className="flex gap-2">• Rapid scene change indicating the camera was moved or rotated</li>
                  <li className="flex gap-2">• Abnormal brightness shifts consistent with a light or laser aimed at the lens</li>
                  <li className="flex gap-2">• Frozen frames suggesting a looped feed or hardware failure</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="camera-feed" caption="CAMERA TAMPERING DETECTION" alt="Camera Tampering Detection visualization on camera feed" />
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why camera tampering detection matters</h2>
              <div className="mt-4 space-y-4 max-w-prose text-muted-foreground">
                <p>A camera that's been blocked, defocused, or redirected doesn't just stop working — it keeps reporting as online while silently covering nothing. Every other detection feature running on that feed goes blind at the same moment, and unless someone happens to notice the footage looks wrong, the gap can go unnoticed for hours.</p>
                <p>This is exactly the moment tampering is most likely: someone disabling a camera on purpose picks the one covering the area they're about to enter. A dashboard that only shows "camera online" isn't enough — it needs to know the difference between a working feed and a feed that's been deliberately or accidentally compromised.</p>
                <p>Camera tampering detection closes that gap by continuously checking the feed itself against five known tamper signatures, so a compromised camera gets flagged the moment it happens, not the next time someone happens to look at that view.</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="diagram" caption="TAMPER SIGNATURE LOGIC" alt="Diagram showing five independent tamper-detection signatures evaluated against a live camera feed" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">How it works</h2>

                <h3 className="mt-6 font-display text-lg font-bold">The five tamper modes</h3>
                <p className="mt-2 text-muted-foreground">
                  Each frame is continuously checked against five independent signatures: defocus, physical coverage, scene change, brightness shift, and frozen frames. Each mode has its own detection logic, since a blocked lens looks nothing like a rotated camera or a frozen feed.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Confirming a tamper event</h3>
                <p className="mt-2 text-muted-foreground">
                  A condition needs to persist beyond a short confirmation window before it's treated as tampering, which filters out momentary effects like a passing shadow, a brief glare, or normal auto-exposure adjustment. Once confirmed, the tamper state is treated as an active condition until the feed returns to normal.
                </p>

                <h3 className="mt-6 font-display text-lg font-bold">Alert delivery</h3>
                <p className="mt-2 text-muted-foreground">
                  An alert fires with the tamper mode, a snapshot from just before the event, and a timestamp. Because a tampered camera can't reliably run other detections while compromised, tampering alerts are routed through the platform's notification system with high default priority.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Configuration</h2>
                <p className="mt-4 text-muted-foreground">
                  Camera tampering detection is enabled per camera with sensible defaults, and each mode can be tuned independently:
                </p>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• Per-mode enable/disable — turn off scene-change detection on a pan-tilt-zoom camera, for example</li>
                  <li className="flex gap-2">• Confirmation window before a condition is treated as confirmed tampering</li>
                  <li className="flex gap-2">• Sensitivity per mode</li>
                  <li className="flex gap-2">• Escalation and priority routing for tamper alerts specifically</li>
                  <li className="flex gap-2">• Per-camera instance licensing</li>
                </ul>
              </div>
            </ScrollReveal>
            <PlaceholderVisual type="config-ui" caption="TAMPER MODE SETTINGS" alt="Configuration panel showing five tamper detection modes with individual sensitivity and enable controls" />
          </div>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <PlaceholderVisual type="industry" caption="TAMPER-RESISTANT COVERAGE" alt="Site map highlighting cameras covering high-value and unmanned areas with tampering detection enabled" />
            <ScrollReveal>
              <div>
                <h2 className="font-display text-2xl font-bold">Common scenarios</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex gap-2">• A camera covering a high-value storage area is physically covered before an attempted theft</li>
                  <li className="flex gap-2">• A pan-tilt camera is manually rotated away from its assigned coverage area</li>
                  <li className="flex gap-2">• A bright light or laser is aimed at a lens to wash out the image</li>
                  <li className="flex gap-2">• A camera's feed silently freezes due to a hardware or encoding fault</li>
                  <li className="flex gap-2">• An ATM or cash-handling camera is spray-painted or taped over</li>
                  <li className="flex gap-2">• A remote-site camera loses focus after an accidental knock or weather damage</li>
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
