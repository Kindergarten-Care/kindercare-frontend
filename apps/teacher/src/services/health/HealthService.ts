import { apiClient, ApiResponse } from '@kindercare/core';
import type {
  AllergyApiDto,
  AllergyDomainModel,
  MedicationApiDto,
  MedicationDomainModel,
  HealthLogApiDto,
  HealthLogDomainModel,
  SubmitHealthMeasurementPayload,
} from '@/config/types/health';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fixImageUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://web-test.kindercare.app/api/v1';
  const host = apiBase.split('/api')[0];
  return `${host}/${url.replace(/^\//, '')}`;
}

function mapAllergy(raw: AllergyApiDto): AllergyDomainModel {
  return { ...raw };
}

function mapMedication(raw: MedicationApiDto): MedicationDomainModel {
  return {
    medRequestId: raw.medRequestId,
    studentId: raw.studentId,
    studentName: raw.studentName,
    parentName: raw.parentName || 'Phụ huynh',
    requestDate: raw.requestDate,
    medicineDetails: raw.medicineDetails,
    dosage: raw.dosage,
    frequency: raw.frequency,
    timeToTake: raw.timeToTake,
    parentNote: raw.parentNote,
    medicineImageUrl: fixImageUrl(raw.medicineImageURL),
    status: raw.status || 'Pending',
    teacherNote: raw.teacherNote,
    updatedTime: raw.updatedTime,
    studentAvatar: fixImageUrl(raw.studentAvatar),
  };
}

function mapHealthLog(raw: HealthLogApiDto): HealthLogDomainModel {
  return { ...raw };
}

// ─── Service ──────────────────────────────────────────────────────────────────

export class HealthService {
  // GET /teacher/classes/:classId/student-health/allergies
  // Returns all allergies for students in the class (optional ?studentId= filter)
  async getAllergies(classId: number | string, studentId?: number | string): Promise<AllergyDomainModel[]> {
    const url = `/teacher/classes/${classId}/student-health/allergies`;
    const params = studentId ? { studentId: String(studentId) } : undefined;
    const res = await apiClient.get<ApiResponse<{ allergies: AllergyApiDto[] }>>(url, { params });
    const raw = res.data.data?.allergies || res.data.data || [];
    return (Array.isArray(raw) ? raw : []).map(mapAllergy);
  }

  // POST /teacher/classes/:classId/student-health/allergies
  async createAllergy(classId: number | string, studentId: number | string, payload: {
    allergen: string;
    severity: string;
    symptoms?: string;
    notes?: string;
  }): Promise<AllergyDomainModel> {
    const url = `/teacher/classes/${classId}/student-health/allergies`;
    const res = await apiClient.post<ApiResponse<{ allergy: AllergyApiDto }>>(url, { ...payload, studentId });
    return mapAllergy(res.data.data?.allergy ?? res.data.data);
  }

  // PATCH /teacher/classes/:classId/student-health/allergies/item/:allergyId
  async updateAllergy(classId: number | string, allergyId: number, payload: {
    allergen?: string;
    severity?: string;
    symptoms?: string;
    notes?: string;
  }): Promise<void> {
    const url = `/teacher/classes/${classId}/student-health/allergies/item/${allergyId}`;
    await apiClient.patch(url, payload);
  }

  // DELETE /teacher/classes/:classId/student-health/allergies/item/:allergyId
  async deleteAllergy(classId: number | string, allergyId: number): Promise<void> {
    const url = `/teacher/classes/${classId}/student-health/allergies/item/${allergyId}`;
    await apiClient.delete(url);
  }

  // GET /teacher/classes/:classId/student-health/medications
  async getMedicalRequests(classId: number | string, timestamp?: number): Promise<MedicationDomainModel[]> {
    const params: Record<string, string> = {};
    if (timestamp) params.date = String(timestamp);
    // Backend uses /medical-requests instead of /student-health/medications
    const url = `/teacher/classes/${classId}/medical-requests`;
    const res = await apiClient.get<ApiResponse<{ medications: MedicationApiDto[] }>>(url, { params });
    const raw = res.data.data?.medications || res.data.data || [];
    return (Array.isArray(raw) ? raw : []).map(mapMedication);
  }

