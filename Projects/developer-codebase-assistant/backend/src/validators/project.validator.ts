import type { ProjectInput, ProjectUpdate } from '../types/project.js';

const supportedProjectFields = new Set(['name', 'path']);

export function validateProjectInput(body: unknown): ProjectInput | null {
  if (!isRecord(body) || !hasOnlySupportedFields(body) || typeof body.name !== 'string' || typeof body.path !== 'string') {
    return null;
  }

  const name = body.name.trim();
  const path = body.path.trim();
  if (!name || !path) return null;

  return { name, path };
}

export function validateProjectUpdate(body: unknown): ProjectUpdate | null {
  if (!isRecord(body) || !hasOnlySupportedFields(body)) return null;

  const update: ProjectUpdate = {};
  if ('name' in body) {
    if (typeof body.name !== 'string' || !body.name.trim()) return null;
    update.name = body.name.trim();
  }
  if ('path' in body) {
    if (typeof body.path !== 'string' || !body.path.trim()) return null;
    update.path = body.path.trim();
  }

  return Object.keys(update).length > 0 ? update : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function hasOnlySupportedFields(value: Record<string, unknown>): boolean {
  return Object.keys(value).every((field) => supportedProjectFields.has(field));
}
