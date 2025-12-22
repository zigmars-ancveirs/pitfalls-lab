const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// Parallel
export async function collectGoodParallel(items) {
  const out = [];
  await Promise.all(
    items.map(async (x) => {
      await delay(10);
      out.push(x);
    })
  );
  return out;
}

// Sequential (preserves order naturally)
export async function collectGoodSequential(items) {
  const out = [];
  for (const x of items) {
    await delay(10);
    out.push(x);
  }
  return out;
}
