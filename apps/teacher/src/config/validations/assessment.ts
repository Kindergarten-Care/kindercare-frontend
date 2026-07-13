import {
  ASSESSMENT_SCORE_MAX,
  ASSESSMENT_SCORE_MIN,
  BE_REQUIRED_SCORE_KEYS,
  BE_OPTIONAL_SCORE_KEYS,
  BE_OPTIONAL_TEXT_KEYS,
  CriterionScore,
  UpsertAssessmentItem,
  UpsertClassAssessmentsBody,
} from '@/config/types/assessment';

/**
 * Đánh giá học sinh — schema (hand-rolled, mirror Zod API).
 * Có thể migrate sang Zod sau nếu team cài zod (npm i zod).
 *
 * Validate cả FE form và contract BE (bảng `DevelopmentAssessments`):
 *  - 3 score BE chắc chắn nhận: physicalScore, cognitiveScore, languageScore       (range 1..10)
 *  - 2 score BE nhận thêm (sau TASK 1): emotionalScore, socialScore              (range 1..10)
 *  - 1 text BE nhận thêm: overallNote                                             (max 500 ký tự)
 *  - 1 field local-only (DB chưa có cột): aestheticScore
 *  - termPeriod: required khi gửi BE, regex YYYY-MM
 */

export class ValidationError extends Error {
  constructor(public readonly fieldErrors: Record<string, string>) {
    super('Validation failed');
  }
}

function isScore(n: unknown): n is CriterionScore {
  return typeof n === 'number'
    && Number.isInteger(n)
    && n >= ASSESSMENT_SCORE_MIN
    && n <= ASSESSMENT_SCORE_MAX;
}

function isOptionalScore(n: unknown): boolean {
  return n === undefined || n === null || isScore(n);
}

const MONTH_RE_REVERSED = /^\d{4}-(0[1-9]|1[0-2])$/;

function isMonthReversed(s: unknown): s is string {
  return typeof s === 'string' && MONTH_RE_REVERSED.test(s);
}

/** Runtime-validate 1 record đánh giá (full form 6 tiêu chí + note).
 *
 * Quy tắc:
 *  - 3 scores required (BE chắc chắn nhận): physicalScore, cognitiveScore, languageScore
 *  - 2 scores optional (BE nhận nếu có):   emotionalScore, socialScore
 *  - 1 overallNote optional, max 500 ký tự
 *  - 1 field local-only (aestheticScore)
 *    FE vẫn cho phép nhập nhưng KHÔNG gửi BE (DB DevelopmentAssessments không có cột).
 */
export function validateAssessmentItem(input: unknown): string[] {
  const errors: string[] = [];
  if (typeof input !== 'object' || input === null) {
    return ['Phải là một object hợp lệ.'];
  }
  const item = input as Record<string, unknown>;

  // studentId bắt buộc
  if (item.studentId === undefined || item.studentId === null || item.studentId === '') {
    errors.push('studentId là bắt buộc.');
  }

  // 3 scores bắt buộc (cột chắc chắn có trong DB)
  for (const key of BE_REQUIRED_SCORE_KEYS) {
    if (!isScore(item[key])) {
      errors.push(`${key} phải là số nguyên từ ${ASSESSMENT_SCORE_MIN} đến ${ASSESSMENT_SCORE_MAX}.`);
    }
  }

  // 2 scores optional (BE nhận nếu gửi)
  for (const key of BE_OPTIONAL_SCORE_KEYS) {
    if (!isOptionalScore(item[key])) {
      errors.push(`${key} (tùy chọn) phải là số nguyên từ ${ASSESSMENT_SCORE_MIN} đến ${ASSESSMENT_SCORE_MAX} nếu có.`);
    }
  }

  // text overallNote optional
  for (const key of BE_OPTIONAL_TEXT_KEYS) {
    const v = item[key];
    if (v === undefined || v === null) continue;
    if (typeof v !== 'string') {
      errors.push(`${key} phải là chuỗi.`);
    } else if (v.length > 500) {
      errors.push(`${key} tối đa 500 ký tự.`);
    }
  }

  return errors;
}

/** Runtime-validate cả body gửi BE.
 *
 * Sau khi BE apply TASK 1: build payload gồm đủ 5 scores + overallNote.
 * 1 field local-only (aestheticScore) sẽ KHÔNG được gửi.
 */
