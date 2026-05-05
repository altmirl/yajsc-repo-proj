import { test, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/LoginPage.page';

process.loadEnvFile();

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
const adminFile = path.join(__dirname, '../playwright/.auth/admin.json');

test('authenticate as user', async ({ page }) => {
    test.skip(!!process.env.CI, 'Skipped on CI because of Cloudflare protection');

    const loginPage = new LoginPage(page);
    const email = process.env.USER_EMAIL ?? '';
    const password = process.env.USER_PASSWORD ?? '';

    await page.goto('/auth/login');
    await loginPage.performLogin(email, password);

    await expect(page).toHaveURL('/account');
    await page.context().storageState({ path: authFile });
});

test('authenticate as admin', async ({ page }) => {
    test.skip(!!process.env.CI, 'Skipped on CI because of Cloudflare protection');

    const loginPage = new LoginPage(page);
    const adminEmail = process.env.ADMIN_EMAIL ?? '';
    const adminPassword = process.env.ADMIN_PASSWORD ?? '';

    await page.goto('/auth/login');
    await loginPage.performLogin(adminEmail, adminPassword);

    await expect(page).toHaveURL('/admin/dashboard');
    await page.context().storageState({ path: adminFile });
});