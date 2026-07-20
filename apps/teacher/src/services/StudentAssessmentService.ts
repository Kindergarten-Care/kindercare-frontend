import { apiClient } from '@kindercare/core';
import { SERVER, ApiResponse } from '@kindercare/core';
import { validateUpsertBody } from '@/config/validations/assessment';
import {
  AssessmentHistoryPoint,
  UpsertAssessmentItem,
  UpsertClassAssessmentsBody,
} from '@/config/types/assessment';

/**
 * Service cho tính năng "Đánh giá định kỳ học sinh".
 *
 * Endpoint thực tế BE đang chạy:
 *   GET  /teacher/classes/:classId/student-health/assessments?termPeriod=YYYY-MM
 *   PUT  /teacher/classes/:classId/student-health/assessments         body: { items, termPeriod }
 *   GET  /teacher/classes/:classId/student-health/assessments/history?studentId=&monthsBack=
 *
 * Các endpoint này đã được một service khác dùng ổn → tận dụng, đỡ phải đụng BE.
 *
 * Bảng nguồn: `DevelopmentAssessments` (PascalCase, đã có sẵn 5 records mẫu).
 *   - 5 score cột: PhysicalScore, CognitiveScore, LanguageScore,
 *                  EmotionalScore, SocialScore
 *   - 1 text cột:  OverallNote
 *   - TermPeriod varchar(7): 'YYYY-MM'
 */
export class AssessmentService {
  /**
   * Lấy bản ghi đánh giá của 1 lớp trong 1 tháng.
   * Trả về danh sách các bé đã có record (FE map với danh sách học sinh của lớp).
   */
  public static async getClassAssessments(
    classId: number | string,
    termPeriod: string
  ): Promise<AssessmentHistoryPoint[]> {
    const url = SERVER.teacher.getAssessments;
    const res = await apiClient.get<ApiResponse<{ students: any[] }>>(url, {
      params: { month: termPeriod },
    });
    const raw =
      res.data?.data?.students ?? (res.data?.data as any) ?? [];
    const arr = Array.isArray(raw) ? raw : [];
    return arr.map(AssessmentService.normalize);
  }

  /**
   * Tạo mới / cập nhật đánh giá cho nhiều học sinh trong cùng tháng.
   * Body đã được validate bởi validateUpsertBody() (chỉ chứa field BE hỗ trợ).
   */
  public static async upsertClassAssessments(
    classId: number | string,
    termPeriod: string,
    items: UpsertAssessmentItem[]
  ): Promise<{ ok: true } | { ok: false; error: string }> {
    const body: UpsertClassAssessmentsBody = { items, termPeriod };
    const valid = validateUpsertBody(body);
    if (!valid.ok) {
      return { ok: false, error: Object.values(valid.errors).join(' ') };
    }

    try {
      const url = SERVER.teacher.getAssessments;
      for (const item of items) {
        const payload = {
          classId: Number(classId),
          studentId: Number(item.studentId),
          month: termPeriod,
          physicalScore: item.physicalScore,
          cognitiveScore: item.cognitiveScore,
          languageScore: item.languageScore,
          emotionalScore: typeof item.emotionalScore === 'number' ? item.emotionalScore : item.socioEmotionalScore,
          aestheticScore: item.aestheticScore,
          notes: item.overallNote || item.teacherComment
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
   */
  public static async getStudentHistory(
    classId: number | string,
    studentId: number | string,
    monthsBack = 6
  ): Promise<AssessmentHistoryPoint[]> {
    const url = SERVER.teacher.getAssessments;
    try {
      const res = await apiClient.get<ApiResponse<{ assessments: any[] }>>(url, {
        params: { classId, studentId, monthsBack },
      });
      const raw = res.data?.data?.assessments ?? (res.data?.data as any) ?? [];
      const arr = Array.isArray(raw) ? raw : [];
      return arr.map(AssessmentService.normalize);
    } catch (e) {
      console.warn('getStudentHistory fallback', e);
      return [];
    }
  }

  /**
   * Chuẩn hóa 1 record từ BE về shape FE dùng.
   * BE trả về camelCase (NestJS default) hoặc PascalCase (raw mode) tùy cấu hình.
   * Bảng nguồn: `DevelopmentAssessments` (5 scores + OverallNote).
   *
   * Mapping field camelCase ↔ PascalCase:
   *   PhysicalScore   ↔ PhysicalScore
   *   CognitiveScore  ↔ CognitiveScore
   *   LanguageScore   ↔ LanguageScore
   *   EmotionalScore  ↔ EmotionalScore
   *   SocialScore     ↔ SocialScore
   *   OverallNote     ↔ OverallNote (FE alias 'teacherComment' để tương thích UI)
   *   TermPeriod      ↔ TermPeriod (YYYY-MM)
   */
  public static normalize = (raw: any): AssessmentHistoryPoint => {
    const num = (v: unknown, fallback = 0): number => {
      const n = typeof v === 'string' ? Number(v) : v;
      return typeof n === 'number' && Number.isFinite(n) ? n : fallback;
    };

    const termPeriod: string =
      raw?.termPeriod ?? raw?.TermPeriod ?? raw?.assessmentMonth ?? raw?.AssessmentMonth ?? '';

    const note =
      raw?.overallNote ?? raw?.OverallNote ?? raw?.teacherComment ?? raw?.TeacherComment ?? undefined;

    return {
      assessmentId: num(raw?.assessmentId ?? raw?.AssessmentID, 0),
      studentId: raw?.studentId ?? raw?.StudentID,
      termPeriod,
      physicalScore: num(raw?.physicalScore ?? raw?.PhysicalScore),
      cognitiveScore: num(raw?.cognitiveScore ?? raw?.CognitiveScore),
      languageScore: num(raw?.languageScore ?? raw?.LanguageScore),
      emotionalScore: num(raw?.emotionalScore ?? raw?.EmotionalScore ?? raw?.socioEmotionalScore),
      socialScore: num(raw?.socialScore ?? raw?.SocialScore),
      aestheticScore: num(raw?.aestheticScore ?? raw?.AestheticScore),
      overallNote: typeof note === 'string' ? note : undefined,
      createdAt: num(raw?.createdAt ?? raw?.CreatedAt, 0),
      updatedAt: num(raw?.updatedAt ?? raw?.UpdatedAt, 0),
    };
  };
}

export const assessmentService = AssessmentService;
