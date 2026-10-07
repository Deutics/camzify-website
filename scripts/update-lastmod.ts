/**
 * Writes lib/lastmod-dates.json: each sitemap route's last content change, from git.
 *
 *   npx tsx scripts/update-lastmod.ts
 *
 * Production builds on Vercel have no git history (.vercelignore removes .git/), so
 * lib/lastmod.ts falls back to this file there. Run in a full clone: on a shallow one,
 * routes older than the fetched history are left out rather than misdated.
 * .github/workflows/lastmod.yml runs it after every push to main and commits the result.
 */
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { SITEMAP_ENTRIES } from '../lib/routes';
import { lastModifiedFor, datesFromGit } from '../lib/lastmod';

if (!datesFromGit()) {
  console.error('No git history here; refusing to overwrite lib/lastmod-dates.json with nothing.');
  process.exit(1);
}

const dates: Record<string, string> = {};
for (const { path: route } of SITEMAP_ENTRIES) {
  const d = lastModifiedFor(route);
  if (d) dates[route] = d;
}
const file = path.join(process.cwd(), 'lib', 'lastmod-dates.json');
writeFileSync(file, JSON.stringify(dates, null, 2) + '\n');
console.log(`${Object.keys(dates).length} of ${SITEMAP_ENTRIES.length} routes dated -> lib/lastmod-dates.json`);
