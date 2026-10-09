import type { ErrorRequestHandler, RequestHandler } from 'express';

export const notFoundHandler: RequestHandler = (request, response) => {
  response.status(404).json({
    error: 'Not Found',
    message: `Route ${request.method} ${request.path} does not exist.`,
  });
};

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error?.code === 11000) {
    response.status(409).json({ error: 'Conflict', message: 'An account with that email already exists.' });
    return;
  }

  console.error('Unhandled application error.', error);

  response.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred.',
  });
};
