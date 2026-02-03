export const NEGATIVE_EVENTS = [
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
];
