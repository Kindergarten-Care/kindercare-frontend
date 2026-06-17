export type AttendanceStatus = 'PRESENT' | 'PERMISSION_ABSENCE' | 'UNEXCUSED_ABSENCE';

export interface Student {
  id: string;
  name: string;
  avatar?: string;
  attendanceStatus: AttendanceStatus;
  arrivalTime: string; // e.g. "07:45" or "--:--"
  healthNote: string;
  hasActiveLeaveRequest: boolean;
  leaveRequestId?: string;
}

export type LeaveRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  relationship: string; // e.g. "Mẹ", "Bố"
  reason: string;
  attachmentUrl?: string;
  status: LeaveRequestStatus;
}
