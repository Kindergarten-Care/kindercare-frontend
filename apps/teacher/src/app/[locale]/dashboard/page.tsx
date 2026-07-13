'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/layout/DashboardLayout';
import { TeacherDashboardView } from '@/views/TeacherDashboard';

export default function TeacherDashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang tải hệ thống...</div>;
  }

  if (!user) {
    return null; // Will redirect via AuthGuard
  }

  return (
    <DashboardLayout 
      fullName={user.fullName || user.username} 
      roleTitle={user.roleName || 'Giáo Viên Mầm Non'}
    >
      <TeacherDashboardView />
    </DashboardLayout>
  );
}
