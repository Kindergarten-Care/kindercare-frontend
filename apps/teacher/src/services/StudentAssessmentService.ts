import { apiClient } from '@kindercare/core';
import { SERVER, ApiResponse } from '@kindercare/core';
import { validateAssessmentItem } from '@/config/validations/assessment';
import {
  AssessmentHistoryPoint,
  UpsertAssessmentItem,
} from '@/config/types/assessment';

/**
 * Convert `YYYY-MM` (dùng nội bộ FE, khớp MonthYearPicker/sort) → `MM-YYYY`
 * (BE yêu cầu cho cột `StudentAssessments.AssessmentMonth`).
 */
function toBeMonthFormat(termPeriod: string): string {
  const [yyyy, mm] = termPeriod.split('-');
  return `${mm}-${yyyy}`;
}

/**
 * Convert `MM-YYYY` (BE trả về) → `YYYY-MM` (FE dùng nội bộ).
 */
function fromBeMonthFormat(assessmentMonth: string): string {
  const m = /^(\d{2})-(\d{4})$/.exec(assessmentMonth || '');
  if (!m) return assessmentMonth || '';
  return `${m[2]}-${m[1]}`;
}

/**
 * Service cho tính năng "Đánh giá định kỳ học sinh" (Phiếu bé ngoan).
 *
 * Endpoint BE thực tế đang chạy (bảng `StudentAssessments`):
 *   GET  /teacher/classes/:classId/assessments?month=MM-YYYY
 *   GET  /teacher/assessments?studentId=                      (lịch sử 6 tháng gần nhất)
 *   POST /teacher/assessments   body: {classId, studentId, month, ...scores, teacherComment}
 *
 * BE lưu `AssessmentMonth` dạng `MM-YYYY` (VD "07-2026") — FE dùng `YYYY-MM` nội bộ
 * (khớp MonthYearPicker + so sánh string đúng thứ tự thời gian) nên convert 2 chiều
 * ở lớp service này, UI/component phía trên không cần biết.
 *
 * Bảng nguồn: `StudentAssessments`.
 *   - 5 score cột: PhysicalScore, CognitiveScore, LanguageScore,
 *                  SocioEmotionalScore, AestheticScore
 *   - 1 text cột:  TeacherComment
 *   - AssessmentMonth varchar(7): 'MM-YYYY'
 */
export class AssessmentService {
  /**
   * Lấy bản ghi đánh giá của 1 lớp trong 1 tháng.
   * BE trả về TOÀN BỘ học sinh của lớp: { studentId, fullName, avatarUrl, assessment: {...} | null }.
   * Chỉ giữ lại các bé đã có `assessment` (bé chưa đánh giá → assessment = null).
   */
  public static async getClassAssessments(
    classId: number | string,
    termPeriod: string
  ): Promise<AssessmentHistoryPoint[]> {
    const url = SERVER.teacher.getClassAssessments.replace(':classId', String(classId));
    const res = await apiClient.get<ApiResponse<{ students: any[] }>>(url, {
      params: { month: toBeMonthFormat(termPeriod) },
    });
    const students = res.data?.data?.students ?? [];
    const arr = Array.isArray(students) ? students : [];
    return arr
      .filter(s => s.assessment)
      .map(s => AssessmentService.normalize({ studentId: s.studentId, ...s.assessment }));
  }

  /**
   * Tạo mới / cập nhật đánh giá cho 1 học sinh trong 1 tháng.
   * BE chỉ nhận từng học sinh 1 request (không có endpoint batch cho StudentAssessments).
   */
  public static async upsertClassAssessments(
    classId: number | string,
    termPeriod: string,
    items: UpsertAssessmentItem[]
  ): Promise<{ ok: true } | { ok: false; error: string }> {
    for (const item of items) {
      const errs = validateAssessmentItem(item);
      if (errs.length > 0) {
        return { ok: false, error: errs.join(' ') };
      }
    }

    try {
      const url = SERVER.teacher.submitAssessment;
      for (const item of items) {
        const payload = {
          classId: Number(classId),
          studentId: Number(item.studentId),
          month: toBeMonthFormat(termPeriod),
          physicalScore: item.physicalScore,
          cognitiveScore: item.cognitiveScore,
          languageScore: item.languageScore,
          socioEmotionalScore: item.socioEmotionalScore,
          aestheticScore: item.aestheticScore,
          teacherComment: item.teacherComment,
        };
        await apiClient.post<ApiResponse<unknown>>(url, payload);
      }
      return { ok: true };
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        'Không thể lưu đánh giá. Vui lòng thử lại.';
      return { ok: false, error: msg };
    }
  }

  /**
   * Lấy lịch sử 6 tháng gần nhất của 1 học sinh để vẽ radar chart.
   * BE dùng active class của giáo viên — không cần truyền classId.
   */
  public static async getStudentHistory(
    _classId: number | string,
    studentId: number | string,
    monthsBack = 6
  ): Promise<AssessmentHistoryPoint[]> {
    const url = SERVER.teacher.getAssessments;
    try {
      const res = await apiClient.get<ApiResponse<any[]>>(url, {
        params: { studentId },
      });
      const raw = res.data?.data ?? [];
      const arr = (Array.isArray(raw) ? raw : []).slice(0, monthsBack);
      return arr.map(AssessmentService.normalize);
    } catch (e) {
      console.warn('getStudentHistory fallback', e);
      return [];
    }
  }

  /**
   * Chuẩn hóa 1 record từ BE về shape FE dùng.
   * Bảng nguồn: `StudentAssessments` (5 scores + TeacherComment).
   */
  public static normalize = (raw: any): AssessmentHistoryPoint => {
    const num = (v: unknown, fallback = 0): number => {
      const n = typeof v === 'string' ? Number(v) : v;
      return typeof n === 'number' && Number.isFinite(n) ? n : fallback;
    };

    const termPeriod: string = fromBeMonthFormat(raw?.assessmentMonth ?? raw?.termPeriod ?? '');

    return {
      assessmentId: num(raw?.assessmentId, 0),
      studentId: raw?.studentId,
      termPeriod,
      physicalScore: num(raw?.physicalScore),
      cognitiveScore: num(raw?.cognitiveScore),
      languageScore: num(raw?.languageScore),
      socioEmotionalScore: num(raw?.socioEmotionalScore),
      aestheticScore: num(raw?.aestheticScore),
      teacherComment: typeof raw?.teacherComment === 'string' ? raw.teacherComment : undefined,
      createdAt: num(raw?.createdAt, 0),
      updatedAt: num(raw?.updatedAt, 0),
    };
  };
}

export const assessmentService = AssessmentService;
