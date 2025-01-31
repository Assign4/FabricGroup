import { faker } from '@faker-js/faker';
import { TestData } from '../pages';
import { UserData } from './types';

export class DataGenerator {
  generateCustomerData(): TestData {
    const userData: UserData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      phone: faker.phone.number(),
      ssn: faker.string.numeric(9),
      username: faker.internet.displayName(),
      password: faker.lorem.words(1),
    };
    return { userData };
  }
}
