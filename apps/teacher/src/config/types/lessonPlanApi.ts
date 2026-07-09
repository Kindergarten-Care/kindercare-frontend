// ============================================================
// LessonPlan Types
// ============================================================
// Workflow: Draft → Submitted → (UnderReview) → Approved | Rejected | RevisionRequested

export type SubjectKey = 'lang' | 'math' | 'art' | 'music' | 'world' | 'phys' | 'other';

export type DayOfWeekKey = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type LessonPlanStatus =
  | 'Draft'
  | 'Submitted'
  | 'UnderReview'
  | 'Approved'
  | 'Rejected'
  | 'RevisionRequested';

// ===== API DTO (trả về từ BE) =====
export interface LessonPlanApiDto {
  lessonPlanId: number;
  teacherId: number;
  classId: number;
  yearId: number;
  weekNumber: number;
  year: number;
  weekStartDate: number;       // seconds
  weekEndDate: number;         // seconds
  weekTheme: string | null;
  monthTheme: string | null;
  weeklyGoal: string | null;
  note: string | null;
  status: LessonPlanStatus;
  submittedAt: number | null;
  reviewedById: number | null;
  reviewedAt: number | null;
  reviewerComment: string | null;
  createdAt: number;
  updatedAt: number;
  // Có thể kèm items trong cùng response
  items?: LessonPlanItemApiDto[];
  // Có thể kèm info join
  teacherName?: string;
  className?: string;
  reviewerName?: string;
}

export interface LessonPlanItemApiDto {
  itemId: number;
  lessonPlanId: number;
  dayOfWeek: DayOfWeekKey;
  subject: SubjectKey;
  startTime: string | null;     // "HH:mm:ss"
  endTime: string | null;
  title: string;
  objective: string | null;
  activityDetails: string | null;
  materials: string | null;
  teacherNote: string | null;
  isCompleted: boolean;
  completedAt: number | null;
  orderIndex: number;
}

// ===== Domain Model (dùng trong UI) =====
export interface LessonPlanDomainModel {
  lessonPlanId: number;
  teacherId: number;
  classId: number;
  yearId: number;
  weekNumber: number;
  year: number;
  weekStartDate: bigint;
  weekEndDate: bigint;
  weekTheme: string | null;
  monthTheme: string | null;
  weeklyGoal: string | null;
  note: string | null;
  status: LessonPlanStatus;
  submittedAt: bigint | null;
  reviewedById: number | null;
  reviewedAt: bigint | null;
  reviewerComment: string | null;
  createdAt: bigint;
  updatedAt: bigint;
  items: LessonPlanItemDomainModel[];
  teacherName?: string;
  className?: string;
  reviewerName?: string;
}

export interface LessonPlanItemDomainModel {
  itemId: number;
  lessonPlanId: number;
  dayOfWeek: DayOfWeekKey;
  subject: SubjectKey;
  startTime: string | null;
  endTime: string | null;
  title: string;
  objective: string | null;
  activityDetails: string | null;
  materials: string | null;
  teacherNote: string | null;
  isCompleted: boolean;
  completedAt: bigint | null;
  orderIndex: number;
}

// ===== Form input khi tạo/sửa =====
export interface LessonPlanUpsertInput {
  teacherId: number;
  classId: number;
  yearId: number;
  weekNumber: number;
  year: number;
  weekStartDate: number;       // seconds
  weekEndDate: number;
  weekTheme?: string | null;
  monthTheme?: string | null;
  weeklyGoal?: string | null;
  note?: string | null;
  items: LessonPlanItemUpsertInput[];
}

export interface LessonPlanItemUpsertInput {
  dayOfWeek: DayOfWeekKey;
  subject: SubjectKey;
  startTime?: string | null;
  endTime?: string | null;
  title: string;
  objective?: string | null;
  activityDetails?: string | null;
  materials?: string | null;
  teacherNote?: string | null;
  orderIndex: number;
}

// ===== Status helpers =====
export const STATUS_LABELS: Record<LessonPlanStatus, string> = {
  Draft: 'Bản nháp',
  Submitted: 'Đã gửi duyệt',
  UnderReview: 'Đang xem',
  Approved: 'Đã duyệt',
  Rejected: 'Từ chối',
  RevisionRequested: 'Yêu cầu sửa',
};

export const STATUS_COLORS: Record<LessonPlanStatus, string> = {
  Draft: '#94a3b8',
  Submitted: '#0ea5e9',
  UnderReview: '#f59e0b',
  Approved: '#10b981',
  Rejected: '#ef4444',
  RevisionRequested: '#f97316',
};