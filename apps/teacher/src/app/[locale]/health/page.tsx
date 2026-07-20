import React from 'react';
import { HealthView } from '@/views/Health';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Y tế & Sức khỏe | KinderCare',
};

export default function HealthPage(): React.ReactElement {
  return <HealthView />;
}
