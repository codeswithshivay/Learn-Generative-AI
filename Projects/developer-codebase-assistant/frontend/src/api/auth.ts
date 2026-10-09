export type SafeUser = { id: string; email: string };

const apiBaseUrl = (import.meta as any).env.VITE_API_URL ?? 'http://localhost:3000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  const body = (await response.json().catch(() => ({}))) as { message?: string };
  if (!response.ok) throw new Error(body.message ?? 'The request could not be completed.');
  return body as T;
}

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
