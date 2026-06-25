'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/layout/DashboardLayout';
import { TeacherProfileView } from '@/views/TeacherProfile';

export default function TeacherProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang tải dữ liệu hồ sơ...</div>;
  }

  if (!user) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Vui lòng đăng nhập...</div>;
  }

  return (
    <DashboardLayout 
      fullName={user.fullName || user.username} 
      roleTitle={user.roleName || 'Giáo Viên Mầm Non'}
    >
      <TeacherProfileView />
    </DashboardLayout>
  );
}
