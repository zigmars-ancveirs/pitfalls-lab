-- Fix: composite index matching WHERE + ORDER BY
CREATE INDEX IF NOT EXISTS events_tenant_created_at_desc_idx
ON events (tenant_id, created_at DESC);

VACUUM (ANALYZE) events;
