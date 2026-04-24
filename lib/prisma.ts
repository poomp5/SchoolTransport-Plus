import 'server-only';
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// 1. Configure WebSocket for Neon
// This is required for the serverless driver to work in Node environments
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set; check your .env or deployment env");
}

// 2. Initialize the Pool
const pool = new Pool({ connectionString });

/**
 * We use a linter ignore here because @prisma/adapter-neon and 
 * @neondatabase/serverless have a known internal type mismatch.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapter = new PrismaNeon(pool as any);

// 3. Singleton pattern for PrismaClient to prevent exhaustion in dev
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}