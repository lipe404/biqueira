export const UPGRADES = {
    click_upgrade_1: {
        id: 'click_upgrade_1',
        name: 'Ergonomic Mouse',
        description: 'Doubles clicking power. "No more carpal tunnel!"',
        cost: 50,
        trigger: (state) => state.resources.money >= 10, // Visible when player has some money
        effect: (state) => {
            state.click.multiplier *= 2;
        }
    },
    click_upgrade_2: {
        id: 'click_upgrade_2',
        name: 'Mechanical Keyboard',
        description: 'Doubles clicking power again. "Click-clack!"',
        cost: 500,
        trigger: (state) => state.resources.money >= 100,
        effect: (state) => {
            state.click.multiplier *= 2;
        }
    },
    intern_efficiency_1: {
        id: 'intern_efficiency_1',
        name: 'Free Coffee',
        description: 'Interns work 50% faster. "Caffeine is a food group."',
        cost: 200,
        trigger: (state) => state.automation.npcs['intern'] >= 10,
        effect: (state) => {
            // This needs to be handled in the automation system logic
            // We'll mark it in a specialized multiplier object or handle it via ID check
            if (!state.multipliers) state.multipliers = {};
            if (!state.multipliers.intern) state.multipliers.intern = 1;
            state.multipliers.intern *= 1.5;
        }
    },
    risk_management_1: {
        id: 'risk_management_1',
        name: 'Paper Shredder',
        description: 'Reduces passive Suspicion generation by 10%.',
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
        name: 'Firmware Update',
        description: 'Assembly Bots produce 2x Widgets.',
        cost: 5000,
        trigger: (state) => state.automation.npcs['assembly_bot'] >= 5,
        effect: (state) => {
             if (!state.multipliers) state.multipliers = {};
             if (!state.multipliers.assembly_bot) state.multipliers.assembly_bot = 1;
             state.multipliers.assembly_bot *= 2;
        }
    }
};
