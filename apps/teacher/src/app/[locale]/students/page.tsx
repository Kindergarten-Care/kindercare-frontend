import React from 'react';
import { StudentsListView } from '@/views/StudentsList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Danh sách lớp | KinderCare',
};

export default function StudentsPage(): React.ReactElement {
  return <StudentsListView />;
}
