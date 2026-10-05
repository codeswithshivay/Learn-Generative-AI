import express from 'express';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';

export const app = express();

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'developer-codebase-assistant-api' });
});

app.use(notFoundHandler);
app.use(errorHandler);
