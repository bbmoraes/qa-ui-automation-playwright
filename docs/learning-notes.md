# Entendendo o projeto

## As ferramentas

Node.js executa JavaScript fora de uma página web. npm instala as bibliotecas descritas em package.json. package-lock.json fixa as versões e integridades: npm ci reinstala esse conjunto. Playwright controla um navegador; Playwright Test organiza cenários, cria contextos independentes, faz verificações e produz relatórios.

No teste manual você executa e confere cada passo. Na automação você descreve ações e verificações em código para que o executor as repita. Isso não elimina a necessidade de investigar resultados nem de escolher bons cenários.

## Primeiro teste explicado

```js
test('AUT-001 | Login válido exibe o catálogo', async ({ page }, testInfo) => {
  await login(page);
  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
});
```

Este é um trecho real do cenário; o arquivo inclui outras verificações e uma captura. test cria o caso. page é a página do navegador isolada daquele teste. async permite uma função com operações que levam tempo; await aguarda cada operação terminar antes de seguir. login é uma função auxiliar que abre a aplicação, preenche dados públicos e clica Login.

Um locator é uma maneira de localizar um elemento, como page.getByPlaceholder('Username'). fill preenche o campo; click aciona um botão; expect verifica o resultado. A expressão /\/inventory\.html$/ confere o final da URL, não o título visual da página. Se o catálogo não for exibido, o teste deve falhar.

No AUT-003, ter um contador 1 não basta: também se verificam a linha do carrinho, o nome da mochila, o preço e a quantidade. No AUT-004, o carrinho é criado pelo próprio teste, sem depender do AUT-003.

## Execução no seu VS Code

A execução registrada neste pacote ocorreu em Linux remoto, não no seu Windows. Instale Node.js 24 no seu computador, extraia o projeto e abra sua pasta no VS Code. Em Terminal > Novo Terminal, execute:

```sh
npm ci
npx playwright install chromium
npm run test:login
npm test
npm run report
```

npm run test:headed mostra o navegador; npm run test:ui abre o modo visual. O modo visual exige um computador com interface gráfica. Não copiar para o Windows caminhos Linux usados apenas no ambiente remoto.

## Como ler uma falha

Abra o relatório com npm run report, selecione o cenário e compare expected (esperado) com received (obtido). Confira o passo que falhou. Erro de instalação, certificado ou navegação não prova falha do login. Um locator incorreto também é erro do teste.

Trace é um registro das ações e dos estados da página. Ele pode ser aberto pelo relatório ou com npx playwright show-trace seguido do caminho do trace.zip. A configuração retain-on-failure guarda traces quando há falha; npm run test:trace solicita traces de todos os cenários. Relatórios podem conter dados trafegados: revise antes de divulgar.

## GitHub Actions

O workflow instala Node, dependências e Chromium, executa os testes e guarda relatórios como artefatos, inclusive quando os testes falham. Preparar um YAML não demonstra execução no GitHub: só um run real permite dizer que o CI funcionou. Neste estágio, consulte docs/test-execution.md para o status comprovado.

## Como apresentar em entrevista

“Criei um projeto educacional com assistência de IA para automatizar cinco fluxos do SauceDemo em JavaScript com Playwright Test. Os casos têm contextos independentes e verificações explícitas. A documentação distingue problemas de infraestrutura de falhas funcionais e registra a configuração de rede usada. Estou estudando o código e reproduzindo os testes para ganhar autonomia.”

Complete com os resultados registrados no relatório e com o status real do CI. Não afirmar que você escreveu ou executou tudo sozinha. A reprodução independente pela estudante ainda não foi avaliada.

## Seu próximo exercício — ainda não resolvido

Depois de executar o projeto, crie AUT-006 para tentar entrar com a senha vazia. Antes de programar, observe manualmente a mensagem atual, escreva seu esperado e defina o que provará que o acesso foi negado. Não reutilize a execução de AUT-002. Não incluímos a solução neste pacote.

## Referências oficiais

- https://playwright.dev/docs/intro
- https://playwright.dev/docs/writing-tests
- https://playwright.dev/docs/test-isolation
- https://playwright.dev/docs/test-configuration
- https://playwright.dev/docs/trace-viewer-intro
- https://playwright.dev/docs/ci-intro
