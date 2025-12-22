import test from "node:test";
import assert from "node:assert/strict";
import { collectBad, errorBad } from "./repro.js";

test("repro: forEach(async ...) returns too early", async () => {
  const items = [1, 2, 3, 4, 5];
  const out = await collectBad(items);
  assert.notEqual(out.length, items.length);
});

test("repro: try/catch does not catch errors from forEach(async...)", async () => {
  const res = await errorBad([1, 2, 3]);
  assert.equal(res, "ok"); // shows that errors escape the try/catch
});
