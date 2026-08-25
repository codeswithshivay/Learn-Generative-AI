import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const nextBin = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const buildIdPath = join(process.cwd(), ".next", "BUILD_ID");

function run(commandArgs) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, commandArgs, {
      stdio: "inherit",
      shell: false
    });

    child.on("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`Process terminated by signal ${signal}`));
        return;
      }

      if ((code ?? 1) !== 0) {
        reject(new Error(`Process exited with code ${code ?? 1}`));
        return;
      }

      resolve(void 0);
    });

    child.on("error", reject);
  });
}

async function main() {
  if (!existsSync(buildIdPath)) {
    await run([nextBin, "build"]);
  }

  const startChild = spawn(process.execPath, [nextBin, "start"], {
    stdio: "inherit",
    shell: false
  });

  startChild.on("exit", (code, signal) => {
    if (signal) {
      process.exitCode = 1;
      return;
    }

    process.exitCode = code ?? 1;
  });

  startChild.on("error", (error) => {
    console.error("[frontend] failed to start", error);
    process.exitCode = 1;
  });

  process.on("SIGINT", () => {
    if (!startChild.killed) {
      startChild.kill();
    }
  });

  process.on("SIGTERM", () => {
    if (!startChild.killed) {
      startChild.kill();
    }
  });
}

main().catch((error) => {
  console.error("[frontend] failed", error);
  process.exitCode = 1;
});
