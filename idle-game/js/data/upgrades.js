export const UPGRADES = {
    click_upgrade_1: {
        id: 'click_upgrade_1',
        name: 'Mouse Ergonômico',
        description: 'Dobra o poder do clique. "Chega de tendinite!"',
        cost: 50,
        trigger: (state) => state.resources.money >= 10, // Visible when player has some money
        effect: (state) => {
            state.click.multiplier *= 2;
        }
    },
    click_upgrade_2: {
        id: 'click_upgrade_2',
        name: 'Teclado Mecânico',
        description: 'Dobra o poder do clique novamente. "Click-clack!"',
        cost: 500,
        trigger: (state) => state.resources.money >= 100,
        effect: (state) => {
            state.click.multiplier *= 2;
        }
    },
    intern_efficiency_1: {
        id: 'intern_efficiency_1',
        name: 'Café Grátis',
        description: 'Estagiários trabalham 50% mais rápido. "Cafeína é um grupo alimentar."',
        cost: 200,
        trigger: (state) => state.automation.npcs['intern'] >= 10,
        effect: (state) => {
            if (!state.multipliers) state.multipliers = {};
            if (!state.multipliers.intern) state.multipliers.intern = 1;
            state.multipliers.intern *= 1.5;
        }
    },
    risk_management_1: {
        id: 'risk_management_1',
        name: 'Trituradora de Papel',
        description: 'Reduz a geração passiva de Suspeita em 10%.',
        cost: 1000,
        trigger: (state) => state.resources.heat >= 20,
        effect: (state) => {
             if (!state.multipliers) state.multipliers = {};
             if (!state.multipliers.risk) state.multipliers.risk = 1;
             state.multipliers.risk *= 0.9;
        }
    },
    bot_upgrade_1: {
        id: 'bot_upgrade_1',
        name: 'Atualização de Firmware',
        description: 'Robôs de Montagem produzem 2x mais Widgets.',
        cost: 5000,
        trigger: (state) => state.automation.npcs['assembly_bot'] >= 5,
        effect: (state) => {
             if (!state.multipliers) state.multipliers = {};
             if (!state.multipliers.assembly_bot) state.multipliers.assembly_bot = 1;
             state.multipliers.assembly_bot *= 2;
        }
    }
};
