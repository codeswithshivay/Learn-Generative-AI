import type { ChatMessage } from "@shared/chat";

type ChatMessageBubbleProps = {
  message: ChatMessage;
  isPlaceholder?: boolean;
};

function formatTime(timestamp: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(timestamp));
}

export function ChatMessageBubble({ message, isPlaceholder = false }: ChatMessageBubbleProps) {
  const isAssistant = message.role === "assistant";

  return (
    <article className={`message-bubble ${isAssistant ? "message-bubble--assistant" : "message-bubble--user"}`}>
      <div className="message-bubble__topline">
        <span className="message-bubble__role">
          {isAssistant ? "ViewAlbum Assistant" : "You"}
        </span>
        <time className="message-bubble__time" dateTime={message.createdAt}>
          {formatTime(message.createdAt)}
        </time>
      </div>

      <p className="message-bubble__content">{message.content}</p>

      {isPlaceholder ? (
        <p className="message-bubble__badge">Empty LLM service response</p>
      ) : null}
    </article>
  );
}
