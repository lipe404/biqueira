export class DataLoader {
  static async loadJSON(path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load JSON from ${path}: ${response.statusText}`);
    }
    return await response.json();
  }

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
