import { BasePage } from './basePage';
// @ts-ignore
import openAccountLocators from '../locators/openNewAccount.json' with { type: 'json' };

export class OpenAccountPage extends BasePage {
  private readonly elements = this.initializeLocators(openAccountLocators);

  async openNewAccount(accountType: 'SAVINGS' | 'CHECKING'): Promise<string> {
    await this.page.waitForTimeout(3000);
    await this.verifyElementIsVisible(this.elements.accountForm);

    const typeValue = accountType === 'SAVINGS' ? '1' : '0';
    await this.elements.accountTypeSelect.selectOption(typeValue);

    await this.waitForElement(this.elements.fromAccountSelect);

    await this.clickElement(this.elements.openNewAccountButton);

    await this.waitForElement(this.elements.newAccountId);
    const accountNumber = await this.getElementText(this.elements.newAccountId);

    if (!accountNumber) {
      throw new Error('Failed to retrieve new account number');
    }

    return accountNumber.trim();
  }
}
