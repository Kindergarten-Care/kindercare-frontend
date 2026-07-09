import { apiClient } from '@kindercare/core';
import { LeaveRequest, LeaveRequestStatus } from '@/config/types/attendance';

export function mapApiLeaveRequestToDomain(raw: any): LeaveRequest {
  let domainStatus: LeaveRequestStatus = 'PENDING';
  if (raw.status === 'Approved') domainStatus = 'APPROVED';
  if (raw.status === 'Rejected') domainStatus = 'REJECTED';

  let attachmentUrl = raw.evidenceUrl || undefined;
  if (attachmentUrl && !attachmentUrl.startsWith('http') && !attachmentUrl.startsWith('data:')) {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://web-test.kindercare.app/api/v1';
    const host = apiBase.split('/api')[0];
    attachmentUrl = `${host}/${attachmentUrl.replace(/^\//, '')}`;
  }

  return {
    id: String(raw.requestId),
    studentId: String(raw.studentId),
    studentName: raw.studentName,
    parentName: raw.parentName || 'Phụ huynh',
    relationship: 'Phụ huynh',
    reason: raw.reason,
    attachmentUrl,
    status: domainStatus,
    classId: raw.classId ? Number(raw.classId) : undefined,
    fromDate: raw.fromDate,
    toDate: raw.toDate,
    parentPhone: raw.parentPhone || undefined,
    isMealFeeDeducted: raw.isMealFeeDeducted,
    parentNotes: raw.parentNotes,
    createdAt: raw.createdAt || undefined,
    className: raw.className || undefined,
    studentAvatar: raw.studentAvatar || undefined,
  };
}

export class LeaveRequestService {
  /**
   * Fetch all leave requests for the logged-in teacher.
   */
  public static async getAllLeaveRequests(): Promise<LeaveRequest[]> {
    const res = await apiClient.get('/teacher/leave-requests');
    const list = res.data?.data || [];
    return list.map(mapApiLeaveRequestToDomain);
  }

  /**
   * Fetch details for a specific leave request.
   */
  public static async getLeaveRequestDetail(requestId: string): Promise<LeaveRequest | null> {
    const res = await apiClient.get(`/teacher/leave-requests/${requestId}`);
    const data = res.data?.data;
    if (!data) return null;
    return mapApiLeaveRequestToDomain(data);
  }

  /**
   * Process (approve/reject) a student's leave request.
   */
  public static async processLeaveRequest(requestId: string, status: LeaveRequestStatus): Promise<boolean> {
    let dbStatus = 'Pending';
    if (status === 'APPROVED') dbStatus = 'Approved';
    if (status === 'REJECTED') dbStatus = 'Rejected';

    await apiClient.put(`/teacher/leave-requests/${requestId}/status`, {
      status: dbStatus
    });
    return true;
  }
}
