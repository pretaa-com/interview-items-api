/**
 * Performance and memory evaluation script for sameStructureAs.
 * Run with: npm run benchmark (from backend) or npx tsx scripts/benchmark-sameStructureAs.ts
 *
 * For more stable memory readings, run with: node --expose-gc node_modules/.bin/tsx scripts/benchmark-sameStructureAs.ts
 */
import { sameStructureAs } from "../src/sameStructureAs.js";

function mb(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(2);
}

function run(
  name: string,
  a: unknown[],
  b: unknown[],
  iterations: number = 100
): void {
  const gc = (globalThis as { gc?: () => void }).gc;
  if (gc) gc();

  const memBefore = process.memoryUsage();
  sameStructureAs(a, b); // warm-up

  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    sameStructureAs(a, b);
  }
  const elapsed = performance.now() - start;
  const memAfter = process.memoryUsage();

  const perCall = elapsed / iterations;
  const result = sameStructureAs(a, b);
  const heapDelta = memAfter.heapUsed - memBefore.heapUsed;
  const rssDelta = memAfter.rss - memBefore.rss;

  console.log(
    `${name}: ${elapsed.toFixed(2)}ms total (${iterations} runs), ${perCall.toFixed(3)}ms/call, result=${result}`
  );
  console.log(
    `  memory: heap ${mb(memBefore.heapUsed)} → ${mb(memAfter.heapUsed)} MB (Δ ${heapDelta >= 0 ? "+" : ""}${mb(heapDelta)} MB), RSS Δ ${rssDelta >= 0 ? "+" : ""}${mb(rssDelta)} MB`
  );
  console.log("");
}

console.log("sameStructureAs benchmark\n");

// Small: flat array, 100 elements
const smallFlatA = Array.from({ length: 100 }, (_, i) => i);
const smallFlatB = Array.from({ length: 100 }, (_, i) => i + 1);
run("Small flat (100 elts)", smallFlatA, smallFlatB, 1000);

// Medium: flat array, 5k elements
const mediumFlatA = Array.from({ length: 5_000 }, (_, i) => i);
const mediumFlatB = Array.from({ length: 5_000 }, (_, i) => i + 1);
run("Medium flat (5k elts)", mediumFlatA, mediumFlatB, 100);

// Large: flat array, 20k elements
const largeFlatA = Array.from({ length: 20_000 }, (_, i) => i);
const largeFlatB = Array.from({ length: 20_000 }, (_, i) => i + 1);
run("Large flat (20k elts)", largeFlatA, largeFlatB, 50);

// Deep: chain of depth 50
let deepA: unknown[] = [1];
let deepB: unknown[] = [2];
for (let d = 0; d < 50; d++) {
  deepA = [deepA];
  deepB = [deepB];
}
run("Deep chain (depth 50)", deepA, deepB, 500);

// Wide: 50×50 matrix
const row = Array.from({ length: 50 }, (_, i) => i);
const wideA = Array.from({ length: 50 }, () => [...row]);
const wideB = Array.from({ length: 50 }, () => [...row]);
run("Wide nested (50×50)", wideA, wideB, 200);

// Mismatch early: same structure except last element is array vs number (short-circuit)
const mismatchEarlyA = [...Array.from({ length: 1000 }, (_, i) => i), 1];
const mismatchEarlyB = [...Array.from({ length: 1000 }, (_, i) => i + 1), [2, 3]];
run("Mismatch at end (1k+1 elts)", mismatchEarlyA, mismatchEarlyB, 500);

console.log("\nDone.");
