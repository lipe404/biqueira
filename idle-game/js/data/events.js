export const EVENTS = [
    {
        id: 'tax_audit',
        name: 'Surprise Audit',
        description: 'The authorities are checking your books.',
        type: 'negative',
        condition: (state) => state.resources.heat > 50,
        chance: 0.05, // 5% chance per tick check if condition met
        effect: (state) => {
            const fine = Math.floor(state.resources.money * 0.2);
            state.resources.money -= fine;
            state.resources.heat -= 20; // At least they leave after fining you
            return `You were fined $${fine}. Suspicion reduced by 20%.`;
        }
    },
    {
        id: 'viral_post',
        name: 'Viral Marketing',
        description: 'An influencer mentioned your product.',
        type: 'positive',
        condition: (state) => true,
        chance: 0.02,
        effect: (state) => {
            const bonus = Math.floor(state.production.moneyPerSecond * 60) || 100;
            state.resources.money += bonus;
            state.resources.heat += 5; // Fame brings scrutiny
            return `Sales spike! Gained $${bonus}. Suspicion increased by 5%.`;
        }
    },
    {
        id: 'safety_inspection',
        name: 'Safety Inspection',
        description: 'Inspectors found no issues... surprisingly.',
        type: 'neutral',
        condition: (state) => state.resources.heat > 10,
        chance: 0.03,
        effect: (state) => {
            state.resources.heat -= 10;
            return `Suspicion reduced by 10%.`;
        }
    }
];
