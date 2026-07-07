'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { WeeklyScheduleView } from '@/views/WeeklySchedule';
import { DashboardLayout } from '@/layout/DashboardLayout';

export default function WeeklySchedulePage() {
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
      <WeeklyScheduleView />
    </DashboardLayout>
  );
}
