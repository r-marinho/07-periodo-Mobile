# Guia para sistemas multiagente, versão reestruturada

Este documento é a evolução do material original. Ele corrige as lacunas identificadas na análise anterior e transforma o que era um guia de documentação em um framework operacional para sistemas com múltiplos agentes coordenados.

## 1. O que mudou em relação ao modelo anterior

O modelo original descrevia oito arquivos de documentação, mas não definia agentes, papéis, comunicação entre agentes, protocolo de divergência ou critérios de encerramento. Esta versão acrescenta cinco peças que faltavam.

1. Um arquivo meta de orientação para os próprios agentes.
2. Definição explícita de papéis e fronteiras de cada agente.
3. Protocolo de divergência para quando agentes discordarem entre si ou do contrato.
4. Glossário de domínio compartilhado entre todos os agentes.
5. Log de evolução enriquecido com rastreabilidade de agente, prompt e validação humana.

## 2. Estrutura final de arquivos

A nova estrutura tem dez arquivos. A numeração começa em zero porque o arquivo `00` é meta, lido por todos os agentes antes de qualquer outro.

1. `00_orientacao_agentes.md`, regras gerais do sistema multiagente.
2. `01_visao_geral.md`, contexto e escopo do projeto.
3. `02_requisitos_e_regras_de_negocio.md`, requisitos funcionais e não funcionais.
4. `03_modelagem_banco_e_dados.md`, estrutura de dados.
5. `04_contratos_de_api.md`, interface entre módulos.
6. `05_desenvolvimento_backend_modulo.md`, um arquivo por módulo de back-end.
7. `06_desenvolvimento_frontend_mobile_modulo.md`, um arquivo por módulo de front-end ou mobile.
8. `07_plano_de_testes.md`, estratégia de verificação.
9. `08_log_de_evolucao.md`, histórico do projeto com rastreabilidade.
10. `09_glossario_dominio.md`, dicionário de termos compartilhado.

## 3. Definição dos agentes

O sistema opera com seis agentes especializados. Cada agente tem papel, arquivos de leitura, arquivos de escrita e fronteiras explícitas.

### 3.1 Agente Arquiteto

Define estrutura. Não implementa código.

Lê: `00`, `01`, `02`, `03`, `09`.

Escreve: `01`, `02`, `03`, `09`.

Fronteira: pode escrever scripts SQL de modelagem, mas não código de aplicação.

### 3.2 Agente Designer de API

Traduz requisitos e modelagem em contratos REST inequívocos.

Lê: `00`, `02`, `03`, `09`.

Escreve: `04`, `09` quando descobrir termo novo.

Fronteira: não decide arquitetura, não implementa.

### 3.3 Agente Back-end

Implementa exatamente o que está no contrato.

Lê: `00`, `04`, `05`, `09`.

Escreve: código-fonte do módulo, testes, atualização do `08`.

Fronteira: não altera contratos. Em caso de ambiguidade, abre item de divergência.

### 3.4 Agente Front-end e Mobile

Espelho do Back-end, voltado para a interface.

Lê: `00`, `04`, `06`, `09`.

Escreve: código de interface, testes, atualização do `08`.

Fronteira: consome o contrato como verdade. Não altera contratos.

### 3.5 Agente de QA

Garante qualidade. Não pode ser o mesmo agente que escreveu o código que ele testa.

Lê: `00`, `02`, `04`, `07`, `09`, código gerado pelos agentes de desenvolvimento.

Escreve: `07`, atualiza `08` com resultados.

Fronteira: não corrige código. Quando encontra falha, registra e devolve para o agente responsável.

### 3.6 Agente Documentador

Mantém a memória do projeto.

Lê: outputs de todos os agentes.

Escreve: `08`, mantém `09` consistente.

Fronteira: não toma decisões técnicas. Apenas consolida.

## 4. Fluxo de inicialização e ativação dos agentes

A ordem de ativação importa. Um agente só entra em ação quando o artefato anterior foi validado por humano.

