# 001 — `late` pitfalls: runtime crashes vs proper invariants

## Pitfall
Using `late` for fields that are not guaranteed to be initialized before first read.
It compiles, then fails at runtime: `LateInitializationError`.

## What makes this case non-trivial
`late` is not always bad:
- It can be correct for **lazy initialization** if you control access and ensure single initialization.
- It is risky for **domain state** unless you enforce invariants.

## Fix patterns
1) Make the invariant explicit: `final` + `required` constructor
2) Lazy init safely: `late final` with a private initializer and clear lifecycle

## Evidence
- Lazy initializer runs exactly once (`calls == 1`)
- Empty token is rejected via explicit invariant

## Run
```bash
cd repro && dart pub get && dart test
cd ../fix && dart pub get && dart test
```
