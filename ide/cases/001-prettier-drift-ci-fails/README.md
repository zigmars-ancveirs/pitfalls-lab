# 001 — IDE formats differently → CI fails (Prettier not enforced)

## Pitfall
Developers rely on IDE defaults or global formatter.
CI uses project Prettier config → formatting drift → PRs fail.

## Symptoms
- “It looks fine on my machine” PRs fail in CI
- endless format-only diffs
- inconsistent style across files

## Root cause
Formatter configuration isn't enforced from the repository.

## Fix
- Add Prettier as a dev dependency
- Add `prettier --check` in CI + `prettier --write` script
- Configure IDE to use the **workspace** Prettier

## Evidence
- Repro: `prettier --check` fails on an unformatted file
- Fix: same check passes

## Run
```bash
cd repro && npm i && npm test
cd ../fix && npm i && npm test
```
