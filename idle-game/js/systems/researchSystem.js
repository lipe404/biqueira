import { gameState } from "../core/gameState.js";
import { RESEARCH } from "../data/research.js";

export const ResearchSystem = {
    init: () => {
        const state = gameState.get();
        if (!state.research) {
            state.research = {
                researched: [], // IDs of researched techs
                available: []   // IDs currently available to see
            };
        }
    },

    update: (dt) => {
        // Check for new available researches
        const state = gameState.get();
        Object.values(RESEARCH).forEach(tech => {
            if (!state.research.researched.includes(tech.id) && 
                !state.research.available.includes(tech.id)) {
                
                if (tech.req && tech.req(state)) {
                    state.research.available.push(tech.id);
                    gameState.notify();
                }
            }
        });
    },

    buy: (id) => {
        const state = gameState.get();
        const tech = RESEARCH[id];
        
        if (!tech) return false;
        if (state.research.researched.includes(id)) return false;
        if (state.resources.money < tech.cost) return false;

        // Deduct cost
        state.resources.money -= tech.cost;
        
        // Add to researched
        state.research.researched.push(id);
        
        // Remove from available (optional, but cleaner UI)
        state.research.available = state.research.available.filter(r => r !== id);

        // Apply immediate effects
        if (tech.effect) {
            tech.effect(state);
        }

        // Log
        if (!state.logs) state.logs = [];
        state.logs.unshift({
            time: Date.now(),
            message: `Pesquisa Concluída: ${tech.name}`
        });

        gameState.notify();
        return true;
    },

    isResearched: (id) => {
        const state = gameState.get();
        return state.research && state.research.researched.includes(id);
    },
    
    getBonus: (type) => {
        // Helper to calculate bonuses from researches that don't have immediate effects
        const state = gameState.get();
        let bonus = 0;
        
        if (type === 'risk_reduction') {
            if (ResearchSystem.isResearched('advanced_logistics')) bonus += 0.10;
        }
        else if (type === 'sell_price') {
            if (ResearchSystem.isResearched('crypto_laundering')) bonus += 0.15;
        }
        
        return bonus;
    }
};
