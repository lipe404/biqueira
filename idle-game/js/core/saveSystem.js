import { gameState } from "./gameState.js";
import { EventManager, EVENTS } from "./eventManager.js";

const SAVE_KEY = "IDLE_GAME_SAVE_V1";

/**
 * SaveSystem - Handles saving and loading game state to localStorage.
 */
export const SaveSystem = {
  /**
   * Save the current game state to localStorage.
   * @returns {boolean} True if save was successful, false otherwise.
   */
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

  /**
   * Export the save as a JSON file download.
   */
  exportSave: () => {
    try {
      const data = gameState.get();
      // Ensure we have the latest save time
      data.meta.lastSaveTime = Date.now();
      
      const json = JSON.stringify(data, null, 2); // Pretty print for readability
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = `biqueira_save_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log("Save exported successfully.");
      return true;
    } catch (e) {
      console.error("Failed to export save:", e);
      return false;
    }
  },

  /**
   * Import a save from a JSON string.
   * @param {string} jsonContent - The JSON string content of the save file.
   * @returns {boolean} True if import was successful.
   */
  importSave: (jsonContent) => {
    try {
      const data = JSON.parse(jsonContent);
      
      // Validate schema
      const validatedData = gameState.validateSchema(data);
      
      // Load into state
      gameState.load(validatedData);
      
      // Save to local storage immediately
      SaveSystem.save();
      
      console.log("Save imported successfully.");
      EventManager.emit(EVENTS.LOAD_GAME, { data: validatedData });
      
      // Calculate offline progress if applicable
      if (validatedData.meta && validatedData.meta.lastSaveTime) {
        SaveSystem.calculateOfflineProgress(validatedData.meta.lastSaveTime);
      }
      
      return true;
    } catch (e) {
      console.error("Failed to import save:", e);
      alert("Erro ao importar save: Arquivo inválido ou corrompido.");
      return false;
    }
  },

  /**
   * Get metadata from the current local save without loading it.
   * @returns {Object|null} Metadata object or null if no save exists.
   */
  getMetadata: () => {
    try {
      const encoded = localStorage.getItem(SAVE_KEY);
      if (!encoded) return null;

      const json = atob(encoded);
      const data = JSON.parse(json);
      
      return {
        money: data.resources.money || 0,
        playTime: data.meta.totalPlayTime || 0,
        saveTime: data.meta.lastSaveTime || Date.now(),
        rank: data.progression ? data.progression.title : "Vapor"
      };
    } catch (e) {
      console.error("Failed to read save metadata:", e);
      return null;
    }
  },

  /**
   * Load the game state from localStorage.
   * @returns {boolean} True if load was successful, false otherwise.
   */
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

  /**
   * Delete the save and reload the page.
   */
  reset: () => {
    localStorage.removeItem(SAVE_KEY);
    location.reload();
  },

  /**
   * Calculate time elapsed since last save.
   * @param {number} lastTime - Timestamp of the last save.
   */
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
