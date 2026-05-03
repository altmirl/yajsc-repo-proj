import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.page';

[
    {
        testName: "by Name ASC",
        sortAction: (homePage: HomePage) => homePage.sortByNameASC(),
        getValues: (homePage: HomePage) => homePage.getProductList(),
        sort: (a: string, b: string) => a.localeCompare(b),
    },
    {
        testName: "by Name DESC",
        sortAction: (homePage: HomePage) => homePage.sortByNameDESC(),
        getValues: (homePage: HomePage) => homePage.getProductList(),
        sort: (a: string, b: string) => b.localeCompare(a),
    },
    {
        testName: "by Price ASC",
        sortAction: (homePage: HomePage) => homePage.sortByPriceASC(),
        getValues: (homePage: HomePage) => homePage.getProductPrices(),
        sort: (a: number, b: number) => a - b,
    },
    {
        testName: "by Price DESC",
        sortAction: (homePage: HomePage) => homePage.sortByPriceDESC(),
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