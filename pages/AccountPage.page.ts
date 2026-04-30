import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './HeaderFragment.page';

export class AccountPage {
    readonly page: Page;
    readonly header: HeaderFragment;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.pageTitle = page.getByTestId('page-title');
    }

    async isOnAccountPage(): Promise<boolean> {
        return this.page.url().includes('/account');
    }
}