/**
 * Setup guides for the camera brands people search by name: one entry renders one
 * /supported-cameras/<slug> page (app/supported-cameras/[brand]/page.tsx).
 *
 * WHY THESE EXIST. Searches like "hikvision rtsp url", "reolink onvif" or "unifi protect
 * rtsp" carry real, low-competition demand (DataForSEO, US, October 2026), and the people
 * making them are the installers and integrators Camzify sells through. A brand list on
 * /supported-cameras cannot rank for them; a page that answers the setup question can,
 * and then shows what the camera can run once it is connected.
 *
 * RULES FOR AN ENTRY (same standard as the competitor pages, CLAUDE.md rule 8, applied
 * to camera makers):
 * - Every technical fact about the brand (stream URL format, where ONVIF or RTSP is
 *   switched on, whether it pushes RTMP) comes from that manufacturer's own website or
 *   documentation, opened when the entry was written, and the page is listed in
 *   `sources`. No forums, no aggregator sites, no memory.
 * - Where the manufacturer's documentation does not say something, the entry does not
 *   say it either.
 * - Nothing implies partnership, certification or endorsement. Listing states an
 *   interoperability fact; the page repeats the trademark disclaimer.
 * - Facts about Camzify come from the site's existing pages (camera connectivity,
 *   Connector, detections), not from the brand.
 *
 * Add a brand only when its documentation has been checked. Near-identical pages that
 * differ only in the brand name are what search engines treat as doorway pages; each
 * entry has to carry that brand's own specifics.
 */

export type BrandSource = { title: string; url: string };

export type StreamUrl = {
  /** What the URL is for, e.g. 'Main stream', 'Sub stream', 'Through an NVR'. */
  label: string;
  /** The URL pattern as the manufacturer documents it, placeholders in angle brackets. */
  url: string;
  /** Optional one-line note under the URL (what a placeholder means, the default port). */
  note?: string;
};

export type CameraBrandGuide = {
  slug: string;
  /** Must match `name` in lib/camera-brands.ts so the logo strip can link here. */
  brand: string;
  /** <title> without the site suffix, 50 characters or fewer. */
  title: string;
  /** Meta description, 163 characters or fewer. */
  description: string;
  /** Two or three sentences after the standard opening: what is specific to this brand. */
  intro: string;
  /** RTSP stream URL formats, as documented. */
  streams: StreamUrl[];
  /** Paragraphs on enabling RTSP / ONVIF (menu paths as the manufacturer gives them). */
  enable: string[];
  /** What the manufacturer documents about pushing RTMP, or null if it documents nothing. */
  rtmp: string | null;
  /** Brand-specific pitfalls worth knowing (codec, models without a local stream, users). */
  notes: string[];
  faqs: { question: string; answer: string }[];
  /** Every manufacturer page the facts above came from. */
  sources: BrandSource[];
  /** Date the sources were opened, e.g. '7 October 2026'. */
  checked: string;
};

