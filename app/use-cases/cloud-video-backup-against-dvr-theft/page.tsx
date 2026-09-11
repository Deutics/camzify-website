import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { serviceSchema } from '@/lib/seo';
import { UseCasePage, type UseCaseContent } from '@/components/content/use-case-page';
import { ProductShot } from '@/components/content/product-shot';
import Link from 'next/link';

/**
 * The recorder is the one box that holds every camera's evidence, and it sits inside
 * the building being burgled. This page is cloud video backup in that setting: the
 * footage of the break-in is already off site when the recorder leaves with the
 * burglar, and camera tampering detection says when a camera goes dark.
 */
const pageMeta = {
  title: "Cloud Video Backup Against DVR and NVR Theft",
  description: "Cloud video backup keeps footage off site so it survives a stolen, smashed or unplugged DVR or NVR. Retention per camera, and a tamper notification.",
  path: "/use-cases/cloud-video-backup-against-dvr-theft",
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What happens to the footage when the DVR or NVR is stolen?', answer: 'Everything recorded to Camzify before the recorder was taken is still in Camzify, because it was written to storage outside the building as it was captured. The recorder held a copy; the burglar took the copy. Playback and export work as they did the day before, from any browser or the mobile app, and the footage stays under the retention policy set for each camera.' },
  { question: 'Do I have to remove my existing recorder?', answer: 'No. Camzify records from the camera stream, not from the recorder, so the recorder carries on doing what it does. A camera reachable on the network connects directly by ONVIF or RTSP; a recorder that publishes its cameras as RTSP streams can be the source instead. In both cases the recorder stays as the local copy and Camzify holds the off-site one.' },
  { question: 'How far back does the off-site footage go?', answer: 'As far as the retention set for that camera. Each camera carries its own retention mode and limit, by days or by a storage cap in GB, and the presets of 7, 30, 60 or 90 days can be applied to every camera on the account in one action. The guide to video retention requirements covers how long different settings tend to need.' },
  { question: 'What does camera tampering detection add during a break-in?', answer: 'A notification at the moment a camera stops seeing, rather than a gap found in the morning. It watches five conditions: a covered lens, a sudden defocus, a scene change from the camera being moved or turned, an abnormal brightness shift, and frozen frames. Any of them raises to the person designated for that camera, with the frame that triggered it.' },
  { question: 'How do I give the footage to the police?', answer: 'Playback scrubs the recording for the camera and time range, and a download exports a clip of the range you choose. The clip can be handed over on any medium the investigating officer accepts. The patrol report for that night, if a round ran, gives the timestamped frames from each stop as well.' },
  { question: 'What will it not do?', answer: 'It will not stop the break-in, and it cannot record what a camera never saw. Footage is off site up to the moment the link is cut, so if the burglar unplugs the router or takes the machine running the Camzify Connector, recording stops at that moment and everything before it is kept. A camera that is smashed sends no more frames. Detections notify a person; a person decides what to do.' },
];

