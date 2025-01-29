import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToUrl(url: string) {
    await this.page.goto(url);
  }

  async waitForElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
  }

  async clickElement(locator: Locator) {
    await this.waitForElement(locator);
    await locator.click();
  }

  async fillInput(locator: Locator, text: string) {
    await this.waitForElement(locator);
    await locator.fill(text);
  }

  async getElementText(locator: Locator): Promise<string> {
    await this.waitForElement(locator);
    const text = (await locator.textContent()) as string;
    return text;
  }

  async verifyElementIsVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }
}
