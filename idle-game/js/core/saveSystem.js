import { gameState } from "./gameState.js";
import { EventManager, EVENTS } from "./eventManager.js";

const SAVE_KEY = "IDLE_GAME_SAVE_V1";

export const SaveSystem = {
  save: () => {
    try {
      const data = gameState.get();
      data.meta.lastSaveTime = Date.now();

      // Simple Base64 encoding to prevent accidental edits
      // For a real game, you might want a checksum or more complex encoding
      const json = JSON.stringify(data);
      const encoded = btoa(json);

      localStorage.setItem(SAVE_KEY, encoded);
      console.log(
        "Game saved at " +
          new Date(data.meta.lastSaveTime).toLocaleTimeString(),
      );
      
      EventManager.emit(EVENTS.SAVE_GAME, { time: data.meta.lastSaveTime });

      return true;
    } catch (e) {
      console.error("Failed to save game:", e);
      return false;
    }
  },

  load: () => {
    try {
      const encoded = localStorage.getItem(SAVE_KEY);
      if (!encoded) {
        console.log("No save game found.");
        return false;
      }

      const json = atob(encoded);
      const data = JSON.parse(json);

      gameState.load(data);
      console.log("Game loaded successfully.");

      EventManager.emit(EVENTS.LOAD_GAME, { data });

      // Calculate offline progress
      SaveSystem.calculateOfflineProgress(data.meta.lastSaveTime);

      return true;
    } catch (e) {
      console.error("Failed to load save (corruption?):", e);
      return false;
    }
  },

  reset: () => {
    localStorage.removeItem(SAVE_KEY);
    location.reload();
  },

  calculateOfflineProgress: (lastTime) => {
    const now = Date.now();
    const diff = now - lastTime;

    // Convert to seconds
    const seconds = Math.floor(diff / 1000);

    if (seconds > 60) {
      console.log(`You were away for ${seconds} seconds.`);
      // This will be handled by the IdleSystem, we just store the time diff
      // or trigger an event. For now, let's store it in a temporary state
      // that the IdleSystem can check on init.
      gameState.get().meta.offlineSeconds = seconds;
    }
  },
};
