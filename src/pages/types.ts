import { Page } from '@playwright/test';
import { LoginPage, NavigationMenu, Register } from '.';
import { DataGenerator } from '../utils/dataGenerator';
import { OpenAccountPage } from './openNewAccount';
import { TransferFundsPage } from './transferFunds';
import { BillPayPage } from './billPay';

export type Pages = {
  loginPage: LoginPage;
  register: Register;
  dataGenerator: DataGenerator;
  navigationMenu: NavigationMenu;
  openNewAccount: OpenAccountPage;
  transferFunds: TransferFundsPage;
  billPayPage: BillPayPage;
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

export interface TransferDetails {
  amount: string;
  fromAccount: string;
  toAccount: string;
}

export interface PageConstructor {
  page: Page;
}

export interface BillPaymentDetails {
  payeeName: string;
  amount: string;
  fromAccount: string;
}
