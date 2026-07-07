import { apiClient } from '@kindercare/core';
import type {
  WeeklyScheduleTemplate,
  WeeklyScheduleItem,
  WeeklyScheduleStatus,
} from '@/config/types/weeklySchedule';

export interface CSVPreviewResult {
  totalRows: number;
  weeks: {
    weekNumber: number;
    itemCount: number;
    items: WeeklyScheduleItem[];
  }[];
  sampleRows: WeeklyScheduleItem[];
  invalidDays?: { row: number; day: string; week: string }[] | null;
  validDaysOnly?: boolean;
  existingWeeks?: {
    templateId: number;
    weekNumber: number;
    status: string;
    hasPendingChangeRequest: boolean;
  }[];
  importAllowed?: boolean;
  blockedReason?: string | null;
}

// Helper: convert PascalCase from MySQL to camelCase for frontend
function toCamelCase<T extends Record<string, any>>(obj: T): any {
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCase(item));
  }
  if (obj === null || obj === undefined) {
    return obj;
  }
  const result: Record<string, any> = {};
  for (const key of Object.keys(obj)) {
    // Convert PascalCase to camelCase
    let camelKey = key.charAt(0).toLowerCase() + key.slice(1);
    // Fix common MySQL naming: ItemID -> itemId, TemplateID -> templateId, etc.
    camelKey = camelKey.replace(/ID$/, 'Id');
    camelKey = camelKey.replace(/IdS$/, 'Ids'); // IDs -> Ids
    const value = obj[key];
    result[camelKey] = (value !== null && typeof value === 'object') ? toCamelCase(value) : value;
  }
  return result;
}

export interface ImportResult {
  success: number;
  failed: number;
  skipped?: number;
  errors: string[];
  templateIds: number[];
  skippedWeeks?: {
    weekNumber: number;
    templateId: number;
    status: string;
    hasPendingChangeRequest: boolean;
    reason: string;
  }[];
}

export interface SaveTemplatePayload {
  yearId: number;
  month: number;
  year: number;
  weekNumber: number;
  weekTheme?: string;
  weekStartDate?: string;
  weekEndDate?: string;
  items?: WeeklyScheduleItem[];
}

/**
 * Get weekly schedule templates for a class and month
 */
export const getWeeklyScheduleTemplates = async (
  classId: number,
  year: number,
  month: number
): Promise<WeeklyScheduleTemplate[]> => {
  const response = await apiClient.get(
    `/teacher/classes/${classId}/weekly-schedule/${year}/${month}`
  );
  return toCamelCase(response.data.data);
};

/**
 * Get single template by ID
 */
export const getTemplateById = async (
  classId: number,
  templateId: number
): Promise<WeeklyScheduleTemplate> => {
  const response = await apiClient.get(
    `/teacher/classes/${classId}/weekly-schedule/template/${templateId}`
  );
  return toCamelCase(response.data.data);
};

/**
 * Save (create or update) weekly schedule template
 */
export const saveWeeklyTemplate = async (
  classId: number,
  data: SaveTemplatePayload
): Promise<{ templateId: number; action: string }> => {
  const response = await apiClient.post(
    `/teacher/classes/${classId}/weekly-schedule/template`,
    data
  );
  return response.data.data;
};

/**
 * Preview CSV file before import
 */
