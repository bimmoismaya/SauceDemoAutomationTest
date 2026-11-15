import { Page, Locator } from '@playwright/test';
import { parsePrice } from '../utils/price';

export class InventoryPage {
  readonly title: Locator;
  readonly items: Locator;
  readonly sortDropdown: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  /** Adds the item by name; returns the name so callers can assert on it later. */
  async addToCart(name: string): Promise<string> {
    await this.items.filter({ hasText: name }).getByRole('button', { name: 'Add to cart' }).click();
    return name;
  }

  async sortBy(label: 'Name (A to Z)' | 'Name (Z to A)' | 'Price (low to high)' | 'Price (high to low)') {
    await this.sortDropdown.selectOption({ label });
  }

  async itemNames(): Promise<string[]> {
    return this.page.getByTestId('inventory-item-name').allInnerTexts();
  }

  async itemPrices(): Promise<number[]> {
    const texts = await this.page.getByTestId('inventory-item-price').allInnerTexts();
    return texts.map(parsePrice);
  }

  async openCart() {
    await this.cartLink.click();
  }
}
