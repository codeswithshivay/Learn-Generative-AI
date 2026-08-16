import type { NextFunction, Request, Response } from "express";

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  if (response.headersSent) {
    return;
  }

  if (error instanceof SyntaxError && "body" in error) {
    response.status(400).json({
      error: {
        code: "INVALID_JSON",
        message: "The request body must be valid JSON."
      }
    });
    return;
  }

  if (error instanceof Error && error.message.startsWith("CORS origin not allowed")) {
    response.status(403).json({
      error: {
        code: "CORS_ORIGIN_DENIED",
        message: "The request origin is not allowed by the backend CORS configuration."
      }
    });
    return;
  }

  const message = error instanceof Error ? error.message : "An unexpected server error occurred.";

  response.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message
    }
  });
}
