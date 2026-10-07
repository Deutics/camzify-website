#!/usr/bin/env node
/**
 * IndexNow: tell Bing (and every engine that shares IndexNow submissions) which URLs a
 * release changed, so they are recrawled within minutes rather than whenever the
 * crawler next comes round. Protocol: https://www.indexnow.org/documentation
 *
 *   node scripts/indexnow.mjs --base <sha> --head <sha>          # submit
 *   node scripts/indexnow.mjs --base <sha> --head <sha> --dry-run # print, send nothing
 *
 * Run automatically by .github/workflows/indexnow.yml after every successful
 * production deployment, with base = the deployed commit's first parent.
 *
 * WHAT IT SUBMITS. Only URLs whose own source changed between the two commits, as the
 * protocol asks ("publish only URLs changing ... added, updated, or deleted"):
 *   - app/<route>/page.tsx          -> that route (deleted pages too, so they drop out)
 *   - app/_components/*             -> / and /de (the homepage sections render both)
 *   - lib/glossary-terms.ts         -> /glossary and every /glossary/<slug>
 *   - lib/camera-brand-guides.ts    -> every /supported-cameras/<brand> guide
 *   - app/llms.txt/route.ts         -> /llms.txt
 * A change to shared chrome (header, footer, site-config) touches every page but
 * changes none of them in substance, so it submits nothing: resubmitting 270 URLs on
 * every menu tweak is the kind of volume the protocol answers with 429.
 *
 * THE KEY is public by design: the engines fetch it from https://camzify.com/<key>.txt
 * to confirm the submitter controls the host. Rotate it by generating a new one,
 * replacing the file in public/ and the constant below.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const KEY = 'c3d090a830742fe7ceb3c7d5049eceea';
const HOST = 'camzify.com';
const ORIGIN = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10000;

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function arg(name) {
  const i = process.argv.indexOf(name);
  return i === -1 ? undefined : process.argv[i + 1];
}

function git(...args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' });
}

function changedFiles(base, head) {
  // --no-renames: a moved page is a deletion at the old URL and an addition at the new one.
  return git('diff', '--name-status', '--no-renames', base, head)
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [status, file] = line.split('\t');
      return { status, file };
    });
}

function routeFor(file) {
  const m = file.match(/^app\/(.*)page\.tsx$/);
  if (!m) return null;
  if (file.includes('[')) return null; // dynamic segments are handled by their data file
  const route = '/' + m[1].replace(/\/$/, '');
  return route === '/' ? '/' : route.replace(/\/+$/, '');
}

function glossaryUrls(head) {
  const source = git('show', `${head}:lib/glossary-terms.ts`);
  const slugs = [...source.matchAll(/^\s*slug:\s*['"]([^'"]+)['"]/gm)].map((x) => x[1]);
  return ['/glossary', ...slugs.map((s) => `/glossary/${s}`)];
}

function brandGuideUrls(head) {
  const source = git('show', `${head}:lib/camera-brand-guides.ts`);
  const slugs = [...source.matchAll(/^\s*slug:\s*['"]([^'"]+)['"]/gm)].map((x) => x[1]);
  return slugs.map((s) => `/supported-cameras/${s}`);
}

function collect(base, head) {
  const paths = new Set();
  for (const { file } of changedFiles(base, head)) {
    const route = routeFor(file);
    if (route) paths.add(route);
    else if (file.startsWith('app/_components/')) { paths.add('/'); paths.add('/de'); }
    else if (file === 'lib/glossary-terms.ts') glossaryUrls(head).forEach((p) => paths.add(p));
    else if (file === 'lib/camera-brand-guides.ts' || file === 'app/supported-cameras/[brand]/page.tsx') brandGuideUrls(head).forEach((p) => paths.add(p));
    else if (file === 'app/llms.txt/route.ts') paths.add('/llms.txt');
  }
  return [...paths].sort().map((p) => (p === '/' ? ORIGIN : ORIGIN + p)).slice(0, MAX_URLS);
}

async function main() {
  const base = arg('--base');
  const head = arg('--head') ?? 'HEAD';
  const dryRun = process.argv.includes('--dry-run');
  if (!base) {
    console.error('usage: node scripts/indexnow.mjs --base <sha> [--head <sha>] [--dry-run]');
    process.exit(2);
  }

  const keyFile = path.join(ROOT, 'public', `${KEY}.txt`);
  if (!existsSync(keyFile) || readFileSync(keyFile, 'utf8').trim() !== KEY) {
    console.error(`public/${KEY}.txt is missing or does not contain the key; refusing to submit.`);
    process.exit(1);
  }

  const urlList = collect(base, head);
  console.log(`${urlList.length} changed URL(s) between ${base.slice(0, 7)} and ${head.slice(0, 7)}`);
  urlList.forEach((u) => console.log(`  ${u}`));
  if (urlList.length === 0 || dryRun) return;

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
  });
  // 200 = accepted, 202 = accepted and the key is still being validated.
  console.log(`IndexNow responded ${res.status} ${res.statusText}`);
  if (res.status !== 200 && res.status !== 202) {
    console.error(await res.text().catch(() => ''));
    process.exit(1);
  }
}

main();
