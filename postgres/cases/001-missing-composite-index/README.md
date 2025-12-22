# 001 — Missing composite index (Seq Scan → Index Scan)

## Pitfall
A query filters by multiple columns but only single-column (or no) indexes exist,
so Postgres chooses a Seq Scan and performance collapses as data grows.

## Symptoms
- Latency increases with table size
- High CPU / buffer reads
- EXPLAIN shows Seq Scan with many rows removed by filter

## Root cause
Index design doesn’t match the query pattern:
- filtering on `tenant_id` and time range
- ordering by `created_at DESC`
Without a matching composite index, planner has limited options.

## Fix (pattern)
Create an index that matches your WHERE + ORDER BY:
- `(tenant_id, created_at DESC)` is a common baseline
Also:
- `VACUUM (ANALYZE)` after big changes
- use `EXPLAIN (ANALYZE, BUFFERS)` to verify

This case uses Docker + a generated dataset via `generate_series`.
