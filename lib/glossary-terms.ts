/*
 * The glossary: short, quotable definitions of the terms buyers and AI answer engines
 * use for this category. One entry renders one page at /glossary/<slug> through
 * app/glossary/[slug]/page.tsx, and the hub at /glossary lists them all, so adding a
 * term is adding an entry here. Every entry is also in the sitemap automatically.
 *
 * Rules for an entry: `definition` is two plain sentences that survive being quoted out
 * of context; `body` paragraphs are plain text, at most four sentences each, no markup;
 * `related` links must be routes that exist; `title` is 50 characters or fewer and
 * `description` 150 or fewer (checked by scripts/check-glossary.py); state only facts
 * the rest of the site states, and never a price, a count or a certification.
 */
export type GlossaryTerm = {
  /** URL segment, lowercase, hyphenated. */
  slug: string;
  /** The term as written in a heading. */
  term: string;
  /** Optional abbreviation shown next to the term, e.g. "NVR". */
  abbreviation?: string;
  /** <title> without the site suffix, 50 characters or fewer. */
  title: string;
  /** Meta description, 150 characters or fewer. */
  description: string;
  /** Two-sentence definition, the answer an engine quotes. */
  definition: string;
  /** Three to six plain-text paragraphs expanding on the definition. */
  body: string[];
  /** Two to five internal links to existing routes. */
  related: { href: string; label: string }[];
  /** Two or three questions with two-to-four-sentence answers. */
  faqs: { question: string; answer: string }[];
};

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: 'network-video-recorder',
    term: 'Network video recorder',
    abbreviation: 'NVR',
    title: 'What Is an NVR? | Network Video Recorder',
    description: 'A network video recorder is the box on site that records IP camera streams to its own disks. What it does, what it cannot, and the cloud alternative.',
    definition: 'A network video recorder, or NVR, is a device on site that receives the streams from IP cameras over the network and records them to its own hard disks. Footage is viewed and exported from the recorder itself, so it is both the storage and the single point of failure for every camera attached to it.',
    body: [
      'An NVR differs from the older DVR in what it accepts: a DVR takes analog camera signals and digitizes them, while an NVR takes streams that the IP cameras have already encoded. Both keep the footage on disks inside the box, and both are usually sized once at installation.',
      'The recorder sets the limits of the system. Retention is bounded by the disks fitted, the number of cameras by the channels licensed, and remote viewing by whatever port forwarding or vendor app the recorder supports. When the recorder fails, is stolen or is unplugged, the footage on it goes with it.',
      'A cloud VMS replaces the recorder with a service: cameras stream to the cloud, retention is set per camera rather than per box, and every site is viewed on one login. A site with too little upstream bandwidth, or a policy that footage never leaves the building, is the case where the recorder still wins.',
      'Many sites run both during a transition. A recorder that publishes its cameras as RTSP streams can be the source the cloud records from, so the archive on the recorder stays where it is while new footage is kept off site.',
    ],
    related: [
      { href: '/guides/what-is-a-cloud-nvr', label: 'Cloud NVR explained' },
      { href: '/cloud-video-surveillance', label: 'Cloud video surveillance' },
      { href: '/compare/cloud-vms-vs-on-premise', label: 'Cloud VMS vs on-premise VMS' },
      { href: '/use-cases/cloud-video-backup-against-dvr-theft', label: 'Cloud backup against recorder theft' },
    ],
    faqs: [
      { question: 'Do I need an NVR to use Camzify?', answer: 'No. Camzify records the camera stream in the cloud, so no recorder is needed. A recorder that is already installed can stay, and one that publishes RTSP streams can even be the source the cloud records from.' },
      { question: 'What happens to footage when an NVR is stolen?', answer: 'Everything on its disks leaves with it, which is the reason cloud backup exists: footage written off site as it is captured survives whatever happens to the hardware in the building.' },
    ],
  },
  {
    slug: 'video-management-system',
    term: 'Video management system',
    abbreviation: 'VMS',
    title: 'What Is a VMS? | Video Management System',
    description: 'A video management system is the software that records, stores, streams and searches camera video. On-premise or cloud, and what separates the two.',
    definition: 'A video management system, or VMS, is the software that takes in camera streams and records, stores, streams, searches and exports the video, and controls who can see which camera. It runs either on a server on site, an on-premise VMS, or as a subscription in the cloud, a cloud VMS.',
    body: [
      'The VMS is what an operator actually uses: the live wall, playback, export, user permissions and alerts. Cameras and recorders are hardware; the VMS is the layer that makes them one system.',
      'An on-premise VMS is licensed per server or per channel and maintained by the site or its integrator. It is strongest where deep integration with access control, building systems and on-site recorders is required, and where footage must stay inside the building.',
      'A cloud VMS delivers the same functions as a service, with no server to maintain, retention set per camera and every site on one login. On Camzify the AI detections and scheduled patrol rounds run inside the same system, on the same streams.',
    ],
    related: [
      { href: '/guides/what-is-a-cloud-vms', label: 'What is a cloud VMS?' },
      { href: '/platform', label: 'The Camzify platform' },
      { href: '/compare/camzify-vs-traditional-vms', label: 'Camzify vs traditional VMS' },
    ],
    faqs: [
      { question: 'Is a VMS the same as an NVR?', answer: 'No. An NVR is a recorder, a box with disks; a VMS is the software that manages recording, viewing and access, which may run on a server, inside a recorder, or in the cloud.' },
      { question: 'What makes a VMS a cloud VMS?', answer: 'The recording, storage and management run as a subscription service rather than on a server the site owns. Cameras stream to it, and the site keeps no recorder.' },
    ],
  },
];
