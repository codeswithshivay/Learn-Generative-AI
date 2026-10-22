import { FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApiError } from '../api/client';
import { projectsApi, type Project, type ProjectChatMessage } from '../api/projects';

const maxMessageLength = 4000;

export function ProjectChatPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [messages, setMessages] = useState<ProjectChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setError('A valid project is required.');
      setIsLoadingProject(false);
      return;
    }

    let isCurrent = true;
    projectsApi.get(projectId).then(({ project: loadedProject }) => {
      if (isCurrent) setProject(loadedProject);
    }).catch((requestError: unknown) => {
      if (!isCurrent) return;
      setError(getRequestErrorMessage(requestError, 'Project could not be loaded.'));
    }).finally(() => {
      if (isCurrent) setIsLoadingProject(false);
    });

    return () => { isCurrent = false; };
  }, [projectId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = input.trim();
    if (!projectId || !message || isSending) return;

    setMessages((current) => [...current, { role: 'user', content: message }]);
    setInput('');
    setError(null);
    setIsSending(true);

    try {
      const response = await projectsApi.chat(projectId, message);
      setMessages((current) => [...current, { role: 'assistant', content: response.message }]);
    } catch (requestError: unknown) {
      setError(getRequestErrorMessage(requestError, 'Your message could not be sent.'));
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  if (isLoadingProject) {
    return <div className="panel status-panel" role="status">Loading project chat…</div>;
  }

  if (error && !project) {
    return (
      <section className="page-section narrow-section" aria-labelledby="chat-error-title">
        <div className="panel status-panel error-state" role="alert">
          <h1 id="chat-error-title">Project chat is unavailable</h1>
          <p>{error}</p>
          <Link className="button button-secondary" to="/projects">Back to projects</Link>
        </div>
      </section>
    );
  }

  if (!project) return null;

  return (
    <section className="page-section chat-page" aria-labelledby="chat-title">
      <div className="chat-header">
        <div>
          <Link className="back-link" to="/projects">← Back to projects</Link>
          <p className="eyebrow">Project chat</p>
          <h1 id="chat-title">{project.name}</h1>
          <p className="page-description">Ask questions about this project when AI integration is available.</p>
        </div>
      </div>

      <div className="panel chat-shell">
        <div className="chat-history" aria-live="polite" aria-label="Chat messages">
          {messages.length === 0 && !isSending && (
            <div className="chat-empty-state">
              <h2>Start a conversation</h2>
              <p>Send a message to establish the project chat connection.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div className={`chat-message chat-message-${message.role}`} key={`${message.role}-${index}`}>
              <span className="chat-message-label">{message.role === 'user' ? 'You' : 'Assistant'}</span>
              <p>{message.content}</p>
            </div>
          ))}
          {isSending && <div className="chat-pending" role="status">Sending message…</div>}
        </div>

        {error && <div className="form-notice error-state" role="alert">{error}</div>}

        <form className="chat-composer" onSubmit={handleSubmit}>
          <label htmlFor="chat-message">Message</label>
          <textarea
            id="chat-message"
            value={input}
            maxLength={maxMessageLength}
            placeholder="Ask a question about this project…"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSending}
            rows={3}
          />
          <div className="chat-composer-footer">
            <span className="field-help">Press Enter to send, or Shift + Enter for a new line.</span>
            <button className="button button-primary" type="submit" disabled={isSending || !input.trim()}>
              {isSending ? 'Sending…' : 'Send message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function getRequestErrorMessage(requestError: unknown, fallback: string): string {
  if (requestError instanceof ApiError) {
    if (requestError.status === 401) return 'Your session has expired. Please sign in again.';
    if (requestError.status === 404) return 'This project could not be found or is not available to your account.';
    return requestError.message;
  }
  return requestError instanceof Error ? requestError.message : fallback;
}
