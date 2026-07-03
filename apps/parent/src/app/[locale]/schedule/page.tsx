import React from 'react';
import { ParentSchedule } from '@/views/ParentSchedule';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thực đơn & Lịch học | KinderCare',
};

export default function SchedulePage(): React.ReactElement {
  return <ParentSchedule />;
}
