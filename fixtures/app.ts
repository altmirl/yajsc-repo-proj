import { test as base } from '@playwright/test';
import { AllPages } from '../pages/AllPages';

type App = {
    allPages: AllPages;
};

export const test = base.extend<App>({
    allPages: async ({ page }, use) => {
        const allPages = new AllPages(page);
        await use(allPages);
    },
});