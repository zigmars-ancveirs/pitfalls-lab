# 001 — Unsafe assertions at IO boundaries (runtime validation + strictness)

## Pitfall
Using `as T` (or trusting `any`) at IO boundaries makes TypeScript types lie at runtime.
Two common failure modes:
1) wrong types → runtime crashes
2) unexpected extra fields → silent acceptance (security/logic drift)

## Fix
- Parse as `unknown`
- Validate with a runtime schema (Zod)
- Use `.strict()` to reject unknown keys (when appropriate)
- Keep strong typing inside, but enforce contracts at ingress/egress

## Prevention
- `strict` TS config, avoid `any`
- boundary helper functions (single entrypoint for parsing)
- contract tests with real payload samples
