/**
 * Formatter - Utility functions for formatting numbers and text.
 */
export const Formatter = {
  /**
   * Format a number with K/M suffixes.
   * @param {number} num - Number to format.
   * @returns {string} Formatted string.
   */
  formatNumber: (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
    if (num >= 1000) return (num / 1000).toFixed(2) + "k";
    return Math.floor(num).toString();
  },

  /**
   * Format a number as currency (BRL).
   * @param {number} num - Number to format.
   * @returns {string} Formatted currency string.
   */
  formatCurrency: (num) => {
    return (
      "$" +
      num.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  },

  /**
   * Format milliseconds into HH:MM:SS.
   * @param {number} ms - Time in milliseconds.
   * @returns {string} Formatted time string.
   */
  formatTime: (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  },
};
