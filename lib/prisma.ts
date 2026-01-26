import 'server-only';
import path from "path";
import dotenv from "dotenv";

// Ensure env vars are loaded when Next server spins routes in dev
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";

// Provide a WebSocket implementation for Neon (Node 18/20 don't have one)
try {
  // Prefer real ws if installed
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  neonConfig.webSocketConstructor = require("ws");
} catch {
  try {
    // Fallback: Next.js bundles ws internally
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
    neonConfig.webSocketConstructor = require("next/dist/compiled/ws");
  } catch {
    console.warn(
      "No WebSocket implementation found. Install 'ws' to enable Neon connections in Node.",
    );
  }
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set; check your .env.local or deployment env");
}

// Neon serverless adapter (required for Prisma 7 driver adapters)
const neon = new Pool({ connectionString });
const adapter = new PrismaNeon(neon);

// Ensure PrismaClient is a singleton across hot reloads in dev
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
