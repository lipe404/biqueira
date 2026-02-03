import { gameState } from '../core/gameState.js';

export const ClickSystem = {
    // Called when player clicks "Make Widget"
    clickMake: () => {
        const state = gameState.get();
        const base = state.click.basePower;
        const mult = state.click.multiplier;
        const amount = base * mult;

        state.resources.widgets += amount;
        state.stats.totalWidgetsMade += amount;
        state.click.count++;
        
        // Heat generation from manual clicks (small)
        state.resources.heat += 0.01 * amount; 
        if (state.resources.heat > 100) state.resources.heat = 100;

        return amount;
    },

    // Called when player clicks "Sell Widget"
    clickSell: () => {
        const state = gameState.get();
        // Selling power might be different, but let's assume 1 click = 1 sale batch
        // Or maybe selling is always 1:1 with click power?
        const base = state.click.basePower;
        const mult = state.click.multiplier; // Use same multiplier for now
        const amount = base * mult;

        if (state.resources.widgets >= amount) {
            state.resources.widgets -= amount;
            const price = 1; // Base price $1
            const revenue = amount * price; // Add market multipliers later
            
            state.resources.money += revenue;
            state.stats.totalMoneyEarned += revenue;
            return revenue;
        } else if (state.resources.widgets > 0) {
            // Sell remaining
            const remaining = state.resources.widgets;
            state.resources.widgets = 0;
            const revenue = remaining * 1;
            state.resources.money += revenue;
            state.stats.totalMoneyEarned += revenue;
            return revenue;
        }
        return 0;
    }
};
