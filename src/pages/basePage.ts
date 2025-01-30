import { Page, Locator, expect } from '@playwright/test';
import { PageLocators } from '.';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  protected initializeLocators<T extends PageLocators>(locators: T): Record<keyof T, Locator> {
    const elements: Partial<Record<keyof T, Locator>> = {};

    for (const [key, selector] of Object.entries(locators)) {
      if (typeof selector === 'string') {
        elements[key as keyof T] = this.getLocator(selector);
      }
    }

    return elements as Record<keyof T, Locator>;
  }

  async navigateToUrl(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  async clickElement(locator: Locator): Promise<void> {
    await this.waitForElement(locator);
    await locator.click();
  }

  async fillInput(locator: Locator, text: string): Promise<void> {
    await this.waitForElement(locator);
    await locator.fill(text);
  }

  async getElementText(locator: Locator): Promise<string> {
    await this.waitForElement(locator);
    const text = await locator.textContent();
    return text || '';
  }

  async verifyElementIsVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}
