import cors from "cors";
import express from "express";

import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFound";
import { createChatRouter } from "./routes/chatRoute";

function createCorsMiddleware() {
  const allowedOrigins = new Set(env.corsOrigins);

  return cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has("*") || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS origin not allowed: ${origin}`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
  });
}

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(createCorsMiddleware());
  app.use(express.json({ limit: "32kb" }));

  app.get("/health", (_request, response) => {
    response.status(200).json({
      status: "ok",
      service: "viewalbum-backend",
      emptyLlm: true
    });
  });

  app.use("/api", createChatRouter());
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
