import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";

process.env.NODE_ENV = "test";
process.env.PORT = "0";
process.env.CORS_ORIGIN = "http://localhost:3000";

describe("POST /api/chat", () => {
  type CreateApp = (typeof import("../backend/src/app"))["createApp"];

  let app: ReturnType<CreateApp>;
  let server: Server | undefined;
  let baseUrl = "";

  before(async () => {
    const { createApp } = await import("../backend/src/app");
    app = createApp();
    server = app.listen(0);
    const activeServer = server;
    await new Promise<void>((resolve) => activeServer.once("listening", resolve));
    const address = activeServer.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  after(async () => {
    if (!server) {
      return;
    }

    const activeServer = server;
    await new Promise<void>((resolve, reject) => {
      activeServer.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  });

  it("returns the development placeholder reply for a valid chat request", async () => {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "How do I update an album cover?"
          }
        ]
      })
    });

    assert.equal(response.status, 200);

    const payload = (await response.json()) as {
      reply: {
        id: string;
        role: string;
        content: string;
        createdAt: string;
        service: string;
        isDevelopmentPlaceholder: boolean;
      };
    };

    assert.equal(payload.reply.role, "assistant");
    assert.equal(payload.reply.service, "empty-llm");
    assert.equal(payload.reply.isDevelopmentPlaceholder, true);
    assert.match(payload.reply.content, /development placeholder/i);
    assert.ok(payload.reply.id.length > 0);
    assert.ok(!Number.isNaN(Date.parse(payload.reply.createdAt)));
  });

  it("rejects an invalid chat request with a validation error", async () => {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: []
      })
    });

    assert.equal(response.status, 400);

    const payload = (await response.json()) as {
      error: {
        code: string;
        message: string;
        details: unknown;
      };
    };

    assert.equal(payload.error.code, "VALIDATION_ERROR");
    assert.match(payload.error.message, /invalid/i);
    assert.ok(payload.error.details);
  });
});
