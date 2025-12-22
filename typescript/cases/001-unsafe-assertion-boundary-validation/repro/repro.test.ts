import test from "node:test";
import assert from "node:assert/strict";
import { loadUserUnsafe } from "./user.js";

test("unsafe cast compiles but crashes at runtime", () => {
  const badJson = JSON.stringify({ id: "u1", email: 123, isAdmin: "yes" });
  const u = loadUserUnsafe(badJson);
  assert.throws(() => u.email.toLowerCase(), /toLowerCase/);
});

test("unsafe cast silently accepts unexpected fields (drift)", () => {
  const json = JSON.stringify({
    id: "u1",
    email: "a@b.com",
    isAdmin: false,
    role: "root",          // unexpected
    permissions: ["*"],    // unexpected
  });

  const u = loadUserUnsafe(json);
  // TS thinks u has only id/email/isAdmin. Runtime object has more, silently.
  assert.equal(u.email, "a@b.com");
});
