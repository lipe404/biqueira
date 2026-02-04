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
    for (const key in NPCS) {
      const npc = NPCS[key];
      const count = state.automation.npcs[key] || 0;
      
      const discount = (state.discounts?.global || 0) + (state.discounts?.npcs?.[key] || 0);
      const cost = MathUtils.calculateCost(npc.baseCost, npc.costMultiplier, count, discount);

      const el = document.getElementById(`npc-${npc.id}`);
      if (!el) continue;

      // Update text
      document.getElementById(`count-${npc.id}`).textContent = count;
      document.getElementById(`cost-${npc.id}`).textContent =
        formatCurrency(cost);

      // Update availability/affordability
      if (state.resources.money >= cost) {
        el.classList.add("affordable");
        el.classList.remove("locked");
      } else {
        el.classList.remove("affordable");
        el.classList.add("locked"); // Optional: just dim it
      }
    }
  }
};
