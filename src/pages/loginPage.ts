import { BasePage } from './basePage';
// @ts-ignore
import loginLocators from '../locators/login.json' with { type: 'json' };

export class LoginPage extends BasePage {
  private readonly elements = this.initializeLocators(loginLocators);

  async login(username: string, password: string): Promise<void> {
    await this.fillInput(this.elements.usernameInput, username);
    await this.fillInput(this.elements.passwordInput, password);
    await this.clickElement(this.elements.loginButton);
  }

  async navigateToRegister(): Promise<void> {
    await this.clickElement(this.elements.registerLink);
  }
}
