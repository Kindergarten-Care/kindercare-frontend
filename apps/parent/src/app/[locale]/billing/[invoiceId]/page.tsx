import React from 'react';
import { BillingDetail } from '@/views/BillingDetail';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chi tiết hóa đơn | KinderCare',
};

export default function BillingDetailPage(): React.ReactElement {
  return <BillingDetail />;
}
