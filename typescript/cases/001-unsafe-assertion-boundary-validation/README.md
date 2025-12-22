# 001 — Unsafe type assertions at IO boundaries (types lie at runtime)

## Pitfall
Using `as SomeType` (or trusting `any`) on untrusted input (JSON, API responses, env, user data).
TypeScript only checks types at compile time. At runtime, the data can be wrong → crashes or logic bugs.

## Symptoms
- “Works in TS”, crashes in production (e.g., `x.toLowerCase is not a function`)
- Security or logic issues when fields are missing/malformed
- Hard-to-debug bugs because types look “correct”

## Root cause
TypeScript does not validate runtime values. `JSON.parse` returns `any`.
`as T` is a blind cast, not a conversion/validation.

## Fix (pattern)
- Use runtime validation at the boundary (e.g., Zod)
- Keep strict typing inside the system, but validate inputs at ingress
- Prefer `unknown` over `any` for untrusted data

## Prevention
- ESLint: ban/limit `any` and unsafe assertions at boundaries
- Wrapper functions for IO parsing/validation
- Contract tests for API clients (sample payloads)
