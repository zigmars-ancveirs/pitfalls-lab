import { z } from "zod";

export const UserSchema = z
  .object({
    id: z.string().min(1),
    email: z.string().email(),
    isAdmin: z.boolean(),
  })
  .strict(); // reject unknown keys

export type User = z.infer<typeof UserSchema>;

export function loadUserSafe(json: string): User {
  const parsed: unknown = JSON.parse(json);
  return UserSchema.parse(parsed);
}

// Optional: non-throwing boundary helper (nice for APIs)
export function tryLoadUser(json: string):
  | { ok: true; value: User }
  | { ok: false; error: string } {
  const parsed: unknown = JSON.parse(json);
  const res = UserSchema.safeParse(parsed);
  return res.success
    ? { ok: true, value: res.data }
    : { ok: false, error: res.error.issues.map(i => i.message).join("; ") };
}
