import { GameData } from "../main.js";

// Proxy to access GameData.npcs seamlessly
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
