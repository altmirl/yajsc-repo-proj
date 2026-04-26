# yajsc-repo-proj

Playwright end-to-end testing project for automated web testing.

## Tech Stack

- Playwright Test framework (v1.59.1)
- TypeScript
- Node.js

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd yajsc-repo-proj
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Usage

### Running Tests

Run all tests in headless mode:

```bash
npm test
```

Run tests in headed mode (see browser):

```bash
npx playwright test --headed
```

Run tests in UI mode (interactive):

```bash
npm run uimode
```

Run a specific test file:

```bash
npx playwright test tests/example.spec.ts
```

Run tests in debug mode:

```bash
npx playwright test --debug
```

### Viewing Test Reports

Show the last test report:

```bash
npm run report
```

Or directly:

```bash
npx playwright show-report
```

### Writing Tests

Tests are located in the `tests/` directory. Example test structure:

```typescript
import { test, expect } from "@playwright/test";

test("test description", async ({ page }) => {
  await page.goto("https://example.com");
  // Your test steps here
});
```

### Configuration

- Test configuration: `playwright.config.ts`
- Test files: `tests/*.spec.ts`
- Custom test ID attribute: `data-test`

### CI/CD

Tests automatically run on:

- Push to `main` branch
- Pull requests to `main` branch

GitHub Actions workflow: `.github/workflows/playwright.yml`

## Project Structure

```
yajsc-repo-proj/
├── tests/              # Test files
├── playwright.config.ts # Playwright configuration
├── package.json        # Project dependencies
└── .github/            # CI/CD workflows
    └── workflows/
        └── playwright.yml
```
