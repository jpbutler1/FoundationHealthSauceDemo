import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout'); // for proceeding to checkout
  }

  async assertSingleItemInCart() {
    await expect(this.cartItems).toHaveCount(1);
  }

  async getCartItemDetails(index = 0) {
    const item = this.cartItems.nth(index);

    return {
      name: await item.locator('.inventory_item_name').innerText(),
      description: await item.locator('.inventory_item_desc').innerText(),
      price: await item.locator('.inventory_item_price').innerText(),
    };
  }

  // 🔹 Add this method
  async assertProductDetailsMatch(expectedProduct) {
    const cartProduct = await this.getCartItemDetails();

    expect(cartProduct.name).toBe(expectedProduct.name);
    expect(cartProduct.description).toBe(expectedProduct.description);
    expect(cartProduct.price).toBe(expectedProduct.price);
  }

  async checkout() {
    await this.checkoutButton.click();
  }

}
