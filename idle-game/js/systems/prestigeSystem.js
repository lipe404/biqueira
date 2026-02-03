import { gameState } from '../core/gameState.js';

export const PrestigeSystem = {
    // Calculate potential influence gain based on lifetime earnings
    calculatePrestigeGain: () => {
        const state = gameState.get();
        const totalMoney = state.stats.totalMoneyEarned;
        
        // Formula: 1 Influence per $10,000 earned, scaled (cube root for diminishing returns)
        // Let's try: (TotalMoney / 10000) ^ 0.5
        if (totalMoney < 10000) return 0;
        
        const potential = Math.floor(Math.sqrt(totalMoney / 10000));
        return potential;
    },

    prestige: () => {
        const gain = PrestigeSystem.calculatePrestigeGain();
        if (gain <= 0) return false;

        if (confirm(`Tem certeza de que deseja se aposentar? Você perderá todo o progresso, mas ganhará ${gain} de Influência.`)) {
            gameState.prestigeReset(gain);
            location.reload(); // Simplest way to ensure clean state re-render
        }
    }
};
