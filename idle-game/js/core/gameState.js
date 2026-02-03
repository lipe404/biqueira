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
    // autoSaveInterval: 30000, // Moved to CONFIG
  },
};

class GameState {
  constructor() {
    this.data = JSON.parse(JSON.stringify(initialState));
    this.observers = [];
  }

  /**
   * Subscribe to state changes.
   * @param {function} callback - Function to call when state changes.
   */
  subscribe(callback) {
    if (typeof callback === "function") {
      this.observers.push(callback);
    }
  }

  /**
   * Unsubscribe from state changes.
   * @param {function} callback - Function to remove.
   */
  unsubscribe(callback) {
    this.observers = this.observers.filter((cb) => cb !== callback);
  }

  /**
   * Notify all observers of state changes.
   */
  notify() {
    this.observers.forEach((callback) => callback(this.data));
  }

  /**
   * Get the current game state.
   * @returns {Object} The current game state.
   */
  get() {
    return this.data;
  }

  /**
   * Load saved data into the state, performing a deep merge.
   * @param {Object} savedData - Data loaded from storage.
   */
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

  /**
   * Reset state to initial values.
   */
  reset() {
    this.data = JSON.parse(JSON.stringify(initialState));
    this.notify();
  }

  /**
   * Perform a hard reset (wipes everything).
   */
  hardReset() {
    this.reset();
  }

  /**
   * Perform a prestige reset.
   * Resets resources and production but keeps stats and influence.
   * @param {number} gainedInfluence - Amount of influence gained.
   */
  prestigeReset(gainedInfluence) {
    // Keep persistent data
    const influence = this.data.resources.influence + gainedInfluence;
    const stats = { ...this.data.stats };
    const meta = { ...this.data.meta };
    
    // Reset everything else
    this.reset();

    // Restore persistent data
    this.data.resources.influence = influence;
    this.data.stats = stats;
    this.data.meta = meta;
    
    this.notify();
  }
}

// Export a singleton
export const gameState = new GameState();
