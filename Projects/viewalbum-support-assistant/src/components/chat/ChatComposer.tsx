type ChatComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export function ChatComposer({ value, onChange, onSubmit, disabled = false }: ChatComposerProps) {
  return (
    <form
      className="composer"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label className="composer__label" htmlFor="chat-message">
        Message
      </label>
      <textarea
        id="chat-message"
        className="composer__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSubmit();
          }
        }}
        placeholder="Type a support question"
        rows={3}
        disabled={disabled}
      />

      <div className="composer__footer">
        <p className="composer__hint">Enter sends. Shift+Enter adds a new line.</p>
        <button className="composer__button" type="submit" disabled={disabled || value.trim().length === 0}>
          {disabled ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
