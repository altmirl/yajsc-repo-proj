import { test, expect } from '@playwright/test';
import { HomePage, PowerTools } from '../pages/HomePage.page';

test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);
    const category = PowerTools.Sander;

    await homePage.openHomePage();
    await homePage.filterByCategory(category);

    await page.waitForLoadState('networkidle');

    const products = await homePage.getProductList();

    products.forEach(product => {
        expect(product).toContain(category);
    });
});