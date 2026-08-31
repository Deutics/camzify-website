import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

/**
 * Static robots.txt.
 *
 * AI crawlers are allowed explicitly rather than relying on the wildcard rule. Several
 * of these agents (notably OAI-SearchBot and PerplexityBot) treat an explicit allow as
 * a stronger signal than a permissive wildcard, and being named here is a prerequisite
 * for appearing as a cited source in AI answers.
 *
 * `/api/` is disallowed because those routes are write-only lead endpoints with no
 * crawlable content.
 */
export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    'GPTBot', // OpenAI — training + ChatGPT browsing
    'OAI-SearchBot', // OpenAI — ChatGPT Search index
    'ChatGPT-User', // OpenAI — user-initiated fetches
    'ClaudeBot', // Anthropic — index
    'Claude-User', // Anthropic — user-initiated fetches
    'Claude-SearchBot', // Anthropic — search
    'anthropic-ai',
    'PerplexityBot', // Perplexity — index
    'Perplexity-User', // Perplexity — user-initiated fetches
    'Google-Extended', // Google — Gemini / AI Overviews grounding
    'Applebot', // Apple — Siri / Spotlight
    'Applebot-Extended',
    'CCBot', // Common Crawl — feeds many downstream models
    'Bingbot',
    'meta-externalagent',
    'cohere-ai',
    'Diffbot',
    'Amazonbot',
    'YouBot',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
