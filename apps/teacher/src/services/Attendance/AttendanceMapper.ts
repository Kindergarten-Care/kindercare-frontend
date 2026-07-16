import { Student, LeaveRequestStatus, AttendanceStatus } from '@/config/types/attendance';
import { fixImageUrl } from '@/utils/imageUrl';

export function formatTimestampToTimeStr(timestamp: number | null): string {
  if (!timestamp) return '--:--';
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export class AttendanceMapper {
  static toDomain(raw: any): Student {
    let domainStatus: AttendanceStatus = 'PRESENT';
    const statusStr = typeof raw.status === 'string' ? raw.status.trim().toLowerCase() : '';

    if (statusStr === 'present' || statusStr === 'có mặt') {
      domainStatus = 'PRESENT';
    } else if (statusStr === 'excused' || statusStr === 'vắng có phép' || statusStr === 'phép' || statusStr === 'vắng phép') {
      domainStatus = 'PERMISSION_ABSENCE';
    } else if (statusStr === 'absent' || statusStr === 'vắng' || statusStr === 'vắng không phép' || statusStr === 'không phép') {
      domainStatus = 'UNEXCUSED_ABSENCE';
    } else if (!raw.status) {
      domainStatus = 'NOT_YET';
    }

    let leaveReqStatus: LeaveRequestStatus | undefined = undefined;
    const leaveStatusLower = typeof raw.leaveRequest?.status === 'string' ? raw.leaveRequest.status.trim().toLowerCase() : '';
    if (leaveStatusLower === 'pending') leaveReqStatus = 'PENDING';
    if (leaveStatusLower === 'approved') leaveReqStatus = 'APPROVED';
    if (leaveStatusLower === 'rejected') leaveReqStatus = 'REJECTED';

    if (statusStr !== 'present' && statusStr !== 'có mặt') {
      if (leaveReqStatus === 'APPROVED') {
        domainStatus = 'PERMISSION_ABSENCE';
      } else if (leaveReqStatus === 'REJECTED') {
        domainStatus = 'UNEXCUSED_ABSENCE';
      }
    }

    return {
      id: String(raw.studentId),
      name: raw.fullName,
      avatar: fixImageUrl(raw.avatarUrl) || 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=80&auto=format&fit=crop&q=60',
      attendanceStatus: domainStatus,
      arrivalTime: formatTimestampToTimeStr(raw.checkInTime),
      healthNote: raw.healthNote || '',
      eatingStatus: raw.eatingStatus,
      sleepingStatus: raw.sleepingStatus,
      hygieneStatus: raw.hygieneStatus,
      teacherNote: raw.teacherNote,
      hasActiveLeaveRequest: leaveStatusLower === 'pending',
      leaveRequestId: raw.leaveRequest ? String(raw.leaveRequest.requestId) : undefined,
      leaveRequestStatus: leaveReqStatus,
      leaveRequestReason: raw.leaveRequest?.reason || undefined,
      dropoffImage: raw.dropoffImage,
      pickupImage: raw.pickupImage,
    };
  }

  static toDomainList(rawList: any[]): Student[] {
    return rawList.map(this.toDomain);
  }
}
