import { Page, Locator } from '@playwright/test';
import { parsePrice } from '../utils/price';

export class CheckoutPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly confirmationHeader: Locator;

  constructor(page: Page) {
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.itemTotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.total = page.getByTestId('total-label');
    this.confirmationHeader = page.getByTestId('complete-header');
  }

  async fillCustomerInfo(info: { firstName: string; lastName: string; postalCode: string }) {
    await this.firstName.fill(info.firstName);
    await this.lastName.fill(info.lastName);
    await this.postalCode.fill(info.postalCode);
    await this.continueButton.click();
  }

  async amounts() {
    return {
      itemTotal: parsePrice(await this.itemTotal.innerText()),
      tax: parsePrice(await this.tax.innerText()),
      total: parsePrice(await this.total.innerText()),
    };
  }

  async finish() {
    await this.finishButton.click();
  }
}
