import test from "node:test";
import assert from "node:assert/strict";
import { loadUserUnsafe } from "./user.js";

test("unsafe cast compiles but crashes at runtime", () => {
  // email is a number -> TS won't catch because we cast.
  const badJson = JSON.stringify({ id: "u1", email: 123, isAdmin: "yes" });

  const u = loadUserUnsafe(badJson);

  // Runtime crash: toLowerCase doesn't exist on number.
  assert.throws(() => u.email.toLowerCase(), /toLowerCase/);
});
