import { BasePage } from './basePage';
// @ts-ignore
import billPayLocators from '../locators/billPay.json' with { type: 'json' };
import { faker } from '@faker-js/faker';
import { BillPaymentDetails } from '.';
import { expect } from '@playwright/test';

export class BillPayPage extends BasePage {
  private readonly elements = this.initializeLocators(billPayLocators);

  async payBill(accountNumber: string): Promise<void> {
    const billPayDetails = {
      payeeName: faker.person.fullName(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      phone: faker.phone.number('###-###-####'),
      accountNumber: faker.finance.accountNumber(10),
      amount: '50.00',
      fromAccount: accountNumber,
    };

    await this.page.waitForTimeout(2000);
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

    await this.verifyBillPaymentSuccess(billPay);
  }

  async verifyBillPaymentSuccess(expectedDetails: BillPaymentDetails): Promise<void> {
    const actualPayeeName = await this.getElementText(this.elements.successPayeeName);
    const actualAmount = await this.getElementText(this.elements.successAmount);
    const actualFromAccount = await this.getElementText(this.elements.successFromAccount);
    const formattedExpectedAmount = `$${parseFloat(expectedDetails.amount).toFixed(2)}`;

    expect(actualPayeeName, 'Payee name should match').toBe(expectedDetails.payeeName);
    expect(actualAmount, 'Payment amount should match').toBe(formattedExpectedAmount);
    expect(actualFromAccount, 'From account should match').toBe(expectedDetails.fromAccount);
  }
}
