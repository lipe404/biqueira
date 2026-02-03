import { gameState } from "./core/gameState.js";
import { gameLoop } from "./core/loop.js";
import { SaveSystem } from "./core/saveSystem.js";

import { ClickSystem } from "./systems/clickSystem.js";
import { AutomationSystem } from "./systems/automationSystem.js";
import { RiskSystem } from "./systems/riskSystem.js";
import { IdleSystem } from "./systems/idleSystem.js";
import { EventSystem } from "./systems/eventSystem.js";
import { PrestigeSystem } from "./systems/prestigeSystem.js";

import { Renderer } from "./ui/renderer.js";
import { Bindings } from "./ui/bindings.js";

// Bootstrap
window.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing Generic Corp...");

  // 1. Load Save
  SaveSystem.load();

  // 2. Initialize UI
  Renderer.init();
  Bindings.init();

  // 3. Register Systems to Loop
  // Order matters for dependencies
  gameLoop.registerSystem(IdleSystem); // Run once to process offline
  gameLoop.registerSystem(AutomationSystem);
  gameLoop.registerSystem(RiskSystem);
  gameLoop.registerSystem(EventSystem);
  // PrestigeSystem is triggered manually, not per frame

  // UI Renderer is a system too
  gameLoop.registerSystem({
    render: () => Renderer.render(),
  });

  // 4. Start Loop
  gameLoop.start();
});