export function validateUpsertBody(input: unknown): {
  ok: boolean;
  data?: UpsertClassAssessmentsBody;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  const empty: Record<string, string> = {};

  if (typeof input !== 'object' || input === null) {
    return { ok: false, errors: { ...empty, _root: 'Body phải là object.' } };
  }
  const body = input as Record<string, unknown>;

  // termPeriod required (YYYY-MM)
  if (typeof body.termPeriod !== 'string' || body.termPeriod === '') {
    errors.termPeriod = 'termPeriod là bắt buộc, định dạng YYYY-MM.';
  } else if (!isMonthReversed(body.termPeriod)) {
    errors.termPeriod = 'termPeriod phải có dạng YYYY-MM (vd "2026-07").';
  }

  // items: array
  if (!Array.isArray(body.items)) {
    return { ok: false, errors: { ...empty, items: 'items phải là mảng.' } };
  }
  if (body.items.length === 0) {
    return { ok: false, errors: { ...empty, items: 'items không được rỗng — phải có ít nhất 1 học sinh.' } };
  }

  const cleanedItems: UpsertAssessmentItem[] = [];
  body.items.forEach((raw, idx) => {
    const itemErrors = validateAssessmentItem(raw);
    if (itemErrors.length > 0) {
      errors[`items[${idx}]`] = itemErrors.join(' ');
    } else {
      const it = raw as UpsertAssessmentItem;
      const studentId = typeof it.studentId === 'string'
        ? (Number.isFinite(Number(it.studentId)) ? Number(it.studentId) : it.studentId)
        : it.studentId;

      // Build payload: chứa 3 score bắt buộc + 2 score optional (nếu có) + 1 text (nếu có).
      // Field local-only (aesthetic) KHÔNG được gửi.
      // Cast `as UpsertAssessmentItem` ở đây — các field được gán từng bước bên dưới.
      const cleaned = { studentId } as UpsertAssessmentItem;
      for (const k of BE_REQUIRED_SCORE_KEYS) {
        (cleaned as any)[k] = (it as any)[k];
      }
      for (const k of BE_OPTIONAL_SCORE_KEYS) {
        const v = (it as any)[k];
        if (typeof v === 'number') (cleaned as any)[k] = v;
      }
      for (const k of BE_OPTIONAL_TEXT_KEYS) {
        const v = (it as any)[k];
        if (typeof v === 'string' && v.trim()) (cleaned as any)[k] = v.trim();
      }
      cleanedItems.push(cleaned);
    }
  });

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    data: {
      items: cleanedItems,
      termPeriod: typeof body.termPeriod === 'string' ? body.termPeriod : '',
    },
    errors: empty,
  };
}

/**
 * Zod-compatible shape. Nếu sau này team cài zod, chỉ cần viết thêm:
 *   export const upsertSchema = z.object({ ... }) bằng các rule tương đương.
 * Hiện tại FE dùng validateUpsertBody() trước khi submit, BE dùng cùng rule.
 */

/**
 * Parse nhiều format về chuẩn YYYY-MM (dùng đồng nhất trong FE):
 *   - Date object
 *   - 'YYYY-MM' (FE + BE `DevelopmentAssessments.TermPeriod` đều dùng format này)
 *   - undefined / null → tháng hiện tại
 *
 * KHÔNG cần hỗ trợ MM-YYYY nữa vì DB `DevelopmentAssessments` lưu TermPeriod
 * dạng `YYYY-MM` (vd "2026-07"), khớp với format FE.
 */
export function toAssessmentMonth(input: string | Date | undefined | null): string {
  if (!input) return currentMonthYYYY();
  if (input instanceof Date) {
    const y = input.getFullYear();
    const m = input.getMonth() + 1;
    return `${y}-${String(m).padStart(2, '0')}`;
  }
  if (/^\d{4}-(0?[1-9]|1[0-2])$/.test(input)) {
    // Already YYYY-MM (accept both "2026-7" and "2026-07")
    const [yy, mm] = input.split('-').map(Number);
    return `${yy}-${String(mm).padStart(2, '0')}`;
  }
  return currentMonthYYYY();
}

export function currentMonthYYYY(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Tính mean của 5 tiêu chí BE đang hỗ trợ trong `DevelopmentAssessments`
 * (3 bắt buộc + 2 optional). Bỏ qua field không có giá trị số.
 * Trả về 0 nếu không có score nào.
 */
export function assessmentMean(s: UpsertAssessmentItem): number {
  const parts = [
    s.physicalScore,
    s.cognitiveScore,
    s.languageScore,
    s.emotionalScore,
    s.socialScore,
  ].filter((v): v is number => typeof v === 'number' && Number.isFinite(v));
  if (parts.length === 0) return 0;
  const sum = parts.reduce((a, b) => a + b, 0);
  return Math.round((sum / parts.length) * 10) / 10;
}

/**
 * Hợp nhất emotionalScore + socialScore thành 1 giá trị "socioEmotional"
 * để hiển thị radar chart (vì DB tách 2 cột, UI có 1 card "Cảm xúc - Xã hội").
 *
 * Công thức: mean(e, s), làm tròn 1 chữ số thập phân.
 * Bỏ qua field undefined / NaN.
 */
export function mergeSocioEmotional(e?: number, s?: number): number {
  const parts = [e, s].filter((v): v is number => typeof v === 'number' && Number.isFinite(v));
  if (parts.length === 0) return 0;
  return Math.round((parts.reduce((a, b) => a + b, 0) / parts.length) * 10) / 10;
}
