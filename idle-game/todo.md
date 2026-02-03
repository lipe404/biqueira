# TODO.MD — ROADMAP DE DESENVOLVIMENTO: A FIRMA

Este documento serve como o roteiro central para o desenvolvimento, manutenção e expansão do projeto "A FIRMA".

## Categoria 1 — Arquitetura Geral

## Categoria 2 — Organização de Pastas e Arquivos

## Categoria 3 — Qualidade do Código JavaScript

- [ ] Implementar JSDoc em todas as funções públicas e classes.
- [ ] Eliminar números mágicos no código (extrair para constantes).

## Categoria 4 — Performance e Otimização

- [ ] Implementar "Dirty Checking" no `renderer.js` para evitar updates de DOM desnecessários.
- [ ] Utilizar `requestAnimationFrame` para animações visuais em vez de CSS transitions pesadas.
- [ ] Otimizar o loop principal: limitar o processamento de lógica se o jogo estiver em background (tab inativa).
- [ ] Implementar Object Pooling para partículas e elementos de UI efêmeros (logs).
- [ ] Reduzir layout thrashing: agrupar leituras e escritas no DOM.
- [ ] Utilizar `DocumentFragment` para inserção em massa de elementos (lista de upgrades).
- [ ] Cachear seletores de DOM no `init()` (já feito parcialmente, revisar cobertura).
- [ ] Debounce ou Throttle em event listeners de alta frequência (scroll, resize).
- [ ] Otimizar imagens (WebP, compressão) para reduzir load time.
- [ ] Implementar Lazy Loading para imagens ou recursos pesados.
- [ ] Minificar JS e CSS para produção.
- [ ] Utilizar CSS `will-change` com parcimônia para otimizar renderização de camadas.
- [ ] Analisar memory leaks (event listeners não removidos).
- [ ] Otimizar cálculos matemáticos no loop (pré-calcular constantes).
- [ ] Reduzir o número de partículas ativas simultaneamente.
- [ ] Utilizar Web Workers para cálculos pesados (ex: simulação offline muito longa).
- [ ] Otimizar seletores CSS (evitar seletores muito profundos).
- [ ] Monitorar FPS e ajustar qualidade gráfica dinamicamente.
- [ ] Implementar Virtual Scrolling para listas muito longas (logs, upgrades futuros).
- [ ] Perfilamento de código com Chrome DevTools para identificar gargalos.

## Categoria 5 — Gerenciamento de Estado

- [ ] Migrar `gameState` para um padrão Store (semelhante a Redux ou Vuex simplificado).
- [ ] Implementar imutabilidade no estado para facilitar debug e histórico.
- [ ] Criar sistema de Snapshots do estado para rollback em caso de erro.
- [ ] Validar integridade do estado ao carregar (schema validation).
- [ ] Separar estado "volátil" (visual, cache) do estado "persistente" (save data).
- [ ] Implementar sistema de Migração de Estado para atualizações de versão do save.
- [ ] Criar getters computados para valores derivados (ex: `totalProduction`).
- [ ] Adicionar eventos de mudança de estado (`onMoneyChange`, `onLevelUp`).
- [ ] Proteger o estado contra modificação direta fora das Actions/Mutations.
- [ ] Implementar logs de transição de estado para debug.
- [ ] Persistir apenas o diff do estado (opcional, para saves menores).
- [ ] Centralizar lógica de reset (soft reset, hard reset, prestige reset).
- [ ] Gerenciar estados de UI (qual aba aberta, posição do scroll) no estado global?
- [ ] Criar mecanismo de "Cheat" ou "DevTools" para manipular estado em runtime.
- [ ] Adicionar verificação de limites (clamp) em todos os setters numéricos.
- [ ] Isolar estado de Configuração (settings) do estado de Jogo (progress).
- [ ] Implementar sistema de Conquistas baseado em observação de estado.
- [ ] Garantir que referências circulares não quebrem a serialização.
- [ ] Adicionar timestamp de última atualização em cada sub-objeto do estado.
- [ ] Criar testes unitários para as funções de mutação de estado.

