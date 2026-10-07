import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { ProductShot } from '@/components/content/product-shot';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { serviceSchema } from '@/lib/seo';
import { CAMERA_BRAND_GUIDES } from '@/lib/camera-brand-guides';
import Link from 'next/link';

/**
 * Category pillar for "business security cameras" (2,900 US searches a month),
 * "commercial security cameras" (1,900), "security cameras for business" and "AI security
 * cameras" (1,300): DataForSEO, October 2026, docs/seo/PROMOTION-RESEARCH-2026-10-07.md.
 * No Camzify page targeted them; Avigilon and Verkada rank.
 *
 * Camzify does not sell cameras, so the page says so and answers the question a business
 * owner with cameras already on the wall is really asking: what turns them into a
 * security system. Every Camzify fact here restates an existing page (pricing figures,
 * encryption, deployment options, connectivity); nothing new is claimed.
 */
const pageMeta = {
  title: 'Business Security Cameras With AI, No New Hardware',
  description: 'Business security cameras that do more than record: cloud recording, AI detections and scheduled patrols on the commercial cameras you already own.',
  path: '/business-security-cameras',
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'What are the best security cameras for a business?', answer: 'Commercial IP cameras from an established manufacturer that offer a standard RTSP stream or ONVIF, so the cameras are not locked to one vendor\'s app or recorder. Camzify does not rank camera brands: it works with any camera that offers RTSP, pushes RTMP or streams over HTTPS, so the choice can rest on the site, not the software.' },
  { question: 'Is this commercial CCTV?', answer: 'It is what commercial CCTV, as it is called in the UK and much of the world, needs behind the cameras: recording kept off site, AI detections, scheduled patrol rounds and every site on one login. The cameras can be any commercial IP cameras with a standard stream.' },
  { question: 'Do I need new cameras to add AI?', answer: 'No. The AI runs in Camzify, not in the camera, so the cameras already installed can run AI detections and scheduled patrol rounds once their streams are connected.' },
  { question: 'Does Camzify sell or install cameras?', answer: 'Camzify does not sell cameras. Where a site needs new ones, a CCTV installer fits them; Camzify works with installers through its partner program, and connects the cameras once they are up.' },
  { question: 'What is the difference between commercial and consumer security cameras?', answer: 'For a business, the difference that matters most is the stream. Commercial IP cameras generally offer a standard RTSP stream or ONVIF, so any video management system can record them; many consumer cameras are tied to the maker\'s own cloud app and offer no local stream at all.' },
  { question: 'How much does a business security camera system cost to run?', answer: 'The cameras are a one-off cost; the system around them is the ongoing one. Camzify is priced per instance per month and quoted per site: it starts from $5 per camera per month, and most cameras land between $20 and $90 per camera per month depending on which detections run, with cloud storage per terabyte per month on top.' },
  { question: 'Can I see every location in one place?', answer: 'Yes. Every site is on one login, with cameras grouped by site and access set per user, so a manager can see one store and the head office every store.' },
  { question: 'Where is the footage kept?', answer: 'In the cloud deployment, in Amazon S3 in the AWS region nearest your sites, encrypted in transit over TLS 1.2 or higher and at rest with AES-256. Where footage must stay on site, Camzify is also deployed on premises.' },
];

const NEEDS = [
  { title: 'Recording you can rely on', body: 'Footage recorded off site under a retention period set per camera, so a stolen or failed recorder does not take the evidence with it.', href: '/platform/video-backup-and-retention', link: 'Video backup and retention' },
  { title: 'Someone, or something, watching', body: 'AI detections that raise an alert when something happens, instead of footage nobody reviews until after the fact.', href: '/ai-features', link: 'The AI detections' },
  { title: 'Checks that happen every night', body: 'Scheduled patrol rounds that look at each camera against its own checklist and file a report, the job a guard\'s round does.', href: '/virtual-patrolling', link: 'Virtual patrolling' },
  { title: 'Every location in one place', body: 'One login for every site, with each person seeing only the cameras they should.', href: '/platform/multi-site-management', link: 'Multi-site management' },
];

const SETTINGS = [
  { href: '/industries/retail', label: 'Retail stores' },
  { href: '/industries/restaurants', label: 'Restaurants' },
  { href: '/industries/warehouses', label: 'Warehouses' },
  { href: '/industries/construction-sites', label: 'Construction sites' },
  { href: '/industries/manufacturing', label: 'Manufacturing' },
  { href: '/industries/automotive', label: 'Dealerships and repair shops' },
  { href: '/industries/self-storage', label: 'Self storage' },
  { href: '/industries/multiple-sites', label: 'Multi-site businesses' },
];

