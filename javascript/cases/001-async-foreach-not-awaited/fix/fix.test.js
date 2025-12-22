import test from "node:test";
import assert from "node:assert/strict";
import { collectGoodParallelOrdered, collectGoodSequential, mapAsyncBounded } from "./fix.js";

test("fix: bounded parallel map preserves order and awaits", async () => {
  const items = [1, 2, 3, 4, 5];
  const out = await collectGoodParallelOrdered(items, { concurrency: 2 });
  assert.deepEqual(out, items);
});

test("fix: sequential version preserves order and awaits", async () => {
  const items = [1, 2, 3, 4, 5];
  const out = await collectGoodSequential(items);
  assert.deepEqual(out, items);
});

test("fix: concurrency limit prevents stampede (max active <= limit)", async () => {
  const items = Array.from({ length: 20 }, (_, i) => i);
  let active = 0;
  let peak = 0;

  await mapAsyncBounded(
    items,
    async () => {
      active++;
      peak = Math.max(peak, active);
      await new Promise((r) => setTimeout(r, 15));
      active--;
      return 1;
    },
    { concurrency: 3 }
  );

  assert.ok(peak <= 3, `expected peak<=3, got peak=${peak}`);
});
