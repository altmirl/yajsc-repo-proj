import { Locator, Page } from '@playwright/test';
import { HeaderFragment } from './HeaderFragment.page';

export enum PaymentMethods {
    BankTransfer = 'Bank Transfer',
    CashOnDelivery = 'Cash on Delivery',
    CreditCard = 'Credit Card',
    BuyNowPayLater = 'Buy Now Pay Later',
    GiftCard = 'Gift Card',
}

export class PaymentPage {
    readonly page: Page;
    readonly header: HeaderFragment;
    readonly paymentMethodDropdown: Locator;
    readonly cardNumberField: Locator;
    readonly expirationDateField: Locator;
    readonly cvvField: Locator;
    readonly cardHolderField: Locator;
    readonly confirmButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.paymentMethodDropdown = page.getByTestId('payment-method');
        this.cardNumberField = page.getByTestId('credit_card_number');
        this.expirationDateField = page.getByTestId('expiration_date');
        this.cvvField = page.getByTestId('cvv');
        this.cardHolderField = page.getByTestId('card_holder_name');
        this.confirmButton = page.getByTestId('finish');
    }

    async selectCreditCard(method: PaymentPage): Promise<void> {
        await this.paymentMethodDropdown.selectOption(method);
    }

    async fillCardDetails(cardNumber: string, expirationDate: string, cvv: string, cardHolder: string): Promise<void> {
        await this.cardNumberField.fill(cardNumber);
        await this.expirationDateField.fill(expirationDate);
        await this.cvvField.fill(cvv);
        await this.cardHolderField.fill(cardHolder);
    }

    async confirmPayment(): Promise<void> {
        await this.confirmButton.click();
    }

    getExpirationDate(): string {
        const date = new Date();
        date.setMonth(date.getMonth() + 3);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${year}`;
    }
}