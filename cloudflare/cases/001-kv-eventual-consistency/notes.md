Practical guidance:
- KV is great for: public config, static-ish data, cacheable content, read-heavy lookups.
- Avoid KV for: sessions, auth, counters, ordering/locks, transactional workflows.
- Durable Objects are great for: per-entity strong consistency (e.g., per user/cart/tenant).
- If you must mix: KV for read-heavy + DO/D1 as source of truth, with write-through caching.
