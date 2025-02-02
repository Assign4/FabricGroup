import { test } from '../pages/testBase';
import pactum from 'pactum';

test.describe('ParaBank E2E Test Suite', () => {
  test.beforeAll(async () => {
    pactum.request.setBaseUrl('https://api.pos.devbrokerlos.com');
    pactum.request.setDefaultTimeout(10000);
    pactum.settings.setDataDirectory('src/data');
    pactum.stash.loadData('src/data');
  });

  test('Complete end-to-end banking workflow', async ({
    page,
    register,
    dataGenerator,
    loginPage,
    navigationMenu,
    openNewAccount,
    transferFunds,
    billPayPage,
  }) => {
    pactum.stash.addDataMap('userData', dataGenerator.generateCustomerData());
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await register.register(pactum.stash.getDataMap('userData'));
    await loginPage.logout();
    await loginPage.login(pactum.stash.getDataMap('userData'));

    const navigationLinks = [
      'openAccount',
      'overview',
      'transfer',
      'findTrans',
      'updateProfile',
      'requestloan',
    ] as const;

    for (const link of navigationLinks) {
      await navigationMenu.verifyNavigationLinkVisibility(link);
      await navigationMenu.verifyNavigationAndPageLoad(link);
    }

    await navigationMenu.clickNavigationLink('openAccount');
    const accountNumber = await openNewAccount.openNewAccount('SAVINGS');
    pactum.stash.addDataStore('accountNumber', accountNumber);

    await navigationMenu.clickNavigationLink('transfer');
    await transferFunds.transferFunds('100', pactum.stash.getDataStore('accountNumber'));
    await navigationMenu.clickNavigationLink('billPay');

    await billPayPage.payBill(pactum.stash.getDataStore('accountNumber'));
  });
});
