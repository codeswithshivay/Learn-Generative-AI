import { Router } from "express";

import { chatRequestSchema } from "../../../shared/chat";
import { generateAssistantReply } from "../services/llmService";

export function createChatRouter() {
  const router = Router();

  router.post("/chat", async (request, response, next) => {
    try {
      const parsed = chatRequestSchema.safeParse(request.body);

      if (!parsed.success) {
        response.status(400).json({
          error: {
            code: "VALIDATION_ERROR",
            message: "The chat request is invalid.",
            details: parsed.error.flatten()
          }
        });
        return;
      }

      const reply = await generateAssistantReply(parsed.data.messages);
      response.status(200).json({ reply });
    } catch (error) {
      next(error);
    }
  });

  return router;
}
