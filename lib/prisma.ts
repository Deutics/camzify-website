import { PrismaClient } from '@prisma/client';
import { databaseUrl } from '@/lib/database-url';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// The connection string is passed explicitly because it may arrive under the Neon
// integration's prefixed name rather than the DATABASE_URL the schema names
// (lib/database-url.ts). Only imported by the endpoints after they checked databaseUrl.
export const prisma = globalForPrisma.prisma || new PrismaClient(databaseUrl ? { datasourceUrl: databaseUrl } : undefined);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
