import { apiClient } from '@kindercare/core';
import type { MonthlySchedule, WeeklySchedule, WeeklyScheduleDetail } from '@/config/types/weeklySchedule';

export interface CSVPreviewResult {
  items: WeeklyScheduleDetail[];
  byDay: Record<string, WeeklyScheduleDetail[]>;
  errors: string[];
  totalRows: number;
}

export interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
}

export interface SaveWeekPayload {
  monthlyScheduleId: number;
  weekOrder: number;
  weekTheme: string;
  items: Omit<WeeklyScheduleDetail, 'scheduleDetailId'>[];
}

/**
 * Get full monthly schedule with all weeks and details.
 * GET /teacher/classes/:classId/monthly-schedule/:year/:month
 */
export const getMonthlySchedule = async (
  classId: number,
  year: number,
  month: number
): Promise<MonthlySchedule | null> => {
  const response = await apiClient.get(
    `/teacher/classes/${classId}/monthly-schedule/${year}/${month}`
  );
  return response.data.data ?? null;
};

/**
 * Upsert monthly schedule (creates or updates MS record).
 * POST /teacher/classes/:classId/monthly-schedule
 */
export const upsertMonthlySchedule = async (
  classId: number,
  payload: { yearId: number; month: number; year: number; monthTheme: string }
): Promise<{ monthlyScheduleId: number; action: string }> => {
  const response = await apiClient.post(
    `/teacher/classes/${classId}/monthly-schedule`,
    payload
  );
  return response.data.data;
};

/**
 * Get single weekly schedule with details.
 * GET /teacher/classes/:classId/weekly-schedule/:wsId
 */
export const getWeeklyScheduleById = async (
  classId: number,
  wsId: number
): Promise<WeeklySchedule | null> => {
  const response = await apiClient.get(
    `/teacher/classes/${classId}/weekly-schedule/${wsId}`
  );
  return response.data.data ?? null;
};

/**
 * Save (upsert) weekly schedule + details.
 * POST /teacher/classes/:classId/weekly-schedule
 */
export const saveWeeklySchedule = async (
  classId: number,
  data: SaveWeekPayload
): Promise<{ weeklyScheduleId: number; action: string }> => {
  const response = await apiClient.post(
    `/teacher/classes/${classId}/weekly-schedule`,
    data
  );
  return response.data.data;
};

/**
 * Delete weekly schedule.
 * DELETE /teacher/classes/:classId/weekly-schedule/:wsId
 */
export const deleteWeeklySchedule = async (
  classId: number,
  wsId: number
): Promise<{ success: boolean }> => {
  const response = await apiClient.delete(
    `/teacher/classes/${classId}/weekly-schedule/${wsId}`
  );
  return response.data.data;
};

/**
 * Submit weekly schedule for approval.
 * POST /teacher/classes/:classId/weekly-schedule/:wsId/submit
 */
export const submitWeeklySchedule = async (
  classId: number,
  wsId: number
): Promise<{ success: boolean }> => {
  const response = await apiClient.post(
    `/teacher/classes/${classId}/weekly-schedule/${wsId}/submit`
  );
  return response.data.data;
};

/**
 * Withdraw submitted weekly schedule.
 * POST /teacher/classes/:classId/weekly-schedule/:wsId/withdraw
 */
export const withdrawWeeklySchedule = async (
  classId: number,
  wsId: number
): Promise<{ success: boolean }> => {
  const response = await apiClient.post(
    `/teacher/classes/${classId}/weekly-schedule/${wsId}/withdraw`
  );
  return response.data.data;
};

/**
 * Preview CSV file (parse without saving).
 * POST /teacher/classes/:classId/weekly-schedule/:wsId/preview-csv
 */
export const previewCSV = async (
  classId: number,
  wsId: number,
  file: File
): Promise<CSVPreviewResult> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post(
    `/teacher/classes/${classId}/weekly-schedule/${wsId}/preview-csv`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data.data;
};

/**
 * Import CSV into a weekly schedule.
 * POST /teacher/classes/:classId/weekly-schedule/:wsId/import-csv
 */
export const importCSV = async (
  classId: number,
  wsId: number,
  file: File
): Promise<ImportResult> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post(
    `/teacher/classes/${classId}/weekly-schedule/${wsId}/import-csv`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data.data;
};

/**
 * Generate CSV template for a week.
 * Columns match WeeklyScheduleDetails table.
 */
