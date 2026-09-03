import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import { HeroPlaceholder } from '@/components/content/hero-placeholder';
import Link from 'next/link';

const pageMeta = {
  title: "Violence and Weapons Detection on Cameras",
  description: "Violence and weapons detection on existing cameras: a visible weapon or an altercation raised as a critical alert with a clip, verified by a person.",
  path: "/use-cases/violence-and-weapons-detection",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What does weapons detection actually see?', answer: 'A visibly brandished firearm or edged weapon in the camera frame. It is a visual model, not a metal detector or a scanner: a weapon in a bag, a holster or a pocket is not visible and is not detected. Every alert carries a confidence score and a clip so a person verifies before escalating.' },
  { question: 'How does it tell a fight from horseplay?', answer: 'Aggression and fight detection looks for sustained, aggressive movement between two or more individually tracked people, pushing, striking, grappling, rather than brief contact. A busy concourse or a queue does not match the pattern, because it evaluates the motion between tracked subjects, not the amount of movement in the scene.' },
  { question: 'Does it produce false alerts on phones and tools?', answer: 'The weapons model is trained to reduce confusion with visually similar objects, and it does not eliminate it. That is why every alert includes a clip and a confidence score, and why the workflow is verify then escalate rather than escalate on the alert alone.' },
  { question: 'Who is notified?', answer: 'Both detections default to critical severity and go out on the channels configured for that category, email, SMS, WhatsApp or push, with the clip. Severity and escalation can be set per site and per camera, so a school entrance and a back-of-house corridor route differently.' },
  { question: 'Does it work with the patrol round?', answer: 'The detections run continuously and are not tied to the round. On an automated round, the AI also raises a critical notification for a safety or security risk it sees at a stop, which covers an altercation in progress when the round reaches that camera.' },
  { question: 'Is there an evidence record?', answer: 'Every alert is logged with camera, time, clip and confidence. Cloud recording holds the footage within the retention set for that camera, and AI suspect search can find the same person on other cameras by description afterwards. None of it identifies anyone by face.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Personal safety',
  title: 'Violence and weapons detection',
  lede: <>
    <strong className="font-semibold text-foreground">Violence and weapons detection on cameras is the visual recognition of a brandished weapon, or of a physical altercation between people, raised as a critical alert with a clip the moment it is confirmed.</strong>{' '}
    The point is that the response starts while the event is happening rather than after the footage is reviewed. Camzify runs both detections on the cameras already covering entrances, floors and corridors, and puts the clip in front of a person to verify.
  </>,
  facts: ['Visible weapons and altercations, raised live', 'Critical severity with a clip to verify', 'Not a scanner, not facial recognition'],
  heroVisual: <HeroPlaceholder label="Personal safety · Entrances and floors" alt="A console camera wall of four cameras covering a main entrance, a retail floor, a corridor and a car park" frames={[{ src: '/cam-06.jpg', id: 'CAM 01', loc: 'MAIN ENTRANCE' }, { src: '/cam-03.jpg', id: 'CAM 09', loc: 'CORRIDOR · LEVEL 2' }, { src: '/cam-02.jpg', id: 'CAM 04', loc: 'BACK OF HOUSE' }, { src: '/cam-04.jpg', id: 'CAM 02', loc: 'CAR PARK' }]} active={0} />,
  secondary: { href: '/ai-features/weapons-detection', label: 'Weapons detection' },
  problem: {
    heading: 'The footage is reviewed after the ambulance has left',
    paras: [
      'An altercation on a shop floor or a school corridor lasts a minute, and the camera above it records the whole thing for someone to watch later. The guard at the front desk learns about it from a shout, or from a phone call, or from the report the next day. The recording changes what can be proven; it changes nothing about the minute.',
      'A visible weapon is the same problem with a shorter clock. The camera sees it before anyone in the building does, and it says nothing.',
    ],
    visual: 'notification',
    caption: 'A critical alert with the clip, as the guard receives it. The workflow is verify, then escalate.',
    alt: 'A guard notification for a failed checklist item, with the message, the snapshot and an acknowledgement',
  },
  handles: {
    heading: 'Raised when it is confirmed, verified by a person',
    paras: [
      <><Link href="/ai-features/weapons-detection" className="text-primary hover:underline">Weapons detection</Link> flags a visibly brandished firearm or edged weapon the moment it enters the frame and raises a critical alert with a clip and a confidence score. It is a visual model: it does not see through a bag or a coat, and it is not a scanner. <Link href="/ai-features/aggression-and-fight-detection" className="text-primary hover:underline">Aggression and fight detection</Link> watches the movement between individually tracked people and fires on the sustained, aggressive pattern of an altercation rather than on a busy scene.</>,
      <>Both are usually enabled together, because one escalates into the other. Both default to critical severity, and both put a clip in front of a person, because the correct workflow is to verify in seconds and then escalate, not to escalate on the alert alone. Afterwards, <Link href="/ai-features/forensic-video-search" className="text-primary hover:underline">AI suspect search</Link> finds the same person on other cameras by description, and <Link href="/platform/video-backup-and-retention" className="text-primary hover:underline">cloud backup</Link> holds the footage within the retention set for that camera.</>,
    ],
    detections: [
      { href: '/ai-features/weapons-detection', name: 'Weapons detection', role: 'A visibly brandished firearm or blade in frame, raised as critical with a clip. Not concealed weapons.' },
      { href: '/ai-features/aggression-and-fight-detection', name: 'Aggression and fight detection', role: 'Sustained aggressive movement between tracked people. A queue or a crowd does not match.' },
      { href: '/ai-features/forensic-video-search', name: 'AI suspect search', role: 'Find the same person on other cameras afterwards, by description. Not facial recognition.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'The tracks the fight model evaluates motion between, and the weapon model attaches to.' },
    ],
  },
  round: {
    heading: 'Where the round fits',
    label: 'CAM 01 · Main entrance',
    guard: 'Front desk',
    items: [['Entrance clear of obstruction', 'ok'], ['No altercation in progress', 'ok'], ['Guard present at desk', 'ok'], ['Camera view unobstructed', 'ok']],
    caption: 'A quiet entrance stop. The detections run between rounds; the round records that the entrance was in order at each time.',
    paras: [
      'These detections are continuous and do not wait for a round. The round adds the record: at each stop, the entrance was clear, no altercation was in progress, the desk was staffed, the camera could see. Repeated through the day, it shows the site was in order at each time, which matters in the review that follows an incident.',
      <>On an <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated round</Link>, the AI also raises a critical notification for a risk it sees at a stop that the checklist did not ask about.</>,
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'It will not detect a concealed weapon; it is not a metal detector or an X-ray. It will not identify anyone. It will not prevent the event; it shortens the time between the event and a person knowing, and the response is that person\'s. It will produce some alerts that a human, looking at the clip, will dismiss, and the workflow is built for that.',
      <>We do not publish detection or false-alert rates for these models. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> explains why, and it applies here more than anywhere.</>,
    ],
  },
  industries: [
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/education-facilities', name: 'Education facilities' },
    { href: '/industries/healthcare', name: 'Healthcare' },
    { href: '/industries/restaurants', name: 'Restaurants' },
  ],
  faqs,
};

export default function ViolenceAndWeaponsDetectionPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Violence and Weapons Detection", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Violence and Weapons Detection' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
