# Saucedemo E2E Automation (Playwright + TypeScript)

E2E suite for https://www.saucedemo.com (QA Technical Assessment, Section 3).

## Prerequisites
- Node.js 18+ and npm

## Setup
```bash
npm install
npx playwright install chromium
```

## Run
```bash
npm test               # headless, all tests
npm run test:headed    # watch the browser
npm run report         # open the HTML report (playwright-report/)
npm run typecheck
BASE_URL=https://other-env.example.com npm test   # override target environment
```

## Covered flows
| Spec | Scenario |
|------|----------|
| `tests/login.spec.ts` | Valid login redirects to Product Listing; wrong credentials show the correct error |
| `tests/checkout.spec.ts` | Add 2 items, verify the cart, check out, assert Item Total + Tax = Total, verify the "Thank you" message |
| `tests/sorting.spec.ts` | Sort "Price (high to low)", assert first item is the most expensive |

## Structure
```
pages/      Page Objects (locators and actions, no assertions)
fixtures/   Playwright fixtures that inject page objects and a logged-in session
data/       Test data (credentials, customer info)
utils/      Price parsing helpers (money compared in cents to avoid float errors)
tests/      Specs (all assertions live here)
```

## Design notes
- No hard-coded sleeps. Waiting relies on Playwright auto-waiting and web-first assertions (`expect(...).toHaveText`, `expect.poll`).
- Locators use `data-test` attributes via `testIdAttribute` in `playwright.config.ts` (saucedemo's convention).
- Tests are independent and run in parallel. Each one logs in on its own.
- Reporting: console `list` reporter and an HTML report. Screenshots are saved on failure and traces on the first retry.
# SauceDemoAutomationTest