export const previewCSV = async (
  classId: number,
  file: File,
  ctx?: { yearId: number; month: number; year: number }
): Promise<CSVPreviewResult> => {
  const formData = new FormData();
  formData.append('file', file);
  if (ctx) {
    formData.append('yearId', String(ctx.yearId));
    formData.append('month', String(ctx.month));
    formData.append('year', String(ctx.year));
  }

  const response = await apiClient.post(
    `/teacher/classes/${classId}/weekly-schedule/preview-csv`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return toCamelCase(response.data.data);
};

/**
 * Import weekly schedules from CSV file
 */
export const importFromCSV = async (
  classId: number,
  yearId: number,
  month: number,
  year: number,
  file: File
): Promise<ImportResult> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('yearId', String(yearId));
  formData.append('month', String(month));
  formData.append('year', String(year));

  const response = await apiClient.post(
    `/teacher/classes/${classId}/weekly-schedule/import`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return toCamelCase(response.data.data);
};

/**
 * Submit template for approval
 */
export const submitForApproval = async (
  classId: number,
  templateId: number
): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.post(
    `/teacher/classes/${classId}/weekly-schedule/template/${templateId}/submit`
  );
  return response.data.data;
};

/**
 * Withdraw submitted template
 */
export const withdrawTemplate = async (
  classId: number,
  templateId: number
): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.post(
    `/teacher/classes/${classId}/weekly-schedule/template/${templateId}/withdraw`
  );
  return response.data.data;
};

/**
 * Capture a snapshot of the live template items so we can later restore
 * the original schedule if the teacher withdraws a change request.
 */
export const snapshotTemplateItems = async (
  classId: number,
  templateId: number,
  reason: string
): Promise<{ snapshotId: number; itemCount: number }> => {
  const response = await apiClient.post(
    `/teacher/classes/${classId}/weekly-schedule/template/${templateId}/snapshot`,
    { reason }
  );
  return response.data.data;
};

/**
 * Submit a change request against an already approved template.
 */
export const submitChangeRequest = async (
  classId: number,
  templateId: number,
  reason: string
): Promise<{ success: boolean; message: string; templateId: number; reason: string }> => {
  const response = await apiClient.post(
    `/teacher/classes/${classId}/weekly-schedule/template/${templateId}/submit-change`,
    { reason }
  );
  return response.data.data;
};

/**
 * Withdraw a pending change request, optionally restoring the original items.
 */
export const withdrawChangeRequest = async (
  classId: number,
  templateId: number,
  restoreOriginal: boolean
): Promise<{ success: boolean; message: string; templateId: number; restored: boolean; itemCount: number }> => {
  const response = await apiClient.post(
    `/teacher/classes/${classId}/weekly-schedule/template/${templateId}/withdraw-change`,
    { restoreOriginal }
  );
  return response.data.data;
};

/**
 * Delete template
 */
export const deleteTemplate = async (
  classId: number,
  templateId: number
): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.delete(
    `/teacher/classes/${classId}/weekly-schedule/template/${templateId}`
  );
  return response.data.data;
};

/**
 * Copy items from one week to another
 */
export const copyWeekItems = async (
  classId: number,
  fromTemplateId: number,
  toWeekNumber: number
): Promise<{ success: boolean; message: string; targetTemplateId: number }> => {
  const response = await apiClient.post(
    `/teacher/classes/${classId}/weekly-schedule/template/${fromTemplateId}/copy-week`,
    { toWeekNumber }
  );
  return response.data.data;
};

/**
 * Copy items from one day to another within the same template
 */
export const copyDayItems = async (
  classId: number,
  templateId: number,
  fromDay: string,
  toDay: string
): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.post(
    `/teacher/classes/${classId}/weekly-schedule/template/${templateId}/copy-day`,
    { fromDay, toDay }
  );
  return response.data.data;
};

/**
 * Get import lock status
 */
export const getImportStatus = async (
  classId: number,
  year: number,
  month: number
): Promise<{
  isLocked: boolean;
  lockReason: string | null;
  totalWeeks: number;
  approvedWeeks: number[];
  submittedWeeks: number[];
  pendingWeeks: number[];
  allWeeksApproved: boolean;
  hasAnyTemplate: boolean;
}> => {
  const response = await apiClient.get(
    `/teacher/classes/${classId}/weekly-schedule/import-status/${year}/${month}`
  );
  return response.data.data;
};

/**
 * Get schedule reminder
 */