## Categoria 6 — Game Loop e Timers

- [ ] Implementar delta-time (`dt`) variável vs fixo: decidir e padronizar.
- [ ] Criar sistema de agendamento de tarefas (`Scheduler`) no loop.
- [ ] Implementar pausa real (parar updates lógicos, manter renderização).
- [ ] Adicionar multiplicador de velocidade de jogo (para debug ou buffs).
- [ ] Corrigir acumulação de tempo em abas inativas (throttling do navegador).
- [ ] Sincronizar timers de eventos com o tempo do jogo, não tempo real.
- [ ] Criar classe `Timer` reutilizável (start, stop, pause, reset, onComplete).
- [ ] Implementar sistema de Cooldowns global gerenciado pelo loop.
- [ ] Monitorar e exibir FPS/TPS (Ticks Per Second) em modo debug.
- [ ] Garantir ordem de execução correta dos sistemas (ex: Produção -> Risco -> UI).
- [ ] Evitar espiral da morte (accumulatedTime > maxFrameTime).
- [ ] Implementar interpolação para renderização suave entre ticks (se necessário).
- [ ] Separar `LogicTick` de `RenderTick` explicitamente.
- [ ] Criar timers independentes para UI (animações) e Gameplay (lógica).
- [ ] Tratamento de "saltos" de tempo (lag spikes) para não quebrar a física/lógica.
- [ ] Implementar slow-motion (bullet time) como mecânica futura?
- [ ] Otimizar `setInterval` do AutoSave para usar o Game Loop.
- [ ] Garantir precisão de ponto flutuante no tempo acumulado.
- [ ] Criar eventos de `onTick` e `onSecond` para sistemas se inscreverem.
- [ ] Abstrair `requestAnimationFrame` para suportar ambientes sem janela (testes).

## Categoria 7 — Sistema Idle (Produção Passiva)

- [ ] Implementar simulação precisa offline (não apenas `prod * tempo`).
- [ ] Simular eventos aleatórios que teriam ocorrido offline (probabilístico).
- [ ] Adicionar limite de tempo offline (banco de horas) melhorável com upgrades.
- [ ] Criar modal de "Bem-vindo de volta" detalhado (recursos ganhos, eventos, mortes).
- [ ] Implementar consumo de recursos offline (manutenção de NPCs).
- [ ] Adicionar bônus por tempo offline (descanso da equipe?).
- [ ] Permitir "acelerar" o tempo offline assistindo ads (hipotético) ou pagando recursos.
- [ ] Corrigir bugs de arredondamento em grandes saltos de tempo.
- [ ] Implementar progressão de upgrades/construções iniciadas offline.
- [ ] Salvar timestamp de saída com precisão.
- [ ] Tratar mudança de fuso horário/relógio do sistema (anti-cheat básico).
- [ ] Calcular decaimento de Heat offline.
- [ ] Permitir configurar comportamento dos NPCs offline (seguro vs arriscado).
- [ ] Notificações locais (browser) quando o "banco de horas" encher.
- [ ] Implementar "Sonho" ou mecânica onírica durante o idle?
- [ ] Visualizar o progresso offline acontecendo acelerado (efeito visual).
- [ ] Garantir que o cálculo offline use os multiplicadores do momento da saída.
- [ ] Logar o tempo total em idle stats.
- [ ] Criar mecânica de "Automação 2.0" que só funciona online vs offline.
- [ ] Testar limites de integer overflow com tempos offline absurdos.

## Categoria 8 — Sistema de Clique (Active Gameplay)

