export const RESEARCH = {
    "efficiency_training": {
        id: "efficiency_training",
        name: "Treinamento de Eficiência",
        description: "Ensina a molecada a não desperdiçar. +10% Produção Global.",
        cost: 1000,
        req: (state) => state.resources.money >= 500,
        effect: (state) => {
            if (!state.multipliers) state.multipliers = {};
            state.multipliers.global_production = (state.multipliers.global_production || 1) * 1.1;
        }
    },
    "advanced_logistics": {
        id: "advanced_logistics",
        name: "Logística Avançada",
        description: "Rotas de fuga e entrega otimizadas. -10% Risco de Calor.",
        cost: 5000,
        req: (state) => state.resources.money >= 2000,
        effect: (state) => {
             // Handled in RiskSystem via checking owned researches
        }
    },
    "crypto_laundering": {
        id: "crypto_laundering",
        name: "Lavagem via Cripto",
        description: "O dinheiro gira mais rápido. +15% Preço de Venda.",
        cost: 15000,
        req: (state) => state.resources.money >= 5000,
        effect: (state) => {
             // Handled in ClickSystem/AutomationSystem via checking bonuses
        }
    },
    "automation_tech": {
        id: "automation_tech",
        name: "Automação Industrial",
        description: "Máquinas fazendo o trabalho sujo. Desbloqueia Fábricas Offshore.",
        cost: 50000,
        req: (state) => state.resources.money >= 20000,
        effect: (state) => {
            state.flags = state.flags || {};
            state.flags.automation_unlocked = true;
        }
    }
};
