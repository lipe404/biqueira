import { NPCS } from "../../data/npcs.js";
import { MathUtils } from "../../utils/math.js";

export const NPCRenderer = {
  renderList: (container) => {
    container.innerHTML = "";

    for (const key in NPCS) {
      const npc = NPCS[key];
      const div = document.createElement("div");
      div.className = "list-item npc-item";
      div.id = `npc-${npc.id}`;
      div.dataset.id = npc.id; // For binding

      // Simple icon logic (can be expanded)
      const icon = "👤"; // Default
      
      div.innerHTML = `
                <div class="item-header">
                    <span class="icon-float">${icon}</span>
                    <span>${npc.name}</span>
                    <span class="item-count" id="count-${npc.id}">0</span>
                </div>
                <div class="item-cost" id="cost-${npc.id}">$0</div>
                <div class="item-desc">${npc.description}</div>
                <div class="item-stats">
                    <small>Prod: ${npc.baseProduction}/s | Risco: ${npc.baseRisk}/s</small>
                </div>
            `;
      container.appendChild(div);
    }
  },

  render: (state, elements, formatCurrency) => {
    const multiplier = state.settings?.buyMultiplier || 1;

    for (const key in NPCS) {
      const npc = NPCS[key];
      const count = state.automation.npcs[key] || 0;
      
      const discount = (state.discounts?.global || 0) + (state.discounts?.npcs?.[key] || 0);
      
      let cost = 0;
      let quantity = 1;
      let label = "";

      if (multiplier === 'MAX') {
          quantity = MathUtils.calculateMaxAffordable(npc.baseCost, npc.costMultiplier, count, state.resources.money, discount);
          // Show cost for AT LEAST 1 if max is 0, so user knows next price
          const displayQuantity = Math.max(1, quantity);
          cost = MathUtils.calculateBatchCost(npc.baseCost, npc.costMultiplier, count, displayQuantity, discount);
          
          if (quantity > 0) {
             label = ` (x${quantity})`;
          } else {
             label = " (x1)"; // Show next one price
          }
      } else {
          quantity = multiplier;
          cost = MathUtils.calculateBatchCost(npc.baseCost, npc.costMultiplier, count, quantity, discount);
          if (quantity > 1) label = ` (x${quantity})`;
      }

      const el = document.getElementById(`npc-${npc.id}`);
      if (!el) continue;

      // Update text
      document.getElementById(`count-${npc.id}`).textContent = count;
      document.getElementById(`cost-${npc.id}`).textContent =
        formatCurrency(cost) + label;

      // Update availability/affordability
      const canAfford = state.resources.money >= cost;
      
      // For MAX mode, if quantity > 0, we can afford.
      // But if quantity is 0, we show cost of 1 and we CANNOT afford it.
      // logic above: if MAX and qty=0, cost is for 1. money < cost(1). So canAfford is false. Correct.
      
      if (canAfford) {
        el.classList.add("affordable");
        el.classList.remove("locked");
        el.setAttribute("aria-disabled", "false");
      } else {
        el.classList.remove("affordable");
        el.classList.add("locked"); // Optional: just dim it
        el.setAttribute("aria-disabled", "true");
      }
      
      // Update ARIA label for accessibility
      el.setAttribute("aria-label", `Contratar ${npc.name}. Custo: ${formatCurrency(cost)}. Possui: ${count}.`);
    }
  }
};
