import { gameState } from '../core/gameState.js';
import { NPCS } from '../data/npcs.js';

export const AutomationSystem = {
    update: (dt) => {
        const state = gameState.get();
        const npcs = state.automation.npcs;
        
        let totalProduction = 0;
        let totalSales = 0;
        let totalRiskChange = 0;

        // Calculate totals
        for (const [id, count] of Object.entries(npcs)) {
            if (count <= 0) continue;
            
            const data = NPCS[id];
            if (!data) continue;

            // Apply multipliers (defined in upgrades)
            let multiplier = 1;
            if (state.multipliers && state.multipliers[id]) {
                multiplier = state.multipliers[id];
            }

            const output = data.baseProduction * count * multiplier;
            const risk = data.baseRisk * count;

            if (data.role === 'producer') {
                totalProduction += output;
            } else if (data.role === 'seller') {
                totalSales += output;
            } else if (data.role === 'manager') {
                // Managers might boost global production or just reduce risk
                // For now, they just reduce risk (handled in risk calc)
            }

            totalRiskChange += risk;
        }

        // Apply Logic
        
        // 1. Production
        const produced = totalProduction * dt;
        state.resources.widgets += produced;
        state.stats.totalWidgetsMade += produced;

        // 2. Sales
        // Can only sell what we have
        let toSell = totalSales * dt;
        if (toSell > state.resources.widgets) {
            toSell = state.resources.widgets;
        }
        
        state.resources.widgets -= toSell;
        const revenue = toSell * 1; // Base price $1
        state.resources.money += revenue;
        state.stats.totalMoneyEarned += revenue;

        // 3. Risk (Heat)
        // Heat decays naturally if no production/risk, or increases
        // Let's say natural cooling is 0.5 per second
        let netRiskChange = totalRiskChange;
        
        // If we have risk reduction multipliers
        if (state.multipliers && state.multipliers.risk) {
            // Apply to positive risk generation only? Or net?
            // Let's apply to net if positive
             if (netRiskChange > 0) netRiskChange *= state.multipliers.risk;
        }

        state.resources.heat += netRiskChange * dt;
        
        // Natural cooling if heat is high and risk generation is low
        if (state.resources.heat > 0 && netRiskChange <= 0) {
             state.resources.heat -= 1.0 * dt; // Cooling rate
        }

        // Clamp Heat
        if (state.resources.heat < 0) state.resources.heat = 0;
        if (state.resources.heat > 100) state.resources.heat = 100;

        // Update Global Rates for UI
        state.production.widgetsPerSecond = totalProduction;
        state.production.moneyPerSecond = totalSales; // Technically potential sales
        state.production.netRiskPerSecond = netRiskChange;
    }
};
