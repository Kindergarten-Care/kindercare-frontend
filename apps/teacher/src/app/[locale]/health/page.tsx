'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { HealthView } from '@/views/Health';
import { DashboardLayout } from '@/layout/DashboardLayout';

export default function HealthPage() {
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
      roleTitle={user.roleName === 'Teacher' ? 'Giáo viên chủ nhiệm' : (user.roleName || 'Giáo viên')}
    >
      <HealthView />
    </DashboardLayout>
  );
}
