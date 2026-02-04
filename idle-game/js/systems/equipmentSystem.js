import { gameState } from "../core/gameState.js";
import { EQUIPMENT } from "../data/equipment.js";

export const EquipmentSystem = {
    init: () => {
        // Ensure state structure exists
        const state = gameState.get();
        if (!state.equipment) {
            state.equipment = {
                owned: [],
                equipped: {
                    weapon: null,
                    clothing: null,
                    accessory: null,
                    shoes: null
                }
            };
        }
    },

    getAll: () => EQUIPMENT,

    isOwned: (id) => {
        const state = gameState.get();
        if (!state.equipment || !state.equipment.owned) return false;
        return state.equipment.owned.includes(id);
    },

    isEquipped: (id) => {
        const state = gameState.get();
        if (!state.equipment || !state.equipment.equipped) return false;
        
        const item = EQUIPMENT[id];
        if (!item) return false;

        return state.equipment.equipped[item.type] === id;
    },

    buy: (id) => {
        const item = EQUIPMENT[id];
        if (!item) return false;
        if (EquipmentSystem.isOwned(id)) return false;

        const state = gameState.get();
        if (state.resources.money >= item.cost) {
            state.resources.money -= item.cost;
            
            if (!state.equipment) state.equipment = { owned: [], equipped: {} };
            if (!state.equipment.owned) state.equipment.owned = [];
            
            state.equipment.owned.push(id);
            
            // Auto-equip if slot is empty
            if (!state.equipment.equipped[item.type]) {
                state.equipment.equipped[item.type] = id;
            }

            // Force UI update
            gameState.notify();
            return true;
        }
        return false;
    },

    equip: (id) => {
        if (!EquipmentSystem.isOwned(id)) return false;
        
        const item = EQUIPMENT[id];
        if (!item) return false;

        const state = gameState.get();
        state.equipment.equipped[item.type] = id;
        
        // Force UI update
        gameState.notify();
        return true;
    },

    getBonuses: () => {
        const state = gameState.get();
        if (!state.equipment || !state.equipment.equipped) return {};

        const bonuses = {
            click_power: 0,
            production_rate: 0,
            heat_reduction: 0,
            sell_price: 0,
            global_multiplier: 0
        };

        Object.values(state.equipment.equipped).forEach(id => {
            if (id && EQUIPMENT[id]) {
                const bonus = EQUIPMENT[id].bonus;
                if (bonus && bonuses[bonus.type] !== undefined) {
                    bonuses[bonus.type] += bonus.value;
                }
            }
        });

        return bonuses;
    }
};
