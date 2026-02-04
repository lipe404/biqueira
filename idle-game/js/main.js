import { gameState } from "./core/gameState.js";
import { gameLoop } from "./core/loop.js";
import { SaveSystem } from "./core/saveSystem.js";
import { DataLoader } from "./core/loader.js";

import { ClickSystem } from "./systems/clickSystem.js";
import { AutomationSystem } from "./systems/automationSystem.js";
import { RiskSystem } from "./systems/riskSystem.js";
import { IdleSystem } from "./systems/idleSystem.js";
import { EventSystem } from "./systems/eventSystem.js";
import { PrestigeSystem } from "./systems/prestigeSystem.js";
import { ProgressionSystem } from "./systems/progressionSystem.js";

import { Renderer } from "./ui/renderer.js";
import { Bindings } from "./ui/bindings.js";
import { CursorManager } from "./ui/cursorManager.js";
import { Simulator } from "./utils/simulator.js"; // Import Simulator

// Global Data Holder (can be imported by others if needed, or attached to window)
/**
 * Global object to hold loaded static data.
 * @type {Object}
 * @property {Object} npcs - Loaded NPC definitions.
 */
export let GameData = {
  npcs: {}
};

// Bootstrap
window.addEventListener("DOMContentLoaded", async () => {
  console.log("Initializing Generic Corp...");

  // Expose Simulator to global scope for testing
  window.Simulator = Simulator;

  // 0. Load External Data
  const loadedData = await DataLoader.loadAll();
  GameData.npcs = loadedData.npcs;

  // Lazy load background (non-blocking)
  DataLoader.loadImage("./assets/fundo.png")
    .then(img => {
      document.body.style.backgroundImage = `url('${img.src}')`;
      document.body.classList.add('bg-loaded');
    })
    .catch(err => console.warn("Background load failed:", err));

  // 1. Load Save
  SaveSystem.load();

  // 2. Initialize UI
  Renderer.init();
  Bindings.init();
  CursorManager.init();

  // 3. Register Systems to Loop
  // Order matters for dependencies
  const systems = [
    IdleSystem,
    AutomationSystem,
    RiskSystem,
    EventSystem,
    ClickSystem,
    PrestigeSystem,
    ProgressionSystem
  ];

  systems.forEach(system => {
    if (system.init) system.init();
    if (system.update) gameLoop.registerSystem(system);
  });

  // 4. Start Loop
  gameLoop.start();
});
