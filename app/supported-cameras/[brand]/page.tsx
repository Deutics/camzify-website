import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { FaqSection } from '@/components/content/faq-section';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { CAMERA_BRAND_GUIDES } from '@/lib/camera-brand-guides';

/**
 * One camera brand's setup guide, rendered from lib/camera-brand-guides.ts (read its
 * header for the sourcing rules). Prerendered per entry; listed in the sitemap from the
 * same array (lib/routes.ts); linked from the brand's tile on /supported-cameras.
 *
 * The brand-specific half (stream URLs, where to switch RTSP or ONVIF on, RTMP) comes
 * from the manufacturer's documentation and is cited in Sources. The Camzify half (how a
 * stream is added, what runs on it) is the same on every page and restates only what the
 * camera connectivity pages already say.
 */
export function generateStaticParams() {
  return CAMERA_BRAND_GUIDES.map((g) => ({ brand: g.slug }));
}

function find(slug: string) {
  return CAMERA_BRAND_GUIDES.find((g) => g.slug === slug);
}

export function generateMetadata({ params }: { params: { brand: string } }) {
  const g = find(params.brand);
  if (!g) return {};
  return generatePageMeta({ title: g.title, description: g.description, path: `/supported-cameras/${g.slug}` });
}

const RUNS_ON = [
  { href: '/virtual-patrolling', label: 'Virtual patrol rounds', body: 'scheduled checks of each camera against its checklist, with a report per round' },
  { href: '/ai-features', label: 'AI detections', body: 'intrusion, loitering, tailgating, weapons, fire and smoke, slip and fall, and the rest of the 23' },
  { href: '/ai-features/camera-tampering-detection', label: 'Camera tampering detection', body: 'an alert when a camera is covered, moved, defocused or frozen' },
  { href: '/platform/video-backup-and-retention', label: 'Cloud recording', body: 'footage kept off site, under a retention period set per camera' },
  { href: '/ai-features/custom-detections', label: 'Custom detections', body: 'built to order when the standard set does not cover what a site needs' },
];

