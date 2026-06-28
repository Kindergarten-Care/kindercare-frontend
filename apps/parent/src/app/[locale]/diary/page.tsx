import React from 'react';
import { ParentDiary } from '@/views/ParentDiary';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nhật ký bé | KinderCare',
};

export default function DiaryPage(): React.ReactElement {
  return <ParentDiary />;
}
