# Plano de testes automatizados

## Objetivo e referência

Automatizar cinco cenários funcionais do SauceDemo com JavaScript e Playwright Test. Referência manual lida novamente pela interface em 21/10/2026: https://github.com/bbmoraes/qa-manual-testing-portfolio. Seu README mostrava 27 casos registrados, 25 executados, 22 Passed, três Failed e dois Not Run. Esses números são do estudo manual, não desta suíte. Os bugs antigos em problem_user não foram assumidos como resultados atuais.

Aplicação: https://www.saucedemo.com/. Conta pública: standard_user; senha de demonstração: secret_sauce. Senha inválida: senha_incorreta. Checkout: Pessoa / Teste / 12345. Nenhum dado pessoal ou pagamento real.

| ID | Cenário | Resultado esperado |
|---|---|---|
| AUT-001 | Login válido | URL inventory.html, Products e mochila visíveis, login ausente |
| AUT-002 | Senha inválida | Mensagem exata, formulário preservado e catálogo ausente |
| AUT-003 | Adicionar mochila | Um item, nome, preço 29.99 e quantidade 1 corretos |
| AUT-004 | Remover mochila | Zero itens, contador ausente e botão Add to cart disponível no catálogo |
| AUT-005 | Checkout fictício | Produto correto no resumo, totais coerentes e confirmação; contador vazio |

## Independência e critérios

Cada test recebe um BrowserContext novo pela fixture page. O helper de carrinho realiza seu próprio login e inclusão; não reutiliza um pedido criado por outro cenário. Não há storageState compartilhado, ordem obrigatória ou dependência entre testes. Um worker limita tráfego à aplicação pública. retries=0 evita que uma nova tentativa automática oculte instabilidade.

Passed exige execução e todos os expect satisfeitos. Failed significa falha técnica reportada pelo executor; sua causa é investigada antes de atribuir defeito à aplicação. Skipped só é usado se o executor registrar um teste ignorado. Se infraestrutura impedir chegar à função, registrar também “verificação funcional não executada”, mesmo que o runner chame o resultado de Failed. A suíte não usa test.skip nem test.only.

## Seletores e esperas

Os atributos data-test foram observados na interface atual: shopping-cart-link, shopping-cart-badge, inventory-item, inventory-item-name, inventory-item-price, item-quantity, add-to-cart-sauce-labs-backpack e remove-sauce-labs-backpack. A configuração adapta getByTestId ao atributo data-test. Campos usam placeholders; ações e confirmação usam papéis/nome acessível. Os expect do Playwright aguardam o estado esperado; não há pausas fixas ou force.

## Limite de rede

Cada contexto permite requisições apenas para a origem HTTPS www.saucedemo.com e aborta as demais; service workers ficam bloqueados. Isso evita envio de telemetria/diagnósticos a terceiros, inclusive Backtrace. Não há mocking do próprio SauceDemo nem alteração das respostas da aplicação. Integrações externas e seus efeitos não são validados; o resultado corresponde a esse ambiente de rede restrito.

## Evidências

Relatório HTML e JSON; screenshots de falha e capturas selecionadas após as verificações de cada teste. Traces são retidos nas falhas pela configuração. A execução documentada usa --trace on para também registrar os aprovados. Não versionar perfis do navegador, credenciais privadas ou relatórios não revisados. Somente resultados e capturas selecionadas entram em evidence; relatórios completos são artefatos de entrega/CI.

## Fora do escopo

problem_user e outros perfis; carga; segurança; API; testes visuais por comparação de pixels; acessibilidade completa; mobile; Firefox/WebKit; compatibilidade com toda versão de Chrome; checkout sem itens; validação postal real; geração de PDF. Ausência de falha nestes cinco casos não prova qualidade geral ou liberação de produção.
