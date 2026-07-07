import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import type {
  AllergyDomainModel,
  AllergyListResponse,
  AllergySingleResponse,
  CreateAllergyPayload,
  CreateHealthLogPayload,
  CreateMedicationPayload,
  HealthLogDomainModel,
  HealthLogListResponse,
  HealthLogSingleResponse,
  MedicationDomainModel,
  MedicationListResponse,
  MedicationSingleResponse,
  MedicationStatus,
  UpdateAllergyPayload,
  UpdateHealthLogPayload,
  UpdateMedicationStatusPayload,
} from '@/config/types/studentHealth';
import { StudentHealthMapper } from './StudentHealthMapper';

const ensureSuccess = (res: { data?: ApiResponse<unknown> }, fallback: string): void => {
  if (!res.data?.success) {
    const message = res.data?.message || fallback;
    throw new Error(message);
  }
};

const replacePathParams = (path: string, replacements: Record<string, string | number>): string => {
  let result = path;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(`:${key}`, encodeURIComponent(String(value)));
  }
  return result;
};

class StudentHealthService {
  // Allergies ----------------------------------------------------------------

  async listAllergies(
    classId: number | string,
    studentId: number | string
  ): Promise<AllergyDomainModel[]> {
    const endpoint = replacePathParams(SERVER.teacher.listAllergies, {
      classId,
      studentId,
    });
    const res = await apiClient.get<ApiResponse<AllergyListResponse>>(endpoint);
    ensureSuccess(res as { data?: ApiResponse<unknown> }, 'Failed to fetch allergies');
    return StudentHealthMapper.toAllergyList(res.data?.data?.allergies ?? []);
  }

  async createAllergy(
    classId: number | string,
    studentId: number | string,
    payload: CreateAllergyPayload
  ): Promise<AllergyDomainModel> {
    const endpoint = replacePathParams(SERVER.teacher.createAllergy, {
      classId,
      studentId,
    });
    const res = await apiClient.post<ApiResponse<AllergySingleResponse>>(endpoint, payload);
    ensureSuccess(res as { data?: ApiResponse<unknown> }, 'Failed to create allergy');
    const allergy = res.data?.data?.allergy;
    if (!allergy) throw new Error('Empty response from server');
    return StudentHealthMapper.toAllergy(allergy);
  }

  async updateAllergy(
    classId: number | string,
    allergyId: number,
    payload: UpdateAllergyPayload
  ): Promise<AllergyDomainModel> {
    const endpoint = replacePathParams(SERVER.teacher.updateAllergy, {
      classId,
      allergyId,
    });
    const res = await apiClient.put<ApiResponse<AllergySingleResponse>>(endpoint, payload);
    ensureSuccess(res as { data?: ApiResponse<unknown> }, 'Failed to update allergy');
    const allergy = res.data?.data?.allergy;
    if (!allergy) throw new Error('Empty response from server');
    return StudentHealthMapper.toAllergy(allergy);
  }

  async deleteAllergy(classId: number | string, allergyId: number): Promise<void> {
    const endpoint = replacePathParams(SERVER.teacher.deleteAllergy, {
      classId,
      allergyId,
    });
    const res = await apiClient.delete<ApiResponse<unknown>>(endpoint);
    ensureSuccess(res as { data?: ApiResponse<unknown> }, 'Failed to delete allergy');
  }

  // Medications --------------------------------------------------------------

  async listMedications(
    classId: number | string,
    studentId: number | string,
    status?: MedicationStatus
  ): Promise<MedicationDomainModel[]> {
    const endpoint = replacePathParams(SERVER.teacher.listMedications, {
      classId,
      studentId,
    });
    const res = await apiClient.get<ApiResponse<MedicationListResponse>>(endpoint, {
      params: status ? { status } : undefined,
    });
    ensureSuccess(res as { data?: ApiResponse<unknown> }, 'Failed to fetch medications');
    return StudentHealthMapper.toMedicationList(res.data?.data?.medications ?? []);
  }

