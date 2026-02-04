import { gameState } from "../core/gameState.js";
import { EventManager, EVENTS } from "../core/eventManager.js";
import { ClickSystem } from "../systems/clickSystem.js";
import { SaveSystem } from "../core/saveSystem.js";
import { PrestigeSystem } from "../systems/prestigeSystem.js";
import { NPCS } from "../data/npcs.js";
import { UPGRADES } from "../data/upgrades.js";
import { MathUtils } from "../utils/math.js";
import { Formatter } from "../utils/formatting.js";
import { CONFIG } from "../core/config.js";

import { VisualFX } from "./visualFX.js";
import { PetSystem } from "../systems/petSystem.js";
import { BuildingSystem } from "../systems/buildingSystem.js";
import { TerritorySystem } from "../systems/territorySystem.js";
import { EquipmentSystem } from "../systems/equipmentSystem.js";

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

    // Tab Switching for Upgrades/Pets
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const tabId = btn.dataset.tab;
        
        // Update Buttons
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        // Update Content
        const tabContents = document.querySelectorAll(".tab-content");
        tabContents.forEach(content => {
          content.classList.add("hidden");
          content.classList.remove("active");
        });
        
        const activeContent = document.getElementById(`${tabId}-list`);
        if (activeContent) {
          activeContent.classList.remove("hidden");
          activeContent.classList.add("active");
        }
      });
    });

    // Pet Purchase
    const petsList = document.getElementById("pets-list");
    if (petsList) {
      petsList.addEventListener("click", (e) => {
        const item = e.target.closest(".pet-item");
        if (!item) return;

        const id = item.dataset.id;
        const adoptBtn = e.target.closest(".btn-adopt");
        
        if (adoptBtn) {
          Bindings.buyPet(id, item);
        } else {
          Bindings.triggerVibration(item);
        }
      });
    }

    // Equipment Purchase/Equip
    const equipList = document.getElementById("equipment-list");
    if (equipList) {
        equipList.addEventListener("click", (e) => {
            const item = e.target.closest(".equipment-item");
            if (!item) return;

            const id = item.dataset.id;
            
            // Buy
            if (e.target.closest(".action-buy")) {
                // Get rect BEFORE action (element might be removed/replaced)
                const rect = e.target.closest(".action-buy").getBoundingClientRect();
                
                if (EquipmentSystem.buy(id)) {
                    VisualFX.spawnFloatingText(
                        rect.left,
                        rect.top - 20,
                        "COMPRADO!",
                        "money"
                    );
                } else {
                    VisualFX.showError(item, "Sem Grana!");
                }
            }
            // Equip
            else if (e.target.closest(".action-equip")) {
                const rect = e.target.closest(".action-equip").getBoundingClientRect();
                
                if (EquipmentSystem.equip(id)) {
                    VisualFX.spawnFloatingText(
                        rect.left,
                        rect.top - 20,
                        "EQUIPADO!",
                        "default"
                    );
                }
            }
        });
    }

    // NPC Purchase
    document.getElementById("npcs-list").addEventListener("click", (e) => {
      const item = e.target.closest(".npc-item");
      if (!item) return;

      const hireBtn = e.target.closest(".btn-hire");
      
      if (hireBtn) {
          const id = item.dataset.id;
          Bindings.buyNPC(id);
      } else {
          Bindings.triggerVibration(item);
      }
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

    // Building Upgrade
    const btnUpgradeBuilding = document.getElementById("btn-upgrade-building");
    if (btnUpgradeBuilding) {
        btnUpgradeBuilding.addEventListener("click", () => {
            Bindings.upgradeBuilding();
        });
    }

    // Territory Purchase
    const territoryList = document.getElementById("territories-list");
    if (territoryList) {
        territoryList.addEventListener("click", (e) => {
            const btn = e.target.closest(".btn-hire"); // Reusing class btn-hire
            if (btn) {
                const id = btn.dataset.id;
                Bindings.buyTerritory(id, btn.closest(".territory-item"));
            }
        });
    }
    
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

    // Save Game Event Listener
    EventManager.on(EVENTS.SAVE_GAME, () => {
        VisualFX.showSaveIndicator();
    });
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
    
    // Calculate total discount including pets and equipment
    const petDiscount = PetSystem.getBonus('cost_reduction') || 0;
    const equipDiscount = (EquipmentSystem.getBonuses().cost_reduction || 0);
    const discount = (state.discounts?.global || 0) + (state.discounts?.npcs?.[id] || 0) + petDiscount + equipDiscount;
    
    const multiplier = state.settings?.buyMultiplier || 1;
    
    let quantity = 1;
    let totalCost = 0;
    
    // Find Element for feedback
    const item = document.querySelector(`.npc-item[data-id="${id}"]`);

    if (multiplier === 'MAX') {
        quantity = MathUtils.calculateMaxAffordable(npc.baseCost, npc.costMultiplier, count, state.resources.money, discount);
        // If can't afford any, calculate cost for 1 just to check/show error
        if (quantity <= 0) {
             const costForOne = MathUtils.calculateBatchCost(npc.baseCost, npc.costMultiplier, count, 1, discount);
             if (state.resources.money < costForOne) {
                 if (item) VisualFX.showError(item, "Sem Grana!");
                 return;
             }
             return; // Should not happen if logic is correct
        }
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
      if (item) {
          VisualFX.spawnFloatingText(
              item.getBoundingClientRect().left + 100, 
              item.getBoundingClientRect().top, 
              `+${quantity}`, 
              'default'
          );
      }
    } else {
        // Not enough money for fixed amount
        if (item) VisualFX.showError(item, "Sem Grana!");
    }
  },

  buyPet: (id, element) => {
    if (PetSystem.buyPet(id)) {
        VisualFX.spawnFloatingText(
            element.getBoundingClientRect().left + 100,
            element.getBoundingClientRect().top,
            "ADOTADO!",
            "default"
        );
    } else {
        VisualFX.showError(element, "Falta Grana!");
    }
  },

  upgradeBuilding: () => {
      const btn = document.getElementById("btn-upgrade-building");
      if (BuildingSystem.upgrade()) {
          VisualFX.spawnFloatingText(
              btn.getBoundingClientRect().left,
              btn.getBoundingClientRect().top - 50,
              "QUEBRADA EXPANDIDA!",
              "money" // Gold color
          );
      } else {
          VisualFX.showError(btn, "Falta Grana!");
      }
  },

  buyTerritory: (id, element) => {
      if (TerritorySystem.conquer(id)) {
          VisualFX.spawnFloatingText(
              element.getBoundingClientRect().left + 50,
              element.getBoundingClientRect().top,
              "DOMINADO!",
              "money"
          );
      } else {
          VisualFX.showError(element, "Falta Grana!");
      }
  },

  buyUpgrade: (id) => {
    const state = gameState.get();
    const upgrade = UPGRADES[id];
    if (!upgrade) return;

    const item = document.querySelector(`.upgrade-item[data-id="${id}"]`);

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
    } else {
        if (item) VisualFX.showError(item, "Sem Grana!");
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
