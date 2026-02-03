export const NPCS = {
    intern: {
        id: 'intern',
        name: 'Unpaid Intern',
        role: 'producer',
        description: 'Assembles widgets manually. Cheap labor.',
        baseCost: 15,
        baseProduction: 1, // Widgets per second
        baseRisk: 0.1, 
        costMultiplier: 1.15
    },
    telemarketer: {
        id: 'telemarketer',
        name: 'Telemarketer',
        role: 'seller',
        description: 'Annoys people until they buy widgets.',
        baseCost: 20,
        baseProduction: 1, // Sells 1 widget per second
        baseRisk: 0.05,
        costMultiplier: 1.15
    },
    assembly_bot: {
        id: 'assembly_bot',
        name: 'Assembly Bot v1',
        role: 'producer',
        description: 'Automated assembly line.',
        baseCost: 100,
        baseProduction: 5,
        baseRisk: 0,
        costMultiplier: 1.15
    },
    middle_manager: {
        id: 'middle_manager',
        name: 'Middle Manager',
        role: 'manager', // Special role? Or maybe just passive buffer
        description: 'Optimizes workflow. Reduces Suspicion.',
        baseCost: 500,
        baseProduction: 0,
        baseRisk: -0.5, 
        costMultiplier: 1.2
    },
    online_store: {
        id: 'online_store',
        name: 'E-Commerce Site',
        role: 'seller',
        description: 'Sells widgets while you sleep.',
        baseCost: 1000,
        baseProduction: 10, // Sells 10/s
        baseRisk: 0.2, // Data leaks?
        costMultiplier: 1.25
    },
    offshore_factory: {
        id: 'offshore_factory',
        name: 'Offshore Factory',
        role: 'producer',
        description: 'Massive production, high risk.',
        baseCost: 12000,
        baseProduction: 100,
        baseRisk: 2.0,
        costMultiplier: 1.25
    },
    global_marketing: {
        id: 'global_marketing',
        name: 'Global Marketing',
        role: 'seller',
        description: 'Brainwashes the masses to consume.',
        baseCost: 50000,
        baseProduction: 100,
        baseRisk: 1.0,
        costMultiplier: 1.3
    }
};
