import { gameState } from '../core/gameState.js';
import { ClickSystem } from '../systems/clickSystem.js';
import { SaveSystem } from '../core/saveSystem.js';
import { PrestigeSystem } from '../systems/prestigeSystem.js';
import { NPCS } from '../data/npcs.js';
import { UPGRADES } from '../data/upgrades.js';

export const Bindings = {
    init: () => {
        // Main Buttons
        document.getElementById('btn-make').addEventListener('click', () => {
            ClickSystem.clickMake();
            // Optional: Spawn particle effect
        });

        document.getElementById('btn-sell').addEventListener('click', () => {
            ClickSystem.clickSell();
        });

        // System Buttons
        document.getElementById('btn-save').addEventListener('click', () => {
            SaveSystem.save();
            alert('Jogo Salvo!');
        });

        document.getElementById('btn-reset').addEventListener('click', () => {
            if (confirm('RESET TOTAL: Isso apagará todo o progresso, incluindo prestígio. Tem certeza?')) {
                SaveSystem.reset();
            }
        });

        document.getElementById('btn-prestige').addEventListener('click', () => {
            PrestigeSystem.prestige();
        });

        // Delegated Listeners for Lists
        
        // NPC Purchase
        document.getElementById('npcs-list').addEventListener('click', (e) => {
            const item = e.target.closest('.npc-item');
            if (!item) return;
            
            const id = item.dataset.id;
            Bindings.buyNPC(id);
        });

        // Upgrade Purchase
        document.getElementById('upgrades-list').addEventListener('click', (e) => {
            const item = e.target.closest('.upgrade-item');
            if (!item) return;
            
            const id = item.dataset.id;
            Bindings.buyUpgrade(id);
        });
    },

    buyNPC: (id) => {
        const state = gameState.get();
        const npc = NPCS[id];
        if (!npc) return;

        const count = state.automation.npcs[id] || 0;
        const cost = Math.floor(npc.baseCost * Math.pow(npc.costMultiplier, count));

        if (state.resources.money >= cost) {
            state.resources.money -= cost;
            state.automation.npcs[id] = count + 1;
            
            // Log
            if (!state.logs) state.logs = [];
            state.logs.unshift({
                time: Date.now(),
                message: `Contratou ${npc.name} por $${cost}.`
            });
        }
    },

    buyUpgrade: (id) => {
        const state = gameState.get();
        const upgrade = UPGRADES[id];
        if (!upgrade) return;

        if (state.resources.money >= upgrade.cost) {
            state.resources.money -= upgrade.cost;
            state.upgrades.push(id);
            
            // Apply effect immediately
            upgrade.effect(state);

            // Log
            if (!state.logs) state.logs = [];
            state.logs.unshift({
                time: Date.now(),
                message: `Comprou Melhoria: ${upgrade.name}`
            });
        }
    }
};
