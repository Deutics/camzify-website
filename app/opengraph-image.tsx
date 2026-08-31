import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site-config';

/**
 * Generated Open Graph card, 1200×630.
 *
 * Replaces the static /og-image.png, which was a 120×120 square being declared to
 * crawlers as 1200×630 — every social and chat unfurl rendered it stretched or
 * rejected it outright for falling under the minimum for a large image card.
 *
 * Generating it means the dimensions can never drift from the declaration again.
 * Rendered with system fonts only: remote font fetches are the usual failure mode for
 * ImageResponse at build time, and a card that fails to build is worse than one in
 * Helvetica.
 */
export const runtime = 'nodejs';
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#080b0f',
          padding: '72px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          position: 'relative',
        }}
      >
        {/* Brand glow, echoing the site hero treatment */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -180,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,1,1,0.55) 0%, rgba(168,1,1,0) 70%)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#00d6a6', display: 'flex' }} />
          <div
            style={{
              color: '#00d6a6',
              fontSize: 22,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            AI-Powered Virtual Patrolling
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#ffffff',
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Your site. Patrolled 24/7.</span>
            <span style={{ color: '#e23b3b' }}>Without the guard.</span>
          </div>
          <div style={{ color: '#93a1b0', fontSize: 28, marginTop: 28, maxWidth: 900, display: 'flex' }}>
            Scheduled AI patrol rounds on the cameras you already own.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 28,
          }}
        >
          <div style={{ color: '#ffffff', fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em', display: 'flex' }}>
            {siteConfig.name}
          </div>
          <div style={{ color: '#6b7c8c', fontSize: 22, letterSpacing: '0.08em', display: 'flex' }}>
            camzify.com
          </div>
        </div>
      </div>
    ),
    size
  );
}
