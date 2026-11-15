/** "$29.99" or "Item total: $39.98" -> 29.99 */
export function parsePrice(text: string): number {
  const match = text.match(/\$(\d+(?:\.\d+)?)/);
  if (!match) throw new Error(`No price found in "${text}"`);
  return Number(match[1]);
}

/** Avoids floating point noise (0.1 + 0.2) when comparing money. */
export const toCents = (amount: number): number => Math.round(amount * 100);
