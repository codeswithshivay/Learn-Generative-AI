type ChatHeaderProps = {
  connectionLabel: string;
  environmentNote: string;
};

export function ChatHeader({ connectionLabel, environmentNote }: ChatHeaderProps) {
  return (
    <header className="chat-header">
      <div className="chat-header-copy">
        <p className="eyebrow">ViewAlbum AI Support Assistant</p>
        <h1>Support chat with a live application layer and an intentionally empty LLM boundary.</h1>
        <p className="chat-header-description">
          The frontend and backend are wired together. The response you receive is a deliberate
          development placeholder until you implement the model provider layer yourself.
        </p>
      </div>

      <div className="chat-header-meta" aria-label="Application status">
        <div className="status-chip status-chip--primary">{connectionLabel}</div>
        <div className="status-chip">{environmentNote}</div>
      </div>
    </header>
  );
}
