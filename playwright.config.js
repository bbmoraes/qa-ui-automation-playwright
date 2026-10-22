const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  globalTimeout: 180_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    // Proxy opcional para ambientes corporativos/remotos. Não gravar credenciais.
    proxy: process.env.PLAYWRIGHT_PROXY_SERVER
      ? { server: process.env.PLAYWRIGHT_PROXY_SERVER }
      : undefined,
    testIdAttribute: 'data-test',
    serviceWorkers: 'block',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
    // Opcional: somente para ambientes que já fornecem um Chromium próprio.
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
