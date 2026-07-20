import React from 'react';
import { ProxyApprovalList } from '@/views/ProxyApprovals';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Duyệt đón hộ | KinderCare',
};

export default function ProxyApprovalsPage(): React.ReactElement {
  return <ProxyApprovalList />;
}
