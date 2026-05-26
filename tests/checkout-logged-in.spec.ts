import { expect } from '@playwright/test';
import { test } from '../fixtures/loggedInApp';
import { PaymentMethods } from '../pages/PaymentPage.page';

test('Verify logged in user can complete checkout', async ({ loggedInPage, page }) => {
    await loggedInPage.homePage.openHomePage();

    const productName = await loggedInPage.homePage.product.first().textContent() ?? '';
    const productPrice = await loggedInPage.homePage.price.first().textContent() ?? '';

    await loggedInPage.homePage.product.first().click();
    await loggedInPage.productPage.addToCard();

    await loggedInPage.headerFragmentPage.navigateToCart();

    await expect(page).toHaveURL('/checkout');
    await expect(loggedInPage.checkoutPage.itemName).toHaveText(productName);
    await expect(loggedInPage.checkoutPage.itemPrice).toHaveText(productPrice);
    await expect(loggedInPage.checkoutPage.totalPrice).toHaveText(productPrice);

    await loggedInPage.checkoutPage.proceedToCheckoutButton();

    await loggedInPage.checkoutPage.proceed();

    await loggedInPage.billingAddressPage.fillBillingAddress(
        'United States of America (the)',
        '10001',
        '123',
        'Main Street',
        'New York',
        'NY',
    );
    await loggedInPage.billingAddressPage.proceedToCheckout();

    await loggedInPage.paymentPage.selectCreditCard(PaymentMethods.CreditCard);

    await loggedInPage.paymentPage.fillCardDetails(
        '1111-1111-1111-1111',
        loggedInPage.paymentPage.getExpirationDate(),
        '111',
        'John Doe'
    );
    await loggedInPage.paymentPage.confirmPayment();

    await expect(loggedInPage.confirmationPage.successMessage).toBeVisible();
});