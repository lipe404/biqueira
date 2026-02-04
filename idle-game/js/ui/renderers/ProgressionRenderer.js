import { CONFIG } from "../../core/config.js";

/**
 * ProgressionRenderer - Handles rendering of Rank/Level progression.
 */
export const ProgressionRenderer = {
  /**
   * Renders the rank and progression bar.
   * @param {Object} state - Current game state
   * @param {Object} elements - DOM elements cache
   */
  render: (state, elements) => {
    if (!elements.rankName || !elements.rankProgress) return;

    const currentRankIdx = state.progression.rank;
    const currentRank = CONFIG.RANKS[currentRankIdx];
    const nextRank = CONFIG.RANKS[currentRankIdx + 1];

    // Update Rank Name
    if (elements.rankName.textContent !== state.progression.title) {
        elements.rankName.textContent = state.progression.title;
        // Add a visual pulse or effect if changed? 
        // Logic handled by FeedbackRenderer typically, but we can add simple class toggle here if needed.
    }

    // Calculate Progress
    // Progress is based on Total Money vs Next Rank Requirement
    let progress = 0;
    
    if (!nextRank) {
      // Max Rank
      progress = 100;
    } else {
      const prevReq = currentRank.req;
      const nextReq = nextRank.req;
      const totalMoney = state.stats.totalMoneyEarned;

      // Calculate percentage between current rank base and next rank req
      // (current - base) / (next - base)
      if (totalMoney >= nextReq) {
        progress = 100;
      } else {
        const numerator = totalMoney - prevReq;
        const denominator = nextReq - prevReq;
        
        // Safety check for division by zero (though ranks should have diff reqs)
        if (denominator <= 0) progress = 100;
        else progress = (numerator / denominator) * 100;
      }
    }

    // Clamp 0-100
    progress = Math.max(0, Math.min(100, progress));

    // Update Bar
    elements.rankProgress.style.width = `${progress}%`;
  }
};
