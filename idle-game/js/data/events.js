export const EVENTS = [
  // NEGATIVE
  {
    id: "police_raid",
    name: "Batida Policial",
    description: "A sirene tocou. Tivemos que descartar mercadoria.",
    type: "negative",
    condition: (state) => state.resources.heat > 60,
    chance: 0.08,
    effect: (state) => {
      const lost = Math.floor(state.resources.widgets * 0.3);
      state.resources.widgets -= lost;
      state.resources.heat -= 25; // Heat drops after raid
      return `Perdeu ${lost} mercadorias. Suspeita baixou 25%.`;
    },
  },
  {
    id: "tax_audit",
    name: 'Cobrança do "Sindicato"',
    description: "Os caras vieram cobrar a proteção.",
    type: "negative",
    condition: (state) => state.resources.money > 1000,
    chance: 0.05,
    effect: (state) => {
      const fine = Math.floor(state.resources.money * 0.15);
      state.resources.money -= fine;
      return `Pagou $${fine} de proteção.`;
    },
  },
  {
    id: "snitch",
    name: "X9 na Área",
    description: "Alguém abriu o bico.",
    type: "negative",
    condition: (state) => state.resources.heat > 30,
    chance: 0.04,
    effect: (state) => {
      state.resources.heat += 15;
      return `Suspeita subiu +15%. Fique esperto.`;
    },
  },

  // POSITIVE
  {
    id: "viral_post",
    name: "Trend no TikTok",
    description: "A molecada tá usando nosso produto nos vídeos.",
    type: "positive",
    condition: (state) => true,
    chance: 0.03,
    effect: (state) => {
      const bonus = Math.floor(state.production.moneyPerSecond * 120) || 200;
      state.resources.money += bonus;
      state.resources.heat += 5;
      return `Vendas estouraram! +$${bonus}. Suspeita +5%.`;
    },
  },
  {
    id: "supplier_error",
    name: "Carga Tombada",
    description: "Caiu do caminhão, direto pro nosso estoque.",
    type: "positive",
    condition: (state) => true,
    chance: 0.04,
    effect: (state) => {
      const bonus = Math.floor(state.production.widgetsPerSecond * 60) || 50;
      state.resources.widgets += bonus;
      return `Chegou ${bonus} mercadorias "doadas".`;
    },
  },

  // NEUTRAL / MIXED
  {
    id: "bribe_success",
    name: "Cafézinho pro Guarda",
    description: "Molhou a mão certa.",
    type: "neutral",
    condition: (state) =>
      state.resources.money > 500 && state.resources.heat > 20,
    chance: 0.05,
    effect: (state) => {
      const cost = 200;
      if (state.resources.money >= cost) {
        state.resources.money -= cost;
        state.resources.heat -= 15;
        return `Custou $${cost}. Suspeita caiu 15%.`;
      }
      return `Sem grana pro café. Nada mudou.`;
    },
  },
  {
    id: "rival_gang",
    name: "Treta na Quebrada",
    description: "Gangues rivais trocando tiro. Movimento caiu.",
    type: "neutral",
    condition: (state) => state.resources.heat < 80,
    chance: 0.03,
    effect: (state) => {
      // Temporary debuff logic would go here, for now instant effect
      const lostSales = Math.floor(state.resources.money * 0.05);
      state.resources.money -= lostSales;
      state.resources.heat -= 5; // Less heat cause everyone is hiding
      return `Vendas caíram $${lostSales}. Mas a polícia tá ocupada (-5% Suspeita).`;
    },
  },
];
