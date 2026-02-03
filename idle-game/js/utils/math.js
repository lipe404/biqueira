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

  /**
   * Safe number validation to prevent Infinity/NaN.
   * @param {number} num - The number to validate.
   * @param {number} fallback - Fallback value if invalid (default 0).
   * @returns {number} The valid number or fallback.
   */
  safe: (num, fallback = 0) => {
    if (typeof num !== 'number' || isNaN(num) || !isFinite(num)) {
      return fallback;
    }
    return num;
  },

  /**
   * Calculate exponential cost with optional discount.
   * @param {number} base - Base cost.
   * @param {number} multiplier - Growth factor (e.g. 1.15).
   * @param {number} count - Current quantity owned.
   * @param {number} discount - Discount percentage (0.0 to 1.0).
   * @returns {number} Final integer cost.
   */
  calculateCost: (base, multiplier, count, discount = 0) => {
    let cost = base * Math.pow(multiplier, count);
    if (discount > 0) {
      cost *= (1 - discount);
    }
    return Math.floor(cost);
  }
};
