/**
 * Formatter - Utility functions for formatting numbers and text.
 */
export const Formatter = {
  /**
   * Format a number with suffixes (k, M, B, T, etc.).
   * @param {number} num - Number to format.
   * @returns {string} Formatted string.
   */
  formatNumber: (num) => {
    if (num < 1000) return Math.floor(num).toString();

    const suffixes = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
    // Use log10 to find magnitude safely
    const exponent = Math.floor(Math.log10(num));
    const suffixNum = Math.floor(exponent / 3);

    // Safety for very large numbers beyond our suffixes
    if (suffixNum >= suffixes.length) {
        return num.toExponential(2);
    }

    const divisor = Math.pow(1000, suffixNum);
    let shortValue = num / divisor;
    
    // Show 2 decimal places if it's not an integer, otherwise 0
    // But for consistent width, maybe always 2? 
    // Let's use flexible: up to 2 decimals.
    // toFixed(2) returns string "1.00", parseFloat turns it back to number 1.
    // If we want fixed layout, maybe keep string? 
    // User asked to "Escalar UI", so "1.00M" is safer than "1M" vs "1.23M" jumping around.
    // Let's force 2 decimals for M+ to keep width stable.
    
    if (suffixNum >= 2) { // M and above
        return shortValue.toFixed(2) + suffixes[suffixNum];
    }
    
    // For k, keep it simple
    return parseFloat(shortValue.toFixed(2)) + suffixes[suffixNum];
  },

  /**
   * Format a number as currency (BRL).
   * Uses short format for large numbers to preserve UI layout.
   * @param {number} num - Number to format.
   * @returns {string} Formatted currency string.
   */
  formatCurrency: (num) => {
    if (num >= 1000000) {
        return "$" + Formatter.formatNumber(num);
    }
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
