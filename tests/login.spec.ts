import { test, expect } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('/auth/login');

  await page.getByTestId('email').fill("customer@practicesoftwaretesting.com");
  await page.getByTestId('password').fill("welcome01");
  await page.getByRole('button', { name: 'Login' }).click();

  // Expect url
  await expect(page).toHaveURL('/account');
  //Expect page title is "My Account"
  await expect(page.getByTestId('page-title')).toHaveText('My Account', { ignoreCase: true });
  //Expect username
  await expect(page.getByTestId('nav-menu')).toHaveText('Jane Doe');
});