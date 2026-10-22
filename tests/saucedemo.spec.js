const { test, expect } = require('@playwright/test');

// Escopo funcional público: não enviar telemetria nem diagnósticos a terceiros.
test.beforeEach(async ({ context }) => {
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.origin === 'https://www.saucedemo.com') {
      await route.continue();
    } else {
      await route.abort('blockedbyclient');
    }
  });
});

// Só dados públicos de demonstração. Cada teste recebe um contexto novo do Playwright.
async function login(page, password = 'secret_sauce') {
  await page.goto('/');
  await page.getByPlaceholder('Username', { exact: true }).fill('standard_user');
  await page.getByPlaceholder('Password', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'Login', exact: true }).click();
}

async function openCartWithBackpack(page) {
  await login(page);
  await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
  await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  await page.getByTestId('shopping-cart-link').click();
  await expect(page).toHaveURL(/\/cart\.html$/);
}

async function attachScreenshot(page, testInfo, name) {
  await testInfo.attach(name, { body: await page.screenshot(), contentType: 'image/png' });
}

test('AUT-001 | Login válido exibe o catálogo', async ({ page }, testInfo) => {
  await login(page);
  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
  await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
  await expect(page.getByPlaceholder('Username', { exact: true })).toHaveCount(0);
  await attachScreenshot(page, testInfo, 'AUT-001-catalogo');
});

test('AUT-002 | Senha inválida impede acesso', async ({ page }, testInfo) => {
  await login(page, 'senha_incorreta');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByText(
    'Epic sadface: Username and password do not match any user in this service',
    { exact: true },
  )).toBeVisible();
  await expect(page.getByPlaceholder('Username', { exact: true })).toBeVisible();
  await expect(page.getByTestId('inventory-container')).toHaveCount(0);
  await attachScreenshot(page, testInfo, 'AUT-002-erro-login');
});

test('AUT-003 | Produto correto aparece no carrinho', async ({ page }, testInfo) => {
  await openCartWithBackpack(page);
  const items = page.getByTestId('inventory-item');
  await expect(items).toHaveCount(1);
  await expect(items.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
  await expect(items.getByTestId('inventory-item-price')).toHaveText('$29.99');
  await expect(items.getByTestId('item-quantity')).toHaveText('1');
  await attachScreenshot(page, testInfo, 'AUT-003-carrinho');
});

test('AUT-004 | Remover produto esvazia o carrinho', async ({ page }, testInfo) => {
  await openCartWithBackpack(page);
  await expect(page.getByTestId('inventory-item')).toHaveCount(1);
  await page.getByTestId('remove-sauce-labs-backpack').click();
  await expect(page.getByTestId('inventory-item')).toHaveCount(0);
  await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
  await page.getByRole('button', { name: 'Continue Shopping', exact: true }).click();
  await expect(page.getByTestId('add-to-cart-sauce-labs-backpack')).toBeVisible();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
  await attachScreenshot(page, testInfo, 'AUT-004-carrinho-vazio');
});

test('AUT-005 | Checkout fictício confirma o pedido', async ({ page }, testInfo) => {
  await openCartWithBackpack(page);
  await page.getByRole('button', { name: 'Checkout', exact: true }).click();
  await page.getByPlaceholder('First Name', { exact: true }).fill('Pessoa');
  await page.getByPlaceholder('Last Name', { exact: true }).fill('Teste');
  await page.getByPlaceholder('Zip/Postal Code', { exact: true }).fill('12345');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
  const items = page.getByTestId('inventory-item');
  await expect(items).toHaveCount(1);
  await expect(items.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
  await expect(items.getByTestId('item-quantity')).toHaveText('1');
  await expect(page.getByText('Item total: $29.99', { exact: true })).toBeVisible();
  await expect(page.getByText('Tax: $2.40', { exact: true })).toBeVisible();
  await expect(page.getByText('Total: $32.39', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Finish', exact: true }).click();
  await expect(page).toHaveURL(/\/checkout-complete\.html$/);
  await expect(page.getByRole('heading', { name: 'Thank you for your order!', exact: true })).toBeVisible();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
  await attachScreenshot(page, testInfo, 'AUT-005-checkout-concluido');
});