const content: UseCaseContent = {
  eyebrow: 'Use case · Break-ins and stolen recorders',
  title: 'Cloud video backup against DVR theft',
  lede: <>
    <strong className="font-semibold text-foreground">Cloud video backup against DVR theft is the recording of a site&apos;s cameras to storage outside the building, so the footage of a break-in survives when the recorder is stolen, smashed or unplugged on the way out.</strong>{' '}
    The recorder is the one box that holds every camera&apos;s evidence, and it sits in the building being burgled. Camzify records each camera to its own off-site storage as the frames arrive, with retention set per camera, and camera tampering detection raises the moment a camera goes dark.
  </>,
  facts: ['Footage stored off site as it is captured', 'Retention by days or GB, per camera', 'A camera going dark raises at once'],
  heroVisual: (
    <ProductShot
      src="/product-video-backup"
      alt="The Camzify video backup screen: a list of cameras with each one's retention mode, retention limit and estimated storage, and the account's storage totals above"
      label="Video backup and retention"
      priority
      sizes="(max-width: 1024px) 100vw, 45vw"
    />
  ),
  secondary: { href: '/platform/video-backup-and-retention', label: 'Video backup and retention' },
  problem: {
    heading: 'The burglar leaves with the evidence',
    paras: [
      'A recorder in the back office or under the counter is the single place where every camera on the site writes its footage. Whoever takes it, smashes it or pulls its plug removes the record of every camera at once, including the record of themselves arriving. The cameras keep working and have nowhere to write.',
      'The advice police give businesses is to keep recording equipment in a secure location with restricted access. A locked cabinet slows a burglar with a crowbar; it does not stop one, and it does nothing for a recorder that is simply unplugged. The footage has to be somewhere the burglar is not.',
      'The second problem is time. A covered lens or a camera turned to the wall is usually found when someone goes looking for the footage, which is after the loss. By then the gap is a fact, and the question of what happened has no answer.',
    ],
    visual: 'notification',
    caption: 'A camera going dark is a message to a person at that moment, with the frame that triggered it, rather than a gap found the next morning.',
    alt: 'A critical notification for a covered camera, sent to the designated person with the triggering frame',
  },
  handles: {
    heading: 'The footage is already somewhere else',
    paras: [
      <><Link href="/platform/video-backup-and-retention" className="text-primary hover:underline">Cloud video backup</Link> writes each camera&apos;s stream to Camzify storage as it is captured, so the record of a break-in leaves the building while the break-in is happening.</>,
      { points: [
        'Recording is continuous or scheduled per camera, and a schedule can be applied to a site or to every camera at once.',
        'Retention is set per camera, by days or by a storage cap in GB, and the presets of 7, 30, 60 or 90 days apply to the whole account in one action.',
        'Storage is shown as provisioned, used, assigned and remaining, and the storage estimate for a camera is labeled as an estimate.',
        'Playback scrubs the recording and a download exports a clip for a chosen time range.',
      ] },
      <><Link href="/ai-features/camera-tampering-detection" className="text-primary hover:underline">Camera tampering detection</Link> covers the moment before the recorder is touched, when the first thing a burglar does is deal with the camera.</>,
      { points: [
        'A covered lens, a sudden defocus, a camera turned or moved, an abnormal brightness shift or frozen frames each raise a notification with the frame.',
        <>The notification goes to the person designated for that camera on the channels set for that severity, through <Link href="/platform/notifications-and-alerts" className="text-primary hover:underline">notifications and alerts</Link>.</>,
        <><Link href="/ai-features/zone-intrusion-detection" className="text-primary hover:underline">Zone intrusion detection</Link> in the hours the premises are closed raises on a tracked person on the floor, before anyone reaches the back office.</>,
        <>Cameras on a local network reach Camzify through the <Link href="/camzify-connector" className="text-primary hover:underline">Camzify Connector</Link> with no port forwarding, and a recorder that publishes RTSP can be the source instead of the cameras.</>,
      ] },
    ],
    detections: [
      { href: '/platform/video-backup-and-retention', name: 'Video backup and retention', role: 'Every camera recorded off site as it is captured, with its own retention by days or GB.' },
      { href: '/ai-features/camera-tampering-detection', name: 'Camera tampering detection', role: 'A covered, turned, defocused or frozen camera raised at that moment, with the frame.' },
      { href: '/ai-features/zone-intrusion-detection', name: 'Zone intrusion detection', role: 'The shop floor, the stockroom or the unit corridor as a zone after hours. A tracked person is the event.' },
      { href: '/platform/notifications-and-alerts', name: 'Notifications and alerts', role: 'Channels per alert category and severity, per camera, so a dark camera reaches the person who will act.' },
    ],
  },
  round: {
    heading: 'What the closing round checks before the night',
    label: 'CAM 04 · Back office',
    guard: 'Store manager',
    items: [['Back door closed', 'ok'], ['Recorder cabinet shut', 'ok'], ['No person on the shop floor', 'ok'], ['Camera view unobstructed', 'fail']],
    caption: 'The doors are closed and the floor is empty; the camera is not clear. Found at closing time, that is a fix before the night rather than a gap after it.',
    paras: [
      <>The round that matters for this scenario is the <Link href="/use-cases/lock-up-and-closing-checks" className="text-primary hover:underline">closing round</Link>: a short sequence through the doors, the recorder cabinet, the floor and every camera&apos;s own view. Camera view unobstructed is on every stop, because a camera that is already blocked at closing time records nothing useful at 03:00, whether or not its recorder survives.</>,
      <>A failed item captures the frame and messages the person designated for that camera, and the item stays open until it is marked fixed with an after frame. A site that runs the round every night has a timestamped record that each camera was clear and each door was shut, which is also what an insurer asks for. <Link href="/use-cases/camera-health-monitoring" className="text-primary hover:underline">Camera health monitoring</Link> is the round that keeps the cameras themselves in order.</>,
    ],
  },
  evidence: {
    heading: 'Why it matters, in published figures',
    lede: 'Figures from the FBI, the Bureau of Justice Statistics and police crime-prevention guidance, linked to the page each comes from. None of them is a Camzify figure; we publish none.',
    items: [
      {
        figure: '373,766',
        text: 'Estimated burglaries at non-residence locations, "e.g., stores and offices", in the United States in 2024, against 405,776 at residences. Nearly half of the estimated burglaries were somewhere other than a home.',
        source: { name: 'FBI, UCR Summary of Reported Crimes in the Nation, 2024', href: 'https://cde.ucr.cjis.gov/LATEST/resources/reports/UCR%20Summary%20of%20Reported%20Crimes%20in%20the%20Nation%202024.pdf' },
      },
      {
        figure: '40.7%',
        text: 'Share of burglary or trespassing victimizations reported to police in 2024, down from 42.7% in 2023, in the Bureau of Justice Statistics\' household survey. A report is only as useful as the record behind it.',
        source: { name: 'Bureau of Justice Statistics, Criminal Victimization, 2024', href: 'https://bjs.ojp.gov/library/publications/criminal-victimization-2024' },
      },
      {
        figure: 'Secure location',
        text: 'The Philadelphia Police Department\'s advice to businesses: "Keep recording equipment in a secure location," and "Ensure cameras have ample storage and that employees know how to download or share images with police."',
        source: { name: 'City of Philadelphia, crime prevention tips for your business (2023)', href: 'https://www.phila.gov/2023-03-06-crime-prevention-tips-for-your-business-and-employees/' },
      },
      {
        figure: 'Restricted access',
        text: 'UK counter-terrorism policing\'s CCTV guidance: "Recording equipment should be placed in a secure area with restricted access," with storage sized to retain images for as long as can be justified.',
        source: { name: 'ProtectUK (NaCTSO), CCTV guidance', href: 'https://www.protectuk.police.uk/cctv' },
      },
    ],
  },
  limits: {
    heading: 'What it will not do',
    paras: [
      'Off-site footage is evidence that survives; it is not a lock on the door.',
      { points: [
        'It will not stop the break-in, and it does not claim to. It records, notifies the person designated for the camera and files the report; the person decides.',
        'It will not record after the link is cut. Footage is off site up to the moment the router is unplugged or the machine running the Connector is taken, and everything before that moment is kept.',
        'It will not record a camera that has been smashed, or one covered before the recording started.',
        'It will not keep footage past its retention. A camera set to 30 days or to a storage cap rolls its oldest footage off to make room, and scheduled recording captures only in its hours.',
      ] },
      <>We do not publish bandwidth per camera, uptime or detection rates for tampering. The <Link href="/trust" className="text-primary hover:underline">trust page</Link> sets out why, and the <Link href="/guides/video-retention-requirements" className="text-primary hover:underline">retention guide</Link> covers how long to keep footage.</>,
    ],
  },
  industries: [
    { href: '/industries/retail', name: 'Retail' },
    { href: '/industries/restaurants', name: 'Restaurants' },
    { href: '/industries/self-storage', name: 'Self-storage' },
    { href: '/industries/warehouses', name: 'Warehouses' },
  ],
  faqs,
};

export default function CloudVideoBackupAgainstDvrTheftPage() {
  return (
    <PageShell {...pageMeta} faqs={faqs} schema={[serviceSchema({ name: "Cloud Video Backup Against DVR Theft", description: pageMeta.description, path: pageMeta.path })]} breadcrumbs={[
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Cloud Video Backup Against DVR Theft' },
    ]}>
      <UseCasePage c={content} />
    </PageShell>
  );
}
