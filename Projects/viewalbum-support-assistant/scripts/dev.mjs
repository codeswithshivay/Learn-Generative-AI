import { spawn } from "node:child_process";
import { join } from "node:path";

const commands = [
  {
    name: "backend",
    command: process.execPath,
    args: [join(process.cwd(), "node_modules", "tsx", "dist", "cli.mjs"), "watch", "backend/src/index.ts"]
  },
  {
    name: "frontend",
    command: process.execPath,
    args: [join(process.cwd(), "node_modules", "next", "dist", "bin", "next"), "dev"]
  }
];

const children = commands.map(({ command, args, name }) => {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: false
  });

  child.on("exit", (code, signal) => {
    if (signal || code !== 0) {
      for (const other of children) {
        if (other !== child && !other.killed) {
          other.kill();
        }
      }
      process.exitCode = code ?? 1;
    }
  });

  child.on("error", (error) => {
    console.error(`[${name}] failed to start`, error);
    process.exitCode = 1;
  });

  return child;
});

const shutdown = () => {
  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
