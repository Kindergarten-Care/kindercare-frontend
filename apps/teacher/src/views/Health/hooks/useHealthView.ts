import React, { useCallback, useEffect, useState } from 'react';
import { useTeacherClasses, useDetailedStudents } from '@/hooks/queries';
import { useCreateHealthLog, useClassMedicalRequests } from '@/hooks/useHealthQueries';
import { healthService } from '@/services/health/HealthService';
import { StudentDetailedDomainModel } from '@/config/types/student';
import type { MedicationDomainModel } from '@/config/types/health';
import { calculateBMI } from '@/config/types/health';
import { isValidHeightWeight } from '../utils';

export interface ToastItem {
  id: string;
  text: string;
  variant: 'success' | 'error' | 'warning' | 'info';
}

export interface HealthRowState {
  studentId: number;
  height: string;
  weight: string;
  saved: boolean;
  recordId?: number;
}

export function useHealthView() {
  const { data: classes } = useTeacherClasses();
  const [activeClassId, setActiveClassId] = useState<number | string | undefined>(undefined);

  useEffect(() => {
    if (classes && classes.length > 0 && activeClassId === undefined) {
      setActiveClassId(classes[0].classId);
    }
  }, [classes, activeClassId]);

  const { data: studentsData } = useDetailedStudents(activeClassId);
  const students: StudentDetailedDomainModel[] = studentsData?.students ?? [];

  const [termPeriod, setTermPeriod] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [healthRows, setHealthRows] = useState<Map<number, HealthRowState>>(new Map());
  const [savedRows, setSavedRows] = useState<Set<number>>(new Set());
  const [loadingLogs, setLoadingLogs] = useState(false);

  useEffect(() => {
    if (!students || students.length === 0 || !activeClassId) return;

    let cancelled = false;
    (async () => {
      setLoadingLogs(true);
      try {
        const logs = await healthService.getHealthLogs(activeClassId, termPeriod);
        if (cancelled) return;

        const map = new Map<number, HealthRowState>();
        students.forEach((s: StudentDetailedDomainModel) => {
          const existing = logs.find((l: any) => String(l.studentId) === String(s.studentId));
          map.set(s.studentId, {
            studentId: s.studentId,
            height: existing?.height ? String(existing.height) : '',
            weight: existing?.weight ? String(existing.weight) : '',
            saved: !!(existing && existing.recordId),
            recordId: existing?.recordId || undefined,
          });
        });
        setHealthRows(map);
      } catch (err) {
        console.error('Failed to load health logs', err);
      } finally {
        if (!cancelled) setLoadingLogs(false);
      }
    })();
    return () => { cancelled = true; };
  }, [students, activeClassId, termPeriod]);

  const createHealthLog = useCreateHealthLog();

  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const addToast = (text: string, variant: ToastItem['variant'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, text, variant }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const [editingStudentIds, setEditingStudentIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    setEditingStudentIds(new Set());
  }, [activeClassId, termPeriod]);

  const handleSaveRow = async (studentId: number) => {
    const row = healthRows.get(studentId);
    if (!row) return;

    const height = parseFloat(row.height);
    const weight = parseFloat(row.weight);

    if (!isValidHeightWeight(height, weight)) {
      addToast('Chiều cao phải từ 50 - 200 cm, cân nặng phải từ 5 - 150 kg', 'warning');
      return;
    }

    try {
      const payload = { studentId, height, weight };
      let newRecordId = row.recordId;
      if (row.recordId) {
        await healthService.updateHealthLog(activeClassId!, row.recordId, payload);
      } else {
        const log = await healthService.createHealthLog(activeClassId!, studentId, payload, termPeriod);
        newRecordId = (log as any).recordId;
      }

      setHealthRows(prev => {
        const next = new Map(prev);
        const r = next.get(studentId);
        if (r) next.set(studentId, { ...r, saved: true, recordId: newRecordId });
        return next;
      });

      setEditingStudentIds(prev => {
        const next = new Set(prev);
        next.delete(studentId);
        return next;
      });

      setSavedRows(prev => new Set([...prev, studentId]));
      setTimeout(() => {
        setSavedRows(prev => {
          const next = new Set(prev);
          next.delete(studentId);
          return next;
        });
      }, 3000);

      addToast('Lưu chỉ số thành công!', 'success');
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Lỗi không xác định';
      addToast(`Lưu thất bại: ${msg}`, 'error');
    }
  };

  const handleSaveAll = async () => {
    const recordsToSave: Array<{ studentId: number; height: number; weight: number }> = [];

    healthRows.forEach((row, studentId) => {
      const isSaved = row.saved;
      if (!isSaved && row.height && row.weight) {
        const h = parseFloat(row.height);
        const w = parseFloat(row.weight);
        if (isValidHeightWeight(h, w)) {
          recordsToSave.push({ studentId, height: h, weight: w });
        }
      }
    });

    if (recordsToSave.length === 0) {
      addToast('Không có chỉ số mới hợp lệ để lưu. (Chiều cao: 50-200 cm, Cân nặng: 5-150 kg)', 'warning');
      return;
    }

    try {
      await healthService.batchUpdateHealthLogs(activeClassId!, recordsToSave, termPeriod);

      const sids = recordsToSave.map(r => r.studentId);
      setHealthRows(prev => {
        const next = new Map(prev);
        sids.forEach(sid => {
          const row = next.get(sid);
          if (row) {
            next.set(sid, { ...row, saved: true });
          }
        });
        return next;
      });

      setSavedRows(prev => new Set([...prev, ...sids]));
      setTimeout(() => {
        setSavedRows(prev => {
          const next = new Set(prev);
          sids.forEach(sid => next.delete(sid));
          return next;
        });
      }, 3000);

      addToast(`Đã lưu thành công chỉ số cho ${recordsToSave.length} học sinh!`, 'success');
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Lỗi không xác định';
      addToast(`Lưu hàng loạt thất bại: ${msg}`, 'error');
    }
  };

  const getPreviewBMI = useCallback((studentId: number) => {
    const row = healthRows.get(studentId);
    if (!row) return null;
    const h = parseFloat(row.height);
    const w = parseFloat(row.weight);
    if (!h || !w) return null;
    return calculateBMI(h, w);
  }, [healthRows]);

  const [showAllergies, setShowAllergies] = useState(false);
  const [showMedications, setShowMedications] = useState(false);
  const [selectedStudentForAllergy, setSelectedStudentForAllergy] = useState<StudentDetailedDomainModel | null>(null);

  const handleViewAllergies = (student: StudentDetailedDomainModel) => {
    setSelectedStudentForAllergy(student);
    setShowAllergies(true);
  };

  const { data: medicalRequests } = useClassMedicalRequests(activeClassId);
  const pendingRequests = medicalRequests?.filter((r: MedicationDomainModel) => r.status === 'Pending') || [];

  const studentsWithAllergies = students?.filter((s: StudentDetailedDomainModel) => !!s.allergies) || [];
  const pendingMeasurementCount = students?.filter(s => !(savedRows.has(s.studentId) || healthRows.get(s.studentId)?.saved)).length || 0;

  const [statusFilter, setStatusFilter] = useState<'all' | 'updated' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = React.useMemo(() => {
    return students.filter((student: StudentDetailedDomainModel) => {
      const row = healthRows.get(student.studentId);
      const isSaved = savedRows.has(student.studentId) || !!row?.saved;

      if (statusFilter === 'updated' && !isSaved) return false;
      if (statusFilter === 'pending' && isSaved) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        return student.fullName.toLowerCase().includes(query);
      }
      return true;
    });
  }, [students, healthRows, savedRows, statusFilter, searchQuery]);

  return {
    classes,
    activeClassId,
    setActiveClassId,
    students,
    termPeriod,
    setTermPeriod,
    healthRows,
    setHealthRows,
    savedRows,
    loadingLogs,
    createHealthLog,
    editingStudentIds,
    setEditingStudentIds,
    handleSaveRow,
    handleSaveAll,
    getPreviewBMI,
    showAllergies,
    setShowAllergies,
    showMedications,
    setShowMedications,
    selectedStudentForAllergy,
    setSelectedStudentForAllergy,
    handleViewAllergies,
    pendingRequests,
    studentsWithAllergies,
    pendingMeasurementCount,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    filteredStudents,
    toasts,
    addToast,
  };
}
