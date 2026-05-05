import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './HeaderFragment.page';

export class DashboardPage {
    readonly page: Page;
    readonly header: HeaderFragment;
    readonly pageTitle: Locator;
    readonly latestOrders: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.pageTitle = page.getByTestId('page-title');
        this.latestOrders = page.getByRole('heading', { level: 2 });
    }
}