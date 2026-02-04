export const EQUIPMENT = {
    // Shoes
    "havaianas": {
        id: "havaianas",
        name: "Havaianas Branca",
        type: "shoes",
        description: "Clássica. Aumenta a velocidade do chinelo.",
        cost: 150,
        bonus: { type: "click_power", value: 2, desc: "+2 Poder de Clique" }
    },
    "mizuno": {
        id: "mizuno",
        name: "Mizuno Prophecy",
        type: "shoes",
        description: "O de mil. Impõe respeito na caminhada.",
        cost: 7500,
        bonus: { type: "click_power", value: 50, desc: "+50 Poder de Clique" }
    },

    // Clothing
    "camisa_time": {
        id: "camisa_time",
        name: "Camisa de Time",
        type: "clothing",
        description: "Original tailandesa. Aumenta a moral.",
        cost: 800,
        bonus: { type: "production_rate", value: 0.05, desc: "+5% Produção" }
    },
    "conjunto_oakley": {
        id: "conjunto_oakley",
        name: "Conjunto da Oakley",
        type: "clothing",
        description: "Blindado contra o frio e contra o recalque.",
        cost: 15000,
        bonus: { type: "heat_reduction", value: 0.15, desc: "-15% Calor Gerado" }
    },

    // Accessory
    "juliet": {
        id: "juliet",
        name: "Juliet 24k",
        type: "accessory",
        description: "A lente que reflete a inveja.",
        cost: 3000,
        bonus: { type: "sell_price", value: 0.10, desc: "+10% Preço de Venda" }
    },
    "cordao_ouro": {
        id: "cordao_ouro",
        name: "Cordão de Ouro",
        type: "accessory",
        description: "Pesado no pescoço, leve na consciência.",
        cost: 60000,
        bonus: { type: "global_multiplier", value: 0.20, desc: "+20% Bônus Global" }
    },

    // Weapon (Defense/Aggression)
    "faca": {
        id: "faca",
        name: "Faca de Pão",
        type: "weapon",
        description: "Melhor que nada na hora do aperto.",
        cost: 500,
        bonus: { type: "click_power", value: 5, desc: "+5 Poder de Clique" }
    },
    "oitao": {
        id: "oitao",
        name: "Peça",
        type: "weapon",
        description: "Ferramenta de trabalho. Resolve problemas rápido.",
        cost: 40000,
        bonus: { type: "click_power", value: 150, desc: "+150 Poder de Clique" }
    }
};
