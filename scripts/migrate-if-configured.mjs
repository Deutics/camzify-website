/*
 * Runs `prisma migrate deploy` during the build, but only when DATABASE_URL is set.
 *
 * The site builds and runs with no database at all (leads are emailed), so the build
 * must not require one. When the lead database is connected by adding DATABASE_URL on
 * the deploy target, this applies the migrations in prisma/migrations on the next build,
 * which is what creates the four lead tables. Nothing else has to be run by hand.
 */
import { spawnSync } from 'node:child_process';

if (!process.env.DATABASE_URL) {
  console.log('migrate: DATABASE_URL is not set, skipping (leads are emailed only)');
  process.exit(0);
}
const r = spawnSync('npx', ['prisma', 'migrate', 'deploy'], { stdio: 'inherit', env: process.env });
process.exit(r.status ?? 1);
