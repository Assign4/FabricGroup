import { test } from '../pages/testBase';

test.describe('ParaBank E2E Test Suite', () => {
  test('Complete end-to-end banking workflow', async ({ page, loginPage }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await loginPage.login('Test', 'ABC');
  });
});
