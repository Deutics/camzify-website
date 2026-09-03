import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/system/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ChunkLoadErrorHandler } from '@/components/system/chunk-load-error-handler';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { ExitIntentModal } from '@/components/layout/exit-intent-modal';
import { JsonLd } from '@/components/system/json-ld';
import { siteConfig } from '@/lib/site-config';
import { graph, organizationSchema, websiteSchema, softwareApplicationSchema } from '@/lib/seo';
import type { Metadata, Viewport } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display', weight: ['600', '700', '800'], display: 'swap' });

const title = 'AI Video Management & Virtual Patrolling Software';
const description =
  'AI cloud video management for the cameras you already own: live streaming, 22 detections and scheduled virtual patrol rounds with a compliance record.';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${title} | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: 'Security Software',
  keywords: [
    'virtual patrolling',
    'AI video surveillance',
    'video analytics software',
    'remote guarding',
    'perimeter intrusion detection',
    'guard tour system',
    'CCTV analytics',
    'video management system',
  ],
  alternates: { canonical: '/' },
  // No `icons` key: app/icon.png and app/apple-icon.png are picked up by Next's file
  // convention and emit the tags automatically. Declaring icons here would override them.
  // No `images` key on purpose: app/opengraph-image.tsx and app/twitter-image.tsx are
  // picked up by Next's file convention and emit correctly-sized tags automatically.
  // Setting `images` here would override them with a static file again.
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${title} | ${siteConfig.name}`,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Virtual Patrolling & AI Video Surveillance | ${siteConfig.name}`,
    description: 'Scheduled AI patrol rounds on the cameras you already own.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f6f8' },
    { media: '(prefers-color-scheme: dark)', color: '#080b0f' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // One entity graph for the whole site. Every page's own schema links back to these
  // nodes by @id, so crawlers resolve the site as a single connected entity.
  const siteGraph = graph(organizationSchema(), websiteSchema(), softwareApplicationSchema());

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={siteGraph} />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${jakartaSans.variable} font-sans`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        {/*
          defaultTheme="system" so a first-time visitor gets the theme their OS asks
          for. The site is designed dark-first and dark remains the fallback when the
          OS expresses no preference, but forcing dark on someone whose machine is set
          to light is a preference we should not be overriding.
        */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteHeader />
          <main id="main" className="min-h-screen">{children}</main>
          <SiteFooter />
          <ExitIntentModal />
          <Toaster />
          <ChunkLoadErrorHandler />
        </ThemeProvider>
      </body>
    </html>
  );
}
