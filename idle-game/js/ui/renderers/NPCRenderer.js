import { NPCS } from "../../data/npcs.js";

export const NPCRenderer = {
  renderList: (container) => {
    container.innerHTML = "";

    for (const key in NPCS) {
      const npc = NPCS[key];
      const div = document.createElement("div");
      div.className = "list-item npc-item";
      div.id = `npc-${npc.id}`;
      div.dataset.id = npc.id; // For binding

      div.innerHTML = `
                <div class="item-header">
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
      const cost = Math.floor(
        npc.baseCost * Math.pow(npc.costMultiplier, count),
      );

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
