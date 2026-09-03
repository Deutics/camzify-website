import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import Link from 'next/link';

const pageMeta = {
  title: "Fire and Smoke Monitoring on Security Cameras",
  description: "Visual fire and smoke detection on the cameras you own, an earlier warning than a ceiling sensor in a large space, and fire exits checked on every round.",
  path: "/use-cases/fire-and-smoke-monitoring",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Is this a replacement for the fire alarm system?', answer: 'No, and we will not describe it as one. Fire and smoke detection is a visual early-warning layer on the security cameras. It complements the certified fire alarm and suppression systems a building is required to have and is not a certified life-safety system itself. What it adds is an earlier visual alert in a large or open space, with a clip, before smoke reaches a fixed sensor.' },
  { question: 'How can a camera see smoke before a smoke detector?', answer: 'A ceiling sensor reacts to particles or heat reaching it, which in a warehouse or an open yard can take time. A camera sees the visual signature of smoke or flame where it starts. The detection runs on the same visual feed as every other Camzify detection, with a confidence threshold you can set per camera.' },
  { question: 'What causes false alerts?', answer: 'Steam, dust and fog look like smoke to a camera, and the model is trained to reduce those, not to eliminate them. Every alert carries a clip and a confidence score so a person can verify in seconds before anything is escalated. Sensitivity is set per camera, so a loading bay with truck exhaust and a server room are tuned differently.' },
  { question: 'Does it need thermal cameras?', answer: 'No. It runs on standard visual cameras, the same ones used for intrusion and patrol rounds. Thermal cameras are not required and are not what the model is built on.' },
  { question: 'How does the patrol round help with fire?', answer: 'A checklist can ask, at each stop, whether the fire exit is clear, whether anything is stored against the electrical cabinet, whether smoke is visible. On an automated round the AI also raises a critical notification for a risk it sees that the checklist did not ask about. A round that passes is a record that the escape routes were clear at that time, which is what the fire officer asks for.' },
  { question: 'Who is notified and how fast?', answer: 'Fire and smoke alerts carry a critical severity and go out on the channels configured for that category, email, SMS, WhatsApp or push, with the clip attached. We do not publish a delivery time because it depends on the channel and your network. The alert is a prompt to verify and act, not a substitute for the building\'s alarm.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Fire safety',
  title: 'Fire and smoke monitoring',
  lede: <>
    <strong className="font-semibold text-foreground">Fire and smoke monitoring on security cameras is visual detection of flame and smoke in the camera view, raised as a critical alert with a clip, as an early-warning layer alongside the building&apos;s certified fire systems.</strong>{' '}
    In a large or open space a ceiling sensor waits for smoke to reach it; a camera sees it where it starts. Camzify runs the detection on the cameras already installed and adds fire exits and escape routes to the patrol checklist.
  </>,
  facts: ['Visual flame and smoke, any standard camera', 'Critical alert with a clip and a confidence score', 'Fire exits checked on every round'],
  heroVisual: <HeroPlaceholder label="Fire safety · Escape routes on the round" alt="A console camera wall of four cameras covering fire exits, an electrical room, a loading bay and a warehouse aisle" frames={[{ src: '/cam-03.jpg', id: 'CAM 09', loc: 'FIRE EXIT · EAST' }, { src: '/cam-02.jpg', id: 'CAM 04', loc: 'LOADING BAY' }, { src: '/cam-06.jpg', id: 'CAM 01', loc: 'ELECTRICAL ROOM' }, { src: '/cam-04.jpg', id: 'CAM 02', loc: 'WAREHOUSE AISLE C' }]} active={0} />,
  secondary: { href: '/ai-features/fire-and-smoke-detection', label: 'Fire and smoke detection' },
  problem: {
    heading: 'A sensor waits for the smoke to arrive',
    paras: [
      'A smoke detector on a warehouse ceiling is doing its job and doing it late: it fires when enough particles have risen and drifted to reach it, which in a high, open or ventilated space can be minutes after the first flame. In an unmanned building overnight, those are the minutes that decide the outcome.',
      'The same building has cameras on every aisle and every bay, watching the exact spot where a fire would start, and none of them is looking for one. Blocked fire exits are the other half of the problem: they are found on the annual inspection, not on the night they matter.',
    ],
    visual: 'notification',
    caption: 'A critical alert with the clip attached, as the guard receives it. Verified in seconds, escalated by a person.',
    alt: 'A guard notification for a failed checklist item, with the message, the snapshot and an acknowledgement',
  },
  handles: {
    heading: 'The camera watches for the fire. The round checks the way out.',
    paras: [
      <><Link href="/ai-features/fire-and-smoke-detection" className="text-primary hover:underline">Fire and smoke detection</Link> watches each camera&apos;s live feed for the visual signatures of flame and smoke and raises a critical alert with a clip and a confidence score when a match passes the threshold set for that camera. It runs on the standard cameras already in place; no thermal hardware is involved. Steam, dust and fog are the known confounders, and a person verifies from the clip before anyone calls anyone.</>,
      <>A <Link href="/virtual-patrolling" className="text-primary hover:underline">patrol round</Link> covers the part no sensor does: at each stop it asks whether the fire exit is clear, whether anything is stacked against the electrical cabinet, whether smoke is visible, and records the answer with the frame. On an <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated round</Link> the AI also raises a critical notification for a <Link href="/virtual-patrolling/risk-detection" className="text-primary hover:underline">risk it sees</Link> that the checklist did not ask about. <Link href="/ai-features/abandoned-object-detection" className="text-primary hover:underline">Abandoned object detection</Link> catches the pallet left in the escape route between rounds.</>,
    ],
    detections: [
      { href: '/ai-features/fire-and-smoke-detection', name: 'Fire and smoke detection', role: 'Visual flame and smoke on any standard camera, raised as a critical alert with a clip.' },
      { href: '/ai-features/abandoned-object-detection', name: 'Abandoned object detection', role: 'A pallet, bag or box left in an escape route past a dwell time you set.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'A camera that cannot see the aisle cannot see the fire in it. Covered or turned, it raises an alert.' },
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'Notifies on a person in a hazardous-materials store or plant room during the hours you set.' },
    ],
  },
  round: {
    heading: 'What a fire-safety round checks',
    label: 'CAM 09 · Fire exit, east',
    guard: 'Priya R.',
    items: [['Fire exit clear', 'fail'], ['No smoke visible', 'ok'], ['Nothing against electrical cabinet', 'ok'], ['Extinguisher point unobstructed', 'ok']],
    caption: 'The east fire exit found blocked on the evening round. Snapshot to the guard; the report shows before and after once cleared.',
    paras: [
      'A fire-safety sequence is the cameras covering exits, escape routes, plant rooms and storage in walking order, and the checklist at each is the state a fire officer would want to find: exit clear, extinguisher point unobstructed, nothing against the switchgear, no smoke. Run it at closing and through the night, and the report per round is the record that the routes were clear at each time, with the frame to prove it.',
      <>The <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> is also what makes the inspection conversation short: a stack of passed rounds, each with frames, rather than a signature on a monthly sheet. Falls, exclusion zones and PPE on the same cameras are covered under <Link href="/use-cases/workplace-safety-monitoring" className="text-primary hover:underline">workplace safety monitoring</Link>.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not replace the fire alarm, the sprinklers or the inspection regime, and it is not certified as a life-safety system. It will not see a fire in a room without a camera, or behind a closed door, or through heavy steam. It will not call the fire service; it tells the person you designate, with a clip, and they decide.',
      <>We do not publish detection rates, lead times over sensors, or false-alarm figures, because they depend on your cameras and your building. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out the policy.</>,
    ],
  },
  industries: [
    { href: '/industries/warehouses', name: 'Warehouses' },
    { href: '/industries/manufacturing', name: 'Manufacturing' },
    { href: '/industries/waste-management', name: 'Waste management' },
    { href: '/industries/energy', name: 'Energy' },
  ],
  faqs,
};

export default function FireAndSmokeMonitoringPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Fire and Smoke Monitoring", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Fire and Smoke Monitoring' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
