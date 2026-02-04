export const TERRITORIES = {
    "viela_sapo": {
        id: "viela_sapo",
        name: "Viela do Sapo",
        description: "Área residencial densa. Ótima para distribuição rápida.",
        cost: 1000,
        reqBuilding: 0,
        bonus: {
            type: "production_rate",
            value: 0.1, // +10%
            desc: "+10% Produção Global"
        }
    },
    "praca_relogio": {
        id: "praca_relogio",
        name: "Praça do Relógio",
        description: "Ponto de encontro da molecada. Reduz a atenção da polícia.",
        cost: 5000,
        reqBuilding: 1,
        bonus: {
            type: "heat_reduction",
            value: 0.1, // -10% Heat gain
            desc: "-10% Geração de Calor"
        }
    },
    "zona_portuaria": {
        id: "zona_portuaria",
        name: "Zona Portuária",
        description: "Acesso a mercadorias importadas. Custo de operação menor.",
        cost: 25000,
        reqBuilding: 2,
        bonus: {
            type: "cost_reduction",
            value: 0.15, // -15% NPC Cost
            desc: "-15% Custo de Contratação"
        }
    },
    "avenida_principal": {
        id: "avenida_principal",
        name: "Avenida Principal",
        description: "Fluxo alto de clientes endinheirados.",
        cost: 100000,
        reqBuilding: 3,
        bonus: {
            type: "sell_price",
            value: 0.2, // +20% Sell Value
            desc: "+20% Valor de Venda"
        }
    },
    "morro_alto": {
        id: "morro_alto",
        name: "Morro Alto",
        description: "Visão estratégica de toda a cidade. Controle total.",
        cost: 500000,
        reqBuilding: 4,
        bonus: {
            type: "global_multiplier",
            value: 0.5, // +50% Everything (Production/Sell)
            desc: "+50% Bônus Geral"
        }
    }
};
