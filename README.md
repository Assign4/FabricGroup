# FabricGroup

# ParaBank Test Automation Framework

End-to-end test automation framework for ParaBank application using Playwright and Pactum, covering both UI and API test scenarios.

## 🚀 Features

- End-to-end testing of ParaBank banking application
- UI testing with Playwright
- API testing with Pactum
- TypeScript implementation
- Page Object Model design pattern
- Data-driven testing
- Automatic test data generation with Faker
- Code quality tools (ESLint, Prettier)
- Git hooks with Husky
- Continuous Integration ready

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)
- Git

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd parabanktests
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## 🏃‍♂️ Running Tests

### Run all tests:

```bash
npm test
```

### Run tests in headed mode:

```bash
npm run test:headed
```

## 💻 Development

### Code Quality

Format code:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

Lint code:

```bash
npm run lint
```

Fix linting issues:

```bash
npm run lint:fix
```

### Git Hooks

This project uses Husky for Git hooks. The following hooks are configured:

- pre-commit: Runs lint-staged to format and lint changed files

## 📁 Project Structure

```
parabanktests/
├── src/
│   ├── data/           # Test data and fixtures
│   ├── pages/          # Page Object Models
│   ├── apihelper/      # API testing utilities
│   └── tests/          # Test specifications
├── playwright.config.ts # Playwright configuration
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies and scripts
```

## 🔍 Test Scenarios

### UI Test Scenarios

1. Application Navigation
2. User Registration
3. Authentication
4. Global Navigation Menu Verification
5. Account Creation
6. Account Overview Validation
7. Fund Transfer
8. Bill Payment
9. Assertions at each step

### API Test Scenarios

1. Transaction Search
2. Response Validation

## 📝 Configuration

### Environment Variables

Create a `.env` file in the project root (if needed):

```env
BASE_URL=https://parabank.parasoft.com/parabank
API_TIMEOUT=10000
```

### Playwright Configuration

Key configurations in `playwright.config.ts`:

- Browsers: Chromium, Firefox, WebKit
- Parallel execution settings
- Screenshot and video capture settings
- Timeout settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📜 License

ISC

## 👥 Authors

- manojsalugu

## 💡 Additional Notes

- The framework uses TypeScript for better type safety and developer experience
- Page Object Model (POM) is implemented for better maintainability
- Faker.js is used for generating test data
- ESLint and Prettier ensure consistent code style
- Husky and lint-staged maintain code quality in commits