- [ ] Implementar "Critical Click" (chance de x10 produção).
- [ ] Adicionar "Combo Meter": cliques rápidos aumentam multiplicador temporário.
- [ ] Criar efeitos visuais distintos para clique normal, crítico e venda.
- [ ] Implementar "Hold to Produce" (upgrade de acessibilidade/mid-game).
- [ ] Adicionar sons variados por intensidade do clique.
- [ ] Criar mecânica de "Overheat" no clique manual (dedo queimando).
- [ ] Implementar cliques em elementos do cenário para easter eggs.
- [ ] Adicionar upgrade de "Auto-Clicker" temporário (power-up).
- [ ] Visualizar o dano/produção flutuante (floating text) com pooling.
- [ ] Diferenciar clique de produção (botão esquerdo) e clique de venda (botão direito?).
- [ ] Adicionar mecânica de ritmo (clicar no beat da música).
- [ ] Implementar "Click Zones": áreas diferentes dão bônus diferentes.
- [ ] Prevenir autoclickers externos (limite de cliques/segundo humano).
- [ ] Adicionar animação de "esmagar" o botão.
- [ ] Criar upgrades que sinergizam clique com automação (clique buffa NPCs).
- [ ] Implementar "Charge Click": segurar para carregar um clique massivo.
- [ ] Adicionar feedback háptico (vibração) configurável em mobile.
- [ ] Criar conquistas baseadas em cliques (1000, 1M, cliques rápidos).
- [ ] Implementar cursor personalizado que muda com upgrades.
- [ ] Balancear escala de poder do clique vs automação no late game.

## Categoria 9 — Economia do Jogo

- [ ] Definir curvas de custo exponencial para todos os upgrades e NPCs.
- [ ] Implementar sistema de inflação (preços aumentam com o tempo/compras)?
- [ ] Adicionar múltiplos tipos de moeda (Dólar, Bitcoin, FavelaCoin).
- [ ] Criar mercado dinâmico: preço de venda do widget flutua.
- [ ] Implementar sistema de "Stock Market" simplificado.
- [ ] Adicionar custos de manutenção recorrentes para NPCs de alto nível.
- [ ] Criar mecânica de empréstimo (Agiota) com juros compostos.
- [ ] Balancear faucets (fontes) e sinks (drenos) de dinheiro.
- [ ] Implementar multiplicadores globais multiplicativos e aditivos corretamente.
- [ ] Adicionar conversão de recursos (ex: Influência -> Dinheiro).
- [ ] Criar upgrades que reduzem custos (descontos).
- [ ] Implementar sistema de Impostos (dreno automático baseado em renda).
- [ ] Visualizar gráficos de economia (produção vs tempo).
- [ ] Adicionar "Golden Widgets" (moeda premium ganhável).
- [ ] Balancear o soft-cap de dinheiro (se houver).
- [ ] Implementar "Black Market" para trocar recursos proibidos.
- [ ] Criar eventos de crise econômica.
- [ ] Adicionar mecânica de investimento (comprar baixo, vender alto).
- [ ] Revisar fórmulas de prestígio para evitar estagnação.
- [ ] Validar integridade matemática (evitar Infinity ou NaN).

## Categoria 10 — Progressão e Escalabilidade

- [ ] Mapear a curva de progressão (Early, Mid, Late, End Game).
- [ ] Adicionar sistema de Níveis de Jogador (Rank da Quebrada).
- [ ] Criar Árvore de Habilidades (Skill Tree) visual.
- [ ] Implementar "Milestones" (Desbloqueios por total produzido).
- [ ] Adicionar Tiers de construções (Barraco -> Loja -> Galpão -> Prédio).
- [ ] Criar sistema de "Rebirth" ou "Ascension" (além do prestígio).
- [ ] Adicionar mecânicas que só desbloqueiam após X resets.
- [ ] Implementar "Challenge Runs" (zerar com restrições por bônus).
- [ ] Escalar números para notação científica (1e10, 1e50) ou sufixos (K, M, B, T).
- [ ] Adicionar conteúdo procedural para o endgame infinito.
- [ ] Criar "Boss Battles": desafios de produção temporizados.
- [ ] Balancear o "Muro" (momento onde o progresso fica lento) para não frustrar.
- [ ] Adicionar colecionáveis (Cards, Skins) que dão bônus passivos.
- [ ] Implementar sistema de missões diárias/semanais.
- [ ] Criar narrativa que evolui com a progressão.
- [ ] Adicionar desbloqueio de novas áreas da cidade (novos painéis).
- [ ] Escalar a UI para comportar números gigantes sem quebrar layout.
- [ ] Adicionar "Soft Caps" e "Hard Caps" onde necessário.
- [ ] Criar mecânica de "Legacy" (herança entre resets).
- [ ] Testar o jogo em estágios avançados (simular meses de jogo).

