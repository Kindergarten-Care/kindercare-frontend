'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useStudent } from '@/contexts/StudentContext';
import { leaveRequestService } from '@/services/LeaveRequest/LeaveRequestService';
import { kcToast } from '@kindercare/ui';

// Must match REASONS[0].value in index.tsx — kept in sync manually since it's the API-facing default.
const DEFAULT_REASON = 'Bé bị ốm';

interface UseLeaveRequestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

const getLocalDateString = (offsetDays = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const date = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${date}`;
};

export const useLeaveRequestPopup = ({ isOpen, onClose, onSubmitSuccess }: UseLeaveRequestPopupProps) => {
  const t = useTranslations('Dashboard');
  const { activeStudent } = useStudent();
  const [isLongLeave, setIsLongLeave] = useState<boolean>(false);
  const [singleDate, setSingleDate] = useState<string>(getLocalDateString(0));
  const [startDate, setStartDate] = useState<string>(getLocalDateString(0));
  const [endDate, setEndDate] = useState<string>(getLocalDateString(1));
  const [selectedReason, setSelectedReason] = useState<string>(DEFAULT_REASON);
  const [note, setNote] = useState<string>('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [viewYear, setViewYear] = useState<number>(() => {
    const activeDate = isLongLeave ? startDate : singleDate;
    const d = activeDate ? new Date(activeDate) : new Date();
    return isNaN(d.getTime()) ? new Date().getFullYear() : d.getFullYear();
  });
  const [viewMonth, setViewMonth] = useState<number>(() => {
    const activeDate = isLongLeave ? startDate : singleDate;
    const d = activeDate ? new Date(activeDate) : new Date();
    return isNaN(d.getTime()) ? new Date().getMonth() : d.getMonth();
  });

  // Sync viewMonth/viewYear when dates change externally or mode toggles
  useEffect(() => {
    const activeDate = isLongLeave ? startDate : singleDate;
    if (activeDate) {
      const d = new Date(activeDate);
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [singleDate, startDate, isLongLeave]);

  const prevMonth = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleDayClick = (dayNum: number) => {
    const monthStr = String(viewMonth + 1).padStart(2, '0');
    const dayStr = String(dayNum).padStart(2, '0');
    const clickedDateStr = `${viewYear}-${monthStr}-${dayStr}`;

    if (!isLongLeave) {
      setSingleDate(clickedDateStr);
    } else {
      if (!startDate || (startDate && endDate)) {
        setStartDate(clickedDateStr);
        setEndDate('');
      } else {
        if (clickedDateStr < startDate) {
          setStartDate(clickedDateStr);
        } else {
          setEndDate(clickedDateStr);
        }
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!activeStudent) {
      kcToast.error(t('leave.errStudentNotFound'), t('errorTitle'));
      return;
    }

    const fromDateStr = isLongLeave ? startDate : singleDate;
    const toDateStr = isLongLeave ? endDate : singleDate;

    if (!fromDateStr || !toDateStr) {
      kcToast.error(t('leave.errSelectDuration'), t('errorTitle'));
      return;
    }

    // Convert to Unix timestamps in seconds (midnight / end of day in UTC+7)
    const fromTimestamp = Math.floor(new Date(`${fromDateStr}T00:00:00+07:00`).getTime() / 1000);
    const toTimestamp = Math.floor(new Date(`${toDateStr}T23:59:59+07:00`).getTime() / 1000);

    if (isLongLeave && fromTimestamp > toTimestamp) {
      kcToast.error(t('leave.errStartAfterEnd'), t('errorTitle'));
      return;
    }

    setIsSubmitting(true);
    try {
      await leaveRequestService.createLeaveRequest({
        studentId: activeStudent.studentId,
        fromDate: fromTimestamp,
        toDate: toTimestamp,
        reason: selectedReason,
        evidenceUrl: null,
        parentNotes: note.trim() || t('leave.defaultNoteTemplate', { reason: selectedReason }),
      }, attachedFile);

      kcToast.success(t('leave.successMsg'), t('successTitle'));

      // Reset state & close
      setIsLongLeave(false);
      setSingleDate(getLocalDateString(0));
      setStartDate(getLocalDateString(0));
      setEndDate(getLocalDateString(1));
      setSelectedReason(DEFAULT_REASON);
      setNote('');
      setAttachedFile(null);
      onSubmitSuccess?.();
      onClose();
    } catch (err: any) {
      console.error('Failed to create leave request:', err);
      kcToast.error(err.message || t('leave.errSubmitFailed'), t('errorTitle'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  const prefixBlanks = firstDow === 0 ? 6 : firstDow - 1;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const todayDateObj = new Date();
  const todayStr = `${todayDateObj.getFullYear()}-${String(todayDateObj.getMonth() + 1).padStart(2, '0')}-${String(todayDateObj.getDate()).padStart(2, '0')}`;

  return {
    isLongLeave,
    setIsLongLeave,
    singleDate,
    setSingleDate,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedReason,
    setSelectedReason,
    note,
    setNote,
    attachedFile,
    isSubmitting,
    fileInputRef,
    viewYear,
    viewMonth,
    prevMonth,
    nextMonth,
    handleDayClick,
    handleFileChange,
    handleTriggerUpload,
    handleRemoveFile,
    handleSubmit,
    firstDow,
    prefixBlanks,
    daysInMonth,
    todayStr,
  };
};
