import { Router } from 'express';
import { create, list, retrieve, update } from '../controllers/project.controller.js';
import { requireAuth } from '../middleware/require-auth.js';

export const projectsRouter = Router();

projectsRouter.use(requireAuth);
projectsRouter.post('/', create);
projectsRouter.get('/', list);
projectsRouter.get('/:projectId', retrieve);
projectsRouter.patch('/:projectId', update);
