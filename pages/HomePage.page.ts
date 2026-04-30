import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './HeaderFragment.page';

export class HomePage {
    readonly page: Page;
    readonly header: HeaderFragment;
    readonly product: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.product = page.getByTestId('product-name');
    }

    async openHomePage(): Promise<void> {
        await this.page.goto('');
    }

    async openProductDetails(name: string): Promise<void> {
        await this.product.filter({ hasText: name }).click();
    }
}