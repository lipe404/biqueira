export const POSITIVE_EVENTS = [
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
];
