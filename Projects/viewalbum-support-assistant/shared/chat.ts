import { z } from "zod";

export const chatRoleSchema = z.enum(["user", "assistant", "system"]);
export type ChatRole = z.infer<typeof chatRoleSchema>;

export const chatMessageInputSchema = z.object({
  role: chatRoleSchema,
  content: z.string().trim().min(1, "Message content is required.").max(4000)
});
export type ChatMessageInput = z.infer<typeof chatMessageInputSchema>;

export const chatRequestSchema = z
  .object({
    messages: z.array(chatMessageInputSchema).min(1, "At least one message is required.").max(50)
  })
  .superRefine((value, context) => {
    const lastMessage = value.messages[value.messages.length - 1];

    if (!lastMessage || lastMessage.role !== "user") {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The latest message must be from the user.",
        path: ["messages"]
      });
    }
  });
export type ChatRequest = z.infer<typeof chatRequestSchema>;

export const chatMessageSchema = z.object({
  id: z.string().min(1),
  role: chatRoleSchema,
  content: z.string().min(1),
  createdAt: z.string().datetime()
});
export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const assistantReplySchema = chatMessageSchema.extend({
  role: z.literal("assistant"),
  service: z.literal("empty-llm"),
  isDevelopmentPlaceholder: z.literal(true)
});
export type AssistantReply = z.infer<typeof assistantReplySchema>;

export const chatResponseSchema = z.object({
  reply: assistantReplySchema
});
export type ChatResponse = z.infer<typeof chatResponseSchema>;

export const apiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional()
  })
});
export type ApiErrorResponse = z.infer<typeof apiErrorSchema>;
