import { BasePage } from './basePage';
// @ts-ignore
import billPayLocators from '../locators/billPay.json' with { type: 'json' };
import { faker } from '@faker-js/faker';
import { BillPaymentDetails } from '.';
import { expect } from '@playwright/test';
import pactum from 'pactum';

export class BillPayPage extends BasePage {
  private readonly elements = this.initializeLocators(billPayLocators);

  async payBill(accountNumber: string): Promise<void> {
    const billPayDetails = {
      payeeName: 'Test',
      address: 'Test',
      city: 'Test',
      state: 'Test',
      zipCode: faker.helpers.fromRegExp('4[0-9]{4}'),
      phone: faker.helpers.fromRegExp('9[0-9]{9}'),
      accountNumber: faker.finance.accountNumber(5),
      amount: '50.00',
      fromAccount: accountNumber,
    };
    await this.page.waitForTimeout(1000);
    await this.fillInput(this.elements.payeeName, billPayDetails.payeeName);
    await this.fillInput(this.elements.address, billPayDetails.address);
    await this.fillInput(this.elements.city, billPayDetails.city);
    await this.fillInput(this.elements.state, billPayDetails.state);
    await this.fillInput(this.elements.zipCode, billPayDetails.zipCode);
    await this.fillInput(this.elements.phone, billPayDetails.phone);
    await this.fillInput(this.elements.accountNumber, billPayDetails.accountNumber);
    await this.fillInput(this.elements.verifyAccount, billPayDetails.accountNumber);
    await this.fillInput(this.elements.amount, billPayDetails.amount);
    await this.elements.fromAccountSelect.selectOption(billPayDetails.fromAccount);
    await this.clickElement(this.elements.sendPaymentButton);

    const billPay: BillPaymentDetails = {
      payeeName: billPayDetails.payeeName,
      amount: billPayDetails.amount,
      fromAccount: billPayDetails.fromAccount,
    };

    pactum.stash.addDataMap('billPay', billPay);

    await this.verifyBillPaymentSuccess(billPay);
  }

  async verifyBillPaymentSuccess(expectedDetails: BillPaymentDetails): Promise<void> {
    const actualPayeeName = await this.getElementValue(this.elements.successPayeeName);
    const actualAmount = await this.getElementValue(this.elements.successAmount);
    const actualFromAccount = await this.getElementValue(this.elements.successFromAccount);
    const formattedExpectedAmount = `$${parseFloat(expectedDetails.amount).toFixed(2)}`;

    expect(actualPayeeName, 'Payee name should match').toBe(expectedDetails.payeeName);
    expect(actualAmount, 'Payment amount should match').toBe(formattedExpectedAmount);
    expect(actualFromAccount, 'From account should match').toBe(expectedDetails.fromAccount);
  }
}
