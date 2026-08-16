# LLM Implementation TODO

This file marks the intentionally empty LLM layer for the ViewAlbum AI Support Assistant.

## Current state

- The backend receives validated chat messages.
- The backend calls a placeholder LLM service.
- The placeholder service returns a clear development response.

## What to implement later

- Choose a model provider
- Add the provider SDK
- Add your own system prompt and any persona or style instructions
- Add any structured output or response parsing you want
- Add streaming if you need it
- Add secret management for provider credentials

## Do not add here yet

- Provider-specific code
- Prompts
- Personas
- Example conversations
- Chain-of-thought logic
- Auto-CoT logic
- Hidden response shaping

Keep the application contract stable while the LLM layer stays replaceable.
