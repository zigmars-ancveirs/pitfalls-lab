// Simulated Durable Object: single-writer per object key, strong consistency.
export class SimulatedDurableObject {
  constructor() {
    this.state = new Map(); // key -> value
  }

  async put(key, value) {
    this.state.set(key, value);
  }

  async get(key) {
    return this.state.get(key) ?? null;
  }
}
