import { gameState } from '../core/gameState.js';
import { NPCS } from '../data/npcs.js';

export const AutomationSystem = {
    update: (dt) => {
        const state = gameState.get();
        const npcs = state.automation.npcs;
        
        let totalProduction = 0;
        let totalSales = 0;
        let totalRiskChange = 0;

        // Calculate totals from NPCs
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

        // --- GLOBAL MULTIPLIERS ---

        // 1. Prestige (Respeito)
        // Each point of Influence adds 10% to production and sales
        const prestigeMult = 1 + (state.resources.influence * 0.1);
        totalProduction *= prestigeMult;
        totalSales *= prestigeMult;

        // 2. Heat Penalty (Suspeita)
        // High heat makes operation harder (police checkpoints, paranoia)
        let heatMult = 1.0;
        if (state.resources.heat > 80) {
            heatMult = 0.7; // -30% efficiency
        } else if (state.resources.heat > 50) {
            heatMult = 0.9; // -10% efficiency
        }
        totalProduction *= heatMult;
        totalSales *= heatMult;

        // --- APPLY LOGIC ---
        
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
        let netRiskChange = totalRiskChange;
        
        // If we have risk reduction multipliers (from upgrades)
        if (state.multipliers && state.multipliers.risk) {
             if (netRiskChange > 0) netRiskChange *= state.multipliers.risk;
        }

        state.resources.heat += netRiskChange * dt;
        
        // Natural cooling if heat is high and risk generation is low/negative
        // Cooling is faster if heat is higher
        if (netRiskChange <= 0) {
             let coolingRate = 1.0;
             if (state.resources.heat > 50) coolingRate = 2.0;
             if (state.resources.heat > 80) coolingRate = 4.0;
             
             state.resources.heat -= coolingRate * dt;
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
