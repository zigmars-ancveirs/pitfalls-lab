# 001 — KV eventual consistency (stale reads across edges)

## Pitfall
Using KV as a strongly-consistent datastore (e.g., auth/session/feature-flag truth).
KV is **eventually consistent**: a write in one “region” may not be visible immediately elsewhere.

## Symptoms
- “I just wrote it, why can’t I read it?”
- Flaky behavior depending on which edge POP handles the request
- Debugging nightmares: cannot reproduce locally unless you simulate it

## Root cause
Replication delay + distributed caches. KV is optimized for read-heavy workloads,
not immediate read-after-write consistency across all edges.

## Fix (pattern)
- Treat KV as cache/static-ish config
- For strong consistency / single-writer state:
  - **Durable Objects** (per-object strong consistency)
  - Or **D1 / origin DB**
- If you must use KV for config, use versioning + tolerate staleness, or "read-your-writes" via local cache for the same request path

This case uses a small Node simulation to demonstrate the behavior.
