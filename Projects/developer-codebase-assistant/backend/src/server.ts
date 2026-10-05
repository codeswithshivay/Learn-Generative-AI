import { app } from './app.js';
import { env } from './config/env.js';
import { connectToDatabase } from './database/connection.js';

const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase(env.mongodbUri);

    const server = app.listen(env.port, () => {
      console.log(`Backend listening on port ${env.port}`);
    });

    server.on('error', (error) => {
      console.error('Backend server failed to start.', error);
      process.exitCode = 1;
    });
  } catch (error) {
    console.error('Backend startup failed because the database connection could not be established.', error);
    process.exitCode = 1;
  }
};

void startServer();
