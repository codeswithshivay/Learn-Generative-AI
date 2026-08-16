import { spawn } from "node:child_process";
import { join } from "node:path";

const tsxCli = join(process.cwd(), "node_modules", "tsx", "dist", "cli.mjs");

const child = spawn(process.execPath, [tsxCli, "watch", "backend/src/index.ts"], {
  stdio: "inherit",
  shell: false
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.exitCode = 1;
    return;
  }

  process.exitCode = code ?? 1;
});

child.on("error", (error) => {
  console.error("[backend] failed to start", error);
  process.exitCode = 1;
});

process.on("SIGINT", () => {
  if (!child.killed) {
    child.kill();
  }
});

process.on("SIGTERM", () => {
  if (!child.killed) {
    child.kill();
  }
});
