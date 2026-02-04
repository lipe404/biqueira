import { PetSystem } from "../../systems/petSystem.js";
import { Formatter } from "../../utils/formatting.js";
import { gameState } from "../../core/gameState.js";

export const PetsRenderer = {
  render: (container) => {
    if (!container) return;
    
    // Otimização simples: Se o número de filhos for igual ao número de pets, atualiza classes.
    // Senão, reconstroi.
    const petsData = PetSystem.getAllPets();
    if (!petsData) return;
    
    const state = gameState.get();
    
    // Check if we need to rebuild
    const petIds = Object.keys(petsData);
    if (container.children.length !== 1 || container.querySelector('.pets-list').children.length !== petIds.length) {
         container.innerHTML = '';
         const list = document.createElement('div');
         list.className = 'pets-list';
         
         petIds.forEach(id => {
             const pet = petsData[id];
             const item = document.createElement('div');
             item.className = 'pet-item';
             item.dataset.id = id;
             
             item.innerHTML = `
               <div class="pet-icon">${pet.icon || '🐾'}</div>
               <div class="pet-details">
                   <div class="item-header">
                       <span class="item-name">${pet.name}</span>
                   </div>
                   <div class="item-desc">${pet.description}</div>
                   <div class="pet-effect">${getEffectDescription(pet)}</div>
                   <button class="btn-adopt" data-id="${id}">Adotar</button>
               </div>
            `;
             list.appendChild(item);
         });
         container.appendChild(list);
    }
    
    // Update states
    const list = container.querySelector('.pets-list');
    if (!list) return;
    
    Array.from(list.children).forEach(item => {
        const id = item.dataset.id;
        const pet = petsData[id];
        const hasPet = PetSystem.hasPet(id);
        const canAfford = state.resources.money >= pet.cost;
        
        item.className = `pet-item ${hasPet ? 'owned' : ''} ${!hasPet && !canAfford ? 'disabled' : ''}`;
        
        const btn = item.querySelector('.btn-adopt');
        if (hasPet) {
            btn.textContent = "Adotado";
            btn.disabled = true;
        } else {
            btn.textContent = `Adotar (${Formatter.formatCurrency(pet.cost)})`;
            btn.disabled = !canAfford;
        }
    });
  }
};

function getEffectDescription(pet) {
    if (pet.effectType === 'heat_reduction') return `-${pet.effectValue}/s Calor`;
    if (pet.effectType === 'production_multiplier') return `+${Math.round(pet.effectValue*100)}% Produção`;
    if (pet.effectType === 'cost_reduction') return `-${Math.round(pet.effectValue*100)}% Custos`;
    if (pet.effectType === 'risk_reduction') return `-${Math.round(pet.effectValue*100)}% Risco`;
    return 'Desconhecido';
}
