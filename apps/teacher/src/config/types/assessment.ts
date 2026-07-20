/**
 * Đánh giá định kỳ học sinh — 6 tiêu chí.
 *
 * Schema ánh xạ bảng `DevelopmentAssessments` (PascalCase, đã có sẵn trong DB):
 *   - 5 score cột: PhysicalScore, CognitiveScore, LanguageScore,
 *                  EmotionalScore, SocialScore
 *   - 1 text cột:  OverallNote
 *   - TermPeriod varchar(7): 'YYYY-MM'
 *
 * UI hiển thị 6 card (Thể chất / Nhận thức / Ngôn ngữ / Cảm xúc - Xã hội /
 * Thẩm mỹ / Kỹ năng sống) nhưng DB chỉ lưu 5 score (Cảm xúc - Xã hội được tách
 * thành `EmotionalScore` + `SocialScore`). 2 tiêu chí Thẩm mỹ + Kỹ năng sống
 * giữ local-only trên client (DB chưa có cột).
 *
 * Flow mapping FE ↔ DB:
 *   - Lưu: `socioEmotionalScore` (UI 1 slider) → split thành `emotional + social`
 *          (FE gửi cả 2 = mean của socioEmotional).
 *   - Load: `emotional + social` (DB 2 cột) → merge thành `socioEmotional`
 *          (FE hiển thị 1 điểm trên radar chart).
 */

export type AssessmentCriterionKey =
  | 'physicalScore'        // Thể chất
  | 'cognitiveScore'       // Nhận thức
  | 'languageScore'        // Ngôn ngữ
  | 'socioEmotionalScore'  // Cảm xúc - Xã hội (UI merge emotional + social)
  | 'aestheticScore';      // Thẩm mỹ

/** Mỗi tiêu chí điểm 1..10 (BE validate tối đa 10). */
export type CriterionScore = number;

export const ASSESSMENT_SCORE_MIN = 1;
export const ASSESSMENT_SCORE_MAX = 10;
export const ASSESSMENT_SCORE_DEFAULT = 7;

/**
 * Field `score` mà BE chắc chắn chấp nhận trong PUT body.
 * Map tới 3 cột PascalCase trong `DevelopmentAssessments`:
 *   PhysicalScore, CognitiveScore, LanguageScore.
 */
export const BE_REQUIRED_SCORE_KEYS: AssessmentCriterionKey[] = [
  'physicalScore',
  'cognitiveScore',
  'languageScore',
];

/**
 * Field `score` mà BE chấp nhận thêm (sau khi nâng cấp TASK 1).
 * Map tới 2 cột PascalCase: EmotionalScore, SocialScore.
 * FE gửi kèm 2 field này (nếu có) để BE lưu vào cột tương ứng.
 */
export const BE_OPTIONAL_SCORE_KEYS: ReadonlyArray<string> = [
  'emotionalScore',
  'socialScore',
  'aestheticScore',
] as const;

/**
 * Field text mà BE chấp nhận thêm.
 * Map tới 1 cột PascalCase: OverallNote.
 */
export const BE_OPTIONAL_TEXT_KEYS: ReadonlyArray<string> = [
  'overallNote',
] as const;

/**
 * Danh sách tất cả field mà BE hiện chấp nhận trong PUT body (camelCase).
 *  - 3 score bắt buộc
 *  - 2 score optional (emotional, social)
 *  - 1 text optional (overallNote)
 *
 * Tổng cộng: 6 field camelCase ↔ 6 cột PascalCase trong bảng `DevelopmentAssessments`.
 */
export const BE_SUPPORTED_FIELDS: ReadonlyArray<string> = [
  ...BE_REQUIRED_SCORE_KEYS,
  ...BE_OPTIONAL_SCORE_KEYS,
  ...BE_OPTIONAL_TEXT_KEYS,
] as const;

/**
 * Field UI KHÔNG có cột DB tương ứng → KHÔNG gửi BE, KHÔNG validate.
 * Hiện có 1 tiêu chí: Thẩm mỹ (DB `DevelopmentAssessments` không có cột).
 * FE vẫn hiển thị cho user nhập, lưu localStorage để sau này BE mở rộng có sẵn data.
 */
export const LOCAL_ONLY_FIELDS: AssessmentCriterionKey[] = [];

/** Body payload gửi lên BE khi tạo/cập nhật. */
export interface UpsertAssessmentItem {
  studentId: number | string;
  /** 3 score bắt buộc */
  physicalScore: CriterionScore;
  cognitiveScore: CriterionScore;
  languageScore: CriterionScore;
  /** 2 score optional — map tới EmotionalScore + SocialScore trong DB. */
  emotionalScore?: CriterionScore;
  socialScore?: CriterionScore;
  /** UI field — KHÔNG gửi BE (DB không có cột). */
  aestheticScore?: CriterionScore;
  /** UI field — KHÔNG gửi BE (DB không có cột socioEmotional riêng). */
  socioEmotionalScore?: CriterionScore;
  /** Optional, max 500 ký tự. BE map → OverallNote. */
  overallNote?: string;
  /** Alias để tương thích ngược với code cũ. */
  teacherComment?: string;
}

export interface UpsertClassAssessmentsBody {
  items: UpsertAssessmentItem[];
  /** Required, YYYY-MM (vd "2026-07"). */
  termPeriod: string;
}

/**
 * 1 record đánh giá trả về từ BE (GET assessments + GET history).
 * BE trả về camelCase (NestJS default) hoặc PascalCase (raw mode) tùy cấu hình —
 * service `AssessmentService.normalize` tự map về shape camelCase bên dưới.
 */
export interface AssessmentHistoryPoint {
  assessmentId: number;
  studentId: number | string;
  /** YYYY-MM theo BE. */
  termPeriod: string;
  physicalScore: number;
  cognitiveScore: number;
  languageScore: number;
  /** ✅ BE đã hỗ trợ (sau TASK 1). */
  emotionalScore: number;
  socialScore: number;
  aestheticScore: number;
  /** Có thể null/undefined nếu record cũ chưa có. */
  overallNote?: string;
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