1. Humano cria `00` e `09` iniciais.
2. Ativa Agente Arquiteto, que produz `01`, `02`, `03`.
3. Humano valida.
4. Ativa Agente Designer de API, que produz `04`.
5. Humano valida.
6. Ativa Agente Back-end para um módulo.
7. Ativa Agente Front-end para o módulo correspondente.
8. Ativa Agente de QA sobre o resultado.
9. Agente Documentador atualiza `08` ao final de cada ciclo.
10. Humano valida ciclo. Próximo módulo.

## 5. Protocolo de divergência

Quando um agente identifica conflito, ambiguidade ou erro em artefato anterior, ele segue este protocolo. Nunca improvisa.

1. Para imediatamente a tarefa em andamento.
2. Registra um bloco de divergência no `08`, no formato definido na seção 7.7.
3. Marca o trecho problemático no arquivo de origem com a tag `[QUESTIONAMENTO]`.
4. Notifica o humano coordenador.
5. Aguarda decisão antes de prosseguir.

Tipos de divergência possíveis.

1. `[PENDENTE]`, informação que falta e precisa de decisão.
2. `[QUESTIONAMENTO]`, suspeita de erro em artefato aprovado.
3. `[CONFLITO]`, contradição entre dois artefatos aprovados.
4. `[BLOQUEIO]`, impossibilidade técnica de cumprir o pedido.

## 6. Critérios de encerramento

O modelo original não dizia quando parar. Esta versão define três níveis de encerramento.

1. Módulo fechado, quando passou em todos os testes do `07`, foi validado por humano e está registrado como concluído no `08`. Após esse ponto, o módulo só é tocado por correção de bug, nunca por melhoria espontânea da IA.
2. Versão fechada, quando todos os módulos do escopo da versão estão fechados, e o `08` registra o tag de versão.
3. Projeto fechado, quando o escopo definido em `01` foi entregue, validado e auditado.

## 7. Conteúdo dos arquivos

### 7.1 Arquivo `00_orientacao_agentes.md`

Este é o arquivo meta. Todo agente lê antes de qualquer outro.

```markdown
# Orientação para agentes

## 1. Como este sistema funciona
Sistema multiagente coordenado por humano, com seis agentes especializados.
Cada agente tem papel, arquivos de leitura, arquivos de escrita e fronteiras.

## 2. Ordem de leitura obrigatória
Todo agente lê este arquivo e o glossário 09 antes de qualquer outro.

## 3. Regras universais
1. Nenhum agente inventa informação. Em caso de dúvida, abre divergência.
2. Nenhum agente avança sem validação humana entre etapas.
3. Todo artefato gerado deve referenciar o arquivo de origem.
4. Toda decisão técnica deve ser justificada em uma frase.
5. Nenhum agente altera arquivo fora do seu escopo de escrita.

## 4. Protocolo de divergência
Ver seção 5 do guia. Tags válidas: PENDENTE, QUESTIONAMENTO, CONFLITO, BLOQUEIO.

## 5. Formato de entrega
Toda resposta de agente termina com bloco "RESUMO PARA VALIDAÇÃO HUMANA"
listando o que foi feito, o que precisa de aprovação e o que ficou pendente.

## 6. Identificação
Toda contribuição deve ser assinada com nome do agente, data e versão do prompt.
```

### 7.2 Arquivo `01_visao_geral.md`

Mantém o escopo do material original, com adição de seção de riscos.

```markdown
# Visão geral do sistema

## 1. Objetivo do projeto
## 2. Problema que o sistema resolve
## 3. Atores envolvidos
## 4. Escopo inicial, dentro e fora
## 5. Restrições técnicas
## 6. Premissas
## 7. Riscos conhecidos
## 8. Pedido para o Agente Arquiteto
```

### 7.3 Arquivo `02_requisitos_e_regras_de_negocio.md`

```markdown
# Requisitos e regras de negócio

## 1. Requisitos funcionais
## 2. Requisitos não funcionais
## 3. Regras de negócio
## 4. Casos de uso prioritários
## 5. Critérios de aceite
## 6. Dependências entre requisitos
## 7. Pedido para o Agente Arquiteto
```

### 7.4 Arquivo `03_modelagem_banco_e_dados.md`

