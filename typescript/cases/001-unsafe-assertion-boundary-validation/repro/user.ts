export type User = {
  id: string;
  email: string;     // must be string
  isAdmin: boolean;  // must be boolean
};

// PITFALL: JSON.parse returns any; `as User` does not validate anything.
export function loadUserUnsafe(json: string): User {
  return JSON.parse(json) as User;
}
