import React, { Suspense } from 'react';
import { TeacherDashboardView } from '@/views/TeacherDashboard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tổng quan | KinderCare',
};

export default function TeacherDashboardPage(): React.ReactElement {
  return (
    <Suspense fallback={null}>
      <TeacherDashboardView />
    </Suspense>
  );
}
