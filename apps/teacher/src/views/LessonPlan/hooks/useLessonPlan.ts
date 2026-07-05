import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTeacherClasses } from '@/hooks/useTeacherQueries';
import {
  useLessonPlanDetail,
  useMyLessonPlans,
  useSaveLessonPlan,
  useSubmitLessonPlan,
  useToggleItemComplete,
  useWithdrawLessonPlan,
} from '@/hooks/useLessonPlanQueries';
import { apiDayToFeKey, feKeyToApiDay } from '../constants';
import { exportLessonPlanCsv, getTodayKey, getWeekDates, getWeekLabel } from '../utils';
import type { DayKey } from '@/config/types/lessonPlan';
import type {
  LessonPlanDomainModel,
  LessonPlanItemDomainModel,
  LessonPlanStatus,
  LessonPlanUpsertInput,
  SubjectKey,
} from '@/config/types/lessonPlanApi';

// ===== Hook input/output shapes =====
export interface DetailedLessonItem {
  id: string;            // string version of itemId
  day: DayKey;
  subject: SubjectKey;
  time: string;
  title: string;
  note: string;
  done: boolean;
  objective: string;
  activityDetails: string;
  materials: string;
  teacherNote: string;
  startTime: string;
  endTime: string;
}

export interface LessonDraft {
  day: DayKey;
  subject: SubjectKey;
  title: string;
  time: string;
  note: string;
  objective: string;
  activityDetails: string;
  materials: string;
  teacherNote: string;
  startTime: string;
  endTime: string;
}

const EMPTY_DRAFT: LessonDraft = {
  day: 'mon',
  subject: 'lang',
  title: '',
  time: '08:45',
  note: '',
  objective: '',
  activityDetails: '',
  materials: '',
  teacherNote: '',
  startTime: '',
  endTime: '',
};

function formatTime(t: string | null | undefined): string {
  if (!t) return '';
  // "08:45:00" -> "08:45"
  return t.slice(0, 5);
}

function itemToDetailed(it: LessonPlanItemDomainModel, idStr: string): DetailedLessonItem {
  return {
    id: idStr,
    day: apiDayToFeKey(it.dayOfWeek) as DayKey,
    subject: it.subject as SubjectKey,
    time: formatTime(it.startTime) || '08:45',
    title: it.title,
    note: it.teacherNote ?? '',
    done: it.isCompleted,
    objective: it.objective ?? '',
    activityDetails: it.activityDetails ?? '',
    materials: it.materials ?? '',
    teacherNote: it.teacherNote ?? '',
    startTime: it.startTime ?? '',
    endTime: it.endTime ?? '',
  };
}

function draftToItemInput(d: LessonDraft, orderIndex: number) {
  return {
    dayOfWeek: feKeyToApiDay(d.day) as any,
    subject: d.subject as any,
    startTime: d.startTime || `${d.time || '08:45'}:00`,
    endTime: d.endTime || '',
    title: d.title.trim(),
    objective: d.objective || null,
    activityDetails: d.activityDetails || null,
    materials: d.materials || null,
    teacherNote: d.teacherNote || null,
    orderIndex,
  };
}

