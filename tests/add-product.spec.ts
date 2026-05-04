import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.page';
import { ProductPage } from '../pages/ProductPage.page';
import { HeaderFragment } from '../pages/HeaderFragment.page';
import { CheckoutPage } from '../pages/CheckoutPage.page'

test('Verify user can add product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const headerFragment = new HeaderFragment(page);
    const checkoutPage = new CheckoutPage(page);
    const product = 'Slip Joint Pliers';

    // Click on the product "Slip Joint Pliers"
    await homePage.openHomePage();
    await homePage.openProductDetails(product);

    await expect(page).toHaveURL(/\/product\//);
    await expect(productPage.productName).toHaveText(product);
    await expect(productPage.unitPrice).toHaveText('9.17');

    // Click "Add to Cart" button
    await productPage.addToCard();

    await expect(productPage.toasterAlert).toHaveText('Product added to shopping cart.');
    await expect(productPage.toasterAlert).toBeHidden({ timeout: 8000 });
    await expect(headerFragment.cartQuantity).toHaveCount(1);

    // Click on the cart icon in the navigation
    await headerFragment.navigateToCart();

    await expect(page).toHaveURL('/checkout');
    await expect(checkoutPage.quantity).toHaveCount(1);
    await expect(checkoutPage.itemName).toHaveText(product);
    await expect(checkoutPage.checkoutButton).toBeVisible();
});