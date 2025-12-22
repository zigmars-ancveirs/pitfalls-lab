import test from "node:test";
import assert from "node:assert/strict";
import { loadUserSafe } from "./user.js";

test("validated parse rejects invalid payloads", () => {
  const badJson = JSON.stringify({ id: "u1", email: 123, isAdmin: "yes" });
  assert.throws(() => loadUserSafe(badJson));
});

test("validated parse accepts correct payloads", () => {
  const okJson = JSON.stringify({ id: "u1", email: "a@b.com", isAdmin: false });
  const u = loadUserSafe(okJson);
  assert.equal(u.email, "a@b.com");
  assert.equal(u.isAdmin, false);
});
