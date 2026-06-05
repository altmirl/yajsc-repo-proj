import { test as base } from '../fixtures/app';
import { AllPages } from '../pages/AllPages';
import { expect } from '@playwright/test';

if (!process.env.CI) process.loadEnvFile();

type LoggedInApp = {
    loggedInPage: AllPages;
};

export const test = base.extend<LoggedInApp>({
    loggedInPage: async ({ allPages, page, request }, use) => {
        const resp = await request.post(process.env.API_LOGIN_URL as string, {
            data: {
                email: process.env.USER_EMAIL,
                password: process.env.USER_PASSWORD,
            }
        });

        expect(resp.ok()).toBe(true);

        const jsonData = await resp.json() as Record<string, string>;
        const token = jsonData['access_token'];

        await page.goto('/');
        await page.evaluate((authToken) => {
            localStorage.setItem('auth-token', authToken);
        }, token);
        await page.reload();

        await use(allPages);
    },
});