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
      { href: '/guides/what-is-a-video-management-system', label: 'What is a video management system? The full guide' },
      { href: '/guides/what-is-a-cloud-vms', label: 'What is a cloud VMS?' },
      { href: '/platform', label: 'The Camzify platform' },
      { href: '/compare/camzify-vs-traditional-vms', label: 'Camzify vs traditional VMS' },
    ],
    faqs: [
      { question: 'Is a VMS the same as an NVR?', answer: 'No. An NVR is a recorder, a box with disks; a VMS is the software that manages recording, viewing and access, which may run on a server, inside a recorder, or in the cloud.' },
      { question: 'What makes a VMS a cloud VMS?', answer: 'The recording, storage and management run as a subscription service rather than on a server the site owns. Cameras stream to it, and the site keeps no recorder.' },
    ],
  },
  {
    slug: "video-surveillance-as-a-service",
    term: "Video surveillance as a service",
    abbreviation: "VSaaS",
    title: "What Is VSaaS? | Video Surveillance as a Service",
    description: "VSaaS, video surveillance as a service, is cloud recording, storage and viewing sold as a subscription. What it covers, and what it does not.",
    definition: "Video surveillance as a service, or VSaaS, is a subscription in which cameras stream to a cloud service that records, stores, streams and manages the video instead of a recorder on site. The customer keeps its cameras and its internet connection and pays per camera or per instance per month for the service.",
    body: [
      "The term comes from the buyer's side: the recorder, the server and the software that used to be bought are replaced by a service, the way software as a service replaced installed software. Recording, storage, live view, user access and updates are included; cameras, installation and the site's bandwidth are not.",
      "A VSaaS subscription is the same thing a cloud VMS delivers, described as a service rather than as software. Vendors use the two terms for the same model, and a buyer comparing offers should read what each subscription includes rather than which name it carries.",
      "On Camzify the subscription is per instance per month: a stream instance for each camera, a detection instance for each AI feature on a camera, a patrol instance for each camera on rounds, and storage per terabyte. AI detections and scheduled patrol rounds run inside the same service on the same streams.",
      "A site with too little upstream bandwidth for its cameras, or a policy that footage must never leave the building, is the case where a recorder on site remains the better fit.",
    ],
    related: [
      { href: "/guides/what-is-vsaas", label: "What is VSaaS?" },
      { href: "/cloud-video-surveillance", label: "Cloud video surveillance" },
      { href: "/pricing", label: "Pricing" },
    ],
    faqs: [
      { question: "Is VSaaS the same as a cloud VMS?", answer: "In practice, yes. VSaaS names the subscription from the buyer's side and cloud VMS names the software that delivers it. Both mean cameras streamed to a cloud service with no recorder on site." },
      { question: "What is not included in VSaaS?", answer: "The cameras, their installation, and the internet connection that carries the streams. Those stay with the site, which is why bandwidth is the first thing to check before signing." },
    ],
  },
  {
    slug: "cloud-vms",
    term: "Cloud VMS",
    title: "What Is a Cloud VMS? | Cloud Video Management",
    description: "A cloud VMS is video management software delivered as a service: recording, storage, live view and users in the cloud, no server on site.",
    definition: "A cloud VMS is a video management system that runs as a cloud service rather than on a server the site owns. Cameras stream to it, footage is recorded and kept there under a retention window set per camera, and every site is viewed and managed from one login in a browser.",
    body: [
      "What separates a cloud VMS from an on-premise VMS is where the software runs and who maintains it. The functions are the same: live viewing, recording, playback, export, user permissions and alerts. The server, the disks, the updates and the remote access are the vendor's job instead of the site's.",
      "The trade-offs are practical. A cloud VMS needs upstream bandwidth for every camera streamed and puts the footage outside the building, encrypted. An on-premise VMS keeps footage local and integrates deeply with access control and building systems, at the cost of hardware to buy, maintain and replace.",
      "Camzify is a cloud VMS with virtual patrolling built in: alongside recording, live streaming, alerts, analytics and user management, it runs AI detections and scheduled patrol rounds on the same camera streams and files a report per round.",
    ],
    related: [
      { href: "/guides/what-is-a-cloud-vms", label: "What is a cloud VMS?" },
      { href: "/platform", label: "The Camzify platform" },
      { href: "/compare/cloud-vms-vs-on-premise", label: "Cloud VMS vs on-premise VMS" },
    ],
    faqs: [
      { question: "Do I need to replace my cameras for a cloud VMS?", answer: "No. A cloud VMS takes the streams the cameras already produce. Camzify connects any camera that streams RTSP, RTMP or HTTPS, directly or through the Camzify Connector on the local network." },
      { question: "When is an on-premise VMS the better choice?", answer: "When the site cannot carry its cameras upstream, when footage must never leave the building, or when the only need is local recording for occasional review." },
    ],
  },
  {
    slug: "cloud-video-surveillance",
    term: "Cloud video surveillance",
    title: "Cloud Video Surveillance, Defined | Glossary",
    description: "Cloud video surveillance sends camera streams to a cloud service that records and manages them instead of a recorder on site. The model, defined.",
    definition: "Cloud video surveillance is the model in which a site's cameras stream to a service in the cloud that records, stores and manages the video instead of a recorder on site. The cameras stay where they are; recording, retention, live viewing and user access move to the service.",
    body: [
      "The phrase describes the whole arrangement rather than one product: the cameras, the connection that carries them, and the cloud service on the other end. It is what a buyer means by cloud CCTV or a cloud NVR, and what a vendor means by VSaaS or a cloud VMS.",
      "Its advantages are the ones a recorder cannot offer: retention set per camera rather than per box, one login for every site, footage that survives a stolen or failed recorder, and on Camzify the AI detections and scheduled patrol rounds that run on the same streams.",
      "Its limits are bandwidth and policy. Every camera streamed needs upstream capacity at the site, and some organizations require footage to stay inside the building. A hybrid arrangement, with the recorder kept and the cloud added for the cameras that matter, covers both.",
    ],
    related: [
      { href: "/cloud-video-surveillance", label: "Cloud video surveillance" },
      { href: "/guides/hybrid-cloud-video-surveillance", label: "Hybrid cloud video surveillance" },
      { href: "/guides/cloud-vms-bandwidth-requirements", label: "Bandwidth requirements" },
    ],
    faqs: [
      { question: "Is cloud video surveillance secure?", answer: "On Camzify streams are encrypted in transit over TLS 1.2 or higher and footage is encrypted at rest with AES-256, access follows permission groups, and every action is in an audit trail. Compliance certifications are in progress and none is claimed as held." },
      { question: "How much bandwidth does it need?", answer: "The sum of the stream bitrates of the cameras you send to the cloud, which you read from the cameras' own settings and compare with the site's measured upload speed. No per-camera figure is published, because it depends on resolution, frame rate and codec." },
    ],
  },
  {
    slug: "remote-video-monitoring",
    term: "Remote video monitoring",
    abbreviation: "RVM",
    title: "Remote Video Monitoring, Defined | Glossary",
    description: "Remote video monitoring is watching a site's cameras from somewhere else, usually a monitoring center, and responding to what they show.",
    definition: "Remote video monitoring, or RVM, is the practice of watching a site's cameras from a location other than the site, usually a monitoring center, and acting on what they show. It replaces or supplements a guard on the premises with an operator, and increasingly with software, watching the same cameras from afar.",
    body: [
      "The service has two halves. The first is the watching: an operator or an AI system looking at the cameras, continuously or on a schedule, and noticing what matters. The second is the response: a call to the site, a message to a guard, a dispatch, or a call to the police.",
      "Monitoring centers run it as a service for many client sites, and the economics depend on how much of the watching can be automated. Detections raise events for an operator to verify; a scheduled camera round checks conditions at each camera and files a report without anyone watching a wall of screens.",
      "On Camzify the automated half is virtual patrolling: rounds run on a schedule, a checklist is confirmed at each camera, the guard for a failing camera is messaged, and the report per round is the record. The people who respond stay with the monitoring company or the site.",
    ],
    related: [
      { href: "/use-cases/remote-video-monitoring", label: "Remote video monitoring" },
      { href: "/partners/for-monitoring-centers", label: "For monitoring centers" },
      { href: "/virtual-patrolling", label: "Virtual patrolling" },
    ],
    faqs: [
      { question: "Is remote video monitoring the same as remote guarding?", answer: "They overlap. Remote guarding usually means a monitored service that includes a response, such as a voice-down or a dispatch; remote video monitoring is the watching part, which may or may not include the response." },
      { question: "Can remote video monitoring be automated?", answer: "The watching can, in large part. AI detections raise events between rounds and scheduled rounds check each camera against a list, so an operator handles what is raised rather than watching everything. The response still needs a person." },
    ],
  },
  {
    slug: "virtual-guard",
    term: "Virtual guard",
    title: "What Is a Virtual Guard? | Glossary",
    description: "A virtual guard watches a site through its cameras from somewhere else, on a schedule, and raises what a person must act on. The term defined.",
    definition: "A virtual guard is a security service in which a site is watched through its cameras from another location, by an operator or by software, instead of by a guard standing on the premises. It covers the routine watching and the round; a person still attends what it raises.",
    body: [
      "The term is the market's name for what a monitoring company sells: coverage of a site's cameras without a person on site, priced per site or per camera rather than per guard hour. The value is consistency, since the virtual guard checks every camera every time, and cost, since one operator covers many sites.",
      "On Camzify the virtual guard is virtual patrolling: scheduled rounds through the cameras with a checklist per camera, a guard messaged when a check fails, and a report per round. Security agencies and monitoring centers sell it on the cameras their clients already own.",
      "A virtual guard does not replace the response. A door found open still needs someone to close it, and an intruder still needs someone to attend, whether that is a mobile patrol, the site's own staff or the police.",
    ],
    related: [
      { href: "/virtual-guard", label: "Virtual guard" },
      { href: "/virtual-patrolling/vs-security-guards", label: "Virtual patrolling vs security guards" },
      { href: "/partners/for-security-agencies", label: "For security agencies" },
    ],
    faqs: [
      { question: "Is a virtual guard the same as an AI security guard?", answer: "Yes, it is the same service under a newer name: software that watches a site through its cameras, runs rounds, and messages a person about what it finds." },
      { question: "What does a virtual guard not do?", answer: "Attend. It watches, checks and raises; the physical response stays with a person on call, a mobile patrol or the police." },
    ],
  },
  {
    slug: "virtual-patrolling",
    term: "Virtual patrolling",
    title: "What Is Virtual Patrolling? | Glossary",
    description: "Virtual patrolling is a scheduled round through a site's cameras with a checklist at each stop, a guard notified on failure and a report per round.",
    definition: "Virtual patrolling is a scheduled patrol round conducted through a site's cameras rather than on foot: each camera is a stop, each stop has a checklist, and a failed check notifies the assigned guard and is recorded in a report for the round. It replaces the routine walk, not the response.",
    body: [
      "A round is defined once as an ordered sequence of cameras with a list of conditions at each: is the gate closed, is the yard clear, is the shutter down. It then runs manually by an operator or automatically on a schedule set by frequency, hours and days in the site's own timezone.",
      "Every item is marked compliant or not, with the frame it was judged on. A failing item captures a snapshot and messages the guard designated for that camera; it stays pending until it is fixed, which captures the after frame, or is held with a written reason. The report per round carries all of it and a compliance percentage.",
      "An automated round also records, for every camera, a description of the scene, the people and objects present and any safety or security risk it sees, whether or not the checklist asked. That is what makes the report a record rather than a log.",
    ],
    related: [
      { href: "/virtual-patrolling", label: "Virtual patrolling" },
      { href: "/virtual-patrolling/how-it-works", label: "How it works" },
      { href: "/virtual-patrolling/patrol-reports", label: "Patrol reports" },
      { href: "/guides/what-is-virtual-patrolling", label: "What is virtual patrolling?" },
    ],
    faqs: [
      { question: "How is virtual patrolling different from a guard tour system?", answer: "A guard tour system proves that a guard reached a checkpoint, usually by tapping a tag. A virtual patrol proves the condition at the checkpoint, with a frame per item, and needs nobody to walk it." },
      { question: "Does it need special cameras?", answer: "No. It runs on the cameras a site already has, as long as they stream RTSP, RTMP or HTTPS, directly or through the Camzify Connector." },
    ],
  },
  {
    slug: "remote-guarding",
    term: "Remote guarding",
    title: "Remote Guarding, Defined | Glossary",
    description: "Remote guarding is a monitored security service delivered through a site's cameras from a monitoring center, with a response when something is seen.",
    definition: "Remote guarding is a security service in which a monitoring center watches a site through its cameras and responds to what it sees, typically with a voice warning, a call to the site or a dispatch. It is sold as an alternative to a guard on site, priced per site or per camera per month.",
    body: [
      "The service combines three things: cameras that are watched, a rule for what counts as an event, and a response when one happens. Detections and scheduled rounds supply the events; operators supply the judgment and the response.",
      "For a guarding company, remote guarding is a service line on the cameras a client already owns. The margin comes from covering many sites with few people, which is why the automated part matters: what software checks and files, an operator does not have to watch.",
      "On Camzify the automated part is virtual patrolling plus the detections on the same cameras. The monitoring center or agency keeps the response, the client relationship and the price it charges.",
    ],
    related: [
      { href: "/virtual-guard", label: "Virtual guard" },
      { href: "/guides/remote-guarding-cost", label: "Remote guarding cost" },
      { href: "/partners/for-security-agencies", label: "For security agencies" },
    ],
    faqs: [
      { question: "What does remote guarding cost?", answer: "It is priced per camera per month by most providers, set by the hours covered, the response included and whether cameras are bundled. The remote guarding cost guide sets out the drivers without quoting a figure." },
      { question: "Does remote guarding replace a guard?", answer: "It replaces the routine watching and the round. A response still needs a person, so most sites keep a smaller on-site or mobile presence for what is raised." },
    ],
  },
  {
    slug: "guard-tour-system",
    term: "Guard tour system",
    title: "What Is a Guard Tour System? | Glossary",
    description: "A guard tour system records that a guard reached each checkpoint on a round, usually by tapping a tag. What it proves, and what it cannot.",
    definition: "A guard tour system is a way of recording that a guard visited each checkpoint on a patrol route, usually by tapping a tag or scanning a code with a device that logs the time. It proves presence at the checkpoint; it does not record the condition the guard found there.",
    body: [
      "The systems range from wands and tags to phone apps with NFC or GPS. All of them answer the same question for a client or an insurer: was the round walked, and when. A missed tag is a missed checkpoint.",
      "What they cannot show is what the guard saw. The tag at the rear gate is tapped whether the gate was closed or open, which is why a guard tour log is evidence of attendance rather than of condition.",
      "A virtual patrol answers the other question. Each camera is a checkpoint, each checklist item is judged on the frame, and the report carries the frame for every item, so the record shows the condition at the time and needs nobody to walk the route.",
    ],
    related: [
      { href: "/guides/guard-tour-systems-explained", label: "Guard tour systems explained" },
      { href: "/compare/virtual-patrolling-vs-guard-tour-systems", label: "Virtual patrolling vs guard tour systems" },
      { href: "/use-cases/guard-tour-verification", label: "Guard tour verification" },
    ],
    faqs: [
      { question: "Do guard tour systems and virtual patrolling work together?", answer: "Yes. Many sites keep a guard tour for the physical round and add camera rounds for the hours nobody walks, so attendance and condition are both recorded." },
      { question: "Which is cheaper?", answer: "They are not priced alike: a tag system is priced per device and per guard, a virtual round per instance per month. The honest comparison is what each proves." },
    ],
  },
  {
    slug: "security-operations-center",
    term: "Security operations center",
    abbreviation: "SOC",
    title: "What Is a Security Operations Center? | SOC",
    description: "A security operations center is the room and team that watch a company's sites and systems and coordinate the response. Defined for security.",
    definition: "A security operations center, or SOC, is the facility and team from which an organization monitors its sites, cameras, alarms and access systems and coordinates the response to incidents. In physical security it is the in-house equivalent of a monitoring center; in IT the same term names the team that watches networks.",
    body: [
      "A physical security SOC brings the feeds together: the video wall, the alarm panels, the access control events and the phone lines. Its value is a single place where an event is seen, verified and acted on, with a record of who did what.",
      "The scale of what a SOC can watch is set by how much of the watching is automated. Detections turn cameras into events, scheduled camera rounds turn routine checks into reports, and operators handle what is raised rather than staring at every feed.",
      "Camzify's pages use the plainer term monitoring center for the same room when it belongs to a service provider. A company running its own SOC uses the same console: every site on one login, permission groups per operator, and a report per round.",
    ],
    related: [
      { href: "/partners/for-monitoring-centers", label: "For monitoring centers" },
      { href: "/platform/notifications-and-alerts", label: "Notifications and alerts" },
      { href: "/platform/live-streaming", label: "Live streaming" },
    ],
    faqs: [
      { question: "Is a SOC the same as a monitoring center?", answer: "Functionally, yes. A SOC is usually the organization's own; a monitoring center usually serves many clients as a service. Camzify's pages say monitoring center." },
      { question: "What does software change in a SOC?", answer: "What the operators spend their time on. With detections and scheduled rounds, an operator verifies and responds to events instead of watching feeds for them." },
    ],
  },
  {
    slug: "central-monitoring-station",
    term: "Central monitoring station",
    title: "Central Monitoring Station, Defined | Glossary",
    description: "A central monitoring station receives alarm signals from many sites and dispatches the response. What it does, and how video fits in.",
    definition: "A central monitoring station, also called a central station or alarm receiving center, is a staffed facility that receives alarm signals from many protected sites and dispatches the appropriate response. It is the traditional back end of a monitored alarm, and increasingly it verifies alarms with video before dispatching.",
    body: [
      "The station's job is triage: an alarm arrives, an operator checks it, and a call, a keyholder or the police follows. False alarms are the cost, since every one consumes an operator and often a dispatch, which is why verification matters.",
      "Video verification puts the camera view beside the alarm so the operator sees what tripped it. Detections on the same cameras give the station events between alarms, and scheduled camera rounds give it a way to sell coverage of sites that are not on an alarm at all.",
      "Camzify's pages use the term monitoring center for this kind of facility. The alarm verification use case and the monitoring centers partner page describe how the console fits beside the alarm receiving software the station already runs.",
    ],
    related: [
      { href: "/use-cases/alarm-verification", label: "Alarm verification" },
      { href: "/partners/for-monitoring-centers", label: "For monitoring centers" },
      { href: "/guides/adding-remote-patrols-to-alarm-monitoring", label: "Adding remote patrols to alarm monitoring" },
    ],
    faqs: [
      { question: "Does Camzify replace alarm receiving software?", answer: "No. It runs beside it: the camera view and a snapshot at the moment of the alarm, detections between alarms, and scheduled rounds with a report, while the alarm panel and the receiving software stay in place." },
      { question: "Why is it called a central station?", answer: "Because it is the central point that alarm signals from many premises report to. Alarm receiving center is the same thing in other markets." },
    ],
  },
  {
    slug: "video-verification",
    term: "Video verification",
    title: "What Is Video Verification? | Glossary",
    description: "Video verification is checking an alarm against the camera view before responding, so a false alarm is dismissed and a real one is dispatched faster.",
    definition: "Video verification is the practice of checking an alarm signal against the video from the cameras covering the area before deciding on a response. A verified alarm is dispatched with confidence; an unverified one, such as a pet or a door blown open, is closed without a callout.",
    body: [
      "The value is on both sides. Police and keyholders attend verified alarms faster and treat them more seriously, and the monitoring center stops paying for callouts that turn out to be nothing.",
      "Verification can be a clip sent with the alarm, a live view the operator opens, or a snapshot captured at the moment the signal arrived. Detections on the same cameras add a second signal: a confirmed person in a zone beside a triggered sensor is a stronger case than either alone.",
      "On Camzify an alarm brings the camera view and a snapshot to the operator's desk, and detections and scheduled rounds cover the site between alarms. The alarm itself, and the dispatch, stay with the receiving center.",
    ],
    related: [
      { href: "/use-cases/alarm-verification", label: "Alarm verification" },
      { href: "/guides/how-to-reduce-false-alarms", label: "How to reduce false alarms" },
      { href: "/partners/for-monitoring-centers", label: "For monitoring centers" },
    ],
    faqs: [
      { question: "Does video verification reduce false alarm callouts?", answer: "That is its purpose: the operator sees what tripped the alarm and closes the ones that are nothing. How many that is depends on the site, and no figure is published here." },
      { question: "Is video verification the same as video alarm monitoring?", answer: "Video alarm monitoring is the service; video verification is the step inside it where the alarm is checked against the video." },
    ],
  },
  {
    slug: "false-alarm",
    term: "False alarm",
    title: "What Is a False Alarm? | Glossary",
    description: "A false alarm is an alert raised by something that was not an incident: a shadow, an animal, a lighting change. Where they come from, how to cut them.",
    definition: "A false alarm is an alert raised by a security system for something that was not an incident, such as a shadow, an animal, a lighting change or a staff member who was allowed to be there. Every one costs an operator's attention and often a callout, and enough of them lead people to ignore the alerts that matter.",
    body: [
      "In video systems the classic source is pixel-based motion detection, which cannot tell a person from a headlight sweep. The second source is a rule drawn too wide, so a zone that should cover a yard also covers the road beside it. The third is timing: a detection that fires during the hours staff are expected.",
      "The fixes follow the causes. Detections that fire on a confirmed object track rather than pixel change ignore lighting and weather. Zones and lines drawn to the property boundary ignore the road. A notification window per camera keeps a detection quiet in the hours people belong there.",
      "On Camzify every detection fires on a confirmed track from multi-object tracking, rules are drawn per camera, and each feature carries its own notification window per camera. The false alarms guide sets out the method.",
    ],
    related: [
      { href: "/guides/how-to-reduce-false-alarms", label: "How to reduce false alarms" },
      { href: "/ai-features/motion-detection", label: "Motion detection" },
      { href: "/compare/ai-video-analytics-vs-motion-detection", label: "AI video analytics vs motion detection" },
    ],
    faqs: [
      { question: "What is a false alarm rate?", answer: "The share of alerts that turn out not to be incidents. It depends on the site, the camera placement and the rules, which is why Camzify publishes no figure for it." },
      { question: "Can false alarms be eliminated?", answer: "Not entirely, and a vendor claiming zero should be doubted. They can be cut substantially by detecting on tracks rather than pixels, drawing rules to the boundary and setting notification windows." },
    ],
  },
  {
    slug: "intrusion-detection",
    term: "Intrusion detection",
    title: "What Is Intrusion Detection? | Video Glossary",
    description: "Intrusion detection on cameras alerts when a person or vehicle crosses a line or enters an area it should not. Line, zone and how they differ.",
    definition: "Intrusion detection, in video security, is a detection that raises an alert when a person or vehicle enters an area or crosses a boundary where it should not be. It comes in two forms: line intrusion, a virtual tripwire across a boundary, and zone intrusion, a polygon over an area that should stay empty.",
    body: [
      "A line rule fires when a confirmed track crosses the line, optionally in one direction only, which suits fences, gates and thresholds. A zone rule fires on presence anywhere inside the polygon, whichever way the subject came in, which suits rooms, cages, yards and rooftops.",
      "Both depend on the quality of the tracking underneath. A detection that fires on a confirmed object track ignores shadows, rain and headlights; one that fires on pixel change does not, and becomes a false alarm generator at night.",
      "On Camzify line and zone intrusion are licensed as an instance per camera, each with a notification window, so a zone over a stockroom can be silent in working hours and live after close. Both feed the patrol round as a check at that camera.",
    ],
    related: [
      { href: "/ai-features/line-intrusion-detection", label: "Line intrusion detection" },
      { href: "/ai-features/zone-intrusion-detection", label: "Zone intrusion detection" },
      { href: "/use-cases/perimeter-security", label: "Perimeter security" },
    ],
    faqs: [
      { question: "Line or zone: which do I need?", answer: "A line for a boundary with one crossing point, such as a fence or a gate. A zone for an area with several ways in, such as a yard, a cage or a room." },
      { question: "Does intrusion detection work at night?", answer: "Yes, on a camera that can see at night. The detection needs a visible subject to track; the notification window is what keeps it quiet in the hours people are expected." },
    ],
  },
  {
    slug: "line-crossing-detection",
    term: "Line crossing detection",
    title: "Line Crossing Detection (Tripwire) | Glossary",
    description: "Line crossing detection draws a virtual tripwire on the camera view and alerts when a tracked person or vehicle crosses it, in one direction or both.",
    definition: "Line crossing detection, also called a virtual tripwire, draws a line on the camera view and raises an alert when a tracked person or vehicle crosses it. The line can be directional, so entering triggers and leaving does not, which is what makes it useful on a fence, a gate or a threshold.",
    body: [
      "The line is drawn once per camera over the boundary it protects. On every frame the tracked subjects are checked against it, and a crossing in the configured direction is the event, with the frame and the time.",
      "Its strength is precision: a road beside the fence is on the other side of the line and never triggers it. Its limit is that it protects one crossing point, so an area with several ways in needs a zone rule instead.",
      "On Camzify it is line intrusion detection, licensed as an instance per camera with a notification window, and a failed check on a round when a line has been crossed since the last stop.",
    ],
    related: [
      { href: "/ai-features/line-intrusion-detection", label: "Line intrusion detection" },
      { href: "/ai-features/zone-intrusion-detection", label: "Zone intrusion detection" },
      { href: "/use-cases/perimeter-security", label: "Perimeter security" },
    ],
    faqs: [
      { question: "What is the difference between a tripwire and a zone?", answer: "A tripwire fires on a crossing; a zone fires on presence inside an area. Use the tripwire for a boundary and the zone for a space." },
      { question: "Can a tripwire be one-directional?", answer: "Yes. A directional line raises entries and ignores exits, or the reverse, which keeps a delivery leaving the yard from raising an alert." },
    ],
  },
  {
    slug: "zone-intrusion-detection",
    term: "Zone intrusion detection",
    title: "Zone Intrusion Detection, Defined | Glossary",
    description: "Zone intrusion detection draws a polygon over an area that should be empty and alerts when a tracked person or vehicle is inside it.",
    definition: "Zone intrusion detection draws a polygon over an area of the camera view that should be empty and raises an alert when a tracked person or vehicle is inside it, regardless of how it entered. It suits rooms, cages, yards and rooftops, where a single line cannot cover every way in.",
    body: [
      "The zone is any shape, drawn to the physical boundary of the area. Each zone carries its own settings: what counts, people or people and vehicles, a dwell time before the alert fires, and a notification window so it is quiet in the hours the area is in use.",
      "A camera can carry more than one zone, so a wide view over a yard and a cage can have separate rules. Because the detection fires on a confirmed track, a shadow moving across the zone is not an event.",
      "On Camzify it is licensed as an instance per camera, and a zone found occupied is a failed check on a round with the frame kept for the report.",
    ],
    related: [
      { href: "/ai-features/zone-intrusion-detection", label: "Zone intrusion detection" },
      { href: "/ai-features/loitering-detection", label: "Loitering detection" },
      { href: "/use-cases/unauthorized-access-detection", label: "Unauthorized access detection" },
    ],
    faqs: [
      { question: "How is zone intrusion different from loitering detection?", answer: "Zone intrusion fires on entry; loitering detection waits and fires only when the subject stays beyond a set dwell time. Use loitering where people may pass but not linger." },
      { question: "Can a zone be silent during working hours?", answer: "Yes. The notification window per camera sets the hours in which the zone raises alerts; outside them the detection still runs but stays quiet." },
    ],
  },
  {
    slug: "loitering-detection",
    term: "Loitering detection",
    title: "Loitering Detection, Defined | Glossary",
    description: "Loitering detection alerts when a person or vehicle stays in a defined zone longer than a set dwell time. A pass through is ignored; a wait is raised.",
    definition: "Loitering detection raises an alert when a tracked person or vehicle remains inside a defined zone for longer than a dwell time you set. Someone walking through the zone does not qualify; someone who stays does, which is what separates it from zone intrusion.",
    body: [
      "The detection starts a timer for each track that enters the zone and ends it when the track leaves. A track still inside when the timer passes the threshold is the event, with the frame, the time and the elapsed dwell.",
      "It is built for places people are allowed to cross but not to wait: a rear entrance after closing, an ATM lobby, a fence line, a car park aisle. Each zone carries its own threshold, so a vestibule and a yard can differ.",
      "On Camzify it is licensed as an instance per camera and follows tracks from multi-object tracking; nothing in it identifies the person. It shipped in September 2026 after a period on the roadmap.",
    ],
    related: [
      { href: "/ai-features/loitering-detection", label: "Loitering detection" },
      { href: "/ai-features/zone-intrusion-detection", label: "Zone intrusion detection" },
      { href: "/use-cases/car-theft-and-vandalism-in-parking-facilities", label: "Car theft and vandalism in parking facilities" },
    ],
    faqs: [
      { question: "What counts as loitering?", answer: "Whatever dwell time you set for the zone. There is no fixed definition; a lobby might use a short threshold and a car park a longer one." },
      { question: "Does it identify the person?", answer: "No. It follows a track, not a face, and the alert carries a frame and a duration rather than an identity." },
    ],
  },
  {
    slug: "tailgating",
    term: "Tailgating",
    title: "What Is Tailgating? | Access Security Glossary",
    description: "Tailgating is a second person passing through a controlled door on one credential. Why badge logs miss it, and how a door camera counts it.",
    definition: "Tailgating, in access control, is a second person passing through a controlled door on the credential of the first, so the badge log records one entry while two people went in. It is the most common way a secure entrance is defeated, and the badge reader cannot see it.",
    body: [
      "Sometimes it is courtesy, holding the door for a colleague; sometimes it is deliberate. Either way the access system's record is wrong, which matters in a data center, a server room, a pharmacy or anywhere the log is the audit trail.",
      "A camera on the door can count. Tailgating detection tracks the people passing through the doorway per access event and raises an alert with the frame when more than one goes through on a single badge.",
      "On Camzify it is licensed as an instance per camera on the doors that matter, and the alert carries the frame and the time so the access log can be corrected and the person told.",
    ],
    related: [
      { href: "/ai-features/tailgating-detection", label: "Tailgating detection" },
      { href: "/use-cases/tailgating-detection-for-data-centers-and-secure-entrances", label: "Tailgating at data centers and secure entrances" },
      { href: "/use-cases/unauthorized-access-detection", label: "Unauthorized access detection" },
    ],
    faqs: [
      { question: "Does tailgating detection need integration with the access control system?", answer: "The detection works from the camera view alone, counting people through the doorway. Reconciling it against the badge log is done by the people who hold the log." },
      { question: "Is piggybacking the same as tailgating?", answer: "The terms are often used interchangeably. Some use piggybacking for the consensual case and tailgating for the unnoticed one; the camera counts both." },
    ],
  },
  {
    slug: "perimeter-security",
    term: "Perimeter security",
    title: "Perimeter Security, Defined | Video Glossary",
    description: "Perimeter security is protecting the boundary of a site, its fence, gates and open ground, so an intrusion is seen at the edge rather than inside.",
    definition: "Perimeter security is the protection of a site's outer boundary, its fence line, gates and the open ground inside them, so that an intrusion is detected at the edge rather than after someone is inside. On cameras it is done with line rules along the fence, zones over the ground and a scheduled round that checks the gates.",
    body: [
      "The perimeter is usually the longest and least watched part of a site. A guard sees a stretch of fence for a moment each hour; a camera sees its stretch continuously, and a detection turns that into an event when a person or vehicle crosses in.",
      "Good perimeter rules are drawn to the boundary itself, so the road outside is outside the rule, and are directional where the crossing matters one way. A round adds the checks a detection cannot make: is the gate closed, is the fence intact, is the compound clear.",
      "On Camzify perimeter security combines line intrusion along the fence, zones over the ground, camera tampering detection on the cameras themselves, and a patrol round with the gates on the checklist.",
    ],
    related: [
      { href: "/use-cases/perimeter-security", label: "Perimeter security" },
      { href: "/ai-features/line-intrusion-detection", label: "Line intrusion detection" },
      { href: "/industries/construction-sites", label: "Construction sites" },
    ],
    faqs: [
      { question: "Do I need special perimeter cameras?", answer: "No. Any camera that covers a stretch of the boundary can carry a line rule. Thermal or specialist cameras help at night, but they are not required for the detection to run." },
      { question: "What about passing traffic outside the fence?", answer: "A rule drawn to the fence line leaves the road outside it, so a passing car never crosses the line." },
    ],
  },
  {
    slug: "motion-detection",
    term: "Motion detection",
    title: "Motion Detection, Defined | Video Glossary",
    description: "Motion detection flags change in a camera's view. Pixel-based versions fire on shadows and rain; track-based versions fire only on a confirmed object.",
    definition: "Motion detection is a camera or software function that flags change in the scene, either by comparing pixels between frames or by detecting and tracking an object that moves. Pixel-based motion detection fires on shadows, rain and lighting; track-based motion detection fires only on a confirmed person, vehicle or object.",
    body: [
      "The pixel approach is what most recorders and cameras ship with, and it is why so many alerts are ignored: a tree in the wind and a person at the gate look the same to it.",
      "The track approach runs an object detector first and reports motion only for something it recognizes. It costs more compute and produces alerts a person can act on.",
      "On Camzify motion detection is track-based and comes with every stream instance at no charge, along with camera tampering detection. It is the baseline that the other detections build on.",
    ],
    related: [
      { href: "/ai-features/motion-detection", label: "Motion detection" },
      { href: "/compare/ai-video-analytics-vs-motion-detection", label: "AI video analytics vs motion detection" },
      { href: "/guides/how-to-reduce-false-alarms", label: "How to reduce false alarms" },
    ],
    faqs: [
      { question: "Why does my recorder's motion detection fire all night?", answer: "Because it compares pixels, and headlights, rain and shadows change pixels. A track-based detection only reports something it has recognized as a person, a vehicle or an object." },
      { question: "Is motion detection included on Camzify?", answer: "Yes. Motion detection and camera tampering detection come with every stream instance; other detections are licensed as instances per camera." },
    ],
  },
  {
    slug: "camera-tampering",
    term: "Camera tampering",
    title: "Camera Tampering, Defined | Video Glossary",
    description: "Camera tampering is anything that stops a camera seeing what it should: covered, moved, defocused or frozen. How it is detected and why it matters.",
    definition: "Camera tampering is any interference that stops a camera from seeing what it should: the lens covered or sprayed, the camera turned away, the focus knocked out, the scene changed, or the feed frozen. Tampering detection raises it as it happens, so a blinded camera is not discovered days later when its footage is needed.",
    body: [
      "The failure it prevents is silent. A camera that has been covered still reports as online and still records, and nobody notices until an incident sends someone to the footage.",
      "Detection compares what the camera sees now with what it should see: a sudden loss of focus, a covered lens, a scene that no longer matches, an abnormal brightness shift, or frames that stop changing. Each is raised with the frame and the time.",
      "On Camzify camera tampering detection comes with every stream instance at no charge and a camera view is also checked on every patrol round, so the round fails if the camera no longer covers its stop.",
    ],
    related: [
      { href: "/ai-features/camera-tampering-detection", label: "Camera tampering detection" },
      { href: "/use-cases/camera-health-monitoring", label: "Camera health monitoring" },
      { href: "/virtual-patrolling/patrol-checklists", label: "Patrol checklists" },
    ],
    faqs: [
      { question: "Is tampering the same as a camera going offline?", answer: "No. An offline camera stops streaming and is shown as offline. A tampered camera keeps streaming but no longer shows the scene it should, which is why it needs its own detection." },
      { question: "Does it catch a camera turned slowly over weeks?", answer: "A scene-change check compares the current view with the expected one, so a camera that has drifted off its target is raised even if no single movement was sudden." },
    ],
  },
  {
    slug: "multi-object-tracking",
    term: "Multi-object tracking",
    title: "Multi-Object Tracking, Defined | Video Glossary",
    description: "Multi-object tracking gives each person, vehicle or object in a camera view a persistent identity from frame to frame. Every detection builds on it.",
    definition: "Multi-object tracking is the computer vision process that detects every person, vehicle or object in a camera view and follows each one from frame to frame as the same subject. It is what lets a system say that a person crossed a line, stayed in a zone or passed through a door, rather than that pixels changed.",
    body: [
      "A tracker keeps an identity for each subject through brief occlusions and re-entries, so a person who walks behind a pillar comes out as the same track. Every rule on the camera, line, zone, dwell time or count, is evaluated against those tracks.",
      "The identity is a track number, not a person's identity. Tracking does not recognize faces; it follows shapes and motion, which is why detections built on it can run without identifying anyone.",
      "On Camzify multi-object tracking underlies every detection and the patrol round, and pairs with AI attribute extraction to attach a plain description such as clothing color to a track when that feature is enabled.",
    ],
    related: [
      { href: "/ai-features/multi-object-tracking", label: "Multi-object tracking" },
      { href: "/ai-features/ai-attribute-extraction", label: "AI attribute extraction" },
      { href: "/ai-features/cross-camera-journey-map", label: "Cross-camera journey map" },
    ],
    faqs: [
      { question: "Is multi-object tracking facial recognition?", answer: "No. It follows a subject as a track within a camera view; it does not identify who the person is, and Camzify does no facial recognition." },
      { question: "Why does it matter for false alarms?", answer: "Because a rule evaluated on tracks fires only for a recognized subject. Rain, shadows and headlights produce no track and therefore no alert." },
    ],
  },
  {
    slug: "ip-camera",
    term: "IP camera",
    title: "What Is an IP Camera? | Video Glossary",
    description: "An IP camera encodes video itself and sends it over a network, so any system that speaks its protocol can record it. Why that matters for the cloud.",
    definition: "An IP camera is a camera that encodes its own video and sends it as a stream over a network, usually with its own address, rather than sending an analog signal down a cable to a recorder. Because the stream is standard, any system that speaks the camera's protocol can receive it, including a cloud service.",
    body: [
      "Most IP cameras from the last decade publish their video over RTSP and describe themselves over ONVIF, which is what makes them interchangeable between recorders and software. Power usually arrives over the same network cable through PoE.",
      "The distinction matters for a cloud move. An IP camera can be connected to a cloud VMS directly, if it is reachable, or through a connector on the local network. An analog camera needs an encoder or a recorder to put it on the network first.",
      "Camzify connects any IP camera that streams RTSP, RTMP or HTTPS, from any brand, without replacing it.",
    ],
    related: [
      { href: "/supported-cameras", label: "Supported cameras" },
      { href: "/guides/onvif-and-rtsp-explained", label: "ONVIF and RTSP explained" },
      { href: "/guides/using-existing-cameras-with-a-cloud-vms", label: "Using existing cameras with a cloud VMS" },
    ],
    faqs: [
      { question: "Will my IP cameras work with Camzify?", answer: "If they stream RTSP, RTMP or HTTPS, yes, which covers nearly every IP camera made in the last decade. Check the camera's own interface for an RTSP address." },
      { question: "What about analog cameras?", answer: "They need an encoder or a recorder that publishes their video as a network stream. Without one there is no stream for a cloud service to receive." },
    ],
  },
  {
    slug: "onvif",
    term: "ONVIF",
    title: "What Is ONVIF? | Camera Standard Glossary",
    description: "ONVIF is the open standard that lets IP cameras, recorders and software from different makers work together. What conformance means for a cloud VMS.",
    definition: "ONVIF is an open industry standard that lets IP cameras, recorders and video software from different manufacturers work together, by defining how a device describes itself, exposes its video streams and accepts commands. A camera that conforms to ONVIF Profile S can be discovered and streamed by any conformant system.",
    body: [
      "Before ONVIF, each camera brand needed its own driver in the recording software, and changing one meant changing the other. With it, a buyer can mix brands and change software without replacing cameras.",
      "For a cloud VMS the practical part is the stream: an ONVIF camera exposes an RTSP address that the service can record from, and describes its profiles and controls in a documented way. Conformance is by profile, so check the profile the camera claims.",
      "Camzify connects to any ONVIF or RTSP camera. The supported cameras page and the ONVIF and RTSP guide explain what to look for on a camera you already own.",
    ],
    related: [
      { href: "/guides/onvif-and-rtsp-explained", label: "ONVIF and RTSP explained" },
      { href: "/supported-cameras", label: "Supported cameras" },
      { href: "/camera-connectivity", label: "Camera connectivity" },
    ],
    faqs: [
      { question: "Do I need ONVIF to use Camzify?", answer: "No. ONVIF makes discovery easier, but any camera that publishes an RTSP, RTMP or HTTPS stream can be connected, ONVIF or not." },
      { question: "What is ONVIF Profile S?", answer: "The profile for streaming video: it defines how a camera exposes its live stream and basic controls so a conformant client can use them." },
    ],
  },
  {
    slug: "rtsp",
    term: "RTSP",
    title: "What Is RTSP? | Camera Streaming Glossary",
    description: "RTSP is the protocol most IP cameras use to publish their live video. A camera with an RTSP address can be recorded by any system that can reach it.",
    definition: "RTSP, the Real Time Streaming Protocol, is the standard most IP cameras use to publish their live video stream to a recorder or software that requests it. A camera with an RTSP address can be viewed and recorded by any system that can reach that address on the network.",
    body: [
      "An RTSP address looks like a web address with a different prefix and usually carries the camera's login. The camera's own interface shows it, along with the stream profiles it offers: a main stream at full resolution and a sub stream at lower resolution for bandwidth.",
      "For a cloud service the question is reach. A camera whose RTSP stream is published to the internet can be connected directly; one on a private network needs a relay, which on Camzify is the Connector, a small application inside the network that carries the stream out without opening ports.",
      "Camzify also accepts RTMP from encoders and HTTPS streams (HLS and WebRTC), but RTSP is the route most existing cameras use.",
    ],
    related: [
      { href: "/camera-connectivity/rtsp-setup", label: "RTSP setup" },
      { href: "/camzify-connector", label: "The Camzify Connector" },
      { href: "/guides/onvif-and-rtsp-explained", label: "ONVIF and RTSP explained" },
    ],
    faqs: [
      { question: "Where do I find my camera's RTSP address?", answer: "In the camera's own web interface, usually under network or streaming settings, or in the manufacturer's documentation for the model." },
      { question: "Is RTSP secure over the internet?", answer: "RTSP itself is not encrypted, which is why publishing it to the internet is discouraged. The Connector carries the stream out over an encrypted outbound connection instead." },
    ],
  },
  {
    slug: "power-over-ethernet",
    term: "Power over Ethernet",
    abbreviation: "PoE",
    title: "What Is PoE? | Power over Ethernet Glossary",
    description: "Power over Ethernet delivers power and data to a camera over one network cable, which is why most IP cameras need no separate power supply.",
    definition: "Power over Ethernet, or PoE, is a way of delivering electrical power to a device over the same network cable that carries its data, so an IP camera needs one cable and no separate power supply. A PoE switch or injector supplies the power; the camera draws what it needs.",
    body: [
      "PoE is the reason IP camera installations are simpler than analog ones: one cable, terminated at a switch, powers and connects the camera. Standards define how much power a port can supply, and cameras with heaters or motors need the higher classes.",
      "It has nothing to do with the cloud directly, but it shapes what a site already has: a PoE switch full of cameras is a set of network streams waiting to be connected to something, whether that is a recorder or a cloud service.",
      "Camzify does not sell switches, cameras or any hardware. The cameras on a site's PoE switch connect to it as they are.",
    ],
    related: [
      { href: "/supported-cameras", label: "Supported cameras" },
      { href: "/camera-connectivity", label: "Camera connectivity" },
      { href: "/guides/using-existing-cameras-with-a-cloud-vms", label: "Using existing cameras with a cloud VMS" },
    ],
    faqs: [
      { question: "Does Camzify need PoE cameras?", answer: "No. How a camera is powered does not matter to the service; what matters is that it publishes a stream over the network." },
      { question: "Does a PoE camera stay on if the switch loses power?", answer: "No. The switch is its power supply, so a switch outage takes the cameras on it offline, and Camzify shows them as offline." },
    ],
  },
  {
    slug: "ptz-camera",
    term: "PTZ camera",
    abbreviation: "PTZ",
    title: "What Is a PTZ Camera? | Video Glossary",
    description: "A PTZ camera pans, tilts and zooms on command, covering a wide area with one lens. What it is good for and where a fixed camera is better.",
    definition: "A PTZ camera is one that can pan, tilt and zoom on command, either by an operator or on a preset tour, so a single camera can cover a wide area and look closely at part of it. A fixed camera sees one framing all the time; a PTZ sees only where it is pointed.",
    body: [
      "PTZ cameras suit large open sites and live operation: a yard, a car park, a perimeter an operator wants to follow something along. Presets let a camera return to a known framing, and tours cycle through them.",
      "Their weakness is the same as their strength. While it is zoomed on one corner it is blind to the rest, and a detection rule drawn on one framing is meaningless in another. For continuous detection a fixed camera on each area is more reliable.",
      "Camzify supports PTZ control through the Connector for cameras on a local network, and treats a PTZ camera like any other for recording and for the patrol round at its preset framing.",
    ],
    related: [
      { href: "/camzify-connector", label: "The Camzify Connector" },
      { href: "/supported-cameras", label: "Supported cameras" },
      { href: "/platform/live-streaming", label: "Live streaming" },
    ],
    faqs: [
      { question: "Can detections run on a PTZ camera?", answer: "They can run on the framing the camera holds. A rule drawn for one preset does not apply when the camera is pointed elsewhere, so PTZ cameras are better used for live operation and fixed cameras for detection." },
      { question: "Can I control a PTZ camera from Camzify?", answer: "Yes, through the Connector for cameras on the local network, which passes the control commands to the camera." },
    ],
  },
  {
    slug: "video-retention",
    term: "Video retention",
    title: "What Is Video Retention? | Video Glossary",
    description: "Video retention is how long recorded footage is kept before it is deleted. Set by law, sector, insurer and storage, and on Camzify per camera.",
    definition: "Video retention is the period for which recorded footage is kept before it is automatically deleted, set by the rules that apply to the site, the sector and the insurer, and by the storage available. On a cloud VMS it is a setting per camera, in days or as a storage cap, rather than a property of a recorder's disks.",
    body: [
      "The obligation across the major privacy regimes has a common shape: a stated purpose for recording, retention no longer than that purpose needs, a defined period that the system actually enforces, and rights for the people recorded. The number itself varies by sector and contract.",
      "A recorder enforces one period for every camera on it, set by its disks. A cloud VMS sets the period per camera, so a gate camera can keep ninety days while a corridor keeps seven, and a whole site can be set at once.",
      "On Camzify retention is set per camera in days or as a storage cap, drawn from a storage pool sold per terabyte per month. Footage past its window is deleted; an incident is exported within the window.",
    ],
    related: [
      { href: "/guides/video-retention-requirements", label: "Video retention requirements" },
      { href: "/platform/video-backup-and-retention", label: "Video backup and retention" },
      { href: "/guides/how-to-configure-cloud-video-backup", label: "How to configure cloud video backup" },
    ],
    faqs: [
      { question: "How long should I keep footage?", answer: "As long as the rule that applies to you says and no longer. Most commercial sites settle between roughly one and three months; licensed sectors are often required to keep more. Confirm with counsel before fixing a policy." },
      { question: "What happens when retention runs out?", answer: "Footage past the window is deleted, and a camera on a storage cap rolls the oldest footage off as new footage arrives. The camera keeps recording either way." },
    ],
  },
  {
    slug: "cloud-video-backup",
    term: "Cloud video backup",
    title: "What Is Cloud Video Backup? | Video Glossary",
    description: "Cloud video backup writes camera footage to storage outside the building as it is captured, so a stolen or failed recorder takes no evidence with it.",
    definition: "Cloud video backup is the recording of camera footage to storage outside the building as it is captured, so that a stolen, smashed or failed recorder on site takes no evidence with it. It can run beside a recorder or replace it, and the footage is kept under a retention window set per camera.",
    body: [
      "The case for it is the DVR under the desk. Thieves take it, floods reach it, disks fail, and in each case the footage of the event is on the device that is gone. Footage written off site as it is captured survives all of them.",
      "Backup can be continuous or on a schedule per camera, and a schedule can be applied to a whole site. Retention is set per camera in days or as a storage cap, and playback, comparison and export happen in the same console.",
      "On Camzify cloud backup is the recording layer of the cloud video surveillance service, sold per terabyte per month, with the recorder on site optional.",
    ],
    related: [
      { href: "/platform/video-backup-and-retention", label: "Video backup and retention" },
      { href: "/use-cases/cloud-video-backup-against-dvr-theft", label: "Cloud backup against DVR theft" },
      { href: "/guides/how-to-configure-cloud-video-backup", label: "How to configure cloud video backup" },
    ],
    faqs: [
      { question: "Do I have to remove my recorder to use cloud backup?", answer: "No. Camzify records from the camera stream, not from the recorder, so the recorder carries on. A recorder that publishes RTSP can even be the source the cloud records from." },
      { question: "What happens to footage recorded before the backup started?", answer: "It stays on the recorder. Cloud backup covers what is captured from the moment it is switched on." },
    ],
  },
  {
    slug: "cctv",
    term: "Closed-circuit television",
    abbreviation: "CCTV",
    title: "What Is CCTV? | Closed-Circuit Television",
    description: "CCTV is the everyday UK term for camera surveillance, recorded or live. What it covers, and how cloud video surveillance fits under it.",
    definition: "CCTV, closed-circuit television, is any camera system whose picture is sent to a limited set of monitors or a recorder rather than broadcast, and it is the term most UK buyers and installers use for what a US buyer might call video surveillance. It covers everything from a single doorbell camera to a multi-site network of IP cameras recording to the cloud.",
    body: [
      "The term predates IP cameras and the cloud by decades, from the closed circuit that carried an analog signal to a single monitor on site. It stuck as the everyday name for the category even as the technology underneath it changed completely, which is why installers, guarding companies and buyers in the UK still say CCTV where a US site might say video surveillance or a VMS.",
      "A modern CCTV system can be almost entirely cloud based: IP cameras stream over the network to a service that records, stores and serves the footage, with no recorder on site. Installers and monitoring companies sometimes call this specific case cloud CCTV, to distinguish it from a system that still records to a local NVR.",
      "Camzify is a cloud video management system that runs on the CCTV cameras a site already has, adding AI detection and scheduled patrol rounds on top of recording and playback. It is not a CCTV installer or a camera manufacturer, and it does not use or claim the term to mean anything other than what it already means across the industry.",
    ],
    related: [
      { href: "/cloud-video-surveillance", label: "Cloud video surveillance" },
      { href: "/guides/what-is-a-cloud-vms", label: "What is a cloud VMS?" },
      { href: "/virtual-guard", label: "Virtual guard" },
    ],
    faqs: [
      { question: "Is CCTV the same as video surveillance?", answer: "Yes. They describe the same thing, a camera system whose footage goes to a limited set of viewers rather than being broadcast. CCTV is the term used more often in the UK, video surveillance more often in the US." },
      { question: "Does cloud CCTV still count as CCTV?", answer: "Yes. Moving the recording and storage to the cloud changes where the footage lives, not what the system is for, so cloud CCTV, cloud video surveillance and cloud VMS all describe the same model." },
    ],
  },
  {
    slug: "alarm-receiving-centre",
    term: "Alarm receiving centre",
    abbreviation: "ARC",
    title: "What Is an ARC? | Alarm Receiving Centre",
    description: "An ARC is the staffed control room that receives and verifies alarm signals from monitored sites, then decides what happens next.",
    definition: "An alarm receiving centre, or ARC, is a staffed control room that receives alarm signals from monitored sites, such as an intruder alarm or a camera-triggered event, and decides how to respond. UK ARCs are typically accredited to a recognised standard by a body such as SSAIB or NSI.",
    body: [
      "A signal reaching an ARC is only the start of the response. An operator checks it against the account's own instructions, which can mean calling a keyholder, contacting the police under a police-response agreement, or dispatching a guard, and every step is logged against the account.",
      "Accreditation matters to a buyer choosing a monitoring provider, because it is what separates a genuine ARC from an unstaffed answering service. SSAIB and NSI both run grading schemes for ARCs against standards such as BS EN 50518, covering the building, the equipment and the operators.",
      "Many ARCs have added remote video response to their alarm-handling role, so an operator can view the camera behind a signal before deciding what it means. That is a distinct capability from an ARC's traditional alarm-only role, covered on its own under remote video response.",
      "Camzify is not an ARC and does not staff one. It is software a monitoring company or guarding company can run to add scheduled patrol rounds and AI detections on top of the cameras an ARC's operators already watch, with a report attached to every round.",
    ],
    related: [
      { href: "/partners/for-monitoring-centers", label: "For monitoring companies" },
      { href: "/use-cases/alarm-verification", label: "Alarm verification" },
      { href: "/virtual-patrolling/vs-security-guards", label: "Virtual patrolling vs security guards" },
    ],
    faqs: [
      { question: "Is an ARC the same as a monitoring station?", answer: "Yes, monitoring station and monitoring centre are used interchangeably with alarm receiving centre in the UK market for the same staffed control room." },
      { question: "Does Camzify replace an ARC?", answer: "No. Camzify adds scheduled rounds and detections on the cameras an ARC already has access to; the ARC's operators still decide what happens when something is raised." },
    ],
  },
  {
    slug: "remote-video-response",
    term: "Remote video response",
    abbreviation: "RVR",
    title: "What Is RVR? | Remote Video Response",
    description: "Remote video response is video-verified alarm response from an accredited monitoring centre. How it differs from a scheduled patrol round.",
    definition: "Remote video response, or RVR, is video-based verification and response to an alarm or a camera-detected event, carried out by an operator at an accredited remote video response centre, or RVRC. It is reactive by design: an event triggers the check, rather than the check happening on a schedule.",
    body: [
      "When a signal or a detection reaches an RVRC, an operator pulls up the relevant camera, judges what it shows and decides on a response, from resetting a false alarm to escalating to the police or a guard. SSAIB runs a named accreditation scheme for RVRCs, and NSI covers the same ground under its own grading.",
      "RVR is easy to confuse with a scheduled patrol round, and the two solve different problems. RVR answers a specific alarm or event as it happens; a scheduled round checks a fixed list of cameras against a checklist at set times, whether or not anything has triggered, and files a report either way.",
      "Many sites use both. Camzify's scheduled rounds and AI detections run on a set schedule and a notification window, and the person or monitoring company they alert can be the same one running an RVR service for that site's alarms.",
      "Camzify does not itself operate as an RVRC. It is the software a monitoring company can run alongside its RVR service, providing the scheduled side of camera coverage that a reactive, event-only service does not.",
    ],
    related: [
      { href: "/virtual-patrolling", label: "Virtual patrolling" },
      { href: "/virtual-guard", label: "Virtual guard" },
      { href: "/partners/for-monitoring-centers", label: "For monitoring companies" },
    ],
    faqs: [
      { question: "Is RVR the same as virtual patrolling?", answer: "No. RVR responds to an alarm or event as it happens; virtual patrolling runs scheduled rounds on a fixed timetable regardless of whether anything has triggered, and the two are commonly run together." },
      { question: "What is an RVRC?", answer: "A remote video response centre, the accredited monitoring centre that delivers RVR. SSAIB and NSI both run accreditation schemes an RVRC can hold." },
    ],
  },
  {
    slug: "sia-licence",
    term: "SIA licence",
    title: "What Is an SIA Licence? | UK Security",
    description: "An SIA licence is required for certain private security roles in the UK. Which roles need one, and who it applies to.",
    definition: "An SIA licence is a licence issued by the UK's Security Industry Authority, required to work in certain private security roles such as door supervision, CCTV public space surveillance and close protection. It is held by individuals, not by companies, though a guarding company will typically only deploy licensed staff to a licensable role.",
    body: [
      "Not every security-adjacent role needs one. In-house security staff and roles that do not fall under the licensable activities the SIA has defined can operate without a licence, which is part of why buyers and job listings are specific about which roles are licensed.",
      "For a buyer comparing guarding or monitoring companies, staff holding a current SIA licence for the role they are doing is a baseline regulatory fact worth asking about directly, rather than assuming.",
      "Camzify is software, not a guarding company, and does not hold or require an SIA licence itself. The licence applies to the individuals a guarding company, monitoring company or ARC employs in licensable roles, which can include the people who respond to what Camzify's rounds and detections raise.",
    ],
    related: [
      { href: "/partners/for-security-agencies", label: "For security agencies" },
      { href: "/use-cases/alarm-verification", label: "Alarm verification" },
      { href: "/trust", label: "Trust" },
    ],
    faqs: [
      { question: "Does Camzify need an SIA licence?", answer: "No. Camzify is software; the SIA licence applies to individuals in licensable private security roles, such as staff at the guarding or monitoring companies that run Camzify." },
      { question: "Who issues SIA licences?", answer: "The Security Industry Authority, the UK's regulator for private security, which defines which roles are licensable and issues licences to the individuals who hold them." },
    ],
  },
  {
    slug: "nsi",
    term: "National Security Inspectorate",
    abbreviation: "NSI",
    title: "What Is NSI? | National Security Inspectorate",
    description: "NSI certifies UK security and fire safety companies against recognised standards. What it checks, and who holds it.",
    definition: "The National Security Inspectorate, or NSI, is a UK certification body that audits and approves guarding, monitoring and installation companies against recognised industry standards. An NSI-approved company has been independently inspected, rather than simply claiming a standard for itself.",
    body: [
      "NSI runs separate approval schemes across the industry, covering guarding companies, alarm and CCTV installers, and alarm receiving centres, each against the standard that applies to that kind of company. A company can hold NSI approval for one part of its business without every part being covered.",
      "SSAIB is the other widely recognised UK certification body doing similar work, and the two are generally treated as equivalent alternatives by buyers rather than one being preferred over the other. A company will usually hold one or the other, not both, for a given activity.",
      "Camzify does not hold NSI approval itself. The schemes NSI runs apply to guarding, monitoring and installation companies, the businesses that are Camzify's own customers and partners, not to a software vendor.",
    ],
    related: [
      { href: "/partners/for-security-agencies", label: "For security agencies" },
      { href: "/partners/for-monitoring-centers", label: "For monitoring companies" },
      { href: "/security-and-compliance", label: "Security and compliance" },
    ],
    faqs: [
      { question: "Is NSI the same as SSAIB?", answer: "No, they are two separate, independently recognised UK certification bodies covering similar ground. A guarding, monitoring or installation company typically holds one or the other for a given activity." },
      { question: "Does Camzify hold NSI approval?", answer: "No. NSI approval schemes apply to guarding, monitoring and installation companies. Camzify is the software some of those companies run." },
    ],
  },
  {
    slug: "ssaib",
    term: "Security Systems and Alarms Inspection Board",
    abbreviation: "SSAIB",
    title: "What Is SSAIB? | UK Security Certification",
    description: "SSAIB certifies UK security and fire companies, including alarm receiving centres and remote video response centres. What it covers.",
    definition: "The Security Systems and Alarms Inspection Board, or SSAIB, is a UK certification body that audits and approves companies across the security and fire industry, including alarm receiving centres and remote video response centres. It is one of the two widely recognised bodies buyers look for alongside NSI.",
    body: [
      "SSAIB runs named accreditation schemes for specific roles in the industry, including a scheme specifically for remote video response centres, which is how a monitoring company demonstrates it meets a recognised standard for that particular service rather than for alarm monitoring generally.",
      "A guarding, monitoring or installation company will typically hold SSAIB or NSI certification for a given activity, not both, and buyers generally treat the two as equivalent rather than one being a stronger signal than the other.",
      "Camzify does not hold SSAIB certification. Its schemes apply to the guarding, monitoring and installation companies that run services on top of Camzify, not to the software itself.",
    ],
    related: [
      { href: "/virtual-patrolling", label: "Virtual patrolling" },
      { href: "/use-cases/alarm-verification", label: "Alarm verification" },
      { href: "/partners/for-monitoring-centers", label: "For monitoring companies" },
    ],
    faqs: [
      { question: "What does SSAIB certify?", answer: "Companies across the UK security and fire industry, including guarding, installation, alarm receiving centres and, under a named scheme, remote video response centres." },
      { question: "Should I look for SSAIB or NSI?", answer: "Either is a recognised, independently audited certification. Most buyers treat them as equivalent alternatives rather than preferring one over the other." },
    ],
  },
  {
    slug: "bs-7858",
    term: "BS 7858",
    title: "What Is BS 7858? | Security Screening",
    description: "BS 7858 is the British Standard for vetting people who work in a security environment. What the checks cover.",
    definition: "BS 7858 is the British Standard for the security screening of individuals working in a security environment, covering identity verification, employment history and other background checks. It is the standard UK guarding and monitoring companies commonly point to when describing how their staff are vetted.",
    body: [
      "The checks a BS 7858 screening covers typically include verifying identity, confirming a period of employment or activity history, and checking for unspent criminal convictions, carried out before someone starts in a role covered by the standard.",
      "For a buyer, a guarding or monitoring company stating its staff are BS 7858 screened is a baseline trust signal about who has access to a site or its cameras, separate from any licence the individual might also hold.",
      "Camzify does not employ guards or monitoring-centre operators, so BS 7858 vetting is not something Camzify itself carries out. It applies to the staff of the guarding and monitoring companies that use Camzify, the people who actually attend a site or watch its cameras.",
    ],
    related: [
      { href: "/partners/for-security-agencies", label: "For security agencies" },
      { href: "/virtual-patrolling/vs-security-guards", label: "Virtual patrolling vs security guards" },
      { href: "/trust", label: "Trust" },
    ],
    faqs: [
      { question: "Does BS 7858 apply to Camzify staff?", answer: "No. Camzify does not employ guards or monitoring operators. BS 7858 vetting applies to the staff of the guarding and monitoring companies that run Camzify, the people with access to a site or its cameras." },
      { question: "Is BS 7858 the same as an SIA licence?", answer: "No. An SIA licence authorises a person for a specific licensable role; BS 7858 is a screening standard about how thoroughly that person's background was checked before they started." },
    ],
  },
];
