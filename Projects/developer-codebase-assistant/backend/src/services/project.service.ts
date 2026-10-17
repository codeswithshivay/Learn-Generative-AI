import { ProjectModel } from '../models/project.model.js';
import type { ProjectInput, ProjectUpdate } from '../types/project.js';

export async function createProject(input: ProjectInput, userId: string) {
  return ProjectModel.create({
    name: input.name,
    path: input.path,
    owner: userId,
  });
}

export async function listProjects(userId: string) {
  return ProjectModel.find({ owner: userId }).sort({ updatedAt: -1 });
}

export async function getProject(projectId: string, userId: string) {
  return ProjectModel.findOne({ _id: projectId, owner: userId });
}

export async function updateProject(projectId: string, userId: string, update: ProjectUpdate) {
  return ProjectModel.findOneAndUpdate(
    { _id: projectId, owner: userId },
    { $set: update },
    { new: true, runValidators: true },
  );
}