export default function CameraBrandGuidePage({ params }: { params: { brand: string } }) {
  const g = find(params.brand);
  if (!g) notFound();
  const path = `/supported-cameras/${g.slug}`;
  const pageMeta = { title: g.title, description: g.description, path };
  const others = CAMERA_BRAND_GUIDES.filter((o) => o.slug !== g.slug);

  return (
    <PageShell
      {...pageMeta}
      faqs={g.faqs}
      breadcrumbs={[{ label: 'Supported Cameras', href: '/supported-cameras' }, { label: g.brand }]}
    >
      <article className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <span className="font-mono text-mono-sm uppercase text-primary">Supported cameras · {g.brand}</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Connect {g.brand} cameras to Camzify
          </h1>
          <p className="mt-6 max-w-prose text-body leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-foreground">
              {g.brand} IP cameras connect to Camzify over RTSP, so the cameras already installed can run AI
              detections, virtual patrol rounds and cloud recording without being replaced.
            </strong>{' '}
            {g.intro}
          </p>

          <ScrollReveal>
            <section className="mt-14">
              <h2 className="font-display text-2xl font-bold">{g.brand} RTSP URL format</h2>
              <p className="mt-3 max-w-prose text-muted-foreground">
                As {g.brand}&rsquo;s own documentation gives it. Replace the parts in angle brackets with the
                camera&rsquo;s values.
              </p>
              <dl className="mt-6 space-y-4">
                {g.streams.map((s) => (
                  <div key={s.label} className="rounded-xl border border-border bg-card p-5">
                    <dt className="font-mono text-mono-sm uppercase text-muted-foreground">{s.label}</dt>
                    <dd className="mt-2">
                      <code className="block break-all rounded-md bg-background px-3 py-2 font-mono text-sm text-foreground">{s.url}</code>
                      {s.note && <p className="mt-2 text-sm text-muted-foreground">{s.note}</p>}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mt-14 max-w-prose">
              <h2 className="font-display text-2xl font-bold">Turning on RTSP and ONVIF on a {g.brand} camera</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                {g.enable.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mt-14 max-w-prose">
              <h2 className="font-display text-2xl font-bold">Can a {g.brand} camera push RTMP?</h2>
              <p className="mt-4 text-muted-foreground">
                {g.rtmp ?? `${g.brand}'s documentation, as checked for this page, does not describe pushing RTMP from its cameras. Use RTSP instead; if a site needs a push, an encoder can convert the RTSP stream, as the RTMP setup guide explains.`}{' '}
                <Link href="/camera-connectivity/rtmp-setup" className="text-primary hover:underline">RTMP setup in Camzify</Link>.
              </p>
            </section>
          </ScrollReveal>

          {g.notes.length > 0 && (
            <ScrollReveal>
              <section className="mt-14 max-w-prose">
                <h2 className="font-display text-2xl font-bold">Worth knowing before you connect</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                  {g.notes.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
              </section>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <section className="mt-14">
              <h2 className="font-display text-2xl font-bold">Adding the {g.brand} stream to Camzify</h2>
              <ol className="mt-6 grid gap-4 md:grid-cols-3">
                <li className="rounded-xl border border-border bg-card p-6">
                  <span className="font-mono text-mono-sm text-primary">1</span>
                  <h3 className="mt-2 font-display text-base font-bold">Check the stream plays</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Open the RTSP URL above in a player such as VLC. If it plays from outside the camera&rsquo;s network, Camzify can connect it directly.</p>
                </li>
                <li className="rounded-xl border border-border bg-card p-6">
                  <span className="font-mono text-mono-sm text-primary">2</span>
                  <h3 className="mt-2 font-display text-base font-bold">Local only? Use the Connector</h3>
                  <p className="mt-2 text-sm text-muted-foreground">If the camera is only on the local network, the <Link href="/camzify-connector" className="text-primary hover:underline">Camzify Connector</Link> on a Windows, macOS or Linux machine there relays it, with no port forwarding.</p>
                </li>
                <li className="rounded-xl border border-border bg-card p-6">
                  <span className="font-mono text-mono-sm text-primary">3</span>
                  <h3 className="mt-2 font-display text-base font-bold">Add it in the console</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Camera Management &rarr; Add Camera, paste the URL (or pick the relayed stream) and enter the camera&rsquo;s credentials. The <Link href="/camera-connectivity/rtsp-setup" className="text-primary hover:underline">RTSP setup guide</Link> has the detail.</p>
                </li>
              </ol>
            </section>
          </ScrollReveal>

          <ScrollReveal>
            <section className="mt-14">
              <h2 className="font-display text-2xl font-bold">What runs on {g.brand} cameras once they are connected</h2>
              <p className="mt-3 max-w-prose text-muted-foreground">
                Once the stream is in Camzify, a {g.brand} camera is treated exactly like any other: the brand decides
                nothing about which features it can use.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {RUNS_ON.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="block h-full rounded-xl border border-border bg-card p-5 no-underline transition-colors hover:border-primary/30">
                      <span className="font-display font-bold">{r.label}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{r.body}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/book-a-demo" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90">Book a demo on your {g.brand} cameras</Link>
                <Link href="/pricing" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/30 hover:text-primary">See pricing</Link>
              </div>
            </section>
          </ScrollReveal>

          <section className="mt-14 max-w-prose">
            <h2 className="font-display text-2xl font-bold">Sources, checked {g.checked}</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Every {g.brand}-specific detail on this page comes from {g.brand}&rsquo;s own documentation, listed below.
              Firmware changes menus over time; when the camera&rsquo;s own interface differs, it is the authority.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {g.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} className="text-primary hover:underline" rel="noopener nofollow" target="_blank">{s.title}</a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              {g.brand} is a trademark of its owner. This page states that {g.brand} cameras exposing a standard
              RTSP stream interoperate with Camzify; it does not imply partnership, endorsement or certification by {g.brand}.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="font-mono text-mono-sm uppercase text-muted-foreground">Other camera brands</h2>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/supported-cameras/${o.slug}`} className="text-primary hover:underline">{o.brand}</Link>
                </li>
              ))}
              <li><Link href="/supported-cameras" className="text-muted-foreground hover:text-primary">Every supported brand, and why any RTSP camera works</Link></li>
            </ul>
          </section>
        </div>
      </article>
      <FaqSection items={g.faqs} />
    </PageShell>
  );
}
