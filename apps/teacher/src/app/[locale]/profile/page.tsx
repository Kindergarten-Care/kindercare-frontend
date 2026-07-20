import React from 'react';
import { TeacherProfileView } from '@/views/TeacherProfile';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hồ sơ giáo viên | KinderCare',
};

export default function TeacherProfilePage(): React.ReactElement {
  return <TeacherProfileView />;
}
