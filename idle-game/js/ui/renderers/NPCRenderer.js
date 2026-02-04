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
                    <span class="item-name">${icon} ${npc.name}</span>
                    <span class="item-count" id="count-${npc.id}">0</span>
                </div>
                <div class="item-desc">${npc.description}</div>
                <div class="item-stats">
                    <small>Prod: ${npc.baseProduction}/s | Risco: ${npc.baseRisk}/s</small>
                </div>
                <button class="btn-hire" id="btn-hire-${npc.id}">Contratar</button>
                <div class="hidden" id="cost-${npc.id}"></div>
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
             label = `x${quantity}`;
          } else {
             label = "x1"; // Show next one price
          }
      } else {
          quantity = multiplier;
          cost = MathUtils.calculateBatchCost(npc.baseCost, npc.costMultiplier, count, quantity, discount);
          if (quantity > 1) label = `x${quantity}`;
      }

      const el = document.getElementById(`npc-${npc.id}`);
      if (!el) continue;

      // Update text
      document.getElementById(`count-${npc.id}`).textContent = count;
      
      const btn = document.getElementById(`btn-hire-${npc.id}`);
      btn.textContent = `Contratar ${label} (${formatCurrency(cost)})`;

      // Update availability/affordability
      const canAfford = state.resources.money >= cost;
      
      if (canAfford) {
        el.classList.add("affordable");
        el.classList.remove("locked");
        btn.disabled = false;
      } else {
        el.classList.remove("affordable");
        el.classList.add("locked");
        btn.disabled = true;
      }
    }
  }
};
