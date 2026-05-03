import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './HeaderFragment.page';

export class CheckoutPage {
    readonly page: Page;
    readonly header: HeaderFragment;
    readonly quantity: Locator;
    readonly itemName: Locator;
    readonly CheckoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.quantity = page.getByTestId('product-quantity');
        this.itemName = page.getByTestId('product-title');
        this.CheckoutButton = page.getByTestId('proceed-1');
    }

    async proceedToCheckoutButton() {
        await this.CheckoutButton.click();
    }
}