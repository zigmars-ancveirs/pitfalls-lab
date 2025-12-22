import { z } from "zod";

export const UserSchema = z
  .object({
    id: z.string().min(1),
    email: z.string().email(),
    isAdmin: z.boolean()
  })
  .strict();

export type User = z.infer<typeof UserSchema>;

export function loadUserSafe(json: string): User {
  const parsed: unknown = JSON.parse(json);
  return UserSchema.parse(parsed);
}
