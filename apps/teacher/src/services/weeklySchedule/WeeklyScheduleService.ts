import { apiClient } from '@kindercare/core';
import type {
  MonthlySchedule,
  MonthlyScheduleResponse,
  WeeklySchedule,
  WeekInMonth,
  CSVPreviewResult,
  CSVImportResult,
  WeeklyScheduleDetail,
} from '@/config/types/weeklySchedule';

export interface SaveWeekPayload {
  monthlyScheduleId: number;
  weekOrder: number;
  weekTheme: string;
  items: Omit<WeeklyScheduleDetail, 'scheduleDetailId' | 'weeklyScheduleId'>[];
}

/**
 * GET /teacher/classes/:classId/monthly-schedule/:year/:month
 * Returns { monthlySchedule, weeks, weeksInMonth }
 */
export const getMonthlySchedule = async (
  classId: number,
  year: number,
  month: number
): Promise<MonthlyScheduleResponse> => {
  const response = await apiClient.get(
    `/teacher/classes/${classId}/monthly-schedule/${year}/${month}`
  );
  return response.data.data ?? { monthlySchedule: null, weeks: [], weeksInMonth: [] };
};

/**
 * POST /teacher/classes/:classId/monthly-schedule
 */
export const upsertMonthlySchedule = async (
  classId: number,
  payload: { month: number; year: number; monthTheme: string }
): Promise<{ monthlyScheduleId: number; action: 'Created' | 'Updated' }> => {
  const response = await apiClient.post(`/teacher/classes/${classId}/monthly-schedule`, payload);
  return response.data.data;
};

/**
 * GET /teacher/classes/:classId/monthly-schedule/weeks/:year/:month
 */
export const getWeeksInMonth = async (
  classId: number,
  year: number,
  month: number
): Promise<WeekInMonth[]> => {
  const response = await apiClient.get(
    `/teacher/classes/${classId}/monthly-schedule/weeks/${year}/${month}`
  );
  return response.data.data ?? [];
};

/**
 * GET /teacher/classes/:classId/weekly-schedule/:wsId
 */
export const getWeeklyScheduleById = async (
  classId: number,
  wsId: number
): Promise<WeeklySchedule | null> => {
  const response = await apiClient.get(`/teacher/classes/${classId}/weekly-schedule/${wsId}`);
  return response.data.data ?? null;
};

/**
 * POST /teacher/classes/:classId/weekly-schedule
 * Save (upsert) WeeklySchedule + replace WeeklyScheduleDetails.
 */
export const saveWeeklySchedule = async (
  classId: number,
  data: SaveWeekPayload
): Promise<{ weeklyScheduleId: number; action: string }> => {
  const response = await apiClient.post(`/teacher/classes/${classId}/weekly-schedule`, data);
  return response.data.data;
};

/**
 * DELETE /teacher/classes/:classId/weekly-schedule/:wsId
 */
export const deleteWeeklySchedule = async (
  classId: number,
  wsId: number
): Promise<{ success: boolean }> => {
  const response = await apiClient.delete(`/teacher/classes/${classId}/weekly-schedule/${wsId}`);
  return response.data.data;
};

/**
 * POST /teacher/classes/:classId/weekly-schedule/preview-csv (multipart)
 */
export const previewCSV = async (classId: number, file: File): Promise<CSVPreviewResult> => {
  const form = new FormData();
  form.append('file', file);
  const response = await apiClient.post(`/teacher/classes/${classId}/weekly-schedule/preview-csv`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

/**
 * POST /teacher/classes/:classId/weekly-schedule/import-csv (multipart)
 */
export const importCSV = async (
  classId: number,
  monthlyScheduleId: number,
  file: File
): Promise<CSVImportResult> => {
  const form = new FormData();
  form.append('file', file);
  form.append('monthlyScheduleId', String(monthlyScheduleId));
  const response = await apiClient.post(`/teacher/classes/${classId}/weekly-schedule/import-csv`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};