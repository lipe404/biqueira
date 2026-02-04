/**
 * VisualFX - Manages visual effects like floating text, particles, etc.
 */
export const VisualFX = {
    /**
     * Spawns floating text at the given coordinates.
     * @param {number} x - Client X position
     * @param {number} y - Client Y position
     * @param {string} text - Text to display
     * @param {string} type - 'money', 'widgets', 'heat', or 'default'
     */
    spawnFloatingText: (x, y, text, type = 'default') => {
        const el = document.createElement('div');
        el.className = `floating-text ${type}`;
        el.textContent = text;

        switch (type) {
            case "money":
                el.style.color = "var(--money-gold)";
                el.style.textShadow = "0 0 5px rgba(255, 215, 0, 0.5)";
                break;
            case "science":
                el.style.color = "#00ffff";
                el.style.textShadow = "0 0 5px rgba(0, 255, 255, 0.5)";
                break;
        }
        
        // Randomize position slightly
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        
        el.style.left = `${x + offsetX}px`;
        el.style.top = `${y + offsetY}px`;
        
        document.body.appendChild(el);
        
        // Remove after animation
        setTimeout(() => {
            el.remove();
        }, 1000);
    },

    /**
     * Triggers a visual cooldown/click feedback on an element.
     * @param {HTMLElement} element 
     */
    triggerCooldown: (element) => {
        element.classList.remove('btn-clicked');
        void element.offsetWidth; // Trigger reflow
        element.classList.add('btn-clicked');
        element.classList.add('btn-cooldown'); // Ensure base class is there
    },

    /**
     * Shows a visual error feedback on an element.
     * @param {HTMLElement} element - The element that caused the error
     * @param {string} message - Short error message
     */
    showError: (element, message = "Sem Grana!") => {
        // 1. Shake animation
        element.classList.remove('shake-error');
        void element.offsetWidth; // Trigger reflow
        element.classList.add('shake-error');
        
        // Remove class after animation
        setTimeout(() => {
            element.classList.remove('shake-error');
        }, 500);

        // 2. Floating text in red
        const rect = element.getBoundingClientRect();
        // Center of the element
        const x = rect.left + rect.width / 2;
        const y = rect.top;
        
        VisualFX.spawnFloatingText(x, y, message, 'error');
    },

    /**
     * Shows the save indicator for a short duration.
     */
    showSaveIndicator: () => {
        const indicator = document.getElementById('save-indicator');
        if (!indicator) return;

        indicator.classList.add('visible');
        
        // Hide after 2 seconds
        if (indicator.timeoutId) clearTimeout(indicator.timeoutId);
        
        indicator.timeoutId = setTimeout(() => {
            indicator.classList.remove('visible');
        }, 2000);
    }
};
