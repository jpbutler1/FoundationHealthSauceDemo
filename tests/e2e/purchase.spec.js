import { test } from '@playwright/test'; 
import { users, checkoutInfo } from '../../utils/testData';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutInformationPage } from '../../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';


test.describe('Purchase Flow', () => {
  let loginPage;
  let productsPage;
  let cartPage;
  let checkoutInfoPage;
  let checkoutOverviewPage;
  let checkoutCompletePage;

 
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutInfoPage = new CheckoutInformationPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);

    //login 
    await loginPage.navigate();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('Complete purchase flow for a product', async () => {
    await productsPage.assertPageTitle();
    await productsPage.assertSixProductsDisplayed();
    await productsPage.assertCartBadgeNotVisible();

   //pick a random product
    const productCount = await productsPage.inventoryItems.count();
    const randomIndex = Math.floor(Math.random() * productCount);
    const selectedProduct = await productsPage.getProductDetailsByIndex(randomIndex);

    await productsPage.addProductToCartByIndex(randomIndex);
    await productsPage.assertCartBadgeCount(1);
    await productsPage.goToCart();

    //cart page
    await cartPage.assertSingleItemInCart();
    await cartPage.assertProductDetailsMatch(selectedProduct);
    await cartPage.checkout();

    //Checkout - Information
    await checkoutInfoPage.assertPageLoaded();
    await checkoutInfoPage.fillCustomerInfo(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );
    await checkoutInfoPage.clickContinue();

    //Checkout - Overview
    await checkoutOverviewPage.assertPageLoaded();
    await checkoutOverviewPage.assertProductDetailsMatch(selectedProduct);
    await checkoutOverviewPage.assertCheckoutSummaryExists();
    await checkoutOverviewPage.clickFinish();

    //Checkout - Complete
    await checkoutCompletePage.assertOrderComplete();
  });
});