import { gameState } from '../core/gameState.js';
import { NPCS } from '../data/npcs.js';
import { UPGRADES } from '../data/upgrades.js';

export const Renderer = {
    // Cache DOM elements
    elements: {},

    init: () => {
        Renderer.elements = {
            money: document.getElementById('money'),
            moneyRate: document.getElementById('money-rate'),
            widgets: document.getElementById('widgets'),
            widgetRate: document.getElementById('widget-rate'),
            heatVal: document.getElementById('heat-val'),
            heatBar: document.getElementById('heat-bar'),
            clickPower: document.getElementById('click-power'),
            influence: document.getElementById('influence-display'),
            playtime: document.getElementById('playtime'),
            npcsList: document.getElementById('npcs-list'),
            upgradesList: document.getElementById('upgrades-list'),
            logsList: document.getElementById('game-logs'),
            penaltyOverlay: document.getElementById('penalty-overlay')
        };
        
        // Initial Render of Static Lists
        Renderer.renderNPCList();
    },

    formatNumber: (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(2) + 'k';
        return Math.floor(num).toString();
    },
    
    formatCurrency: (num) => {
        return '$' + num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },

    render: () => {
        const state = gameState.get();
        const els = Renderer.elements;

        // Resources
        els.money.textContent = Renderer.formatCurrency(state.resources.money);
        els.moneyRate.textContent = `(+$${Renderer.formatNumber(state.production.moneyPerSecond)}/s)`;
        
        els.widgets.textContent = Renderer.formatNumber(state.resources.widgets);
        els.widgetRate.textContent = `(+${Renderer.formatNumber(state.production.widgetsPerSecond)}/s)`;
        
        els.heatVal.textContent = Math.floor(state.resources.heat) + '%';
        els.heatBar.style.width = state.resources.heat + '%';
        
        // Dynamic color for heat
        if (state.resources.heat > 80) els.heatBar.style.backgroundColor = 'var(--accent-red)';
        else if (state.resources.heat > 50) els.heatBar.style.backgroundColor = 'var(--accent-gold)';
        else els.heatBar.style.backgroundColor = 'var(--accent-green)';

        els.clickPower.textContent = Renderer.formatNumber(state.click.basePower * state.click.multiplier);
        els.influence.textContent = `Influência: ${state.resources.influence}`;

        // Playtime
        const totalSeconds = Math.floor((Date.now() - state.meta.startTime) / 1000);
        const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        els.playtime.textContent = `${h}:${m}:${s}`;

        // Update Lists (State dependent classes)
        Renderer.updateNPCList(state);
        Renderer.renderUpgradesList(state); // Re-render upgrades as they disappear when bought
        Renderer.renderLogs(state);
        
        // Overlay
        if (state.riskPenaltyTime > 0) {
            els.penaltyOverlay.classList.remove('hidden');
        } else {
            els.penaltyOverlay.classList.add('hidden');
        }
    },

    renderNPCList: () => {
        const container = Renderer.elements.npcsList;
        container.innerHTML = '';

        for (const key in NPCS) {
            const npc = NPCS[key];
            const div = document.createElement('div');
            div.className = 'list-item npc-item';
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

    updateNPCList: (state) => {
        for (const key in NPCS) {
            const npc = NPCS[key];
            const count = state.automation.npcs[key] || 0;
            const cost = Math.floor(npc.baseCost * Math.pow(npc.costMultiplier, count));
            
            const el = document.getElementById(`npc-${npc.id}`);
            if (!el) continue;

            // Update text
            document.getElementById(`count-${npc.id}`).textContent = count;
            document.getElementById(`cost-${npc.id}`).textContent = Renderer.formatCurrency(cost);

            // Update availability/affordability
            if (state.resources.money >= cost) {
                el.classList.add('affordable');
                el.classList.remove('locked');
            } else {
                el.classList.remove('affordable');
                el.classList.add('locked'); // Optional: just dim it
            }
        }
    },

    renderUpgradesList: (state) => {
        const container = Renderer.elements.upgradesList;
        // This is inefficient to clear every frame, but safe for logic
        // Optimization: Only render if changes detected. 
        // For now, let's just do it.
        container.innerHTML = '';

        const availableUpgrades = Object.values(UPGRADES).filter(u => {
            // Not bought yet
            if (state.upgrades.includes(u.id)) return false;
            // Condition met
            return u.trigger(state);
        });

        if (availableUpgrades.length === 0) {
            container.innerHTML = '<div style="padding:10px; color:#666; text-align:center;">Nenhuma melhoria disponível.</div>';
            return;
        }

        availableUpgrades.forEach(u => {
            const div = document.createElement('div');
            div.className = 'list-item upgrade-item';
            if (state.resources.money >= u.cost) {
                div.classList.add('affordable');
            } else {
                div.classList.add('locked');
            }
            
            // Add click listener data
            div.dataset.id = u.id;
            div.dataset.type = 'upgrade';

            div.innerHTML = `
                <div class="item-header">
                    <span>${u.name}</span>
                    <span class="item-cost">${Renderer.formatCurrency(u.cost)}</span>
                </div>
                <div class="item-desc">${u.description}</div>
            `;
            container.appendChild(div);
        });
    },

    lastLogTime: 0,
    renderLogs: (state) => {
        if (!state.logs || state.logs.length === 0) return;
        const latest = state.logs[0];
        if (latest.time <= Renderer.lastLogTime) return; // No new logs

        const container = Renderer.elements.logsList;
        container.innerHTML = '';
        
        state.logs.forEach(log => {
            const div = document.createElement('div');
            div.className = 'log-entry';
            const time = new Date(log.time).toLocaleTimeString();
            div.textContent = `[${time}] ${log.message}`;
            container.appendChild(div);
        });
        
        Renderer.lastLogTime = latest.time;
    }
};
