import momoLogo from '@/assets/paymnent-icons/momo_logo.webp';
import vnpayLogo from '@/assets/paymnent-icons/logo_vnpay.webp';

export type PaymentMethod = 'momo' | 'vnpay';

export const PAYMENT_METHODS: { key: PaymentMethod; label: string; logo: string }[] = [
  { key: 'momo', label: 'Thanh toán bằng ví điện tử Momo', logo: momoLogo.src },
  { key: 'vnpay', label: 'Thanh toán bằng VNPay QR', logo: vnpayLogo.src },
];

const LOGO_BY_KEY: Record<PaymentMethod, string> = {
  momo: momoLogo.src,
  vnpay: vnpayLogo.src,
};

export function paymentMethodDisplayName(method: PaymentMethod): string {
  return method === 'momo' ? 'MoMo' : 'VNPay';
}

export function paymentMethodLogo(method: string): string | null {
  const key = method.toLowerCase() as PaymentMethod;
  return LOGO_BY_KEY[key] ?? null;
}