import { imageManifest } from '@/lib/image-manifest';

/**
 * The blog: one entry per post. The /blog index lists these newest first, lib/routes.ts
 * puts each in the sitemap, and the post's own page lives at app/blog/<slug>/page.tsx.
 *
 * Blog posts vs guides. A guide (/guides) is evergreen reference material on running
 * cameras and patrols. A blog post (/blog) is written around one search question, with
 * keyword research behind it, and hands the reader to the product page that answers it.
 *
 * Images. Every image a post needs is declared here before the designer has drawn it, as
 * a numbered slot with a brief. The designer numbers in page order from the top (CLAUDE.md,
 * Images): 1 is the hero, 2 the first figure below it, and so on, plus a card thumbnail.
 * Files are named `blog-<slug>-<n>` and `blog-thumb-<slug>`; once one is staged with
 * scripts/optimise-images.py it appears in the image manifest and replaces its slot on
 * the page with no code change. `npx tsx scripts/blog-image-briefs.ts` writes every
 * outstanding brief to docs/design/BLOG-IMAGE-BRIEFS.md for the designer.
 */

export type BlogImageKind =
  /** A photograph or a realistic scene. JPEG, 1600 x 900. */
  | 'photo'
  /** An illustration or diagram on a transparent background. PNG, 1600 x 900. */
  | 'render';

export interface BlogImage {
  /** Position on the page: 1 is the hero, 2 the first figure below it, and so on. */
  n: number;
  kind: BlogImageKind;
  /** Where it sits, so the designer can find it on the preview: the heading above it. */
  placement: string;
  /** What the image must show, written for the designer. */
  brief: string;
  /** The alt text the image will carry once delivered. */
  alt: string;
  caption?: string;
  /**
   * An existing image the live site shows until this one is delivered, with alt text that
   * describes it rather than the image still to come. Without one, the slot shows nothing
   * on the live site; previews always show the brief instead.
   */
  fallback?: { src: string; alt: string; caption?: string };
}

