export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  const body = (await response.json().catch(() => ({}))) as { message?: string };

  if (!response.ok) {
    throw new ApiError(response.status, body.message ?? 'The request could not be completed.');
  }

  return body as T;
}
