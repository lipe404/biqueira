
import { gameState } from '../../js/core/gameState.js';

describe('GameState', () => {
  beforeEach(() => {
    gameState.reset('HARD');
  });

  test('initializes with default values', () => {
    const state = gameState.get();
    expect(state.resources.money).toBe(0);
    expect(state.resources.widgets).toBe(0);
    expect(state.click.count).toBe(0);
  });

  test('updates state correctly', () => {
    const state = gameState.get();
    state.resources.money = 100;
    expect(gameState.get().resources.money).toBe(100);
  });

  test('validateSchema repairs missing keys', () => {
    const brokenData = {
      resources: {
        money: 500
        // Missing widgets, heat, influence
      }
      // Missing other top-level keys
    };

    const validated = gameState.validateSchema(brokenData);
    
    expect(validated.resources.money).toBe(500);
    expect(validated.resources.widgets).toBe(0); // Restored from default
    expect(validated.production).toBeDefined(); // Restored top-level
  });

  test('validateSchema handles recursive objects', () => {
     const brokenData = {
      resources: {
        money: 100
      },
      automation: {
          // Missing npcs
      }
    };
    
    const validated = gameState.validateSchema(brokenData);
    expect(validated.automation.npcs).toBeDefined();
  });

  test('hard reset restores defaults', () => {
    const state = gameState.get();
    state.resources.money = 1000;
    gameState.reset('HARD');
    
    expect(gameState.get().resources.money).toBe(0);
  });

  test('prestige reset keeps influence and stats', () => {
    const state = gameState.get();
    state.resources.money = 1000;
    state.resources.influence = 50;
    state.stats.totalMoneyEarned = 5000;
    
    gameState.reset('PRESTIGE', { gainedInfluence: 10 });
    
    const newState = gameState.get();
    expect(newState.resources.money).toBe(0); // Reset
    expect(newState.resources.influence).toBe(60); // Kept + Gained
    expect(newState.stats.totalMoneyEarned).toBe(5000); // Kept
  });
});
