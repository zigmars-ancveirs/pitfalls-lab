# 001 — `forEach(async ...)` is not awaited (silent concurrency bug)

## Pitfall
Using `array.forEach(async (x) => ...)` and assuming it awaits.
`forEach` does not wait for promises → code continues early, results are incomplete, errors can be unhandled.

## Symptoms
- Function returns before work is done
- Empty/partial results
- Flaky tests
- Unhandled promise rejections

## Root cause
`forEach` ignores returned promises. Awaiting inside the callback does not make the outer function wait.

## Fix (patterns)
- `await Promise.all(items.map(async ...))` for parallel work
- `for...of` + `await` for sequential work

## Prevention
- ESLint rule: `no-async-promise-executor` + custom rule or code review guideline
- Prefer helper utilities: `mapAsync`, `eachAsync`
