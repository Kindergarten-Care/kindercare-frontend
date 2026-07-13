'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { useTeacherClasses } from '@/hooks/useTeacherQueries';
import * as WeeklyScheduleService from '@/services/weeklySchedule/WeeklyScheduleService';
import type {
  MonthlySchedule,
  WeeklySchedule,
  WeeklyScheduleDetail,
  WeekInMonth,
  SchoolDay,
  ActivityType,
  CSVPreviewResult,
} from '@/config/types/weeklySchedule';

interface Toast {
  id: string;
  text: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
}

export const SCHOOL_DAYS: { key: SchoolDay; label: string; short: string }[] = [
  { key: 'Monday', label: 'Thứ 2', short: 'T2' },
  { key: 'Tuesday', label: 'Thứ 3', short: 'T3' },
  { key: 'Wednesday', label: 'Thứ 4', short: 'T4' },
  { key: 'Thursday', label: 'Thứ 5', short: 'T5' },
  { key: 'Friday', label: 'Thứ 6', short: 'T6' },
];

export function getWeeksInMonth(year: number, month: number): WeekInMonth[] {
  const firstOfMonth = new Date(year, month - 1, 1);
  const lastOfMonth = new Date(year, month, 0);
  const monthStart = new Date(year, month - 1, 1);
  const monthEnd = new Date(year, month, 0);
  const weeks: WeekInMonth[] = [];

  let cursor = new Date(firstOfMonth);
  const dow = cursor.getDay(); // 0=Sun, 1=Mon, ...
  if (dow !== 1) {
    const offset = dow === 0 ? -6 : 1 - dow;
    cursor.setDate(cursor.getDate() + offset);
  }

  let weekOrder = 1;
  while (cursor <= lastOfMonth) {
    const start = new Date(cursor);
    const end = new Date(cursor);
    end.setDate(end.getDate() + 4); // Friday

    if (end >= monthStart && start <= monthEnd) {
      const fmt = (d: Date) =>
        `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
      weeks.push({
        weekOrder,
        startDate: fmt(start),
        endDate: fmt(end),
        label: `Tuần ${weekOrder} (${fmt(start)} - ${fmt(end)})`,
      });
      weekOrder += 1;
    }

    cursor.setDate(cursor.getDate() + 7);
  }

  return weeks;
}

export const useWeeklySchedule = (activeClassId?: number) => {
  const { data: classes } = useTeacherClasses();
  const activeClass = activeClassId
    ? classes?.find((c) => c.classId === activeClassId) || classes?.[0] || null
    : classes && classes.length > 0
    ? classes[0]
    : null;
  const classId = activeClass?.classId || 0;
  const className = activeClass?.displayName || 'Lớp';

  // ── Current month/year ────────────────────────────────────────────────────
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { month: now.getMonth() + 1, year: now.getFullYear() };
  });

  // ── MS form (top section) ─────────────────────────────────────────────────
  const [monthTheme, setMonthTheme] = useState('');
  const [monthlySchedule, setMonthlySchedule] = useState<MonthlySchedule | null>(null);
  const [weeks, setWeeks] = useState<WeeklySchedule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ── Week selection (dropdown below) ──────────────────────────────────────
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [weekTheme, setWeekTheme] = useState('');

  // ── CSV state ─────────────────────────────────────────────────────────────
  const [csvPreview, setCsvPreview] = useState<CSVPreviewResult | null>(null);
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const clearCsvPreview = useCallback(() => {
    setCsvPreview(null);
    setCsvModalOpen(false);
  }, []);

  // ── Toasts ───────────────────────────────────────────────────────────────
  const [toasts, setToasts] = useState<Toast[]>([]);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const showToast = useCallback((text: string, variant: Toast['variant'] = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const weeksInMonth = useMemo(
    () => getWeeksInMonth(currentMonth.year, currentMonth.month),
    [currentMonth.year, currentMonth.month]
  );

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const todayWeekOrder = useMemo(() => {
    const dow = today.getDay(); // 0=Sun
    const offset = dow === 0 ? -6 : 1 - dow;
    const monday = new Date(today);
    monday.setDate(today.getDate() + offset);
    const fri = new Date(monday);
    fri.setDate(monday.getDate() + 4);
    if (monday.getFullYear() === currentMonth.year && monday.getMonth() + 1 === currentMonth.month) {
      const found = weeksInMonth.find(
        (w) =>
          w.startDate === `${String(monday.getDate()).padStart(2, '0')}/${String(monday.getMonth() + 1).padStart(2, '0')}`
      );
      return found?.weekOrder ?? null;
    }
    return null;
  }, [today, currentMonth.year, currentMonth.month, weeksInMonth]);

  const todayDayOfWeek = useMemo(() => {
    const dowMap = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', ''];
    return dowMap[today.getDay()] ?? null;
  }, [today]);

  const isPastDay = useCallback(
    (dayOfWeek: SchoolDay): boolean => {
      const dowMap: Record<SchoolDay, number> = {
        Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5,
      };
      const targetDow = dowMap[dayOfWeek];
      const dow = today.getDay(); // 0=Sun
      const daysSinceMonday = dow === 0 ? 6 : dow - 1;
      const currentMonday = new Date(today);
      currentMonday.setDate(today.getDate() - daysSinceMonday);
      const targetDate = new Date(currentMonday);
      targetDate.setDate(currentMonday.getDate() + (targetDow - 1));
      return targetDate < today;
    },
    [today]
  );

  const currentWeek = useMemo(
    () => weeks.find((w) => w.weekOrder === selectedWeek) || null,
    [weeks, selectedWeek]
  );

  const itemsByDay = useMemo<Record<SchoolDay, WeeklyScheduleDetail[]>>(() => {
    const empty: Record<SchoolDay, WeeklyScheduleDetail[]> = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
    };
    if (!currentWeek) return empty;
    const grouped: Record<SchoolDay, WeeklyScheduleDetail[]> = { ...empty };
    for (const item of currentWeek.items || []) {
      const key = item.dayOfWeek as SchoolDay;
      if (grouped[key]) grouped[key].push(item);
    }
    for (const day of SCHOOL_DAYS) {
      grouped[day.key].sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return grouped;
  }, [currentWeek]);

  // ── API calls ────────────────────────────────────────────────────────────

  const fetchMonthlySchedule = useCallback(async () => {
    if (!classId) return;
    setIsLoading(true);
    try {
      const data = await WeeklyScheduleService.getMonthlySchedule(
        classId,
        currentMonth.year,
        currentMonth.month
      );
      setMonthlySchedule(data.monthlySchedule);
      setWeeks(data.weeks || []);
      setMonthTheme(data.monthlySchedule?.monthTheme || '');

      // Sync weekTheme for the currently selected week when reloading data.
      // Do NOT reset selectedWeek here; otherwise the user is forced back to week 1 after every save.
      const current = data.weeks?.find((w) => w.weekOrder === selectedWeek);
      setWeekTheme(current?.weekTheme || '');
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Không thể tải thời khóa biểu';
      showToast(typeof msg === 'string' ? msg : 'Không thể tải thời khóa biểu', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [classId, currentMonth.year, currentMonth.month, showToast]);

  useEffect(() => {
    fetchMonthlySchedule();
  }, [fetchMonthlySchedule]);

  // When selected week changes, sync weekTheme from data
  useEffect(() => {
    const ws = weeks.find((w) => w.weekOrder === selectedWeek);
    setWeekTheme(ws?.weekTheme || '');
  }, [selectedWeek, weeks]);

  const saveMonthlySchedule = useCallback(async () => {
    if (!classId) return;
    if (!monthTheme.trim()) {
      showToast('Vui lòng nhập chủ đề tháng', 'warning');
      return;
    }
    setIsSaving(true);
    try {
      const result = await WeeklyScheduleService.upsertMonthlySchedule(classId, {
        month: currentMonth.month,
        year: currentMonth.year,
        monthTheme,
      });
      showToast(
        result.action === 'Created' ? 'Đã tạo thời khóa biểu tháng' : 'Đã cập nhật thời khóa biểu tháng'
      );
      await fetchMonthlySchedule();
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Không thể lưu thông tin tháng';
      showToast(typeof msg === 'string' ? msg : 'Không thể lưu thông tin tháng', 'error');
    } finally {
      setIsSaving(false);
    }
  }, [classId, currentMonth.month, currentMonth.year, monthTheme, showToast, fetchMonthlySchedule]);

  const saveWeeklySchedule = useCallback(async () => {
    if (!monthlySchedule?.monthlyScheduleId) {
      showToast('Vui lòng lưu thông tin tháng trước', 'warning');
      return;
    }
    if (!weekTheme.trim()) {
      showToast('Vui lòng nhập chủ đề tuần', 'warning');
      return;
    }
    const items: WeeklyScheduleDetail[] = [];
    for (const day of SCHOOL_DAYS) {
      for (const item of itemsByDay[day.key]) {
        items.push({
          dayOfWeek: day.key,
          startTime: item.startTime,
          endTime: item.endTime,
          activityName: item.activityName,
          activityType: item.activityType,
          details: item.details ?? null,
          location: item.location ?? null,
        });
      }
    }
    setIsSaving(true);
    try {
      await WeeklyScheduleService.saveWeeklySchedule(classId, {
        monthlyScheduleId: monthlySchedule.monthlyScheduleId,
        weekOrder: selectedWeek,
        weekTheme,
        items,
      });
      showToast('Đã lưu thời khóa biểu tuần');
      await fetchMonthlySchedule();
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Không thể lưu tuần';
      showToast(typeof msg === 'string' ? msg : 'Không thể lưu tuần', 'error');
    } finally {
      setIsSaving(false);
    }
  }, [
    monthlySchedule,
    weekTheme,
    classId,
    selectedWeek,
    itemsByDay,
    showToast,
    fetchMonthlySchedule,
  ]);

  // ── Local items manipulation (only applied on Save) ──────────────────────
  const addItem = useCallback(
    (day: SchoolDay, item: Omit<WeeklyScheduleDetail, 'scheduleDetailId' | 'weeklyScheduleId'>) => {
      const ws = weeks.find((w) => w.weekOrder === selectedWeek);
      const existing = ws?.items || [];
      const newItem: WeeklyScheduleDetail = {
        ...item,
        scheduleDetailId: -Math.floor(Math.random() * 1000000) - 1,
      };
      const updatedWs: WeeklySchedule = {
        weeklyScheduleId: ws?.weeklyScheduleId,
        monthlyScheduleId: monthlySchedule?.monthlyScheduleId || 0,
        weekOrder: selectedWeek,
        weekTheme,
        items: [...existing, newItem],
      };
      const updatedWeeks = weeks.filter((w) => w.weekOrder !== selectedWeek);
      setWeeks([...updatedWeeks, updatedWs].sort((a, b) => a.weekOrder - b.weekOrder));
    },
    [weeks, selectedWeek, weekTheme, monthlySchedule]
  );

  const removeItem = useCallback(
    (day: SchoolDay, scheduleDetailId: number) => {
      const ws = weeks.find((w) => w.weekOrder === selectedWeek);
      if (!ws) return;
      const updatedItems = ws.items.filter((it) => it.scheduleDetailId !== scheduleDetailId);
      const updatedWs: WeeklySchedule = { ...ws, items: updatedItems };
      const updatedWeeks = weeks.filter((w) => w.weekOrder !== selectedWeek);
      setWeeks([...updatedWeeks, updatedWs].sort((a, b) => a.weekOrder - b.weekOrder));
    },
    [weeks, selectedWeek]
  );

  const updateItem = useCallback(
    (day: SchoolDay, scheduleDetailId: number, updates: Partial<Omit<WeeklyScheduleDetail, 'scheduleDetailId' | 'weeklyScheduleId'>>) => {
      const ws = weeks.find((w) => w.weekOrder === selectedWeek);
      if (!ws) return;
      const updatedItems = ws.items.map((it) =>
        it.scheduleDetailId === scheduleDetailId ? { ...it, ...updates } : it
      );
      const updatedWs: WeeklySchedule = { ...ws, items: updatedItems };
      const updatedWeeks = weeks.filter((w) => w.weekOrder !== selectedWeek);
      setWeeks([...updatedWeeks, updatedWs].sort((a, b) => a.weekOrder - b.weekOrder));
    },
    [weeks, selectedWeek]
  );

  // ── Month navigation ─────────────────────────────────────────────────────
  const prevMonth = useCallback(() => {
    setCurrentMonth((prev) =>
      prev.month === 1 ? { month: 12, year: prev.year - 1 } : { ...prev, month: prev.month - 1 }
    );
  }, []);
  const nextMonth = useCallback(() => {
    setCurrentMonth((prev) =>
      prev.month === 12 ? { month: 1, year: prev.year + 1 } : { ...prev, month: prev.month + 1 }
    );
  }, []);

  // ── CSV upload ───────────────────────────────────────────────────────────
  const openCSVPreview = useCallback(
    async (file: File) => {
      if (!monthlySchedule?.monthlyScheduleId) {
        showToast('Vui lòng lưu thông tin tháng trước khi upload CSV', 'warning');
        return;
      }
      try {
        const result = await WeeklyScheduleService.previewCSV(classId, file);
        setCsvPreview(result);
        setCsvModalOpen(true);
      } catch (error: any) {
        const msg = error?.response?.data?.message || 'Không thể đọc CSV';
        showToast(typeof msg === 'string' ? msg : 'Không thể đọc CSV', 'error');
      }
    },
    [classId, monthlySchedule, showToast]
  );

  const confirmImportCSV = useCallback(
    async (file: File) => {
      if (!monthlySchedule?.monthlyScheduleId) return;
      setIsImporting(true);
      try {
        const result = await WeeklyScheduleService.importCSV(
          classId,
          monthlySchedule.monthlyScheduleId,
          file
        );
        if (result.failed > 0) {
          showToast(
            `Import xong: ${result.success} dòng OK, ${result.failed} lỗi. ${result.errors[0] || ''}`,
            'warning'
          );
        } else {
          showToast(`Import thành công ${result.success} dòng`);
        }
        clearCsvPreview();
        await fetchMonthlySchedule();
      } catch (error: any) {
        const msg = error?.response?.data?.message || 'Không thể import CSV';
        showToast(typeof msg === 'string' ? msg : 'Không thể import CSV', 'error');
      } finally {
        setIsImporting(false);
      }
    },
    [classId, monthlySchedule, showToast, fetchMonthlySchedule, clearCsvPreview]
  );

  return {
    classId,
    className,
    currentMonth,
    setCurrentMonth,
    prevMonth,
    nextMonth,
    monthTheme,
    setMonthTheme,
    monthlySchedule,
    weeks,
    weeksInMonth,
    selectedWeek,
    setSelectedWeek,
    weekTheme,
    setWeekTheme,
    currentWeek,
    itemsByDay,
    todayWeekOrder,
    todayDayOfWeek,
    isPastDay,
    isLoading,
    isSaving,
    toasts,
    saveMonthlySchedule,
    saveWeeklySchedule,
    addItem,
    removeItem,
    updateItem,
    csvPreview,
    csvModalOpen,
    setCsvModalOpen,
    isImporting,
    openCSVPreview,
    confirmImportCSV,
    clearCsvPreview,
    refresh: fetchMonthlySchedule,
  };
};