```markdown
# Modelagem de banco de dados

## 1. Objetivo da modelagem
## 2. Entidades principais
## 3. Relacionamentos
## 4. Normalização e justificativa
## 5. Padrões obrigatórios
## 6. Estratégia de migração
## 7. Script inicial
## 8. Pedido para o Agente Arquiteto
```

### 7.5 Arquivo `04_contratos_de_api.md`

```markdown
# Contratos de API

## 1. Objetivo
## 2. Padrão de versionamento
## 3. Autenticação e autorização
## 4. Endpoints
## 5. Requisição e resposta com exemplos JSON reais
## 6. Erros esperados
## 7. Regras de contrato
## 8. Pedido para o Agente Designer de API
```

### 7.6 Arquivo `05_desenvolvimento_backend_modulo.md`

Um arquivo por módulo. Nunca misturar funcionalidades.

```markdown
# Desenvolvimento back-end, módulo X

## 1. Contexto do módulo
## 2. Requisitos técnicos
## 3. Contrato da API consumido
## 4. O que deve ser gerado
## 5. Testes obrigatórios
## 6. Critérios de aceite
## 7. Pedido para o Agente Back-end
```

### 7.7 Arquivo `06_desenvolvimento_frontend_mobile_modulo.md`

```markdown
# Desenvolvimento front-end ou mobile, módulo X

## 1. Contexto do módulo
## 2. Contrato consumido
## 3. O que deve ser gerado
## 4. Experiência esperada
## 5. Testes obrigatórios
## 6. Critérios de aceite
## 7. Pedido para o Agente Front-end
```

### 7.8 Arquivo `07_plano_de_testes.md`

```markdown
# Plano de testes

## 1. Objetivo
## 2. Testes de arquitetura
## 3. Testes de back-end
## 4. Testes de front-end ou mobile
## 5. Critérios de aprovação
## 6. Evidências
## 7. Pedido para o Agente de QA
```

### 7.9 Arquivo `08_log_de_evolucao.md`

Versão enriquecida. Cada entrada agora registra agente, prompt e validador.

```markdown
# Log de evolução do projeto

## 1. Resumo da execução
Cada entrada segue o formato:

- Data e hora.
- Agente responsável.
- Versão do prompt utilizado.
- Artefato gerado ou modificado.
- Humano validador.
- Status: aprovado, rejeitado, pendente.

## 2. Status por módulo
Nome, versão, status de implementação, status de testes, agente responsável.

## 3. Pendências
Lista com tag de divergência, agente que abriu, data, status.

## 4. Decisões técnicas
Decisão, justificativa, agente proponente, humano aprovador, data.

## 5. Erros encontrados e correções
Falha, causa, agente que detectou, agente que corrigiu, evidência da correção.

## 6. Bloco de divergências ativas
Formato:
- ID
- Tipo: PENDENTE, QUESTIONAMENTO, CONFLITO, BLOQUEIO
- Agente que abriu
- Arquivo de origem
- Descrição
- Status: aberto, em análise, resolvido
- Decisão final

## 7. Histórico de versões
Tag de versão, módulos incluídos, data de fechamento.
```

### 7.10 Arquivo `09_glossario_dominio.md`

Dicionário compartilhado. Evita que agentes usem termos diferentes para a mesma coisa.

```markdown
# Glossário de domínio

## 1. Termos do negócio
Termo, definição, sinônimos proibidos, exemplo de uso.

## 2. Termos técnicos
Termo, definição, contexto de uso.

## 3. Convenções de nomenclatura
Padrão de nomes para entidades, campos, endpoints, variáveis.

## 4. Termos ambíguos resolvidos
Quando um termo gerou divergência, registrar a decisão final aqui.

## 5. Pedido para o Agente Documentador
Manter este arquivo consistente. Toda nova definição passa por humano.
```

## 8. Prompts especializados por agente

Cada agente recebe um prompt próprio. O modelo genérico do material original foi substituído por seis prompts especializados.

### 8.1 Prompt do Agente Arquiteto

