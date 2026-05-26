import { expect } from '@playwright/test';
import { test } from '../fixtures/app';

test('Verify user can add product to cart', async ({ allPages, page }) => {
    const product = 'Slip Joint Pliers';

    // Click on the product "Slip Joint Pliers"
    await allPages.homePage.openHomePage();
    await allPages.homePage.openProductDetails(product);

    await expect(page).toHaveURL(/\/product\//);
    await expect(allPages.productPage.productName).toHaveText(product);
    await expect(allPages.productPage.unitPrice).toHaveText('9.17');

    // Click "Add to Cart" button
    await allPages.productPage.addToCard();

    await expect(allPages.productPage.toasterAlert).toHaveText('Product added to shopping cart.');
    await expect(allPages.productPage.toasterAlert).toBeHidden({ timeout: 8000 });
    await expect(allPages.headerFragmentPage.cartQuantity).toHaveCount(1);

    // Click on the cart icon in the navigation
    await allPages.headerFragmentPage.navigateToCart();

    await expect(page).toHaveURL('/checkout');
    await expect(allPages.checkoutPage.quantity).toHaveCount(1);
    await expect(allPages.checkoutPage.itemName).toHaveText(product);
    await expect(allPages.checkoutPage.checkoutButton).toBeVisible();
});