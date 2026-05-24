import { expect } from '@playwright/test';
import { test } from '../fixtures/app';
import { PowerTools } from '../pages/HomePage.page';

test('Verify user can filter products by category', async ({ allPages, page }) => {
    const category = PowerTools.Sander;

    await allPages.homePage.openHomePage();
    await allPages.homePage.filterByCategory(category);

    await page.waitForLoadState('networkidle');

    const products = await allPages.homePage.getProductList();

    products.forEach(product => {
        expect(product).toContain(category);
    });
});