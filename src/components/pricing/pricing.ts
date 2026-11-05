export const SHIPPING = 16

// Demo coupon: type GREEN10 to get 10% off. Replace with your own check later.
export const COUPONS: Record<string, number> = { GREEN10: 0.1 }

export const money = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`