export default function BusinessSecurityCamerasPage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[serviceSchema({ name: 'Business Security Cameras With AI', description: pageMeta.description, path: pageMeta.path })]}
      breadcrumbs={[{ label: 'Business Security Cameras' }]}
    >
      <FeatureHero
        eyebrow="Business security cameras"
        title="Business security cameras that do more than record"
        lede={
          <>
            <strong className="font-semibold text-foreground">
              Business security cameras become a security system when something records them reliably, watches them and checks them on a schedule.
            </strong>{' '}
            Camzify adds that to the commercial cameras (or commercial CCTV) a business already owns: cloud recording, AI detections and scheduled patrol rounds, with every location on one login and no new hardware.
          </>
        }
        primary={{ href: '/book-a-demo', label: 'Book a demo on your cameras' }}
        secondary={{ href: '/supported-cameras', label: 'Check your cameras' }}
        facts={['Works with the cameras you own', 'AI detections and patrols', 'Every site on one login']}
        visual={
          <ProductShot
            src="/product-live-streaming"
            alt="The live view in the Camzify console showing a business's cameras in a grid, grouped by site"
            label="Live view across sites"
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        }
      />

      <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Beyond the cameras</span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">What a business security camera system needs</h2>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Cameras capture. Most of what makes them protect a business is the system behind them, and that is where most camera systems stop short: recordings nobody watches, on a recorder in the back office.
              </p>
            </div>
          </ScrollReveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {NEEDS.map((n) => (
              <li key={n.href} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-bold">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.body}</p>
                <Link href={n.href} className="mt-3 inline-block text-sm font-medium text-primary hover:underline">{n.link} &rarr;</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">AI security cameras</span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">AI without replacing a single camera</h2>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                An &ldquo;AI security camera&rdquo; is usually a camera with detection built into its firmware, bought new to get it. Camzify puts the detection in the platform instead, so it runs on the streams of cameras already installed, whoever made them: intrusion and loitering, tailgating, weapons, fire and smoke, slip and fall, PPE and the rest of the 23 standard detections, plus{' '}
                <Link href="/ai-features/custom-detections" className="text-primary hover:underline">detections built to order</Link>, such as{' '}
                <Link href="/ai-features/license-plate-recognition" className="text-primary hover:underline">license plate recognition</Link>.
              </p>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                What a camera needs is a standard stream. Most commercial IP cameras offer RTSP or ONVIF; setup guides cover{' '}
                {CAMERA_BRAND_GUIDES.map((g, i) => (
                  <span key={g.slug}>
                    <Link href={`/supported-cameras/${g.slug}`} className="text-primary hover:underline">{g.brand}</Link>
                    {i < CAMERA_BRAND_GUIDES.length - 2 ? ', ' : i === CAMERA_BRAND_GUIDES.length - 2 ? ' and ' : ''}
                  </span>
                ))}
                , and the{' '}
                <Link href="/supported-cameras" className="text-primary hover:underline">supported cameras page</Link> explains why any RTSP camera works.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto grid max-w-site gap-12 px-6 lg:grid-cols-2">
          <ScrollReveal>
            <div>
              <h2 className="font-display text-2xl font-bold">Upgrade the cameras you have, or buy new?</h2>
              <p className="mt-4 text-muted-foreground">
                If the cameras cover the right places and give a clear picture, keep them: what they lack is the system, not the lens. Replace a camera when it cannot see what matters, when it offers no standard stream, or when it has failed. Camzify does not sell cameras, so the advice does not depend on selling you one; where new cameras are needed, an installer fits them and Camzify connects them.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <div>
              <h2 className="font-display text-2xl font-bold">What it costs to run</h2>
              <p className="mt-4 text-muted-foreground">
                Priced per instance per month and quoted per site: from $5 per camera per month, with most cameras landing between $20 and $90 per camera per month depending on which detections run, and cloud storage per terabyte per month on top. Measure it against what guarding the same hours costs with the{' '}
                <Link href="/roi-calculator" className="text-primary hover:underline">ROI calculator</Link>, or build a quote on the{' '}
                <Link href="/pricing" className="text-primary hover:underline">pricing page</Link>. Cloud by default, or{' '}
                <Link href="/platform/deployment-options" className="text-primary hover:underline">on premises</Link> where footage must stay on site.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <h2 className="font-display text-2xl font-bold">Security cameras by type of business</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SETTINGS.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="block rounded-xl border border-border bg-card p-4 font-medium no-underline transition-colors hover:border-primary/30 hover:text-primary">{s.label}</Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-prose text-sm text-muted-foreground">
            Every type of business on the site is on the <Link href="/industries" className="text-primary hover:underline">industries page</Link>.
          </p>
        </div>
      </section>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
