const delay = (ms) => new Promise((r) => setTimeout(r, ms));

class AbortError extends Error {
  constructor() {
    super("Aborted");
    this.name = "AbortError";
  }
}

// Small semaphore (no deps) for concurrency limiting
function semaphore(max) {
  let active = 0;
  const q = [];
  const acquire = () =>
    new Promise((res) => {
      const run = () => {
        active++;
        res(() => {
          active--;
          const next = q.shift();
          if (next) next();
        });
      };
      active < max ? run() : q.push(run);
    });
  return { acquire };
}

/**
 * Deterministic, bounded-parallel map.
 * - preserves order
 * - limits concurrency (prevents stampede)
 * - supports cancellation via AbortSignal
 */
export async function mapAsyncBounded(items, fn, { concurrency = 8, signal } = {}) {
  const sem = semaphore(concurrency);
  const results = new Array(items.length);

  await Promise.all(
    items.map(async (item, i) => {
      if (signal?.aborted) throw new AbortError();
      const release = await sem.acquire();
      try {
        if (signal?.aborted) throw new AbortError();
        results[i] = await fn(item, i);
      } finally {
        release();
      }
    })
  );

  return results;
}

export async function collectGoodParallelOrdered(items, { concurrency = 8, signal } = {}) {
  return mapAsyncBounded(
    items,
    async (x) => {
      await delay(10);
      return x;
    },
    { concurrency, signal }
  );
}

export async function collectGoodSequential(items, { signal } = {}) {
  const out = [];
  for (const x of items) {
    if (signal?.aborted) throw new AbortError();
    await delay(10);
    out.push(x);
  }
  return out;
}
