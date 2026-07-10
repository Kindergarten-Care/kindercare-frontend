import { apiClient } from '@kindercare/core';

export interface MedicalRequest {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  requestDate: number; // Unix timestamp
  medicineDetails: string;
  dosage: string;
  frequency?: string;
  timeToTake?: string;
  parentNote?: string;
  medicineImageUrl?: string;
  status: 'Pending' | 'Completed' | 'Rejected';
  teacherNote?: string;
  updatedTime?: number; // Unix timestamp
  studentAvatar?: string;
}

function mapApiMedicalRequestToDomain(raw: any): MedicalRequest {
  let attachmentUrl = raw.medicineImageURL || undefined;
  if (attachmentUrl && !attachmentUrl.startsWith('http') && !attachmentUrl.startsWith('data:')) {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://web-test.kindercare.app/api/v1';
    const host = apiBase.split('/api')[0];
    attachmentUrl = `${host}/${attachmentUrl.replace(/^\//, '')}`;
  }

  return {
    id: String(raw.medRequestId),
    studentId: String(raw.studentId),
    studentName: raw.studentName,
    parentName: raw.parentName || 'Phụ huynh',
    requestDate: raw.requestDate,
    medicineDetails: raw.medicineDetails,
    dosage: raw.dosage,
    frequency: raw.frequency,
    timeToTake: raw.timeToTake,
    parentNote: raw.parentNote,
    medicineImageUrl: attachmentUrl,
    status: raw.status || 'Pending',
    teacherNote: raw.teacherNote,
    updatedTime: raw.updatedTime,
    studentAvatar: raw.studentAvatar,
  };
}

export class MedicalRequestService {
  /**
   * Fetch all medical requests for a specific class.
   */
  public static async getClassMedicalRequests(classId: number | string, timestamp?: number): Promise<MedicalRequest[]> {
    const params: any = {};
    if (timestamp) params.date = timestamp;

    const res = await apiClient.get(`/teacher/classes/${classId}/medical-requests`, { params });
    const list = res.data?.data || [];
    return list.map(mapApiMedicalRequestToDomain);
  }

  /**
   * Process (approve/complete/reject) a student's medical request.
   */
  public static async processMedicalRequest(requestId: string, status: string, teacherNote?: string): Promise<boolean> {
    await apiClient.put(`/teacher/medical-requests/${requestId}`, {
      status,
      teacherNote
    });
    return true;
  }
}
