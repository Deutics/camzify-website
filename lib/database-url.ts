/**
 * The lead database's connection string, or undefined when no database is connected.
 *
 * Read from `DATABASE_URL` first. Failing that, from the names the Vercel Marketplace's
 * Neon integration created when the database was connected on 2026-11-20: it added its
 * variables under the prefix `CAMZIFY_WEBSITE_DATABASE_`, so the connection string is
 * `CAMZIFY_WEBSITE_DATABASE_DATABASE_URL`. Accepting both means the integration's own
 * variables work as created and a plain DATABASE_URL (local, or another host) still does.
 *
 * This is the pooled connection, which is what the serverless form endpoints should use.
 * Migrations use the direct (unpooled) one: scripts/migrate-if-configured.mjs keeps its
 * own copy of these names, since it runs in Node before the app is compiled.
 */
const NAMES = ['DATABASE_URL', 'CAMZIFY_WEBSITE_DATABASE_DATABASE_URL'] as const;

export const databaseUrl: string | undefined = NAMES.map((n) => process.env[n]?.trim()).find((v): v is string => Boolean(v));
