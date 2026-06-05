import { expect } from '@playwright/test';
import { test } from '../fixtures/app';

const PRODUCT_COUNT = 20;

const mockedProducts = Array.from({ length: PRODUCT_COUNT }, (_, i) => ({
    id: `product-id-${i + 1}`,
    name: `Product ${i + 1}`,
}));

test('Verify all 20 products are displayed on the page', { tag: '@smoke' }, async ({ allPages, page }) => {
    await page.route('**/products**', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                data: mockedProducts,
                current_page: 1,
                from: 1,
                last_page: 1,
                per_page: PRODUCT_COUNT,
                to: PRODUCT_COUNT,
                total: PRODUCT_COUNT,
            }),
        });
    });

    await allPages.homePage.openHomePage();

    await expect(allPages.homePage.product).toHaveCount(PRODUCT_COUNT);
});
