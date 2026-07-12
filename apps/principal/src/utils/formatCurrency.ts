export const formatCurrency = (amount: number, currency = 'VND'): string => {
  if (amount === 0) return '0';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};