  async createMedication(
    classId: number | string,
    studentId: number | string,
    payload: CreateMedicationPayload
  ): Promise<MedicationDomainModel> {
    const endpoint = replacePathParams(SERVER.teacher.createMedication, {
      classId,
      studentId,
    });
    const res = await apiClient.post<ApiResponse<MedicationSingleResponse>>(endpoint, payload);
    ensureSuccess(res as { data?: ApiResponse<unknown> }, 'Failed to create medication');
    const medication = res.data?.data?.medication;
    if (!medication) throw new Error('Empty response from server');
    return StudentHealthMapper.toMedication(medication);
  }

  async updateMedicationStatus(
    classId: number | string,
    medicationId: number,
    payload: UpdateMedicationStatusPayload
  ): Promise<MedicationDomainModel> {
    const endpoint = replacePathParams(SERVER.teacher.updateMedicationStatus, {
      classId,
      medicationId,
    });
    const res = await apiClient.patch<ApiResponse<MedicationSingleResponse>>(endpoint, payload);
    ensureSuccess(res as { data?: ApiResponse<unknown> }, 'Failed to update medication');
    const medication = res.data?.data?.medication;
    if (!medication) throw new Error('Empty response from server');
    return StudentHealthMapper.toMedication(medication);
  }

  async deleteMedication(classId: number | string, medicationId: number): Promise<void> {
    const endpoint = replacePathParams(SERVER.teacher.deleteMedication, {
      classId,
      medicationId,
    });
    const res = await apiClient.delete<ApiResponse<unknown>>(endpoint);
    ensureSuccess(res as { data?: ApiResponse<unknown> }, 'Failed to delete medication');
  }

  // Health logs --------------------------------------------------------------

  async listHealthLogs(
    classId: number | string,
    studentId: number | string,
    date?: string
  ): Promise<HealthLogDomainModel[]> {
    const endpoint = replacePathParams(SERVER.teacher.listHealthLogs, {
      classId,
      studentId,
    });
    const res = await apiClient.get<ApiResponse<HealthLogListResponse>>(endpoint, {
      params: date ? { date } : undefined,
    });
    ensureSuccess(res as { data?: ApiResponse<unknown> }, 'Failed to fetch health logs');
    return StudentHealthMapper.toHealthLogList(res.data?.data?.logs ?? []);
  }

  async createHealthLog(
    classId: number | string,
    studentId: number | string,
    payload: CreateHealthLogPayload
  ): Promise<HealthLogDomainModel> {
    const endpoint = replacePathParams(SERVER.teacher.createHealthLog, {
      classId,
      studentId,
    });
    const res = await apiClient.post<ApiResponse<HealthLogSingleResponse>>(endpoint, payload);
    ensureSuccess(res as { data?: ApiResponse<unknown> }, 'Failed to create health log');
    const log = res.data?.data?.log;
    if (!log) throw new Error('Empty response from server');
    return StudentHealthMapper.toHealthLog(log);
  }

  async updateHealthLog(
    classId: number | string,
    logId: number,
    payload: UpdateHealthLogPayload
  ): Promise<HealthLogDomainModel> {
    const endpoint = replacePathParams(SERVER.teacher.updateHealthLog, {
      classId,
      logId,
    });
    const res = await apiClient.patch<ApiResponse<HealthLogSingleResponse>>(endpoint, payload);
    ensureSuccess(res as { data?: ApiResponse<unknown> }, 'Failed to update health log');
    const log = res.data?.data?.log;
    if (!log) throw new Error('Empty response from server');
    return StudentHealthMapper.toHealthLog(log);
  }

  async deleteHealthLog(classId: number | string, logId: number): Promise<void> {
    const endpoint = replacePathParams(SERVER.teacher.deleteHealthLog, {
      classId,
      logId,
    });
    const res = await apiClient.delete<ApiResponse<unknown>>(endpoint);
    ensureSuccess(res as { data?: ApiResponse<unknown> }, 'Failed to delete health log');
  }
}

export const studentHealthService = new StudentHealthService();