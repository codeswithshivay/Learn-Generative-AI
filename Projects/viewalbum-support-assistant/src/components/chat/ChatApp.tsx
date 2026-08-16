"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { ChatMessage } from "@shared/chat";

import { ChatApiError, postChat } from "@/lib/chat-api";
import { createChatMessage, toConversationPayload } from "@/lib/chat-session";

import { ChatComposer } from "./ChatComposer";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";

const introMessage = {
  id: "intro_viewalbum_assistant",
  role: "assistant",
  content:
    "The ViewAlbum support panel is ready. Ask a question when you want to see the application layer in action.",
  createdAt: "2026-08-15T00:00:00.000Z"
} as const;

export function ChatApp() {
  const [messages, setMessages] = useState<Array<ChatMessage & { isDevelopmentPlaceholder?: boolean }>>([
    introMessage
  ]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  const statusLabel = useMemo(() => {
    return isSending ? "Backend request in flight" : "Backend connected";
  }, [isSending]);

  async function handleSend() {
    const content = draft.trim();

    if (!content || isSending) {
      return;
    }

    const userMessage = createChatMessage("user", content);
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setDraft("");
    setIsSending(true);
    setErrorMessage(null);

    try {
      const response = await postChat(toConversationPayload(nextMessages));
      setMessages((current) => [...current, response.reply]);
    } catch (error) {
      if (error instanceof ChatApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("The chat request failed unexpectedly.");
      }
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <ChatHeader
          connectionLabel={statusLabel}
          environmentNote="Empty LLM service active"
        />

        <div className="hero-grid">
          <section className="panel panel--conversation">
            <div className="panel__surface">
              <div className="panel__header">
                <div>
                  <p className="panel__kicker">Conversation</p>
                  <h2>Frontend chat surface</h2>
                </div>
                <div className="panel__pill">POST /api/chat</div>
              </div>

              <ChatMessageList messages={messages} />
              <div ref={bottomRef} />

              {errorMessage ? (
                <div className="error-banner" role="alert">
                  {errorMessage}
                </div>
              ) : null}

              <ChatComposer
                value={draft}
                onChange={setDraft}
                onSubmit={handleSend}
                disabled={isSending}
              />
            </div>
          </section>

          <aside className="panel panel--notes">
            <div className="panel__surface panel__surface--notes">
              <p className="panel__kicker">Boundary</p>
              <h2>Application layer only</h2>
              <ul className="notes-list">
                <li>Validated chat payloads</li>
                <li>Typed frontend API client</li>
                <li>Express CORS and error handling</li>
                <li>Clear development placeholder from the empty service</li>
              </ul>
              <div className="notes-callout">
                The model provider layer is intentionally absent. That contract is documented and
                isolated for later work.
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
