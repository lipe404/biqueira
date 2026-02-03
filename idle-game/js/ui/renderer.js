import { gameState } from "../core/gameState.js";
import { EventManager, EVENTS } from "../core/eventManager.js";
import { Formatter } from "../utils/formatting.js";

// Sub-renderers
import { ResourcesRenderer } from "./renderers/ResourcesRenderer.js";
import { NPCRenderer } from "./renderers/NPCRenderer.js";
import { UpgradesRenderer } from "./renderers/UpgradesRenderer.js";
import { LogsRenderer } from "./renderers/LogsRenderer.js";
import { FeedbackRenderer } from "./renderers/FeedbackRenderer.js";

/**
 * Renderer - Main UI rendering module.
 * Delegates specific rendering tasks to sub-renderers.
 */
export const Renderer = {
  // Cache DOM elements
  elements: {},

  /**
   * Initialize the renderer.
   * Caches DOM elements and subscribes to state changes.
   */
  init: () => {
    Renderer.elements = {
      money: document.getElementById("money"),
      moneyRate: document.getElementById("money-rate"),
      widgets: document.getElementById("widgets"),
      widgetRate: document.getElementById("widget-rate"),
      heatVal: document.getElementById("heat-val"),
      heatBar: document.getElementById("heat-bar"),
      clickPower: document.getElementById("click-power"),
      influence: document.getElementById("influence-display"),
      playtime: document.getElementById("playtime"),
      npcsList: document.getElementById("npcs-list"),
      upgradesList: document.getElementById("upgrades-list"),
      logsList: document.getElementById("game-logs"),
      penaltyOverlay: document.getElementById("penalty-overlay"),
    };

    // Initial Render of Static Lists
    NPCRenderer.renderList(Renderer.elements.npcsList);

    // Subscribe to State Changes (Observer Pattern)
    gameState.subscribe(Renderer.render);

    // Listen to specific events (EventManager)
    EventManager.on(EVENTS.RISK_PENALTY, () => FeedbackRenderer.showPenalty(Renderer.elements));
    EventManager.on(EVENTS.RANDOM_EVENT, Renderer.logEvent);
  },

  /**
   * Main render function.
   * Called automatically when state changes (via Observer).
   * @param {Object} [stateData] - The current game state. If null, fetches from gameState.
   */
  render: (stateData) => {
    // If called directly without args, get state (fallback)
    const state = stateData || gameState.get();
    const els = Renderer.elements;

    // Delegate to sub-renderers
    ResourcesRenderer.render(state, els, Formatter.formatNumber, Formatter.formatCurrency, Formatter.formatTime);
    NPCRenderer.render(state, els, Formatter.formatCurrency);
    UpgradesRenderer.render(state, els, Formatter.formatCurrency);
    LogsRenderer.render(state, els);
    FeedbackRenderer.render(state, els);
  },

  /**
   * Log an event to the console.
   * @param {Object} data - Event data.
   */
  logEvent: (data) => {
    console.log("Event Log:", data);
  },
};
