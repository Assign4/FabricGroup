import { BasePage } from './basePage';
// @ts-ignore
import loginLocators from '../locators/login.json' with { type: 'json' };
import { TestData } from '.';

export class LoginPage extends BasePage {
  private readonly elements = this.initializeLocators(loginLocators);

  async login(testData: TestData): Promise<void> {
    await this.fillInput(this.elements.usernameInput, testData.userData.username);
    await this.fillInput(this.elements.passwordInput, testData.userData.password);
    await this.clickElement(this.elements.loginButton);
  }

  async logout(): Promise<void> {
    await this.clickElement(this.elements.logoutBtn);
  }
}