export function useLessonPlan(className: string) {
  const { user } = useAuth();
  const { data: classes } = useTeacherClasses();
  const activeClass = classes && classes.length > 0 ? classes[0] : null;
  // teacherId lấy từ JWT; classId lấy từ class đầu tiên GV phụ trách.
  // yearId: tạm thời fix cứng 1 (Niên khóa 2026-2027) — sẽ bổ sung sau khi BE trả về.
  const teacherId = user?.userId ?? 5;
  const classId = activeClass?.classId ?? 1;
  const yearId = 1;

  const todayKey = useMemo(() => getTodayKey(), []);
  const [weekOffset, setWeekOffset] = useState(0);
  const [statusFilter, setStatusFilter] = useState<LessonPlanStatus | undefined>(undefined);

  const { data: plans = [], isLoading: loadingList } = useMyLessonPlans({
    status: statusFilter,
  });
  const { data: targetPlan, isLoading: loadingDetail } = useLessonPlanDetail(undefined);

  // Tìm plan của tuần đang xem
  const targetPlanMatches = useMemo(() => {
    return plans.filter((p) => {
      const startSeconds = Number(p.weekStartDate);
      const targetTs = Math.floor(new Date(getWeekDatesStart(weekOffset)).getTime() / 1000);
      const diff = Math.abs(Number(startSeconds) - targetTs);
      return diff < 60 * 60 * 24 * 7; // cùng tuần (±7 ngày)
    });
  }, [plans, weekOffset]);

  const currentPlan: LessonPlanDomainModel | null = useMemo(() => {
    // Ưu tiên plan ở tuần đúng (lệch 0–3 ngày)
    const exact = targetPlanMatches.find((p) => {
      const diff = Math.abs(Number(p.weekStartDate) - Math.floor(getWeekDatesStart(weekOffset).getTime() / 1000));
      return diff < 60 * 60 * 24 * 3;
    });
    if (exact) return exact;
    return targetPlanMatches[0] ?? null;
  }, [targetPlanMatches, weekOffset]);

  const planId = currentPlan?.lessonPlanId;

  const { data: detail } = useLessonPlanDetail(planId);
  const livePlan = detail ?? currentPlan;

  const lessons: DetailedLessonItem[] = useMemo(() => {
    if (!livePlan) return [];
    return livePlan.items.map((it) =>
      itemToDetailed(
        it,
        it.itemId ? String(it.itemId) : `tmp-${it.orderIndex}`
      )
    );
  }, [livePlan]);

  // ===== Mutations =====
  const saveMutation = useSaveLessonPlan();
  const submitMutation = useSubmitLessonPlan();
  const withdrawMutation = useWithdrawLessonPlan();
  const toggleMutation = useToggleItemComplete();

  // ===== UI state =====
  const [modalOpen, setModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [draft, setDraft] = useState<LessonDraft>(EMPTY_DRAFT);
  const [toasts, setToasts] = useState<Array<{ id: string; text: string }>>([]);

  const addToast = useCallback((text: string) => {
    const id = `t${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2600);
  }, []);

  // ===== Modal handlers =====
  const openNew = useCallback(() => {
    setEditItemId(null);
    setDraft({ ...EMPTY_DRAFT, day: 'mon' });
    setModalOpen(true);
  }, []);

  const openAdd = useCallback((day: DayKey) => {
    setEditItemId(null);
    setDraft({ ...EMPTY_DRAFT, day });
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((id: string) => {
    const lesson = lessons.find((it) => it.id === id);
    if (!lesson) return;
    setEditItemId(id);
    setDraft({
      day: lesson.day,
      subject: lesson.subject,
      title: lesson.title,
      time: lesson.time,
      note: lesson.note,
      objective: lesson.objective,
      activityDetails: lesson.activityDetails,
      materials: lesson.materials,
      teacherNote: lesson.teacherNote,
      startTime: lesson.startTime,
      endTime: lesson.endTime,
    });
    setModalOpen(true);
  }, [lessons]);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const updateDraft = useCallback((patch: Partial<LessonDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const pickSubject = useCallback((subject: SubjectKey) => updateDraft({ subject }), [updateDraft]);
  const pickDay = useCallback((day: DayKey) => updateDraft({ day }), [updateDraft]);

  // ===== Save (create or update) =====
  const saveLesson = useCallback(async () => {
    if (!draft.title.trim()) {
      addToast('⚠️ Vui lòng nhập tên bài học');
      return;
    }

    // Tính danh sách items mới
    const targetDay = feKeyToApiDay(draft.day);
    let newItems: LessonPlanUpsertInput['items'] = livePlan
      ? livePlan.items
          .filter((it) => editItemId == null || String(it.itemId) !== editItemId)
          .map((it, idx) => ({
            dayOfWeek: it.dayOfWeek,
            subject: it.subject as any,
            startTime: it.startTime,
            endTime: it.endTime,
            title: it.title,
            objective: it.objective,
            activityDetails: it.activityDetails,
            materials: it.materials,
            teacherNote: it.teacherNote,
            orderIndex: idx,
          }))
      : [];

    const newItem = draftToItemInput(draft, newItems.length);
    newItems = [...newItems, newItem];

    // Lấy weekStart/End
    const { start, end } = getWeekRange(weekOffset);

    const payload: LessonPlanUpsertInput = {
      teacherId: Number(teacherId),
      classId: Number(classId),
      yearId: Number(yearId),
      weekNumber: getWeekNumber(yearId, weekOffset),
      year: getCurrentYear(),
      weekStartDate: Math.floor(start.getTime() / 1000),
      weekEndDate: Math.floor(end.getTime() / 1000),
      weekTheme: livePlan?.weekTheme ?? null,
      monthTheme: livePlan?.monthTheme ?? null,
      weeklyGoal: livePlan?.weeklyGoal ?? null,
      note: livePlan?.note ?? null,
      items: newItems,
    };

    try {
      await saveMutation.mutateAsync(payload);
      addToast(editItemId ? '✏️ Đã cập nhật tiết học' : '✅ Đã thêm tiết học mới');
      setModalOpen(false);
    } catch (err: any) {
      // err.response: undefined khi network error (BE offline/proxy fail)
      // err.response.data: có thể là {} hoặc "" khi proxy trả 404 rỗng
      const status = err?.response?.status;
      const rawData = err?.response?.data;
      // Lấy message từ nhiều nguồn: BE response, Axios message, hoặc network error
      let serverMsg = 'Lỗi không xác định';
      if (rawData != null && rawData !== '') {
        if (typeof rawData === 'string') {
          try { serverMsg = JSON.parse(rawData); } catch { serverMsg = rawData; }
        } else {
          serverMsg = rawData.message || rawData.error || rawData.detail || JSON.stringify(rawData);
        }
      } else if (err.message) {
        // Network error hoặc proxy fail — dùng Axios message
        serverMsg = err.message.replace(/^Request failed with status code \d+\.\s*/, '');
      }
      console.error('[LessonPlan save failed]', { status, rawData, errMsg: err.message, payload });
      addToast(`❌ Lỗi ${status ?? '??'}: ${serverMsg}`);
    }
  }, [draft, editItemId, livePlan, saveMutation, teacherId, classId, yearId, weekOffset, addToast]);

  const removeLesson = useCallback(async (id: string) => {
    if (!livePlan) return;

    const remaining = livePlan.items.filter((it) => String(it.itemId) !== id);
    const { start, end } = getWeekRange(weekOffset);

    try {
      await saveMutation.mutateAsync({
        teacherId: Number(teacherId),
        classId: Number(classId),
        yearId: Number(yearId),
        weekNumber: livePlan.weekNumber,
        year: livePlan.year,
        weekStartDate: Number(livePlan.weekStartDate),
        weekEndDate: Number(livePlan.weekEndDate),
        weekTheme: livePlan.weekTheme,
        monthTheme: livePlan.monthTheme,
        weeklyGoal: livePlan.weeklyGoal,
        note: livePlan.note,
        items: remaining.map((it, idx) => ({
          dayOfWeek: it.dayOfWeek,
          subject: it.subject as any,
          startTime: it.startTime,
          endTime: it.endTime,
          title: it.title,
          objective: it.objective,
          activityDetails: it.activityDetails,
          materials: it.materials,
          teacherNote: it.teacherNote,
          orderIndex: idx,
        })),
      });
      addToast('🗑️ Đã xoá tiết học');
    } catch (err: any) {
      addToast(`❌ ${err?.message ?? 'Lỗi xoá'}`);
    }
  }, [livePlan, saveMutation, teacherId, classId, yearId, weekOffset, addToast]);

  const toggleDone = useCallback(async (id: string) => {
    const lesson = lessons.find((it) => it.id === id);
    if (!lesson || !livePlan) return;
    try {
      await toggleMutation.mutateAsync({
        planId: livePlan.lessonPlanId,
        itemId: id,
        isCompleted: !lesson.done,
      });
      addToast(lesson.done ? '↩︎ Đánh dấu lại: đang soạn' : '✅ Đã soạn xong tiết học');
    } catch (err: any) {
      addToast(`❌ ${err?.message ?? 'Lỗi'}`);
    }
  }, [lessons, livePlan, toggleMutation, addToast]);

  const exportPlan = useCallback(() => {
    // Map DetailedLessonItem về shape LessonPlanItem để giữ tương thích utils.ts
    const flat = lessons.map((it) => ({
      id: it.id,
      day: it.day,
      subject: it.subject,
      time: it.time,
      title: it.title,
      note: it.note,
      done: it.done,
    }));
    exportLessonPlanCsv(flat as any, className);
    addToast('📄 Đã xuất kế hoạch giảng dạy');
  }, [addToast, className, lessons]);

  // ===== Week navigation =====
  const prevWeek = useCallback(() => setWeekOffset((v) => v - 1), []);
  const nextWeek = useCallback(() => setWeekOffset((v) => v + 1), []);

  // ===== Workflow actions =====
  const submitForApproval = useCallback(async () => {
    if (!livePlan) {
      addToast('⚠️ Chưa có giáo án để gửi');
      return;
    }
    if (livePlan.status !== 'Draft' && livePlan.status !== 'RevisionRequested') {
      addToast('⚠️ Không thể gửi ở trạng thái hiện tại');
      return;
    }
    try {
      await submitMutation.mutateAsync({ id: livePlan.lessonPlanId, note: livePlan.note ?? undefined });
      addToast('📤 Đã gửi duyệt cho Hiệu trưởng');
    } catch (err: any) {
      addToast(`❌ ${err?.message ?? 'Lỗi gửi'}`);
    }
  }, [livePlan, submitMutation, addToast]);

  const withdraw = useCallback(async () => {
    if (!livePlan || livePlan.status !== 'Submitted') return;
    try {
      await withdrawMutation.mutateAsync(livePlan.lessonPlanId);
      addToast('↩︎ Đã rút lại giáo án');
    } catch (err: any) {
      addToast(`❌ ${err?.message ?? 'Lỗi rút'}`);
    }
  }, [livePlan, withdrawMutation, addToast]);

  // ===== ESC đóng modal =====
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) closeModal();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closeModal, modalOpen]);

  const totalCount = lessons.length;
  const doneCount = lessons.filter((l) => l.done).length;
  const donePct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;
  const weekLabel = getWeekLabel(weekOffset);
  const weekDates = getWeekDates(weekOffset);

  const isReadOnly = livePlan
    ? !['Draft', 'RevisionRequested'].includes(livePlan.status)
    : false;

  return {
    todayKey,
    weekOffset,
    weekLabel,
    weekDates,
    totalCount,
    doneCount,
    donePct,
    lessons,
    modalOpen,
    editItemId,
    draft,
    toasts,
    prevWeek,
    nextWeek,
    openNew,
    openAdd,
    openEdit,
    closeModal,
    updateDraft,
    pickSubject,
    pickDay,
    saveLesson,
    toggleDone,
    removeLesson,
    exportPlan,
    submitForApproval,
    withdraw,
    setStatusFilter,
    statusFilter,
    currentPlan: livePlan,
    isReadOnly,
    isLoading: loadingList || loadingDetail,
  };
}

// ===== Helpers =====

function getWeekDatesStart(weekOffset: number): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentDow = today.getDay();
  const diffToMonday = currentDow === 0 ? -6 : 1 - currentDow;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday + weekOffset * 7);
  return monday;
}

function getWeekRange(weekOffset: number): { start: Date; end: Date } {
  const start = getWeekDatesStart(weekOffset);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 0);
  return { start, end };
}

function getWeekNumber(yearId: number, weekOffset: number): number {
  // Tính tuần ISO — đơn giản hoá theo offset 0
  if (weekOffset === 0) {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 1);
    const diff = today.getTime() - start.getTime();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    return Math.floor(diff / oneWeek) + 1;
  }
  const base = getWeekNumber(yearId, 0);
  return Math.max(1, base + weekOffset);
}

function getCurrentYear(): number {
  return new Date().getFullYear();
}