
import { Formatter } from '../../js/utils/formatting.js';

describe('Formatter', () => {
  describe('formatNumber', () => {
    test('formats small numbers correctly', () => {
      expect(Formatter.formatNumber(0)).toBe("0");
      expect(Formatter.formatNumber(999)).toBe("999");
    });

    test('formats thousands (k)', () => {
      expect(Formatter.formatNumber(1000)).toBe("1k");
      expect(Formatter.formatNumber(1500)).toBe("1.5k");
    });

    test('formats millions (M)', () => {
      expect(Formatter.formatNumber(1000000)).toBe("1.00M");
      expect(Formatter.formatNumber(1500000)).toBe("1.50M");
    });

    test('formats billions (B)', () => {
      expect(Formatter.formatNumber(1000000000)).toBe("1.00B");
      expect(Formatter.formatNumber(1234000000)).toBe("1.23B");
    });

    test('formats trillions (T)', () => {
      expect(Formatter.formatNumber(1e12)).toBe("1.00T");
    });

    test('formats large numbers (Qa, Qi, Sx)', () => {
      expect(Formatter.formatNumber(1e15)).toBe("1.00Qa");
      expect(Formatter.formatNumber(1e18)).toBe("1.00Qi");
      expect(Formatter.formatNumber(1e21)).toBe("1.00Sx");
    });

    test('formats huge numbers (Dc)', () => {
      expect(Formatter.formatNumber(1e33)).toBe("1.00Dc");
    });

    test('falls back to exponential for very large numbers', () => {
      expect(Formatter.formatNumber(1e36)).toBe("1.00e+36");
    });
  });

  describe('formatCurrency', () => {
    test('formats small numbers with locale (pt-BR)', () => {
      // Assuming Node environment has pt-BR locale support or similar fallback
      // We expect standard formatting for < 1M
      const result = Formatter.formatCurrency(1000);
      expect(result).toMatch(/^\$1\.000,00$/); 
    });

    test('formats millions with dollar sign and suffix', () => {
      expect(Formatter.formatCurrency(1000000)).toBe("$1.00M");
    });
  });
});
