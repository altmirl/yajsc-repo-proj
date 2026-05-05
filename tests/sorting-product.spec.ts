import { test, expect } from '@playwright/test';
import { HomePage, SortOptions } from '../pages/HomePage.page';

[
    {
        testName: "by Name ASC",
        sortAction: (homePage: HomePage) => homePage.sortBy(SortOptions.NameAsc),
        getValues: (homePage: HomePage) => homePage.getProductList(),
        sort: (a: string, b: string) => a.localeCompare(b),
    },
    {
        testName: "by Name DESC",
        sortAction: (homePage: HomePage) => homePage.sortBy(SortOptions.NameDesc),
        getValues: (homePage: HomePage) => homePage.getProductList(),
        sort: (a: string, b: string) => b.localeCompare(a),
    },
    {
        testName: "by Price ASC",
        sortAction: (homePage: HomePage) => homePage.sortBy(SortOptions.PriceAsc),
        getValues: (homePage: HomePage) => homePage.getProductPrices(),
        sort: (a: number, b: number) => a - b,
    },
    {
        testName: "by Price DESC",
        sortAction: (homePage: HomePage) => homePage.sortBy(SortOptions.PriceDesc),
        getValues: (homePage: HomePage) => homePage.getProductPrices(),
        sort: (a: number, b: number) => b - a,
    },
].forEach(testData =>
    test(`Verify user can perform sorting ${testData?.testName}`, async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.openHomePage();
        await testData.sortAction(homePage);

        const values = await testData.getValues(homePage);

        const expectedValues = [...values].sort(testData.sort);

        expect(values).toEqual(expectedValues);
    })
);