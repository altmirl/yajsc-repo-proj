import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './HeaderFragment.page';

export class BillingAddressPage {
    readonly page: Page;
    readonly header: HeaderFragment;
    readonly countryField: Locator;
    readonly postalCodeField: Locator;
    readonly houseNumberField: Locator;
    readonly streetField: Locator;
    readonly cityField: Locator;
    readonly stateField: Locator;
    readonly proceedToCheckoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.countryField = page.getByTestId('country');
        this.postalCodeField = page.getByTestId('postal_code');
        this.houseNumberField = page.getByTestId('house_number');
        this.streetField = page.getByTestId('street');
        this.cityField = page.getByTestId('city');
        this.stateField = page.getByTestId('state');
        this.proceedToCheckoutButton = page.getByTestId('proceed-3');
    }

    async fillBillingAddress(country: string, postcode: string, houseNumber: string, street: string, city: string, state: string): Promise<void> {
        await this.countryField.selectOption(country);
        await this.postalCodeField.fill(postcode);
        await this.houseNumberField.fill(houseNumber);
        await this.streetField.fill(street);
        await this.cityField.fill(city);
        await this.stateField.fill(state);
    }

    async proceedToCheckout(): Promise<void> {
        await this.proceedToCheckoutButton.click();
    }
}