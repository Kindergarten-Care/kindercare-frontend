import React from 'react';
import { LessonPlanView } from '@/views/LessonPlan';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kế hoạch bài giảng | KinderCare',
};

export default function LessonPlanPage(): React.ReactElement {
  return <LessonPlanView />;
}