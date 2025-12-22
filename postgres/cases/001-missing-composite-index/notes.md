Notes / variants:
- If queries usually target "recent" data, consider a BRIN index on created_at for huge tables.
- If tenant_id has very skewed distribution, re-check plans across tenants.
- Avoid over-indexing: measure write cost and bloat.
- Always validate with EXPLAIN (ANALYZE, BUFFERS), not intuition.
