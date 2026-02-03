import { gameState } from "../core/gameState.js";
import { AutomationSystem } from "./automationSystem.js";
import { CONFIG } from "../core/config.js";

/**
 * IdleSystem - Calculates and processes offline progress.
 */
export const IdleSystem = {
  processed: false,

  /**
   * Initialize the system.
   */
  init: () => {
    IdleSystem.processed = false;
  },

  /**
   * Reset the system.
   */
  reset: () => {
    IdleSystem.processed = false;
  },

  /**
   * Update logic. Runs only once per session to process offline time.
   * @param {number} dt - Delta time in seconds.
   */
  update: (dt) => {
    if (IdleSystem.processed) return;

    const state = gameState.get();
    const offlineSeconds = state.meta.offlineSeconds;

    if (offlineSeconds && offlineSeconds > 0) {
      // Cap offline time (e.g., 8 hours = 28800 seconds)
      const maxOffline = CONFIG.IDLE.MAX_OFFLINE_SECONDS;
      const effectiveSeconds = Math.min(offlineSeconds, maxOffline);

      console.log(
        `Processing ${effectiveSeconds} seconds of offline progress...`,
      );

      // We can simulate this by running AutomationSystem logic with a large dt
      // But doing it in one big chunk might cause issues if logic is non-linear.
      // Since our logic IS linear (rate * dt), it's safe to just call it once.

      AutomationSystem.update(effectiveSeconds);

      // Add a log entry
      if (!state.logs) state.logs = [];
      state.logs.unshift({
        time: Date.now(),
        message: `Bem-vindo de volta! Você esteve fora por ${(effectiveSeconds / 3600).toFixed(1)}h.`,
      });

      // Clear the flag
      state.meta.offlineSeconds = 0;
    }

    IdleSystem.processed = true;
  },
};
