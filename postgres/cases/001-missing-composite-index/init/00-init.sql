-- Dataset: events table with a few hundred thousand rows
CREATE TABLE IF NOT EXISTS events (
  id         bigserial PRIMARY KEY,
  tenant_id  int NOT NULL,
  created_at timestamptz NOT NULL,
  payload    text NOT NULL
);

-- Insert data only if empty
DO $$
BEGIN
  IF (SELECT COUNT(*) FROM events) = 0 THEN
    INSERT INTO events (tenant_id, created_at, payload)
    SELECT
      (1 + (g % 50))::int AS tenant_id,
      now() - (g || ' seconds')::interval AS created_at,
      repeat('x', 200) AS payload
    FROM generate_series(1, 300000) AS g;

    VACUUM (ANALYZE) events;
  END IF;
END $$;
