import type { ErrorRequestHandler, RequestHandler } from 'express';

export const notFoundHandler: RequestHandler = (request, response) => {
  response.status(404).json({
    error: 'Not Found',
    message: `Route ${request.method} ${request.path} does not exist.`,
  });
};

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('Unhandled application error.', error);

  response.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred.',
  });
};
