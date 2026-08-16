import type { NextFunction, Request, Response } from "express";

export function notFoundHandler(_request: Request, response: Response, _next: NextFunction) {
  response.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "The requested route does not exist."
    }
  });
}
