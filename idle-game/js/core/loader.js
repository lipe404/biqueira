/**
 * DataLoader - Handles loading of external game data.
 */
export class DataLoader {
  /**
   * Load a JSON file from the specified path.
   * @param {string} path - Path to the JSON file.
   * @returns {Promise<Object>} The parsed JSON data.
   * @throws {Error} If the file cannot be loaded.
   */
  static async loadJSON(path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load JSON from ${path}: ${response.statusText}`);
    }
    return await response.json();
  }

  /**
   * Load all required game data.
   * @returns {Promise<Object>} Object containing all loaded data.
   */
  static async loadAll() {
    console.log("Loading game data...");
    try {
      const npcs = await DataLoader.loadJSON("./assets/data/npcs.json");
      console.log("Data loaded successfully");
      return { npcs };
    } catch (error) {
      console.error("Error loading data:", error);
      return { npcs: {} }; // Return empty structure on failure
    }
  }
}
