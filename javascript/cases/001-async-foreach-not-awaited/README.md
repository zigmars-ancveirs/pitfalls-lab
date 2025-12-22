# 001 — `forEach(async ...)` is not awaited (plus order + errors + concurrency)

## Pitfall
`array.forEach(async () => ...)` does not await the async callbacks.
This causes:
- the parent function to return early
- errors to escape your try/catch
- nondeterministic ordering when you push into shared arrays
- accidental unlimited parallelism (stampede)

## Symptoms
- partial/empty results
- flaky tests
- unhandled promise rejections
- downstream rate limits / bursts

## Root cause
`forEach` ignores returned Promises. Awaiting inside the callback does not make the outer scope wait.

## Fix patterns
- Parallel (bounded): `map` + `Promise.all` (+ concurrency limit)
- Sequential: `for...of` + `await`
- Deterministic order: return values from `map`, don’t `push`
- Cancellation: pass `AbortSignal` / check it between awaits

## Prevention
- Code review rule: "no forEach(async...)"
- ESLint: ban `forEach` with async callback (custom rule) or enforce `no-floating-promises` in TS projects
- Load tests: verify no stampede (limit concurrency)
