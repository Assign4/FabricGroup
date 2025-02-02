import { expect } from '@playwright/test';
import { BasePage } from '.';
// @ts-ignore
import menuLocator from '../locators/menu.json' with { type: 'json' };

type MenuKeys = keyof typeof menuLocator;

export class NavigationMenu extends BasePage {
  private readonly elements = this.initializeLocators(menuLocator);

  async clickNavigationLink(linkName: MenuKeys): Promise<void> {
    const selector = this.elements[linkName as keyof typeof this.elements];
    if (!selector) {
      throw new Error(`No selector found for link: ${linkName}`);
    }
    await this.clickElement(selector);
  }

  async isNavigationLinkVisible(linkName: MenuKeys): Promise<boolean> {
    const selector = this.elements[linkName as keyof typeof this.elements];
    if (!selector) {
      return false;
    }
    try {
      await this.verifyElementIsVisible(selector);
      return true;
    } catch {
      return false;
    }
  }

  async verifyNavigationLinkVisibility(linkName: keyof typeof menuLocator) {
    const isVisible = await this.isNavigationLinkVisible(linkName);
    if (!isVisible) {
      throw new Error(`Navigation link "${linkName}" is not visible`);
    }
  }

  async verifyNavigationAndPageLoad(linkName: keyof typeof menuLocator) {
    await this.clickNavigationLink(linkName);
    // Verify we're on the correct page by checking URL or specific page element
    const currentUrl = await this.page.url();
    expect(currentUrl).toContain(linkName.toLowerCase());
  }
}
