import { TerritorySystem } from "../../systems/territorySystem.js";

export const TerritoryRenderer = {
    /**
     * Render territory list
     * @param {HTMLElement} container - List container
     * @param {Object} state - Game state
     * @param {Function} formatCurrency - Currency formatter
     */
    render: (container, state, formatCurrency) => {
        if (!container) return;

        const territories = TerritorySystem.getAll();
        container.innerHTML = "";

        Object.values(territories).forEach(t => {
            if (!TerritorySystem.isUnlocked(t.id)) return;

            const isOwned = TerritorySystem.isOwned(t.id);
            const canAfford = state.resources.money >= t.cost;

            const div = document.createElement("div");
            div.className = `territory-item ${isOwned ? "owned" : ""}`;
            
            // Item Header
            const header = document.createElement("div");
            header.className = "item-header";
            
            const name = document.createElement("span");
            name.className = "item-name";
            name.textContent = t.name;
            
            const cost = document.createElement("span");
            cost.className = "item-cost";
            cost.textContent = isOwned ? "DOMINADO" : formatCurrency(t.cost);
            if (!isOwned && !canAfford) cost.classList.add("text-red");
            
            header.appendChild(name);
            header.appendChild(cost);

            // Description
            const desc = document.createElement("p");
            desc.className = "item-desc";
            desc.textContent = t.description;

            // Bonus
            const bonus = document.createElement("p");
            bonus.className = "item-bonus";
            bonus.innerHTML = `<span class="highlight">BÔNUS:</span> ${t.bonus.desc}`;

            div.appendChild(header);
            div.appendChild(desc);
            div.appendChild(bonus);

            // Action Button
            if (!isOwned) {
                const btn = document.createElement("button");
                btn.className = "btn-hire";
                btn.textContent = "DOMINAR";
                btn.dataset.id = t.id;
                
                if (!canAfford) {
                    btn.disabled = true;
                    btn.classList.add("disabled");
                }

                div.appendChild(btn);
            } else {
                div.classList.add("owned-territory");
            }

            container.appendChild(div);
        });
    }
};
