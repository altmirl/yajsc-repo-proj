import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './HeaderFragment.page';

export enum HandTools {
    Hammer = 'Hammer',
    HandSaw = 'Hand Saw',
    Wrench = 'Wrench',
    Screwdriver = 'Screwdriver',
    Pliers = 'Pliers',
    Chisels = 'Chisels',
    Measures = 'Measures'
}
export enum PowerTools {
    Grinder = 'Grinder',
    Sander = 'Sander',
    Saw = 'Saw',
    Drill = 'Drill'
}
export enum Other {
    ToolBelts = 'Tool Belts',
    StorageSolutions = 'Storage Solutions',
    Workbench = 'Workbench',
    SafetyGear = 'Safety Gear',
    Fasteners = 'Fasteners',
}
export enum SortOptions {
    NameAsc = 'name,asc',
    NameDesc = 'name,desc',
    PriceAsc = 'price,asc',
    PriceDesc = 'price,desc'
}
export class HomePage {
    readonly page: Page;
    readonly header: HeaderFragment;
    readonly product: Locator;
    readonly sortIcon: Locator;
    readonly price: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.product = page.getByTestId('product-name');
        this.sortIcon = page.getByTestId('sort');
        this.price = page.getByTestId('product-price');
    }

    async openHomePage(): Promise<void> {
        await this.page.goto('');
    }
    async openProductDetails(name: string): Promise<void> {
        await this.product.filter({ hasText: name }).click();
    }
    async sortBy(param: SortOptions): Promise<void> {
        await this.sortIcon.selectOption(param);
    }
    async getProductList(): Promise<string[]> {
        return await this.product.allTextContents();
    }
    async getProductPrices(): Promise<number[]> {
        const prices = await this.price.allTextContents();
        return prices.map(p => parseFloat(p.replace('$', '').trim()));
    }
    async filterByCategory(category: HandTools | PowerTools | Other): Promise<void> {
        await this.page.getByRole('checkbox', { name: category }).check();
    }
}