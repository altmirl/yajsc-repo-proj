import { Locator, Page } from '@playwright/test';

export class HeaderFragment {
    readonly page: Page;
    readonly navMenu: Locator;
    readonly signIn: Locator;
    readonly accountLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navMenu = page.getByTestId('nav-menu');
        this.signIn = page.getByTestId('nav-sign-in');
        this.accountLink = page.getByRole('link', { name: 'My Account' });
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
}