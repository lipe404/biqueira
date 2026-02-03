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
   * Load an image from the specified path.
   * @param {string} path - Path to the image file.
   * @returns {Promise<HTMLImageElement>} The loaded image element.
   */
  static loadImage(path) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(new Error(`Failed to load image from ${path}`));
      img.src = path;
    });
  }

  /**
   * Load all required game data.
   * @returns {Promise<Object>} Object containing all loaded data.
   */
  static async loadAll() {
    console.log("Loading game data...");
    try {
      // Only wait for critical data (JSON logic)
      const npcs = await DataLoader.loadJSON("./assets/data/npcs.json");
      
      console.log("Critical data loaded successfully");
      return { npcs };
    } catch (error) {
      console.error("Error loading data:", error);
      return { npcs: {} }; 
    }
  }
}
