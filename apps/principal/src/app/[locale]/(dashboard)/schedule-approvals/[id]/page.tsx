import { use } from 'react';
import ScheduleApprovalDetailView from '@/views/ScheduleApprovalDetail';

export default function ScheduleApprovalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <ScheduleApprovalDetailView scheduleId={resolvedParams.id} />;
}
