import { gameState } from "../core/gameState.js";
import { CONFIG } from "../core/config.js";
import { EventManager, EVENTS } from "../core/eventManager.js";

/**
 * ProgressionSystem - Manages player ranks and leveling.
 */
export const ProgressionSystem = {
  /**
   * Initialize the system.
   */
  init: () => {
    // Check rank immediately on init
    ProgressionSystem.checkRank();
  },

  /**
   * Reset the system.
   */
  reset: () => {
    const state = gameState.get();
    state.progression.rank = 0;
    state.progression.title = CONFIG.RANKS[0].name;
  },

  _timer: 0,

  /**
   * Update loop to check for rank upgrades.
   * @param {number} dt 
   */
  update: (dt) => {
    // Optimization: Check only once per second
    ProgressionSystem._timer += dt;
    if (ProgressionSystem._timer >= 1.0) {
        ProgressionSystem.checkRank();
        ProgressionSystem._timer = 0;
    }
  },

  /**
   * Checks if player qualifies for a new rank.
   */
  checkRank: () => {
    const state = gameState.get();
    const totalMoney = state.stats.totalMoneyEarned;
    const currentRankIdx = state.progression.rank;

    // Look for the highest rank we qualify for
    let bestRank = 0;
    for (let i = 0; i < CONFIG.RANKS.length; i++) {
      if (totalMoney >= CONFIG.RANKS[i].req) {
        bestRank = i;
      } else {
        break; // Can't reach higher ranks
      }
    }

    if (bestRank > currentRankIdx) {
      ProgressionSystem.levelUp(bestRank);
    }
  },

  /**
   * Applies level up logic.
   * @param {number} newRankIdx 
   */
  levelUp: (newRankIdx) => {
    const state = gameState.get();
    const rankData = CONFIG.RANKS[newRankIdx];
    
    state.progression.rank = newRankIdx;
    state.progression.title = rankData.name;

    // Apply global bonus?
    // We need to store this bonus somewhere or calculate it dynamically in AutomationSystem
    // Let's modify AutomationSystem to read from state.progression.rank -> CONFIG

    console.log(`Leveled up to ${rankData.name}!`);
    
    // Notification
    EventManager.emit(EVENTS.LOG_ADD, { 
      message: `SUBIU DE POSTO: Agora você é ${rankData.name}! (+${rankData.bonus * 100}% Lucro)` 
    });
    
    // Trigger visual celebration
    EventManager.emit(EVENTS.RANK_UP, rankData);
  }
};
