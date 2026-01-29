import { expect } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;

    this.pageTitle = page.locator('.title');
    this.completeHeader = page.locator('.complete-header');
  }

  async assertOrderComplete() {
    await expect(this.pageTitle).toHaveText('Checkout: Complete!');
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
