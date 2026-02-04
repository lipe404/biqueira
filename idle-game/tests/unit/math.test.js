
import { MathUtils } from '../../js/utils/math.js';

describe('MathUtils', () => {
  describe('clamp', () => {
    test('clamps value within range', () => {
      expect(MathUtils.clamp(5, 0, 10)).toBe(5);
    });

    test('clamps value to min', () => {
      expect(MathUtils.clamp(-5, 0, 10)).toBe(0);
    });

    test('clamps value to max', () => {
      expect(MathUtils.clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('safe', () => {
    test('returns number if valid', () => {
      expect(MathUtils.safe(100)).toBe(100);
    });

    test('returns fallback (0) for NaN', () => {
      expect(MathUtils.safe(NaN)).toBe(0);
    });

    test('returns fallback (0) for Infinity', () => {
      expect(MathUtils.safe(Infinity)).toBe(0);
    });

    test('returns custom fallback', () => {
      expect(MathUtils.safe(NaN, 5)).toBe(5);
    });
  });

  describe('calculateCost', () => {
    test('calculates base cost correctly', () => {
      // 10 * 1.15^0 = 10
      expect(MathUtils.calculateCost(10, 1.15, 0)).toBe(10);
    });

    test('calculates exponential cost correctly', () => {
      // 10 * 2^2 = 40
      expect(MathUtils.calculateCost(10, 2, 2)).toBe(40);
    });

    test('applies discount correctly', () => {
      // 100 * 1^0 * (1 - 0.1) = 90
      expect(MathUtils.calculateCost(100, 1, 0, 0.1)).toBe(90);
    });

    test('floors the result', () => {
      // 10 * 1.5^1 = 15
      // 10 * 1.15^1 = 11.5 -> 11
      expect(MathUtils.calculateCost(10, 1.15, 1)).toBe(11);
    });
  });

  describe('chance', () => {
    test('returns true for 100% chance', () => {
      expect(MathUtils.chance(1.1)).toBe(true);
    });

    test('returns false for 0% chance', () => {
      expect(MathUtils.chance(-0.1)).toBe(false);
    });
  });
});
