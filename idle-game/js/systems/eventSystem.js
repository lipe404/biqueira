import { gameState } from "../core/gameState.js";
import { EVENTS; EVENT_DATA } from "../data/events.js";
import { EventManager, EVENTS } from "../core/eventManager.js";

export const EventSystem = {
  checkInterval: 5, // Check every 5 seconds
  timer: 0,

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

  tryTriggerEvent: (state) => {
    // Global cooldown on events
    const now = Date.now();
    if (now - state.events.lastEventTime < 30000) return; // Min 30s between events

    // Filter possible events
    const possibleEvents = EVENT_DATA.filter((event) => event.condition(state));

    for (const event of possibleEvents) {
      if (Math.random() < event.chance) {
        EventSystem.trigger(state, event);
        break; // Only one event at a time
      }
    }
  },

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

    if (state.logs.length > 10) state.logs.pop();
  },
};
