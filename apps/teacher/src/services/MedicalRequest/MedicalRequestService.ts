import { apiClient, SERVER } from '@kindercare/core';
import { useAuth } from '@/contexts/AuthContext';

export type MedicationRequestStatus = 'Pending' | 'Done' | 'Skipped' | 'Completed' | 'Rejected';

export interface MedicalRequest {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  requestDate: number; // Unix timestamp
  scheduledDate?: number; // Unix timestamp
  medicineDetails: string;
  dosage: string;
  frequency?: string;
  timeToTake?: string;
  parentNote?: string;
  medicineImageUrl?: string;
  status: MedicationRequestStatus;
  teacherNote?: string;
  administeredAt?: number;
  administeredBy?: number;
  updatedTime?: number; // Unix timestamp
  studentAvatar?: string;
  classId?: number;
}

function normalizePhotoUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://web-test.kindercare.app/api/v1';
  const host = apiBase.split('/api')[0];
  return `${host}/${url.replace(/^\//, '')}`;
}

function mapApiMedicalRequestToDomain(raw: any): MedicalRequest {
  return {
    id: String(raw.requestId ?? raw.medRequestId),
    studentId: String(raw.studentId),
    studentName: raw.studentName,
    parentName: raw.parentName || 'Phụ huynh',
    requestDate: raw.requestDate,
    scheduledDate: raw.scheduledDate || undefined,
    medicineDetails: raw.medicineDetails,
    dosage: raw.dosage,
    frequency: raw.frequency,
    timeToTake: raw.timeToTake,
    parentNote: raw.parentNote,
    medicineImageUrl: normalizePhotoUrl(raw.medicineImageURL),
    status: raw.status || 'Pending',
    teacherNote: raw.teacherNote,
    administeredAt: raw.administeredAt || undefined,
    administeredBy: raw.administeredBy || undefined,
    updatedTime: raw.updatedTime,
    studentAvatar: normalizePhotoUrl(raw.studentAvatar),
    classId: raw.classId ? Number(raw.classId) : undefined,
  };
}

export class MedicalRequestService {
  /**
   * Fetch medical requests for a specific class.
   * @param classId - Class ID
   * @param timestamp - Optional Unix timestamp to filter by ScheduledDate (date only, time stripped)
   */
  public static async getClassMedicalRequests(
    classId: number | string,
    timestamp?: number
  ): Promise<MedicalRequest[]> {
    const params: Record<string, string> = {};
    // If timestamp provided, strip time portion → filter by day
    if (timestamp) {
      params.date = String(Math.floor(timestamp / 86400000) * 86400000);
    }

    const url = SERVER.teacher.getMedicalRequests.replace(':classId', String(classId));
    const res = await apiClient.get(url, { params });
    const list = res.data?.data || [];
    return list.map(mapApiMedicalRequestToDomain);
  }

  /**
   * Process (Done/Skipped/Rejected) a medical request.
   * - When marking as Done → AdministeredBy + AdministeredAt auto-set by BE from auth token.
   * - Only Pending requests should be transitioned.
   *
   * @param requestId - Medical request ID
   * @param status - New status: 'Done' | 'Skipped' | 'Rejected'
   * @param teacherNote - Optional teacher note
   */
  public static async processMedicalRequest(
    requestId: string,
    status: MedicationRequestStatus,
    teacherNote?: string
  ): Promise<boolean> {
    const body: Record<string, string> = { status };
    if (teacherNote !== undefined) body.teacherNote = teacherNote;

    await apiClient.put(SERVER.teacher.updateMedicalRequest.replace(':requestId', String(requestId)), body);
    return true;
  }
}
