import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import Link from 'next/link';

const pageMeta = {
  title: "Tailgating Detection for Data Centers and Lobbies",
  description: "Tailgating detection at badge-controlled doors in data centers, labs and lobbies: the camera counts who came through on one badge and tells a person.",
  path: "/use-cases/tailgating-detection-for-data-centers-and-secure-entrances",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Does it need to integrate with our access control system?', answer: 'No. The event is detected on the camera, by counting the confirmed people who cross the threshold on one entry, so a door with a reader and a camera is enough. Where badge logs are available they can be paired, and the alert then shows the credential used alongside the count seen, which is what separates a colleague who should have badged from a stranger.' },
  { question: 'What happens when two people come through on one badge?', answer: 'The detection fires, the frame is recorded with the event, and the person designated for that door is notified through the channel set for that camera. On a patrol round, a tailgating event at a monitored door is logged as a non-compliant item. What follows, a call to the floor, a check of the badge log, a walk to the door, is a person\'s decision.' },
  { question: 'Will it flag two employees walking in together?', answer: 'Yes, if only one badged. The count is people through the door against entry events, not a judgment about who was authorized, and a second employee who did not present a credential looks the same to the camera as anyone else. Sites that pair the badge log can distinguish a second badge-in immediately after the first from an unbadged follower; sites that do not treat every second person as a question for a human.' },
  { question: 'How should the camera be placed?', answer: 'With a clear line of sight to the threshold, so each entrant is seen separately as they cross. A doorway view from inside or outside works; a wide ceiling view across a lobby does not count reliably at the door itself. The count comes from tracked people rather than motion, so two people close together are two, provided the camera can see them as two.' },
  { question: 'Can it follow the second person after the door?', answer: 'Yes, by description rather than by face. The cross-camera journey map links the same tracked person across the cameras that saw them next, with a confidence score per hop and the coverage gaps shown, and attribute extraction describes them by clothing and carried objects for the response. Nothing in the chain is a facial biometric.' },
  { question: 'What will it not do?', answer: 'It will not stop the door, lock anyone in or replace a vestibule; it is a detection on a camera, and the interlock remains the control that physically prevents a second entry. It will not say whether the second person was authorized, count from a camera that cannot see the threshold, or recognize a face. It will not satisfy a control on its own; the auditor judges the log of events and the round reports against the clause.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Badge-controlled doors',
  title: 'Tailgating detection for data centers and secure entrances',
  lede: <>
    <strong className="font-semibold text-foreground">Tailgating detection for data centers and secure entrances is the camera-side check that one badge admitted one person, at the doors where the badge log is otherwise the only record: data halls and cages, labs, records rooms and corporate lobbies.</strong>{' '}
    The access control system logs a valid credential and nothing about the second person who walked in behind it. Camzify watches the door, counts the people who crossed on each entry event, and messages the person designated for that door when the count is more than one.
  </>,
  facts: ['One badge, one person, counted on camera', 'No access-control integration required', 'Every event logged with its frame'],
  image: { src: '/feature-tailgating-detection-1.webp', alt: 'A camera view of a glass office door with a badge reader, a woman holding it open with her badge on a lanyard and a man following her through, outlined by the console as a person' },
  secondary: { href: '/ai-features/tailgating-detection', label: 'Tailgating detection' },
  problem: {
    heading: 'The badge log says one person came in',
    paras: [
      'A badge reader records that a credential was presented and the door released. It does not record how many people came through before the door closed, so the most common access-control failure leaves no trace in the access-control system. In the ASIS International survey of security professionals deployed in September 2023, tailgating or piggybacking topped the list of failures experienced in the previous six months, at 61 percent.',
      'Data centers, labs and records rooms answer this with vestibules and interlocking doors where the budget and the floor plan allow. Most doors on most sites are a single leaf with a reader, watched by a camera that records everything and counts nothing. When an auditor asks how the site knows that only authorized people entered the data hall, the honest answer is often that it does not.',
      <>The frameworks that data centers are audited against name the gap. <a href="https://doi.org/10.6028/NIST.SP.800-53r5" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">NIST SP 800-53</a> describes vestibules as designed to stop the following of authorized people through controlled doors, &quot;also known as piggybacking or tailgating,&quot; which &quot;results in unauthorized access to the facility.&quot; A SOC 2 examination tests that physical access to data center facilities is restricted to authorized personnel (<a href="https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Trust Services Criteria, CC6.4</a>), and PCI DSS requires that entry to sensitive areas be monitored on camera or by access control and the data reviewed.</>,
    ],
    visual: 'notification',
    caption: 'Two people through on one badge: the door camera raises the event with the frame, and the guard designated for that door is messaged.',
    alt: 'A phone notification for a tailgating event at a data hall door with the camera frame attached',
  },
  handles: {
    heading: 'The camera counts what the reader cannot',
    paras: [
      <><Link href="/ai-features/tailgating-detection" className="text-primary hover:underline">Tailgating detection</Link> watches the door and counts the confirmed people who cross the threshold on each entry event, from tracked objects rather than raw motion, so two people close together are two and not a blob.</>,
      { points: [
        'When more than one person enters on a single event, the detection fires, the frame is recorded, and the person designated for that door is notified through the channel set for that camera.',
        'No integration with the access control system is needed to detect the event on camera; where badge logs are available they can be paired, so an alert shows the badge used and the count seen.',
        <>A <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notification window</Link> per camera sets who is told and when; a lobby door at nine in the morning and a data hall door at two at night carry different rules, and the detection runs in both regardless.</>,
        <>The <Link href="/ai-features/cross-camera-journey-map" className="text-primary hover:underline">cross-camera journey map</Link> follows the second person from the door onward so the response knows where they went, and <Link href="/ai-features/ai-attribute-extraction" className="text-primary hover:underline">attribute extraction</Link> describes them by clothing rather than by face.</>,
        <>On a <Link href="/virtual-patrolling" className="text-primary hover:underline">patrol round</Link>, the door is a checklist stop, door closed, nobody in the vestibule, reader unobstructed, with a frame per answer in the report.</>,
      ] },
      'The event is logged with its frame whether or not anyone acts on it, which is what an auditor asks for after the fact.',
    ],
    detections: [
      { href: '/ai-features/tailgating-detection', name: 'Tailgating detection', role: 'Two or more people through on one entry event, at the door where the badge log shows one.' },
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'A person inside the cage or the data hall itself, whichever door they came through and however they got past it.' },
      { href: '/ai-features/cross-camera-journey-map', name: 'Cross-camera journey map', role: 'Where the second person went after the door, camera by camera, for the response and for the report.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'A door camera covered, moved or gone dark, raised the same day rather than found at the audit.' },
    ],
  },
  round: {
    heading: 'What a secure-entrance round checks',
    label: 'CAM 02 · Data hall door',
    guard: 'Security operations center',
    items: [['Door closed and latched', 'ok'], ['No person in vestibule', 'ok'], ['Reader and camera unobstructed', 'ok'], ['Door not propped or held', 'fail']],
    caption: 'The door is propped. The frame shows it, the operations center is messaged, and the after frame closes the item.',
    paras: [
      'Propped doors were the second most common failure in the same ASIS survey, at 50 percent, and a propped door is what a camera round is good at. A secure-entrance sequence visits every controlled door on a schedule and asks whether it is closed and latched, whether anyone is waiting in the vestibule, whether the reader and the camera are unobstructed, and whether the door has been wedged, tied or held. Between rounds, the detection watches the entry events themselves.',
      <>The report per round gives the audit a record of the doors as found, with a frame per item and the person notified on each failure. <Link href="/use-cases/unauthorized-access-detection" className="text-primary hover:underline">Unauthorized access detection</Link> covers the zones behind the doors, and <Link href="/use-cases/virtual-patrolling-for-compliance-evidence" className="text-primary hover:underline">virtual patrolling for compliance evidence</Link> covers building the round from the obligation backwards.</>,
    ],
  },
  evidence: {
    heading: 'Why this matters, in published figures',
    lede: 'From the security professionals\' association, the US standards body and the accountants\' institute whose criteria SOC 2 reports are written against. Camzify publishes no figures of its own.',
    items: [
      { figure: '61%', text: 'Security professionals who had experienced tailgating or piggybacking in the previous six months, the most common access control failure in the ASIS International survey deployed in September 2023 (1,022 participants, 705 of whom answered this question). Only 8 percent had experienced none of the failures listed.', source: { name: 'ASIS International, The Essentials of Access Control, 2023', href: 'https://www.asisonline.org/security-news/security-issues-research/2023-24/2023-access-control-research/' } },
      { figure: '50%', text: 'Respondents in the same survey who had faced propped doors in the prior six months, the second most common failure after tailgating. Fake or stolen credentials (8 percent) and breaking and entering (15 percent) were encountered less often.', source: { name: 'ASIS International, 2023 access control research report (PDF)', href: 'https://www.asisonline.org/globalassets/publications-and-resources/security-issues-research/2023-24/access-control/asis-2023-access-control-research-report.pdf' } },
      { figure: 'PE-3(8)', text: 'NIST SP 800-53 Rev. 5 describes access control vestibules as "designed to prevent unauthorized individuals from following authorized individuals into facilities with controlled access. This activity, also known as piggybacking or tailgating, results in unauthorized access to the facility." The base control PE-3 also requires physical access audit logs at defined entry and exit points.', source: { name: 'NIST SP 800-53 Rev. 5', href: 'https://doi.org/10.6028/NIST.SP.800-53r5' } },
      { figure: 'CC6.4', text: 'The AICPA Trust Services Criteria that SOC 2 examinations test against: "The entity restricts physical access to facilities and protected information assets (for example, data center facilities, backup media storage, and other sensitive locations) to authorized personnel to meet the entity\'s objectives."', source: { name: 'AICPA, 2017 Trust Services Criteria (revised points of focus 2022)', href: 'https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022' } },
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'Tailgating detection tells a person that two came through on one badge. What follows is theirs.',
      { points: [
        'It will not stop the door or lock anyone in; it is a detection on a camera, not an interlock, and a vestibule remains the control that physically prevents a second entry.',
        'It will not tell whether the second person was authorized; a colleague who should have badged looks the same as a stranger, and pairing with the badge log is what separates them.',
        'It will not count reliably from a camera that cannot see each entrant; a doorway view with a clear line of sight to the threshold is the condition, and a wide ceiling view is not.',
        'It will not recognize a face; the second person is described by clothing and carried objects if they are followed at all.',
        'It will not satisfy a control on its own; the auditor decides whether the log of events and the round reports meet the clause.',
      ] },
      <>We publish no detection rates for tailgating, and our own SOC 2 Type II and ISO 27001 certifications are in progress and not held. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out both.</>,
    ],
  },
  industries: [
    { href: '/industries/financial-services', name: 'Financial services' },
    { href: '/industries/healthcare', name: 'Healthcare' },
    { href: '/industries/multiple-sites', name: 'Multiple sites' },
    { href: '/industries/education-facilities', name: 'Education facilities' },
  ],
  faqs,
};

export default function TailgatingDetectionForDataCentersPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Tailgating Detection for Data Centers and Secure Entrances", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Tailgating Detection for Data Centers and Secure Entrances' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
