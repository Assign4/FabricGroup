import { Page, Locator } from '@playwright/test';
import { LoginPage } from '.';

export type Pages = {
  loginPage: LoginPage;
};

export type PageLocators = Record<string, string>;

export type TestData = {
  userData: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    ssn: string;
  };
};

export interface PageConstructor {
  page: Page;
}

export interface NavigationMenu {
  [key: string]: Locator;
}
