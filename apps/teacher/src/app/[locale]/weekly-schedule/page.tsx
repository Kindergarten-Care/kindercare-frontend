import React from 'react';
import { WeeklyScheduleView } from '@/views/WeeklySchedule';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thời khóa biểu | KinderCare',
};

export default function WeeklySchedulePage(): React.ReactElement {
  return <WeeklyScheduleView />;
}
