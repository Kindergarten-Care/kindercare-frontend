import React, { Suspense } from 'react';
import DashboardLayout from '@/layout/DashboardLayout';

export default function PrincipalDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </Suspense>
  );
}
