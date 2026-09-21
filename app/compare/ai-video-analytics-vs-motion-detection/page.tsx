import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { ComparisonTable } from '@/components/content/comparison-table';
import { PointList } from '@/components/content/point-list';
import Link from 'next/link';
import { PhotoFigure } from '@/components/content/photo-figure';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 *
 * This page compares two techniques, not two vendors, so it names no product other
 * than Camzify and cites nothing. Every Camzify fact comes from /llms.txt or /platform.
 */
const pageMeta = {
  title: "AI Video Analytics vs Motion Detection | Compared",
  description: "Understand the difference between AI video analytics and traditional motion detection. AI tracks objects; motion detection responds to pixel changes.",
  path: "/compare/ai-video-analytics-vs-motion-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const sides = 'AI Video Analytics vs Motion Detection'.split(' vs ');

const motionBetter = [
  'The scene should never change. A sealed store room, a server cabinet or a closed loading bay after hours has no legitimate movement, so any pixel change is an event and a class filter adds nothing.',
  'You need a liveness signal rather than an alarm. A camera that should always show some activity, a lobby in office hours or a production line, can be watched for the absence of motion, which is a fault, not an intrusion.',
  'The camera or recorder already does it and nobody has to act on it. Motion-triggered recording that only decides which minutes to keep costs nothing extra and needs no one to tune it.',
  'There is no connection to send video anywhere. Motion detection runs on the camera itself or on a recorder in the building, so a site with no usable upload bandwidth can still use it.',
];

const aiBetter = [
  'The scene has routine movement and you care about one kind of it. A parking lot has vehicles all night and rain across the lens; a line rule that fires only on a person crossing inward ignores both.',
  'A person has to act on every alert. Once alerts go to a guard by SMS or WhatsApp, each false one costs a phone check and erodes the response to the real ones, so the alert has to mean something.',
  'Direction, dwell time or a specific class matters. Motion detection cannot tell a vehicle leaving from a vehicle entering, or a person passing through from a person who has stayed for ten minutes; a tracked object can be judged on both.',
  'You need to find something afterwards. A track carries attributes, such as clothing color or object type, that let recorded footage be searched by description rather than scrubbed by hand.',
];

const faqs = [
  { question: 'What is the practical difference?', answer: 'Motion detection fires on pixel change; AI detection fires on a confirmed object track of a chosen class. The first alerts on rain and headlights; the second alerts on a person or a vehicle.' },
  { question: 'Is motion detection ever the right tool?', answer: 'Yes, deliberately: as a liveness signal on a camera that should never be static, or in a sealed room where any movement is an event. Camzify includes it as a separate feature for exactly those cases.' },
  { question: 'Does AI detection need special hardware?', answer: 'No. It runs on the streams from the cameras you own; processing is in the cloud. The one on-site component sometimes needed is a PC running the Connector.' },
  { question: 'How do I tune either without drowning in alerts?', answer: 'Zones and lines where the risk is, a class filter, a notification window per camera and severity per detection. The false-alarms guide walks through each.' },
  { question: 'What is a confirmed object track?', answer: 'A detection that has been seen in the same place across several consecutive frames and linked into one moving object with a class, such as person or vehicle. A single frame that looks like a person, a reflection or a moth close to the lens, never becomes a track and never fires a rule. That is the mechanism that separates AI detection from pixel motion.' },
  { question: 'Does AI detection replace motion detection?', answer: 'It replaces motion detection as an intrusion alarm, not as a tool. On Camzify every connected camera includes motion detection and camera tampering detection with its stream instance, and the AI detections are licensed per feature on the cameras that need them. Many sites run motion as a liveness check and a line or zone rule as the alarm on the same camera.' },
  { question: 'Why does my motion detection fire at night?', answer: 'At night the camera switches to infrared, its sensor gain rises and the image gets noisier, so pixels change even when nothing moves. Insects attracted to the infrared light and headlights sweeping across a wall add to it. A detection that requires a tracked object of a class ignores all of that.' },
];

export default function AiVideoAnalyticsVsMotionDetectionPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} breadcrumbs={[
      { label: 'Compare', href: '/compare' },
      { label: 'AI Video Analytics vs Motion Detection' },
    ]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">AI video analytics vs motion detection</h1>
          <p className="mt-6 max-w-2xl text-body text-muted-foreground">
            AI video analytics is software that identifies objects in a camera feed, follows each one across frames as a track, and fires an alert when a tracked object of a chosen class, a person or a vehicle, does what a rule describes. Motion detection is software that compares one frame with the next and fires when enough pixels change inside a region, whatever caused the change.
          </p>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            Both are sold as detection, and the difference decides how many alerts a site receives and how many are worth opening. For the definitions behind the comparison, read <Link href="/guides/what-is-intelligent-video-analytics" className="text-primary hover:underline">what intelligent video analytics is</Link>.
          </p>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/compare-vs-motion-detection.webp" alt="A camera frame split down the middle: AI video analytics drawing a box around a person on one side, plain motion detection flagging the whole frame as changed on the other" />
          </div>

          <div className="mt-10 max-w-3xl">
            <PhotoFigure src="/feature-motion-detection-1.webp" alt="The console live view with a motion detection alert drawn on the camera frame" caption="Motion detection on a live frame" />
          </div>

          <div className="mt-12">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Side by side</h2>
              <div className="mt-6">
                <ComparisonTable
                  columns={['Aspect', sides?.[0] ?? 'Option A', sides?.[1] ?? 'Option B']}
                  rows={[
                    { label: "How it works", values: ["Object detection + tracking on confirmed subjects", "Pixel change detection across frame regions"] },
                    { label: "False alarm rate", values: ["Low: triggers on confirmed objects only", "High: shadows, lighting, weather all trigger"] },
                    { label: "Object classification", values: ["Yes: person, vehicle, animal", "No: all pixel changes treated equally"] },
                    { label: "Tracking", values: ["Maintains persistent identity across frames", "No tracking capability"] },
                    { label: "Zone/Line rules", values: ["Direction, schedule, zone-specific rules", "Region-based sensitivity only"] },
                    { label: "Attribute data", values: ["Clothing, object type, behavior description", "None"] },
                  ]}
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does motion detection work?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Motion detection subtracts each new frame from the one before it and counts the pixels that differ by more than a threshold. When the count inside a region passes a sensitivity setting, the camera or recorder raises an event. It has no idea what moved: a person, a shadow, a branch, a change in exposure and a moth on the lens all produce differing pixels.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The only controls are the region and the sensitivity, and they pull against each other. Set the sensitivity low enough to ignore rain and it also ignores a person at the far end of the frame; set it high enough to catch that person and it catches everything else too. That is why motion detection works well indoors under steady lighting and badly on any camera that faces weather, traffic or a sunrise.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How does AI video analytics work?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                AI video analytics runs a detection model on each frame to find objects and label them by class, then a tracker links those detections across frames into one object with a persistent identity. Rules are evaluated on the track, not on the frame: a line is crossed in a direction, a zone is entered, a dwell time is exceeded, an object is left behind. A detection that appears in one frame and vanishes never becomes a track, so it never fires anything.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Because the object has a class and a history, the rule can be as specific as the risk. A rule can watch for a person crossing a fence line inward after hours while ignoring the vehicles that use the same lot, or for a person who has stayed in a stairwell longer than a set time while ignoring everyone who walked through. Attributes read from the track, clothing color, object type, a plain-language description, become the index that lets recorded footage be searched later.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                On Camzify, all 23 detections run this way, on confirmed object tracks from the cameras a site already owns, in the cloud, with no hardware to install. Motion detection and camera tampering detection are included with every connected camera; the other detections are licensed per feature on the cameras that need them, each with a notification window and a severity set per camera. The <Link href="/ai-features" className="text-primary hover:underline">AI features</Link> index lists them.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where motion detection is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Motion detection is the better choice when any change in the scene is the event you want to know about, or when nobody has to respond to it in real time. In those cases the class filter that AI detection adds is paying for a distinction you do not need.
              </p>
              <PointList items={motionBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Where AI video analytics is the better choice</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                AI video analytics is the better choice when the scene has movement that is normal and movement that is not, and a person is going to be woken up by the difference. The <Link href="/guides/how-to-reduce-false-alarms" className="text-primary hover:underline">false alarms guide</Link> covers how to set the rules once the choice is made.
              </p>
              <PointList items={aiBetter} />
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Can both run on the same camera?</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Yes, and on most cameras that carry a real risk they should. Motion detection is the cheap, always-on signal that something changed; a line or zone rule on a tracked object is the alarm that a person needs to act on. Keeping both means a stuck or frozen camera is still noticed by the absence of motion while the guard only hears about confirmed people and vehicles.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                The cost structure follows the same split. A camera stream on Camzify is priced from $5 per camera per month with motion and tampering detection included, and each AI detection is a separate instance on only the cameras that need it. A site does not pay for line intrusion on the camera watching a sealed store room, and does not run bare motion on the camera facing the fence.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">The bottom line</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Neither approach is universally better. Motion detection is right where any change is an event and the output is a recording decision or a liveness check; AI video analytics is right where the scene moves on its own and a person has to be told only about the movement that matters. The honest test is what happens to each alert: if a human reads it, it should come from a confirmed object of a class you chose.
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Detection is one half of what a camera can verify. The other is whether a condition holds at a set time, which is the job of a <a href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</a> round: a checklist per camera on a schedule, with a frame behind every answer, on the same cameras and the same account. Use the <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link> to model the cost comparison for your specific scenario, or <Link href="/pricing" className="text-primary hover:underline">review pricing</Link> to understand the per-instance licensing model.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <FaqSection items={faqs} />
    </PageShell>
  );
}
