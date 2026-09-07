const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        // The roadmap "Behavioral Analytics" page was superseded by the shipping
        // Behavioral Anomaly Detection feature, which works differently enough to
        // warrant its own slug. Permanent so any existing link equity follows.
        source: '/ai-features/behavioral-analytics',
        destination: '/ai-features/behavioral-anomaly-detection',
        permanent: true,
      },
      {
        // The site moved to US spelling; the slug followed the copy. Permanent so
        // anything already pointing at the Commonwealth spelling keeps resolving.
        source: '/partners/for-monitoring-centres',
        destination: '/partners/for-monitoring-centers',
        permanent: true,
      },
      {
        // Two pages targeted "virtual patrolling vs security guards". The /compare one
        // was 230 words with no FAQ; the virtual-patrolling one is the full argument.
        // One URL per query, so the thin one redirects to the deep one.
        source: '/compare/virtual-patrolling-vs-security-guards',
        destination: '/virtual-patrolling/vs-security-guards',
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.filename = 'static/chunks/[name]-[contenthash:8].js';
      config.output.chunkFilename = 'static/chunks/[contenthash:16].js';
    }
    return config;
  },
};

const fs = require('fs');
const userConfigPath = path.join(__dirname, 'next.config.user.json');
const userConfigAllowedKeys = { skipTrailingSlashRedirect: 'boolean', trailingSlash: 'boolean' };
if (fs.existsSync(userConfigPath)) {
  const userConfig = JSON.parse(fs.readFileSync(userConfigPath, 'utf8'));
  for (const key of Object.keys(userConfig)) {
    if (typeof userConfig[key] !== userConfigAllowedKeys[key]) {
      throw new Error(`next.config.user.json: unsupported override "${key}". Supported boolean keys: skipTrailingSlashRedirect, trailingSlash.`);
    }
    nextConfig[key] = userConfig[key];
  }
}

module.exports = nextConfig;
