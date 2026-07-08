'use client';

import { useState, useCallback, useMemo } from 'react';
import { useTeacherClasses } from '@/hooks/useTeacherQueries';
import * as WeeklyScheduleService from '@/services/weeklySchedule/WeeklyScheduleService';
import type { MonthlySchedule, WeeklySchedule, WeeklyScheduleDetail, WeekInfo, SchoolDay, ActivityType } from '@/config/types/weeklySchedule';

interface Toast {
  id: string;
  text: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
}

interface EditingItem {
  scheduleDetailId?: number;
  dayOfWeek: SchoolDay;
  startTime: string;
  endTime: string;
  activityName: string;
  activityType: ActivityType;
  details: string;
  location: string;
  orderIndex: number;
}

const SCHOOL_DAYS: { key: SchoolDay; label: string; short: string }[] = [
  { key: 'Monday', label: 'Thứ 2', short: 'T2' },
  { key: 'Tuesday', label: 'Thứ 3', short: 'T3' },
  { key: 'Wednesday', label: 'Thứ 4', short: 'T4' },
  { key: 'Thursday', label: 'Thứ 5', short: 'T5' },
  { key: 'Friday', label: 'Thứ 6', short: 'T6' },
];

// ─── Week Calculation ──────────────────────────────────────────────────────────

/**
 * Calculate all weeks in a given month.
 * Week 1 = first Monday of the month (or day 1 if it's Monday),
 * ends on the following Friday.
 * Each subsequent week starts the next Monday.
 */
