import { expect } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.summaryValues = page.locator('.summary_value_label');
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
  }

  async assertPageLoaded() {
    await expect(this.pageTitle).toHaveText('Checkout: Overview');
  }

  async getItemDetailsByIndex(index = 0) {
    const item = this.cartItems.nth(index);
    return {
      name: await item.locator('.inventory_item_name').innerText(),
      description: await item.locator('.inventory_item_desc').innerText(),
      price: await item.locator('.inventory_item_price').innerText(),
    };
  }

  async assertProductDetailsMatch(expected, index = 0) {
    const item = this.cartItems.nth(index);
    await expect(item.locator('.inventory_item_name')).toHaveText(expected.name);
    await expect(item.locator('.inventory_item_desc')).toHaveText(expected.description);
    await expect(item.locator('.inventory_item_price')).toHaveText(expected.price);
  }

  async assertCheckoutSummaryExists() {
    await expect(this.summaryValues).toHaveCount(2);
    await expect(this.summaryValues.nth(0)).toBeVisible();
    await expect(this.summaryValues.nth(1)).toBeVisible();
    await expect(this.itemTotal).toBeVisible();
    await expect(this.tax).toBeVisible();
    await expect(this.total).toBeVisible();
  }

  async clickFinish() {
    await this.finishButton.click();
  }
}