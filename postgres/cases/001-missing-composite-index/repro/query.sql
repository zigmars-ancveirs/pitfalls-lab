-- Repro: query with filters + order, but no matching composite index
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, tenant_id, created_at
FROM events
WHERE tenant_id = 7
  AND created_at > now() - interval '2 days'
ORDER BY created_at DESC
LIMIT 50;
