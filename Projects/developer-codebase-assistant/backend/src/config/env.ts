import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';

config({ path: fileURLToPath(new URL('../../../.env', import.meta.url)) });

const port = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

const mongodbUri = process.env.MONGODB_URI?.trim();
if (!mongodbUri) {
  throw new Error('MONGODB_URI is required. Provide the remote MongoDB connection string in the local environment.');
}

const jwtSecret = process.env.JWT_SECRET?.trim();
if (!jwtSecret || jwtSecret.length < 32) {
  throw new Error('JWT_SECRET is required and must be at least 32 characters long.');
}

const jwtExpiresIn = process.env.JWT_EXPIRES_IN?.trim() || '1d';
const frontendOrigin = process.env.FRONTEND_ORIGIN?.trim();
if (!frontendOrigin) {
  throw new Error('FRONTEND_ORIGIN is required, for example http://localhost:5173.');
}

export const env = { mongodbUri, port, jwtSecret, jwtExpiresIn, frontendOrigin } as const;
