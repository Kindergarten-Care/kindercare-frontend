'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useTeacherClasses } from '@/hooks/useTeacherQueries';
import * as WeeklyScheduleService from '@/services/weeklySchedule/WeeklyScheduleService';
import type { WeeklyScheduleTemplate, WeeklyScheduleItem, DayOfWeek, SchoolDay, ActivityType } from '@/config/types/weeklySchedule';

interface Toast {
  id: string;
  text: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
}

interface EditingItem {
  itemId?: number;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  activityName: string;
  activityType: ActivityType;
  details: string;
  location: string;
  orderIndex: number;
}

const DAYS: { key: SchoolDay; label: string; short: string }[] = [
  { key: 'Monday', label: 'Thứ 2', short: 'T2' },
  { key: 'Tuesday', label: 'Thứ 3', short: 'T3' },
  { key: 'Wednesday', label: 'Thứ 4', short: 'T4' },
  { key: 'Thursday', label: 'Thứ 5', short: 'T5' },
  { key: 'Friday', label: 'Thứ 6', short: 'T6' },
];

// Strip server-managed fields. The BE Joi schema for weekly schedule items
// only whitelists { dayOfWeek, startTime, endTime, activityName, activityType,
// details, location, orderIndex } and rejects itemId/templateId/createdAt/updatedAt.
const toServerItem = (item: Partial<WeeklyScheduleItem> & {
  startTime: string;
  endTime: string;
}): WeeklyScheduleItem => ({
  dayOfWeek: item.dayOfWeek as DayOfWeek,
  startTime: item.startTime,
  endTime: item.endTime,
  activityName: item.activityName as string,
  activityType: item.activityType as ActivityType,
  details: item.details || null,
  location: item.location || null,
  orderIndex: item.orderIndex as number,
});

