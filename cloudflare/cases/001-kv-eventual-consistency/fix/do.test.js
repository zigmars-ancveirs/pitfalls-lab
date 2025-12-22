import test from "node:test";
import assert from "node:assert/strict";
import { SimulatedDurableObject } from "./do.js";

test("Durable Object provides immediate read-after-write consistency (single object)", async () => {
  const obj = new SimulatedDurableObject();

  await obj.put("flag", "on");

  // "eu" and "us" reads both hit the same object state in this simulation
  const readEu = await obj.get("flag");
  const readUs = await obj.get("flag");

  assert.equal(readEu, "on");
  assert.equal(readUs, "on");
});
