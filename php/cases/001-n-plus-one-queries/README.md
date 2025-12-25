# 001 — N+1 queries (naive loop)

## Pitfall
Fetch a list of entities, then loop and fetch related rows one-by-one.

## Symptoms
- Latency grows with N
- DB CPU spikes under load
- Works in dev, fails with real data

## Fix
- Fetch in bulk with JOIN, or `WHERE IN (...)` + group in memory
- Add a query-count guardrail test/metric for critical endpoints

## Evidence
- Repro shows query count ~N+1 (e.g., 101)
- Fix shows query count ~1–2

## Run
```bash
cd repro && php repro.php
cd ../fix && php fix.php
```
