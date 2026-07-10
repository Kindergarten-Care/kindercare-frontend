'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@kindercare/core';

export default function RootPage(): React.ReactElement {
  const router = useRouter();

  useEffect(() => {
    const session = getSession();
    if (session) {
      const nextUrl = session.role === 'teacher'
        ? (process.env.NEXT_PUBLIC_TEACHER_APP_URL || 'http://localhost:3001') + '/teacher'
        : (process.env.NEXT_PUBLIC_PRINCIPAL_APP_URL || 'http://localhost:3002') + '/principal';
      window.location.href = nextUrl;
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
      <div style={{ fontSize: '1.25rem', color: '#64748b' }}>Đang tải...</div>
    </div>
  );
}
