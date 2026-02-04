export const CONFIG = {
  // Game Loop
  FPS: 30,
  AUTO_SAVE_INTERVAL: 30000,

  // Automation
  PRESTIGE_MULTIPLIER_FACTOR: 0.1, // +10% per influence point
  
  // Heat / Risk
  HEAT: {
    MAX: 100,
    THRESHOLD_HIGH: 80,
    THRESHOLD_MEDIUM: 50,
    COOLING_RATE_BASE: 1.0,
    COOLING_RATE_MEDIUM: 2.0,
    COOLING_RATE_HIGH: 4.0,
    GENERATION_PER_CLICK: 0.05,
    PENALTY_THRESHOLD: 100,
    RESET_VALUE: 60,
    PENALTY_DURATION: 15,
    WIDGET_LOSS_FACTOR: 0.5,
    MONEY_LOSS_FACTOR: 0.3,
    PENALTY_MULT_HIGH: 0.7,
    PENALTY_MULT_MEDIUM: 0.9,
  },

  // Economy
  ECONOMY: {
    BASE_PRICE: 1,
  },

  // Click
  CLICK: {
    HEAT_THRESHOLD_HIGH: 90,
    HEAT_THRESHOLD_MEDIUM: 60,
    HEAT_MULT_HIGH: 0.5,
    HEAT_MULT_MEDIUM: 0.8,
  },

  // Events
  EVENTS: {
    CHECK_INTERVAL: 5,
    GLOBAL_COOLDOWN: 30000,
    LOG_LIMIT: 20,
  },

  // Prestige
  PRESTIGE: {
    MONEY_PER_INFLUENCE: 10000,
  },

  // Idle
  IDLE: {
    MAX_OFFLINE_SECONDS: 8 * 60 * 60, // 8 hours
  },

  // Progression Ranks (Rank da Quebrada)
  RANKS: [
    { id: 0, name: "Vapor", req: 0, bonus: 0 },
    { id: 1, name: "Aviãozinho", req: 1000, bonus: 0.05 }, // +5% global prod
    { id: 2, name: "Fogueteiro", req: 10000, bonus: 0.10 }, // +10%
    { id: 3, name: "Gerente da Boca", req: 100000, bonus: 0.20 }, // +20%
    { id: 4, name: "Dono do Morro", req: 1000000, bonus: 0.50 }, // +50%
    { id: 5, name: "Patrão", req: 10000000, bonus: 1.00 }, // +100%
    { id: 6, name: "Lenda Urbana", req: 100000000, bonus: 2.00 } // +200%
  ]
};
