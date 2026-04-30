import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.page';
import { ProductPage } from '../pages/ProductPage.page';

test('Verify user can view product details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.openHomePage();
    await homePage.openProductDetails('Combination Pliers');

    await expect(page).toHaveURL(/\/product\//);
    await expect(productPage.productName).toHaveText('Combination Pliers');
    await expect(productPage.UnitPrice).toHaveText('14.15');
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToFavoritesButton).toBeVisible();
});