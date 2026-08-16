# ViewAlbum AI Support Assistant

This repository contains the application layer for the ViewAlbum AI Support Assistant.

## What is included

- Next.js frontend with a responsive chat UI
- Express.js backend with `POST /api/chat`
- Shared chat request/response types
- Runtime validation with `zod`
- CORS and API error handling
- Environment configuration
- An intentionally empty LLM service that returns a development placeholder

## What is not included

- No OpenAI, Gemini, Anthropic, Ollama, or other provider integration
- No model SDK
- No prompts
- No personas
- No chain-of-thought or auto-CoT logic
- No response parsing layer for a model provider

## Setup

1. Install dependencies.

```bash
npm install
```

2. Create your environment file.

```bash
copy .env.example .env
```

3. Start both apps.

```bash
npm run dev
```

4. Run the chat API contract tests.

```bash
npm test
```

## URLs

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

## API contract

### `POST /api/chat`

Request body:

```json
{
  "messages": [
    { "role": "user", "content": "Hello" }
  ]
}
```

Response body:

```json
{
  "reply": {
    "id": "msg_...",
    "role": "assistant",
    "content": "Development placeholder...",
    "createdAt": "2026-08-15T00:00:00.000Z",
    "service": "empty-llm",
    "isDevelopmentPlaceholder": true
  }
}
```

## LLM boundary

The empty LLM service is documented in [`LLM_IMPLEMENTATION_TODO.md`](./LLM_IMPLEMENTATION_TODO.md). The backend is intentionally wired to stop at a placeholder response until you implement the actual model layer.
