import { gameState } from "../core/gameState.js";
import { ClickSystem } from "../systems/clickSystem.js";
import { SaveSystem } from "../core/saveSystem.js";
import { PrestigeSystem } from "../systems/prestigeSystem.js";
import { NPCS } from "../data/npcs.js";
import { UPGRADES } from "../data/upgrades.js";
import { MathUtils } from "../utils/math.js";
import { Formatter } from "../utils/formatting.js";
import { CONFIG } from "../core/config.js";

import { VisualFX } from "./visualFX.js";

export const Bindings = {
  init: () => {
    // Main Buttons
    const btnMake = document.getElementById("btn-make");
    btnMake.addEventListener("click", (e) => {
      const amount = ClickSystem.clickMake();
      Bindings.triggerVibration(btnMake);
      VisualFX.triggerCooldown(btnMake);
      
      if (amount > 0) {
        VisualFX.spawnFloatingText(e.clientX, e.clientY, `+${Math.floor(amount)}`, 'widgets');
      }
    });

    const btnSell = document.getElementById("btn-sell");
    btnSell.addEventListener("click", (e) => {
      const revenue = ClickSystem.clickSell();
      Bindings.triggerVibration(btnSell);
      VisualFX.triggerCooldown(btnSell);

      if (revenue > 0) {
        VisualFX.spawnFloatingText(e.clientX, e.clientY, Formatter.formatCurrency(revenue), 'money');
      }
    });

    // Save Menu
    document.getElementById("btn-save-menu").addEventListener("click", () => {
      Bindings.openSaveMenu();
    });

    // Save Modal Buttons
    document.getElementById("btn-close-save").addEventListener("click", () => {
      document.getElementById("save-overlay").classList.add("hidden");
    });

    document.getElementById("btn-modal-save").addEventListener("click", () => {
      if (SaveSystem.save()) {
        alert("Progresso salvo com sucesso!");
        Bindings.updateSaveMetadata();
      }
    });

    document.getElementById("btn-modal-load").addEventListener("click", () => {
      if (confirm("Tem certeza? O progresso não salvo será perdido.")) {
        if (SaveSystem.load()) {
          alert("Progresso carregado!");
          document.getElementById("save-overlay").classList.add("hidden");
        }
      }
    });

    document.getElementById("btn-modal-reset").addEventListener("click", () => {
      if (confirm("ZERAR TUDO: Vai perder todo o corre e o respeito. Certeza, parça?")) {
        SaveSystem.reset();
      }
    });

    document.getElementById("btn-export").addEventListener("click", () => {
      SaveSystem.exportSave();
    });

    const fileInput = document.getElementById("file-import");
    document.getElementById("btn-import-trigger").addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        if (confirm("Importar este save irá sobrescrever o jogo atual. Continuar?")) {
            if (SaveSystem.importSave(event.target.result)) {
                alert("Save importado com sucesso!");
                document.getElementById("save-overlay").classList.add("hidden");
            }
        }
        // Reset input so same file can be selected again if needed
        fileInput.value = '';
      };
      reader.readAsText(file);
    });

    // Autosave Toggle
    const chkAutosave = document.getElementById("chk-autosave");
    chkAutosave.addEventListener("change", (e) => {
        // We can update a runtime setting here
        // For now, let's just toggle the interval in CONFIG (dirty but works if object is shared)
        // Better: Update GameState.settings
        const state = gameState.get();
        if (!state.settings) state.settings = {};
        state.settings.autosaveEnabled = e.target.checked;
    });
    
    // Sync Checkbox with state
    const state = gameState.get();
    if (state.settings && state.settings.autosaveEnabled !== undefined) {
        chkAutosave.checked = state.settings.autosaveEnabled;
    }

    document.getElementById("btn-prestige").addEventListener("click", () => {
      PrestigeSystem.prestige();
    });

    // Rank Modal Close
    const btnCloseRank = document.getElementById("btn-close-rank");
    if (btnCloseRank) {
        btnCloseRank.addEventListener("click", () => {
            document.getElementById("rank-overlay").classList.add("hidden");
        });
    }

    // Delegated Listeners for Lists

    // NPC Purchase
    document.getElementById("npcs-list").addEventListener("click", (e) => {
      const item = e.target.closest(".npc-item");
      if (!item) return;

      const id = item.dataset.id;
      Bindings.buyNPC(id);

      // Visual feedback on click even if locked (maybe shake?)
      Bindings.triggerVibration(item);
    });

    // Upgrade Purchase
    document.getElementById("upgrades-list").addEventListener("click", (e) => {
      const item = e.target.closest(".upgrade-item");
      if (!item) return;

      const id = item.dataset.id;
      Bindings.buyUpgrade(id);
      Bindings.triggerVibration(item);
    });

    // Bulk Buy Controls
    const multiplierBtns = document.querySelectorAll('.btn-multiplier');
    multiplierBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const val = e.target.dataset.value;
            Bindings.setMultiplier(val);
            
            // UI Update
            multiplierBtns.forEach(b => {
                b.classList.remove('active');
                b.ariaPressed = "false";
            });
            e.target.classList.add('active');
            e.target.ariaPressed = "true";
        });
    });
    
    // Init state
    const currentState = gameState.get();
    if (!currentState.settings) currentState.settings = {};
    if (!currentState.settings.buyMultiplier) currentState.settings.buyMultiplier = 1;
    
    // Init UI from state
    const savedMult = currentState.settings.buyMultiplier;
    const activeBtn = document.querySelector(`.btn-multiplier[data-value="${savedMult}"]`);
    if (activeBtn) {
        multiplierBtns.forEach(b => b.classList.remove('active'));
        activeBtn.classList.add('active');
    }
  },

  setMultiplier: (val) => {
      const state = gameState.get();
      if (!state.settings) state.settings = {};
      state.settings.buyMultiplier = val === 'MAX' ? 'MAX' : parseInt(val);
  },

  triggerVibration: (element) => {
    element.classList.remove("vibrate");
    void element.offsetWidth; // trigger reflow
    element.classList.add("vibrate");
  },

  buyNPC: (id) => {
    const state = gameState.get();
    const npc = NPCS[id];
    if (!npc) return;

    const count = state.automation.npcs[id] || 0;
    const discount = (state.discounts?.global || 0) + (state.discounts?.npcs?.[id] || 0);
    const multiplier = state.settings?.buyMultiplier || 1;
    
    let quantity = 1;
    let totalCost = 0;

    if (multiplier === 'MAX') {
        quantity = MathUtils.calculateMaxAffordable(npc.baseCost, npc.costMultiplier, count, state.resources.money, discount);
        if (quantity <= 0) return; // Can't afford any
        totalCost = MathUtils.calculateBatchCost(npc.baseCost, npc.costMultiplier, count, quantity, discount);
    } else {
        quantity = multiplier;
        totalCost = MathUtils.calculateBatchCost(npc.baseCost, npc.costMultiplier, count, quantity, discount);
    }

    if (state.resources.money >= totalCost && quantity > 0) {
      state.resources.money -= totalCost;
      state.automation.npcs[id] = count + quantity;

      // Log
      if (!state.logs) state.logs = [];
      state.logs.unshift({
        time: Date.now(),
        message: `Contratou ${quantity}x ${npc.name} por $${Formatter.formatCurrency(totalCost)}.`,
      });
      
      // Visual Feedback for bulk
      const item = document.querySelector(`.npc-item[data-id="${id}"]`);
      if (item) {
          VisualFX.spawnFloatingText(
              item.getBoundingClientRect().left + 100, 
              item.getBoundingClientRect().top, 
              `+${quantity}`, 
              'default'
          );
      }
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
        message: `Comprou Melhoria: ${upgrade.name}`,
      });
    }
  },

  openSaveMenu: () => {
    document.getElementById("save-overlay").classList.remove("hidden");
    Bindings.updateSaveMetadata();
  },

  updateSaveMetadata: () => {
    const meta = SaveSystem.getMetadata();
    const container = document.getElementById("save-metadata");
    
    if (!meta) {
        container.innerHTML = "<p>Nenhum save local encontrado.</p>";
        document.getElementById("btn-modal-load").disabled = true;
        return;
    }
    
    document.getElementById("btn-modal-load").disabled = false;
    
    const date = new Date(meta.saveTime).toLocaleString("pt-BR");
    const money = Formatter.formatCurrency(meta.money);
    const hours = Math.floor(meta.playTime / 3600);
    const minutes = Math.floor((meta.playTime % 3600) / 60);
    
    container.innerHTML = `
        <p><strong>Último Save:</strong> ${date}</p>
        <p><strong>Posto:</strong> ${meta.rank}</p>
        <p><strong>Grana:</strong> ${money}</p>
        <p><strong>Tempo Jogado:</strong> ${hours}h ${minutes}m</p>
    `;
  }
};
