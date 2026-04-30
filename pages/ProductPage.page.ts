import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './HeaderFragment.page';

export class ProductPage {
    readonly page: Page;
    readonly header: HeaderFragment;
    readonly productName: Locator;
    readonly UnitPrice: Locator;
    readonly addToCartButton: Locator;
    readonly addToFavoritesButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.productName = page.getByTestId('product-name');
        this.UnitPrice = page.getByTestId('unit-price');
        this.addToCartButton = page.getByTestId('add-to-cart');
        this.addToFavoritesButton = page.getByTestId('add-to-favorites');
    }
}