export const getScheduleReminder = async (
  classId: number,
  year: number,
  month: number
): Promise<{
  shouldRemind: boolean;
  message: string;
  totalWeeks: number;
  approvedWeeks: number[];
  pendingWeeks: number[];
  submittedWeeks: number[];
}> => {
  const response = await apiClient.get(
    `/teacher/classes/${classId}/weekly-schedule/reminder/${year}/${month}`
  );
  return response.data.data;
};

/**
 * Import history result types
 */
export interface ImportHistoryItem {
  HistoryID: number;
  TemplateID: number;
  Action: string;
  FromStatus: string | null;
  ToStatus: string | null;
  ActorID: number;
  ActorRole: string;
  CreatedAt: number;
  WeekNumber: number;
  Month: number;
  Year: number;
  ActorName: string;
}

export interface ImportSession {
  importDate: string;
  actionCount: number;
  firstAction: number;
  lastAction: number;
  actions: string;
}

export interface ImportHistoryResult {
  history: ImportHistoryItem[];
  sessions: ImportSession[];
}

/**
 * Get import history
 */
export const getImportHistory = async (
  classId: number,
  year: number,
  month: number
): Promise<ImportHistoryResult> => {
  const response = await apiClient.get(
    `/teacher/classes/${classId}/weekly-schedule/history/${year}/${month}`
  );
  return response.data.data;
};

/**
 * Download CSV template
 */
export const downloadCSVTemplate = async (weeks: number = 4): Promise<void> => {
  const content = generateCSVContent(weeks);
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `weekly_schedule_template_${new Date().toISOString().slice(0, 7)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Generate CSV content for download
 */
const generateCSVContent = (weeks: number = 4): string => {
  const headers = ['Week', 'Day', 'StartTime', 'EndTime', 'ActivityName', 'ActivityType', 'Details', 'Location'];
  const rows: string[] = [headers.join(',')];

  const defaultActivities = [
    { day: 'Monday', time: '07:30', end: '08:30', name: 'Đón bé & Thể dục sáng', type: 'pickup', details: 'Tập bài dân vũ', location: 'Sân trường' },
    { day: 'Monday', time: '08:30', end: '09:00', name: 'Ăn sáng dinh dưỡng', type: 'meal', details: 'Suất ăn sáng theo thực đơn', location: 'Phòng ăn' },
    { day: 'Monday', time: '09:00', end: '10:15', name: 'Học tạo hình', type: 'study', details: 'Bé vẽ tranh', location: 'Lớp học' },
    { day: 'Monday', time: '10:15', end: '11:15', name: 'Vui chơi tự do', type: 'play', details: 'Chơi tự do', location: 'Lớp học' },
    { day: 'Monday', time: '11:15', end: '14:00', name: 'Ăn trưa & Ngủ trưa', type: 'nap', details: 'Cơm trưa + giấc ngủ trưa', location: 'Phòng ngủ' },
    { day: 'Monday', time: '14:00', end: '14:30', name: 'Ăn xế chiều', type: 'meal', details: 'Trái cây + sữa', location: 'Phòng ăn' },
    { day: 'Monday', time: '14:30', end: '16:00', name: 'Kể chuyện cổ tích', type: 'study', details: 'Cô kể chuyện', location: 'Lớp học' },
    { day: 'Monday', time: '16:00', end: '17:00', name: 'Vệ sinh & Trả trẻ', type: 'dropoff', details: 'Chuẩn bị đồ dùng và đợi ba mẹ đón', location: 'Cổng A' },
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  for (let w = 1; w <= weeks; w++) {
    for (const day of days) {
      for (const act of defaultActivities) {
        const row = [
          w,
          day,
          act.time,
          act.end,
          `"${act.name}"`,
          act.type,
          `"${act.details}"`,
          `"${act.location}"`
        ];
        rows.push(row.join(','));
      }
    }
  }

  return rows.join('\n');
};
