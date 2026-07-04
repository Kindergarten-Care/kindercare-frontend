import React from 'react';
import { RequestList } from '@/views/RequestList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yêu cầu của phụ huynh | KinderCare',
};

export default function RequestsPage(): React.ReactElement {
  return <RequestList />;
}
