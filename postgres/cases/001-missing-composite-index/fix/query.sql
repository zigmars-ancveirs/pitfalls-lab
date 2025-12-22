-- Verify: planner should prefer an Index Scan (or Bitmap Index Scan) more often
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, tenant_id, created_at
FROM events
WHERE tenant_id = 7
  AND created_at > now() - interval '2 days'
ORDER BY created_at DESC
LIMIT 50;
