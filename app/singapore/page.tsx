import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FeatureHero } from '@/components/content/feature-hero';
import { FaqSection } from '@/components/content/faq-section';
import { ProductShot } from '@/components/content/product-shot';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { serviceSchema } from '@/lib/seo';
import { siteConfig, formattedAddress } from '@/lib/site-config';
import Link from 'next/link';

/**
 * Singapore: where Camzify is headquartered, and the market where search for video
 * surveillance is worded "CCTV" (DataForSEO, October 2026: "cctv singapore" 1,900 a month;
 * see docs/seo/PROMOTION-RESEARCH-2026-10-07.md).
 *
 * Facts used and where they come from:
 * - Headquarters, legal name, address, phone: siteConfig (CLAUDE.md rule 1).
 * - Local partner Nettbox: stated by the business on 2026-10-08; its site,
 *   https://www.nettbox.com.sg/, supplied by the business on 2026-10-08. What Nettbox does
 *   is described only as Nettbox describes itself there (integrated security and smart
 *   systems in Singapore, a Singapore-based team), and attributed to Nettbox. Its own
 *   claims about clients and certifications are not repeated here.
 * - Singapore plates: license plate recognition reads US and Singapore plates (rule 2).
 * - PDPA: work in progress, not held, targeted for the end of 2026 (rule 2).
 * - Footage: S3 in the AWS region nearest the customer's sites; never name a country.
 * Do not add Singapore customers, case studies or local certifications without the
 * business confirming them.
 */
const pageMeta = {
  title: 'AI CCTV and Video Analytics in Singapore',
  description: 'Camzify, headquartered in Singapore, adds AI video analytics, virtual patrols and cloud recording to the CCTV you already have, with local partner Nettbox.',
  path: '/singapore',
};

export const metadata = generatePageMeta({ ...pageMeta });

const faqs = [
  { question: 'Is Camzify a Singapore company?', answer: `Yes. Camzify is built by ${siteConfig.legalName}, headquartered in Singapore at ${formattedAddress}.` },
  { question: 'Who is Camzify\'s partner in Singapore?', answer: 'Nettbox (nettbox.com.sg) is Camzify\'s local partner in Singapore. Nettbox describes itself as an integrated security and smart systems company in Singapore, covering CCTV and video analytics, access control, smart communities, fleet monitoring and IoT, with a Singapore-based team. Contact Camzify and we will bring Nettbox in where a site needs a partner on the ground.' },
  { question: 'Does it work with the CCTV we already have?', answer: 'Yes, if the cameras offer a standard RTSP stream, ONVIF, an RTMP push or an HTTPS stream, which most IP cameras do. Cameras on the site\'s network connect through the Camzify Connector, with no port forwarding.' },
  { question: 'Can it read Singapore car plates?', answer: 'Yes. Camzify\'s license plate recognition reads US and Singapore plates and alerts the people you choose when a plate on your watchlist is seen. It is a custom detection, set up per site.' },
  { question: 'Is Camzify PDPA compliant?', answer: 'Work toward the Personal Data Protection Act, alongside GDPR, SOC 2 Type II and ISO 27001, is in progress and targeted for the end of 2026; none of the four is held today. The security and compliance page sets out what is in place now.' },
  { question: 'Where is the footage stored?', answer: 'In the cloud deployment, in Amazon S3 in the AWS region nearest your sites, encrypted in transit and at rest. Where footage must stay on site, Camzify is also deployed on premises.' },
  { question: 'How is it priced?', answer: 'Per instance per month and quoted per site: from US$5 per camera per month, with most cameras landing between US$20 and US$90 per camera per month depending on which detections run, and cloud storage per terabyte per month on top.' },
];

const BRANDS = [
  { href: '/supported-cameras/hikvision', label: 'Hikvision' },
  { href: '/supported-cameras/dahua', label: 'Dahua' },
  { href: '/supported-cameras/reolink', label: 'Reolink' },
  { href: '/supported-cameras/ezviz', label: 'EZVIZ' },
  { href: '/supported-cameras/axis', label: 'Axis' },
];

