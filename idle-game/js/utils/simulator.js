import { gameState } from "../core/gameState.js";
import { AutomationSystem } from "../systems/automationSystem.js";
import { RiskSystem } from "../systems/riskSystem.js";
import { CONFIG } from "../core/config.js";
import { NPCS } from "../data/npcs.js";
import { Formatter } from "./formatting.js";

/**
 * Simulator - Tools for stress testing and simulating late game states.
 */
export const Simulator = {
  
  /**
   * Simulates a specific amount of time passing.
   * @param {number} hours - Game hours to simulate.
   */
  simulateTime: (hours) => {
    console.log(`Simulating ${hours} hours...`);
    const dt = 1; // 1 second steps
    const totalSeconds = hours * 3600;
    const start = performance.now();

    // Suppress logs during simulation to improve performance
    const originalLog = console.log;
    console.log = () => {};

    for (let i = 0; i < totalSeconds; i++) {
        AutomationSystem.update(dt);
        RiskSystem.update(dt);
        // We don't update everything to save performance, mainly economy
    }
    
    // Restore logs
    console.log = originalLog;
    
    const end = performance.now();
    console.log(`Simulation complete in ${(end - start).toFixed(2)}ms.`);
    console.log("New State:", gameState.get().resources);
  },

  /**
   * Sets the game state to a "Late Game" scenario.
   */
  setLateGame: () => {
    const state = gameState.get();
    
    // 1. Giant Resources
    state.resources.money = 1e21; // 1 Sx
    state.resources.widgets = 1e15; // 1 Qa
    state.resources.influence = 5000;
    
    // 2. Max Rank
    state.progression.rank = CONFIG.RANKS.length - 1;
    state.progression.title = CONFIG.RANKS[state.progression.rank].name;
    
    // 3. Buy many NPCs
    for (const id in NPCS) {
        state.automation.npcs[id] = 1000;
    }
    
    console.log("Late Game State Set. Money: " + Formatter.formatCurrency(state.resources.money));
  },

  /**
   * Stress test: Run simulation and check for NaNs.
   * @param {number} hours - Hours to simulate (default 720 = 30 days).
   */
  runStressTest: (hours = 720) => {
    Simulator.setLateGame();
    Simulator.simulateTime(hours);
    
    const state = gameState.get();
    const money = state.resources.money;
    
    if (isNaN(money) || !isFinite(money)) {
        console.error("STRESS TEST FAILED: Money is NaN or Infinity!");
    } else {
        console.log("STRESS TEST PASSED: Money is valid (" + Formatter.formatNumber(money) + ")");
    }
  }
};