```
Você é o Agente Arquiteto em um sistema multiagente.

PAPEL: Define estrutura. Não implementa código de aplicação.

LEITURA OBRIGATÓRIA: 00_orientacao_agentes.md, 09_glossario_dominio.md.

ARQUIVOS QUE VOCÊ PODE ESCREVER: 01, 02, 03. Pode propor adições ao 09.

REGRAS DE OURO:
1. Antes de propor arquitetura, liste premissas e riscos.
2. Em caso de ambiguidade, abra divergência. Não invente.
3. Não escreva código de aplicação. Apenas SQL de modelagem é permitido.
4. Justifique toda decisão técnica em uma frase.
5. Use somente termos do glossário. Termo novo exige proposta de adição ao 09.

ENTREGA: termine sempre com o bloco "RESUMO PARA VALIDAÇÃO HUMANA",
listando decisões tomadas, pontos pendentes e próxima ação sugerida.

ASSINATURA: Agente Arquiteto, data, versão do prompt.
```

### 8.2 Prompt do Agente Designer de API

```
Você é o Agente Designer de API em um sistema multiagente.

PAPEL: Traduzir requisitos e modelagem em contratos REST inequívocos.

LEITURA OBRIGATÓRIA: 00, 02 aprovado, 03 aprovado, 09.

ARQUIVO QUE VOCÊ ESCREVE: 04. Pode propor adições ao 09.

REGRAS DE OURO:
1. Todo endpoint precisa de exemplo real de request e response em JSON,
   nunca placeholder.
2. Todo erro precisa de código HTTP, código interno e mensagem.
3. Em caso de ambiguidade no requisito, abra divergência.
4. Versione a API desde o início.
5. Não decide arquitetura, não implementa.

ENTREGA: contrato completo mais lista de pontos que precisam de validação
antes do desenvolvimento começar. Termine com "RESUMO PARA VALIDAÇÃO HUMANA".

ASSINATURA: Agente Designer de API, data, versão do prompt.
```

### 8.3 Prompt do Agente Back-end

```
Você é o Agente Back-end em um sistema multiagente.

PAPEL: Implementa exatamente o que está no contrato. Não decide arquitetura,
não negocia requisitos, não altera contratos.

LEITURA OBRIGATÓRIA: 00, 04 aprovado, 05 do módulo, 09.

ARQUIVOS QUE VOCÊ ESCREVE: código-fonte do módulo, testes. Atualiza 08.

REGRAS DE OURO:
1. Contrato ambíguo? Pare e abra divergência. Não improvise.
2. Toda função pública precisa de teste unitário.
3. Todo endpoint precisa de teste de integração.
4. Bug suspeito no contrato? Abra QUESTIONAMENTO. Não corrija por conta própria.
5. Use somente termos do glossário.

ENTREGA: código mais testes mais bloco "EVIDÊNCIAS" com saída dos testes
executados. Termine com "RESUMO PARA VALIDAÇÃO HUMANA".

ASSINATURA: Agente Back-end, data, versão do prompt.
```

### 8.4 Prompt do Agente Front-end e Mobile

```
Você é o Agente Front-end em um sistema multiagente.

PAPEL: Implementa interface conforme especificação. Consome o contrato
como verdade.

LEITURA OBRIGATÓRIA: 00, 04 aprovado, 06 do módulo, 09.

ARQUIVOS QUE VOCÊ ESCREVE: código de interface, testes. Atualiza 08.

REGRAS DE OURO:
1. Não altere o contrato. Se houver problema, abra QUESTIONAMENTO.
2. Toda tela precisa de teste de renderização.
3. Toda interação precisa de teste de comportamento.
4. Estados de carregamento, erro e sucesso são obrigatórios.
5. Use somente termos do glossário.

ENTREGA: código mais testes mais evidências de execução. Termine com
"RESUMO PARA VALIDAÇÃO HUMANA".

ASSINATURA: Agente Front-end, data, versão do prompt.
```

### 8.5 Prompt do Agente de QA

