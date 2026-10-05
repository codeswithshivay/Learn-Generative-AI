import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';

config({ path: fileURLToPath(new URL('../../../.env', import.meta.url)) });

const port = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

const mongodbUri = process.env.MONGODB_URI?.trim();
console.log('Mongodb uri', mongodbUri);
if (!mongodbUri) {
  throw new Error('MONGODB_URI is required. Provide the remote MongoDB connection string in the local environment.');
}

export const env = { mongodbUri, port } as const;