export const CAMERA_BRAND_GUIDES: CameraBrandGuide[] = [
  {
    slug: 'hikvision',
    brand: 'Hikvision',
    title: 'Hikvision RTSP URL and ONVIF Setup for AI',
    description: 'The Hikvision RTSP URL for cameras and NVR channels, enabling ONVIF and its user, digest authentication, and running AI patrols on Hikvision cameras.',
    intro:
      'Hikvision uses one RTSP pattern, /Streaming/Channels/, for cameras and recorders alike: the number at the end picks the channel and the stream. On cameras that show an ONVIF option it is switched on with its own user, and on Hikvision NVRs ONVIF is off by default.',
    streams: [
      { label: 'Camera, main stream', url: 'rtsp://<username>:<password>@<camera-ip>:<port>/Streaming/Channels/101', note: "Channel 1, main stream. Hikvision's NVR manual gives 554 as the default RTSP port." },
      { label: 'Camera, sub stream', url: 'rtsp://<username>:<password>@<camera-ip>:<port>/Streaming/Channels/102', note: 'Channel 1, sub stream.' },
      { label: 'Through a Hikvision NVR or DVR', url: 'rtsp://<username>:<password>@<nvr-ip>:<port>/Streaming/channels/<channel>01', note: "The channel number followed by 01 for the main stream or 02 for the sub stream: Hikvision's own examples are 1701 (channel 17, main) and 1902 (channel 19, sub)." },
    ],
    enable: [
      "On a Hikvision camera, ONVIF is under Configuration > Network > Advanced Settings > Integration Protocol: tick Enable ONVIF (Enable Open Network Video Interface on some firmware), then click Add to create an ONVIF user. Hikvision's Media User level gives access to real-time streaming, the list of supported functions and a read-only view of the configuration, which is what a streaming integration needs.",
      "If Integration Protocol shows no ONVIF option, Hikvision says ONVIF is already enabled and uses the camera's own username and password.",
      "On a Hikvision NVR, ONVIF is disabled by default: go to Maintenance > System Service > ONVIF, tick Enable ONVIF, then Add a user. The NVR's RTSP authentication can be basic or digest; Hikvision recommends digest, and with digest selected only digest requests can open the stream.",
    ],
    rtmp: null,
    notes: [
      "If a camera encodes in H.265 or MJPEG and the receiving system does not support that format, Hikvision's fix is to switch the camera's encoding to a format the receiver does support.",
      "Hikvision's camera article writes the path as Streaming/Channels and its NVR article as Streaming/channels; both are as Hikvision publishes them.",
    ],
    faqs: [
      { question: 'What is the RTSP URL for a Hikvision camera?', answer: 'rtsp://<username>:<password>@<camera-ip>:<port>/Streaming/Channels/101 for the main stream of channel 1 and /Streaming/Channels/102 for its sub stream. Hikvision gives 554 as the default RTSP port.' },
      { question: 'How do I get one camera from a Hikvision NVR over RTSP?', answer: "Use the NVR's address with /Streaming/channels/ followed by the channel number and 01 for the main stream or 02 for the sub stream, for example 1701 for channel 17's main stream." },
      { question: 'How do I enable ONVIF on a Hikvision camera?', answer: 'Configuration > Network > Advanced Settings > Integration Protocol: tick Enable ONVIF and add an ONVIF user. If there is no ONVIF option, it is already on and uses the camera\'s own login.' },
      { question: 'Can Camzify run AI detections and patrols on Hikvision cameras?', answer: "Yes. Once the stream is added, Camzify runs virtual patrol rounds, its AI detections and cloud recording on a Hikvision camera like any other. The detections are Camzify's own and do not depend on the camera's built-in analytics." },
    ],
    sources: [
      { title: 'Hikvision USA: Format for getting an RTSP stream from a camera', url: 'https://supportusa.hikvision.com/support/solutions/articles/17000129022-do-you-have-an-example-showing-the-format-for-getting-a-rtsp-stream-from-a-camera-' },
      { title: 'Hikvision USA: Format for getting an RTSP stream from an NVR/DVR', url: 'https://supportusa.hikvision.com/support/solutions/articles/17000129024-do-you-have-an-example-showing-the-format-for-getting-a-rtsp-stream-from-a-nvr-dvr-' },
      { title: 'Hikvision USA: How do I enable ONVIF on a Hikvision camera?', url: 'https://supportusa.hikvision.com/support/solutions/articles/17000128730-how-do-i-enable-onvif-on-a-hikvision-camera-' },
      { title: "Hikvision USA: Why can't I find ONVIF on my camera in Integration Protocol?", url: 'https://supportusa.hikvision.com/support/solutions/articles/17000131287-why-can-t-i-find-onvif-on-my-camera-in-integration-protocol-' },
      { title: 'Hikvision NVR manual: Configure Port', url: 'https://enpinfo.hikvision.com/hkwsen/unzip/20230410194813_20373_doc/GUID-E852C255-D9BD-4288-959E-584EC975B407.html' },
      { title: 'Hikvision NVR manual: Configure ONVIF', url: 'https://enpinfo.hikvision.com/hkwsen/unzip/20230410194813_20373_doc/GUID-F1E123C0-B6A5-4D2E-9F4C-17FBCDAE502A.html' },
      { title: 'Hikvision NVR manual: RTSP Authentication', url: 'https://enpinfo.hikvision.com/hkwsen/unzip/20230410194813_20373_doc/GUID-713900AA-F980-43B0-8F5F-9FE1816DC1B2.html' },
      { title: 'Hikvision NVR manual: Why is the video recorder notifying the stream type is not supported?', url: 'https://enpinfo.hikvision.com/hkwsen/unzip/20230410194813_20373_doc/GUID-9A40EBA3-A477-4807-B3DB-3CA4C37DFBE3.html' },
    ],
    checked: '7 October 2026',
  },
  {
    slug: 'dahua',
    brand: 'Dahua',
    title: 'Dahua RTSP URL, ONVIF and RTMP Setup',
    description: 'The Dahua RTSP URL for cameras and NVR channels, ONVIF and RTMP settings, the H.264 codec note, and running AI patrols on Dahua cameras already installed.',
    intro:
      "Dahua's own wiki notes that the last day to purchase Dahua products in the United States was December 31, 2025, so for many US sites the question is what to do with the Dahua cameras already installed. They speak standard RTSP, and that is all Camzify needs.",
    streams: [
      { label: 'Main stream', url: 'rtsp://<username>:<password>@<ip>:554/cam/realmonitor?channel=<channel>&subtype=0', note: 'The same URL works for an IP camera, a DVR or an NVR; channel selects the camera, and a single camera is channel 1. 554 is the default RTSP port.' },
      { label: 'Sub stream', url: 'rtsp://<username>:<password>@<ip>:554/cam/realmonitor?channel=<channel>&subtype=1', note: 'Dahua numbers the streams 0 (main), 1 (first extra stream) and 2 (second extra stream).' },
    ],
    enable: [
      "Dahua documents both basic and digest authentication on the RTSP stream, over TCP or UDP. Its RTSP guide lists no setting to switch RTSP on; the stream answers on port 554 unless the port has been changed, in which case the new port goes in the URL.",
      "Dahua's own pages disagree, across firmware generations, on whether ONVIF starts on or off: an older Dahua wiki page says it is off by default. If a system cannot find the camera over ONVIF, check the ONVIF setting in the camera's web interface first.",
    ],
    rtmp:
      "Some Dahua cameras can. Dahua says RTMP was added to some of its latest IP cameras, for streaming to YouTube and other services. In the newer web interface it is under Network > Access Platform > RTMP, with Custom selected as the address type, and Dahua's guide requires every stream encoded as H.264 with audio enabled as AAC.",
    notes: [
      'If a camera runs H.265 and the receiving recorder only supports H.264, Dahua\'s guidance is to switch the camera to H.264.',
      "Dahua's note on US sales also says existing warranties continue; nothing about an installed camera's RTSP stream changes.",
    ],
    faqs: [
      { question: 'What is the RTSP URL for a Dahua camera?', answer: 'rtsp://<username>:<password>@<ip>:554/cam/realmonitor?channel=1&subtype=0 for the main stream, and subtype=1 for the sub stream. On an NVR or DVR, set channel to the camera\'s channel.' },
      { question: 'Can I keep using Dahua cameras now that Dahua sales in the US have ended?', answer: "The cameras already installed keep producing a standard RTSP stream. Camzify connects to that stream and runs virtual patrol rounds, AI detections and cloud recording on it, so installed Dahua cameras can keep working without being replaced." },
      { question: 'Can a Dahua camera push RTMP?', answer: 'Some newer Dahua IP cameras can, from Network > Access Platform > RTMP with a custom address, with every stream encoded as H.264 and audio set to AAC.' },
      { question: 'Can Camzify run AI detections and patrols on Dahua cameras?', answer: "Yes. Once the stream is added, Camzify runs its AI detections, virtual patrol rounds and cloud recording on a Dahua camera like any other. The detections are Camzify's own and do not depend on the camera's built-in features." },
    ],
    sources: [
      { title: 'DahuaWiki: Main Page (US sales note)', url: 'https://dahuawiki.com/Main_Page' },
      { title: 'DahuaWiki: Remote Access / RTSP via VLC', url: 'https://dahuawiki.com/Remote_Access/RTSP_via_VLC' },
      { title: 'DahuaWiki: Remote Access / Embed Video Feed On Website', url: 'https://dahuawiki.com/Remote_Access/Embed_Video_Feed_On_Website' },
      { title: 'DahuaWiki: IPCConnection', url: 'https://dahuawiki.com/IPCConnection' },
      { title: 'DahuaWiki: Live Demo / RTMP', url: 'https://dahuawiki.com/Live_Demo/RTMP' },
      { title: 'DahuaWiki: Remote Access / LiveStream RTMP to YouTube', url: 'https://dahuawiki.com/Remote_Access/LiveStream_RTMP_to_YouTube' },
      { title: 'DahuaWiki: IPC / How To Enable H264', url: 'https://dahuawiki.com/IPC/How_To_Enable_H264' },
    ],
    checked: '7 October 2026',
  },
  {
    slug: 'axis',
    brand: 'Axis',
    title: 'Axis Camera RTSP URL and ONVIF Setup',
    description: 'The Axis RTSP URL (axis-media/media.amp), stream profiles, ONVIF accounts and digest authentication, and running AI detections and patrols on Axis cameras.',
    intro:
      'Axis cameras use a single RTSP endpoint, /axis-media/media.amp, and choose the stream with URL parameters rather than fixed main and sub URLs. Axis lists RTSP being enabled on the camera as a prerequisite, and ONVIF works through a dedicated ONVIF account.',
    streams: [
      { label: 'Default stream', url: 'rtsp://<username>:<password>@<camera-ip>/axis-media/media.amp', note: "554 is Axis's default RTSP server port." },
      { label: 'A specific video channel', url: 'rtsp://<username>:<password>@<camera-ip>/axis-media/media.amp?camera=<channel>', note: 'For devices with more than one video channel; camera=1 is the first.' },
      { label: 'A named stream profile', url: 'rtsp://<username>:<password>@<camera-ip>/axis-media/media.amp?camera=1&streamprofile=<profile-name>', note: "A stream profile saved on the camera fixes the resolution and codec: Axis's way to get a lighter second stream." },
      { label: 'Codec and resolution set in the URL', url: 'rtsp://<username>:<password>@<camera-ip>/axis-media/media.amp?videocodec=h264&resolution=640x480', note: 'Parameters are added to the URL; Axis supports them for H.264, H.265, AV1 and Motion JPEG streams.' },
    ],
    enable: [
      "Axis lists RTSP enabled on the camera as a prerequisite for streaming, so confirm it in the camera's web interface before connecting. For RTSP, Axis recommends digest access authentication.",
      "For ONVIF, creating an ONVIF account in the camera's web interface turns ONVIF communication on automatically, and that account's name and password are used for all ONVIF communication with the device. Axis's Media account privilege allows access to the video stream only.",
    ],
    rtmp: null,
    notes: [
      "Axis notes that most web browsers cannot decode H.265, so its cameras do not show H.265 in their own web interface and Axis points to a video management system or application that supports H.265 decoding instead.",
    ],
    faqs: [
      { question: 'What is the RTSP URL for an Axis camera?', answer: 'rtsp://<username>:<password>@<camera-ip>/axis-media/media.amp, on the default RTSP port 554. Add camera=<n> for a specific channel or streamprofile=<name> for a saved stream profile.' },
      { question: 'Does an Axis camera have a main and a sub stream URL?', answer: 'Not as fixed URLs. Axis uses one endpoint and selects the stream with URL parameters, such as a named stream profile or a resolution and codec.' },
      { question: 'How do I enable ONVIF on an Axis camera?', answer: 'Create an ONVIF account in the camera\'s web interface. Axis turns ONVIF communication on automatically when the account is created, and a Media account is limited to the video stream.' },
      { question: 'Can Camzify run AI detections and patrols on Axis cameras?', answer: "Yes. Once the stream is added, Camzify runs virtual patrol rounds, its AI detections and cloud recording on an Axis camera like any other. The detections are Camzify's own and run alongside anything installed on the camera." },
    ],
    sources: [
      { title: 'Axis developer documentation: RTSP endpoints', url: 'https://developer.axis.com/video-streaming-and-recording/video-streaming/reference/rtsp-endpoints/' },
      { title: 'Axis developer documentation: Getting started (video streaming)', url: 'https://developer.axis.com/video-streaming-and-recording/video-streaming/getting-started/' },
      { title: 'Axis developer documentation: Stream profiles', url: 'https://developer.axis.com/video-streaming-and-recording/video-streaming/how-to-guides/stream-profiles/' },
      { title: 'Axis developer documentation: Video streaming (VAPIX)', url: 'https://developer.axis.com/vapix/network-video/video-streaming/' },
      { title: 'Axis developer documentation: Authentication', url: 'https://developer.axis.com/vapix/authentication/' },
      { title: 'Axis: AXIS OS web interface help', url: 'https://help.axis.com/en-us/axis-os-web-interface-help' },
      { title: 'Axis: AXIS M3086-V Dome Camera user manual', url: 'https://help.axis.com/en-us/axis-m3086-v' },
    ],
    checked: '7 October 2026',
  },
  {
    slug: 'reolink',
    brand: 'Reolink',
    title: 'Reolink RTSP URL and ONVIF Setup for AI',
    description: 'The Reolink RTSP URL for main and sub streams, how to turn the RTSP and ONVIF ports on, which models stream, and running AI patrols on Reolink cameras.',
    intro:
      'On many Reolink models the RTSP and ONVIF ports are switched off out of the box, and battery-powered and 4G models do not stream on their own, so the first job is to check the model and turn the ports on. After that, a Reolink camera is a standard RTSP source.',
    streams: [
      { label: 'Main stream', url: 'rtsp://<username>:<password>@<camera-ip>/Preview_01_main', note: 'The default RTSP port is 554, which can be left out of the URL unless it has been changed.' },
      { label: 'Sub stream', url: 'rtsp://<username>:<password>@<camera-ip>/Preview_01_sub', note: 'A lighter stream from the same camera.' },
      { label: 'Through a Reolink NVR or Home Hub', url: 'rtsp://<nvr-username>:<nvr-password>@<nvr-ip>/Preview_<channel>_main', note: "Use the NVR's own username and password; the channel number picks the camera, as in Preview_01_main for channel 1." },
    ],
    enable: [
      'Reolink documents that on many models the RTSP and ONVIF ports, along with RTMP and HTTP, are disabled by default and have to be turned on first. In a web browser the setting is under Network > Advanced > Server Settings > Set Up; in the Reolink Client, Device Settings > Network > Advanced > Server Settings; in the Reolink App, Advanced Network Settings > Server Settings.',
      'Those switches exist on the cameras that support Smart Person/Vehicle/Pet detection; Reolink notes that its other cameras have no port switch. For cameras recorded by a Reolink NVR, the ports are set on the NVR instead: Settings > Network > Advanced, then Port Settings, in the newer NVR interface.',
      'ONVIF is supported and uses port 8000 by default; RTSP uses port 554.',
    ],
    rtmp:
      "Reolink documents RTMP as a stream that software pulls from the camera (rtmp://<camera-ip>/bcs/channel0_main.bcs?channel=<channel>&stream=0&user=<username>&password=<password>), not as a push to an outside server, and its RTMP carries H.264 video only. For Camzify, RTSP is the simpler route.",
    notes: [
      "Battery-powered WiFi cameras, such as the Argus and Altas series, do not offer RTSP or ONVIF on their own: Reolink says they must go through a Reolink Home Hub, and each preview session of a battery camera lasts at most 5 minutes.",
      "Reolink's 4G LTE cameras (the Go series, TrackMix LTE and Duo 2 LTE) do not support RTSP or ONVIF. Its PoE and plug-in WiFi cameras, such as the RLC and Duo series, support both on their own.",
      'Reolink advises against special characters in the password, which appears inside the RTSP URL.',
      "If a connection fails, Reolink's own checklist is to turn all the port switches on, update the firmware, confirm the receiving software supports the camera's codec (such as H.265), and switch off Illegal Login Lockout.",
    ],
    faqs: [
      { question: 'What is the RTSP URL for a Reolink camera?', answer: "rtsp://<username>:<password>@<camera-ip>/Preview_01_main for the main stream and Preview_01_sub for the sub stream, on the default RTSP port 554. Through a Reolink NVR, use the NVR's login and the channel number in place of 01." },
      { question: 'Why does my Reolink camera not stream over RTSP?', answer: "On many models the RTSP and ONVIF ports are off by default; turn them on under Network > Advanced > Server Settings. Battery-powered models only stream through a Reolink Home Hub, and the 4G LTE models do not support RTSP at all." },
      { question: 'Can Camzify run AI detections and patrols on Reolink cameras?', answer: "Yes. Once the camera's RTSP stream is added, Camzify runs virtual patrol rounds, its AI detections and cloud recording on it like any other camera. The detections are Camzify's own, so they do not depend on the camera's built-in smart detection." },
      { question: 'Do I need port forwarding to connect a Reolink camera to Camzify?', answer: 'No. A camera that is only on the local network connects through the Camzify Connector, installed on a Windows, macOS or Linux machine on that network, with no port forwarding.' },
    ],
    sources: [
      { title: 'Reolink: Introduction to RTSP', url: 'https://support.reolink.com/articles/900000630706-Introduction-to-RTSP/' },
      { title: 'Reolink: How to Live View Reolink Cameras via VLC Media Player', url: 'https://support.reolink.com/articles/360007010473-How-to-Live-View-Reolink-Cameras-via-VLC-Media-Player/' },
      { title: 'Reolink: How to Configure Reolink Ports Settings', url: 'https://support.reolink.com/articles/900000621783-How-to-Configure-Reolink-Ports-Settings/' },
      { title: 'Reolink: Introduction to ONVIF Protocol', url: 'https://support.reolink.com/articles/360008718893-Introduction-to-ONVIF-Protocol/' },
      { title: 'Reolink: Which Reolink Products Support CGI/RTSP/ONVIF', url: 'https://support.reolink.com/articles/900000617826-Which-Reolink-Products-Support-CGI-RTSP-ONVIF/' },
      { title: 'Reolink: Introduction to Real-Time Messaging Protocol (RTMP)', url: 'https://support.reolink.com/articles/23528840063769-Introduction-to-Real-Time-Messaging-Protocol-RTMP/' },
      { title: 'Reolink: Reolink RTSP/ONVIF/RTMP Not Working', url: 'https://support.reolink.com/articles/900002151566-Reolink-RTSP-ONVIF-RTMP-Not-Working/' },
    ],
    checked: '7 October 2026',
  },
  {
    slug: 'amcrest',
    brand: 'Amcrest',
    title: 'Amcrest RTSP URL, ONVIF and RTMP Setup',
    description: 'The Amcrest RTSP URL for cameras and NVRs, adding an ONVIF user, pushing RTMP to a custom server, and running AI detections and patrols on Amcrest cameras.',
    intro:
      "Amcrest documents all three routes a camera can take into Camzify: an RTSP URL, a dedicated ONVIF user for third-party software, and an RTMP push to a custom server. RTSP is the usual choice.",
    streams: [
      { label: 'IP camera, main stream', url: 'rtsp://<username>:<password>@<camera-ip>:554/cam/realmonitor?channel=1&subtype=0', note: "554 is the default RTSP port; if the camera uses a different one, put that in the URL." },
      { label: 'Through an Amcrest NVR', url: 'rtsp://<username>:<password>@<nvr-ip>:<port>/cam/realmonitor?channel=<channel>&subtype=<stream>', note: 'subtype=0 is the main stream and subtype=1 the sub stream; the channel number picks the camera.' },
      { label: 'Amcrest Smart Home camera', url: 'rtsp://<username>:<password>@<camera-ip>:554/cam/realmonitor?channel=1&subtype=0&authbasic=64', note: "The username and password are the camera's, not the Amcrest account's." },
    ],
    enable: [
      "Amcrest's RTSP documentation gives the URL and the default port but no step to switch RTSP on, so start by opening the URL above in a player such as VLC.",
      'For ONVIF, Amcrest has third-party software sign in with a dedicated ONVIF user: in the camera\'s web interface go to Maintain >> Account, select ONVIF User and click Add.',
    ],
    rtmp:
      "Yes. Amcrest documents pushing RTMP from its IP cameras to a custom server: in the web interface, Setup >> Network >> RTMP, set Address Type to Custom, click Enable, paste the server's stream URL and key, and apply. Amcrest's guide uses YouTube as the example; Camzify's RTMP route takes the same kind of push.",
    notes: [
      'Not every Amcrest Smart Home camera supports RTSP; Amcrest names the AB2WFSET as one that does not.',
      'When adding an Amcrest camera to third-party software, Amcrest\'s own guide has you enter both the RTSP and the ONVIF port.',
    ],
    faqs: [
      { question: 'What is the RTSP URL for an Amcrest camera?', answer: "rtsp://<username>:<password>@<camera-ip>:554/cam/realmonitor?channel=1&subtype=0 for an IP camera's main stream. Through an Amcrest NVR, change channel to the camera's channel and use subtype=1 for the sub stream." },
      { question: 'Does Amcrest support ONVIF?', answer: 'Yes. Amcrest has third-party software connect with a dedicated ONVIF user, added in the camera\'s web interface under Maintain >> Account > ONVIF User.' },
      { question: 'Can an Amcrest camera push RTMP?', answer: 'Yes. Amcrest IP cameras can push RTMP to a custom server from Setup >> Network >> RTMP, with Address Type set to Custom.' },
      { question: 'Can Camzify run AI detections and patrols on Amcrest cameras?', answer: "Yes. Once the stream is added, Camzify runs virtual patrol rounds, its AI detections and cloud recording on an Amcrest camera like any other. The detections are Camzify's own and do not depend on the camera's built-in features." },
    ],
    sources: [
      { title: 'Amcrest: Accessing Amcrest Products Using RTSP', url: 'https://support.amcrest.com/hc/en-us/articles/360052688931-Accessing-Amcrest-Products-Using-RTSP' },
      { title: 'Amcrest: RTSP Stream URLs for NVRs (NVR)', url: 'https://support.amcrest.com/hc/en-us/articles/360001211792-RTSP-Stream-URLs-for-NVRs-NVR' },
      { title: 'Amcrest: How To Setup On VLC Media Player via RTSP', url: 'https://support.amcrest.com/hc/en-us/articles/360008318372-How-To-Setup-On-VLC-Media-Player-via-RTSP' },
      { title: 'Amcrest: Accessing Amcrest Smart Home Products Using RTSP', url: 'https://support.amcrest.com/hc/en-us/articles/360058619531-Accessing-Amcrest-Smart-Home-Products-Using-RTSP' },
      { title: 'Amcrest: How To Add An ONVIF User In An Amcrest Camera', url: 'https://support.amcrest.com/hc/en-us/articles/45672867818125-How-To-Add-An-ONVIF-User-In-An-Amcrest-Camera' },
      { title: 'Amcrest: How to Setup an Amcrest IP Camera for RTMP Streaming to YouTube', url: 'https://support.amcrest.com/hc/en-us/articles/37642045868685-How-to-Setup-an-Amcrest-IP-Camera-for-RTMP-Streaming-to-YouTube' },
      { title: 'Amcrest: How to Add a Camera Into Blue Iris 5', url: 'https://support.amcrest.com/hc/en-us/articles/360001127791-How-to-Add-a-Camera-Into-Blue-Iris-5' },
    ],
    checked: '7 October 2026',
  },
];

export function guideFor(brandName: string): CameraBrandGuide | undefined {
  return CAMERA_BRAND_GUIDES.find((g) => g.brand === brandName);
}
