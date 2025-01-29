import { faker } from '@faker-js/faker';

export class DataGenerator {
  static generateUniqueUsername(): string {
    return `user_${faker.string.alphanumeric(8)}`;
  }

  static generateCustomerData() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      phone: faker.phone.number(),
      ssn: faker.string.numeric(9),
    };
  }
}