## Categoria 11 — Balanceamento de Gameplay

- [ ] Criar planilha de balanceamento (Excel/Sheets) para simular curvas.
- [ ] Ajustar ROI (Return on Investment) de cada NPC.
- [ ] Balancear risco vs recompensa do sistema de Heat.
- [ ] Ajustar frequência e impacto dos eventos aleatórios.
- [ ] Revisar custo dos upgrades de Click vs Automação.
- [ ] Balancear o bônus de Prestígio (muito fraco ou muito forte?).
- [ ] Testar pacing: quanto tempo para o primeiro NPC? Primeiro upgrade?
- [ ] Ajustar penalidades de morte/prisão (não ser punitivo demais).
- [ ] Balancear multiplicadores de sinergia.
- [ ] Verificar se alguma estratégia dominante quebra o jogo.
- [ ] Ajustar escala de preços (linear, exponencial, fibonacci?).
- [ ] Balancear o impacto dos buffs temporários.
- [ ] Garantir que o jogador ativo tenha vantagem sobre o puramente idle.
- [ ] Ajustar tempo de cooldown de habilidades.
- [ ] Balancear custos de remoção de Heat.
- [ ] Revisar descrições para refletir números reais.
- [ ] Criar "Catch-up mechanics" para jogadores que ficaram para trás?
- [ ] Balancear o RNG (Random Number Generation) para evitar maré de azar.
- [ ] Ajustar progressão de dificuldade das "Boss Battles".
- [ ] Coletar métricas de analytics (local) para ajuste fino.

## Categoria 12 — Game Design (Core Loop)

- [ ] Refinar o tema "Cria/Favela" em todas as mecânicas.
- [ ] Adicionar mecânica de "Território": dominar áreas para bônus.
- [ ] Criar sistema de "Reputação" com facções (Polícia, Milícia, Traf... opositores).
- [ ] Implementar "Crafting": combinar widgets para criar produtos melhores.
- [ ] Adicionar minigames ativos para quebrar a monotonia do clique.
- [ ] Criar sistema de "Clima/Tempo": chuva afeta vendas, noite afeta risco.
- [ ] Implementar "Equipamentos" para o personagem principal.
- [ ] Adicionar mecânica de "Gestão de Crise" (decisões morais em eventos).
- [ ] Criar "Chain Reactions": eventos que desencadeiam outros eventos.
- [ ] Adicionar NPC "Consultor" que dá dicas baseadas no estado atual.
- [ ] Implementar "Laboratório": pesquisa de novas tecnologias.
- [ ] Adicionar mecânica de "Lavagem de Dinheiro" (converter dinheiro sujo em limpo).
- [ ] Criar "Mercado Negro": comprar itens raros com Heat alto.
- [ ] Adicionar "Pets" ou mascotes que dão bônus passivos.
- [ ] Implementar sistema de "Combo" entre upgrades.
- [ ] Criar final de jogo (Endgame condition) ou narrativa cíclica.
- [ ] Adicionar "Set Bonuses": ter todos os upgrades de um tipo dá bônus extra.
- [ ] Implementar mecânica de "Risco Controlado": manter Heat alto por bônus.
- [ ] Criar "Power-ups" que aparecem na tela e precisam ser clicados.
- [ ] Adicionar personalização do escritório/fábrica (visual).

## Categoria 13 — UI (Interface Visual)

