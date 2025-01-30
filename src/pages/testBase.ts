import { test as base } from '@playwright/test';
import { LoginPage } from './loginPage';
import { Pages } from '.';

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
