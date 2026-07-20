import React from 'react';
import { AttendanceView } from '@/views/Attendance';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Điểm danh | KinderCare',
};

export default function AttendancePage(): React.ReactElement {
  return <AttendanceView />;
}