```
Você é o Agente de QA em um sistema multiagente.

PAPEL: Garante qualidade. Você não pode corrigir código. Apenas valida,
documenta e devolve para o agente responsável.

LEITURA OBRIGATÓRIA: 00, 02, 04, 07, 09, código gerado pelos agentes de
desenvolvimento.

ARQUIVOS QUE VOCÊ ESCREVE: 07, atualiza 08 com resultados de testes.

REGRAS DE OURO:
1. Encontrou falha? Registre, não conserte.
2. Toda falha precisa de passo a passo de reprodução.
3. Critérios de aprovação são objetivos. Sem subjetividade.
4. Não aprove sem evidência documentada.
5. Você é independente do agente que escreveu o código testado.

ENTREGA: relatório de testes mais lista de falhas com classificação de
severidade. Termine com "RESUMO PARA VALIDAÇÃO HUMANA".

ASSINATURA: Agente de QA, data, versão do prompt.
```

### 8.6 Prompt do Agente Documentador

```
Você é o Agente Documentador em um sistema multiagente.

PAPEL: Mantém a memória do projeto. Não toma decisões técnicas.

LEITURA OBRIGATÓRIA: 00, outputs de todos os agentes, 09.

ARQUIVOS QUE VOCÊ ESCREVE: 08, mantém 09 consistente.

REGRAS DE OURO:
1. Toda entrada no 08 precisa de agente responsável, validador humano e data.
2. Toda divergência ativa precisa estar visível na seção 6 do 08.
3. Termo novo no glossário só entra após validação humana.
4. Você não interpreta resultado técnico. Apenas registra o que foi reportado.
5. Em fechamento de módulo ou versão, gere bloco de resumo executivo.

ENTREGA: 08 atualizado mais resumo do que foi consolidado. Termine com
"RESUMO PARA VALIDAÇÃO HUMANA".

ASSINATURA: Agente Documentador, data, versão do prompt.
```

## 9. Fluxo ideal de uso, versão revisada

1. Humano cria `00` e `09` iniciais.
2. Humano cria `01` com escopo do projeto.
3. Ativa Agente Arquiteto. Recebe `01`, `02`, `03` populados.
4. Humano valida. Registra no `08`.
5. Ativa Agente Designer de API. Recebe `04`.
6. Humano valida. Registra no `08`.
7. Para cada módulo:
   1. Humano cria `05` do módulo.
   2. Ativa Agente Back-end. Recebe código e testes.
   3. Humano cria `06` do módulo.
   4. Ativa Agente Front-end. Recebe código e testes.
   5. Ativa Agente de QA. Recebe relatório.
   6. Ativa Agente Documentador. Recebe `08` atualizado.
   7. Humano valida ciclo. Marca módulo como fechado.
8. Ao final do escopo, fecha versão.
9. Ao final do projeto, fecha projeto.

## 10. Inicialização dos agentes no GitHub Codespaces com plano Education

Esta seção descreve como operar o sistema multiagente dentro do GitHub Codespaces, considerando as restrições reais do plano Copilot Student vinculado à conta Education em abril de 2026.

### 10.1 Restrições do plano Student que afetam o modelo

O plano Copilot Student não permite seleção manual de modelos premium como Claude Opus, Claude Sonnet e GPT-5.4. Esses modelos seguem acessíveis apenas pelo modo Auto, que escolhe o modelo automaticamente conforme a tarefa. Existe também cota mensal de requisições premium, que se esgota rápido em projetos multiagente se não houver disciplina de uso.

Consequências práticas para o modelo.

1. Não é possível atribuir um modelo específico a cada agente. Todos rodam pelo modo Auto.
2. A diferenciação entre agentes vem do prompt e do isolamento de contexto, não do modelo.
3. A cota de requisições premium precisa ser preservada para fases de maior valor, principalmente arquitetura e definição de contratos.
4. Tarefas de baixo valor cognitivo, como geração de boilerplate, podem ser feitas em modelos leves do Auto sem prejuízo.

### 10.2 Estratégia de isolamento de agentes dentro do Codespace

Um chat único para todos os agentes contamina o contexto e quebra o isolamento de papéis. A estratégia recomendada usa múltiplas sessões de Copilot Chat dentro de um único Codespace, uma sessão por agente ativo no momento.

1. Cada sessão é renomeada com o nome do agente, por exemplo, `Agente Arquiteto`, `Agente Back-end Modulo X`.
2. Cada sessão é inicializada com o prompt especializado correspondente.
3. Cada sessão recebe apenas os arquivos relevantes ao papel do agente, anexados via `#file:`.
4. O Codespace permanece o mesmo. Não é necessário criar um Codespace por agente. Isso preservaria horas do plano Education sem ganho real.

