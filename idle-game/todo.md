# TODO.MD — ROADMAP DE DESENVOLVIMENTO: A FIRMA

Este documento serve como o roteiro central para o desenvolvimento, manutenção e expansão do projeto "A FIRMA".

## Categoria 1 — Arquitetura Geral

## Categoria 2 — Organização de Pastas e Arquivos

## Categoria 3 — Qualidade do Código JavaScript

## Categoria 4 — Performance e Otimização

## Categoria 5 — Gerenciamento de Estado

## Categoria 6 — Game Loop e Timers

## Categoria 7 — Sistema Idle (Produção Passiva)

## Categoria 8 — Sistema de Clique (Active Gameplay)

## Categoria 9 — Economia do Jogo

## Categoria 10 — Progressão e Escalabilidade

- [ ] Adicionar Tiers de construções (Barraco -> Loja -> Galpão -> Prédio).

## Categoria 11 — Balanceamento de Gameplay

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
