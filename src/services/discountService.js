export const DISCOUNT_THRESHOLD = 100;
export const DISCOUNT_BELOW_THRESHOLD = 10;
export const DISCOUNT_FROM_THRESHOLD = 5;

export function calculateDiscount(value) {
  if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) {
    throw new Error('Valor inválido');
  }

  const discount =
    value < DISCOUNT_THRESHOLD ? DISCOUNT_BELOW_THRESHOLD : DISCOUNT_FROM_THRESHOLD;

  const discountValue = (value * discount) / 100;
  const finalValue = value - discountValue;

  return {
    originalValue: value,
    discount,
    discountValue: Number(discountValue.toFixed(2)),
    finalValue: Number(finalValue.toFixed(2))
  };
}