- [ ] Criar sistema de Temas (Claro, Escuro, Alto Contraste, Cyberpunk).
- [ ] Melhorar feedback visual dos botões (estados: hover, active, disabled, cooldown).
- [ ] Implementar Tooltips ricos (hover sobre stats explica origem).
- [ ] Adicionar ícones (SVG/FontAwesome) para recursos e ações.
- [ ] Criar animações de entrada para novos elementos da lista.
- [ ] Melhorar a barra de progresso de Heat (efeito de fogo/pulsação).
- [ ] Padronizar tipografia (tamanhos, pesos, hierarquia).
- [ ] Criar modais personalizados (substituir alert/confirm nativos).
- [ ] Adicionar efeitos de partículas no clique (dinheiro voando).
- [ ] Melhorar layout do log (ícones por tipo de evento, cores).
- [ ] Implementar HUD flutuante para mensagens importantes.
- [ ] Criar menu de Configurações acessível e completo.
- [ ] Melhorar visualização da loja (grid vs lista, filtros).
- [ ] Adicionar indicadores de "Novidade" em abas/itens desbloqueados.
- [ ] Criar tela de "Estatísticas" detalhada com gráficos.
- [ ] Melhorar visual do Prestige (animação de ascensão).
- [ ] Implementar "Toast Notifications" para saves e achievements.
- [ ] Refinar paleta de cores para garantir consistência e contraste.
- [ ] Adicionar background parallax ou animado (sutil).
- [ ] Criar tela de carregamento (splash screen) estilosa.

## Categoria 14 — UX (Experiência do Jogador)

- [ ] Implementar Tutorial interativo (onboarding) para novos jogadores.
- [ ] Adicionar dicas de contexto (tooltips "Você sabia?").
- [ ] Melhorar clareza dos números (cores para positivo/negativo).
- [ ] Permitir compra em massa (x1, x10, x100, Max).
- [ ] Adicionar atalhos de teclado (hotkeys) para PC.
- [ ] Implementar "Undo" para última compra (se possível/justo).
- [ ] Melhorar mensagem de erro/feedback quando não pode comprar.
- [ ] Adicionar opção de exportar/importar save (string/arquivo).
- [ ] Confirmar ações destrutivas (reset, compras muito caras).
- [ ] Permitir fixar (pin) upgrades desejados no topo.
- [ ] Mostrar tempo restante para poder comprar algo (time to afford).
- [ ] Adicionar comparação de stats (antes/depois da compra).
- [ ] Implementar busca/filtro na lista de upgrades.
- [ ] Melhorar feedback de save (ícone girando, mensagem discreta).
- [ ] Permitir ocultar upgrades comprados/obsoletos.
- [ ] Adicionar modo "Zen" (interface mínima).
- [ ] Mostrar changelog dentro do jogo após atualização.
- [ ] Permitir reordenar listas (arrastar e soltar).
- [ ] Adicionar feedback sonoro para ações importantes (opcional).
- [ ] Realizar testes de usabilidade com usuários reais.

## Categoria 15 — Acessibilidade

- [ ] Garantir navegação completa por teclado (Tab index, Focus states).
- [ ] Adicionar descrições ARIA em todos os botões e inputs.
- [ ] Implementar modo de Alto Contraste real.
- [ ] Adicionar opção para reduzir movimento (prefers-reduced-motion).
- [ ] Permitir aumentar tamanho da fonte (escala de UI).
- [ ] Garantir que cores não sejam a única forma de informação (daltônicos).
- [ ] Adicionar legendas para sons (se houver áudio/fala).
- [ ] Implementar leitor de tela (Screen Reader) friendly labels.
- [ ] Evitar flashes de luz (fotossensibilidade) ou dar opção de desligar.
- [ ] Permitir remapear atalhos de teclado.
- [ ] Adicionar modo de "Fonte Dislexia" (OpenDyslexic).
- [ ] Garantir áreas de toque grandes o suficiente em mobile (44x44px).
- [ ] Testar com ferramentas de auditoria de acessibilidade (Lighthouse).
- [ ] Fornecer alternativas textuais para ícones e imagens.
- [ ] Evitar timeouts curtos que exigem reação rápida (ou dar opção).
- [ ] Permitir pausar o jogo a qualquer momento.
- [ ] Garantir contraste de texto mínimo 4.5:1 (WCAG AA).
- [ ] Estruturar HTML semanticamente (headings, regions).
- [ ] Adicionar feedback visual redundante para áudio.
- [ ] Documentar recursos de acessibilidade no menu.

