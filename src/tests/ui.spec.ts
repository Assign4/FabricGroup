/**
 * @fileoverview End-to-end test suite for ParaBank application covering both UI and API scenarios.
 * Tests user registration, account management, fund transfers, bill payments and transaction search.
 */

import { findBy } from '../apihelper';
import { test } from '../pages/testBase';
import pactum from 'pactum';

/**
 * Test suite for ParaBank E2E scenarios
 * Implements Page Object Model pattern for maintainability
 */
test.describe('ParaBank E2E Test Suite', () => {
  /**
   * Setup configuration for API testing
   * - Sets base URL for all requests
   * - Configures timeout and data directories
   */
  test.beforeAll(async () => {
    pactum.request.setBaseUrl('https://parabank.parasoft.com/parabank');
    pactum.request.setDefaultTimeout(10000);
    pactum.settings.setDataDirectory('src/data');
    pactum.stash.loadData('src/data');
  });

  /**
   * Main E2E test covering complete banking workflow
   * Scenario steps:
   * 1. User Registration - Creates new user with random unique credentials
   * 2. Authentication - Login/logout verification
   * 3. Navigation - Validates all main menu options
   * 4. Account Creation - Opens new savings account
   * 5. Fund Management - Performs transfer between accounts
   * 6. Bill Payment - Executes bill payment transaction
   * 7. Transaction Search - Verifies transaction via API
   *
   * @param {Object} params - Test context parameters including page objects
   * @param {Page} params.page - Playwright page object
   * @param {Object} params.register - Registration page object
   * @param {Object} params.dataGenerator - Test data generation utility
   * @param {Object} params.loginPage - Login page object
   * @param {Object} params.navigationMenu - Navigation menu object
   * @param {Object} params.openNewAccount - Account creation page object
   * @param {Object} params.transferFunds - Fund transfer page object
   * @param {Object} params.billPayPage - Bill payment page object
   */
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
    // Generate and store random user data
    pactum.stash.addDataMap('userData', dataGenerator.generateCustomerData());

    // UI Scenario 1: Navigate to application
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    // UI Scenario 2: Register new user
    await register.register(pactum.stash.getDataMap('userData'));

    // UI Scenario 3: Verify authentication
    await loginPage.logout();
    await loginPage.login(pactum.stash.getDataMap('userData'));

    // UI Scenario 4: Validate global navigation
    const navigationLinks = [
      'openAccount',
      'overview',
      'transfer',
      'findTrans',
      'updateProfile',
      'requestloan',
    ] as const;

    // Verify each navigation link visibility and functionality
    for (const link of navigationLinks) {
      await navigationMenu.verifyNavigationLinkVisibility(link);
      await navigationMenu.verifyNavigationAndPageLoad(link);
    }

    // UI Scenario 5: Create savings account
    await navigationMenu.clickNavigationLink('openAccount');
    const accountNumber = await openNewAccount.openNewAccount('SAVINGS');
    pactum.stash.addDataStore('accountNumber', accountNumber);

    // UI Scenario 7: Transfer funds
    await navigationMenu.clickNavigationLink('transfer');
    await transferFunds.transferFunds('100', pactum.stash.getDataStore('accountNumber'));

    // UI Scenario 8: Pay bill
    await navigationMenu.clickNavigationLink('billPay');
    await billPayPage.payBill(pactum.stash.getDataStore('accountNumber'));

    // API Scenario 1 & 2: Search and validate transaction
    await findBy.findByAmount();
  });
});
