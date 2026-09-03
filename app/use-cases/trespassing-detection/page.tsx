import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Trespassing Detection | AI Camera Alerts",
  description: "Trespassing detection on existing cameras: a person on a confirmed track where nobody should be, notified in the hours you set, with a snapshot to the guard.",
  path: "/use-cases/trespassing-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'How does it tell a trespasser from a staff member?', answer: 'By where and when, not by who. A zone rule says that nobody should be in this area during these hours; a person there in those hours is the event. Attribute extraction can add a description, clothing color, what they were carrying, which helps the guard on arrival. It does not recognize faces or identify individuals, and we would not want it to.' },
  { question: 'Does it work at night and in bad weather?', answer: 'It works on the image the camera produces. Infrared and thermal cameras give a usable image at night; heavy rain, fog and snow reduce what any camera can see and reduce detection range with it. If a person is visible in the frame, the tracker can follow them.' },
  { question: 'What does the guard actually receive?', answer: 'A message on the channels configured for that alert category, email, SMS, WhatsApp or push, with the camera, the time and the snapshot. On a patrol round, a failed item such as "no person in the yard" messages the guard designated for that camera with the same snapshot. We do not publish a delivery time.' },
  { question: 'Will it fire on foxes, cats and birds?', answer: 'Not as a person. Detections fire on a tracked object of a chosen class. An animal is not classified as a person, so a person rule stays quiet for a fox. Choose vehicle as the class for a yard where the concern is cars, and person for one where it is people.' },
  { question: 'Can it cover a roof or an open field?', answer: 'Any area a camera covers can carry a zone rule, and any edge can carry a line. Roof access is usually a line across the top of a ladder or a zone on the roof itself; a field is a zone with the hours the site is closed. The limit is the camera’s view, not the rule.' },
  { question: 'Is a patrol round useful if detections already watch continuously?', answer: 'Yes, for the record. A detection fires when something happens. A round records that nothing did: fence intact, grounds clear, camera unobstructed, with a snapshot per item and a compliance percentage per round. That is what a landlord, an insurer or a client asks for after the fact.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Grounds and boundaries',
  title: 'Trespassing detection',
  lede: <>
    <strong className="font-semibold text-foreground">Trespassing detection is the automated identification of a person entering private or restricted property where and when they should not be.</strong>{' '}
    It covers exterior perimeters, open grounds, roofs and any area where human presence outside defined hours is itself the security event. Camzify does it on the cameras already installed, with a zone per area, a notification window per camera, and a snapshot to the guard when the rule is broken.
  </>,
  facts: ['A person on a confirmed track, not a moving shadow', 'Notified in the hours you set', 'Snapshot to the guard on the event'],
  image: { src: '/trespassing-detection.jpg', alt: 'Perimeter fence at night with a person climbing over, highlighted in a thermal camera view' },
  secondary: { href: '/ai-features/zone-intrusion-detection', label: 'Zone intrusion detection' },
  problem: {
    heading: 'Trespassers do not use the gate',
    paras: [
      'They climb the fence, cut through a gap or walk in from the unmonitored side. The controlled entrance with the badge reader and the well-lit camera is the one place they avoid. Static cameras on the rest of the boundary record the entry faithfully and tell nobody, so the site learns about it the next morning from the damage.',
      'Motion alarms were meant to fix that and mostly get switched off within a month, because a perimeter at night is full of motion that is not a person. The useful signal was always a tracked human in a place with a rule against it.',
    ],
    visual: 'route',
    caption: 'A grounds round: perimeter and ground-level cameras in walking order, a checklist at each stop.',
    alt: 'A patrol route across four exterior camera stops with a checklist count at each',
  },
  handles: {
    heading: 'A zone per area, a window per camera, a snapshot when it breaks',
    paras: [
      <><Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone intrusion detection</Link> puts an area on the camera view, and the camera carries a notification window: the yard notifies between 8pm and 6am, the roof at any hour. A tracked person inside the zone raises an alert with the snapshot during the window and nothing outside it. <Link href="/ai-features/line-intrusion-detection" className="text-primary hover:underline">Line intrusion detection</Link> covers the fence itself, a tripwire with a direction so that leaving is not the same event as entering.</>,
      <>Both fire on a track from <Link href="/ai-features/multi-object-tracking" className="text-primary hover:underline">multi-object tracking</Link>, the layer that follows each subject across frames and is the reason a headlight sweep or a bird does not raise a person alert. If the person is still there when the next <Link href="/virtual-patrolling" className="text-primary hover:underline">patrol round</Link> reaches that camera, the checklist item fails as well, and the round writes it into the report with the frame.</>,
    ],
    detections: [
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'An area with a notification window. A tracked person inside it during the window is the event.' },
      { href: '/ai-features/line-intrusion-detection', name: 'Line intrusion detection', role: 'A directional tripwire on the fence, so climbing in and leaving are different events.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'Follows each person across frames so rules fire on a track, not on a shadow.' },
      { href: '/ai-features/ai-attribute-extraction', name: 'AI attribute extraction', role: 'Describes clothing and carried objects for the guard on arrival. Not facial recognition.' },
    ],
  },
  round: {
    heading: 'What a grounds round checks',
    label: 'CAM 07 · East yard',
    guard: 'Ayesha M.',
    items: [['No person in the yard', 'ok'], ['Fence line intact', 'ok'], ['Roof access ladder clear', 'fail'], ['Camera view unobstructed', 'ok']],
    caption: 'A yard stop with the roof-access item failed. The guard gets the snapshot; the item stays Pending until it is fixed.',
    paras: [
      'A trespassing round is the exterior and ground-level cameras in order, and the checklist at each asks whether the area is empty and the boundary intact. Run at a set frequency overnight, it produces a report that shows the grounds were checked and found clear at each time, which is the difference between a site that was watched and a site that merely had cameras.',
      <>Automated rounds can also watch a scene for a short period rather than judging one frame, which matters for a yard where someone might be standing still, and they raise a critical notification for a <Link href="/virtual-patrolling/risk-detection" className="text-primary hover:underline">risk they see</Link> that the checklist did not ask about.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not identify the person. Attribute extraction describes; it does not recognize. It will not see a person the camera cannot see, so coverage gaps in the camera layout are coverage gaps in the detection. And it will not intervene: it puts the snapshot in front of the guard designated for that camera, and what happens next is a human decision.',
      <>Detection rates depend on your cameras and lighting, and we do not publish a number for them. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> explains why.</>,
    ],
  },
  industries: [
    { href: '/industries/construction-sites', name: 'Construction sites' },
    { href: '/industries/residential', name: 'Residential' },
    { href: '/industries/self-storage', name: 'Self-storage' },
    { href: '/industries/property-management', name: 'Property management' },
  ],
  faqs,
};

export default function TrespassingDetectionPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Trespassing Detection", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Trespassing Detection' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
