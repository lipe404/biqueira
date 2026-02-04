/**
 * EventManager - Central communication hub for systems.
 * Allows decoupled communication via Pub/Sub pattern.
 */
export const EventManager = {
  listeners: {},

  /**
   * Subscribe to an event
   * @param {string} event - Event name
   * @param {function} callback - Function to call when event is emitted
   */
  on: (event, callback) => {
    if (!EventManager.listeners[event]) {
      EventManager.listeners[event] = [];
    }
    EventManager.listeners[event].push(callback);
  },

  /**
   * Unsubscribe from an event
   * @param {string} event - Event name
   * @param {function} callback - Function to remove
   */
  off: (event, callback) => {
    if (!EventManager.listeners[event]) return;
    EventManager.listeners[event] = EventManager.listeners[event].filter(
      (cb) => cb !== callback,
    );
  },

  /**
   * Emit an event with data
   * @param {string} event - Event name
   * @param {any} data - Data to pass to listeners
   */
  emit: (event, data) => {
    if (!EventManager.listeners[event]) return;
    EventManager.listeners[event].forEach((callback) => {
      try {
        callback(data);
      } catch (e) {
        console.error(`Error in listener for event '${event}':`, e);
      }
    });
  },
};

// Common Event Names
export const EVENTS = {
  GAME_START: "GAME_START",
  GAME_TICK: "GAME_TICK",
  STATE_CHANGED: "STATE_CHANGED",
  SAVE_GAME: "SAVE_GAME",
  LOAD_GAME: "LOAD_GAME",
  // Gameplay Events
  CLICK_MAKE: "CLICK_MAKE",
  CLICK_SELL: "CLICK_SELL",
  UPGRADE_PURCHASED: "UPGRADE_PURCHASED",
  NPC_HIRED: "NPC_HIRED",
  RISK_PENALTY: "RISK_PENALTY",
  RANDOM_EVENT: "RANDOM_EVENT",
  LOG_ADD: "LOG_ADD",
  RANK_UP: "RANK_UP",
  SHOW_CHOICE: "SHOW_CHOICE",
};
