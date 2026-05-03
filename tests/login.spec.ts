import { test, expect } from '@playwright/test';
import { AccountPage } from '../pages/AccountPage.page';
import { DashboardPage } from '../pages/DashboardPage.page'

test.describe('User login', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('Verify login with valid credentials @user', async ({ page }) => {
    test.skip(!!process.env.CI, 'Skipped on CI because of Cloudflare protection');

    const accountPage = new AccountPage(page);

    await page.goto('/account');

    await expect(page).toHaveURL('/account');
    await expect(accountPage.pageTitle).toHaveText('My Account', { ignoreCase: true });
    await expect(accountPage.header.navMenu).toHaveText('Jack Howe');
  });
});

test.describe('Admin login', () => {
  test.use({ storageState: 'playwright/.auth/admin.json' });

  test('Verify admin login with valid credentials @admin', async ({ page }) => {
    test.skip(!!process.env.CI, 'Skipped on CI because of Cloudflare protection');

    const dashboardPage = new DashboardPage(page);

    await page.goto('/admin/dashboard');

    await expect(page).toHaveURL('/admin/dashboard');
    await expect(dashboardPage.pageTitle).toHaveText('Sales over the years', { ignoreCase: true });
    await expect(dashboardPage.latestOrders).toHaveText('Latest orders');
  });
});