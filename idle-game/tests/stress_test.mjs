
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. Mock Browser Environment
global.window = {
  addEventListener: () => {},
  Simulator: null,
  gameState: { get: () => ({}) } // Mock for safety
};

global.document = {
  getElementById: () => ({}),
  body: {
    style: {},
    classList: { add: () => {} }
  }
};

global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};

global.location = { reload: () => {} };

if (!global.btoa) global.btoa = (str) => Buffer.from(str).toString('base64');
if (!global.atob) global.atob = (str) => Buffer.from(str, 'base64').toString('binary');

// 2. Load Data
const npcsPath = path.join(__dirname, '../assets/data/npcs.json');
const npcsData = JSON.parse(fs.readFileSync(npcsPath, 'utf8'));

// 3. Import Modules
const { GameData } = await import('../js/main.js');
const { Simulator } = await import('../js/utils/simulator.js');

// 4. Setup Data
GameData.npcs = npcsData;

// 5. Run Test
console.log("Starting Stress Test...");
try {
  // Run for 24 hours (enough to trigger thousands of penalties and check stability)
  Simulator.runStressTest(24);
  console.log("Test execution completed.");
} catch (error) {
  console.error("Test execution failed:", error);
  process.exit(1);
}
