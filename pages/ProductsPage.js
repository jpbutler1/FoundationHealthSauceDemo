import { expect } from '@playwright/test';

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async assertPageTitle() {
    await expect(this.pageTitle).toHaveText('Products');
  }

  async assertSixProductsDisplayed() {
    await expect(this.inventoryItems).toHaveCount(6);
  }

  async assertCartBadgeNotVisible() {
    await expect(this.cartBadge).toHaveCount(0);
  }

  async assertCartBadgeCount(count) {
    await expect(this.cartBadge).toHaveText(count.toString());
  }

  // 🔹 NEW: reusable product reader
  async getProductDetailsByIndex(index) {
    const item = this.inventoryItems.nth(index);

    return {
      name: await item.locator('.inventory_item_name').innerText(),
      description: await item.locator('.inventory_item_desc').innerText(),
      price: await item.locator('.inventory_item_price').innerText(),
    };
  }

  async addProductToCartByIndex(index) {
    const item = this.inventoryItems.nth(index);
    const addToCartButton = item.locator('button');

    await addToCartButton.click();
    await expect(addToCartButton).toHaveText('Remove');
  }

  async goToCart() {
    await this.cartLink.click();
  }

  // 🔹 NEW: get total number of products
  async getTotalProducts() {
    return await this.inventoryItems.count();
  }
}
