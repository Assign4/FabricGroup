import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import playwrightPlugin from 'eslint-plugin-playwright';

export default [
  js.configs.recommended,
  {
    ignores: ['node_modules/*', 'dist/*'],
  },
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': typescript,
      playwright: playwrightPlugin,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      '@typescript-eslint/no-explicit-any': 'warn',
      'playwright/no-focused-test': 'error',
      'playwright/valid-expect': 'error',
      'playwright/no-skipped-test': 'warn',
    },
  },
];
