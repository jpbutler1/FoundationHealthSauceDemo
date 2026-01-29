## **FoundationHealthSauceDemo**
This repository contains an **end-to-end (E2E) test suite for the [Sauce Demo](https://www.saucedemo.com/) application using Playwright with JavaScript and the Page Object Model (POM).

The tests cover the **full purchase flow** for a product, including:

- Login
- Selecting a random product
- Adding the product to the cart
- Verifying cart details
- Completing checkout
- Validating the order confirmation

---

## **Prerequisites**

- Node.js v18 or higher
- npm (comes with Node.js)
- Internet connection (to access the Sauce Demo site)

---

## **Setup Instructions**

Clone the repository:
```bash
git clone https://github.com/jpbutler1/FoundationHealthSauceDemo.git
cd FoundationHealthSauceDemo
```

## **Install dependencies**
npm install

## **Install Playwright browsers**
npx playwright install

## **Running Tests**

## **Run tests (default - headed mode)**
npx playwright test

## **Run tests in headed mode (visible browser)**
npx playwright test --headed

## **View HTML report**
npx playwright show-report

## **Project Structure**
```bash
saucedemo/
├── pages/                      # Page Object Model classes
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   ├── CheckoutInformationPage.js
│   ├── CheckoutOverviewPage.js
│   └── CheckoutCompletePage.js
├── tests/
│   └── e2e/                    # End-to-end test specs
│       └── purchase.spec.js
├── utils/
│   └── testData.js             # Test data (users, checkout info)
├── playwright.config.js        # Playwright configuration
├── package.json
└── README.md
```bash

## **Todo/Future Automation**
Logging in with multiple different users -  to test different log in scenarios
clicking the hamburger icon and testing:
-All Items
-About
-Logout 
-Reset App State
Product Sorting
button states change when adding an item to the cart and removing it from the cart on Products page
Adding an item to the cart and removing it
adding multiple items to the cart and completing the checkout process and ensuring the cart icon and items in the cart reflect accordingly
Trying to check out without adding an item to the cart
Removing an item from the cart on the Your Cart page
Removing multiple items from the cart on the Your Cart page
Not filing in data on the Your Information page leaving a field blank" → "Submitting the checkout information page with a missing field to test validation
Ensuring that the Price and tax are values are correct and that it is calculating the correct value" → "Verifying that price, tax, and total calculations are correct"
On the Order Complete Page, clicking Back Home and ensuring I can execute another order. 



