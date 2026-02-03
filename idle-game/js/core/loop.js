import { gameState } from "./gameState.js";
import { SaveSystem } from "./saveSystem.js";

export class GameLoop {
  constructor() {
    this.lastTime = 0;
    this.systems = [];
    this.running = false;
    this.accumulatedTime = 0;
    this.autoSaveTimer = 0;
    this.fps = 30; // Logic update rate
    this.step = 1 / this.fps;
  }

  registerSystem(system) {
    this.systems.push(system);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame((time) => this.tick(time));
    console.log("Game Loop Started");
  }

  stop() {
    this.running = false;
  }

  tick(currentTime) {
    if (!this.running) return;

    // Calculate delta time in seconds
    let dt = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    // Cap dt to avoid spiral of death if tab is inactive for long
    if (dt > 1) dt = 1;

    this.accumulatedTime += dt;

    // Fixed time step for logic updates
    while (this.accumulatedTime >= this.step) {
      this.update(this.step);
      this.accumulatedTime -= this.step;
    }

    // Notify observers of state changes (Observer Pattern)
    gameState.notify();

    // Render (pass interpolation alpha if needed, but simple DOM updates usually just take latest state)
    this.render();

    requestAnimationFrame((time) => this.tick(time));
  }

  update(dt) {
    // Update all systems
    this.systems.forEach((system) => {
      if (system.update) system.update(dt);
    });

    // Handle Auto-save
    this.autoSaveTimer += dt;
    const saveInterval = gameState.get().settings.autoSaveInterval / 1000;
    if (this.autoSaveTimer >= saveInterval) {
      SaveSystem.save();
      this.autoSaveTimer = 0;
    }
  }

  render() {
    // Render all systems
    this.systems.forEach((system) => {
      if (system.render) system.render();
    });
  }
}

export const gameLoop = new GameLoop();
