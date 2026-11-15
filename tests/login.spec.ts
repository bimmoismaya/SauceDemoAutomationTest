import { test, expect } from '../fixtures/pages';
import { users } from '../data/users';

test.describe('Customer Login & Validation', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('valid credentials redirect to the Product Listing page', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.items).not.toHaveCount(0);
  });

  test('wrong credentials show the correct error message', async ({ page, loginPage }) => {
    await loginPage.login(users.invalid.username, users.invalid.password);

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
    await expect(page).not.toHaveURL(/inventory\.html/);
  });
});
