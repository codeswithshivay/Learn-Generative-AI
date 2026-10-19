import { request } from './client';

export type Project = {
  _id: string;
  name: string;
  path: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectInput = { name: string; path: string };

export const projectsApi = {
  list: () => request<{ projects: Project[] }>('/api/projects'),
  create: (input: ProjectInput) => request<{ project: Project }>('/api/projects', {
    method: 'POST',
    body: JSON.stringify(input),
  }),
};
