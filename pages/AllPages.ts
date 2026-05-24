import { Page } from "@playwright/test";
import { AccountPage } from "./AccountPage.page";
import { LoginPage } from "./LoginPage.page";
import { CheckoutPage } from "./CheckoutPage.page";
import { DashboardPage } from "./DashboardPage.page";
import { HeaderFragment } from "./HeaderFragment.page";
import { HomePage } from "./HomePage.page";
import { ProductPage } from "./ProductPage.page";
import { BillingAddressPage } from "./BillingAddressPage.page";
import { PaymentPage } from "./PaymentPage.page";
import { ConfirmationPage } from "./ConfirmationPage.page";

export class AllPages {
    loginPage: LoginPage;
    accountPage: AccountPage;
    checkoutPage: CheckoutPage;
    dashboardPage: DashboardPage;
    headerFragmentPage: HeaderFragment;
    homePage: HomePage;
    productPage: ProductPage;
    billingAddressPage: BillingAddressPage;
    paymentPage: PaymentPage;
    confirmationPage: ConfirmationPage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.accountPage = new AccountPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.headerFragmentPage = new HeaderFragment(page);
        this.homePage = new HomePage(page);
        this.productPage = new ProductPage(page);
        this.billingAddressPage = new BillingAddressPage(page);
        this.paymentPage = new PaymentPage(page);
        this.confirmationPage = new ConfirmationPage(page);
    }
}