import React from 'react';
import { AssessmentView } from '@/views/AssessmentView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đánh giá định kỳ | KinderCare',
};

export default function AssessmentPage(): React.ReactElement {
  return <AssessmentView />;
}
