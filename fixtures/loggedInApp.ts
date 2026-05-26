import { test as base } from '../fixtures/app';
import { AllPages } from '../pages/AllPages';
import { expect } from '@playwright/test';

process.loadEnvFile();

type LoggedInApp = {
    loggedInPage: AllPages;
};

export const test = base.extend<LoggedInApp>({
    loggedInPage: async ({ allPages, page }, use) => {
        const email = process.env.USER_EMAIL ?? '';
        const password = process.env.USER_PASSWORD ?? '';

        await page.goto('/auth/login');
        await allPages.loginPage.performLogin(email, password);

        await expect(page).toHaveURL('/account');
        await use(allPages);
    },
});