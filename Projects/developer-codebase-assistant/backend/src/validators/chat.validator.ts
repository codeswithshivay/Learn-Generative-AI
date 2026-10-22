import type { ProjectChatInput } from '../types/chat.js';

export const maxChatMessageLength = 4000;

export function validateProjectChatInput(body: unknown): ProjectChatInput | null {
  if (!isRecord(body) || typeof body.message !== 'string') return null;

  const message = body.message.trim();
  if (!message || message.length > maxChatMessageLength || Object.keys(body).some((key) => key !== 'message')) {
    return null;
  }

  return { message };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
