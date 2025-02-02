/* eslint-disable no-undef */
import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Get dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// Load environment variables
config({ path: resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  /* Maximum time one test can run for */
  timeout: 30000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry failed tests on CI */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter configuration */
  reporter: [['html', { open: process.env.CI ? 'never' : 'on-failure' }], ['list']],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL for ParaBank application */
    baseURL: process.env.BASE_URL || 'https://parabank.parasoft.com/parabank',

    /* Collect trace on failure */
    trace: 'retain-on-failure',

    /* Capture screenshot on failure */
    screenshot: 'only-on-failure',

    /* Record video on failure */
    video: 'retain-on-failure',

    /* Maximum time for actions like click */
    actionTimeout: 10000,

    /* Maximum time for navigation */
    navigationTimeout: 15000,

    /* Viewport size */
    viewport: { width: 1920, height: 1080 },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        /* Additional Chromium-specific settings */
        launchOptions: {
          args: ['--disable-dev-shm-usage'],
        },
      },
    },
  ],

  /* Configure test artifact output directories */
  outputDir: 'test-results/',

  /* Expect configuration */
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      maxDiffPixels: 100,
    },
  },

  /* Global timeout for test files */
  globalTimeout: process.env.CI ? 60 * 60 * 1000 : undefined, // 1 hour on CI
});
