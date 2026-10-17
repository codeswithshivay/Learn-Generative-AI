import type { Credentials } from '../types/auth.js';

const minimumPasswordLength = 8;

export function validateCredentials(body: unknown, validatePassword = true): Credentials | null {
  if (!body || typeof body !== 'object') return null;

  const values = body as Record<string, unknown>;
  if (typeof values.email !== 'string' || typeof values.password !== 'string') return null;

  const email = values.email.trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email) || (validatePassword && values.password.length < minimumPasswordLength)) {
    return null;
  }

  return { email, password: values.password };
}
