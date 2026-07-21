import React from 'react';
import { ScheduleView } from '@/views/ScheduleView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thực đơn & Lịch học | KinderCare',
};

export default function SchedulePage(): React.ReactElement {
  return <ScheduleView />;
}
