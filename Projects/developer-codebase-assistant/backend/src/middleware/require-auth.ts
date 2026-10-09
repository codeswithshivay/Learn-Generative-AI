import type { RequestHandler } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { authCookieName } from '../config/auth.js';
import { env } from '../config/env.js';

export interface AuthenticatedIdentity {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthenticatedIdentity;
    }
  }
}

export const requireAuth: RequestHandler = (request, response, next) => {
  const token = request.cookies?.[authCookieName];
  if (!token) {
    response.status(401).json({ error: 'Unauthorized', message: 'Authentication is required.' });
    return;
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret, { algorithms: ['HS256'] });
    if (typeof payload === 'string' || !isValidPayload(payload)) {
      response.status(401).json({ error: 'Unauthorized', message: 'Authentication is required.' });
      return;
    }

    request.auth = { userId: payload.sub };
    next();
  } catch {
    response.status(401).json({ error: 'Unauthorized', message: 'Authentication is required.' });
  }
};

function isValidPayload(payload: JwtPayload): payload is JwtPayload & { sub: string; typ: 'access' } {
  return typeof payload.sub === 'string' && payload.typ === 'access';
}
