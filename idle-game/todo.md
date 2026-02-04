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

## Categoria 17 — Feedback Visual e Sonoro

- [ ] Criar biblioteca de sons (SFX): clique, moeda, erro, sucesso, alerta.
- [ ] Adicionar trilha sonora (BGM) dinâmica (muda com Heat ou Progresso).
- [ ] Implementar controle de volume independente (SFX, Música, Master).
- [ ] Adicionar "Juice": screenshake, partículas, flash, escala.
- [ ] Criar sons de ambiente (cidade, sirenes, fábrica).
- [ ] Sincronizar áudio com animações visuais.
- [ ] Permitir silenciar o jogo quando em background.
- [ ] Criar jingle de Level Up ou Conquista.
- [ ] Implementar áudio espacial (stereo panning) básico.
- [ ] Adicionar opção de "Audio Ducking" (baixar música quando toca SFX).

## Categoria 18 — Sistema de Save / Load

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