export const useWeeklySchedule = (className?: string, activeClassId?: number) => {
  const { data: classes } = useTeacherClasses();
  // If activeClassId is provided, use it; otherwise fallback to first class
  const activeClass = activeClassId
    ? classes?.find(c => c.classId === activeClassId) || classes?.[0] || null
    : (classes && classes.length > 0 ? classes[0] : null);
  const currentClassName = className || activeClass?.displayName || 'Lớp Mầm 1';
  const classId = activeClass?.classId || 1;
  // Get yearId from active class (provided by backend)
  const yearId = activeClass?.yearId || 1;

  // State
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { month: now.getMonth() + 1, year: now.getFullYear() };
  });
  const [templates, setTemplates] = useState<WeeklyScheduleTemplate[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<EditingItem | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [csvPreview, setCsvPreview] = useState<WeeklyScheduleService.CSVPreviewResult | null>(null);
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isImportLocked, setIsImportLocked] = useState(false);
  const [importLockReason, setImportLockReason] = useState<string | null>(null);
  const [reminder, setReminder] = useState<{ shouldRemind: boolean; message: string } | null>(null);
  const [importHistory, setImportHistory] = useState<WeeklyScheduleService.ImportHistoryResult | null>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<ActivityType | 'all'>('all');

  // Change request modal state
  const [submitChangeModalOpen, setSubmitChangeModalOpen] = useState(false);
  const [withdrawChangeModalOpen, setWithdrawChangeModalOpen] = useState(false);
  const [isSubmittingChange, setIsSubmittingChange] = useState(false);
  const [isWithdrawingChange, setIsWithdrawingChange] = useState(false);

  // TODO: yearId should be fetched from API (academic year context)
  // Currently using yearId from activeClass (provided by backend)

  // Toast helpers
  const showToast = useCallback((text: string, variant: Toast['variant'] = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, text, variant }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  // Fetch import status
  const fetchImportStatus = useCallback(async () => {
    if (!activeClass?.classId) return;

    try {
      const status = await WeeklyScheduleService.getImportStatus(
        activeClass.classId,
        currentMonth.year,
        currentMonth.month
      );
      setIsImportLocked(status.isLocked);
      setImportLockReason(status.lockReason);
    } catch (error) {
      console.error('Failed to fetch import status:', error);
    }
  }, [activeClass?.classId, currentMonth.month, currentMonth.year]);

  // Fetch reminder
  const fetchReminder = useCallback(async () => {
    if (!activeClass?.classId) return;

    try {
      const reminderData = await WeeklyScheduleService.getScheduleReminder(
        activeClass.classId,
        currentMonth.year,
        currentMonth.month
      );
      setReminder({
        shouldRemind: reminderData.shouldRemind,
        message: reminderData.message
      });
    } catch (error) {
      console.error('Failed to fetch reminder:', error);
    }
  }, [activeClass?.classId, currentMonth.month, currentMonth.year]);

  // Fetch import history
  const fetchImportHistory = useCallback(async () => {
    if (!activeClass?.classId) return;

    try {
      const historyData = await WeeklyScheduleService.getImportHistory(
        activeClass.classId,
        currentMonth.year,
        currentMonth.month
      );
      setImportHistory(historyData);
    } catch (error) {
      console.error('Failed to fetch import history:', error);
    }
  }, [activeClass?.classId, currentMonth.month, currentMonth.year]);

  // Open history modal
  const openHistoryModal = useCallback(async () => {
    await fetchImportHistory();
    setHistoryModalOpen(true);
  }, [fetchImportHistory]);

  // Fetch templates for current month
  const fetchTemplates = useCallback(async () => {
    if (!activeClass?.classId) return;

    setIsLoading(true);
    try {
      const data = await WeeklyScheduleService.getWeeklyScheduleTemplates(
        activeClass.classId,
        currentMonth.year,
        currentMonth.month
      );
      setTemplates(data || []);

      // Also fetch import status and reminder
      await Promise.all([fetchImportStatus(), fetchReminder()]);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
      showToast('Không thể tải thời khóa biểu', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [activeClass?.classId, currentMonth.month, currentMonth.year, showToast, fetchImportStatus, fetchReminder]);

  // Load templates on mount and when month changes
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  // Get current week template
  const currentTemplate = useMemo(() => {
    return templates.find(t => t.weekNumber === selectedWeek);
  }, [templates, selectedWeek]);

  // Group items by day for current week
  const itemsByDay = useMemo<Record<SchoolDay, WeeklyScheduleItem[]>>(() => {
    const empty: Record<SchoolDay, WeeklyScheduleItem[]> = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
    };
    if (!currentTemplate?.items) return empty;

    const grouped = { ...empty };

    for (const item of currentTemplate.items) {
      const dayKey = item.dayOfWeek as SchoolDay;
      if (grouped[dayKey]) {
        grouped[dayKey].push(item);
      }
    }

    // Sort by start time
    for (const day of DAYS) {
      grouped[day.key].sort((a, b) => a.startTime.localeCompare(b.startTime));
    }

    // Apply search and type filter
    if (searchQuery || filterType !== 'all') {
      const query = searchQuery.toLowerCase();
      for (const day of DAYS) {
        grouped[day.key] = grouped[day.key].filter(item => {
          const matchesSearch = !searchQuery ||
            item.activityName.toLowerCase().includes(query) ||
            (item.details && item.details.toLowerCase().includes(query)) ||
            (item.location && item.location.toLowerCase().includes(query));
          const matchesType = filterType === 'all' || item.activityType === filterType;
          return matchesSearch && matchesType;
        });
      }
    }

    return grouped;
  }, [currentTemplate, searchQuery, filterType]);

  // Month navigation
  const prevMonth = useCallback(() => {
    setCurrentMonth(prev => {
      if (prev.month === 1) {
        return { month: 12, year: prev.year - 1 };
      }
      return { month: prev.month - 1, year: prev.year };
    });
    setSelectedWeek(1);
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentMonth(prev => {
      if (prev.month === 12) {
        return { month: 1, year: prev.year + 1 };
      }
      return { month: prev.month + 1, year: prev.year };
    });
    setSelectedWeek(1);
  }, []);

  // Open modal to add new item
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

  // Open modal to edit item
  const openEditItem = useCallback((item: WeeklyScheduleItem) => {
    setEditingItemId(item.itemId || null);
    setEditItem({
      itemId: item.itemId,
      dayOfWeek: item.dayOfWeek,
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

  // Save item
  const saveItem = useCallback(async () => {
    if (!editItem || !editItem.activityName.trim()) {
      showToast('Vui lòng nhập tên hoạt động');
      return;
    }

    if (!activeClass?.classId) {
      showToast('Không xác định được lớp học', 'error');
      return;
    }

    if (!editItem.dayOfWeek) {
      showToast('Vui lòng chọn ngày trong tuần', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const itemToSave = toServerItem({
        dayOfWeek: editItem.dayOfWeek,
        startTime: editItem.startTime + ':00',
        endTime: editItem.endTime + ':00',
        activityName: editItem.activityName,
        activityType: editItem.activityType,
        details: editItem.details || null,
        location: editItem.location || null,
        orderIndex: editItem.orderIndex,
      });

      // Resolve week start/end so the BE DTO (which may require them) is satisfied
      const weekDates = getWeekDates(currentMonth.year, currentMonth.month, selectedWeek);

      // If no template exists for this week, create it first
      let templateId = currentTemplate?.templateId;

      const basePayload = {
        yearId,
        month: currentMonth.month,
        year: currentMonth.year,
        weekNumber: selectedWeek,
        weekStartDate: weekDates.start,
        weekEndDate: weekDates.end,
      };

      if (!templateId) {
        // Create template for this week
        const result = await WeeklyScheduleService.saveWeeklyTemplate(activeClass.classId, {
          ...basePayload,
          weekTheme: `Tuần ${selectedWeek}`,
          items: [itemToSave],
        });
        templateId = result.templateId;
      } else {
        // Update existing template with new item
        const allItems = currentTemplate?.items || [];
        const serverItems = allItems.map(toServerItem);
        if (editingItemId) {
          // Update existing item
          const updatedItems = serverItems.map((serverItem, idx) =>
            allItems[idx]?.itemId === editingItemId ? itemToSave : serverItem
          );
          await WeeklyScheduleService.saveWeeklyTemplate(activeClass.classId, {
            ...basePayload,
            items: updatedItems,
          });
        } else {
          // Add new item
          await WeeklyScheduleService.saveWeeklyTemplate(activeClass.classId, {
            ...basePayload,
            items: [...serverItems, itemToSave],
          });
        }
      }

      showToast(editingItemId ? 'Đã cập nhật hoạt động' : 'Đã thêm hoạt động');
      setModalOpen(false);
      setEditItem(null);
      setEditingItemId(null);
      fetchTemplates();
    } catch (error: any) {
      console.error('Failed to save item:', error);
      const serverMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Không thể lưu hoạt động';
      const status = error?.response?.status;
      const fullMsg = status
        ? `[${status}] ${Array.isArray(serverMessage) ? serverMessage.join('; ') : serverMessage}`
        : 'Không thể lưu hoạt động';
      showToast(fullMsg, 'error');
    } finally {
      setIsSaving(false);
    }
  }, [editItem, editingItemId, activeClass?.classId, currentTemplate, currentMonth, selectedWeek, yearId, fetchTemplates, showToast]);

  // Delete item
  const deleteItem = useCallback(async (itemId: number) => {
    if (!activeClass?.classId || !currentTemplate) return;

    try {
      const allItems = currentTemplate.items || [];
      const updatedItems = allItems
        .filter(item => item.itemId !== itemId)
        .map(toServerItem);
      const weekDates = getWeekDates(currentMonth.year, currentMonth.month, selectedWeek);
      await WeeklyScheduleService.saveWeeklyTemplate(activeClass.classId, {
        yearId,
        month: currentMonth.month,
        year: currentMonth.year,
        weekNumber: selectedWeek,
        weekStartDate: weekDates.start,
        weekEndDate: weekDates.end,
        items: updatedItems,
      });
      showToast('Đã xóa hoạt động');
      fetchTemplates();
    } catch (error) {
      console.error('Failed to delete item:', error);
      showToast('Không thể xóa hoạt động', 'error');
    }
  }, [activeClass?.classId, currentTemplate, currentMonth, selectedWeek, yearId, fetchTemplates, showToast]);

  // Submit for approval
  // - For a Draft/RevisionRequested template: submit directly without a reason.
  // - For an Approved template: open the ChangeRequestModal so the teacher
  //   must provide a reason, which the BE stores alongside the snapshot.
  const submitForApproval = useCallback(() => {
    if (!activeClass?.classId || !currentTemplate) return;

    // Check if there are items to submit
    if (!currentTemplate.items || currentTemplate.items.length === 0) {
      showToast('Vui lòng import dữ liệu hoặc thêm hoạt động trước khi gửi duyệt', 'warning');
      return;
    }

    const status = currentTemplate.status;
    if (status === 'Approved') {
      setSubmitChangeModalOpen(true);
      return;
    }

    // Plain Draft submission
    (async () => {
      try {
        await WeeklyScheduleService.submitForApproval(activeClass.classId, currentTemplate.templateId);
        showToast('Đã gửi duyệt thành công');
        fetchTemplates();
      } catch (error: any) {
        console.error('Failed to submit:', error);
        const message = error?.response?.data?.message || 'Không thể gửi duyệt';
        showToast(message);
      }
    })();
  }, [activeClass?.classId, currentTemplate, fetchTemplates, showToast]);

  // Withdraw a pending change request — opens the withdraw modal where the
  // teacher chooses whether to restore the original schedule or keep edits.
  const withdrawTemplate = useCallback(() => {
    if (!activeClass?.classId || !currentTemplate) return;
    setWithdrawChangeModalOpen(true);
  }, [activeClass?.classId, currentTemplate]);

  // Confirm a submit-change request from the modal.
  const confirmSubmitChange = useCallback(async (payload: { reason: string } | { restoreOriginal: boolean }) => {
    if (!activeClass?.classId || !currentTemplate) return;
    if (!('reason' in payload)) return;
    setIsSubmittingChange(true);
    try {
      // Pre-snapshot so we have an "original" even if the modal was opened
      // before the BE created one. The BE endpoint is idempotent.
      await WeeklyScheduleService.snapshotTemplateItems(
        activeClass.classId,
        currentTemplate.templateId,
        payload.reason
      );

      await WeeklyScheduleService.submitChangeRequest(
        activeClass.classId,
        currentTemplate.templateId,
        payload.reason
      );

      showToast('Đã gửi yêu cầu thay đổi, đang chờ Hiệu trưởng duyệt');
      setSubmitChangeModalOpen(false);
      fetchTemplates();
    } catch (error: any) {
      console.error('Failed to submit change request:', error);
      const message = error?.response?.data?.message || 'Không thể gửi yêu cầu thay đổi';
      showToast(message, 'error');
    } finally {
      setIsSubmittingChange(false);
    }
  }, [activeClass?.classId, currentTemplate, fetchTemplates, showToast]);

  // Confirm a withdraw-change request from the modal.
  const confirmWithdrawChange = useCallback(async (payload: { reason: string } | { restoreOriginal: boolean }) => {
    if (!activeClass?.classId || !currentTemplate) return;
    if (!('restoreOriginal' in payload)) return;
    setIsWithdrawingChange(true);
    try {
      // Use the dedicated change-request withdraw endpoint so the snapshot
      // is restored (if requested) and HasPendingChangeRequest is cleared.
      const result = await WeeklyScheduleService.withdrawChangeRequest(
        activeClass.classId,
        currentTemplate.templateId,
        payload.restoreOriginal
      );

      showToast(result.message);
      setWithdrawChangeModalOpen(false);
      fetchTemplates();
    } catch (error: any) {
      console.error('Failed to withdraw change request:', error);
      const message = error?.response?.data?.message || 'Không thể rút yêu cầu';
      showToast(message, 'error');
    } finally {
      setIsWithdrawingChange(false);
    }
  }, [activeClass?.classId, currentTemplate, fetchTemplates, showToast]);

  // Delete entire template
  const deleteTemplate = useCallback(async (templateId: number) => {
    if (!activeClass?.classId) return;

    try {
      await WeeklyScheduleService.deleteTemplate(activeClass.classId, templateId);
      showToast('Đã xóa thời khóa biểu thành công');
      fetchTemplates();
    } catch (error: any) {
      console.error('Failed to delete template:', error);
      const message = error?.response?.data?.message || 'Không thể xóa thời khóa biểu';
      showToast(message);
    }
  }, [activeClass?.classId, fetchTemplates, showToast]);

  // Copy week items
  const copyWeek = useCallback(async (fromWeek: number, toWeek: number) => {
    if (!activeClass?.classId || !currentTemplate) return;

    try {
      const result = await WeeklyScheduleService.copyWeekItems(
        activeClass.classId,
        currentTemplate.templateId,
        toWeek
      );
      showToast(result.message);
      fetchTemplates();
      // Optionally switch to the target week
      setSelectedWeek(toWeek);
    } catch (error: any) {
      console.error('Failed to copy week:', error);
      const message = error?.response?.data?.message || 'Không thể sao chép tuần';
      showToast(message);
    }
  }, [activeClass?.classId, currentTemplate, fetchTemplates, showToast, setSelectedWeek]);

  // Copy day items
  const copyDay = useCallback(async (fromDay: SchoolDay, toDay: SchoolDay) => {
    if (!activeClass?.classId || !currentTemplate) return;

    try {
      const result = await WeeklyScheduleService.copyDayItems(
        activeClass.classId,
        currentTemplate.templateId,
        fromDay,
        toDay
      );
      showToast(result.message);
      fetchTemplates();
    } catch (error: any) {
      console.error('Failed to copy day:', error);
      const message = error?.response?.data?.message || 'Không thể sao chép ngày';
      showToast(message);
    }
  }, [activeClass?.classId, currentTemplate, fetchTemplates, showToast]);

  // CSV Import
  const openCsvImport = useCallback(() => {
    setCsvPreview(null);
    setCsvModalOpen(true);
  }, []);

  const handleCsvPreview = useCallback(async (file: File) => {
    if (!activeClass?.classId) return;

    try {
      const preview = await WeeklyScheduleService.previewCSV(activeClass.classId, file, {
        yearId,
        month: currentMonth.month,
        year: currentMonth.year,
      });
      setCsvPreview(preview);
    } catch (error) {
      console.error('Failed to preview CSV:', error);
      showToast('Không thể đọc file CSV', 'error');
    }
  }, [activeClass?.classId, yearId, currentMonth.month, currentMonth.year, showToast]);

  const handleCsvImport = useCallback(async (file: File) => {
    if (!activeClass?.classId) return;

    setIsImporting(true);
    try {
      const result = await WeeklyScheduleService.importFromCSV(
        activeClass.classId,
        yearId,
        currentMonth.month,
        currentMonth.year,
        file
      );

      const success = result.success ?? 0;
      const failed = result.failed ?? 0;
      const skipped = result.skipped ?? 0;
      const skippedWeeks = result.skippedWeeks ?? [];

      if (success > 0 && skipped > 0) {
        showToast(
          `Đã import ${success} tuần, bỏ qua ${skipped} tuần đã duyệt/đang duyệt`,
          'warning'
        );
        setCsvModalOpen(false);
        setCsvPreview(null);
        fetchTemplates();
      } else if (success > 0) {
        showToast(`Đã import thành công ${success} tuần`, 'success');
        setCsvModalOpen(false);
        setCsvPreview(null);
        fetchTemplates();
      } else if (skipped > 0) {
        const detail = skippedWeeks
          .map((w) => `  • Tuần ${w.weekNumber}: ${w.reason}`)
          .join('\n');
        showToast(
          `Không import được tuần nào — ${skipped} tuần đều không thể ghi đè.\n${detail}`,
          'error'
        );
      } else if (failed > 0) {
        showToast('Import thất bại: ' + (result.errors || []).join(', '), 'error');
      } else {
        showToast('Không có tuần nào được import', 'warning');
      }
    } catch (error) {
      console.error('Failed to import CSV:', error);
      showToast('Không thể import file CSV', 'error');
    } finally {
      setIsImporting(false);
    }
  }, [activeClass?.classId, currentMonth, yearId, fetchTemplates, showToast]);

  // Download CSV template
  const downloadTemplate = useCallback(async () => {
    await WeeklyScheduleService.downloadCSVTemplate(4);
    showToast('Đã tải file mẫu CSV');
  }, [showToast]);

  // Check if template is read-only (only Approved templates are fully locked)
  const isReadOnly = useMemo(() => {
    if (!currentTemplate) return false;
    return currentTemplate.status === 'Approved';
  }, [currentTemplate]);

  // Selected week's date range
  const selectedWeekRange = useMemo(() => {
    return getWeekDateRanges(
      templates,
      currentMonth.year,
      currentMonth.month,
      getMaxWeeksInMonth(currentMonth.year, currentMonth.month)
    ).find(r => r.week === selectedWeek);
  }, [templates, currentMonth.year, currentMonth.month, selectedWeek]);

  // Today's date string (yyyy-mm-dd, local time)
  const todayDateStr = useMemo(() => formatDateStr(new Date()), []);

  // Check if a given day in the current selected week is today / past / future
  const getDayStatus = useCallback((dayKey: SchoolDay): 'past' | 'today' | 'future' => {
    if (!selectedWeekRange) return 'future';
    const d = getDateForDayInWeek(selectedWeekRange.startDate, selectedWeekRange.endDate, dayKey);
    if (!d) return 'future';
    const dStr = formatDateStr(d);
    if (dStr < todayDateStr) return 'past';
    if (dStr === todayDateStr) return 'today';
    return 'future';
  }, [selectedWeekRange, todayDateStr]);

  // A day is editable only if it is in the future.
  // Future days remain editable even when the template has already been
  // Submitted or Approved; the edit will trigger a change request.
  const canEditDay = useCallback((dayOfWeek: SchoolDay): boolean => {
    if (!currentTemplate) return false;
    return getDayStatus(dayOfWeek) === 'future';
  }, [currentTemplate, getDayStatus]);

  // Whether opening the editor should mark a change request (when template
  // is already Submitted/Approved-ish).
  const requiresChangeRequest = useCallback((dayOfWeek: SchoolDay): boolean => {
    if (!currentTemplate) return false;
    // A change request is required when editing a future day on a template
    // that has already been Submitted or Approved.
    if (currentTemplate.status !== 'Submitted' && currentTemplate.status !== 'Approved') {
      return false;
    }
    return getDayStatus(dayOfWeek) === 'future';
  }, [currentTemplate, getDayStatus]);

  // When a teacher opens the editor on a future day of an already-Approved
  // template, capture the live items as a snapshot on the BE so the
  // "original" state is preserved before any edits are saved. Idempotent
  // server-side; safe to call repeatedly.
  const captureChangeRequestSnapshot = useCallback(async (reason: string) => {
    if (!activeClass?.classId || !currentTemplate) return;
    try {
      await WeeklyScheduleService.snapshotTemplateItems(
        activeClass.classId,
        currentTemplate.templateId,
        reason
      );
    } catch (error) {
      console.warn('Failed to capture change-request snapshot', error);
    }
  }, [activeClass?.classId, currentTemplate]);

  // Items share the same rule as their day
  const canEditItem = useCallback((startTime: string, dayOfWeek?: SchoolDay): boolean => {
    if (dayOfWeek) return canEditDay(dayOfWeek);
    return !isReadOnly;
  }, [canEditDay, isReadOnly]);

  // Whether the change for this template has been marked as a pending request.
  // Reads from the BE column instead of a FE-only map so the state survives
  // page reloads and stays in sync across devices.
  const hasPendingChange = useCallback(
    (templateId: number): boolean => {
      const tpl = templates.find(t => t.templateId === templateId);
      return !!tpl?.hasPendingChangeRequest;
    },
    [templates]
  );

  return {
    // Data
    className: currentClassName,
    classId,
    templates,
    currentMonth,
    selectedWeek,
    currentTemplate,
    itemsByDay,
    isLoading,
    isSaving,
    modalOpen,
    editItem,
    editingItemId,
    toasts,
    csvPreview,
    csvModalOpen,
    isImporting,
    isImportLocked,
    importLockReason,
    reminder,
    importHistory,
    historyModalOpen,
    setHistoryModalOpen,
    isReadOnly,
    canEditDay,
    canEditItem,
    getDayStatus,
    requiresChangeRequest,
    hasPendingChange,
    captureChangeRequestSnapshot,
    submitChangeModalOpen,
    setSubmitChangeModalOpen,
    withdrawChangeModalOpen,
    setWithdrawChangeModalOpen,
    isSubmittingChange,
    isWithdrawingChange,
    confirmSubmitChange,
    confirmWithdrawChange,

    // Actions
    fetchTemplates,
    fetchImportStatus,
    fetchReminder,
    fetchImportHistory,
    openHistoryModal,
    setSelectedWeek,
    prevMonth,
    nextMonth,
    openAddItem,
    openEditItem,
    closeModal: () => {
      setModalOpen(false);
      setEditItem(null);
      setEditingItemId(null);
    },
    saveItem,
    updateEditItem: (patch: Partial<EditingItem>) => {
      setEditItem(prev => prev ? { ...prev, ...patch } : null);
    },
    deleteItem,
    deleteTemplate,
    copyWeek,
    copyDay,
    submitForApproval,
    withdrawTemplate,
    openCsvImport,
    closeCsvModal: () => {
      setCsvModalOpen(false);
      setCsvPreview(null);
    },
    closeHistoryModal: () => {
      setHistoryModalOpen(false);
    },
    handleCsvPreview,
    handleCsvImport,
    downloadTemplate,
    showToast,

    // Search and filter
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,

    // Constants
    DAYS,

    // Selected week date range (needed in component for date labels)
    selectedWeekRange,

    // Dynamic week count based on month
    maxWeeksInMonth: getMaxWeeksInMonth(currentMonth.year, currentMonth.month),

    // Week date ranges for UI display
    weekDateRanges: getWeekDateRanges(templates, currentMonth.year, currentMonth.month, getMaxWeeksInMonth(currentMonth.year, currentMonth.month)),

    // For computing date labels in the UI
    getDateForDayInWeek,
  };
};

// Helper: get number of weeks in a month (1-5, capped for kindergarten monthly schedule)
export function getMaxWeeksInMonth(year: number, month: number): number {
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  // Week 1 = days 1-7, Week 2 = 8-14, Week 3 = 15-21, Week 4 = 22-28, Week 5 = 29+
  const weeks = Math.ceil(lastDayOfMonth / 7);
  return Math.min(weeks, 5); // Cap at 5 weeks
}

// Helper: parse a yyyy-mm-dd string to a local-time Date without UTC drift.
// The MySQL DB stores dates as DATE type (no time, no timezone).
// new Date("2026-07-06") interprets the string as UTC midnight → wrong in UTC+7.
// Solution: split and use new Date(y, m-1, d) which is always local.
export function formatDateStr(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Safe parser: converts "yyyy-mm-dd" to a local Date (no UTC drift).
// Used whenever a date string from the DB is passed to the Date constructor.
function parseLocalDate(dateStr: string | null | undefined): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  const [y, m, d] = parts.map(Number);
  if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return null;
  return new Date(y, m - 1, d);
}

// Helper: get Date for a specific SchoolDay in a given week's start..end range
export function getDateForDayInWeek(
  weekStartDate: Date,
  weekEndDate: Date,
  dayKey: SchoolDay
): Date | null {
  const dayIndex: Record<SchoolDay, number> = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
  };
  const offset = dayIndex[dayKey];
  if (offset === undefined) return null;
  const start = new Date(weekStartDate);
  start.setHours(0, 0, 0, 0);
  const result = new Date(start);
  result.setDate(start.getDate() + offset);
  // Clamp to week range
  const end = new Date(weekEndDate);
  end.setHours(0, 0, 0, 0);
  if (result.getTime() > end.getTime()) return null;
  return result;
}

// Helper function to get week dates - based on week number (1=first week of month)
function getWeekDates(year: number, month: number, weekNumber: number): { start: string; end: string } {
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  const pad = (n: number) => String(n).padStart(2, '0');

  // Simple week calculation: Week 1 = days 1-7, Week 2 = 8-14, etc.
  const weekStartDay = (weekNumber - 1) * 7 + 1;
  const weekEndDay = Math.min(weekNumber * 7, lastDayOfMonth);

  return {
    start: `${year}-${pad(month)}-${pad(weekStartDay)}`,
    end: `${year}-${pad(month)}-${pad(weekEndDay)}`,
  };
}

// Helper function to get all week date ranges for a month
function getWeekDateRanges(
  templates: any[],
  year: number,
  month: number,
  maxWeeks: number
): Array<{ week: number; startDate: Date; endDate: Date; startLabel: string; endLabel: string }> {
  const pad = (n: number) => String(n).padStart(2, '0');
  const ranges: Array<{ week: number; startDate: Date; endDate: Date; startLabel: string; endLabel: string }> = [];

  for (let w = 1; w <= maxWeeks; w++) {
    // Prefer weekStartDate/weekEndDate from BE template
    const tpl = templates.find(t => t.weekNumber === w);
    let startDate: Date;
    let endDate: Date;

    if (tpl?.weekStartDate && tpl?.weekEndDate) {
      startDate = parseLocalDate(tpl.weekStartDate)!;
      endDate = parseLocalDate(tpl.weekEndDate)!;
    } else {
      // Fallback: compute from week number
      const lastDayOfMonth = new Date(year, month, 0).getDate();
      const weekStartDay = (w - 1) * 7 + 1;
      const weekEndDay = Math.min(w * 7, lastDayOfMonth);
      startDate = new Date(year, month - 1, weekStartDay);
      endDate = new Date(year, month - 1, weekEndDay);
    }

    ranges.push({
      week: w,
      startDate,
      endDate,
      startLabel: `${pad(startDate.getDate())}/${pad(month)}`,
      endLabel: `${pad(endDate.getDate())}/${pad(month)}`,
    });
  }

  return ranges;
}