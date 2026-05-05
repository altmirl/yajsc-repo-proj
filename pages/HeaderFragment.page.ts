import { Locator, Page } from '@playwright/test';
export class HeaderFragment {
    readonly page: Page;
    readonly navMenu: Locator;
    readonly signIn: Locator;
    readonly accountLink: Locator;
    readonly navCart: Locator;
    readonly cartQuantity: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navMenu = page.getByTestId('nav-menu');
        this.signIn = page.getByTestId('nav-sign-in');
        this.accountLink = page.getByRole('link', { name: 'My Account' });
        this.navCart = page.getByTestId('nav-cart');
        this.cartQuantity = page.getByTestId('cart-quantity');

    }
    async navigateToLogin(): Promise<void> {
        await this.signIn.click();
    }
    async navigateToAccount(): Promise<void> {
        await this.accountLink.click();
    }
    async getUserName(): Promise<string> {
        return await this.navMenu.textContent() || '';
    }
    async navigateToCart(): Promise<void> {
        await this.navCart.click();
    }
}