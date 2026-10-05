# AI Engineering boundary

This directory is reserved for the AI Engineering layer, which will be implemented in a later milestone by the project owner.

It intentionally contains no model-provider integrations, prompts, embeddings, document processing, retrieval, agents, codebase indexing, file modification, or verification workflows.

## Intended integration boundary

Future ordinary backend services should communicate with this module through explicit application-level contracts. HTTP controllers should continue to handle request and response concerns and delegate operations to services; they should not call model providers directly or contain AI workflow logic.

No AI module is imported or called by the running application in Milestone 1.

