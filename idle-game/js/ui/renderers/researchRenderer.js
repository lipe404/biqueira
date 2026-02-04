import { RESEARCH } from "../../data/research.js";
import { ResearchSystem } from "../../systems/researchSystem.js";
import { Formatter } from "../../utils/formatting.js";

export const ResearchRenderer = {
    render: (container, state) => {
        if (!container) return;
        if (!state.research) return; // Safety check
        
        const available = state.research.available || [];
        const researched = state.research.researched || [];
        
        let html = '';
        
        if (available.length === 0 && researched.length === 0) {
            html = '<div class="empty-state">O laboratório está parado. Junte grana para desbloquear pesquisas.</div>';
        } else {
            // Available Researches
            if (available.length > 0) {
                html += '<h3 class="list-section-title">Disponível</h3>';
                available.forEach(id => {
                    const tech = RESEARCH[id];
                    if (!tech) return;
                    
                    const canAfford = state.resources.money >= tech.cost;
                    const btnClass = canAfford ? "btn-buy action-research" : "btn-buy action-research disabled";
                    const btnText = canAfford ? "PESQUISAR" : "SEM GRANA";
                    
                    html += `
                    <div class="research-item" data-id="${tech.id}">
                        <div class="item-header">
                            <span class="item-name">🧪 ${tech.name}</span>
                        </div>
                        <div class="item-desc">${tech.description}</div>
                        <button class="${btnClass}">
                            ${btnText} (${Formatter.formatCurrency(tech.cost)})
                        </button>
                    </div>`;
                });
            }
            
            // Completed Researches (Collapsed or just list)
            if (researched.length > 0) {
                html += '<h3 class="list-section-title">Concluído</h3>';
                researched.forEach(id => {
                    const tech = RESEARCH[id];
                    if (!tech) return;
                    
                    html += `
                    <div class="research-item completed" data-id="${tech.id}">
                        <div class="item-header">
                            <span class="item-name">✅ ${tech.name}</span>
                        </div>
                        <div class="item-desc">${tech.description}</div>
                    </div>`;
                });
            }
        }
        
        container.innerHTML = html;
    }
};
