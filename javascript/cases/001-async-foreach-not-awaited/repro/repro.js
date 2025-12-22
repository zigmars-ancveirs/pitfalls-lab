const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function collectBad(items) {
  const out = [];

  // PITFALL: forEach doesn't await async callbacks
  items.forEach(async (x) => {
    await delay(10);
    out.push(x);
  });

  return out; // returns immediately (out likely empty)
}
