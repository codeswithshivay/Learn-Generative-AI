import { existsSync } from "node:fs";
import { join } from "node:path";

import dotenv from "dotenv";

const rootEnvPath = join(process.cwd(), ".env");
const backendEnvPath = join(process.cwd(), "backend", ".env");

if (existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
}

if (existsSync(backendEnvPath)) {
  dotenv.config({ path: backendEnvPath, override: true });
}

function parseOrigins(value: string | undefined): string[] {
  const fallback = "http://localhost:3000";
  const raw = value?.trim() || fallback;

  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function parsePort(value: string | undefined): number {
  const fallback = 4000;
  const parsed = Number.parseInt(value ?? "", 10);

  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }

  return fallback;
}


export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: parsePort(process.env.PORT),
  corsOrigins: parseOrigins(process.env.CORS_ORIGIN),
  apiKey: process.env.API_KEY,
} as const;
