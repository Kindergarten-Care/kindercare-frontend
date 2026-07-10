'use client';

import React from 'react';
import { useAuth, AuthUser } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/layout/DashboardLayout';
import { TeacherProfileView } from '@/views/TeacherProfile';
import { useTeacherProfile } from '@/hooks/useTeacherQueries';

export default function TeacherProfilePage() {
  const { user, isLoading } = useAuth();
  const { data: profile, isLoading: isProfileLoading, error: profileError } = useTeacherProfile();

  if (isLoading || isProfileLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang tải dữ liệu hồ sơ từ hệ thống...</div>;
  }

  if (!user) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Vui lòng đăng nhập...</div>;
  }

  if (profileError) {
    return (
      <DashboardLayout 
        fullName={user.fullName || user.username} 
        roleTitle={user.roleName || 'Giáo Viên Mầm Non'}
      >
        <div style={{ padding: '2rem', color: '#EF4444', textAlign: 'center' }}>
          Lỗi khi tải thông tin chi tiết từ máy chủ.
        </div>
      </DashboardLayout>
    );
  }

  // dateOfBirth from profile is Unix timestamp (number | null), convert to string for AuthUser
  const mergedUser: AuthUser = {
    ...user,
    ...profile,
    address: profile?.address || user?.address,
    avatarUrl: profile?.avatarUrl || user?.avatarUrl,
    dateOfBirth: profile?.dateOfBirth
      ? new Date(profile.dateOfBirth * 1000).toISOString().split('T')[0]
      : user?.dateOfBirth,
    idCard: profile?.idCard || user?.idCard,
    professionalRank: profile?.professionalRank || user?.professionalRank,
  };

  return (
    <DashboardLayout 
      fullName={mergedUser.fullName || mergedUser.username} 
      roleTitle={mergedUser.roleName || 'Giáo Viên Mầm Non'}
    >
      <TeacherProfileView user={mergedUser} />
    </DashboardLayout>
  );
}

