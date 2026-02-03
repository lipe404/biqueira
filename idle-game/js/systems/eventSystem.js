import { gameState } from "../core/gameState.js";
import { EVENTS as EVENT_DATA } from "../data/events.js";
import { EventManager, EVENTS } from "../core/eventManager.js";
import { CONFIG } from "../core/config.js";

/**
 * EventSystem - Manages random events.
 */
export const EventSystem = {
  checkInterval: CONFIG.EVENTS.CHECK_INTERVAL, // Check every 5 seconds
  timer: 0,

  /**
   * Initialize the system.
   */
  init: () => {},

  /**
   * Reset the system.
   */
  reset: () => {},

  /**
   * Update the system logic.
   * @param {number} dt - Delta time in seconds.
   */
  update: (dt) => {
    const state = gameState.get();
    EventSystem.timer += dt;

    if (EventSystem.timer >= EventSystem.checkInterval) {
      EventSystem.timer = 0;
      EventSystem.tryTriggerEvent(state);
    }

    // Update active events (if they have durations)
    // For now, events are instant effects.
  },

  /**
   * Attempt to trigger a random event.
   * @param {Object} state - The current game state.
   */
  tryTriggerEvent: (state) => {
    // Global cooldown on events
    const now = Date.now();
    if (now - state.events.lastEventTime < CONFIG.EVENTS.GLOBAL_COOLDOWN) return; // Min 30s between events

    // Filter possible events
    const possibleEvents = EVENT_DATA.filter((event) => event.condition(state));

    for (const event of possibleEvents) {
      if (Math.random() < event.chance) {
        EventSystem.trigger(state, event);
        break; // Only one event at a time
      }
    }
  },

  /**
   * Trigger a specific event.
   * @param {Object} state - The current game state.
   * @param {Object} event - The event object to trigger.
   */
  trigger: (state, event) => {
    const message = event.effect(state);
    state.events.lastEventTime = Date.now();

    // Log it
    if (!state.logs) state.logs = [];
    state.logs.unshift({
      time: Date.now(),
      message: `EVENT: ${event.name} - ${message}`,
    });

    EventManager.emit(EVENTS.RANDOM_EVENT, {
      name: event.name,
      message: message,
    });

    if (state.logs.length > CONFIG.EVENTS.LOG_LIMIT) state.logs.pop();
  },
};
