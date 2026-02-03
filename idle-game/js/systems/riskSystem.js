import { gameState } from "../core/gameState.js";
import { EventManager, EVENTS } from "../core/eventManager.js";
import { CONFIG } from "../core/config.js";

/**
 * RiskSystem - Manages heat/risk mechanics and penalties.
 */
export const RiskSystem = {
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

    // Check if we are already in a penalty state (Cooldown)
    if (state.riskPenaltyTime > 0) {
      state.riskPenaltyTime -= dt;
      if (state.riskPenaltyTime <= 0) {
        state.riskPenaltyTime = 0;
        // Notify UI: Penalty over
        if (!state.logs) state.logs = [];
        state.logs.unshift({
          time: Date.now(),
          message: `POEIRA BAIXOU: De volta à ativa. Cuidado com o calor.`,
        });
      }
      return; // Skip normal risk checks if penalty is active
    }

    // Threshold Check
    if (state.resources.heat >= CONFIG.HEAT.MAX) {
      RiskSystem.triggerPenalty(state);
    }
  },

  /**
   * Trigger a risk penalty (e.g., police raid).
   * @param {Object} state - The current game state.
   */
  triggerPenalty: (state) => {
    // Reset heat
    state.resources.heat = CONFIG.HEAT.RESET_VALUE; // Doesn't reset fully, stays dangerous

    // Penalty: Lose 50% of widgets and 30% of money
    const lostWidgets = Math.floor(state.resources.widgets * CONFIG.HEAT.WIDGET_LOSS_FACTOR);
    const lostMoney = Math.floor(state.resources.money * CONFIG.HEAT.MONEY_LOSS_FACTOR);

    state.resources.widgets -= lostWidgets;
    state.resources.money -= lostMoney;

    // Block production for 15 seconds
    state.riskPenaltyTime = CONFIG.HEAT.PENALTY_DURATION;

    // Log/Notify
    console.log("RISK PENALTY TRIGGERED!");
    if (!state.logs) state.logs = [];
    state.logs.unshift({
      time: Date.now(),
      message: `MOIOU! A CASA CAIU! A polícia levou ${lostWidgets} mercadorias e $${lostMoney}. Parado por 15s.`,
    });

    EventManager.emit(EVENTS.RISK_PENALTY, {
      lostWidgets,
      lostMoney,
      duration: CONFIG.HEAT.PENALTY_DURATION,
    });

    // Keep log size small
    if (state.logs.length > CONFIG.EVENTS.LOG_LIMIT) state.logs.pop();
  },
};