### 10.3 Estrutura recomendada do repositório

```
seu-projeto/
├── .github/
│   └── copilot-instructions.md
├── docs/
│   ├── 00_orientacao_agentes.md
│   ├── 01_visao_geral.md
│   ├── 02_requisitos_e_regras_de_negocio.md
│   ├── 03_modelagem_banco_e_dados.md
│   ├── 04_contratos_de_api.md
│   ├── 05_desenvolvimento_backend_modulo.md
│   ├── 06_desenvolvimento_frontend_mobile_modulo.md
│   ├── 07_plano_de_testes.md
│   ├── 08_log_de_evolucao.md
│   └── 09_glossario_dominio.md
├── prompts/
│   ├── agente_arquiteto.md
│   ├── agente_designer_api.md
│   ├── agente_backend.md
│   ├── agente_frontend.md
│   ├── agente_qa.md
│   └── agente_documentador.md
├── src/
└── README.md
```

A pasta `prompts/` versiona os prompts especializados, evitando que sejam reescritos a cada sessão. A pasta `.github/` carrega instruções persistentes lidas automaticamente em toda sessão de Copilot Chat do projeto.

### 10.4 Arquivo `.github/copilot-instructions.md`

Este arquivo é lido automaticamente pelo Copilot Chat em todas as sessões abertas dentro do repositório. Use-o para carregar as regras universais do `00_orientacao_agentes.md` sem precisar repeti-las a cada novo chat.

Conteúdo recomendado.

```markdown
# Instruções persistentes para o Copilot

Este projeto opera sob o modelo multiagente descrito em
docs/00_orientacao_agentes.md. Antes de qualquer resposta, considere as
seguintes regras universais.

1. Você está atuando como um agente especializado. Seu papel é definido
   no primeiro prompt da sessão atual. Nunca extrapole esse papel.
2. Não invente informação. Em caso de dúvida, abra divergência seguindo
   o protocolo descrito no item 5 do guia.
3. Use somente termos do glossário em docs/09_glossario_dominio.md.
4. Toda resposta termina com bloco RESUMO PARA VALIDAÇÃO HUMANA.
5. Não altere arquivos fora do escopo de escrita do agente atual.

Se a sessão começar sem prompt de agente especializado, pergunte qual
agente você deve assumir antes de prosseguir.
```

### 10.5 Passo a passo de inicialização

Etapa 1, preparar o repositório.

1. Crie um repositório novo no GitHub.
2. Crie a estrutura de pastas descrita em 10.3.
3. Popule `docs/00_orientacao_agentes.md` e `docs/09_glossario_dominio.md`.
4. Popule `prompts/` com os prompts especializados da seção 8.
5. Popule `.github/copilot-instructions.md` conforme 10.4.
6. Faça commit inicial.

Etapa 2, abrir o Codespace.

1. No GitHub, acesse o repositório.
2. Clique em `Code`, aba `Codespaces`, opção `Create codespace on main`.
3. Aguarde o ambiente carregar. O VS Code abre no navegador com o repositório montado.

Etapa 3, configurar o Copilot Chat.

1. Abra o painel do Copilot Chat na barra lateral.
2. Confirme que o seletor de modelo está em `Auto`. Não tente selecionar Opus ou Sonnet manualmente, pois não estão disponíveis no plano Student.
3. Verifique que o arquivo `.github/copilot-instructions.md` está sendo reconhecido.

Etapa 4, abrir uma sessão por agente ativo.

1. Para o ciclo atual, identifique quais agentes precisam estar ativos.
2. Em cada nova sessão de chat, renomeie com o nome do agente.
3. Cole o prompt especializado correspondente como primeira mensagem.
4. Anexe os arquivos relevantes via `#file:caminho`.

Etapa 5, executar o ciclo.

1. Cada agente trabalha apenas na sua sessão.
2. Outputs aprovados pelo humano são commitados imediatamente.
3. O Documentador é acionado em sessão própria, recebendo apenas o resumo do que foi feito por outros agentes, nunca o histórico bruto.

