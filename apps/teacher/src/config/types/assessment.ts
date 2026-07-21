/**
 * Đánh giá định kỳ học sinh (Phiếu bé ngoan) — 5 tiêu chí.
 *
 * Schema ánh xạ bảng `StudentAssessments`:
 *   - 5 score cột: PhysicalScore, CognitiveScore, LanguageScore,
 *                  SocioEmotionalScore, AestheticScore
 *   - 1 text cột:  TeacherComment
 *   - AssessmentMonth varchar(7): 'YYYY-MM'
 *
 * UI hiển thị đủ 5 card, khớp 1-1 với 5 cột DB — không cần merge/split gì thêm.
 */

export type AssessmentCriterionKey =
  | 'physicalScore'        // Thể chất
  | 'cognitiveScore'       // Nhận thức
  | 'languageScore'        // Ngôn ngữ
  | 'socioEmotionalScore'  // Cảm xúc - Xã hội
  | 'aestheticScore';      // Thẩm mỹ

/** Mỗi tiêu chí điểm 1..10 (BE validate tối đa 10). */
export type CriterionScore = number;

export const ASSESSMENT_SCORE_MIN = 1;
export const ASSESSMENT_SCORE_MAX = 10;
export const ASSESSMENT_SCORE_DEFAULT = 7;

/**
 * Field `score` mà BE yêu cầu trong body — map tới 5 cột trong `StudentAssessments`:
 *   PhysicalScore, CognitiveScore, LanguageScore, SocioEmotionalScore, AestheticScore.
 */
export const BE_REQUIRED_SCORE_KEYS: AssessmentCriterionKey[] = [
  'physicalScore',
  'cognitiveScore',
  'languageScore',
  'socioEmotionalScore',
  'aestheticScore',
];

/** Không còn field score optional riêng — cả 5 tiêu chí đều map thẳng cột DB. */
export const BE_OPTIONAL_SCORE_KEYS: ReadonlyArray<string> = [] as const;

/**
 * Field text mà BE chấp nhận. Map tới cột `TeacherComment`.
 */
export const BE_OPTIONAL_TEXT_KEYS: ReadonlyArray<string> = [
  'teacherComment',
] as const;

/**
 * Danh sách tất cả field mà BE chấp nhận trong body (camelCase).
 * Tổng cộng: 5 score + 1 text ↔ 6 cột trong bảng `StudentAssessments`.
 */
export const BE_SUPPORTED_FIELDS: ReadonlyArray<string> = [
  ...BE_REQUIRED_SCORE_KEYS,
  ...BE_OPTIONAL_SCORE_KEYS,
  ...BE_OPTIONAL_TEXT_KEYS,
] as const;

/** Không còn field local-only — cả 5 tiêu chí UI đều có cột DB tương ứng. */
export const LOCAL_ONLY_FIELDS: AssessmentCriterionKey[] = [];

/** Body payload gửi lên BE khi tạo/cập nhật 1 học sinh (POST /teacher/assessments). */
export interface UpsertAssessmentItem {
  studentId: number | string;
  physicalScore: CriterionScore;
  cognitiveScore: CriterionScore;
  languageScore: CriterionScore;
  socioEmotionalScore: CriterionScore;
  aestheticScore: CriterionScore;
  /** Optional, max 500 ký tự. BE cột `TeacherComment`. */
  teacherComment?: string;
}

export interface UpsertClassAssessmentsBody {
  items: UpsertAssessmentItem[];
  /** Required, YYYY-MM (vd "2026-07"). BE gọi là `month`/`assessmentMonth`. */
  termPeriod: string;
}

/**
 * 1 record đánh giá trả về từ BE (GET assessments + GET history).
 * BE trả về camelCase — service `AssessmentService.normalize` chuẩn hóa về shape này.
 */
export interface AssessmentHistoryPoint {
  assessmentId: number;
  studentId: number | string;
  /** YYYY-MM theo BE (field `assessmentMonth`). */
  termPeriod: string;
  physicalScore: number;
  cognitiveScore: number;
  languageScore: number;
  socioEmotionalScore: number;
  aestheticScore: number;
  /** Có thể null/undefined nếu record cũ chưa có. */
  teacherComment?: string;
  createdAt?: number;
  updatedAt?: number;
}

/**
 * Meta dùng để render UI: tiêu đề tiếng Việt, icon, màu cho 6 tiêu chí.
 * Tránh hard-code trong component → dễ mở rộng và i18n sau.
 */
export const ASSESSMENT_CRITERIA: ReadonlyArray<{
  key: AssessmentCriterionKey;
  label: string;
  shortLabel: string;
  emoji: string;
  accent: string;        // màu chủ đạo cho chart + card
  description: string;
}> = [
  {
    key: 'physicalScore',
    label: 'Thể chất',
    shortLabel: 'Thể chất',
    emoji: '🏃',
    accent: '#EF4444',
    description: 'Vận động tinh – vận động thô, sức khỏe thể chất.',
  },
  {
    key: 'cognitiveScore',
    label: 'Nhận thức',
    shortLabel: 'Nhận thức',
    emoji: '🧠',
    accent: '#3B82F6',
    description: 'Tư duy logic, nhận biết, giải quyết vấn đề.',
  },
  {
    key: 'languageScore',
    label: 'Ngôn ngữ',
    shortLabel: 'Ngôn ngữ',
    emoji: '💬',
    accent: '#10B981',
    description: 'Diễn đạt, từ vựng, kỹ năng giao tiếp.',
  },
  {
    key: 'socioEmotionalScore',
    label: 'Cảm xúc - Xã hội',
    shortLabel: 'Cảm xúc',
    emoji: '❤️',
    accent: '#EC4899',
    description: 'Tương tác với bạn, kiểm soát cảm xúc.',
  },
  {
    key: 'aestheticScore',
    label: 'Thẩm mỹ',
    shortLabel: 'Thẩm mỹ',
    emoji: '🎨',
    accent: '#F59E0B',
    description: 'Cảm thụ âm nhạc, mỹ thuật, tạo hình.',
  },
] as const;