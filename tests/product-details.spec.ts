import { expect } from '@playwright/test';
import { test } from '../fixtures/app';

test('Verify user can view product details', async ({ allPages, page }) => {
    await allPages.homePage.openHomePage();
    await allPages.homePage.openProductDetails('Combination Pliers');

    await expect(page).toHaveURL(/\/product\//);
    await expect(allPages.productPage.productName).toHaveText('Combination Pliers');
    await expect(allPages.productPage.unitPrice).toHaveText('14.15');
    await expect(allPages.productPage.addToCartButton).toBeVisible();
    await expect(allPages.productPage.addToFavoritesButton).toBeVisible();
});