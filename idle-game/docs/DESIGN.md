# Generic Corp: Idle Tycoon - Design Document

## 1. Game Overview
**Theme:** Satirical Corporate Simulator. The player manages "Generic Corp", a company that produces undefined "Widgets" to earn Money, while managing "Suspicion" (Risk) to avoid audits.
**Genre:** Idle / Clicker / Incremental.
**Platform:** Web (HTML5/JS).

## 2. Core Loop
1.  **Click/Produce:** Player clicks to produce Widgets (Stock).
2.  **Sell:** Player sells Widgets for Money.
3.  **Invest:** Money is used to buy NPCs (Automation) and Upgrades.
4.  **Manage Risk:** High production generates Heat (Suspicion). If Heat hits 100%, penalties occur.
5.  **Prestige:** Player retires to gain "Influence", which boosts future production permanently.

## 3. Economy Model
-   **Money ($):** Primary currency.
-   **Widgets (Stock):** Intermediate resource. Must be sold to gain money.
-   **Heat (0-100%):** Risk meter. Decays slowly, increases with aggressive production.
-   **Influence:** Prestige currency. Multiplier for global production.

### Formulas
-   **NPC Cost:** `BaseCost * (1.15 ^ Count)`
-   **Production:** `BaseProd * Count * Multipliers * Influence`
-   **Heat Gen:** `BaseRisk * Count * Multipliers`

## 4. Systems Architecture
The codebase is modular and strictly separates data, state, and logic.

### Directory Structure
-   `js/core/`: Game Loop, State Management, Save System.
-   `js/systems/`: Logic for each mechanic (Click, Automation, Risk, etc.).
-   `js/data/`: Static configuration (NPCs, Upgrades, Events).
-   `js/ui/`: DOM manipulation and Event binding.

### Key Components
-   **GameState:** A singleton object containing the entire dynamic state of the game.
-   **GameLoop:** A fixed-step update loop using `requestAnimationFrame`.
-   **SaveSystem:** Uses `localStorage` with Base64 encoding for persistence. Handles offline time calculation.

## 5. Automation & NPCs
-   **Intern:** Basic producer. Cheap but risky.
-   **Telemarketer:** Basic seller. Converts Stock to Money.
-   **Assembly Bot:** Safe producer. No risk.
-   **Middle Manager:** Risk reducer.
-   **Offshore Factory:** High volume, high risk.

## 6. Events
Random events trigger based on conditions (mainly Heat).
-   **Audit:** Punishment for high Heat.
-   **Viral Marketing:** Bonus money.

## 7. Expansion Plan
-   **Backend:** Move `saveSystem.js` to call an API endpoint.
-   **Multiplayer:** Leaderboards based on "Net Worth".
-   **Visuals:** Add canvas-based factory visualization.
