import { BasePage } from './basePage';
// @ts-ignore
import transferFundsLocators from '../locators/transferFunds.json' with { type: 'json' };
import { TransferDetails } from '.';
import { expect } from '@playwright/test';

export class TransferFundsPage extends BasePage {
  private readonly elements = this.initializeLocators(transferFundsLocators);

  async transferFunds(amount: string, fromAccount: string): Promise<void> {
    await this.page.waitForTimeout(2000);
    const accounts = await this.getAvailableAccounts();
    const toAccount = accounts.find((acc) => acc !== fromAccount) as unknown as string;
    await this.verifyElementIsVisible(this.elements.transferFormContainer);
    await this.fillInput(this.elements.amountInput, amount);
    await this.elements.fromAccountSelect.selectOption(fromAccount);
    await this.elements.toAccountSelect.selectOption(toAccount);
    await this.clickElement(this.elements.transferButton);
    await this.verifyTransferSuccess({ amount, fromAccount, toAccount });
  }

  async verifyTransferFormDisplayed(): Promise<void> {
    await this.verifyElementIsVisible(this.elements.transferForm);
  }

  async getAvailableAccounts(): Promise<string[]> {
    const accounts = await this.elements.fromAccountSelect.locator('option').allInnerTexts();
    return accounts;
  }

  async verifyTransferSuccess(expectedDetails: TransferDetails): Promise<void> {
    await this.verifyElementIsVisible(this.elements.successContainer);
    const actualAmount = await this.getElementText(this.elements.successAmount);
    const actualFromAccount = await this.getElementText(this.elements.successFromAccount);
    const actualToAccount = await this.getElementText(this.elements.successToAccount);
    const formattedExpectedAmount = `$${parseFloat(expectedDetails.amount).toFixed(2)}`;

    expect(actualAmount, 'Transfer amount should match').toBe(formattedExpectedAmount);
    expect(actualFromAccount, 'From account should match').toBe(expectedDetails.fromAccount);
    expect(actualToAccount, 'To account should match').toBe(expectedDetails.toAccount);
  }
}
