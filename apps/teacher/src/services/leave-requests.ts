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
   * @param status - Optional filter: 'Pending', 'Approved', 'Rejected'
   */
  public static async getAllLeaveRequests(status?: string): Promise<LeaveRequest[]> {
    const params: Record<string, string> = {};
    if (status) {
      params.status = status;
    }
    const res = await apiClient.get('/teacher/leave-requests', { params });
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
   * @param status - Either 'Approved'/'Rejected' or 'APPROVED'/'REJECTED'
   */
  public static async processLeaveRequest(requestId: string, status: string): Promise<boolean> {
    // Normalize status to backend format (Backend expects 'Approved' or 'Rejected')
    let dbStatus = 'Pending';
    const upperStatus = status.toUpperCase();
    if (upperStatus === 'APPROVED' || upperStatus === 'APPROVE') dbStatus = 'Approved';
    if (upperStatus === 'REJECTED' || upperStatus === 'REJECT') dbStatus = 'Rejected';

    await apiClient.put(`/teacher/leave-requests/${requestId}/status`, {
      status: dbStatus
    });
    return true;
  }
}
