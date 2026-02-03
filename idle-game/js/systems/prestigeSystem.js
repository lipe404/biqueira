import { gameState } from "../core/gameState.js";
import { SaveSystem } from "../core/saveSystem.js";

export const PrestigeSystem = {
  // Calculate potential influence gain based on lifetime earnings
  calculatePrestigeGain: () => {
    const state = gameState.get();
    const totalMoney = state.stats.totalMoneyEarned;

    // Formula: 1 Influence per $10,000 earned, scaled
    if (totalMoney < 10000) return 0;

    const potential = Math.floor(Math.sqrt(totalMoney / 10000));
    return potential;
  },

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
