import { GameData } from "../main.js";

/**
 * NPCS - Proxy object to access loaded NPC data.
 * Allows synchronous access to data loaded asynchronously.
 */
export const NPCS = new Proxy({}, {
  get: (target, prop) => {
    return GameData.npcs[prop];
  },
  ownKeys: (target) => {
    return Object.keys(GameData.npcs);
  },
  getOwnPropertyDescriptor: (target, prop) => {
    return Object.getOwnPropertyDescriptor(GameData.npcs, prop);
  }
});
