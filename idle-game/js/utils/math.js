/**
 * MathUtils - Helper functions for mathematical operations.
 */
export const MathUtils = {
  /**
   * Clamp a value between min and max.
   * @param {number} val - Value to clamp.
   * @param {number} min - Minimum value.
   * @param {number} max - Maximum value.
   * @returns {number} Clamped value.
   */
  clamp: (val, min, max) => Math.min(Math.max(val, min), max),
  
  /**
   * Generate a random float between min and max.
   * @param {number} min - Minimum value.
   * @param {number} max - Maximum value.
   * @returns {number} Random float.
   */
  randomRange: (min, max) => Math.random() * (max - min) + min,
  
  /**
   * Generate a random integer between min and max (inclusive).
   * @param {number} min - Minimum value.
   * @param {number} max - Maximum value.
   * @returns {number} Random integer.
   */
  randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  
  /**
   * Check if a random event occurs based on a percentage chance.
   * @param {number} percentage - Chance between 0 and 1.
   * @returns {boolean} True if the event occurs.
   */
  chance: (percentage) => Math.random() < percentage,
};
