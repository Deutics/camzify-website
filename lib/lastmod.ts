import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * Per-page `lastmod` for sitemap.xml, from git history. Build-time only: sitemap.ts is
 * prerendered, so this runs once per build and never reaches a browser.
 *
 * A page's date is the last commit that changed its own source. Shared chrome (header,
 * footer, site-config) is deliberately not counted: a menu tweak changes no page's
 * content, and dating all 267 pages on every release is how the sitemap looked before
 * (every entry stamped with the build time), which is the signal search engines learn
 * to ignore. scripts/indexnow.mjs applies the same rule to what it submits.
 *
 * History is walked along first parents with each merge diffed against its first
 * parent, so on main a page's date is the day its change was merged, i.e. went live,
 * not the day it was written on a branch.
 *
 * SHALLOW CLONES. Vercel builds from a shallow clone unless VERCEL_DEEP_CLONE=true is
 * set. At the edge of a shallow history git reports every file as added in the
 * boundary commit, so a date found there is not a real change date. Those pages get no
 * lastmod at all: an omitted lastmod is honest, a wrong one is not. With no git (or no
 * history) every page is omitted.
 */

const ROOT = process.cwd();

function git(args: string[]): string | null {
  try {
    return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return null;
  }
}

/** Commits at the cut edge of a shallow clone (.git/shallow), whose file lists are not real changes. */
function shallowBoundary(): Set<string> {
  const gitDir = git(['rev-parse', '--git-dir'])?.trim();
  if (!gitDir) return new Set();
  const file = path.resolve(ROOT, gitDir, 'shallow');
  if (!existsSync(file)) return new Set();
  return new Set(readFileSync(file, 'utf8').split('\n').map((s) => s.trim()).filter(Boolean));
}

/** Map of repo-relative file path -> ISO date of the last first-parent commit that changed it. */
function fileDates(): Map<string, string | null> {
  const dates = new Map<string, string | null>();
  const log = git(['log', '--first-parent', '-m', '--no-renames', '--name-only', '--format=%x00%H %cI', 'HEAD']);
  if (!log) return dates;
  const boundary = shallowBoundary();
  for (const block of log.split('\0')) {
    const [header, ...files] = block.split('\n');
    if (!header?.trim()) continue;
    const [sha, date] = header.trim().split(' ');
    const real = !boundary.has(sha);
    for (const f of files) {
      // Newest first: the first time a file appears is its latest change. A first
      // sighting at the shallow boundary is recorded as unknown (null).
      if (f && !dates.has(f)) dates.set(f, real ? date : null);
    }
  }
  return dates;
}

const DATES = fileDates();

function latest(files: string[]): string | undefined {
  let best: string | undefined;
  for (const f of files) {
    const d = DATES.get(f);
    if (d === null) return undefined; // one source of unknown age makes the page's date unknown
    if (d && (!best || d > best)) best = d;
  }
  return best;
}

/** Everything under a directory prefix that git has a date for. */
function under(prefix: string): string[] {
  return [...DATES.keys()].filter((f) => f.startsWith(prefix));
}

/** The source files whose changes change what a route renders. */
function sourcesFor(route: string): string[] {
  if (route.startsWith('/glossary/')) return ['lib/glossary-terms.ts']; // one data file renders every term page
  const page = route === '/' ? 'app/page.tsx' : `app${route}/page.tsx`;
  const files = [page];
  // The homepage's copy lives in its section components, in both languages.
  if (route === '/' || route === '/de') files.push(...under('app/_components/'));
  if (route === '/glossary') files.push('lib/glossary-terms.ts');
  // The human site map is generated from the route list.
  if (route === '/sitemap-page') files.push('lib/routes.ts');
  return files;
}

/** ISO date of the route's last content change, or undefined when git cannot say. */
export function lastModifiedFor(route: string): string | undefined {
  return latest(sourcesFor(route));
}