## Categoria 16 — Responsividade (Mobile / Desktop)

- [ ] Implementar layout fluido que se adapta a qualquer largura.
- [ ] Testar em resoluções extremas (muito pequeno, ultrawide).
- [ ] Ajustar tamanho de fontes via `clamp()` ou media queries.
- [ ] Otimizar menus para toque (touch-friendly) vs mouse.
- [ ] Gerenciar teclado virtual em mobile (não cobrir UI).
- [ ] Implementar gestos (swipe) para trocar de abas em mobile.
- [ ] Prevenir zoom acidental em duplo toque.
- [ ] Adicionar meta tags corretas para PWA (Progressive Web App).
- [ ] Otimizar performance de bateria em mobile.
- [ ] Tratar orientação (paisagem vs retrato) com layouts diferentes.
- [ ] Esconder elementos menos importantes em telas pequenas.
- [ ] Implementar menu "Hambúrguer" ou abas inferiores em mobile.
- [ ] Ajustar densidade de informações (compacto vs espaçado).
- [ ] Testar em navegadores móveis (Chrome, Safari, Firefox).
- [ ] Tratar "Notch" e áreas seguras (safe-area-inset).
- [ ] Permitir jogar em tela cheia (Fullscreen API).
- [ ] Sincronizar estado entre abas/dispositivos (futuro backend?).
- [ ] Otimizar assets para conexões móveis (data saver).
- [ ] Adicionar botão de "Voltar ao Topo" em listas longas mobile.
- [ ] Garantir que popups/modais caibam na tela do celular.

## Categoria 17 — Feedback Visual e Sonoro

- [ ] Criar biblioteca de sons (SFX): clique, moeda, erro, sucesso, alerta.
- [ ] Adicionar trilha sonora (BGM) dinâmica (muda com Heat ou Progresso).
- [ ] Implementar controle de volume independente (SFX, Música, Master).
- [ ] Adicionar "Juice": screenshake, partículas, flash, escala.
- [ ] Visualizar números subindo no local do clique.
- [ ] Adicionar feedback de progresso em botões (loading bar no fundo).
- [ ] Criar animações para ícones (idle animations).
- [ ] Implementar feedback visual para cooldowns.
- [ ] Adicionar transições suaves entre telas/estados.
- [ ] Visualizar o "Heat" afetando a tela (bordas vermelhas, distorção).
- [ ] Criar sons de ambiente (cidade, sirenes, fábrica).
- [ ] Adicionar feedback tátil (Vibration API) aprimorado.
- [ ] Implementar visualização de "Crítico" (texto maior/colorido).
- [ ] Adicionar efeito de "Glitch" digital quando hackear/comprar upgrade ilegal.
- [ ] Sincronizar áudio com animações visuais.
- [ ] Permitir silenciar o jogo quando em background.
- [ ] Adicionar efeito sonoro de "Typewriter" para logs importantes.
- [ ] Criar jingle de Level Up ou Conquista.
- [ ] Implementar áudio espacial (stereo panning) básico.
- [ ] Adicionar opção de "Audio Ducking" (baixar música quando toca SFX).

## Categoria 18 — Sistema de Save / Load

