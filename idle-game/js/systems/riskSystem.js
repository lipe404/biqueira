import { gameState } from '../core/gameState.js';

export const RiskSystem = {
    update: (dt) => {
        const state = gameState.get();
        
        // Check if we are already in a penalty state (Cooldown)
        if (state.riskPenaltyTime > 0) {
            state.riskPenaltyTime -= dt;
            if (state.riskPenaltyTime <= 0) {
                state.riskPenaltyTime = 0;
                // Notify UI: Penalty over
            }
            return; // Skip normal risk checks if penalty is active
        }

        // Threshold Check
        if (state.resources.heat >= 100) {
            RiskSystem.triggerPenalty(state);
        }
    },

    triggerPenalty: (state) => {
        // Reset heat
        state.resources.heat = 50; // Don't reset to 0, keeps tension

        // Penalty: Lose 50% of widgets and 20% of money
        const lostWidgets = Math.floor(state.resources.widgets * 0.5);
        const lostMoney = Math.floor(state.resources.money * 0.2);

        state.resources.widgets -= lostWidgets;
        state.resources.money -= lostMoney;

        // Block production for 10 seconds
        state.riskPenaltyTime = 10; 

        // Log/Notify
        console.log('RISK PENALTY TRIGGERED!');
        // Ideally we push this to an event log in the state for UI to pick up
        if (!state.logs) state.logs = [];
        state.logs.unshift({
            time: Date.now(),
            message: `SUSPEITA MÁXIMA! Invasão! Perdeu ${lostWidgets} widgets e $${lostMoney}. Paralisado por 10s.`
        });
        
        // Keep log size small
        if (state.logs.length > 10) state.logs.pop();
    }
};
