// Simulated KV with delayed replication to other "regions".
export class SimulatedKV {
  constructor(replicationDelayMs = 200) {
    this.replicationDelayMs = replicationDelayMs;
    this.regions = new Map(); // region -> Map(key -> value)
  }

  _regionStore(region) {
    if (!this.regions.has(region)) this.regions.set(region, new Map());
    return this.regions.get(region);
  }

  async put(region, key, value) {
    // Write is immediate only in the writer region
    this._regionStore(region).set(key, value);

    // Replicate to other regions after a delay (eventual consistency)
    for (const [r, store] of this.regions.entries()) {
      if (r === region) continue;
      setTimeout(() => store.set(key, value), this.replicationDelayMs);
    }
  }

  async get(region, key) {
    return this._regionStore(region).get(key) ?? null;
  }
}
