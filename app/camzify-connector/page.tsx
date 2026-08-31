import { generatePageMeta } from '@/lib/page-utils';
import { PageShell } from '@/components/layout/page-shell';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import Link from 'next/link';

/**
 * Page identity. Declared once and consumed twice: by `generatePageMeta` for the
 * <head> tags, and by `PageShell` for the on-page structured data. Keeping it in one
 * const is what stops the meta description and the schema drifting apart.
 */
const pageMeta = {
  title: "Camzify Connector | RTSP Relay Software",
  description: "The Camzify Connector is a lightweight software relay that securely streams local RTSP cameras to the Camzify cloud — no port forwarding required.",
  path: "/camzify-connector",
};

export const metadata = generatePageMeta({ ...pageMeta });

export default function CamzifyConnectorPage() {
  return (
    <PageShell {...pageMeta} breadcrumbs={[{ label: 'Camzify Connector' }]}>
      <section className="pb-16">
        <div className="mx-auto max-w-site px-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Camzify Connector</h1>
          <p className="mt-6 max-w-prose text-body text-muted-foreground">
            The Camzify Connector is a lightweight software application installed on a PC or server on the same local network as your cameras. It relays RTSP streams securely to the Camzify cloud without requiring port forwarding, static IP addresses, or firewall changes.
          </p>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">Why you need it</h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Most IP cameras are installed on local networks behind NAT routers. They are not directly accessible from the internet — which is good for security, but makes cloud connectivity a challenge. The Connector solves this by establishing an outbound connection from inside the network, tunnelling the camera feeds securely to Camzify.
              </p>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">How it works</h2>
              <ol className="mt-4 space-y-4 max-w-prose text-muted-foreground list-decimal list-inside">
                <li>Install the Connector on any PC/server on the camera network.</li>
                <li>Enter the RTSP URLs of your local cameras into the Connector.</li>
                <li>The Connector authenticates with the Camzify cloud and begins relaying the video streams.</li>
                <li>Cameras appear in the Camzify dashboard as if they were cloud-connected.</li>
              </ol>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">System requirements</h2>
              <ul className="mt-4 space-y-2 max-w-prose text-muted-foreground">
                <li>• Windows 10/11, Linux, or macOS</li>
                <li>• Network access to the cameras (same LAN or VLAN)</li>
                <li>• Outbound internet access (HTTPS, no inbound ports required)</li>
                <li>• 2-4 Mbps upload bandwidth per camera (standard resolution)</li>
              </ul>
            </ScrollReveal>
          </div>

          <div className="mt-16">
            <ScrollReveal>
              <p className="max-w-prose text-muted-foreground">
                Once cameras are connected via the Connector, they are fully compatible with all Camzify features including <Link href="/virtual-patrolling" className="text-primary hover:underline">virtual patrolling</Link>, <Link href="/ai-features" className="text-primary hover:underline">AI detection</Link>, and the <Link href="/platform" className="text-primary hover:underline">platform dashboard</Link>. See the <Link href="/camera-connectivity/rtsp-setup" className="text-primary hover:underline">RTSP setup guide</Link> for detailed connection instructions.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
