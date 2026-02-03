import { gameState } from "../core/gameState.js";

export const RiskSystem = {
  update: (dt) => {
    const state = gameState.get();

    // Check if we are already in a penalty state (Cooldown)
    if (state.riskPenaltyTime > 0) {
      state.riskPenaltyTime -= dt;
      if (state.riskPenaltyTime <= 0) {
        state.riskPenaltyTime = 0;
        // Notify UI: Penalty over
        if (!state.logs) state.logs = [];
        state.logs.unshift({
          time: Date.now(),
          message: `POEIRA BAIXOU: De volta à ativa. Cuidado com o calor.`,
        });
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
    state.resources.heat = 60; // Doesn't reset fully, stays dangerous

    // Penalty: Lose 50% of widgets and 30% of money
    const lostWidgets = Math.floor(state.resources.widgets * 0.5);
    const lostMoney = Math.floor(state.resources.money * 0.3);

    state.resources.widgets -= lostWidgets;
    state.resources.money -= lostMoney;

    // Block production for 15 seconds
    state.riskPenaltyTime = 15;

    // Log/Notify
    console.log("RISK PENALTY TRIGGERED!");
    if (!state.logs) state.logs = [];
    state.logs.unshift({
      time: Date.now(),
      message: `MOIOU! A CASA CAIU! A polícia levou ${lostWidgets} mercadorias e $${lostMoney}. Parado por 15s.`,
    });

    // Keep log size small
    if (state.logs.length > 20) state.logs.pop();
  },
};
