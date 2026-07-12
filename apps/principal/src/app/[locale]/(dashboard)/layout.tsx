import React from 'react';
import DashboardLayout from '@/layout/DashboardLayout';

export default function PrincipalDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
