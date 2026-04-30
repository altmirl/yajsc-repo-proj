import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.page';
import { AccountPage } from '../pages/AccountPage.page';

test('Verify login with valid credentials', async ({ page }) => {
  test.skip(!!process.env.CI, 'Skipped on CI because of Cloudflare protection');

  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await page.goto('/auth/login');
  await loginPage.performLogin('customer2@practicesoftwaretesting.com', 'welcome01');
  //await page.waitForURL('/account', { timeout: 10000 });

  await expect(page).toHaveURL('/account');
  await expect(accountPage.pageTitle).toHaveText('My Account', { ignoreCase: true });
  await expect(accountPage.header.navMenu).toHaveText('Jack Howe');
});