import { vatRate } from '@/data/events';

/**
 * Format a price to always have 2 decimal places
 * @param price The price to format
 * @returns The price formatted with exactly 2 decimal places
 */
export const roundPrice = (price: number): string => {
  if (!price) return '0.00';
  // First round to 2 decimal places
  const rounded = Math.round(price * 100) / 100;
  // Then format to always show 2 decimal places
  return rounded.toFixed(2);
};

/**
 * Calculate the price excluding VAT from a VAT-inclusive price
 * @param priceWithVat The price including VAT
 * @returns The price excluding VAT, formatted with 2 decimal places
 */
export const calculatePriceExcludingVat = (priceWithVat: number): string => {
  if (!priceWithVat) return '0.00';
  
  // Formula: priceExcludingVat = priceWithVat / (1 + vatRate)
  const priceExcludingVat = priceWithVat / (1 + vatRate);
  
  // Format with 2 decimal places
  return roundPrice(priceExcludingVat);
};

/**
 * Calculate the VAT amount from a VAT-inclusive price
 * @param priceWithVat The price including VAT
 * @returns The VAT amount, formatted with 2 decimal places
 */
export const calculateVatAmount = (priceWithVat: number): string => {
  if (!priceWithVat) return '0.00';
  
  // Calculate the price excluding VAT as a number for the calculation
  const priceExcludingVatNum = priceWithVat / (1 + vatRate);
  const vatAmount = priceWithVat - priceExcludingVatNum;
  
  // Format with 2 decimal places
  return roundPrice(vatAmount);
};
