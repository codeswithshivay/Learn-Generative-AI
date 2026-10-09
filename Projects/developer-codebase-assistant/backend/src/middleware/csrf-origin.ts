import type { RequestHandler } from 'express';
import { env } from '../config/env.js';

// Cookie-authenticated browser mutations must come from the configured frontend origin.
// Requests without Origin are allowed for non-browser clients and local API tooling.
export const csrfOriginGuard: RequestHandler = (request, response, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    next();
    return;
  }

  const origin = request.get('origin');
  if (origin && origin !== env.frontendOrigin) {
    response.status(403).json({ error: 'Forbidden', message: 'Request origin is not allowed.' });
    return;
  }

  next();
};
