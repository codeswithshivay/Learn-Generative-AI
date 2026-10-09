import type { CookieOptions } from 'express';
import { env } from './env.js';

export const authCookieName = 'dca_auth';
export const authCookieMaxAgeMs = 24 * 60 * 60 * 1000;

export const authCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/api',
  maxAge: authCookieMaxAgeMs,
};

export const jwtOptions = {
  algorithm: 'HS256' as const,
  expiresIn: env.jwtExpiresIn,
};
