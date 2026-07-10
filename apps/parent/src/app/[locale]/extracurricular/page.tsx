import React from 'react';
import { Extracurricular } from '@/views/Extracurricular';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hoạt động ngoại khóa | KinderCare',
};

export default function ExtracurricularPage(): React.ReactElement {
  return <Extracurricular />;
}