- [ ] Implementar múltiplos slots de save.
- [ ] Adicionar Cloud Save (Firebase/PlayFab) futuro.
- [ ] Criar backup automático local antes de resetar.
- [ ] Implementar criptografia simples ou obfuscation no save string.
- [ ] Adicionar validação de versão (semver) para migração de saves.
- [ ] Permitir download do save como arquivo `.json` ou `.txt`.
- [ ] Permitir upload de arquivo de save.
- [ ] Implementar "Hardcore Mode" (permadeath/save delete)?
- [ ] Adicionar checksum para detectar saves adulterados.
- [ ] Comprimir string de save (LZString) para economizar espaço.
- [ ] Mostrar metadados do save no menu de load (Data, Dinheiro, Tempo).
- [ ] Implementar autosave configurável (tempo, eventos).
- [ ] Tratar quota excedida do localStorage.
- [ ] Adicionar confirmação ao carregar save antigo sobre o atual.
- [ ] Criar mecanismo de "Rescue Save" se o jogo travar/corromper.
- [ ] Sincronizar configurações globais separadas do save do jogo.
- [ ] Implementar sistema de "Import from Clipboard".
- [ ] Adicionar "Export to Clipboard".
- [ ] Logar erros de save/load para diagnóstico.
- [ ] Testar compatibilidade de saves entre navegadores.

## Categoria 19 — Expansões Futuras e Conteúdo

- [ ] Planejar DLC/Expansão "O Sindicato".
- [ ] Planejar DLC/Expansão "Política e Influência".
- [ ] Criar sistema de "Pets/Aliados" (Cachorro caramelo, Papagaio).
- [ ] Adicionar minigame de "Invasão" (Tower Defense simples).
- [ ] Planejar modo Multiplayer assíncrono (Leaderboards, Guildas).
- [ ] Criar sistema de "Bolsa de Valores" do crime.
- [ ] Adicionar mecânica de "Risco Biológico" (Pandemia?).
- [ ] Planejar tradução para outros idiomas (EN, ES).
- [ ] Criar sistema de "Temporadas" com recompensas exclusivas.
- [ ] Adicionar customização de Avatar.
- [ ] Planejar versão App (React Native/Cordova/Electron).
- [ ] Criar Wiki oficial ou in-game encyclopedia.
- [ ] Adicionar modo "História" com finais múltiplos.
- [ ] Criar sistema de "Prestige Layers" (Resetar o Reset).
- [ ] Adicionar "Daily Login Bonus".
- [ ] Planejar integração com redes sociais (Share progress).
- [ ] Criar sistema de "Artefatos" raros.
- [ ] Adicionar "Secret Codes" distribuídos na comunidade.
- [ ] Planejar eventos sazonais (Carnaval, Natal, Festa Junina).
- [ ] Criar editor de mods simples para a comunidade.

## Categoria 20 — Manutenibilidade e Evolução do Projeto

- [ ] Configurar CI/CD (GitHub Actions) para deploy automático.
- [ ] Adicionar linter (ESLint) e formatador (Prettier) ao projeto.
- [ ] Criar testes automatizados (Jest/Cypress).
- [ ] Documentar o código com comentários de bloco explicativos.
- [ ] Manter um CHANGELOG.md atualizado.
- [ ] Versionar o projeto semanticamente (SemVer).
- [ ] Criar issues templates no GitHub para bugs/features.
- [ ] Revisar dependências regularmente (se houver).
- [ ] Realizar Code Reviews periódicos (auto-revisão ou par).
- [ ] Monitorar performance em produção.
- [ ] Refatorar código legado periodicamente (Tech Debt payoff).
- [ ] Manter backups do repositório.
- [ ] Documentar decisões de design (ADRs - Architecture Decision Records).
- [ ] Criar guia de contribuição (CONTRIBUTING.md).
- [ ] Automatizar minificação e otimização de assets.
- [ ] Verificar compatibilidade com novos padrões Web.
- [ ] Manter lista de "Known Issues" visível.
- [ ] Realizar backups dos assets originais (PSDs, arquivos de som).
- [ ] Planejar migração para TypeScript (futuro distante).
- [ ] Manter a chama da "Visão do Projeto" acesa e documentada.
