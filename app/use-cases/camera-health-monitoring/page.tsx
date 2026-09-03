import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import Link from 'next/link';

const pageMeta = {
  title: "Camera Health Monitoring | Blind Cameras",
  description: "Camera health across sites: tampering in five modes raised as it happens, offline shown as offline, and camera view checked as an item on every patrol round.",
  path: "/use-cases/camera-health-monitoring",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What counts as tampering?', answer: 'Five conditions: sudden defocus, physical coverage of the lens, a rapid scene change that says the camera was moved or rotated, an abnormal brightness shift, and frozen frames that suggest a looped or stuck feed. Any one of them raises an alert.' },
  { question: 'How is a frozen feed different from a camera going offline?', answer: 'A frozen-frame alert fires when the signal is present but the picture stops changing. A camera or site that is offline is a connectivity condition: the live wall shows the camera in a no-signal state rather than a stale frame, and a site with every camera down shows as a site down.' },
  { question: 'Will it fire when the camera adjusts exposure at dusk?', answer: 'The model is tuned to tell a camera\'s own automatic exposure and focus adjustments from a sudden, sustained loss of scene detail. A normal dusk transition is not an alert; a lens taped over is.' },
  { question: 'How does the patrol round help?', answer: 'Every stop can carry the item "camera view unobstructed", judged from the frame. It catches the slow failures tampering detection is not built for: a camera drifting out of alignment, a spider web, a branch that grew into the view, condensation. A round that passes is a record that every camera on it could see at that time.' },
  { question: 'Can I see camera health across many sites?', answer: 'The dashboard shows cameras online against total and the live wall groups cameras by site with a per-site online count, so the estate is read in one place. Alerts are routed per category, so tampering and offline conditions can go to whoever maintains the cameras rather than to the guard.' },
  { question: 'Why does this matter more than it sounds?', answer: 'Because every other detection on that feed is blind until the camera is fixed, and nobody notices a camera that is quiet. A perimeter with one covered camera is a perimeter with a hole in it, and the hole is usually where the person who covered it came in.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · The cameras themselves',
  title: 'Camera health monitoring',
  lede: <>
    <strong className="font-semibold text-foreground">Camera health monitoring is knowing, as it happens, when a camera can no longer see: covered, moved, defocused, frozen or offline.</strong>{' '}
    A camera that has gone blind is quiet, which is why it is usually found weeks later, when the footage is needed and is not there. Camzify raises tampering the moment it is confirmed, shows offline cameras and sites as such, and checks every camera&apos;s view as an item on the patrol round.
  </>,
  facts: ['Tampering in five modes, raised live', 'Offline shown as offline, not as a stale frame', 'Camera view checked on every round'],
  heroVisual: <HeroPlaceholder label="Estate view · One camera reporting a fault" alt="A console camera wall of four cameras from different sites, one of them highlighted for a tampering condition" frames={[{ src: '/cam-06.jpg', id: 'SITE A · CAM 01', loc: 'MAIN GATE' }, { src: '/cam-02.jpg', id: 'SITE A · CAM 04', loc: 'LOADING DOCK' }, { src: '/cam-04.jpg', id: 'SITE B · CAM 02', loc: 'PARKING LOT A' }, { src: '/cam-03.jpg', id: 'SITE C · CAM 09', loc: 'SERVER CORRIDOR' }]} active={3} />,
  secondary: { href: '/ai-features/camera-tampering-detection', label: 'Camera tampering detection' },
  problem: {
    heading: 'A blind camera is a quiet camera',
    paras: [
      'Cameras fail slowly and silently. A lens fogs, a bracket drifts, a spider builds across the housing, a branch grows into the view, a feed freezes on a frame from Tuesday. Nothing alarms, because nothing is designed to. The failure is discovered when the footage is needed and the file shows a grey blur or a wall.',
      'Deliberate tampering is faster and worse. A camera covered or turned on the way in is the first move in most intrusions that are planned, and the system it feeds carries on as if the view were fine.',
    ],
    visual: 'sites',
    caption: 'Every site with its camera count and online status. The one that is down is shown down, not as frozen frames.',
    alt: 'A list of sites on one account with their camera counts and online status',
  },
  handles: {
    heading: 'Tampering raised live, view checked on the round',
    paras: [
      <><Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera tampering detection</Link> watches each feed for five conditions, defocus, lens coverage, sudden scene change, abnormal brightness shift and frozen frames, and raises an alert the moment one is confirmed, because every other detection on that camera is blind until it is fixed. It runs on signal analysis rather than a neural network, so it costs no GPU. Cameras and sites that go offline are shown as such on the <Link href="/platform/live-streaming" className="text-primary hover:underline">live wall</Link> and the <Link href="/platform/dashboard" className="text-primary hover:underline">dashboard</Link>, never as a stale picture.</>,
      <>The slow failures are caught by the <Link href="/virtual-patrolling" className="text-primary hover:underline">patrol round</Link>: every stop can carry &quot;camera view unobstructed&quot; as an item, judged from the frame, so a drifted bracket or a web across the housing fails a check with a picture of it. Alerts for tampering and offline conditions route on their own category, so they reach whoever maintains the cameras.</>,
    ],
    detections: [
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'Defocus, coverage, scene change, brightness shift and frozen frames, raised as they happen.' },
      { href: '/ai-features/motion-detection', name: 'Motion detection', role: 'Pixel-change detection, useful as a liveness signal on a feed that should never be static.' },
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'The detection that goes blind first when a camera is covered. Worth protecting.' },
      { href: '/ai-features/line-intrusion-detection', name: 'Line intrusion detection', role: 'The same. A tripwire on a camera that cannot see is not a tripwire.' },
    ],
  },
  round: {
    heading: 'What a camera-health round checks',
    label: 'CAM 09 · Server corridor',
    guard: 'Maintenance',
    items: [['Camera view unobstructed', 'fail'], ['Image in focus', 'ok'], ['Scene matches reference', 'ok'], ['Feed updating', 'ok']],
    caption: 'The corridor camera fails the view check with a picture of the obstruction. Maintenance gets the frame, not a ticket that says "check camera".',
    paras: [
      'A camera-health round is every camera on the site, and the checklist is about the camera rather than the scene: view unobstructed, image in focus, scene as expected, feed updating. Run daily, it produces a report that every camera on the site could see at that time, which is the answer to the question an investigator asks first.',
      <>For an estate, every site&apos;s round reports into one place, and the <Link href="/platform/multi-site-management" className="text-primary hover:underline">multi-site console</Link> shows which sites have cameras down before anyone drives out.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not fix the camera or tell you why it failed; it tells you that it did, and shows the frame. It will not diagnose a network outage beyond showing the camera or site offline. It will not detect a camera that was never pointed at the right thing; that is a checklist item for the person who installed it.',
      <>We do not publish figures for how quickly tampering is raised or how many blind cameras rounds find. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out the policy.</>,
    ],
  },
  industries: [
    { href: '/industries/multiple-sites', name: 'Multiple sites' },
    { href: '/industries/remote-sites', name: 'Remote sites' },
    { href: '/industries/property-management', name: 'Property management' },
    { href: '/industries/retail', name: 'Retail' },
  ],
  faqs,
};

export default function CameraHealthMonitoringPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Camera Health Monitoring", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Camera Health Monitoring' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
