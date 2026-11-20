/*
 * Runs `prisma migrate deploy` during the build, but only when a lead database is
 * connected.
 *
 * The site builds and runs with no database at all (leads are emailed), so the build
 * must not require one. When the database is connected on the deploy target, this
 * applies the migrations in prisma/migrations on the next build, which is what creates
 * and updates the lead tables. Nothing else has to be run by hand.
 *
 * The connection string may be DATABASE_URL or the names the Vercel Marketplace's Neon
 * integration created under its prefix CAMZIFY_WEBSITE_DATABASE_ (lib/database-url.ts
 * explains). Migrations prefer the direct, unpooled connection: Prisma's migration lock
 * does not work through Neon's connection pooler.
 */
import { spawnSync } from 'node:child_process';

const PREFIX = 'CAMZIFY_WEBSITE_DATABASE_';
const pick = (...names) => names.map((n) => process.env[n]?.trim()).find(Boolean);
const url = pick('DATABASE_URL_UNPOOLED', `${PREFIX}DATABASE_URL_UNPOOLED`, 'DATABASE_URL', `${PREFIX}DATABASE_URL`);

if (!url) {
  console.log('migrate: no database connection string is set, skipping (leads are emailed only)');
  process.exit(0);
}
const r = spawnSync('npx', ['prisma', 'migrate', 'deploy'], { stdio: 'inherit', env: { ...process.env, DATABASE_URL: url } });
process.exit(r.status ?? 1);
