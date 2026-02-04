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
  {
    id: "operacao_choque",
    name: "Operação de Choque",
    description: "Caveirão subiu o morro. Tudo parado.",
    type: "negative",
    condition: (state) => state.resources.heat > 80,
    chance: 0.06,
    effect: (state) => {
      const lost = Math.floor(state.resources.widgets * 0.5);
      state.resources.widgets -= lost;
      state.resources.heat -= 40; 
      return `Apreenderam ${lost} cargas. Mas a poeira baixou (Suspeita -40%).`;
    },
  },
  {
    id: "invasao_alemao",
    name: "Invasão de Alemão",
    description: "Tentaram tomar a boca. Tivemos prejuízo pra defender.",
    type: "negative",
    condition: (state) => state.resources.money > 5000,
    chance: 0.04,
    effect: (state) => {
      const cost = Math.floor(state.resources.money * 0.25);
      state.resources.money -= cost;
      state.resources.heat += 20;
      return `Defesa custou $${cost}. O clima esquentou (Suspeita +20%).`;
    },
  },
];
