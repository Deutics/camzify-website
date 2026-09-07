import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "AI Perimeter Security | Intrusion Detection",
  description: "Perimeter security on the cameras you own: line and zone intrusion on confirmed tracks, a fence-line round with a checklist, guard notified on a failed check.",
  path: "/use-cases/perimeter-security",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Does perimeter detection work at night?', answer: 'It works on whatever the camera produces. Infrared and thermal cameras produce a usable image in the dark, and the detections run on that image the same as on daylight footage. A camera that shows a black frame at night gives the AI nothing to work with, which is an argument for checking camera health on the round.' },
  { question: 'Does it fire on animals, shadows or moving branches?', answer: 'Line and zone intrusion fire on a confirmed object track of a class you have chosen, typically person or vehicle, not on pixel change. A branch moving in the wind is not a tracked person. Animals are a class of their own and are not a person, so a fox crossing the tripwire does not raise a person alert. Motion detection, which does respond to pixel change, is a separate feature you would use deliberately.' },
  { question: 'How is the guard notified after a breach?', answer: 'A line or zone intrusion raises an alert on the channels configured for that category, email, SMS, WhatsApp or push, with the snapshot attached. A failed checklist item on a patrol round messages the guard designated for that camera. We do not publish a delivery time, because it depends on the channel and the network at your end.' },
  { question: 'Do my existing fence-line cameras work?', answer: 'Any camera that produces an RTSP stream, which covers ONVIF-conformant IP cameras from the major manufacturers, plus RTMP from encoders and HTTPS streams. Cameras on a LAN that cannot be reached from the internet connect through the Camzify Connector. Nothing is replaced.' },
  { question: 'Do I need both detections and patrol rounds?', answer: 'They do different jobs. Detections watch continuously and fire the moment a tracked object crosses a line or enters a zone. A patrol round checks a condition on a schedule, such as whether the gate is closed and the fence line is clear, and records the answer with a snapshot whether or not anything moved. Most perimeters run both: detections for the event, rounds for the record.' },
  { question: 'Can the perimeter round run on its own overnight?', answer: 'Yes. An automated round works through every fence-facing camera on the schedule you set, checks each item, watches a scene for a short period where a single frame is not enough, and messages the guard for anything Not Compliant without an operator in the loop. It also raises a critical notification for a safety or security risk it sees that the checklist did not ask about.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Perimeter',
  title: 'AI perimeter security',
  lede: <>
    <strong className="font-semibold text-foreground">Perimeter security is the detection of, and response to, intrusion at the outer boundary of a site: fence lines, gates, loading areas and open ground.</strong>{' '}
    It is the first layer of a physical security program and the one most often left to a camera nobody is watching. Camzify puts two things on those cameras: detections that fire when a tracked person or vehicle crosses a line or enters a zone, and a scheduled patrol round that checks the fence, the gate and the camera itself and records what it found.
  </>,
  facts: ['Line and zone intrusion on confirmed tracks', 'A fence-line round with a checklist', 'Guard messaged on a failed check'],
  image: { src: '/ai-perimeter-security.jpg', alt: 'Facility perimeter at dusk with networked cameras along the fence line' },
  secondary: { href: '/ai-features/line-intrusion-detection', label: 'Line intrusion detection' },
  problem: {
    heading: 'A recorded breach is not a detected one',
    paras: [
      'Conventional CCTV records the perimeter and cannot tell a person climbing the fence from a shadow moving across it. The footage exists, and it is reviewed after the loss is discovered, which makes it evidence rather than security. Pixel-based motion alarms try to close that gap and instead fill the inbox with rain, headlights and foliage until somebody turns them off.',
      'A guard watching a wall of perimeter cameras has the opposite problem: hours of nothing, then a few seconds that matter, usually during a shift change or at the end of a long night. The breach that gets missed is rarely the one that was hard to see.',
    ],
    visual: 'notification',
    caption: 'A failed check as the guard receives it: the camera, the message, the snapshot, and whether it was acknowledged. Not a motion alarm.',
    alt: 'A guard notification for a failed checklist item, with the message, the snapshot and an acknowledgement',
  },
  handles: {
    heading: 'Detections for the event, rounds for the record',
    paras: [
      <><Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">Line intrusion detection</Link> draws a tripwire across the fence line or gate in the camera view, with a direction, and fires when a confirmed object track of a chosen class crosses it. <Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone intrusion detection</Link> does the same for an area, the yard inside the fence for example, with a notification window per camera so that presence at 3am notifies and presence at 3pm does not. Both operate on a track the system has followed across frames, which is why a swaying branch does not count.</>,
      <>Between those events, a <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol round</Link> visits every fence-facing camera on a schedule and checks a list: is the fence line clear, is the gate closed, is the camera view unobstructed. Each answer is recorded with the frame it was judged against. <Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera tampering detection</Link> covers the case where the camera itself is turned, covered or blinded, which on a perimeter is often the first move; <Link href="/use-cases/camera-health-monitoring" className="text-primary hover:underline">camera health monitoring</Link> covers the slow failures.</>,
    ],
    detections: [
      { href: '/ai-features/line-intrusion-detection', name: 'Line intrusion detection', role: 'A directional tripwire on the fence line or gate. Fires on a tracked person or vehicle crossing it.' },
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'An area inside the boundary with a notification window. Presence during it is the event.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'A camera turned, covered or defocused raises an alert before the perimeter goes dark.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'The layer beneath the others: each subject followed across frames so rules fire on a track, not a pixel.' },
    ],
  },
  round: {
    heading: 'What a perimeter round checks',
    label: 'CAM 02 · North fence',
    guard: 'Rahul K.',
    items: [['Fence line clear', 'ok'], ['Gate closed and latched', 'ok'], ['No person in the yard', 'fail'], ['Camera view unobstructed', 'pending']],
    caption: 'A fence-line stop with one failed item and one waiting on the guard. Both count against the round’s compliance.',
    paras: [
      'A perimeter sequence is the fence-facing cameras in walking order, with a checklist at each. The items are conditions, not events: the fence line is clear, the gate is closed, nothing is parked against the boundary, the camera sees what it should. A round that passes produces a report that says so, with a snapshot per item, which is the record an insurer or an auditor asks for and a camera alone never produces.',
      <>Run it manually when an operator is on shift, or <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">on a schedule</Link> through the night with nobody in the loop. Frequency, active hours and active days are yours to set; every 30 minutes on the perimeter overnight is a common shape.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not see through a camera that cannot see. Fog, heavy rain and a lens pointed at a floodlight degrade the image, and the detections work on the image. It will not identify who crossed the fence; attribute extraction can describe clothing and what they were carrying, and it is not facial recognition. And it will not stop anyone. It tells the right guard, with the snapshot, and the response is theirs.',
      <>We do not publish detection rates or alert delivery times, because they depend on your cameras, your lighting and your network. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out that policy.</>,
    ],
  },
  industries: [
    { href: '/industries/warehouses', name: 'Warehouses' },
    { href: '/industries/construction-sites', name: 'Construction sites' },
    { href: '/industries/energy', name: 'Energy' },
    { href: '/industries/manufacturing', name: 'Manufacturing' },
  ],
  faqs,
};

export default function PerimeterSecurityPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "AI Perimeter Security", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Perimeter Security' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
