'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/layout/DashboardLayout';
import { TeacherProfileView } from '@/views/TeacherProfile';
import { apiClient } from '@kindercare/core';

export default function TeacherProfilePage() {
  const { user, isLoading } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setIsFetching(false);
      return;
    }
    
    apiClient.get('/users/by-role')
      .then((res) => {
        const resData = res.data?.data;
        if (resData) {
          let foundUser = null;
          for (const roleName in resData) {
            const list = resData[roleName];
            foundUser = list.find((u: any) => u.userId === user.userId);
            if (foundUser) break;
          }
          if (foundUser) {
            setProfileData(foundUser);
          } else {
            setError('Không tìm thấy thông tin hồ sơ của bạn trong hệ thống.');
          }
        } else {
          setError('Không thể lấy dữ liệu hồ sơ.');
        }
      })
      .catch((err) => {
        console.error('Lỗi khi lấy thông tin hồ sơ:', err);
        setError('Lỗi khi tải thông tin chi tiết từ máy chủ.');
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [user]);

  if (isLoading || isFetching) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang tải dữ liệu hồ sơ từ hệ thống...</div>;
  }

  if (!user) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Vui lòng đăng nhập...</div>;
  }

  const mergedUser = {
    ...user,
    ...profileData,
  };

  return (
    <DashboardLayout 
      fullName={mergedUser.fullName || mergedUser.username} 
      roleTitle={mergedUser.roleName || 'Giáo Viên Mầm Non'}
    >
      {error ? (
        <div style={{ padding: '2rem', color: '#EF4444', textAlign: 'center' }}>{error}</div>
      ) : (
        <TeacherProfileView user={mergedUser} />
      )}
    </DashboardLayout>
  );
}
