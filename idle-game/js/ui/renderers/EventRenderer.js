import { gameState } from "../../core/gameState.js";
import { EventManager, EVENTS } from "../../core/eventManager.js";
import { Formatter } from "../../utils/formatting.js";
import { VisualFX } from "../visualFX.js";

export const EventRenderer = {
    init: (elements) => {
        // Create modal container if not exists
        if (!document.getElementById("event-modal")) {
            const modal = document.createElement("div");
            modal.id = "event-overlay";
            modal.className = "overlay hidden";
            modal.innerHTML = `
                <div class="modal event-modal" id="event-modal">
                    <h2 id="event-title">EVENTO</h2>
                    <p id="event-desc">Descrição do evento...</p>
                    <div id="event-choices" class="event-choices"></div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        
        // Listen for Choice Events
        EventManager.on(EVENTS.SHOW_CHOICE, EventRenderer.showChoice);
    },
    
    showChoice: (eventData) => {
        const overlay = document.getElementById("event-overlay");
        const title = document.getElementById("event-title");
        const desc = document.getElementById("event-desc");
        const choicesContainer = document.getElementById("event-choices");
        
        title.innerText = eventData.title;
        desc.innerText = eventData.description;
        choicesContainer.innerHTML = "";
        
        eventData.choices.forEach((choice, index) => {
            const btn = document.createElement("button");
            btn.className = "btn-modal choice-btn";
            btn.innerText = choice.text;
            
            // Check requirement
            const state = gameState.get();
            if (choice.req && !choice.req(state)) {
                btn.disabled = true;
                btn.classList.add("disabled");
                btn.title = "Requisitos não atendidos";
            } else {
                btn.addEventListener("click", () => {
                    EventRenderer.handleChoice(choice, eventData);
                });
            }
            
            choicesContainer.appendChild(btn);
        });
        
        overlay.classList.remove("hidden");
    },
    
    handleChoice: (choice, eventData) => {
        const state = gameState.get();
        
        // Apply effect
        if (choice.effect) {
            choice.effect(state);
        }
        
        // Close modal
        document.getElementById("event-overlay").classList.add("hidden");
        
        // Log
        if (!state.logs) state.logs = [];
        state.logs.unshift({
            time: Date.now(),
            message: `Decisão tomada: ${choice.text}`
        });
        
        // Feedback
        if (choice.outcomeText) {
             // Maybe show another popup or toast? For now just log.
        }
        
        gameState.notify();
    }
};
