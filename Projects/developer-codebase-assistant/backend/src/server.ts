import { app } from './app.js';
import { env } from './config/env.js';

const server = app.listen(env.port, () => {
  console.log(`Backend listening on port ${env.port}`);
});

server.on('error', (error) => {
  console.error('Backend server failed to start.', error);
  process.exitCode = 1;
});

