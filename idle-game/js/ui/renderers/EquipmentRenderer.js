import { EquipmentSystem } from "../../systems/equipmentSystem.js";
import { Formatter } from "../../utils/formatting.js";
import { gameState } from "../../core/gameState.js";

export const EquipmentRenderer = {
    render: (container) => {
        if (!container) return;

        const state = gameState.get();
        const money = state.resources.money;
        const allItems = EquipmentSystem.getAll();
        const grouped = {
            shoes: [],
            clothing: [],
            accessory: [],
            weapon: []
        };

        // Group items by type
        Object.values(allItems).forEach(item => {
            if (grouped[item.type]) {
                grouped[item.type].push(item);
            }
        });

        const labels = {
            shoes: "Pisantes",
            clothing: "Pano",
            accessory: "Kit",
            weapon: "Peças"
        };

        let html = '<div class="equipment-list">';

        // Render Summary of Bonuses
        const bonuses = EquipmentSystem.getBonuses();
        html += `<div class="equipment-header">
            <div class="equip-summary">
                <small>Bônus Ativos</small>
                <div class="bonus-row">⚡ Clique: +${bonuses.click_power}</div>
                <div class="bonus-row">📦 Produção: +${(bonuses.production_rate * 100).toFixed(0)}%</div>
                <div class="bonus-row">💰 Venda: +${(bonuses.sell_price * 100).toFixed(0)}%</div>
            </div>
        </div>`;

        // Render Categories
        Object.keys(grouped).forEach(type => {
            html += `<h3 class="list-section-title">${labels[type]}</h3>`;
            
            grouped[type].forEach(item => {
                const isOwned = EquipmentSystem.isOwned(item.id);
                const isEquipped = EquipmentSystem.isEquipped(item.id);
                
                let actionBtn = '';
                let statusClass = '';

                if (isEquipped) {
                    statusClass = 'equipped';
                    actionBtn = `<button class="btn-equip disabled">EQUIPADO</button>`;
                } else if (isOwned) {
                    statusClass = 'owned';
                    actionBtn = `<button class="btn-equip action-equip">EQUIPAR</button>`;
                } else {
                    const canAfford = money >= item.cost;
                    const btnClass = canAfford ? "btn-buy action-buy" : "btn-buy action-buy disabled";
                    const btnText = canAfford ? "COMPRAR" : "SEM GRANA";
                    
                    actionBtn = `<button class="${btnClass}">
                        ${btnText} (${Formatter.formatCurrency(item.cost)})
                    </button>`;
                }

                html += `
                <div class="equipment-item ${statusClass}" data-id="${item.id}">
                    <div class="item-header">
                        <span class="item-name">
                            ${isEquipped ? '<span class="item-type-badge">USANDO</span>' : ''}
                            ${item.name}
                        </span>
                    </div>
                    <div class="item-desc">${item.description}</div>
                    <div class="item-bonus">${item.bonus.desc}</div>
                    ${actionBtn}
                </div>`;
            });
        });

        html += '</div>';
        container.innerHTML = html;
    }
};
