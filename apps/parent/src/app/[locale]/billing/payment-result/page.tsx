import React from 'react';
import { BillingPaymentResult } from '@/views/BillingPaymentResult';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kết quả thanh toán | KinderCare',
};

export default function BillingPaymentResultPage(): React.ReactElement {
  return <BillingPaymentResult />;
}
