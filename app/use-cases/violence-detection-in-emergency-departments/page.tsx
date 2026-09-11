import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Violence Detection in Emergency Departments",
  description: "Aggression and fight detection on emergency department and waiting-room cameras: an assault on staff raised to security in seconds, with a clip.",
  path: "/use-cases/violence-detection-in-emergency-departments",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What does it actually detect?', answer: 'Sustained, aggressive physical movement between two or more individually tracked people: pushing, striking, grappling. It evaluates the motion between tracked subjects, not the amount of movement in the scene, so a full waiting room or a crowd at the triage window does not match. It does not hear anything, so a verbal threat is not detected until it becomes physical.' },
  { question: 'Will it alert when staff restrain an agitated patient?', answer: 'It can. A restraint, a patient pulled back from a door or a resuscitation can look like grappling to a visual model, and the alert will reach the security desk with a clip. A person looks at the clip and dismisses it in seconds, and the same footage is a record that the restraint happened and how. The workflow is built for alerts that a person dismisses.' },
  { question: 'Who receives the alert?', answer: 'Whoever is designated for that camera: the security desk, the charge nurse, a hospital operations center, or a contracted security agency. Alerts default to critical severity and go out on the channels configured for that category, with the clip. Severity and escalation are set per camera, so the ambulance bay and the waiting room route differently.' },
  { question: 'Where can the cameras be?', answer: 'Wherever the hospital has already decided cameras belong: waiting rooms, triage areas, corridors, ambulance bays, entrances and parking. Camzify runs on the cameras that exist and does not ask for any in treatment bays, and it does not identify anyone by face. Whether a clip becomes part of an incident report or a workplace-violence log is the hospital\'s decision under its own policies.' },
  { question: 'Does it help with the OSHA and Joint Commission expectations on workplace violence?', answer: 'It provides part of the record those programs ask for: a timestamped clip of the event, who was notified, when it was acknowledged, and a patrol report showing the security post and the waiting room were checked at each time. It is not a workplace violence prevention program and does not substitute for one. We make no compliance claim for it.' },
  { question: 'What will it not do?', answer: 'It will not prevent an assault, it will not detect a threat that stays verbal, and it will not see a room without a camera. It shortens the time between a physical altercation starting and a person in security knowing about it, with a clip in front of them. The response is that person\'s, and so is the decision about what the footage becomes.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Emergency departments',
  title: 'Violence detection in emergency departments',
  lede: <>
    <strong className="font-semibold text-foreground">Violence detection in emergency departments is the visual detection of a physical altercation, on the waiting-room, triage and corridor cameras a hospital already has, raised as a critical alert with a clip to the security desk while it is happening.</strong>{' '}
    Emergency staff are assaulted more often than any other workers in the country, and the camera above the triage window records it for the review. Camzify raises it instead, to a person who verifies the clip and responds.
  </>,
  facts: ['Altercations raised live, not reviewed later', 'On the waiting-room cameras already installed', 'A person verifies the clip and responds'],
  image: { src: '/feature-aggression-and-fight-detection-1.webp', alt: 'The console live view of a public square with a group of people outlined and a Violence Detected label as two of them grapple' },
  secondary: { href: '/ai-features/aggression-and-fight-detection', label: 'Aggression and fight detection' },
  problem: {
    heading: 'The security desk learns about it from the shout',
    paras: [
      'An emergency department at two in the morning has a triage nurse, a registration clerk, a waiting room of people who have been waiting for hours, and a security officer who is somewhere in the building. The altercation goes from raised voices to a hand on a nurse in seconds. Security learns about it from a shout, a duress button, or a phone call from the desk, and the camera over the window records all of it.',
      'The footage is reviewed afterwards. It establishes what happened and how long the nurse was alone with it, and it changes nothing about the minute.',
      'Emergency physicians and nurses describe this as routine, and the published surveys below say the same. A department cannot put an officer at every window, and the cameras that already cover every window are watched by nobody.',
    ],
    visual: 'notification',
    caption: 'The alert as the security desk receives it: the camera, the time, the clip and an acknowledgement. The workflow is verify, then respond.',
    alt: 'A security notification for a detected altercation, with the message, the snapshot and an acknowledgement button',
  },
  handles: {
    heading: 'Raised while it is happening, verified by a person',
    paras: [
      <><Link href="/ai-features/aggression-and-fight-detection" className="text-primary hover:underline">Aggression and fight detection</Link> watches the movement between individually tracked people on every enabled camera.</>,
      { points: [
        'Sustained pushing, striking or grappling between tracked people is the event; a crowded waiting room is not.',
        'The alert defaults to critical severity and carries the frame and a clip.',
        'An altercation involving three or more people is one tracked event, not three alerts.',
        'The person receiving it acknowledges it, and the record shows who and when.',
      ] },
      <><Link href="/ai-features/weapons-detection" className="text-primary hover:underline">Weapons detection</Link> is usually enabled on the same cameras, because a visibly held weapon in a waiting room is the same problem with a shorter clock. Both run at every hour; a notification window per camera limits when notifications go out, not when the detection runs, so the ambulance bay can route to the operations center overnight and to the desk by day. The <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification settings</Link> cover channels, severity and escalation.</>,
      <>Afterwards, <Link href="/platform/video-backup-and-retention" className="text-primary hover:underline">cloud backup</Link> holds the footage within the retention set for that camera, and <Link href="/use-cases/incident-investigation" className="text-primary hover:underline">incident investigation</Link> covers how the clip, the alert log and the acknowledgement are pulled together for a report. The broader <Link href="/use-cases/violence-and-weapons-detection" className="text-primary hover:underline">violence and weapons detection</Link> page covers both detections in other settings.</>,
    ],
    detections: [
      { href: '/ai-features/aggression-and-fight-detection', name: 'Aggression and fight detection', role: 'Sustained aggressive movement between tracked people at the window, in the corridor or in the bay. A full waiting room does not match.' },
      { href: '/ai-features/weapons-detection', name: 'Weapons detection', role: 'A visibly held firearm or blade in the waiting room, raised as critical with a clip. Not concealed weapons.' },
      { href: '/ai-features/multi-object-tracking', name: 'Multi-object tracking', role: 'Each person followed as one track, so the fight model evaluates motion between people rather than movement in the scene.' },
      { href: '/platform/notifications-and-alerts', name: 'Notifications and alerts', role: 'Critical by default, with channels and escalation per camera, so the desk, the charge nurse and the agency each get what they need.' },
    ],
  },
  round: {
    heading: 'What a waiting-room round checks',
    label: 'CAM 03 · ED waiting room',
    guard: 'Security desk',
    items: [['No altercation in progress', 'ok'], ['Triage window staffed', 'ok'], ['Security post occupied', 'fail'], ['Camera view unobstructed', 'ok']],
    caption: 'The room is calm and the window is staffed; the security post is empty. The round records it, and the detection covers the time until the officer is back.',
    paras: [
      'The detection is continuous and does not wait for a round. The round adds the record: at each stop, no altercation was in progress, the window was staffed, the post was occupied, the camera could see. Repeated through the night, it shows the department was in the state its workplace-violence plan assumes, which is what a hospital is asked to show afterwards.',
      <>A failed item messages the person designated for that camera and stays Pending in the <Link href="/virtual-patrolling/patrol-reports" className="text-primary hover:underline">report</Link> until it is marked Fixed. On an <Link href="/virtual-patrolling/automated-patrol-scheduling" className="text-primary hover:underline">automated round</Link>, the AI also raises a critical notification for a risk it sees at a stop that the checklist did not ask about. <Link href="/virtual-patrolling/guard-notifications" className="text-primary hover:underline">Guard notifications</Link> cover how a contracted officer receives and acknowledges it.</>,
    ],
  },
  evidence: {
    heading: 'Violence against emergency staff, in published figures',
    lede: 'Figures from the Bureau of Labor Statistics, NIOSH, the American College of Emergency Physicians and the Emergency Nurses Association, quoted as the source states them. None of them is a Camzify figure.',
    items: [
      { figure: '91%', text: 'In a January 2024 ACEP poll, more than nine in ten (91%) emergency physician respondents reported being threatened or attacked in the past year, and 71% believed violence in the emergency department was worse than the year before.', source: { name: 'ACEP, April 2024', href: 'https://www.acep.org/news/acep-newsroom-articles/when-emergency-physicians-regularly-fear-violence-at-work-its-past-time-for-change' } },
      { figure: '56 percent', text: 'Of nearly 500 ENA members who answered an April 2024 survey, 56 percent said they had been verbally assaulted, threatened with violence or physically assaulted in the previous 30 days.', source: { name: 'Emergency Nurses Association, April 2024', href: 'https://www.ena.org/news-publications/newsroom/ena-survey-56-percent-ed-nurses-assaulted-past-month' } },
      { figure: '14.2 per 10,000', text: 'In 2021-2022, health care and social assistance had 41,960 nonfatal workplace violence cases requiring days away from work, job restriction or transfer, 72.8 percent of all such cases in private industry, at an annualized rate of 14.2 per 10,000 full-time workers.', source: { name: 'BLS, Workplace violence 2021-2022', href: 'https://www.bls.gov/iif/factsheets/workplace-violence-2021-2022.htm' } },
      { figure: '76%', text: 'Of workers who experienced trauma from nonfatal workplace violence in 2020, 76% worked in the healthcare and social assistance industry, and 22% required 31 or more days away from work to recover.', source: { name: 'NIOSH, Violence and Work', href: 'https://www.cdc.gov/niosh/violence/about/index.html' } },
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'The limits follow from what it is: a visual detection on the cameras that exist, verified by a person.',
      { points: [
        'It will not prevent an assault; it shortens the time between an altercation starting and a person in security knowing, and the response is theirs.',
        'It will not detect a threat that stays verbal; it has no audio, and most of what emergency staff report is verbal before it is physical.',
        'It will produce alerts on restraints, resuscitations and rough handling that a person, looking at the clip, will dismiss, and the workflow is built for that.',
        'It will not see a treatment bay or a room without a camera, and it does not ask for one.',
        'It will not identify anyone, and it does not link a clip to a patient or a staff record.',
        'It is not a workplace violence prevention program, and it makes no OSHA or Joint Commission compliance claim.',
      ] },
      <>We do not publish detection rates, false-alert rates or response times for these models, and a page about assaults on nurses is the last place we would estimate one. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out the policy.</>,
    ],
  },
  industries: [
    { href: '/industries/healthcare', name: 'Healthcare' },
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/property-management', name: 'Property management' },
  ],
  faqs,
};

export default function ViolenceDetectionInEmergencyDepartmentsPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Violence Detection in Emergency Departments", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Violence Detection in Emergency Departments' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
