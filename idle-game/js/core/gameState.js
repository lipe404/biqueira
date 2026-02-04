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
  discounts: {
    global: 0, // Global discount (0.0 to 1.0)
    npcs: {}, // { npcId: discount }
    upgrades: 0 // Discount for upgrades
  },
  upgrades: [], // Array of upgrade IDs purchased
  pets: [], // Array of pet IDs owned
  territories: [], // Array of territory IDs owned
  buildingLevel: 0, // Current building tier
  events: {
    activeEvents: [],
    lastEventTime: 0,
  },
  stats: {
    totalWidgetsMade: 0,
    totalMoneyEarned: 0,
    startTime: Date.now(),
  },
  progression: {
    rank: 0, // Current rank index
    title: "Vapor" // Current rank name
  },
  meta: {
    startTime: Date.now(),
    lastSaveTime: Date.now(),
    totalPlayTime: 0,
    version: "1.0.0",
  },
  settings: {
    autosaveEnabled: true,
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
   * Validate and repair data against the schema (initialState).
   * @param {Object} data - Data to validate.
   * @returns {Object} Validated data with missing keys filled from initialState.
   */
  validateSchema(data) {
    if (!data) return JSON.parse(JSON.stringify(initialState));

    const validate = (schema, input) => {
      // If input is not an object or is null, revert to schema default
      if (typeof input !== 'object' || input === null) {
        return JSON.parse(JSON.stringify(schema));
      }

      const output = {};
      for (const key in schema) {
        if (schema.hasOwnProperty(key)) {
          const schemaValue = schema[key];
          const inputValue = input[key];

          if (inputValue === undefined) {
            // Missing key: fill with default
            output[key] = JSON.parse(JSON.stringify(schemaValue));
          } else if (
            typeof schemaValue === 'object' && 
            schemaValue !== null && 
            !Array.isArray(schemaValue)
          ) {
            // Nested object: recurse
            output[key] = validate(schemaValue, inputValue);
          } else {
            // Primitive or Array: keep input value (could add type check here)
            output[key] = inputValue;
          }
        }
      }
      
      // Preserve extra keys from input (optional, but good for backward compat if schema is strict subset)
      // For strict schema validation, we would NOT do this loop.
      // But for save data, sometimes we want to keep deprecated data for migration?
      // Let's stick to STRICT schema for now to clean up state.
      
      return output;
    };

    return validate(initialState, data);
  }

  /**
   * Load saved data into the state, performing validation and deep merge.
   * @param {Object} savedData - Data loaded from storage.
   */
  load(savedData) {
    if (!savedData) return;

    // 1. Validate and repair the loaded data
    const validatedData = this.validateSchema(savedData);

    // 2. Merge validated data into current state
    this.data = validatedData;
    
    // 3. Notify
    this.notify();
  }

  /**
   * Centralized reset logic.
   * @param {string} type - 'HARD' | 'PRESTIGE'
   * @param {Object} payload - Optional data for the reset (e.g., gained influence).
   */
  reset(type = 'HARD', payload = {}) {
    console.log(`Resetting Game State: ${type}`);
    
    if (type === 'HARD') {
      this.data = JSON.parse(JSON.stringify(initialState));
    } 
    else if (type === 'PRESTIGE') {
      // Keep persistent data
      const influence = this.data.resources.influence + (payload.gainedInfluence || 0);
      const stats = { ...this.data.stats };
      const meta = { ...this.data.meta };
      
      // Reset state
      this.data = JSON.parse(JSON.stringify(initialState));
      
      // Restore persistent data
      this.data.resources.influence = influence;
      this.data.stats = stats;
      this.data.meta = meta;
    }

    this.notify();
  }

  /**
   * Deprecated: Use reset('PRESTIGE', { gainedInfluence }) instead.
   */
  prestigeReset(gainedInfluence) {
    this.reset('PRESTIGE', { gainedInfluence });
  }
}

// Export a singleton
export const gameState = new GameState();
