import React from 'react';
import { ActivitiesView } from '@/views/Activities';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hoạt động | KinderCare',
};

export default function ActivitiesPage(): React.ReactElement {
  return <ActivitiesView />;
}