export default function SingaporePage() {
  return (
    <PageShell
      {...pageMeta}
      faqs={faqs}
      schema={[serviceSchema({ name: 'AI CCTV and Video Analytics in Singapore', description: pageMeta.description, path: pageMeta.path })]}
      breadcrumbs={[{ label: 'Singapore' }]}
    >
      <FeatureHero
        eyebrow="Singapore"
        title="AI CCTV and video analytics in Singapore"
        lede={
          <>
            <strong className="font-semibold text-foreground">
              Camzify is a Singapore-headquartered cloud video management system that adds AI video analytics, scheduled virtual patrols and cloud recording to the CCTV a site already has.
            </strong>{' '}
            Nettbox is our local partner in Singapore, where Camzify's head office is.
          </>
        }
        primary={{ href: '/book-a-demo', label: 'Book a demo' }}
        secondary={{ href: '/contact', label: 'Contact us in Singapore' }}
        facts={['Headquartered in Singapore', 'Local partner: Nettbox', 'Reads Singapore car plates']}
        visual={
          <ProductShot
            src="/product-live-streaming"
            alt="The live view in the Camzify console showing a site's CCTV cameras in a grid"
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
              <span className="font-mono text-mono-sm uppercase text-primary">Your existing CCTV</span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">AI on the cameras already installed</h2>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Most CCTV records and waits for someone to look after an incident. Camzify watches the same cameras: its{' '}
                <Link href="/ai-features" className="text-primary hover:underline">AI detections</Link> raise an alert when something happens,{' '}
                <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrol rounds</Link> check each camera against its own checklist on a schedule, and{' '}
                <Link href="/cloud-video-surveillance" className="text-primary hover:underline">cloud recording</Link> keeps the footage off site under a retention period set per camera.
              </p>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                The cameras do not need replacing. Any camera with a standard stream connects; setup guides cover brands common on Singapore sites:{' '}
                {BRANDS.map((b, i) => (
                  <span key={b.href}>
                    <Link href={b.href} className="text-primary hover:underline">{b.label}</Link>
                    {i < BRANDS.length - 2 ? ', ' : i === BRANDS.length - 2 ? ' and ' : ''}
                  </span>
                ))}
                , and the <Link href="/supported-cameras" className="text-primary hover:underline">supported cameras page</Link> explains why any RTSP camera works.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-site gap-12 px-6 lg:grid-cols-2">
          <ScrollReveal>
            <div>
              <h2 className="font-display text-2xl font-bold">Singapore car plates</h2>
              <p className="mt-4 text-muted-foreground">
                <Link href="/ai-features/license-plate-recognition" className="text-primary hover:underline">License plate recognition</Link> reads Singapore and US plates from a camera framed on a gate, barrier or entry lane, and alerts the people you choose when a plate on your watchlist is seen. It is a custom detection, set up per site.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <div>
              <h2 className="font-display text-2xl font-bold">PDPA and where footage lives</h2>
              <p className="mt-4 text-muted-foreground">
                Work toward PDPA is in progress and targeted for the end of 2026; it is not held today, and the{' '}
                <Link href="/security-and-compliance" className="text-primary hover:underline">security and compliance page</Link> says what is in place now. In the cloud deployment, footage is kept in Amazon S3 in the AWS region nearest your sites; where it must stay on site, Camzify is{' '}
                <Link href="/platform/deployment-options" className="text-primary hover:underline">deployed on premises</Link>.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-site px-6">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-mono text-mono-sm uppercase text-primary">Local partner</span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Working with Nettbox</h2>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                <a href="https://www.nettbox.com.sg/" className="text-primary hover:underline" rel="noopener" target="_blank">Nettbox</a> is Camzify&rsquo;s local partner in Singapore. On its own site, Nettbox describes itself as an integrated security and smart systems company in Singapore, connecting CCTV and video analytics, access control, smart communities, fleet monitoring and IoT, with a Singapore-based team.
              </p>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Talk to us first, by phone on{' '}
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">{siteConfig.phone}</a> or through the{' '}
                <Link href="/contact" className="text-primary hover:underline">contact page</Link>, and we will bring Nettbox in where a site needs a partner on the ground. Security and installation companies that want to offer Camzify themselves can start with the{' '}
                <Link href="/partners" className="text-primary hover:underline">partner program</Link>.
              </p>
              <p className="mt-4 max-w-prose text-body text-muted-foreground">
                Pricing is per instance per month and quoted per site: from US$5 per camera per month, with most cameras landing between US$20 and US$90 per camera per month depending on which detections run. The{' '}
                <Link href="/pricing" className="text-primary hover:underline">pricing page</Link> builds a quote from your camera and feature counts.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FaqSection items={faqs} />
    </PageShell>
  );
}
