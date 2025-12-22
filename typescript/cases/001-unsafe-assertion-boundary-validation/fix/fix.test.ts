import test from "node:test";
import assert from "node:assert/strict";
import { loadUserSafe, tryLoadUser } from "./user.js";

test("validated parse rejects invalid payloads", () => {
  const badJson = JSON.stringify({ id: "u1", email: 123, isAdmin: "yes" });
  assert.throws(() => loadUserSafe(badJson));
});

test("strict schema rejects unexpected keys (prevents drift)", () => {
  const drift = JSON.stringify({
    id: "u1",
    email: "a@b.com",
    isAdmin: false,
    role: "root",
  });
  assert.throws(() => loadUserSafe(drift));
});

test("safeParse wrapper returns structured error", () => {
  const badJson = JSON.stringify({ id: "", email: "nope", isAdmin: false });
  const res = tryLoadUser(badJson);
  assert.equal(res.ok, false);
});
