import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { authRouter } from './routes/auth.routes.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
import { csrfOriginGuard } from './middleware/csrf-origin.js';

export const app = express();

app.use(express.json());
app.use(cors({ origin: env.frontendOrigin, credentials: true }));
app.use(cookieParser());
app.use(csrfOriginGuard);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'developer-codebase-assistant-api' });
});

app.use('/api/auth', authRouter);

app.use(notFoundHandler);
app.use(errorHandler);
