import { gameState } from '../core/gameState.js';

export const ClickSystem = {
    // Called when player clicks "Make Widget"
    clickMake: () => {
        const state = gameState.get();
        const base = state.click.basePower;
        const mult = state.click.multiplier;
        
        // Prestige Multiplier
        const prestigeMult = 1 + (state.resources.influence * 0.1);

        // Heat Penalty on Clicking (Harder to work under pressure)
        let heatMult = 1.0;
        if (state.resources.heat > 90) heatMult = 0.5;
        else if (state.resources.heat > 60) heatMult = 0.8;

        const amount = base * mult * prestigeMult * heatMult;

        state.resources.widgets += amount;
        state.stats.totalWidgetsMade += amount;
        state.click.count++;
        
        // Heat generation from manual clicks
        // Increases if you click too fast (maybe handled by caller? nah simple here)
        state.resources.heat += 0.05 * amount; 
        if (state.resources.heat > 100) state.resources.heat = 100;

        return amount;
    },

    // Called when player clicks "Sell Widget"
    clickSell: () => {
        const state = gameState.get();
        const base = state.click.basePower;
        const mult = state.click.multiplier;
        
        const prestigeMult = 1 + (state.resources.influence * 0.1);
        
        // Selling is manual too
        const amount = base * mult; // Amount of widgets to attempt to sell

        if (state.resources.widgets > 0) {
            let toSell = amount;
            if (toSell > state.resources.widgets) toSell = state.resources.widgets;

            state.resources.widgets -= toSell;
            
            const price = 1; 
            const revenue = toSell * price * prestigeMult;
            
            state.resources.money += revenue;
            state.stats.totalMoneyEarned += revenue;
            return revenue;
        }
        return 0;
    }
};
