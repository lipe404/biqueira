import { CONFIG } from "../../core/config.js";

export const ResourcesRenderer = {
  render: (state, elements, formatNumber, formatCurrency, formatTime) => {
    const els = elements;

    // Resources
    els.money.textContent = formatCurrency(state.resources.money);
    els.moneyRate.textContent = `(+$${formatNumber(state.production.moneyPerSecond)}/s)`;

    els.widgets.textContent = formatNumber(state.resources.widgets);
    els.widgetRate.textContent = `(+${formatNumber(state.production.widgetsPerSecond)}/s)`;

    els.heatVal.textContent = Math.floor(state.resources.heat) + "%";
    els.heatBar.style.width = state.resources.heat + "%";

    // Dynamic color for heat
    if (state.resources.heat > CONFIG.HEAT.THRESHOLD_HIGH)
      els.heatBar.style.backgroundColor = "var(--accent-red)";
    else if (state.resources.heat > CONFIG.HEAT.THRESHOLD_MEDIUM)
      els.heatBar.style.backgroundColor = "var(--accent-gold)";
    else els.heatBar.style.backgroundColor = "var(--accent-green)";

    els.clickPower.textContent = formatNumber(
      state.click.basePower * state.click.multiplier,
    );
    els.influence.textContent = `RESPEITO: ${state.resources.influence}`;

    // Playtime
    const ms = Date.now() - state.meta.startTime;
    els.playtime.textContent = formatTime(ms);
  }
};
