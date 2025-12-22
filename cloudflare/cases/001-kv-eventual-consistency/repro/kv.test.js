import test from "node:test";
import assert from "node:assert/strict";
import { SimulatedKV } from "./kv.js";

test("KV can return stale reads across regions right after a write", async () => {
  const kv = new SimulatedKV(300);

  // Ensure both regions exist
  await kv.get("eu", "flag");
  await kv.get("us", "flag");

  await kv.put("eu", "flag", "on");

  // Immediately read from another region: can be stale
  const readUs = await kv.get("us", "flag");
  assert.equal(readUs, null); // demonstrates eventual consistency
});
