import React from 'react';
import { ChildGrowthHistory } from '@/views/ChildGrowthHistory';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lịch sử phát triển | KinderCare',
};

export default function GrowthPage(): React.ReactElement {
  return <ChildGrowthHistory />;
}
