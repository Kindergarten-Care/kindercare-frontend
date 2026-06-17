import { AttendanceView } from '@/views/Attendance';
import { DashboardLayout } from '@/layout/DashboardLayout';

export default function AttendancePage() {
  return (
    <DashboardLayout>
      <AttendanceView />
    </DashboardLayout>
  );
}
