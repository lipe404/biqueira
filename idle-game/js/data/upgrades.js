export const UPGRADES = {
    // CLICK UPGRADES
    click_upgrade_1: {
        id: 'click_upgrade_1',
        name: 'Dedo Calejado',
        description: 'Anos de treino no gatilho. Dobra o poder do clique.',
        cost: 50,
        trigger: (state) => state.resources.money >= 10,
        effect: (state) => {
            state.click.multiplier *= 2;
        }
    },
    click_upgrade_2: {
        id: 'click_upgrade_2',
        name: 'Luva Tática',
        description: 'Melhor aderência pro corre. Clique 2x mais forte.',
        cost: 500,
        trigger: (state) => state.resources.money >= 100,
        effect: (state) => {
            state.click.multiplier *= 2;
        }
    },
    click_upgrade_3: {
        id: 'click_upgrade_3',
        name: 'Macro Ilegal',
        description: 'Um scriptzinho maroto. Clique 3x mais forte.',
        cost: 2500,
        trigger: (state) => state.resources.money >= 1000,
        effect: (state) => {
            state.click.multiplier *= 3;
        }
    },

    // AUTOMATION UPGRADES - PRODUCERS
    intern_efficiency_1: {
        id: 'intern_efficiency_1',
        name: 'Chicote Psicológico',
        description: 'Estagiários produzem 50% mais. "A experiência é o pagamento."',
        cost: 200,
        trigger: (state) => state.automation.npcs['intern'] >= 10,
        effect: (state) => {
            if (!state.multipliers) state.multipliers = {};
            if (!state.multipliers.intern) state.multipliers.intern = 1;
            state.multipliers.intern *= 1.5;
        }
    },
    assembly_bot_upgrade_1: {
        id: 'assembly_bot_upgrade_1',
        name: 'Overclock na Gambiarra',
        description: 'Robôs produzem 2x mais, mas esquentam um pouco.',
        cost: 5000,
        trigger: (state) => state.automation.npcs['assembly_bot'] >= 5,
        effect: (state) => {
            if (!state.multipliers) state.multipliers = {};
            if (!state.multipliers.assembly_bot) state.multipliers.assembly_bot = 1;
            state.multipliers.assembly_bot *= 2;
        }
    },
    offshore_factory_upgrade_1: {
        id: 'offshore_factory_upgrade_1',
        name: 'Suborno na Alfândega',
        description: 'Fábricas Offshore fluem melhor. +50% produção.',
        cost: 50000,
        trigger: (state) => state.automation.npcs['offshore_factory'] >= 1,
        effect: (state) => {
            if (!state.multipliers) state.multipliers = {};
            if (!state.multipliers.offshore_factory) state.multipliers.offshore_factory = 1;
            state.multipliers.offshore_factory *= 1.5;
        }
    },

    // AUTOMATION UPGRADES - SELLERS
    telemarketer_efficiency_1: {
        id: 'telemarketer_efficiency_1',
        name: 'Lista Vazada',
        description: 'Números "quentes". Telemarketing vende 50% mais.',
        cost: 300,
        trigger: (state) => state.automation.npcs['telemarketer'] >= 10,
        effect: (state) => {
            if (!state.multipliers) state.multipliers = {};
            if (!state.multipliers.telemarketer) state.multipliers.telemarketer = 1;
            state.multipliers.telemarketer *= 1.5;
        }
    },
    online_store_upgrade_1: {
        id: 'online_store_upgrade_1',
        name: 'Bot de Review',
        description: '5 estrelas em tudo. Loja vende 2x mais.',
        cost: 4000,
        trigger: (state) => state.automation.npcs['online_store'] >= 1,
        effect: (state) => {
            if (!state.multipliers) state.multipliers = {};
            if (!state.multipliers.online_store) state.multipliers.online_store = 1;
            state.multipliers.online_store *= 2;
        }
    },

    // RISK MANAGEMENT
    risk_management_1: {
        id: 'risk_management_1',
        name: 'Laranjas Profissionais',
        description: 'Reduz a geração passiva de Suspeita (Calor) em 20%.',
        cost: 1000,
        trigger: (state) => state.resources.heat >= 20,
        effect: (state) => {
             if (!state.multipliers) state.multipliers = {};
             if (!state.multipliers.risk) state.multipliers.risk = 1;
             state.multipliers.risk *= 0.8;
        }
    },
    risk_management_2: {
        id: 'risk_management_2',
        name: 'VPN na Deepweb',
        description: 'Rastrear a gente ficou difícil. -30% Suspeita.',
        cost: 5000,
        trigger: (state) => state.resources.heat >= 40,
        effect: (state) => {
             if (!state.multipliers) state.multipliers = {};
             if (!state.multipliers.risk) state.multipliers.risk = 1;
             state.multipliers.risk *= 0.7;
        }
    }
};
