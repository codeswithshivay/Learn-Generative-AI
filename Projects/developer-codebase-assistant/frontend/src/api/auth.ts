import { request } from './client';

export type SafeUser = { id: string; email: string };

export const authApi = {
  me: () => request<{ user: SafeUser }>('/api/auth/me'),
  register: (email: string, password: string) => request<{ user: SafeUser }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
  login: (email: string, password: string) => request<{ user: SafeUser }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
  logout: () => request<{ message: string }>('/api/auth/logout', { method: 'POST' }),
};
