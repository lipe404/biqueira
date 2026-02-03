# Corporação Genérica: Tycoon Idle - Documento de Design

## 1. Visão Geral do Jogo
**Tema:** Simulador Corporativo Satírico. O jogador gerencia a "Corporação Genérica", uma empresa que produz "Widgets" indefinidos para ganhar Dinheiro, enquanto gerencia "Suspeita" (Risco) para evitar auditorias.
**Gênero:** Idle / Clicker / Incremental.
**Plataforma:** Web (HTML5/JS).

## 2. Loop Principal (Core Loop)
1.  **Clicar/Produzir:** O jogador clica para produzir Widgets (Estoque).
2.  **Vender:** O jogador vende Widgets por Dinheiro.
3.  **Investir:** Dinheiro é usado para comprar NPCs (Automação) e Melhorias.
4.  **Gerenciar Risco:** Alta produção gera Calor (Suspeita). Se o Calor atingir 100%, ocorrem penalidades.
5.  **Prestígio:** O jogador se aposenta para ganhar "Influência", que aumenta permanentemente a produção futura.

## 3. Modelo Econômico
-   **Dinheiro ($):** Moeda principal.
-   **Widgets (Estoque):** Recurso intermediário. Deve ser vendido para ganhar dinheiro.
-   **Calor (0-100%):** Medidor de risco. Decai lentamente, aumenta com produção agressiva.
-   **Influência:** Moeda de prestígio. Multiplicador para a produção global.

### Fórmulas
-   **Custo de NPC:** `CustoBase * (1.15 ^ Quantidade)`
-   **Produção:** `ProdBase * Quantidade * Multiplicadores * Influência`
-   **Geração de Calor:** `RiscoBase * Quantidade * Multiplicadores`

## 4. Arquitetura de Sistemas
A base de código é modular e separa estritamente dados, estado e lógica.

### Estrutura de Diretórios
-   `js/core/`: Game Loop, Gerenciamento de Estado, Sistema de Save.
-   `js/systems/`: Lógica para cada mecânica (Clique, Automação, Risco, etc.).
-   `js/data/`: Configuração estática (NPCs, Melhorias, Eventos).
-   `js/ui/`: Manipulação do DOM e Binding de Eventos.

### Componentes Chave
-   **GameState:** Um objeto singleton contendo todo o estado dinâmico do jogo.
-   **GameLoop:** Um loop de atualização de passo fixo usando `requestAnimationFrame`.
-   **SaveSystem:** Usa `localStorage` com codificação Base64 para persistência. Lida com o cálculo de tempo offline.

## 5. Automação e NPCs
-   **Estagiário:** Produtor básico. Barato, mas arriscado.
-   **Telemarketing:** Vendedor básico. Converte Estoque em Dinheiro.
-   **Robô de Montagem:** Produtor seguro. Sem risco.
-   **Gerente Intermediário:** Redutor de risco.
-   **Fábrica Offshore:** Alto volume, alto risco.

## 6. Eventos
Eventos aleatórios são acionados com base em condições (principalmente Calor).
-   **Auditoria:** Punição para alto Calor.
-   **Marketing Viral:** Dinheiro bônus.

## 7. Plano de Expansão
-   **Backend:** Mover `saveSystem.js` para chamar um endpoint de API.
-   **Multiplayer:** Placares baseados em "Patrimônio Líquido".
-   **Visuais:** Adicionar visualização de fábrica baseada em canvas.
