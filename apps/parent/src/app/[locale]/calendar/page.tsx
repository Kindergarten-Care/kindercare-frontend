import React from 'react';
import { ParentCalendar } from '@/views/ParentCalendar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lịch & Sự kiện | KinderCare',
};

export default function CalendarPage(): React.ReactElement {
  return <ParentCalendar />;
}
