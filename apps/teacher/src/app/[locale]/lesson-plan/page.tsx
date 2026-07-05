'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LessonPlanLayout } from '@/views/LessonPlan/components/LessonPlanLayout';
import { LessonPlanView } from '@/views/LessonPlan';

export default function LessonPlanPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang tải dữ liệu...</div>;
  }

  if (!user) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Vui lòng đăng nhập...</div>;
  }

  return (
    <LessonPlanLayout>
      <LessonPlanView />
    </LessonPlanLayout>
  );
}
