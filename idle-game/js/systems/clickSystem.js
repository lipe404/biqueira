import { gameState } from "../core/gameState.js";
import { EventManager, EVENTS } from "../core/eventManager.js";
import { CONFIG } from "../core/config.js";

/**
 * ClickSystem - Manages manual player interactions (clicks).
 */
export const ClickSystem = {
  /**
   * Initialize the system.
   */
  init: () => {},

  /**
   * Reset the system.
   */
  reset: () => {},

  /**
   * Update loop (unused for clicks but kept for consistency).
   * @param {number} dt - Delta time in seconds.
   */
  update: (dt) => {}, 

  /**
   * Called when player clicks "Make Widget".
   * Produces widgets based on click power and multipliers.
   */
  clickMake: () => {
    const state = gameState.get();
    const base = state.click.basePower;
    const mult = state.click.multiplier;

    // Prestige Multiplier
    const prestigeMult = 1 + state.resources.influence * CONFIG.PRESTIGE_MULTIPLIER_FACTOR;

    // Heat Penalty on Clicking (Harder to work under pressure)
    let heatMult = 1.0;
    if (state.resources.heat > CONFIG.CLICK.HEAT_THRESHOLD_HIGH) heatMult = CONFIG.CLICK.HEAT_MULT_HIGH;
    else if (state.resources.heat > CONFIG.CLICK.HEAT_THRESHOLD_MEDIUM) heatMult = CONFIG.CLICK.HEAT_MULT_MEDIUM;

    const amount = base * mult * prestigeMult * heatMult;

    state.resources.widgets += amount;
    state.stats.totalWidgetsMade += amount;
    state.click.count++;

    // Heat generation from manual clicks
    // Increases if you click too fast (maybe handled by caller? nah simple here)
    state.resources.heat += CONFIG.HEAT.GENERATION_PER_CLICK * amount;
    if (state.resources.heat > CONFIG.HEAT.MAX) state.resources.heat = CONFIG.HEAT.MAX;

    EventManager.emit(EVENTS.CLICK_MAKE, { amount });
  },

  /**
   * Called when player clicks "Sell Widget".
   * Sells widgets based on click power and multipliers.
   * @returns {number} The revenue generated.
   */
  clickSell: () => {
    const state = gameState.get();
    const base = state.click.basePower;
    const mult = state.click.multiplier;

    const prestigeMult = 1 + state.resources.influence * CONFIG.PRESTIGE_MULTIPLIER_FACTOR;

    // Selling is manual too
    const amount = base * mult; // Amount of widgets to attempt to sell

    if (state.resources.widgets > 0) {
      let toSell = amount;
      if (toSell > state.resources.widgets) toSell = state.resources.widgets;

      state.resources.widgets -= toSell;

      const price = CONFIG.ECONOMY.BASE_PRICE;
      const revenue = toSell * price * prestigeMult;

      state.resources.money += revenue;
      state.stats.totalMoneyEarned += revenue;
      
      EventManager.emit(EVENTS.CLICK_SELL, { revenue });

      return revenue;
    }
    return 0;
  },
};
