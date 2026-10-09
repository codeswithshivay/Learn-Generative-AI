import { Router, type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authCookieName, authCookieOptions, jwtOptions } from '../config/auth.js';
import { env } from '../config/env.js';
import { UserModel } from '../models/user.model.js';
import { requireAuth } from '../middleware/require-auth.js';

export const authRouter = Router();
const minimumPasswordLength = 8;

authRouter.post('/register', async (request, response, next) => {
  try {
    const input = validateCredentials(request.body);
    if (!input) {
      response.status(400).json({ error: 'Bad Request', message: 'A valid email and password are required.' });
      return;
    }

    const existingUser = await UserModel.exists({ email: input.email });
    if (existingUser) {
      response.status(409).json({ error: 'Conflict', message: 'An account with that email already exists.' });
      return;
    }

    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await UserModel.create({ email: input.email, passwordHash });
    setAuthCookie(response, user.id);
    response.status(201).json({ user: toSafeUser(user) });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/login', async (request, response, next) => {
  try {
    const input = validateCredentials(request.body, false);
    if (!input) {
      response.status(401).json({ error: 'Unauthorized', message: 'Invalid email or password.' });
      return;
    }

    const user = await UserModel.findOne({ email: input.email }).select('+passwordHash');
    const passwordMatches = user ? await bcrypt.compare(input.password, user.passwordHash) : false;
    if (!user || !passwordMatches) {
      response.status(401).json({ error: 'Unauthorized', message: 'Invalid email or password.' });
      return;
    }

    setAuthCookie(response, user.id);
    response.json({ user: toSafeUser(user) });
  } catch (error) {
    next(error);
  }
});

authRouter.post('/logout', (_request, response) => {
  response.clearCookie(authCookieName, authCookieOptions);
  response.json({ message: 'Logged out successfully.' });
});

authRouter.get('/me', requireAuth, async (request, response, next) => {
  try {
    const user = await UserModel.findById(request.auth!.userId);
    if (!user) {
      response.status(401).json({ error: 'Unauthorized', message: 'Authentication is required.' });
      return;
    }

    response.json({ user: toSafeUser(user) });
  } catch (error) {
    next(error);
  }
});

function validateCredentials(body: unknown, validatePassword = true): { email: string; password: string } | null {
  if (!body || typeof body !== 'object') return null;
  const values = body as Record<string, unknown>;
  if (typeof values.email !== 'string' || typeof values.password !== 'string') return null;

  const email = values.email.trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email) || (validatePassword && values.password.length < minimumPasswordLength)) {
    return null;
  }
  return { email, password: values.password };
}

function setAuthCookie(response: Response, userId: string): void {
  const token = jwt.sign({ sub: userId, typ: 'access' }, env.jwtSecret, jwtOptions);
  response.cookie(authCookieName, token, authCookieOptions);
}

function toSafeUser(user: { id: string; email: string }): { id: string; email: string } {
  return { id: user.id, email: user.email };
}
