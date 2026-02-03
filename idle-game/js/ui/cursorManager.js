import { gameState } from "../core/gameState.js";

/**
 * CursorManager - Manages custom cursors based on game progression.
 */
export const CursorManager = {
  init: () => {
    // Subscribe to state changes to check for upgrades
    gameState.subscribe(CursorManager.update);
    
    // Initial check
    CursorManager.update(gameState.get());
  },

  /**
   * Generates an SVG cursor data URI.
   * @param {number} type - 1: Basic, 2: Lit, 3: Boss
   * @returns {string} The CSS cursor value.
   */
  getCursorUrl: (type) => {
    // 32x32 Canvas for the cursor
    // Hotspot should be top-left (0,0) or close to it.
    // Let's orient the cigar like a pointer (top-left to bottom-right).
    
    let svgContent = '';
    
    // Base Cigar Body (Brown)
    // Rotating it to point top-left
    // x1=0, y1=0 (tip) to x2=20, y2=20
    
    // Common Colors
    const brown = '#8B4513';
    const darkBrown = '#5D4037';
    const ash = '#BDBDBD';
    const ember = '#FF5722';
    const gold = '#FFD700';
    const smoke = 'rgba(200, 200, 200, 0.5)';

    if (type >= 1) {
      // The Cigar Body
      // We'll draw it diagonal from 0,0
      svgContent += `
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="black" flood-opacity="0.5"/>
          </filter>
        </defs>
        <g transform="rotate(-45 10 10)" filter="url(#shadow)">
           <!-- Body -->
           <rect x="5" y="10" width="24" height="8" rx="2" fill="${brown}" stroke="${darkBrown}" stroke-width="1"/>
           <!-- Texture lines -->
           <path d="M7 10 L7 18 M15 10 L15 18 M23 10 L23 18" stroke="${darkBrown}" stroke-opacity="0.3" stroke-width="1"/>
        </g>
      `;
    }

    if (type >= 2) {
      // Lit Tip (Ember + Ash)
      // Tip is at the left side of the rect (before rotation) -> x=5
      // After rotation -45deg, the "top-left" of the cigar is the tip.
      svgContent += `
        <g transform="rotate(-45 10 10)">
           <!-- Ash -->
           <rect x="3" y="10" width="2" height="8" rx="1" fill="${ash}" />
           <!-- Ember Glow -->
           <circle cx="3" cy="14" r="1.5" fill="${ember}">
             <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite" />
           </circle>
        </g>
      `;
    }

    if (type >= 3) {
      // Gold Ring (Boss Status)
      // Located near the "mouth" end (right side of rect) -> x=20
      svgContent += `
        <g transform="rotate(-45 10 10)">
           <rect x="20" y="9.5" width="4" height="9" fill="${gold}" stroke="#B8860B" stroke-width="0.5" />
        </g>
      `;
    }

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        ${svgContent}
      </svg>
    `;

    // Encode SVG
    const encoded = encodeURIComponent(svg.trim().replace(/\s+/g, " "));
    
    // Hotspot at 2 2 (near the tip)
    return `url('data:image/svg+xml;utf8,${encoded}') 2 2, auto`;
  },

  update: (state) => {
    const upgrades = state.upgrades || [];
    let level = 0;

    if (upgrades.includes("click_upgrade_3")) level = 3;
    else if (upgrades.includes("click_upgrade_2")) level = 2;
    else if (upgrades.includes("click_upgrade_1")) level = 1;

    // Apply class to body for global cursor override
    // Note: We are injecting the style directly or managing classes.
    // Managing inline style is easier for dynamic SVG generation.
    
    if (level > 0) {
      const cursorVal = CursorManager.getCursorUrl(level);
      if (document.body.style.cursor !== cursorVal) {
        document.body.style.cursor = cursorVal;
        
        // Also enforce on clickable elements if they override it
        // We can inject a style tag to override everything
        CursorManager.injectGlobalCursor(cursorVal);
      }
    } else {
      document.body.style.cursor = "auto";
      CursorManager.removeGlobalCursor();
    }
  },

  styleElement: null,

  injectGlobalCursor: (cursorVal) => {
    if (!CursorManager.styleElement) {
      CursorManager.styleElement = document.createElement('style');
      document.head.appendChild(CursorManager.styleElement);
    }
    
    // Override pointer cursor for buttons/links to maintain the cigar theme
    // but maybe with a slightly different variant? For now, same cursor.
    CursorManager.styleElement.textContent = `
      body, button, a, .clickable {
        cursor: ${cursorVal} !important;
      }
    `;
  },

  removeGlobalCursor: () => {
    if (CursorManager.styleElement) {
      CursorManager.styleElement.textContent = "";
    }
  }
};