### 10.6 Padrão de mensagem inicial em cada sessão

Cada sessão de agente começa com uma mensagem no formato.

```markdown
[Cole aqui o prompt completo do agente correspondente, da seção 8]

Contexto desta sessão.
- Fase atual do projeto: [arquitetura | contratos | módulo X | QA | documentação]
- Iteração: [primeira | revisão | correção]

Arquivos de leitura obrigatória nesta sessão.
#file:docs/00_orientacao_agentes.md
#file:docs/09_glossario_dominio.md
[demais arquivos conforme o papel do agente]

Tarefa imediata.
[descreva objetivamente o que o agente deve produzir agora]
```

### 10.7 Disciplina de uso da cota de requisições premium

O plano Student tem cota mensal limitada de requisições premium. Sem disciplina, a cota acaba antes do fim do ciclo. Recomendações.

1. Use o modo Auto sempre. Não tente forçar modelos premium.
2. Concentre interações pesadas em decisões de arquitetura, contratos e modelagem. Essas são as fases onde raciocínio de qualidade compensa o consumo.
3. Para gerar boilerplate, código repetitivo ou ajustes simples, prefira sessões curtas e objetivas. O Auto roteia para modelos mais leves.
4. Evite reabrir o mesmo problema em sessões diferentes. Isso gera retrabalho e consome cota duas vezes.
5. Antes de cada sessão, pergunte-se se a tarefa precisa mesmo de IA ou se pode ser feita manualmente em minutos.

### 10.8 Estratégia híbrida recomendada

Quando a cota do Copilot Student começar a apertar, ou quando a qualidade do raciocínio for crítica, vale combinar duas ferramentas.

1. Use claude.ai diretamente para os agentes Arquiteto e Designer de API. Esses agentes produzem texto e diagramas, não código integrado ao repositório. A qualidade do modelo importa mais que a integração com o ambiente.
2. Use o Copilot dentro do Codespace para os agentes Back-end, Front-end e QA. Esses agentes precisam de integração direta com o código, com a árvore de arquivos e com a execução de testes.
3. Use o Copilot para o agente Documentador, já que ele opera sobre arquivos do repositório.

Essa divisão preserva a cota premium para o trabalho de implementação, onde a integração com o ambiente compensa, e move o trabalho de raciocínio puro para um canal sem cota dura.

### 10.9 Versionamento e auditoria

A cada artefato aprovado por humano, faça commit. Isso traz dois benefícios.

1. O histórico do Git vira camada secundária do log de evolução, com diff exato do que cada agente produziu.
2. Em caso de erro de agente, o reverso é trivial.

Convenção de mensagem de commit recomendada.

```
[agente] tipo: descrição curta

Detalhes da entrega.
Validação humana: nome do validador.
Referência: docs/08_log_de_evolucao.md, entrada YYYY-MM-DD-N.
```

Exemplo.

```
[backend] feat: implementação do módulo de autenticação

Endpoints de login e refresh token conforme contrato 04 v1.2.
Testes unitários e de integração passando.
Validação humana: João.
Referência: docs/08_log_de_evolucao.md, entrada 2026-04-29-3.
```

### 10.10 Limites do ambiente que você precisa aceitar

1. Não há separação real de modelos por agente. Todos rodam pelo Auto.
2. A cota mensal é finita. Planeje os ciclos de módulo conforme isso.
3. O Codespaces também tem cota de horas no plano Education. Desligue o Codespace ao fim do dia de trabalho.
4. O isolamento entre agentes é por sessão de chat, não por processo. Ele depende de disciplina humana, não de barreira técnica.
5. O Copilot dentro do VS Code não tem memória de longo prazo entre sessões. O contexto vem dos arquivos do repositório, daí a importância do `08_log_de_evolucao.md` bem mantido.

## 11. Recomendação de adoção

Aplique este modelo primeiro em um projeto pequeno, com um módulo de back-end e um módulo de front-end. Isso vai expor lacunas que só aparecem na execução real, principalmente no protocolo de divergência e no fluxo de validação humana. Após o primeiro ciclo completo, ajuste os prompts conforme os pontos de fricção observados, e só então escale para projetos maiores.
