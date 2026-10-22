# Evidências

Os arquivos final-suite-run.log, final-results.json e execution-summary.json registram a execução principal. As cinco capturas PNG foram anexadas pelo próprio Playwright após as verificações dos cenários; não foram produzidas por IA.

Os logs aut001-run.log, aut001-proxy-run.log e aut001-trusted-ca-run.log preservam tentativas iniciais de preparação. full-suite-run.log é parcial e não deve ser tratado como execução concluída. Leia docs/test-execution.md antes de interpretar resultados.

Relatórios HTML e traces completos da execução final ficam em artifacts/final-run no pacote de entrega ; a execução separada do CI está disponível no artefato do GitHub Actions. São gerados pelo executor e não fazem parte do código-fonte versionado. Na execução documentada, --trace on guardou também os testes aprovados. Sem essa opção, a configuração mantém traces somente em falhas.


## GitHub Actions verificado

[Execução #1](https://github.com/bbmoraes/qa-ui-automation-playwright/actions/runs/39713689211): 5 Passed em 4,0 s. [Relatório disponível](https://github.com/bbmoraes/qa-ui-automation-playwright/actions/runs/39713689211/artifacts/12398131844), retenção de 14 dias. O [registro CI-001](ci-execution.json) preserva metadados e links. Os traces dos testes aprovados pertencem ao pacote local; o CI retém traces somente em falhas.

## Capturas reais da execução local

As imagens abaixo foram geradas pelo Playwright e publicadas como anexos do GitHub pelo editor. Os nomes identificam os PNGs originais no pacote ZIP entregue; não há arquivos PNG binários versionados nesta pasta.

### AUT-001-catalogo.png

![Evidência real — AUT-001-catalogo.png](https://github.com/user-attachments/assets/e13cef64-fd28-4b20-8342-80a101f81561)

### AUT-002-erro-login.png

![Evidência real — AUT-002-erro-login.png](https://github.com/user-attachments/assets/142bc165-83b1-4ab3-bf2d-5bb305005f30)

### AUT-003-carrinho.png

![Evidência real — AUT-003-carrinho.png](https://github.com/user-attachments/assets/34e8148f-4ce1-4466-acdc-f011202e8ca7)

### AUT-004-carrinho-vazio.png

![Evidência real — AUT-004-carrinho-vazio.png](https://github.com/user-attachments/assets/464382d9-f303-4480-ab1c-0d64866ba731)

### AUT-005-checkout-concluido.png

![Evidência real — AUT-005-checkout-concluido.png](https://github.com/user-attachments/assets/7c0135d9-bbaf-4fc2-b415-9be9a752519b)
