import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const apiDirectory = path.join(projectRoot, "app", "api");
const backupDirectory = path.join(projectRoot, ".github-pages-api-backup");
const nextDirectory = path.join(projectRoot, ".next");

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    env: {
      ...process.env,
      GITHUB_PAGES: "true",
      NEXT_PUBLIC_STATIC_EXPORT: "true",
    },
    shell: false,
    stdio: "inherit",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exitCode = result.status ?? 1;
    throw new Error(`${command} ${args.join(" ")} failed.`);
  }
}

function moveApiRoutesOutOfStaticBuild() {
  if (!fs.existsSync(apiDirectory)) {
    return false;
  }

  fs.rmSync(backupDirectory, { force: true, recursive: true });
  fs.renameSync(apiDirectory, backupDirectory);
  return true;
}

function restoreApiRoutes(wasMoved) {
  if (!wasMoved) {
    return;
  }

  fs.renameSync(backupDirectory, apiDirectory);
}

const wasMoved = moveApiRoutesOutOfStaticBuild();

try {
  fs.rmSync(nextDirectory, { force: true, recursive: true });
  run("node", ["scripts/generate-seo-files.mjs"]);
  run("npx", ["next", "build"]);
} finally {
  restoreApiRoutes(wasMoved);
  fs.rmSync(nextDirectory, { force: true, recursive: true });
}
