# Roadmap: Sistema de Dados RPG Real-time

Este documento serve como guia passo-a-passo para o desenvolvimento do sistema de rolagem de dados em tempo real.

## 🏁 Fase 1: Configuração Inicial (Setup)
O alicerce do projeto.
- [x] **Criar projeto React + Vite** (Garante performance e setup rápido).
- [x] **Instalar e configurar Tailwind CSS** (Para estilização rápida e bonita).
- [ ] **Criar projeto no Supabase** (Nosso Backend e Banco de Dados).
- [ ] **Configurar variáveis de ambiente** (Conectar o React ao Supabase).

## 🗄️ Fase 2: Banco de Dados e Realtime (Supabase)
Preparando o terreno para os dados trafegarem.
- [ ] **Criar tabela `rooms` (Salas)**: Para separar grupos de jogo diferentes.
- [ ] **Criar tabela `rolls` (Jogadas)**: Para armazenar histórico e o resultado atual.
- [ ] **Habilitar Realtime**: Ativar a funcionalidade de escuta nas tabelas do Supabase.
- [ ] **Definir Políticas de Segurança (RLS)**: Garantir que ninguém hackeie o resultado do dado.

## 🎨 Fase 3: Interface do Usuário (Frontend)
O que os jogadores vão ver.
- [ ] **Criar Tela de Entrada**: Campo para nome do jogador e código da sala.
- [ ] **Criar Área de Jogo**: Onde a ação acontece.
- [ ] **Componente `DiceButton`**: O botão para rolar o dado.
- [ ] **Componente `RollDisplay`**: Onde aparece o número sorteado (grande e visível).
- [ ] **Componente `HistoryLog`**: Lista das últimas rolagens.

## ⚡ Fase 4: Integração em Tempo Real (O "Coração")
Fazendo a mágica acontecer.
- [ ] **Conectar botão ao Supabase**: Ao clicar, insere o registro no banco.
- [ ] **Configurar Listener**: O Frontend deve "escutar" quando uma nova linha entra no banco.
- [ ] **Sincronização Visual**: Quando o banco atualiza, mostrar o resultado na tela de TODOS simultaneamente.

## 👑 Fase 5: Controle do Mestre (Líder)
Regras de permissão.
- [ ] **Identificar o Mestre**: O criador da sala ou login específico.
- [ ] **Estado de "Bloqueio"**: O botão de dados começa desabilitado para jogadores.
- [ ] **Funcionalidade "Liberar Dado"**: Mestre clica -> Banco atualiza permissão -> Botão do jogador habilita.
- [ ] **Feedback Visual**: Mostrar para o jogador que "O mestre liberou sua jogada".

## 🚀 Fase 6: Polimento e Deploy
Finalização.
- [ ] **Animações**: Adicionar efeito de "rolando" antes de mostrar o número.
- [ ] **Sons**: Efeito sonoro de dados (opcional).
- [ ] **Responsividade**: Garantir que funcione bem no celular.
- [ ] **Deploy na Vercel**: Colocar o site no ar para acesso externo.
