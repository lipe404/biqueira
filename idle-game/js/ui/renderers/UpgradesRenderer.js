import { UPGRADES } from "../../data/upgrades.js";

export const UpgradesRenderer = {
  render: (state, elements, formatCurrency) => {
    const container = elements.upgradesList;
    // This is inefficient to clear every frame, but safe for logic
    // Optimization: Only render if changes detected.
    // For now, let's just do it.
    container.innerHTML = "";

    const availableUpgrades = Object.values(UPGRADES).filter((u) => {
      // Not bought yet
      if (state.upgrades.includes(u.id)) return false;
      // Condition met
      return u.trigger(state);
    });

    if (availableUpgrades.length === 0) {
      container.innerHTML =
        '<div style="padding:10px; color:#666; text-align:center; font-style: italic;">Nada pra melhorar agora, chefe.</div>';
      return;
    }

    availableUpgrades.forEach((u) => {
      const div = document.createElement("div");
      div.className = "list-item upgrade-item";
      if (state.resources.money >= u.cost) {
        div.classList.add("affordable");
      } else {
        div.classList.add("locked");
      }

      // Add click listener data
      div.dataset.id = u.id;
      div.dataset.type = "upgrade";

      // Icon logic based on ID or keywords
      let icon = "🔧";
      if (u.id.includes("click")) icon = "👆";
      if (u.id.includes("intern")) icon = "☕";
      if (u.id.includes("risk")) icon = "🚓";

      div.innerHTML = `
                <div class="item-header">
                    <span class="icon-pulse">${icon}</span>
                    <span>${u.name}</span>
                    <span class="item-cost">${formatCurrency(u.cost)}</span>
                </div>
                <div class="item-desc">${u.description}</div>
            `;
      container.appendChild(div);
    });
  }
};
