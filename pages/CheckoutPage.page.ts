import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './HeaderFragment.page';

export class CheckoutPage {
    readonly page: Page;
    readonly header: HeaderFragment;
    readonly quantity: Locator;
    readonly itemName: Locator;
    readonly itemPrice: Locator;
    readonly totalPrice: Locator;
    readonly checkoutButton: Locator;
    readonly proceedButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.quantity = page.getByTestId('product-quantity');
        this.itemName = page.getByTestId('product-title');
        this.itemPrice = page.getByTestId('product-price');
        this.totalPrice = page.getByTestId('cart-total');
        this.checkoutButton = page.getByTestId('proceed-1');
        this.proceedButton = page.getByTestId('proceed-2');
    }

    async proceedToCheckoutButton() {
        await this.checkoutButton.click();
    }

    async proceed() {
        await this.proceedButton.click();
    }
}