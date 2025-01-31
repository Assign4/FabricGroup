import { BasePage } from './basePage';
// @ts-ignore
import registerLocators from '../locators/register.json' with { type: 'json' };
import { TestData } from '.';

export class Register extends BasePage {
  private readonly elements = this.initializeLocators(registerLocators);

  async register(userDetails: TestData): Promise<void> {
    await this.clickElement(this.elements.registerBtn);
    await this.fillInput(this.elements.firstName, userDetails.userData.firstName);
    await this.fillInput(this.elements.lastName, userDetails.userData.lastName);
    await this.fillInput(this.elements.street, userDetails.userData.address);
    await this.fillInput(this.elements.city, userDetails.userData.city);
    await this.fillInput(this.elements.state, userDetails.userData.state);
    await this.fillInput(this.elements.zipCode, userDetails.userData.zipCode);
    await this.fillInput(this.elements.phoneNumber, userDetails.userData.phone);
    await this.fillInput(this.elements.ssn, userDetails.userData.ssn);
    await this.fillInput(this.elements.username, userDetails.userData.username);
    await this.fillInput(this.elements.password, userDetails.userData.password);
    await this.fillInput(this.elements.repeatedPassword, userDetails.userData.password);
    await this.clickElement(this.elements.confirmRegisterBtn);
  }
}
