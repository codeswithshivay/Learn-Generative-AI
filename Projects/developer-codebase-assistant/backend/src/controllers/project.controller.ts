import type { RequestHandler } from 'express';
import { Types } from 'mongoose';
import {
  createProject,
  getProject,
  listProjects,
  sendProjectChatMessage,
  updateProject,
} from '../services/project.service.js';
import { validateProjectChatInput } from '../validators/chat.validator.js';
import { validateProjectInput, validateProjectUpdate } from '../validators/project.validator.js';

const invalidProjectIdResponse = { error: 'Bad Request', message: 'A valid project ID is required.' };
const projectNotFoundResponse = { error: 'Not Found', message: 'Project not found.' };

export const create: RequestHandler = async (request, response, next) => {
  try {
    const input = validateProjectInput(request.body);
    if (!input) {
      response.status(400).json({ error: 'Bad Request', message: 'A valid project name and path are required.' });
      return;
    }

    const project = await createProject(input, request.auth!.userId);
    response.status(201).json({ project });
  } catch (error) {
    next(error);
  }
};

export const list: RequestHandler = async (request, response, next) => {
  try {
    const projects = await listProjects(request.auth!.userId);
    response.json({ projects });
  } catch (error) {
    next(error);
  }
};

export const retrieve: RequestHandler = async (request, response, next) => {
  try {
    const projectId = getValidProjectId(request.params.projectId);
    if (!projectId) {
      response.status(400).json(invalidProjectIdResponse);
      return;
    }

    const project = await getProject(projectId, request.auth!.userId);
    if (!project) {
      response.status(404).json(projectNotFoundResponse);
      return;
    }

    response.json({ project });
  } catch (error) {
    next(error);
  }
};

export const update: RequestHandler = async (request, response, next) => {
  try {
    const projectId = getValidProjectId(request.params.projectId);
    if (!projectId) {
      response.status(400).json(invalidProjectIdResponse);
      return;
    }

    const input = validateProjectUpdate(request.body);
    if (!input) {
      response.status(400).json({ error: 'Bad Request', message: 'At least one valid project field is required.' });
      return;
    }

    const project = await updateProject(projectId, request.auth!.userId, input);
    if (!project) {
      response.status(404).json(projectNotFoundResponse);
      return;
    }

    response.json({ project });
  } catch (error) {
    next(error);
  }
};

export const chat: RequestHandler = async (request, response, next) => {
  try {
    const projectId = getValidProjectId(request.params.projectId);
    if (!projectId) {
      response.status(400).json(invalidProjectIdResponse);
      return;
    }

    const input = validateProjectChatInput(request.body);
    if (!input) {
      response.status(400).json({
        error: 'Bad Request',
        message: 'A non-empty message up to 4000 characters is required.',
      });
      return;
    }

    const result = await sendProjectChatMessage(projectId, request.auth!.userId, input.message);
    if (!result) {
      response.status(404).json(projectNotFoundResponse);
      return;
    }

    response.json(result);
  } catch (error) {
    next(error);
  }
};

function getValidProjectId(projectId: string | string[] | undefined): string | null {
  return typeof projectId === 'string' && Types.ObjectId.isValid(projectId) ? projectId : null;
}
