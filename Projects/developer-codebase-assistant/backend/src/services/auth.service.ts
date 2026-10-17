import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtOptions } from '../config/auth.js';
import { env } from '../config/env.js';
import { UserModel } from '../models/user.model.js';
import type { AuthenticatedUser, Credentials, SafeUser } from '../types/auth.js';

const passwordSaltRounds = 12;

export async function registerUser(credentials: Credentials): Promise<AuthenticatedUser | null> {
  const existingUser = await UserModel.exists({ email: credentials.email });
  if (existingUser) {
    return null;
  }

  const passwordHash = await bcrypt.hash(credentials.password, passwordSaltRounds);
  const user = await UserModel.create({ email: credentials.email, passwordHash });

  return createAuthenticatedUser(user);
}

export async function authenticateUser(credentials: Credentials): Promise<AuthenticatedUser | null> {
  const user = await UserModel.findOne({ email: credentials.email }).select('+passwordHash');
  const passwordMatches = user ? await bcrypt.compare(credentials.password, user.passwordHash) : false;

  if (!user || !passwordMatches) {
    return null;
  }

  return createAuthenticatedUser(user);
}

export async function getCurrentUser(userId: string): Promise<SafeUser | null> {
  const user = await UserModel.findById(userId);
  return user ? toSafeUser(user) : null;
}

function createAuthenticatedUser(user: { id: string; email: string }): AuthenticatedUser {
  return {
    user: toSafeUser(user),
    token: jwt.sign({ sub: user.id, typ: 'access' }, env.jwtSecret, jwtOptions),
  };
}

function toSafeUser(user: { id: string; email: string }): SafeUser {
  return { id: user.id, email: user.email };
}
