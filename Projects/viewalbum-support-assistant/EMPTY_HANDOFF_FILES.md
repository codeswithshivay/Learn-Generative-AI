# Empty Handoff Files

This project keeps the model-provider boundary intentionally empty so the application layer can run without any LLM integration.

## Files you are expected to fill later

| File | Purpose |
| --- | --- |
| [`backend/src/services/llmService.ts`](./backend/src/services/llmService.ts) | Intentionally empty LLM service boundary. Replace this with your own model/provider implementation later. |

## Related guidance

| File | Purpose |
| --- | --- |
| [`LLM_IMPLEMENTATION_TODO.md`](./LLM_IMPLEMENTATION_TODO.md) | Checklist and guardrails for the future LLM layer. This file is not empty, but it explains what belongs behind the boundary. |

Keep the rest of the application layer intact while you fill in the service above.
