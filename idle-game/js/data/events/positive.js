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
  {
    id: "baile_favela",
    name: "Baile de Favela",
    description: "O fluxo tá insano! A comunidade toda tá aqui.",
    type: "positive",
    condition: (state) => state.resources.money > 2000,
    chance: 0.02,
    effect: (state) => {
      const bonus = Math.floor(state.production.moneyPerSecond * 300) || 1000;
      state.resources.money += bonus;
      state.resources.heat += 10;
      return `Fluxo gerou +$${bonus}. Suspeita +10%.`;
    },
  },
  {
    id: "futebol_beneficente",
    name: "Futebol Beneficente",
    description: "Jogadores famosos colaram. A mídia tá distraída.",
    type: "positive",
    condition: (state) => state.resources.heat > 40,
    chance: 0.03,
    effect: (state) => {
      state.resources.heat -= 20;
      return `Mídia distraída. Suspeita caiu 20%.`;
    },
  },
];