  // PATCH /teacher/classes/:classId/student-health/medications/item/:medicationId/status
  async updateMedicationStatus(classId: number | string, medicationId: number, status: string, teacherNote?: string): Promise<void> {
    const url = `/teacher/classes/${classId}/student-health/medications/item/${medicationId}/status`;
    await apiClient.patch(url, { status, teacherNote });
  }

  // POST /teacher/classes/:classId/student-health/medications
  async createMedication(classId: number | string, studentId: number | string, payload: {
    medicineName: string;
    dosage: string;
    scheduledDate?: number;
    scheduledTime?: string;
    frequency?: string;
    notes?: string;
  }): Promise<MedicationDomainModel> {
    const url = `/teacher/classes/${classId}/student-health/medications`;
    const res = await apiClient.post<ApiResponse<{ medication: MedicationApiDto }>>(url, { ...payload, studentId });
    return mapMedication(res.data.data?.medication ?? res.data.data);
  }

  // DELETE /teacher/classes/:classId/student-health/medications/item/:medicationId
  async deleteMedication(classId: number | string, medicationId: number): Promise<void> {
    const url = `/teacher/classes/${classId}/student-health/medications/item/${medicationId}`;
    await apiClient.delete(url);
  }

  // GET /teacher/classes/:classId/student-health/logs
  async getHealthLogs(classId: number | string, termPeriod?: string): Promise<HealthLogDomainModel[]> {
    const params: Record<string, string> = {};
    if (termPeriod) params.termPeriod = termPeriod;
    const url = `/teacher/classes/${classId}/student-health/logs`;
    const res = await apiClient.get<ApiResponse<{ logs: HealthLogApiDto[] }>>(url, { params });
    const raw = res.data.data?.logs || res.data.data || [];
    return (Array.isArray(raw) ? raw : []).map(mapHealthLog);
  }

  // POST /teacher/classes/:classId/student-health/logs (batch)
  async batchUpdateHealthLogs(classId: number | string, records: Array<{
    studentId: number;
    height?: number;
    weight?: number;
    note?: string;
  }>, termPeriod?: string): Promise<void> {
    const url = `/teacher/classes/${classId}/student-health/logs`;
    await apiClient.put(url, { records, termPeriod });
  }

  // POST /teacher/classes/:classId/student-health/logs (single)
  async createHealthLog(classId: number | string, studentId: number | string, payload: Omit<SubmitHealthMeasurementPayload, 'bmi'>, termPeriod?: string): Promise<HealthLogDomainModel> {
    const url = `/teacher/classes/${classId}/student-health/logs`;
    const body = { ...payload, studentId, ...(termPeriod && { termPeriod }) };
    const res = await apiClient.post<ApiResponse<{ log: HealthLogApiDto }>>(url, body);
    return mapHealthLog(res.data.data?.log ?? res.data.data);
  }

  // PATCH /teacher/classes/:classId/student-health/logs/item/:logId
  async updateHealthLog(classId: number | string, logId: number, payload: {
    height?: number;
    weight?: number;
    notes?: string;
  }): Promise<void> {
    const url = `/teacher/classes/${classId}/student-health/logs/item/${logId}`;
    await apiClient.patch(url, payload);
  }

  // DELETE /teacher/classes/:classId/student-health/logs/item/:logId
  async deleteHealthLog(classId: number | string, logId: number): Promise<void> {
    const url = `/teacher/classes/${classId}/student-health/logs/item/${logId}`;
    await apiClient.delete(url);
  }

  // GET /teacher/classes/:classId/student-health/assessments
  async getDevelopmentAssessments(classId: number | string, termPeriod?: string): Promise<any[]> {
    const params: Record<string, string> = {};
    if (termPeriod) params.termPeriod = termPeriod;
    const url = `/teacher/classes/${classId}/student-health/assessments`;
    const res = await apiClient.get<ApiResponse<{ assessments: any[] }>>(url, { params });
    return res.data.data?.assessments || res.data.data || [];
  }

  // PUT /teacher/classes/:classId/student-health/assessments
  async upsertDevelopmentAssessments(classId: number | string, items: any[], termPeriod?: string): Promise<void> {
    const url = `/teacher/classes/${classId}/student-health/assessments`;
    await apiClient.put(url, { items, termPeriod });
  }
}

export const healthService = new HealthService();
