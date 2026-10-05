# Developer Codebase Assistant

The Developer Codebase Assistant will eventually help developers understand and modify their codebases. Milestone 1 establishes the frontend and backend foundation only; product and AI capabilities will be added incrementally in later milestones.

## Technology stack

- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express, TypeScript
- Database: MongoDB (planned for Milestone 2)

## Repository structure

```text
frontend/   React + TypeScript + Vite application
backend/    Express + TypeScript application
```

The backend keeps HTTP concerns, application services, and future AI code in separate locations. `backend/src/ai/` is an intentional architectural boundary and currently contains documentation only.

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer

## Installation

Install dependencies independently:

```bash
cd frontend
npm install

cd ../backend
npm install
```

Copy `.env.example` to `.env` in the repository root when local environment configuration is needed. The backend currently uses only `PORT`; no database, model, or secret configuration is required in this milestone.

## Development

In one terminal:

```bash
cd frontend
npm run dev
```

The Vite development server runs at `http://localhost:5173` by default.

In another terminal:

```bash
cd backend
npm run dev
```

The API runs at `http://localhost:3000` by default. Verify it with:

```bash
curl http://localhost:3000/api/health
```

Expected response:

```json
{"status":"ok","service":"developer-codebase-assistant-api"}
```

## Verification scripts

```bash
cd frontend
npm run typecheck
npm run build

cd ../backend
npm run typecheck
npm run build
```

## Scope boundary

MongoDB integration, authentication, project management, codebase ingestion, retrieval, RAG, model providers, agents, code modifications, and verification workflows are intentionally not implemented. Future backend application services should depend on an explicit AI-module contract, while controllers remain responsible only for HTTP concerns; no AI service is called by the running application in this milestone.

