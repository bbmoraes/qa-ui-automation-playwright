# Execução EX-AUTO-001

## Resultado principal

Executada em **21/10/2026 às 23:35:55, America/Sao_Paulo** (22/10/2026 02:35:55 UTC), duração total **28,8 segundos**.

| ID | Cenário | Resultado | Duração |
|---|---|---|---:|
| AUT-001 | Login válido | Passed | 5,636 s |
| AUT-002 | Senha inválida | Passed | 5,396 s |
| AUT-003 | Adicionar produto | Passed | 5,542 s |
| AUT-004 | Remover produto | Passed | 5,675 s |
| AUT-005 | Checkout fictício | Passed | 5,759 s |

**5 Passed, 0 Failed, 0 Skipped, 0 Flaky, 0 retries.** São cinco casos na execução final, não a soma de todas as tentativas de preparação. A aprovação descreve apenas esse escopo. Não houve bug funcional confirmado nesta execução.

Fontes: [resumo calculado](../evidence/execution-summary.json), [resultado JSON do executor](../evidence/final-results.json), [log final](../evidence/final-suite-run.log). Os campos internos de proxy e de caminho de execução foram omitidos da cópia pública do JSON; resultados e estatísticas não foram alterados.

## Ambiente comprovado

- Linux remoto Ubuntu 24.04.3 LTS, x64; não é o Windows de Bianca.
- Node.js 24.19.0; npm 11.9.0; Playwright Test 1.64.1, instalado no projeto com package-lock.json.
- Chromium 153.0.8010.0, distribuído por @sparticuz/chromium 153.0.0, instalado separadamente apenas para este ambiente remoto.
- A versão preferida do navegador para Playwright 1.64.1 seria Chromium 156.0.8078.4. Seu download retornou HTML “Site Unavailable”, não um ZIP. **A combinação com o navegador padrão não foi executada**, e este resultado não comprova compatibilidade com ela.
- HTTPS permaneceu validado: o Chromium reconheceu a autoridade já fornecida no sistema remoto, por meio do armazenamento NSS. Não foi usado ignoreHTTPSErrors nem ignore-certificate-errors.
- Proxy do próprio ambiente; seu endereço não está documentado no pacote público.
- Viewport Desktop Chrome do Playwright, 1280 × 720; um worker; contextos independentes.
- Rede da execução final limitada à origem HTTPS www.saucedemo.com. Terceiros e service workers bloqueados. Isso não valida integrações externas.

Comando real, representando o endereço interno do proxy apenas pela variável já existente:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/tmp/qa-pw-chromium \
PLAYWRIGHT_PROXY_SERVER="$HTTPS_PROXY" npm test -- --trace on
```

Esse comando é específico do ambiente remoto. No Windows, seguir os comandos padrão do README, sem copiar /tmp/qa-pw-chromium nem configurações internas de certificado/proxy.

## Histórico de investigação

1. Preparação: npm instalou o executor. Os downloads do Chromium completo e do headless shell pelo instalador retornaram arquivos HTML inválidos.
2. AUT-001, primeira tentativa: o executor iniciou o navegador alternativo, mas page.goto falhou com ERR_EMPTY_RESPONSE. Classificação: infraestrutura; login não avaliado. [Log](../evidence/aut001-run.log).
3. AUT-001 com proxy: a navegação falhou com ERR_CERT_AUTHORITY_INVALID. Classificação: infraestrutura; login não avaliado. [Log](../evidence/aut001-proxy-run.log).
4. Após reconhecer no Chromium a autoridade já fornecida pelo ambiente, AUT-001 passou: 1 Passed, sem retries, 17,2 s no total. [Log](../evidence/aut001-trusted-ca-run.log). Seu código e verificações foram explicados antes de ampliar a suíte.
5. Uma execução preliminar dos cinco casos registrou dois aprovados, mas não produziu resultado final comprovado. A revisão automática rejeitou o acompanhamento por risco associado ao endpoint externo de diagnóstico Backtrace. O [log parcial](../evidence/full-suite-run.log) foi preservado; ele não demonstra sucesso do conjunto e não entra nos indicadores finais. Não há afirmação sobre o que foi ou não transmitido nessa tentativa.
6. Solução mais restrita: context.route permite somente a origem SauceDemo e aborta os outros destinos; serviceWorkers fica block. Isso impede as submissões de terceiros no contexto testado. A execução final dessa configuração terminou com 5 Passed em 28,8 s.

As novas tentativas manuais de preparação não são retries automáticos nem falhas funcionais intermitentes comprovadas. Não houve mudança do resultado esperado para aprovar testes. Os traces preliminares não integram o pacote de entrega; o artefato contém somente o relatório e os traces da execução final com escopo de rede restrito.

## Evidências selecionadas

- [AUT-001 — catálogo](https://github.com/user-attachments/assets/e13cef64-fd28-4b20-8342-80a101f81561)
- [AUT-002 — erro de senha](https://github.com/user-attachments/assets/142bc165-83b1-4ab3-bf2d-5bb305005f30)
- [AUT-003 — carrinho correto](https://github.com/user-attachments/assets/34e8148f-4ce1-4466-acdc-f011202e8ca7)
- [AUT-004 — remoção](https://github.com/user-attachments/assets/464382d9-f303-4480-ab1c-0d64866ba731)
- [AUT-005 — confirmação](https://github.com/user-attachments/assets/7c0135d9-bbaf-4fc2-b415-9be9a752519b)

O relatório HTML e cinco traces finais estão em artifacts/final-run no pacote entregue. Abra com os comandos do README. Capturas foram produzidas pelo navegador após os expect; não há imagens geradas ou encenadas.

## GitHub Actions e publicação

| Etapa | Situação comprovada |
|---|---|
| Workflow escrito | Publicado |
| Novo repositório criado | Criado com aprovação |
| Arquivos publicados | Código e evidências publicados |
| GitHub Actions executado | Execução #1 em andamento; ainda sem resultado dos testes |

A publicação foi autorizada. Repositório: https://github.com/bbmoraes/qa-ui-automation-playwright. Primeira execução: https://github.com/bbmoraes/qa-ui-automation-playwright/actions/runs/39713689211. O workflow usa o Chromium padrão instalado pelo Playwright no GitHub, não o binário remoto alternativo. Seu sucesso ainda precisa ser verificado em uma execução real.

## Aprendizagem e limites

Construção, execução e documentação assistidas por IA. A reprodução no computador de Bianca e sua execução independente ainda não foram avaliadas. Não há homologação de produção ou cobertura completa. Próxima etapa: executar no Windows com Chromium padrão e verificar CI após aprovação da publicação.
