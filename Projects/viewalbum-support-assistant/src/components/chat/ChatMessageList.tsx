import type { ChatMessage } from "@shared/chat";

import { ChatMessageBubble } from "./ChatMessageBubble";

type ChatMessageListProps = {
  messages: Array<ChatMessage & { isDevelopmentPlaceholder?: boolean }>;
};

export function ChatMessageList({ messages }: ChatMessageListProps) {
  return (
    <div className="message-list" aria-live="polite" aria-relevant="additions text">
      {messages.map((message) => (
        <ChatMessageBubble
          key={message.id}
          message={message}
          isPlaceholder={message.role === "assistant" && message.isDevelopmentPlaceholder === true}
        />
      ))}
    </div>
  );
}
