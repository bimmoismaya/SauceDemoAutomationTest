import { test, expect } from '../fixtures/pages';
import { customer } from '../data/users';
import { toCents } from '../utils/price';

test.describe('End-to-End Checkout Flow', () => {
  test('two items: cart contents, Item Total + Tax = Total, order confirmation', async ({
    page,
    loggedInInventory: inventory,
    cartPage,
    checkoutPage,
  }) => {
    const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    for (const name of products) await inventory.addToCart(name);
    await expect(inventory.cartBadge).toHaveText('2');

    await inventory.openCart();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.itemNames).toHaveText(products);

    await cartPage.checkout();
    await checkoutPage.fillCustomerInfo(customer);
    await expect(page).toHaveURL(/checkout-step-two\.html/);

    // Critical assertion: Item Total + Tax == Total (compared in cents to avoid float errors).
    const { itemTotal, tax, total } = await checkoutPage.amounts();
    expect(toCents(itemTotal) + toCents(tax)).toBe(toCents(total));

    await checkoutPage.finish();
    await expect(checkoutPage.confirmationHeader).toHaveText('Thank you for your order!');
  });
});
