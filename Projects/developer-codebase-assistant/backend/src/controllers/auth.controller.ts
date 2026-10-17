import type { RequestHandler, Response } from 'express';
import { authCookieName, authCookieOptions } from '../config/auth.js';
import {
  authenticateUser,
  getCurrentUser,
  registerUser,
} from '../services/auth.service.js';
import { validateCredentials } from '../validators/auth.validator.js';

const invalidCredentialsResponse = { error: 'Unauthorized', message: 'Invalid email or password.' };

export const register: RequestHandler = async (request, response, next) => {
  try {
    const input = validateCredentials(request.body);
    if (!input) {
      response.status(400).json({ error: 'Bad Request', message: 'A valid email and password are required.' });
      return;
    }

    const authenticatedUser = await registerUser(input);
    if (!authenticatedUser) {
      response.status(409).json({ error: 'Conflict', message: 'An account with that email already exists.' });
      return;
    }

    setAuthCookie(response, authenticatedUser.token);
    response.status(201).json({ user: authenticatedUser.user });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (request, response, next) => {
  try {
    const input = validateCredentials(request.body, false);
    if (!input) {
      response.status(401).json(invalidCredentialsResponse);
      return;
    }

    const authenticatedUser = await authenticateUser(input);
    if (!authenticatedUser) {
      response.status(401).json(invalidCredentialsResponse);
      return;
    }

    setAuthCookie(response, authenticatedUser.token);
    response.json({ user: authenticatedUser.user });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (_request, response) => {
  response.clearCookie(authCookieName, authCookieOptions);
  response.json({ message: 'Logged out successfully.' });
};

export const me: RequestHandler = async (request, response, next) => {
  try {
    const user = await getCurrentUser(request.auth!.userId);
    if (!user) {
      response.status(401).json({ error: 'Unauthorized', message: 'Authentication is required.' });
      return;
    }

    response.json({ user });
  } catch (error) {
    next(error);
  }
};

function setAuthCookie(response: Response, token: string): void {
  response.cookie(authCookieName, token, authCookieOptions);
}
