import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE = "Your 6 AM Saturday alarm doesn't wake you — it just notifies your dreams their lease is up.";

function ensureDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
}

function writeEntryFile(outputDir: string): string {
  const outputPath = join(outputDir, "entry.txt");
  writeFileSync(outputPath, ENTRY_LINE, "utf8");
  return outputPath;
}

function verifyAndReport(outputPath: string): void {
  const written = readFileSync(outputPath, "utf8");
  if (written !== ENTRY_LINE) {
    console.error("Verification failed: content mismatch");
    process.exit(1);
  }
  console.error(`Character count: ${ENTRY_LINE.length}`);
  console.error(`Verified: ${outputPath}`);
}

function run(outputDir: string): void {
  ensureDir(outputDir);
  const outputPath = writeEntryFile(outputDir);
  verifyAndReport(outputPath);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
run(outputDir);