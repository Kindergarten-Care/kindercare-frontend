import React from 'react';
import { ChildProfile } from '@/views/ChildProfile';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hồ sơ bé | KinderCare',
};

export default function ProfilePage(): React.ReactElement {
  return <ChildProfile />;
}