export function getWeeksInMonth(year: number, month: number): WeekInfo[] {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);
  const weeks: WeekInfo[] = [];

  // Find first Monday
  let dayOfWeek = firstDayOfMonth.getDay(); // 0=Sun, 1=Mon, ...
  let daysUntilMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
  let currentMonday = new Date(year, month - 1, 1 + daysUntilMonday);

  let weekNum = 1;
  while (currentMonday <= lastDayOfMonth && weekNum <= 5) {
    const friday = new Date(currentMonday);
    friday.setDate(currentMonday.getDate() + 4);
    const endDate = friday > lastDayOfMonth ? lastDayOfMonth : friday;

    const pad = (n: number) => String(n).padStart(2, '0');
    const label = `Tuần ${weekNum}: ${pad(currentMonday.getDate())}/${pad(month)} - ${pad(endDate.getDate())}/${pad(month)}/${year}`;

    weeks.push({ order: weekNum, startDate: new Date(currentMonday), endDate, label });
    weekNum++;
    currentMonday = new Date(friday);
    currentMonday.setDate(friday.getDate() + 3); // next Monday
  }

  return weeks;
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export const useWeeklySchedule = (activeClassId?: number) => {
  const { data: classes } = useTeacherClasses();
  const activeClass = activeClassId
    ? classes?.find(c => c.classId === activeClassId) || classes?.[0] || null
    : (classes && classes.length > 0 ? classes[0] : null);
  const classId = activeClass?.classId || 1;

  // Current selected month/year
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { month: now.getMonth() + 1, year: now.getFullYear() };
  });

  // Monthly schedule state
  const [monthlySchedule, setMonthlySchedule] = useState<MonthlySchedule | null>(null);
  const [selectedWeekOrder, setSelectedWeekOrder] = useState<number>(1);
  const [weekTheme, setWeekTheme] = useState<string>('');

  // Loading / saving
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Item modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<EditingItem | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  // CSV modal state
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [csvPreview, setCsvPreview] = useState<WeeklyScheduleService.CSVPreviewResult | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Computed: weeks in current selected month
  const weeksInMonth = useMemo<WeekInfo[]>(() => {
    return getWeeksInMonth(currentMonth.year, currentMonth.month);
  }, [currentMonth.year, currentMonth.month]);

  // Computed: current selected week schedule (from monthlySchedule)
  const currentWeekSchedule = useMemo<WeeklySchedule | undefined>(() => {
    return monthlySchedule?.weeks?.find(w => w.weekOrder === selectedWeekOrder);
  }, [monthlySchedule, selectedWeekOrder]);

  // Computed: items grouped by day for current week
  const itemsByDay = useMemo<Record<SchoolDay, WeeklyScheduleDetail[]>>(() => {
    const empty: Record<SchoolDay, WeeklyScheduleDetail[]> = {
      Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: []
    };
    if (!currentWeekSchedule?.items) return empty;

    const grouped = { ...empty };
    for (const item of currentWeekSchedule.items) {
      const key = item.dayOfWeek as SchoolDay;
      if (grouped[key]) {
        grouped[key].push(item);
      }
    }
    for (const day of SCHOOL_DAYS) {
      grouped[day.key].sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return grouped;
  }, [currentWeekSchedule]);

  // Toast helpers
  const showToast = useCallback((text: string, variant: Toast['variant'] = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, text, variant }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  // Fetch full monthly schedule
  const fetchMonthlySchedule = useCallback(async () => {
    if (!classId) return;
    console.log('[DEBUG] fetchMonthlySchedule called with:', { classId, year: currentMonth.year, month: currentMonth.month });
    console.log('[DEBUG] classId type:', typeof classId, 'value:', classId);
    setIsLoading(true);
    try {
      const data: any = await WeeklyScheduleService.getMonthlySchedule(classId, currentMonth.year, currentMonth.month);
      console.log('[DEBUG] fetchMonthlySchedule RAW response:', JSON.stringify(data, null, 2));
      console.log('[DEBUG] fetchMonthlySchedule result.monthlyScheduleId:', data?.monthlyScheduleId);
      setMonthlySchedule(data);
      // Auto-select first week order if MS exists but no week selected yet
      if (data?.weeks && data.weeks.length > 0 && selectedWeekOrder === 1) {
        const firstWeek = data.weeks[0];
        setSelectedWeekOrder(firstWeek.weekOrder);
        setWeekTheme(firstWeek.weekTheme || '');
      }
    } catch (error) {
      console.error('Failed to fetch monthly schedule:', error);
      showToast('Không thể tải thời khóa biểu', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [classId, currentMonth.year, currentMonth.month, selectedWeekOrder, showToast]);

  // Upsert monthly schedule (creates MS record with ApprovedStatus=0)
  const saveMonthlySchedule = useCallback(async (monthTheme: string) => {
    if (!classId) return;
    console.log('[DEBUG] saveMonthlySchedule called with:', { classId, month: currentMonth.month, year: currentMonth.year, monthTheme });
    console.log('[DEBUG] classId type:', typeof classId, 'value:', classId);
    setIsSaving(true);
    try {
      const result: any = await WeeklyScheduleService.upsertMonthlySchedule(classId, {
        month: currentMonth.month,
        year: currentMonth.year,
        monthTheme,
      });
      console.log('[DEBUG] upsertMonthlySchedule response:', result);
      showToast(result.action === 'Created' ? 'Đã tạo thời khóa biểu tháng' : 'Đã cập nhật thời khóa biểu tháng');
      console.log('[DEBUG] Calling fetchMonthlySchedule after save...');
      await fetchMonthlySchedule();
      return result;
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Không thể lưu thông tin tháng';
      showToast(Array.isArray(msg) ? msg.join('; ') : msg, 'error');
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [classId, currentMonth, fetchMonthlySchedule, showToast]);

  // Save a week's items (upsert WS + WSD)
  const saveWeek = useCallback(async () => {
    console.log('[DEBUG] saveWeek - monthlySchedule:', monthlySchedule);
    if (!monthlySchedule) {
      showToast('Vui lòng lưu thông tin tháng trước', 'warning');
      return;
    }
    if (isLoading) {
      showToast('Đang tải dữ liệu, vui lòng đợi', 'warning');
      return;
    }
    setIsSaving(true);
    try {
      const result = await WeeklyScheduleService.saveWeeklySchedule(classId, {
        monthlyScheduleId: monthlySchedule.monthlyScheduleId,
        weekOrder: selectedWeekOrder,
        weekTheme,
        items: currentWeekSchedule?.items || [],
      });
      showToast(result.action === 'Created' ? 'Đã tạo thời khóa biểu tuần' : 'Đã cập nhật thời khóa biểu tuần');
      await fetchMonthlySchedule();
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Không thể lưu tuần';
      showToast(Array.isArray(msg) ? msg.join('; ') : msg, 'error');
    } finally {
      setIsSaving(false);
    }
  }, [classId, monthlySchedule, selectedWeekOrder, weekTheme, fetchMonthlySchedule, showToast]);

  // Submit week for approval
  const submitWeek = useCallback(async () => {
    if (!currentWeekSchedule) return;
    setIsSaving(true);
    try {
      await WeeklyScheduleService.submitWeeklySchedule(classId, currentWeekSchedule.weeklyScheduleId);
      showToast('Đã gửi duyệt thành công');
      await fetchMonthlySchedule();
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Không thể gửi duyệt';
      showToast(Array.isArray(msg) ? msg.join('; ') : msg, 'error');
    } finally {
      setIsSaving(false);
    }
  }, [classId, currentWeekSchedule, fetchMonthlySchedule, showToast]);

  // Withdraw submitted week
  const withdrawWeek = useCallback(async () => {
    if (!currentWeekSchedule) return;
    setIsSaving(true);
    try {
      await WeeklyScheduleService.withdrawWeeklySchedule(classId, currentWeekSchedule.weeklyScheduleId);
      showToast('Đã rút lại thành công');
      await fetchMonthlySchedule();
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Không thể rút lại';
      showToast(Array.isArray(msg) ? msg.join('; ') : msg, 'error');
    } finally {
      setIsSaving(false);
    }
  }, [classId, currentWeekSchedule, fetchMonthlySchedule, showToast]);

  // Delete a week
  const deleteWeek = useCallback(async (wsId: number) => {
    setIsSaving(true);
    try {
      await WeeklyScheduleService.deleteWeeklySchedule(classId, wsId);
      showToast('Đã xóa thời khóa biểu tuần');
      await fetchMonthlySchedule();
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Không thể xóa tuần';
      showToast(Array.isArray(msg) ? msg.join('; ') : msg, 'error');
    } finally {
      setIsSaving(false);
    }
  }, [classId, fetchMonthlySchedule, showToast]);

  // Open add item modal
  const openAddItem = useCallback((day: SchoolDay) => {
    setEditingItemId(null);
    setEditItem({
      dayOfWeek: day,
      startTime: '09:00',
      endTime: '10:00',
      activityName: '',
      activityType: 'study',
      details: '',
      location: '',
      orderIndex: (itemsByDay[day]?.length || 0) + 1,
    });
    setModalOpen(true);
  }, [itemsByDay]);

  // Open edit item modal
  const openEditItem = useCallback((item: WeeklyScheduleDetail) => {
    setEditingItemId(item.scheduleDetailId || null);
    setEditItem({
      scheduleDetailId: item.scheduleDetailId,
      dayOfWeek: item.dayOfWeek as SchoolDay,
      startTime: item.startTime.slice(0, 5),
      endTime: item.endTime.slice(0, 5),
      activityName: item.activityName,
      activityType: item.activityType,
      details: item.details || '',
      location: item.location || '',
      orderIndex: item.orderIndex || 0,
    });
    setModalOpen(true);
  }, []);

  // Save single item
  const saveItem = useCallback(async () => {
    if (!editItem || !editItem.activityName.trim()) {
      showToast('Vui lòng nhập tên hoạt động');
      return;
    }
    if (!currentWeekSchedule) {
      showToast('Vui lòng lưu tuần trước khi thêm hoạt động', 'warning');
      return;
    }
    setIsSaving(true);
    try {
      const newItem: Omit<WeeklyScheduleDetail, 'scheduleDetailId'> = {
        dayOfWeek: editItem.dayOfWeek,
        startTime: editItem.startTime + ':00',
        endTime: editItem.endTime + ':00',
        activityName: editItem.activityName,
        activityType: editItem.activityType,
        details: editItem.details || null,
        location: editItem.location || null,
        orderIndex: editItem.orderIndex,
      };
      const existingItems = currentWeekSchedule.items.filter(
        i => editingItemId ? i.scheduleDetailId !== editingItemId : true
      );
      const allItems = [
        ...existingItems,
        { ...newItem, scheduleDetailId: editingItemId || undefined }
      ];

      await WeeklyScheduleService.saveWeeklySchedule(classId, {
        monthlyScheduleId: currentWeekSchedule.monthlyScheduleId,
        weekOrder: currentWeekSchedule.weekOrder,
        weekTheme: currentWeekSchedule.weekTheme,
        items: allItems,
      });

      showToast(editingItemId ? 'Đã cập nhật hoạt động' : 'Đã thêm hoạt động');
      setModalOpen(false);
      setEditItem(null);
      setEditingItemId(null);
      await fetchMonthlySchedule();
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Không thể lưu hoạt động';
      showToast(Array.isArray(msg) ? msg.join('; ') : msg, 'error');
    } finally {
      setIsSaving(false);
    }
  }, [editItem, editingItemId, currentWeekSchedule, classId, fetchMonthlySchedule, showToast]);

  // Delete single item
  const deleteItem = useCallback(async (scheduleDetailId: number) => {
    if (!currentWeekSchedule) return;
    setIsSaving(true);
    try {
      const remaining = currentWeekSchedule.items.filter(i => i.scheduleDetailId !== scheduleDetailId);
      await WeeklyScheduleService.saveWeeklySchedule(classId, {
        monthlyScheduleId: currentWeekSchedule.monthlyScheduleId,
        weekOrder: currentWeekSchedule.weekOrder,
        weekTheme: currentWeekSchedule.weekTheme,
        items: remaining,
      });
      showToast('Đã xóa hoạt động');
      await fetchMonthlySchedule();
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Không thể xóa hoạt động';
      showToast(Array.isArray(msg) ? msg.join('; ') : msg, 'error');
    } finally {
      setIsSaving(false);
    }
  }, [classId, currentWeekSchedule, fetchMonthlySchedule, showToast]);

  // CSV preview
  const previewCSV = useCallback(async (file: File) => {
    if (!currentWeekSchedule) return;
    try {
      const preview = await WeeklyScheduleService.previewCSV(classId, currentWeekSchedule.weeklyScheduleId, file);
      setCsvPreview(preview);
    } catch (error) {
      showToast('Không thể đọc file CSV', 'error');
    }
  }, [classId, currentWeekSchedule, showToast]);

  // CSV import
  const importCSV = useCallback(async (file: File) => {
    if (!currentWeekSchedule) return;
    setIsImporting(true);
    try {
      const result = await WeeklyScheduleService.importCSV(classId, currentWeekSchedule.weeklyScheduleId, file);
      if (result.success > 0) {
        showToast(`Import thành công ${result.success} tuần`, 'success');
        setCsvModalOpen(false);
        setCsvPreview(null);
        await fetchMonthlySchedule();
      } else {
        showToast('Import thất bại: ' + result.errors.join(', '), 'error');
      }
    } catch (error) {
      showToast('Import thất bại', 'error');
    } finally {
      setIsImporting(false);
    }
  }, [classId, currentWeekSchedule, fetchMonthlySchedule, showToast]);

  // Month navigation
  const prevMonth = useCallback(() => {
    setCurrentMonth(prev => {
      if (prev.month === 1) return { month: 12, year: prev.year - 1 };
      return { month: prev.month - 1, year: prev.year };
    });
    setSelectedWeekOrder(1);
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentMonth(prev => {
      if (prev.month === 12) return { month: 1, year: prev.year + 1 };
      return { month: prev.month + 1, year: prev.year };
    });
    setSelectedWeekOrder(1);
  }, []);

  // When selected week order changes, sync weekTheme from existing data
  const handleSelectWeek = useCallback((order: number) => {
    setSelectedWeekOrder(order);
    const existingWeek = monthlySchedule?.weeks?.find(w => w.weekOrder === order);
    setWeekTheme(existingWeek?.weekTheme || '');
  }, [monthlySchedule]);

  // Status helpers
  const weekStatus = currentWeekSchedule?.status ?? 0;
  const canSubmit = weekStatus === 0;
  const canWithdraw = weekStatus === 1;

  return {
    // Data
    classId,
    monthlySchedule,
    weeksInMonth,
    selectedWeekOrder,
    setSelectedWeekOrder: handleSelectWeek,
    weekTheme,
    setWeekTheme,
    currentWeekSchedule,
    itemsByDay,
    currentMonth,

    // Status
    isLoading,
    isSaving,
    canSubmit,
    canWithdraw,
    weekStatus,

    // Modal
    modalOpen,
    editItem,
    editingItemId,
    csvModalOpen,
    csvPreview,
    isImporting,

    // Toasts
    toasts,

    // Actions
    fetchMonthlySchedule,
    saveMonthlySchedule,
    saveWeek,
    submitWeek,
    withdrawWeek,
    deleteWeek,
    openAddItem,
    openEditItem,
    closeModal: () => { setModalOpen(false); setEditItem(null); setEditingItemId(null); },
    saveItem,
    deleteItem,
    updateEditItem: (patch: Partial<EditingItem>) => {
      setEditItem(prev => prev ? { ...prev, ...patch } : null);
    },
    openCsvModal: () => { setCsvPreview(null); setCsvModalOpen(true); },
    closeCsvModal: () => { setCsvModalOpen(false); setCsvPreview(null); },
    previewCSV,
    importCSV,
    downloadCSVTemplate: (order: number) => WeeklyScheduleService.downloadCSVTemplate(order),
    showToast,

    // Navigation
    prevMonth,
    nextMonth,

    // Constants
    SCHOOL_DAYS,
  };
};
