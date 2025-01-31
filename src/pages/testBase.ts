import { test as base } from '@playwright/test';
import { LoginPage } from './loginPage';
import { Pages, Register } from '.';
import { DataGenerator } from '../utils/dataGenerator';

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  register: async ({ page }, use) => {
    await use(new Register(page));
  },
  // eslint-disable-next-line no-empty-pattern
  dataGenerator: async ({}, use) => {
    await use(new DataGenerator());
  },
});

export { expect } from '@playwright/test';
