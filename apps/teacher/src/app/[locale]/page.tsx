'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/layout/DashboardLayout';
import { TeacherDashboardView } from '@/views/TeacherDashboard';

export default function TeacherHomePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang tải dữ liệu...</div>;
  }

  // Nếu không có user, AuthContext sẽ chuyển hướng về trang login (portal).
  // Vì AuthContext.logout() dùng window.location.href, ta có thể dùng useEffect trong thực tế.
  // Tuy nhiên, để tránh lỗi hiển thị khi chưa redirect xong:
  if (!user) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Vui lòng đăng nhập...</div>;
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
