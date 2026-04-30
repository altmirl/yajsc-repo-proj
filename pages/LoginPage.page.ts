import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './HeaderFragment.page';

export class LoginPage {
    readonly page: Page;
    readonly header: HeaderFragment;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.emailField = page.getByTestId('email');
        this.passwordField = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-submit');
    }

    async openLogin(): Promise<void> {
        await this.header.navigateToLogin;
    }

    async performLogin(email: string, password: string): Promise<void> {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}