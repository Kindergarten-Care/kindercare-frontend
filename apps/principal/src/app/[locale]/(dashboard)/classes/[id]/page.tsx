import React from 'react';
import ClassDetailView from '@/views/ClassDetail';
import { useTranslations } from 'next-intl';

export default async function ClassDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  // Use translations if needed
  // const t = useTranslations('Classes');
  
  const resolvedParams = await params;
  return <ClassDetailView classId={resolvedParams.id} />;
}
