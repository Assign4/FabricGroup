export interface UserData {
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
}

export interface AccountData {
  accountType: 'SAVINGS' | 'CHECKING';
  fromAccountId?: string;
}

export interface TransferData {
  fromAccount: string;
  toAccount: string;
  amount: string;
}

export interface BillPayData {
  payeeName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  account: string;
  amount: string;
  fromAccount: string;
}

export interface IResource {
  name?: string;
  response?: string;
  payload?: string;
  statusCode?: string;
}
