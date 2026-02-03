import { gameState } from "../core/gameState.js";
import { SaveSystem } from "../core/saveSystem.js";
import { CONFIG } from "../core/config.js";
import { MathUtils } from "../utils/math.js";

/**
 * PrestigeSystem - Manages prestige mechanics (soft resets for bonuses).
 */
export const PrestigeSystem = {
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
  update: (dt) => {},

  /**
   * Calculate potential influence gain based on lifetime earnings.
   * @returns {number} The amount of influence the player would gain on prestige.
   */
  calculatePrestigeGain: () => {
    const state = gameState.get();
    const totalMoney = MathUtils.safe(state.stats.totalMoneyEarned);

    // Formula: 1 Influence per $10,000 earned, scaled
    // Adjusted to ^0.6 to reduce stagnation in late game
    if (totalMoney < CONFIG.PRESTIGE.MONEY_PER_INFLUENCE) return 0;

    const potential = Math.floor(Math.pow(totalMoney / CONFIG.PRESTIGE.MONEY_PER_INFLUENCE, 0.6));
    return MathUtils.safe(potential);
  },

  /**
   * Perform the prestige reset if the player confirms.
   * Resets progress but keeps influence and stats.
   */
  prestige: () => {
    const gain = PrestigeSystem.calculatePrestigeGain();
    if (gain <= 0) {
      alert("Você ainda não tem respeito suficiente para se aposentar.");
      return false;
    }

    if (
      confirm(
        `Tem certeza de que deseja virar Patrão? Você vai zerar o caixa e a mercadoria, mas vai ganhar ${gain} de Respeito (Influência). Isso aumenta seus lucros permanentemente.`,
      )
    ) {
      // 1. Reset State in Memory
      gameState.prestigeReset(gain);

      // 2. Save to Disk immediately
      SaveSystem.save();

      // 3. Reload to start fresh
      location.reload();
    }
  },
};
