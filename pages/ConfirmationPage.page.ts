import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './HeaderFragment.page';

export class ConfirmationPage {
    readonly page: Page;
    readonly header: HeaderFragment;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.successMessage = page.getByTestId('payment-success-message');
    }
}