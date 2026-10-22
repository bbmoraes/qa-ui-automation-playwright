# QA UI Automation — Playwright 🧪

Projeto educacional de **Bianca Moraes**: cinco testes funcionais reais do [SauceDemo](https://www.saucedemo.com/) com **JavaScript e Playwright Test**. Evolução do [estudo manual](https://github.com/bbmoraes/qa-manual-testing-portfolio).

Construção, execução e documentação assistidas por IA. A reprodução independente pela estudante e a execução no seu Windows ainda não foram avaliadas.

[![Playwright Tests](https://github.com/bbmoraes/qa-ui-automation-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/bbmoraes/qa-ui-automation-playwright/actions/workflows/playwright.yml)

## Resultado verificado

| Execução final | Passed | Failed | Skipped | Flaky | Retries |
|---|---:|---:|---:|---:|---:|
| EX-AUTO-001 · remoto · 21/10/2026 · 28,8 s | 5 | 0 | 0 | 0 | 0 |
| CI-001 · GitHub Actions · 22/10/2026 UTC · 4,0 s | 5 | 0 | 0 | 0 | 0 |

**Ambiente executado:** Linux remoto, Node 24.19.0, Playwright Test 1.64.1 e Chromium 153.0.8010.0 alternativo. O Chromium padrão do Playwright não pôde ser baixado neste ambiente. Esse resultado local está limitado à combinação executada, com requisições de terceiros bloqueadas. A execução separada no GitHub Actions também passou com o Chromium padrão instalado pelo Playwright. [Relatório e histórico completos](docs/test-execution.md).

## Cenários

| ID | O que verifica |
|---|---|
| AUT-001 | Login válido, URL do catálogo e produto visível |
| AUT-002 | Senha inválida, mensagem de erro e catálogo ausente |
| AUT-003 | Mochila no carrinho, preço e quantidade corretos |
| AUT-004 | Remoção, carrinho vazio e contador coerente |
| AUT-005 | Resumo correto, totais e conclusão do pedido fictício |

Cada teste tem seu próprio contexto de navegador, login e preparação. Não há dependência de ordem, pausas fixas, force ou repetição automática para esconder falhas. O código usa três funções auxiliares pequenas; não há estrutura extra de Page Objects.

## Pré-requisitos e instalação

Instale **Node.js 24 LTS** e abra a pasta do projeto no terminal do VS Code. Node inclui npm. Consulte a compatibilidade do seu sistema na [documentação oficial](https://playwright.dev/docs/intro#system-requirements); a execução no Windows ainda é pendente.

```sh
npm ci
npx playwright install chromium
npm run test:login
npm test
```

Em Linux/CI, o instalador também pode precisar das bibliotecas do sistema:

```sh
npx playwright install --with-deps chromium
```

As credenciais são públicas de demonstração, fornecidas pelo próprio SauceDemo. Não são necessárias conta pessoal, senha privada, token ou arquivo .env.

## Comandos

| Comando | Uso |
|---|---|
| npm run test:login | Executar somente AUT-001 |
| npm test | Executar os cinco casos |
| npm run test:headed | Ver o navegador durante os testes |
| npm run test:ui | Abrir o modo visual do Playwright |
| npm run test:trace | Registrar trace de todos os casos |
| npm run report | Abrir o relatório HTML da última execução local |

O modo headed/UI requer interface gráfica. Um relatório baixado deve ser servido pelo Playwright, em vez de simplesmente abrir index.html por duplo clique.

## Evidências da execução entregue

- [Resumo calculado](evidence/execution-summary.json)
- [Resultados do executor](evidence/final-results.json)
- [Log final](evidence/final-suite-run.log)
- [Cinco capturas e explicações](docs/test-execution.md#evidências-selecionadas)

![Checkout fictício concluído](https://github.com/user-attachments/assets/7c0135d9-bbaf-4fc2-b415-9be9a752519b)

As cinco capturas estão publicadas como anexos do GitHub no [índice de evidências](evidence/README.md); os PNGs originais permanecem no pacote ZIP entregue. O pacote de entrega inclui o relatório HTML e cinco traces finais em artifacts/final-run. Com as dependências instaladas, abra o relatório entregue assim:

```sh
npx playwright show-report artifacts/final-run/playwright-report
```

Trace registra as ações e estados da página para investigação. A configuração normal retém traces e screenshots em falhas; esta execução usou --trace on e também anexou capturas após as verificações de cada caso. Os relatórios completos ficam fora do versionamento por .gitignore e podem ser entregues como artefatos do CI. Não versionar node_modules, perfis de navegador, arquivos .env ou credenciais privadas.

## Escopo de rede e ambiente remoto

A suíte permite somente a origem https://www.saucedemo.com e bloqueia destinos de terceiros e service workers. Isso evita envio de telemetria/diagnósticos externos, incluindo Backtrace. O comportamento observado corresponde a essa restrição; integrações externas não foram validadas. Não há interceptação ou simulação das respostas do SauceDemo.

A configuração aceita opcionalmente PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH e PLAYWRIGHT_PROXY_SERVER em ambientes que já os forneçam. Não são necessários no uso padrão. O binário alternativo e a configuração de certificados do Linux remoto não são instalados no seu computador pelo projeto. HTTPS não foi desabilitado.

## GitHub Actions

**Publicado e executado com sucesso.** A [execução #1](https://github.com/bbmoraes/qa-ui-automation-playwright/actions/runs/39713689211) passou os cinco testes em **4,0 s**, sem retries, no commit `063f313`. O workflow completo levou 5 min 36 s, incluindo instalação. O arquivo [.github/workflows/playwright.yml](.github/workflows/playwright.yml) instala Node 24, usa npm ci, instala Chromium padrão, executa a suíte e disponibiliza relatórios mesmo quando os testes falham. O novo repositório foi criado com aprovação da estudante.

O [artefato playwright-report-1](https://github.com/bbmoraes/qa-ui-automation-playwright/actions/runs/39713689211/artifacts/12398131844) foi disponibilizado (1,02 MB, retenção de 14 dias). Contém relatório HTML e resultados da execução. Após baixar e extrair, execute `npx playwright show-report playwright-report`. A configuração normal retém traces apenas em falhas; não se espera trace de testes aprovados no CI. O [registro CI-001](evidence/ci-execution.json) mantém o resultado e os links após a expiração do artefato.

Alterações em código disparam testes automaticamente. O workflow ignora mudanças apenas em Markdown e evidências, para evitar repetir a suíte ao documentar o resultado.

## Aprendizados e próximos passos

[Plano de testes](docs/test-plan.md) · [Execução e limitações](docs/test-execution.md) · [Explicação do código e entrevista](docs/learning-notes.md).

Próximos passos: Bianca reproduzir os testes no Windows, modificar um cenário sozinha e comparar o relatório com a execução já verificada no GitHub Actions. A suíte não cobre todos os cenários, navegadores, acessibilidade, carga, segurança ou APIs. Nenhum defeito funcional novo foi confirmado nesses cinco testes.

As tentativas iniciais de preparação estão documentadas, incluindo problemas de navegador, proxy, certificado e a revisão automática que motivou o bloqueio de terceiros. Elas não foram apagadas dos registros nem somadas ao resultado final.
