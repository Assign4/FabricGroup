import { test as base } from '@playwright/test';
import { LoginPage } from './loginPage';
import { Pages, Register } from '.';
import { DataGenerator } from '../utils/dataGenerator';
import { NavigationMenu } from './navigationMenu';
import { OpenAccountPage } from './openNewAccount';
import { TransferFundsPage } from './transferFunds';
import { BillPayPage } from './billPay';

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  register: async ({ page }, use) => {
    await use(new Register(page));
  },
  navigationMenu: async ({ page }, use) => {
    await use(new NavigationMenu(page));
  },
  openNewAccount: async ({ page }, use) => {
    await use(new OpenAccountPage(page));
  },
  transferFunds: async ({ page }, use) => {
    await use(new TransferFundsPage(page));
  },
  billPayPage: async ({ page }, use) => {
    await use(new BillPayPage(page));
  },
  // eslint-disable-next-line no-empty-pattern
  dataGenerator: async ({}, use) => {
    await use(new DataGenerator());
  },
});

export { expect } from '@playwright/test';
