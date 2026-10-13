import { existsSync } from 'node:fs';
import { defineConfig } from '@playwright/test';

// Prefer an explicit override, then the cloud image's existing Chromium.
// Other machines use the browser installed by `npx playwright install chromium`.
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
  || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://127.0.0.1:3100',
    headless: true,
    launchOptions: { executablePath },
  },
  webServer: {
    command: 'npm run start -- --port 3100',
    url: 'http://127.0.0.1:3100',
    // Always verify this build rather than an unrelated development server.
    reuseExistingServer: false,
    timeout: 60000,
  },
});
