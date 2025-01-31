import { test } from '../pages/testBase';
import pactum from 'pactum';

test.describe('ParaBank E2E Test Suite', () => {
  test.beforeAll(async () => {
    pactum.request.setBaseUrl('https://api.pos.devbrokerlos.com');
    pactum.request.setDefaultTimeout(10000);
    pactum.settings.setDataDirectory('src/data');
    pactum.stash.loadData('src/data');
  });
  // eslint-disable-next-line playwright/no-focused-test
  test.only('Complete end-to-end banking workflow', async ({ page, register, dataGenerator }) => {
    pactum.stash.addDataMap('userData', dataGenerator.generateCustomerData());
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await register.register(pactum.stash.getDataMap('userData'));
  });
});
