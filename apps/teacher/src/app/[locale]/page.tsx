'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherRootRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Logic kiểm tra trạng thái tại trang chủ gốc (No subpath)
    const token = sessionStorage.getItem('teacher_token');
    if (token) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Đang điều hướng...</div>
    </div>
  );
}
