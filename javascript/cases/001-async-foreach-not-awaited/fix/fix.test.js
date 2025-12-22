import test from "node:test";
import assert from "node:assert/strict";
import { collectGoodParallel, collectGoodSequential } from "./fix.js";

test("Promise.all version waits for all work", async () => {
  const items = [1, 2, 3, 4, 5];
  const out = await collectGoodParallel(items);
  assert.equal(out.length, items.length);
});

test("for...of version waits and preserves order", async () => {
  const items = [1, 2, 3, 4, 5];
  const out = await collectGoodSequential(items);
  assert.deepEqual(out, items);
});