export const generateCSVTemplate = (weekOrder: number): string => {
  const headers = ['DayOfWeek', 'StartTime', 'EndTime', 'ActivityName', 'ActivityType', 'Details', 'Location'];
  const rows = [headers.join(',')];

  const activities: Array<[string, string, string, string, string, string, string]> = [
    // Monday
    ['Monday',    '07:30', '08:30', 'Đón bé & Thể dục sáng',  'pickup', 'Tập bài dân vũ',            'Sân trường'],
    ['Monday',    '08:30', '09:00', 'Ăn sáng dinh dưỡng',     'meal',   'Suất ăn sáng',             'Phòng ăn'],
    ['Monday',    '09:00', '10:15', 'Học tập - Tiếng Việt',   'study',  'Nhận biết chữ cái',        'Lớp học'],
    ['Monday',    '10:15', '11:15', 'Vui chơi tự do',         'play',   '',                          'Sân trường'],
    ['Monday',    '11:15', '14:00', 'Ăn trưa & Ngủ trưa',    'nap',    'Cơm trưa + giấc ngủ',      'Phòng ngủ'],
    ['Monday',    '14:00', '14:30', 'Ăn xế chiều',           'meal',   'Trái cây + sữa',           'Phòng ăn'],
    ['Monday',    '14:30', '16:00', 'Hoạt động thực hành',    'study',  '',                          'Lớp học'],
    ['Monday',    '16:00', '17:00', 'Vệ sinh & Trả trẻ',     'dropoff','Đợi phụ huynh đón',        'Cổng A'],
    // Tuesday
    ['Tuesday',   '07:30', '08:30', 'Đón bé & Khởi động',    'pickup', 'Vận động nhẹ nhàng',      'Sân trường'],
    ['Tuesday',   '08:30', '09:00', 'Ăn sáng',                'meal',   'Suất ăn sáng',             'Phòng ăn'],
    ['Tuesday',   '09:00', '10:15', 'Học Toán vui',          'study',  'Đếm số, nhận dạng hình',  'Lớp học'],
    ['Tuesday',   '10:15', '11:15', 'Vui chơi tự do',        'play',   '',                          'Sân trường'],
    ['Tuesday',   '11:15', '14:00', 'Ăn trưa & Ngủ trưa',    'nap',    'Cơm trưa + giấc ngủ',      'Phòng ngủ'],
    ['Tuesday',   '14:00', '14:30', 'Ăn xế chiều',           'meal',   'Bánh + sữa',               'Phòng ăn'],
    ['Tuesday',   '14:30', '16:00', 'Âm nhạc & Kể chuyện',   'study',  '',                          'Lớp học'],
    ['Tuesday',   '16:00', '17:00', 'Vệ sinh & Trả trẻ',     'dropoff','Đợi phụ huynh đón',        'Cổng A'],
    // Wednesday
    ['Wednesday', '07:30', '08:30', 'Đón bé & Thể dục sáng',  'pickup', 'Bài tập thể dục',          'Sân trường'],
    ['Wednesday', '08:30', '09:00', 'Ăn sáng',                'meal',   'Suất ăn sáng',             'Phòng ăn'],
    ['Wednesday', '09:00', '10:15', 'Học Tiếng Anh',          'study',  'Từ vựng cơ bản',           'Lớp học'],
    ['Wednesday', '10:15', '11:15', 'Vẽ tranh tự do',        'play',   '',                          'Lớp học'],
    ['Wednesday', '11:15', '14:00', 'Ăn trưa & Ngủ trưa',    'nap',    'Cơm trưa + giấc ngủ',      'Phòng ngủ'],
    ['Wednesday', '14:00', '14:30', 'Ăn xế chiều',           'meal',   'Trái cây',                  'Phòng ăn'],
    ['Wednesday', '14:30', '16:00', 'Thực hành kỹ năng',     'study',  '',                          'Lớp học'],
    ['Wednesday', '16:00', '17:00', 'Vệ sinh & Trả trẻ',     'dropoff','Đợi phụ huynh đón',        'Cổng A'],
    // Thursday
    ['Thursday',  '07:30', '08:30', 'Đón bé & Khởi động',    'pickup', 'Vận động nhẹ nhàng',      'Sân trường'],
    ['Thursday',  '08:30', '09:00', 'Ăn sáng',                'meal',   'Suất ăn sáng',             'Phòng ăn'],
    ['Thursday',  '09:00', '10:15', 'Học tập - Tự nhiên',   'study',  'Thế giới động thực vật',   'Lớp học'],
    ['Thursday',  '10:15', '11:15', 'Vui chơi tự do',        'play',   '',                          'Sân trường'],
    ['Thursday',  '11:15', '14:00', 'Ăn trưa & Ngủ trưa',    'nap',    'Cơm trưa + giấc ngủ',      'Phòng ngủ'],
    ['Thursday',  '14:00', '14:30', 'Ăn xế chiều',           'meal',   'Sữa + bánh',               'Phòng ăn'],
    ['Thursday',  '14:30', '16:00', 'Hoạt động nghệ thuật',  'study',  '',                          'Lớp học'],
    ['Thursday',  '16:00', '17:00', 'Vệ sinh & Trả trẻ',     'dropoff','Đợi phụ huynh đón',        'Cổng A'],
    // Friday
    ['Friday',    '07:30', '08:30', 'Đón bé & Thể dục sáng',  'pickup', 'Vận động nhẹ nhàng',      'Sân trường'],
    ['Friday',    '08:30', '09:00', 'Ăn sáng',                'meal',   'Suất ăn sáng',             'Phòng ăn'],
    ['Friday',    '09:00', '10:15', 'Sinh hoạt tuần',         'study',  'Nhận xét & khen thưởng',   'Lớp học'],
    ['Friday',    '10:15', '11:15', 'Vui chơi cuối tuần',    'play',   '',                          'Sân trường'],
    ['Friday',    '11:15', '14:00', 'Ăn trưa & Ngủ trưa',    'nap',    'Cơm trưa + giấc ngủ',      'Phòng ngủ'],
    ['Friday',    '14:00', '14:30', 'Ăn xế chiều',           'meal',   'Trái cây',                  'Phòng ăn'],
    ['Friday',    '14:30', '16:00', 'Kết thúc tuần',         'study',  '',                          'Lớp học'],
    ['Friday',    '16:00', '17:00', 'Vệ sinh & Trả trẻ',    'dropoff','Đợi phụ huynh đón',        'Cổng A'],
  ];

  for (const [day, time, end, name, type, details, location] of activities) {
    rows.push(`${day},${time},${end},"${name}",${type},"${details}","${location}"`);
  }

  return rows.join('\n');
};

/**
 * Download CSV template.
 */
export const downloadCSVTemplate = (weekOrder: number): void => {
  const content = generateCSVTemplate(weekOrder);
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `tkb_tuan_${weekOrder}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
