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
    }
};
