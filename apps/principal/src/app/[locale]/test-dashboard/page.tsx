'use client';

import React from 'react';
import { useAuth } from '@kindercare/core';
import { useRouter } from '@/i18n/routing';

export default function TestDashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Bạn chưa đăng nhập!</h2>
        <button onClick={() => router.push('/login')} style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Quay lại Đăng nhập
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Dashboard Hiệu trưởng (Trang mẫu test)</h1>
      <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <p><strong>Xin chào:</strong> {user?.fullName}</p>
        <p><strong>Tài khoản:</strong> {user?.username}</p>
        <p><strong>Role:</strong> {user?.roleName}</p>
      </div>
      <button 
        onClick={() => {
          logout();
          router.push('/login');
        }} 
        style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Đăng xuất
      </button>
    </div>
  );
}
