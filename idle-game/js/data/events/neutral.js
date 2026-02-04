export const NEUTRAL_EVENTS = [
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
      return `Vendas caíram. Perdeu $${lostSales}.`;
    },
  },
  {
    id: "churrasco_laje",
    name: "Churrasco na Laje",
    description: "Dia de sol, piscina de plástico e pagode.",
    type: "neutral",
    condition: (state) => state.resources.money > 1000,
    chance: 0.04,
    effect: (state) => {
        const cost = 300;
        if (state.resources.money >= cost) {
            state.resources.money -= cost;
            state.resources.heat -= 10;
            return `Gastou $${cost} em picanha e carvão. A comunidade curtiu (Suspeita -10%).`;
        }
        return "Faltou grana pra carne.";
    },
  },
  {
    id: "queda_luz",
    name: "Gato de Luz Estourou",
    description: "Apagão geral na viela.",
    type: "neutral",
    condition: (state) => true,
    chance: 0.05,
    effect: (state) => {
      const lost = Math.floor(state.production.widgetsPerSecond * 30);
      state.resources.widgets = Math.max(0, state.resources.widgets - lost);
      return `Ficou no escuro. Perdeu produção potencial de ${lost} itens.`;
    },
  },
];
