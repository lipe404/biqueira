import { gameState } from '../core/gameState.js';
import { ClickSystem } from '../systems/clickSystem.js';
import { SaveSystem } from '../core/saveSystem.js';
import { PrestigeSystem } from '../systems/prestigeSystem.js';
import { NPCS } from '../data/npcs.js';
import { UPGRADES } from '../data/upgrades.js';

export const Bindings = {
    init: () => {
        // Main Buttons
        const btnMake = document.getElementById('btn-make');
        btnMake.addEventListener('click', () => {
            ClickSystem.clickMake();
            Bindings.triggerVibration(btnMake);
            // Optional: Spawn particle effect
        });

        const btnSell = document.getElementById('btn-sell');
        btnSell.addEventListener('click', () => {
            ClickSystem.clickSell();
            Bindings.triggerVibration(btnSell);
        });

        // System Buttons
        document.getElementById('btn-save').addEventListener('click', () => {
            SaveSystem.save();
            alert('Progresso Salvo na Fita!');
        });

        document.getElementById('btn-reset').addEventListener('click', () => {
            if (confirm('ZERAR TUDO: Vai perder todo o corre e o respeito. Certeza, parça?')) {
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
            
            // Visual feedback on click even if locked (maybe shake?)
            Bindings.triggerVibration(item);
        });

        // Upgrade Purchase
        document.getElementById('upgrades-list').addEventListener('click', (e) => {
            const item = e.target.closest('.upgrade-item');
            if (!item) return;
            
            const id = item.dataset.id;
            Bindings.buyUpgrade(id);
            Bindings.triggerVibration(item);
        });
    },

    triggerVibration: (element) => {
        element.classList.remove('vibrate');
        void element.offsetWidth; // trigger reflow
        element.classList.add('vibrate');
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
