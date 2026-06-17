'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ActivitiesView } from '@/views/Activities';
import { DashboardLayout } from '@/layout/DashboardLayout';

export default function ActivitiesPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang tải dữ liệu...</div>;
  }

  if (!user) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Vui lòng đăng nhập...</div>;
  }

  return (
    <DashboardLayout 
      fullName={user.fullName || user.username} 
      roleTitle={user.roleName || 'Giáo viên chủ nhiệm'}
    >
      <ActivitiesView />
    </DashboardLayout>
  );
}