export interface BlogPost {
  slug: string;
  /** The card title on /blog: shorter than the post's H1. */
  title: string;
  /** The card summary on /blog. */
  excerpt: string;
  published: string;
  updated: string;
  /** What the card thumbnail (821 x 462) must show. */
  thumbBrief: string;
  images: BlogImage[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'what-is-cctv',
    title: 'What is CCTV? Meaning, how it works, and types',
    excerpt: 'CCTV means closed-circuit television: cameras that send video to a private recorder and screens instead of broadcasting it. How a system works, the three types, and where CCTV is heading.',
    published: '2026-10-17',
    updated: '2026-10-17',
    thumbBrief: 'A card-sized version of image 1: one wall-mounted security camera with a thin line running from it to a small recorder box and a screen, and a faint cloud outline above. Bold shapes that read at 300px wide; no text.',
    images: [
      {
        n: 1,
        kind: 'render',
        placement: 'Hero, under the opening paragraph',
        brief: 'The idea of "closed circuit" in one picture: two or three security cameras on a building, each connected by a line to a single recorder box and a monitor inside the building, the whole system drawn inside a closed loop or outline. Outside the loop, one faint cloud shape with a dotted line to the recorder, hinting at where CCTV goes next. Clean line illustration in the site style, brand red for the cameras. No brand names, no faces.',
        alt: 'A CCTV system as a closed loop: cameras on a building connected to one recorder and one monitor inside it',
        fallback: { src: '/cloud-video-backup-against-dvr-theft.webp', alt: 'A recorder in an on-site rack beside camera feeds recording to the cloud and viewed on a laptop', caption: 'Recording on site, and recording to the cloud' },
      },
      {
        n: 2,
        kind: 'render',
        placement: 'Under "How does a CCTV system work?"',
        brief: 'A left-to-right diagram of the four parts, each labeled: "Cameras" (a dome and a bullet camera) → "Cabling or network" (a coax cable and an Ethernet cable) → "Recorder" (a box labeled DVR / NVR with a hard disk icon) → "Viewing" (a monitor and a phone). Arrows show video flowing left to right. Simple, readable on a phone (stack vertically on narrow widths is fine).',
        alt: 'How CCTV works: cameras send video over cabling or a network to a DVR or NVR, which records it and shows it on a monitor or phone',
      },
      {
        n: 3,
        kind: 'render',
        placement: 'Under "What are the types of CCTV?"',
        brief: 'Three side-by-side panels with a heading each. "Analog": a camera on a coax cable into a DVR box. "IP": a camera on an Ethernet cable into a network switch and an NVR box. "Cloud": an IP camera connected through the building\'s internet to a cloud shape, with a laptop and phone viewing it. Same line style as image 2. The cloud panel subtly highlighted in brand red.',
        alt: 'The three types of CCTV: analog cameras recording to a DVR, IP cameras recording to an NVR, and cameras recording to the cloud',
      },
    ],
  },
  {
    slug: 'people-counters-sensors-vs-cameras',
    title: 'People counters: sensors vs the cameras you own',
    excerpt: 'What a people counter is, how sensors and cameras count foot traffic, what each costs, and how to count people in and out with the security cameras already on the wall.',
    published: '2026-10-12',
    updated: '2026-10-13',
    thumbBrief: 'A simplified, card-sized version of image 1: a shop entrance seen from a ceiling camera, one counting line across the doorway with an in arrow and an out arrow. Bold and readable at 300px wide; no small text.',
    images: [
      {
        n: 1,
        kind: 'photo',
        placement: 'Hero, under the opening paragraph',
        brief: 'A store or office entrance seen from a security camera mounted above and in front of the door, the way a real entrance camera sees it. A thin counting line is drawn across the doorway in the Camzify console style, with two small labels: "In" with an arrow into the building and "Out" with an arrow leaving. Two or three people mid-stride, one in each direction. Faces not recognizable. No numbers or dashboards: the counts are not the point of this image, the line is.',
        alt: 'A store entrance seen from a ceiling camera, with a counting line across the doorway marking people coming in and going out',
        fallback: { src: '/feature-occupancy-and-peak-hour-trends-1.webp', alt: "The Camzify console showing occupancy and peak-hour trends from a site's existing cameras", caption: 'Occupancy and peak-hour trends from existing cameras' },
      },
      {
        n: 2,
        kind: 'render',
        placement: 'Under "How does a people counter work, and what are the main types?"',
        brief: 'Five ways to count people at one doorway, as a row of five simple line illustrations in the site\'s style, each labeled underneath: a staff member with a hand clicker ("Manual clicker"), a beam across the door frame ("Infrared beam"), a sensor on the ceiling with a heat glow below ("Thermal"), a phone with signal waves ("Wi-Fi and Bluetooth") and a security camera with a line across the doorway ("AI video"). The last one subtly highlighted in brand red. Must read on a phone, so two rows on narrow widths is fine.',
        alt: 'Five ways to count people at a doorway: a manual clicker, an infrared beam, a thermal ceiling sensor, Wi-Fi and Bluetooth, and AI video from a security camera',
      },
      {
        n: 3,
        kind: 'render',
        placement: 'Under "Can you count people with the security cameras you already have?"',
        brief: 'Two panels side by side. Left, "Line crossing": a camera view of an entrance with a line across the doorway and arrows for each direction. Right, "Zone occupancy": a camera view of a shop floor with one shaded zone and a small live count badge on it. Both in the Camzify console style (dark frame, brand-red accents). Faces not recognizable.',
        alt: 'Two ways a camera counts people: a line across an entrance counting each direction, and a zone on the floor counting the people inside it',
        caption: 'A line counts entries and exits; a zone counts who is inside',
        fallback: { src: '/feature-line-intrusion-detection-2.webp', alt: 'A camera view with a virtual line drawn across an entrance, the kind of line that counts people entering and leaving', caption: 'A line across the entrance counts each direction separately' },
      },
      {
        n: 4,
        kind: 'render',
        placement: 'Under "Where should a people counter or counting camera go?"',
        brief: 'A side-view diagram of an entrance. Good: a camera above the door, angled down at the doorway, with its field of view drawn as a cone and people walking through one at a time (green tick). Poor: a camera at head height pointing straight at the door, where people overlap in its view, and a bright glass door behind them (red cross). Simple labels: "Above and angled down" and "Straight on, against the light".',
        alt: 'Where to mount a counting camera: above the entrance and angled down, not at head height facing a bright glass door',
      },
    ],
  },
];

export function blogPost(slug: string): BlogPost {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) throw new Error(`No blog post "${slug}" in lib/blog-posts.ts`);
  return post;
}

/**
 * The delivered image's path, or undefined while the designer's file is outstanding.
 * Delivered images are staged as WebP sources, and the designer draws photographs and
 * renders alike with their own rounded corners on a transparent background, so a card
 * around them would read as a frame inside a frame: PhotoFigure frames none of them.
 */
export function deliveredImage(stem: string): string | undefined {
  return imageManifest[stem] ? `/${stem}.webp` : undefined;
}

export const blogImageStem = (slug: string, n: number) => `blog-${slug}-${n}`;
export const blogThumbStem = (slug: string) => `blog-thumb-${slug}`;

/** Newest first, for the index and the sitemap. */
export const BLOG_POSTS_NEWEST = [...BLOG_POSTS].sort((a, b) => b.published.localeCompare(a.published));
