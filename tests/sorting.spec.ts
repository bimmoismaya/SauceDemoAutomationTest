import { test, expect } from '../fixtures/pages';

test.describe('Sorting Functionality', () => {
  test('Price (high to low) lists the most expensive item first', async ({ loggedInInventory: inventory }) => {
    const before = await inventory.itemPrices();
    await inventory.sortBy('Price (high to low)');

    // Auto-retrying: waits for the re-sort instead of sleeping.
    await expect.poll(async () => (await inventory.itemPrices())[0]).toBe(Math.max(...before));
    const after = await inventory.itemPrices();
    expect(after).toEqual([...before].sort((a, b) => b - a));
  });
});
