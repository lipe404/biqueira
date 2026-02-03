/**
 * GameState - Single source of truth for the game data.
 * Separates data from logic.
 */

const initialState = {
  resources: {
    money: 0,
    widgets: 0,
    heat: 0, // 0-100
    influence: 0, // Prestige currency
  },
  production: {
    widgetsPerSecond: 0,
    moneyPerSecond: 0,
  },
  click: {
    count: 0,
    multiplier: 1,
    basePower: 1,
  },
  automation: {
    npcs: {}, // { npcId: count }
  },
  upgrades: [], // Array of upgrade IDs purchased
  events: {
    activeEvents: [],
    lastEventTime: 0,
  },
  stats: {
    totalWidgetsMade: 0,
    totalMoneyEarned: 0,
    startTime: Date.now(),
  },
  meta: {
    startTime: Date.now(),
    lastSaveTime: Date.now(),
    totalPlayTime: 0,
    version: "1.0.0",
  },
  settings: {
    autoSaveInterval: 30000, // 30s
  },
};

class GameState {
  constructor() {
    this.data = JSON.parse(JSON.stringify(initialState));
    this.observers = [];
  }

  // Observer Pattern: Subscribe to state changes
  subscribe(callback) {
    if (typeof callback === "function") {
      this.observers.push(callback);
    }
  }

  // Observer Pattern: Unsubscribe
  unsubscribe(callback) {
    this.observers = this.observers.filter((cb) => cb !== callback);
  }

  // Observer Pattern: Notify all observers
  notify() {
    this.observers.forEach((callback) => callback(this.data));
  }

  get() {
    return this.data;
  }

  // Deep merge for loading saves
  load(savedData) {
    if (!savedData) return;

    // Recursive merge to ensure new fields in updates are preserved
    const merge = (target, source) => {
      for (const key in source) {
        if (source[key] instanceof Object && key in target) {
          Object.assign(source[key], merge(target[key], source[key]));
        }
      }
      Object.assign(target || {}, source);
      return target;
    };

    this.data = merge(this.data, savedData);
    this.notify();
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(initialState));
    this.notify();
  }

  // Hard reset (wipes prestige too)
  hardReset() {
    this.reset();
  }

  // Prestige reset (keeps influence, resets others)
  prestigeReset(earnedInfluence) {
    const influence = this.data.resources.influence + earnedInfluence;
    this.reset();
    this.data.resources.influence = influence;
    this.notify();
  }
}

// Export a singleton
export const gameState = new GameState();
