import { gameState } from "../core/gameState.js";
import { TERRITORIES } from "../data/territories.js";

export const TerritorySystem = {
    /**
     * Get all territories
     */
    getAll: () => TERRITORIES,

    /**
     * Check if a territory is owned
     */
    isOwned: (id) => {
        const state = gameState.get();
        if (!state.territories) state.territories = [];
        return state.territories.includes(id);
    },

    /**
     * Check if a territory is visible/unlockable
     */
    isUnlocked: (id) => {
        const t = TERRITORIES[id];
        if (!t) return false;
        
        const state = gameState.get();
        const currentBuilding = state.buildingLevel || 0;
        
        // Requirement: Building Level
        return currentBuilding >= t.reqBuilding;
    },

    /**
     * Attempt to conquer a territory
     */
    conquer: (id) => {
        const t = TERRITORIES[id];
        if (!t) return false;
        
        if (TerritorySystem.isOwned(id)) return false;
        if (!TerritorySystem.isUnlocked(id)) return false;

        const state = gameState.get();
        
        if (state.resources.money >= t.cost) {
            state.resources.money -= t.cost;
            if (!state.territories) state.territories = [];
            state.territories.push(id);
            return true;
        }
        return false;
    },

    /**
     * Get aggregated bonuses
     */
    getBonuses: () => {
        const state = gameState.get();
        const owned = state.territories || [];
        
        const bonuses = {
            production_rate: 0,
            heat_reduction: 0,
            cost_reduction: 0,
            sell_price: 0,
            global_multiplier: 0
        };

        owned.forEach(id => {
            const t = TERRITORIES[id];
            if (t && t.bonus) {
                if (bonuses[t.bonus.type] !== undefined) {
                    bonuses[t.bonus.type] += t.bonus.value;
                }
            }
        });

        return bonuses;
    }
};
