import React, { Suspense } from 'react';
import AccountListView from '@/views/AccountList';

export default function AccountListPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountListView />
    </Suspense>
  );
}
