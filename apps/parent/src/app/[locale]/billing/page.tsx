import React from 'react';
import { Billing } from '@/views/Billing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Học phí & Lệ phí | KinderCare',
};

export default function BillingPage(): React.ReactElement {
  return <Billing />;
}
