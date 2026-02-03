import { gameState } from "./gameState.js";
import { SaveSystem } from "./saveSystem.js";
import { CONFIG } from "./config.js";

/**
 * GameLoop - Manages the game update cycle.
 * Uses a fixed time step for logic updates and variable time step for rendering.
 */
export class GameLoop {
  constructor() {
    this.lastTime = 0;
    this.systems = [];
    this.running = false;
    this.accumulatedTime = 0;
    this.autoSaveTimer = 0;
    this.fps = CONFIG.FPS; // Logic update rate
    this.step = 1 / this.fps;
  }

  /**
   * Register a system to be updated and rendered by the loop.
   * @param {Object} system - System object with optional update(dt) and render() methods.
   */
  registerSystem(system) {
    this.systems.push(system);
  }

  /**
   * Start the game loop.
   */
  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame((time) => this.tick(time));
    console.log("Game Loop Started");
  }

  /**
   * Stop the game loop.
   */
  stop() {
    this.running = false;
  }

  /**
   * Main loop tick function.
   * @param {number} currentTime - Current timestamp from requestAnimationFrame.
   */
  tick(currentTime) {
    if (!this.running) return;

    // Calculate delta time in seconds
    let dt = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    // Cap dt to avoid spiral of death if tab is inactive for long
    if (dt > 1) dt = 1;

    this.accumulatedTime += dt;

    // SPIRAL OF DEATH PROTECTION
    // If accumulated time gets too high (more than 1 second, i.e., ~30-60 frames),
    // we discard the backlog to prevent the game from freezing while trying to catch up.
    if (this.accumulatedTime > 1.0) {
        console.warn("Game loop death spiral detected! Skipping frames. Accumulated:", this.accumulatedTime);
        this.accumulatedTime = 1.0;
    }

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

  /**
   * Update all registered systems.
   * @param {number} dt - Delta time in seconds.
   */
  update(dt) {
    // Update all systems
    this.systems.forEach((system) => {
      try {
        if (system.update) system.update(dt);
      } catch (e) {
        console.error(`Error updating system ${system.constructor.name || 'Anonymous'}:`, e);
      }
    });

    // Handle Auto-save
    this.autoSaveTimer += dt;
    const saveInterval = CONFIG.AUTO_SAVE_INTERVAL / 1000;
    if (this.autoSaveTimer >= saveInterval) {
      SaveSystem.save();
      this.autoSaveTimer = 0;
    }
  }

  /**
   * Render all registered systems.
   */
  render() {
    // Render all systems
    this.systems.forEach((system) => {
      try {
        if (system.render) system.render();
      } catch (e) {
        console.error(`Error rendering system ${system.constructor.name || 'Anonymous'}:`, e);
      }
    });
  }
}

export const gameLoop = new GameLoop();
