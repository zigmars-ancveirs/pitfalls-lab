- Parallel pattern with `out.push` is order-nondeterministic; if order matters, return values from map and collect:
  `const out = await Promise.all(items.map(async x => ... return x))`.
- Sequential `for...of` is slower but predictable and often easier to reason about.
