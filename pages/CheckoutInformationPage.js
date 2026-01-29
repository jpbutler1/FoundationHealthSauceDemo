import { expect } from '@playwright/test';

export class CheckoutInformationPage {
  constructor(page) {
    this.page = page;

    this.pageTitle = page.locator('.title');

    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');

    this.continueButton = page.locator('#continue');
  }

  async assertPageLoaded() {
    await expect(this.pageTitle).toHaveText('Checkout: Your Information');
  }

  async fillCustomerInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }
  
async clickContinue() {
  await this.continueButton.waitFor({ state: 'visible' });
  await this.continueButton.click();
}

}