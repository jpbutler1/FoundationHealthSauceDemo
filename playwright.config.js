import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',          // Where your test files are
  fullyParallel: true,         // Run tests in parallel
  reporter: 'html',            // Generates HTML report
  use: {
    trace: 'on-first-retry',   // Trace recording on first retry
    headless: false,           // Run tests in a visible browser
    viewport: { width: 1280, height: 720 }, // Browser window size
    ignoreHTTPSErrors: true,   // Ignore HTTPS errors if any
    video: 'retain-on-failure',// Optional: record video on failure
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }, // Use desktop Chrome
    },
  ],
});
