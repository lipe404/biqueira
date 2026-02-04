import { gameState } from "../core/gameState.js";
import { BUILDINGS } from "../data/buildings.js";

export const BuildingSystem = {
    /**
     * Get current building data
     */
    getCurrentBuilding: () => {
        const state = gameState.get();
        // Fallback to 0 if undefined
        const level = state.buildingLevel || 0;
        return BUILDINGS[level] || BUILDINGS[0];
    },

    /**
     * Get next building data
     */
    getNextBuilding: () => {
        const state = gameState.get();
        const level = state.buildingLevel || 0;
        if (level >= BUILDINGS.length - 1) return null; // Max level
        return BUILDINGS[level + 1];
    },

    /**
     * Attempt to upgrade building
     */
    upgrade: () => {
        const state = gameState.get();
        const next = BuildingSystem.getNextBuilding();
        
        if (!next) return false;

        if (state.resources.money >= next.cost) {
            state.resources.money -= next.cost;
            state.buildingLevel = (state.buildingLevel || 0) + 1;
            return true;
        }
        return false;
    },

    /**
     * Get global multiplier from building
     */
    getMultiplier: () => {
        const building = BuildingSystem.getCurrentBuilding();
        return building.multiplier;
    }
};
