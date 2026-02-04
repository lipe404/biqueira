import { BuildingSystem } from "../../systems/buildingSystem.js";

export const BuildingRenderer = {
    /**
     * Render building status
     * @param {Object} state - Game state
     * @param {Object} elements - DOM elements cache
     * @param {Function} formatCurrency - Currency formatter
     */
    render: (state, elements, formatCurrency) => {
        const current = BuildingSystem.getCurrentBuilding();
        const next = BuildingSystem.getNextBuilding();
        
        // Update Info
        if (elements.buildingName) elements.buildingName.textContent = current.name;
        if (elements.buildingMultiplier) elements.buildingMultiplier.textContent = `x${current.multiplier}`;

        // Update Button
        if (elements.btnUpgradeBuilding) {
            if (next) {
                elements.btnUpgradeBuilding.classList.remove("hidden");
                const canAfford = state.resources.money >= next.cost;
                
                // Update text
                const costSpan = elements.btnUpgradeBuilding.querySelector("span");
                if (costSpan) costSpan.textContent = formatCurrency(next.cost);
                
                // Update state
                if (canAfford) {
                    elements.btnUpgradeBuilding.classList.remove("disabled");
                    elements.btnUpgradeBuilding.disabled = false;
                } else {
                    elements.btnUpgradeBuilding.classList.add("disabled");
                    elements.btnUpgradeBuilding.disabled = true;
                }
            } else {
                elements.btnUpgradeBuilding.classList.add("hidden");
            }
        }
    }
};
