import type { AssistantReply, ChatMessageInput } from "../../../shared/chat";

function createMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Intentionally empty LLM boundary.
 *
 * Replace this file when you are ready to implement the actual model/provider layer.
 * Do not add provider SDK calls, prompt text, personas, or response parsing here.
 */
export async function generateAssistantReply(
  _messages: ChatMessageInput[]
): Promise<AssistantReply> {
  return {
    id: createMessageId(),
    role: "assistant",
    content:
      "Development placeholder: the ViewAlbum LLM service is intentionally empty, so no model provider has been connected yet.",
    createdAt: new Date().toISOString(),
    service: "empty-llm",
    isDevelopmentPlaceholder: true
  };
}
