const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function collectBad(items) {
  const out = [];

  // PITFALL 1: returns early
  items.forEach(async (x) => {
    await delay(10);
    out.push(x);
  });

  return out;
}

export async function errorBad(items) {
  try {
    // PITFALL 2: try/catch does NOT catch async errors here
    items.forEach(async () => {
      await delay(5);
      throw new Error("boom");
    });
    return "ok";
  } catch {
    return "caught"; // almost never reached
  }
}
