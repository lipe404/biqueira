export const EVENTS = [
    {
        id: 'tax_audit',
        name: 'Auditoria Surpresa',
        description: 'As autoridades estão verificando seus livros.',
        type: 'negative',
        condition: (state) => state.resources.heat > 50,
        chance: 0.05, // 5% chance per tick check if condition met
        effect: (state) => {
            const fine = Math.floor(state.resources.money * 0.2);
            state.resources.money -= fine;
            state.resources.heat -= 20; // At least they leave after fining you
            return `Você foi multado em $${fine}. Suspeita reduzida em 20%.`;
        }
    },
    {
        id: 'viral_post',
        name: 'Marketing Viral',
        description: 'Um influenciador mencionou seu produto.',
        type: 'positive',
        condition: (state) => true,
        chance: 0.02,
        effect: (state) => {
            const bonus = Math.floor(state.production.moneyPerSecond * 60) || 100;
            state.resources.money += bonus;
            state.resources.heat += 5; // Fame brings scrutiny
            return `Vendas dispararam! Ganhou $${bonus}. Suspeita aumentou em 5%.`;
        }
    },
    {
        id: 'safety_inspection',
        name: 'Inspeção de Segurança',
        description: 'Os inspetores não encontraram problemas... surpreendentemente.',
        type: 'neutral',
        condition: (state) => state.resources.heat > 10,
        chance: 0.03,
        effect: (state) => {
            state.resources.heat -= 10;
            return `Suspeita reduzida em 10%.`;
        }
    }
];
