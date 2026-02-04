import { DataLoader } from "../core/loader.js";
import { gameState } from "../core/gameState.js";
import { EventManager, EVENTS } from "../core/eventManager.js";

export const PetSystem = {
  petsData: {},
  initialized: false,

  init: async () => {
    if (PetSystem.initialized) return;
    try {
      PetSystem.petsData = await DataLoader.loadJSON("assets/data/pets.json");
      PetSystem.initialized = true;
      console.log("PetSystem initialized");
      
      // Notify UI to render pets now that data is loaded
      gameState.notify();
    } catch (e) {
      console.error("Failed to load pets:", e);
    }
  },

  update: (dt) => {
    if (!PetSystem.initialized) return;
    const state = gameState.get();
    const ownedPets = state.pets || [];

    ownedPets.forEach(petId => {
      const pet = PetSystem.petsData[petId];
      if (!pet) return;

      if (pet.effectType === 'heat_reduction') {
        // Reduz heat por segundo
        if (state.resources.heat > 0) {
            state.resources.heat = Math.max(0, state.resources.heat - (pet.effectValue * dt));
        }
      }
    });
  },

  buyPet: (petId) => {
    if (!PetSystem.initialized) return false;
    const state = gameState.get();
    const pet = PetSystem.petsData[petId];

    if (!pet) return false;
    if (state.pets.includes(petId)) return false; // Já tem

    if (state.resources.money >= pet.cost) {
      state.resources.money -= pet.cost;
      state.pets.push(petId);
      
      EventManager.emit(EVENTS.LOG_ADD, `Comprou o mascote: ${pet.name}`);
      // Notificação visual pode ser adicionada aqui via evento
      gameState.notify();
      return true;
    }
    return false;
  },

  getBonus: (type) => {
    if (!PetSystem.initialized) return 0;
    const state = gameState.get();
    const ownedPets = state.pets || [];
    let bonus = 0;

    ownedPets.forEach(petId => {
      const pet = PetSystem.petsData[petId];
      if (pet && pet.effectType === type) {
        // Assume aditivo para simplificar
        bonus += pet.effectValue;
      }
    });
    return bonus;
  },
  
  getAllPets: () => {
      return PetSystem.petsData;
  },

  hasPet: (petId) => {
      const state = gameState.get();
      return state.pets && state.pets.includes(petId);
  }
};
