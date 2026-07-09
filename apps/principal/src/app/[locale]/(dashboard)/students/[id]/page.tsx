import { use } from 'react';
import StudentDetailView from '@/views/StudentDetail';

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <StudentDetailView studentId={resolvedParams.id} />;
}
