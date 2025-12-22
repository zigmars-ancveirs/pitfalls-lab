import test from "node:test";
import assert from "node:assert/strict";
import { collectBad } from "./repro.js";

test("forEach(async ...) returns too early", async () => {
  const items = [1, 2, 3, 4, 5];
  const out = await collectBad(items);
  assert.notEqual(out.length, items.length);
});
