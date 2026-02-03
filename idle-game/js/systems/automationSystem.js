import { gameState } from "../core/gameState.js";
import { NPCS } from "../data/npcs.js";
import { CONFIG } from "../core/config.js";

/**
 * AutomationSystem - Manages automated production and sales from NPCs.
 */
export const AutomationSystem = {
  /**
   * Initialize the system.
   */
  init: () => {
    // Initialization logic if needed
  },

  /**
   * Reset the system.
   */
  reset: () => {
    // Reset internal state if needed
  },

  /**
   * Update the system logic.
   * @param {number} dt - Delta time in seconds.
   */
  update: (dt) => {
    const state = gameState.get();
    const npcs = state.automation.npcs;

    let totalProduction = 0;
    let totalSales = 0;
    let totalRiskChange = 0;

    // Calculate totals from NPCs
    for (const [id, count] of Object.entries(npcs)) {
      if (count <= 0) continue;

      const data = NPCS[id];
      if (!data) continue;

      // Apply multipliers (defined in upgrades)
      let multiplier = 1;
      if (state.multipliers && state.multipliers[id]) {
        multiplier = state.multipliers[id];
      }

      const output = data.baseProduction * count * multiplier;
      const risk = data.baseRisk * count;

      if (data.role === "producer") {
        totalProduction += output;
      } else if (data.role === "seller") {
        totalSales += output;
      } else if (data.role === "manager") {
        // Managers might boost global production or just reduce risk
        // For now, they just reduce risk (handled in risk calc)
      }

      totalRiskChange += risk;
    }

    // --- GLOBAL MULTIPLIERS ---

    // 1. Prestige (Respeito)
    // Each point of Influence adds 10% to production and sales
    const prestigeMult = 1 + state.resources.influence * CONFIG.PRESTIGE_MULTIPLIER_FACTOR;
    totalProduction *= prestigeMult;
    totalSales *= prestigeMult;

    // 2. Heat Penalty (Suspeita)
    // High heat makes operation harder (police checkpoints, paranoia)
    let heatMult = 1.0;
    if (state.resources.heat > CONFIG.HEAT.THRESHOLD_HIGH) {
      heatMult = CONFIG.HEAT.PENALTY_MULT_HIGH; // -30% efficiency
    } else if (state.resources.heat > CONFIG.HEAT.THRESHOLD_MEDIUM) {
      heatMult = CONFIG.HEAT.PENALTY_MULT_MEDIUM; // -10% efficiency
    }
    totalProduction *= heatMult;
    totalSales *= heatMult;

    // --- APPLY LOGIC ---

    // 1. Production
    const produced = totalProduction * dt;
    state.resources.widgets += produced;
    state.stats.totalWidgetsMade += produced;

    // 2. Sales
    // Can only sell what we have
    let toSell = totalSales * dt;
    if (toSell > state.resources.widgets) {
      toSell = state.resources.widgets;
    }

    state.resources.widgets -= toSell;
    const revenue = toSell * CONFIG.ECONOMY.BASE_PRICE;
    state.resources.money += revenue;
    state.stats.totalMoneyEarned += revenue;

    // 3. Risk (Heat)
    // Heat decays naturally if no production/risk, or increases
    let netRiskChange = totalRiskChange;

    // If we have risk reduction multipliers (from upgrades)
    if (state.multipliers && state.multipliers.risk) {
      if (netRiskChange > 0) netRiskChange *= state.multipliers.risk;
    }

    state.resources.heat += netRiskChange * dt;

    // Natural cooling if heat is high and risk generation is low/negative
    // Cooling is faster if heat is higher
    let cooling = 0;
    if (state.resources.heat > CONFIG.HEAT.THRESHOLD_HIGH) cooling = CONFIG.HEAT.COOLING_RATE_HIGH;
    else if (state.resources.heat > CONFIG.HEAT.THRESHOLD_MEDIUM) cooling = CONFIG.HEAT.COOLING_RATE_MEDIUM;
    else cooling = CONFIG.HEAT.COOLING_RATE_BASE;

    // Only cool if we aren't generating massive heat (optional game design choice)
    // For now, cooling always fights against heat generation
    state.resources.heat -= cooling * dt;

    // Clamp Heat
    if (state.resources.heat < 0) state.resources.heat = 0;
    // Max heat check is done in RiskSystem

    // Update Global Rates for UI
    state.production.widgetsPerSecond = totalProduction;
    state.production.moneyPerSecond = totalSales; // Technically potential sales
    state.production.netRiskPerSecond = netRiskChange;
  },
};
